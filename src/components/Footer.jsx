import { NavLink } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-alt border-t border-border mt-12">
      <div className="max-w-app mx-auto px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] gap-8 pt-8 pb-6">
        <div>
          <h3 className="text-primary mb-2">BTS ARMY HUB</h3>
          <p className="text-sm">
            A fan-made space to celebrate BTS — built by an ARMY, for ARMYs.
            Borahae 💜
          </p>
        </div>

        <div>
          <h4 className="text-[0.95rem] mb-2">Explore</h4>
          <ul className="flex flex-col gap-[0.4rem] list-none">
            <li>
              <NavLink
                to="/members"
                className="no-underline text-muted hover:text-primary"
              >
                Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/albums"
                className="no-underline text-muted hover:text-primary"
              >
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/songs"
                className="no-underline text-muted hover:text-primary"
              >
                Songs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className="no-underline text-muted hover:text-primary"
              >
                Community
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[0.95rem] mb-2">About this project</h4>
          <p className="text-sm">
            This is an unofficial, fan-made portfolio project. It is not
            affiliated with BTS, HYBE, or Big Hit Music.
          </p>
        </div>
      </div>

      <div className="border-t border-border text-center py-4 text-sm text-muted">
        <p>© {year} BTS ARMY HUB. Made with 💜 by an ARMY.</p>
        <p className="text-xs text-muted text-center mt-2">
          Some songs or albums may be missing or inaccurate — this is a fan-made
          project and not an official BTS database.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
