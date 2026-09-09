import { NavLink } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import MemberCard from '../components/MemberCard.jsx'
import AlbumCard from '../components/AlbumCard.jsx'
import SongCard from '../components/SongCard.jsx'
import Button from '../components/Button.jsx'
import members from '../data/members.js'
import albums from '../data/albums.js'
import songs from '../data/songs.js'

function Home() {
  const featuredMembers = members.slice(0, 4)
  // Only feature GROUP albums/songs on the homepage (memberId is null for
  // those) — otherwise, since solo albums/songs are now added at the end
  // of the arrays, "Featured" would only ever show whichever member is last.
  const featuredAlbums = albums.filter((a) => !a.memberId).slice(-3)
  const featuredSongs = songs.filter((s) => !s.memberId).slice(-4)

  return (
    <div>
      <Hero />

      <section className="page-shell">
        <h2 className="page-title">Who is BTS?</h2>
        <p className="page-subtitle">
          BTS is a seven-member South Korean group formed in 2013, known for their
          artistry, storytelling, and one of the most passionate global fandoms in
          music — ARMY. This hub brings together the members, discography, and a
          space for fans to connect.
        </p>

        <div className="my-12 p-8 bg-gradient-to-b from-surface-alt to-transparent rounded-lg">
          <p className="uppercase tracking-[3px] text-sm font-bold text-primary mb-2">The Fandom</p>
          <h2 className="page-title">What is ARMY?</h2>
          <p className="text-muted text-[1.05rem] mb-8 max-w-none text-justify">
            ARMY (Adorable Representative M.C for Youth) is BTS's official fanbase —
            millions of fans across the world who fill stadiums with a sea of purple
            ARMY Bomb lightsticks, and carry BTS's message of self-love and unity into
            their own lives. This hub exists so fans everywhere have one home for it.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 mt-6">
            <div className="bg-surface border border-border rounded-md p-6 text-center transition-transform duration-base hover:-translate-y-1">
              <span className="block text-[2.1rem] font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2013</span>
              <span className="block mt-1 text-muted text-sm uppercase tracking-wide">ARMY Founded</span>
            </div>
            <div className="bg-surface border border-border rounded-md p-6 text-center transition-transform duration-base hover:-translate-y-1">
              <span className="block text-[2.1rem] font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">7</span>
              <span className="block mt-1 text-muted text-sm uppercase tracking-wide">Members</span>
            </div>
            <div className="bg-surface border border-border rounded-md p-6 text-center transition-transform duration-base hover:-translate-y-1">
              <span className="block text-[2.1rem] font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100+</span>
              <span className="block mt-1 text-muted text-sm uppercase tracking-wide">Countries</span>
            </div>
            <div className="bg-surface border border-border rounded-md p-6 text-center transition-transform duration-base hover:-translate-y-1">
              <span className="block text-[2.1rem] font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">💜</span>
              <span className="block mt-1 text-muted text-sm uppercase tracking-wide">Borahae</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-12 mb-4">
          <h2 className="page-title mb-0">Featured Members</h2>
          <NavLink to="/members" className="no-underline text-primary font-semibold whitespace-nowrap">View all →</NavLink>
        </div>
        <div className="card-grid">
          {featuredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="flex items-baseline justify-between mt-12 mb-4">
          <h2 className="page-title mb-0">Featured Albums</h2>
          <NavLink to="/albums" className="no-underline text-primary font-semibold whitespace-nowrap">View all →</NavLink>
        </div>
        <div className="card-grid">
          {featuredAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>

        <div className="flex items-baseline justify-between mt-12 mb-4">
          <h2 className="page-title mb-0">Featured Songs</h2>
          <NavLink to="/songs" className="no-underline text-primary font-semibold whitespace-nowrap">View all →</NavLink>
        </div>
        <div className="flex flex-col gap-2">
          {featuredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        <div className="mt-12 text-center bg-surface-alt rounded-lg p-8">
          <h2>Join fellow ARMYs</h2>
          <p>Share your thoughts, favorite songs, and BTS moments with the community.</p>
          <NavLink to="/community">
            <Button variant="primary">Go to Community</Button>
          </NavLink>
        </div>
      </section>
    </div>
  )
}

export default Home
