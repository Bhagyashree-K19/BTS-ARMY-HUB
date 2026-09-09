import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ref, push, remove, update, onValue } from "firebase/database";
import { database } from "../firebase.js";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/Button.jsx";
import Modal from "../components/Modal.jsx";
import EmptyState from "../components/EmptyState.jsx";

// Flat list where every item -- top-level comment or reply at any depth --
// has a `parentId` (null for a top-level comment, or the id of whatever
// it's replying to). This is what makes reply-to-a-reply possible without
// redesigning the database again for deeper nesting.
const MAX_VISUAL_INDENT = 4; // caps how far right deeply-nested replies indent, purely visual

function buildTree(items) {
  const byId = {};
  items.forEach((item) => {
    byId[item.id] = { ...item, children: [] };
  });

  const roots = [];
  items.forEach((item) => {
    if (item.parentId && byId[item.parentId]) {
      byId[item.parentId].children.push(byId[item.id]);
    } else {
      roots.push(byId[item.id]);
    }
  });

  // Top-level comments: newest first. Replies within a thread: oldest first
  // (reads top-to-bottom like a conversation, same as WhatsApp/Instagram).
  roots.sort((a, b) => b.createdAt - a.createdAt);
  Object.values(byId).forEach((item) =>
    item.children.sort((a, b) => a.createdAt - b.createdAt),
  );

  return roots;
}

// Walks the tree to find every descendant id of a node, so deleting a
// comment can also delete all of its (and its replies') children in one
// atomic operation, instead of leaving orphaned replies behind.
function collectDescendantIds(node) {
  let ids = [];
  for (const child of node.children) {
    ids.push(child.id, ...collectDescendantIds(child));
  }
  return ids;
}

// --- FIX: CommentNode lives here, at module scope, OUTSIDE Community.
// Defining a component inside another component's function body creates
// a brand-new function on every re-render, which React treats as an
// entirely new component type -- forcing it to destroy and rebuild the
// real DOM (including any textarea you're actively typing in) on every
// keystroke. That's what scrambles typed characters. Everything this
// needs is passed in as props instead of read from a closure.
function CommentNode({
  node,
  depth,
  items,
  isLoggedIn,
  currentUser,
  replyingToId,
  setReplyingToId,
  replyText,
  setReplyText,
  handleAddReply,
  setNodeToDelete,
}) {
  const indent = Math.min(depth, MAX_VISUAL_INDENT);
  const replyTarget = items.find((item) => item.id === replyingToId);

  return (
    <li
      className={depth > 0 ? "mt-3 pl-4 border-l-2 border-border" : ""}
      style={depth > 0 ? { marginLeft: `${indent * 4}px` } : undefined}
    >
      <div
        className={
          depth === 0 ? "bg-surface border border-border rounded-md p-4" : ""
        }
      >
        <div
          className={`flex justify-between mb-1 ${depth === 0 ? "text-sm text-muted" : "text-xs text-muted"}`}
        >
          <strong>{node.authorName}</strong>
          <span>{new Date(node.createdAt).toLocaleString()}</span>
        </div>
        <p className={depth === 0 ? "" : "text-sm"}>{node.text}</p>

        <div className="flex gap-3 text-sm mt-1">
          {isLoggedIn && (
            <button
              className="bg-transparent border-none text-primary cursor-pointer p-0 hover:underline"
              onClick={() => {
                setReplyingToId(replyingToId === node.id ? null : node.id);
                setReplyText("");
              }}
            >
              Reply
            </button>
          )}
          {currentUser && currentUser.uid === node.authorUid && (
            <button
              className="bg-transparent border-none text-red-500 cursor-pointer p-0 hover:underline"
              onClick={() => setNodeToDelete(node)}
            >
              Delete
            </button>
          )}
        </div>

        {replyingToId === node.id && (
          <form
            className="flex flex-col gap-2 mt-3"
            onSubmit={(e) => handleAddReply(e, node.id)}
          >
            <div className="flex items-start gap-2 bg-surface-alt border-l-2 border-primary rounded-sm p-2 text-sm">
              <div className="flex-1 min-w-0">
                <p className="text-primary font-semibold mb-0.5">
                  Replying to {replyTarget?.authorName}
                </p>
                <p className="text-muted truncate mb-0">
                  {replyTarget?.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReplyingToId(null);
                  setReplyText("");
                }}
                aria-label="Cancel reply"
                title="Cancel reply"
                className="bg-transparent border-none cursor-pointer text-muted flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="flex items-end gap-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${node.authorName}...`}
                rows={2}
                className="flex-1 p-2 rounded-sm border border-border bg-surface-alt text-ink text-sm resize-y"
                autoFocus
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                aria-label="Send reply"
                title="Send reply"
                className="w-9 h-9 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </form>
        )}
      </div>

      {node.children.length > 0 && (
        <ul className="list-none">
          {node.children.map((child) => (
            <CommentNode
              key={child.id}
              node={child}
              depth={depth + 1}
              items={items}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              replyText={replyText}
              setReplyText={setReplyText}
              handleAddReply={handleAddReply}
              setNodeToDelete={setNodeToDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Community() {
  const { isLoggedIn, currentUser } = useAuth();
  const [items, setItems] = useState([]); // flat list straight from Firebase
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [nodeToDelete, setNodeToDelete] = useState(null); // the tree node (with .children) pending delete confirmation

  // Which item id (comment OR reply) is currently being replied to, and
  // what's typed into that reply box. Only one open at a time.
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const commentsRef = ref(database, "comments");
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      setItems(list);
    });
    return unsubscribe;
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    setError("");

    await push(ref(database, "comments"), {
      authorUid: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email,
      text: newComment.trim(),
      createdAt: Date.now(),
      parentId: null,
    });

    setNewComment("");
  };

  // Generalized to reply to ANY node (a top-level comment or an existing
  // reply), by just setting parentId to that node's id.
  const handleAddReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    await push(ref(database, "comments"), {
      authorUid: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email,
      text: replyText.trim(),
      createdAt: Date.now(),
      parentId,
    });

    setReplyText("");
    setReplyingToId(null);
  };

  // Deleting removes the node AND every reply nested under it (at any
  // depth), using Firebase's multi-path update() so it happens as a
  // single atomic write instead of one remove() per descendant.
  const confirmDelete = async () => {
    const idsToDelete = [
      nodeToDelete.id,
      ...collectDescendantIds(nodeToDelete),
    ];
    const updates = {};
    idsToDelete.forEach((id) => {
      updates[`comments/${id}`] = null; // setting a path to null deletes it
    });
    await update(ref(database), updates);
    setNodeToDelete(null);
  };

  const tree = buildTree(items);

  return (
    <div className="page-shell">
      <h1 className="page-title">Fan Community</h1>
      <p className="page-subtitle">
        Share your ARMY thoughts with everyone here.
      </p>

      {isLoggedIn ? (
        <form
          className="flex flex-col gap-2 mb-8 max-w-[600px]"
          onSubmit={handleAddComment}
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What's on your mind, ARMY?"
            rows={3}
            className="p-3 rounded-sm border border-border bg-surface text-ink resize-y"
          />
          {error && <p className="text-red-500 text-[0.82rem] m-0">{error}</p>}
          <Button type="submit" variant="primary" className="self-start">
            Post
          </Button>
        </form>
      ) : (
        <div className="bg-surface-alt rounded-md p-4 mb-8 max-w-[600px]">
          <p>
            <NavLink to="/login" className="text-primary font-semibold">
              Login
            </NavLink>{" "}
            to join the conversation and post a comment.
          </p>
        </div>
      )}

      {tree.length === 0 ? (
        <EmptyState
          title="No comments yet"
          message="Be the first ARMY to share something!"
        />
      ) : (
        <ul className="list-none flex flex-col gap-4 max-w-[600px]">
          {tree.map((node) => (
            <CommentNode
              key={node.id}
              node={node}
              depth={0}
              items={items}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              replyText={replyText}
              setReplyText={setReplyText}
              handleAddReply={handleAddReply}
              setNodeToDelete={setNodeToDelete}
            />
          ))}
        </ul>
      )}

      <Modal
        isOpen={Boolean(nodeToDelete)}
        title="Delete this?"
        message="This will also delete any replies underneath it. This action can't be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setNodeToDelete(null)}
      />
    </div>
  );
}

export default Community;