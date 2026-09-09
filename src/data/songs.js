// Song data, separate from UI.
// - albumId: links to an album in albums.js (null = standalone single/feature)
// - memberId: primary member for a solo track. Group songs have no memberId.
// - collaborators: outside (non-BTS) artists featured on the track (strings)
// - collaboratingMembers: OTHER BTS members who also perform on this track
//   (array of member ids) — used so a collab song shows on every involved
//   member's page, not just the primary one.

const songs = [
  // ============================================================
  // GROUP DISCOGRAPHY
  // ============================================================

  // --- 2 COOL 4 SKOOL (2013) ---
   { id: 'intro-2-cool-4-skool', title: 'Intro: 2 Cool 4 Skool', albumId: '2-cool-4-skool', youtubeId: 'bg9hyG5qvmI' },
  { id: 'we-are-bulletproof-pt2', title: 'We Are Bulletproof Pt.2', albumId: '2-cool-4-skool', youtubeId: 'lE9lkSdtZeQ' },
  { id: 'no-more-dream', title: 'No More Dream', albumId: '2-cool-4-skool', youtubeId: 'rBG5L7UsUxA' },
  { id: 'interlude-2c4s', title: 'Interlude', albumId: '2-cool-4-skool', youtubeId: 'PV1gCvzpSy0' },
  { id: 'like', title: 'Like', albumId: '2-cool-4-skool', youtubeId: '-wLNpg5IX_g' },
  { id: 'outro-circle-room-cypher', title: 'Outro: Circle Room Cypher', albumId: '2-cool-4-skool', youtubeId: 'whYYZx8DONQ' },
  { id: 'path', title: 'Path', albumId: '2-cool-4-skool', youtubeId: 'Njzt6cJ9TJM' }, // ADDED

  // --- O!RUL8,2? (2013) ---
  { id: 'intro-o-rul82', title: 'Intro: O!RUL8,2?', albumId: 'o-rul82', youtubeId: '5BwrWn8ST-8' }, // no official upload found — left blank
  { id: 'no', title: 'N.O', albumId: 'o-rul82', youtubeId: 'r5GaAEHvHj0' }, // confirmed official MV
  { id: 'we-on', title: 'We On', albumId: 'o-rul82', youtubeId: 'p6CIxdvSl4E' }, // no official upload found — left blank
  { id: 'if-i-ruled-the-world', title: 'If I Ruled the World', albumId: 'o-rul82', youtubeId: 'jOr2emTHsZU' }, // not verified this batch
  { id: 'coffee', title: 'Coffee', albumId: 'o-rul82', youtubeId: 'FJuOEuvMAnE' }, // not verified this batch
  { id: 'bts-cypher-pt1', title: 'BTS Cypher Pt.1', albumId: 'o-rul82', youtubeId: 'nBl2SB1eCaM' }, // no official upload found — left blank
  { id: 'attack-on-bangtan', title: 'Attack on Bangtan', albumId: 'o-rul82', youtubeId: 'qPC5s_R6cfE' }, // not verified this batch — this WAS promoted as a track, may have an official upload, worth a manual check
  { id: 'paldogangsan', title: 'Paldogangsan / Strong Arm', albumId: 'o-rul82', youtubeId: 'gwgy2MbjWKs' }, // EDITED title — not verified this batch
  { id: 'outro-luv-in-skool', title: 'Outro: Luv In Skool', albumId: 'o-rul82', youtubeId: 'MkIYr9vgmkM' }, // no official upload found — left blank

  // --- SKOOL LUV AFFAIR (2014) ---
  { id: 'intro-skool-luv-affair', title: 'Intro: Skool Luv Affair', albumId: 'skool-luv-affair', youtubeId: '37167fMEw5c' }, // no official upload found — left blank
  { id: 'boy-in-luv', title: 'Boy In Luv', albumId: 'skool-luv-affair', youtubeId: 'GsFvjsatO-k' }, // confirmed official MV
  { id: 'where-you-from', title: 'Where You From', albumId: 'skool-luv-affair', youtubeId: 'BMgoOJa3MFU' }, // not verified this batch
  { id: 'just-one-day', title: 'Just One Day', albumId: 'skool-luv-affair', youtubeId: 'dzAwJW107nk' }, // not verified this batch — this WAS a promoted b-side, worth checking separately
  { id: 'tomorrow', title: 'Tomorrow', albumId: 'skool-luv-affair', youtubeId: 'k-J_LxWLXeo' }, // not verified this batch
  { id: 'bts-cypher-pt2-triptych', title: 'BTS Cypher Pt.2: Triptych', albumId: 'skool-luv-affair', youtubeId: 'JIzyZL6RYIc' }, // no official upload found — left blank
  { id: 'spine-breaker', title: 'Spine Breaker', albumId: 'skool-luv-affair', youtubeId: 'K5mGRX4gN2Y' }, // not verified this batch
  { id: 'jump', title: 'Jump', albumId: 'skool-luv-affair', youtubeId: 'lpr-hsmClqQ' }, // not verified this batch
  { id: 'outro-propose', title: 'Outro: Propose', albumId: 'skool-luv-affair', youtubeId: 'O95-DTBDMUM' }, // no official upload found — left blank

  // --- SKOOL LUV AFFAIR: SPECIAL ADDITION (2014) — new tracks only ---
  { id: 'miss-right', title: 'Miss Right', albumId: 'skool-luv-affair-special-addition' },
  { id: 'like-slow-jam-remix', title: 'Like (Slow Jam Remix)', albumId: 'skool-luv-affair-special-addition' },

  // --- DARK & WILD (2014) ---
 { id: 'intro-what-am-i-to-you', title: 'Intro: What Am I To You', albumId: 'dark-and-wild', youtubeId: '_3OLpHsAR54' },
{ id: 'danger', title: 'Danger', albumId: 'dark-and-wild', youtubeId: '43r6lXilbcQ' },
{ id: 'war-of-hormone', title: 'War of Hormone', albumId: 'dark-and-wild', youtubeId: 'XQmpVHUi-0A' },
{ id: 'hip-hop-phile', title: 'Hip Hop Lover', albumId: 'dark-and-wild', youtubeId: '1w0ya8Qof0I' }, // EDITED title
{ id: 'let-me-know', title: 'Let Me Know', albumId: 'dark-and-wild', youtubeId: 'RHhvdOBGppU' },
{ id: 'rain', title: 'Rain', albumId: 'dark-and-wild', youtubeId: 'Pkbnyj-QDhA' },
{ id: 'bts-cypher-pt3-killer', title: 'BTS Cypher Pt. 3: Killer', albumId: 'dark-and-wild', youtubeId: 'I47TUcJj9po' }, // EDITED title (spacing)
{ id: 'could-you-turn-off-your-cell-phone', title: 'Can You Turn Off Your Phone', albumId: 'dark-and-wild', youtubeId: 'Msz6CUYrH9M' }, // EDITED title
{ id: 'embarrassed', title: 'Blanket Kick', albumId: 'dark-and-wild', youtubeId: 'F2qX2kADI3w' }, // EDITED title
{ id: '24-7-heaven', title: '24/7=Heaven', albumId: 'dark-and-wild', youtubeId: 'HTAqic8qziU' },
{ id: 'look-here', title: 'Look Here', albumId: 'dark-and-wild', youtubeId: '2c-4g9GDrjk' },
{ id: 'so-4-more', title: '2nd Grade', albumId: 'dark-and-wild', youtubeId: '07q6yWBPpEg' }, // EDITED title
{ id: 'outro-do-you-think-it-makes-sense', title: 'Outro: Does That Make Sense?', albumId: 'dark-and-wild', youtubeId: 's8OlJqD6Xno' }, // EDITED title

  // --- THE MOST BEAUTIFUL MOMENT IN LIFE, PT.1 (2015) ---
{ id: 'intro-mbmol', title: 'Intro: The Most Beautiful Moment in Life', albumId: 'hyyh-pt1', youtubeId: 'QjXoPVg1_5o' }, // EDITED albumId
{ id: 'i-need-u', title: 'I Need U', albumId: 'hyyh-pt1', youtubeId: 'DOuhvBJqKVY' }, // EDITED albumId
{ id: 'hold-me-tight', title: 'Hold Me Tight', albumId: 'hyyh-pt1', youtubeId: 'SX9zIOVClrk' }, // EDITED albumId
{ id: 'dope', title: 'Dope', albumId: 'hyyh-pt1', youtubeId: 'j-URsRB5s_A' }, // EDITED albumId
{ id: 'boyz-with-fun', title: 'Boyz With Fun', albumId: 'hyyh-pt1', youtubeId: 'XH20rksAxkM' }, // EDITED albumId
{ id: 'converse-high', title: 'Converse High', albumId: 'hyyh-pt1', youtubeId: 'jw-pAvTfPFY' }, // EDITED albumId
{ id: 'moving-on', title: 'Moving On', albumId: 'hyyh-pt1', youtubeId: 'CMIaXUpMkmM' }, // EDITED albumId
{ id: 'outro-love-is-not-over', title: 'Outro: Love Is Not Over', albumId: 'hyyh-pt1', youtubeId: 'gCBPBkAnz9o' }, // EDITED albumId

  // --- THE MOST BEAUTIFUL MOMENT IN LIFE, PT.2 (2015) ---
{ id: 'intro-never-mind', title: 'Intro: Never Mind', albumId: 'hyyh-pt2', youtubeId: 'lISbxaYlLFk' }, // EDITED albumId
{ id: 'run', title: 'Run', albumId: 'hyyh-pt2', youtubeId: 'ssD6mzewGVo' }, // EDITED albumId
{ id: 'butterfly', title: 'Butterfly', albumId: 'hyyh-pt2', youtubeId: 'laE2mvwZN8w' }, // EDITED albumId
{ id: 'whalien-52', title: 'Whalien 52', albumId: 'hyyh-pt2', youtubeId: 'N6o-coKG67Y' }, // EDITED albumId
{ id: 'ma-city', title: 'Ma City', albumId: 'hyyh-pt2', youtubeId: '9_SnoNkGzUc' }, // EDITED albumId
{ id: 'silver-spoon', title: 'Silver Spoon', albumId: 'hyyh-pt2', youtubeId: 'P9-QNnOm2RU' }, // EDITED albumId
{ id: 'autumn-leaves', title: 'Autumn Leaves', albumId: 'hyyh-pt2', youtubeId: 'cljJCtXYvuI' }, // EDITED albumId
{ id: 'outro-house-of-cards', title: 'Outro: House of Cards', albumId: 'hyyh-pt2', youtubeId: 'MWQC2CFREes' }, // EDITED albumId

  // --- YOUNG FOREVER (2016) — new/alternate tracks only ---
{ id: 'fire', title: 'Fire', albumId: 'young-forever', youtubeId: 'ATVbLa4ASps' },
{ id: 'save-me', title: 'Save Me', albumId: 'young-forever', youtubeId: 'G6bhcBP1NiU' },
{ id: 'epilogue-young-forever', title: 'Epilogue: Young Forever', albumId: 'young-forever', youtubeId: 'LbvE0FV_70U' },


  // --- WINGS (2016) ---
{ id: 'intro-boy-meets-evil', title: 'Intro: Boy Meets Evil', albumId: 'wings', youtubeId: 'v5LtIAyWc8A' },
{ id: 'blood-sweat-tears', title: 'Blood Sweat & Tears', albumId: 'wings', youtubeId: 'b23_UkBrrQk' },
{ id: 'begin', title: 'Begin', albumId: 'wings', memberId: 'jungkook', youtubeId: 'm5_J7xuYxzs' },
{ id: 'lie', title: 'Lie', albumId: 'wings', memberId: 'jimin', youtubeId: '-ThId6ZWqsE' },
{ id: 'stigma', title: 'Stigma', albumId: 'wings', memberId: 'v', youtubeId: 'b23_UkBrrQk' },
{ id: 'first-love', title: 'First Love', albumId: 'wings', memberId: 'suga', youtubeId: 'S9ou2FCLWlQ' },
{ id: 'reflection', title: 'Reflection', albumId: 'wings', memberId: 'rm', youtubeId: 'D78QseJtht8' },
{ id: 'mama', title: 'MAMA', albumId: 'wings', memberId: 'j-hope', youtubeId: 'm5BMmuwcGtg' },
{ id: 'awake', title: 'Awake', albumId: 'wings', memberId: 'jin', youtubeId: '9UK3V5xhED0' },
{ id: 'lost', title: 'Lost', albumId: 'wings', youtubeId: '-YIj6H4ShQA' },
{ id: 'bts-cypher-4', title: 'BTS Cypher Pt. 4', albumId: 'wings', youtubeId: 'Od8BLS0huVU' }, // EDITED title
{ id: 'am-i-wrong', title: 'Am I Wrong', albumId: 'wings', youtubeId: '4fgUV5fzuIE' },
{ id: '21st-century-girl', title: '21st Century Girl', albumId: 'wings', youtubeId: 'OVY7yI5_NFw' },
{ id: 'two-three', title: 'Two! Three! (Still Wishing There Will Be Better Days)', albumId: 'wings', youtubeId: 'E30APZxHh4c' },
{ id: 'interlude-wings', title: 'Interlude: Wings', albumId: 'wings', youtubeId: 'FeSmZ3HcqXQ' },

  // --- YOU NEVER WALK ALONE (2017) — new tracks only ---
{ id: 'spring-day', title: 'Spring Day', albumId: 'you-never-walk-alone', youtubeId: 'H2HQWHKDREI' },
{ id: 'not-today', title: 'Not Today', albumId: 'you-never-walk-alone', youtubeId: 'xomrqgZ9X_Y' },
{ id: 'outro-wings', title: 'Outro: Wings', albumId: 'you-never-walk-alone', youtubeId: 'DG6DtnDnQu4' },
{ id: 'a-supplementary-story', title: 'A Supplementary Story: You Never Walk Alone', albumId: 'you-never-walk-alone', youtubeId: '6zu-7sgObQ4' },

  // --- LOVE YOURSELF 承 'HER' (2017) ---
{ id: 'intro-serendipity', title: 'Intro: Serendipity', albumId: 'love-yourself-her', youtubeId: 'gSsCZJM6OG0' },
{ id: 'dna', title: 'DNA', albumId: 'love-yourself-her', youtubeId: 'SxAvr92fRg4' },
{ id: 'best-of-me', title: 'Best of Me', albumId: 'love-yourself-her', youtubeId: 'VMqDSntAbC0' },
{ id: 'dimple', title: 'Dimple', albumId: 'love-yourself-her', youtubeId: 'BGQveM9aiBM' },
{ id: 'pied-piper', title: 'Pied Piper', albumId: 'love-yourself-her', youtubeId: 'VEZ_Ui6d9AM' },
{ id: 'mic-drop', title: 'MIC Drop', albumId: 'love-yourself-her', youtubeId: 'e95-Gaj2iXM' },
{ id: 'go-go', title: 'Go Go', albumId: 'love-yourself-her', youtubeId: 'XqYdxi16K7U' },
{ id: 'outro-her', title: 'Outro: Her', albumId: 'love-yourself-her', youtubeId: '2WvGOE95Rjo' },

  // --- LOVE YOURSELF 轉 'TEAR' (2018) ---
{ id: 'intro-singularity', title: 'Intro: Singularity', albumId: 'love-yourself-tear', youtubeId: 'uyWm8DUK06M' },
{ id: 'fake-love', title: 'Fake Love', albumId: 'love-yourself-tear', youtubeId: '0tWU94w_3ig' },
{ id: 'the-truth-untold', title: 'The Truth Untold', albumId: 'love-yourself-tear', youtubeId: 'ITc-om9SVr4' },
{ id: '134340', title: '134340', albumId: 'love-yourself-tear', youtubeId: 'lu0XVRP_Bfc' },
{ id: 'paradise', title: 'Paradise', albumId: 'love-yourself-tear', youtubeId: 'obH7iPDAn2Q' },
{ id: 'love-maze', title: 'Love Maze', albumId: 'love-yourself-tear', youtubeId: 'n_R0-YosZ3g' },
{ id: 'magic-shop', title: 'Magic Shop', albumId: 'love-yourself-tear', youtubeId: '38k5zr1e0HI' },
{ id: 'airplane-pt2', title: 'Airplane pt.2', albumId: 'love-yourself-tear', youtubeId: '4DCOsbO27oY' },
{ id: 'anpanman', title: 'Anpanman', albumId: 'love-yourself-tear', youtubeId: 'EBf6lwkChnQ' },
{ id: 'so-what', title: 'So What', albumId: 'love-yourself-tear', youtubeId: 'zdLvqiOmWq4' },
{ id: 'outro-tear', title: 'Outro: Tear', albumId: 'love-yourself-tear', youtubeId: '639hc_F2TZU' },

  // --- LOVE YOURSELF 結 'ANSWER' (2018) — new tracks only ---
{ id: 'euphoria', title: 'Euphoria', albumId: 'love-yourself-answer', youtubeId: '5BdSZkY6F4M' },
{ id: 'trivia-just-dance', title: 'Trivia 起: Just Dance', albumId: 'love-yourself-answer', youtubeId: '_xjZtbeKd4E' },
{ id: 'trivia-love', title: 'Trivia 承: Love', albumId: 'love-yourself-answer', youtubeId: 'GiKZ_4EkYsA' },
{ id: 'trivia-seesaw', title: 'Trivia 轉: Seesaw', albumId: 'love-yourself-answer', youtubeId: 'NC_Lo8nRqfA' },
{ id: 'im-fine', title: "I'm Fine", albumId: 'love-yourself-answer', youtubeId: 'dyXhcS04MVY' },
{ id: 'idol', title: 'IDOL', albumId: 'love-yourself-answer', youtubeId: '9IVhjh15ofo' },
{ id: 'answer-love-myself', title: 'Answer: Love Myself', albumId: 'love-yourself-answer', youtubeId: '9mwRYgMmSGE' },

  // --- MAP OF THE SOUL: PERSONA (2019) ---
  // NOTE: albums.js lists "Dis-ease" as this album's closing track, but that
  // song is historically on BE, and Persona's real closer is "Dionysus" —
  // flagged for you to confirm, not changed here since it's your album data.
{ id: 'intro-persona', title: 'Intro: Persona', albumId: 'map-of-the-soul-persona', memberId: 'rm', youtubeId: 'cl590lYe5MM' },
{ id: 'boy-with-luv', title: 'Boy With Luv', albumId: 'map-of-the-soul-persona', youtubeId: '3J7rt7bkDCY' },
{ id: 'mikrokosmos', title: 'Mikrokosmos', albumId: 'map-of-the-soul-persona', youtubeId: 'Fw7C6IsDYgI' },
{ id: 'make-it-right', title: 'Make It Right', albumId: 'map-of-the-soul-persona', youtubeId: 'F2mbAkat5n8' },
{ id: 'home', title: 'HOME', albumId: 'map-of-the-soul-persona', youtubeId: 'ghJURdZKq3I' },
{ id: 'jamais-vu', title: 'Jamais Vu', albumId: 'map-of-the-soul-persona', youtubeId: 'G3x17KyNJtg' },
{ id: 'dionysus', title: 'Dionysus', albumId: 'map-of-the-soul-persona', youtubeId: 'wJdjHxQCUPw' },

  // --- MAP OF THE SOUL: 7 (2020) — new tracks only ---
{ id: 'intro-persona-mots7', title: 'Intro: Persona', albumId: 'map-of-the-soul-7', youtubeId: 'cl590lYe5MM' }, // ADDED (shared opening track)
{ id: 'black-swan', title: 'Black Swan', albumId: 'map-of-the-soul-7', youtubeId: '_36O75VSuLY' },
{ id: 'filter', title: 'Filter', albumId: 'map-of-the-soul-7', memberId: 'jimin', youtubeId: 'dNUnnb8F-Cw' },
{ id: 'my-time', title: 'My Time', albumId: 'map-of-the-soul-7', memberId: 'jungkook', youtubeId: 'VTh7DIOfd1w' },
{ id: 'louder-than-bombs', title: 'Louder than bombs', albumId: 'map-of-the-soul-7', youtubeId: '4ZSVbrV4-Xs' },
{ id: 'on', title: 'ON', albumId: 'map-of-the-soul-7', youtubeId: 'VnWo9-Dioik' },
{ id: 'ugh', title: 'UGH!', albumId: 'map-of-the-soul-7', youtubeId: '1yxEmmYQdl8' },
{ id: 'zero-oclock', title: "00:00 (Zero O'Clock)", albumId: 'map-of-the-soul-7', youtubeId: 'sBWesVezIrc' },
{ id: 'inner-child', title: 'Inner Child', albumId: 'map-of-the-soul-7', memberId: 'v', youtubeId: 'nt4f4pPCEFs' },
{ id: 'friends', title: 'Friends', albumId: 'map-of-the-soul-7', memberId: 'j-hope', collaboratingMembers: ['jimin'], youtubeId: 'h7mZX8INIYI' },
{ id: 'moon', title: 'Moon', albumId: 'map-of-the-soul-7', memberId: 'jin', youtubeId: 'F5H3g0UR7CI' },
{ id: 'respect', title: 'Respect', albumId: 'map-of-the-soul-7', memberId: 'rm', collaboratingMembers: ['suga'], youtubeId: '53BA0C6dXpY' },
{ id: 'we-are-bulletproof-eternal', title: 'We are Bulletproof: the Eternal', albumId: 'map-of-the-soul-7', youtubeId: 'd-Fb38_xMOY' },
{ id: 'outro-ego', title: 'Outro: Ego', albumId: 'map-of-the-soul-7', memberId: 'j-hope', youtubeId: 'EWLlUBax4X4' },


  // --- BE (2020) ---
{ id: 'life-goes-on', title: 'Life Goes On', albumId: 'be', youtubeId: 'r27uNWGTGfk' },
{ id: 'fly-to-my-room', title: 'Fly To My Room', albumId: 'be', youtubeId: 'YSuOwf24psk' },
{ id: 'blue-and-grey', title: 'Blue & Grey', albumId: 'be', youtubeId: 'amnspvOH-EE' },
{ id: 'skit-be', title: 'Skit', albumId: 'be', youtubeId: 'YkGEbnNj48k' },
{ id: 'telepathy', title: 'Telepathy', albumId: 'be', youtubeId: 'ktCYLb_GQws' },
{ id: 'dis-ease', title: 'Dis-ease', albumId: 'be', youtubeId: 'rSi4UIWbtM0' },
{ id: 'stay', title: 'Stay', albumId: 'be', youtubeId: 'evBAiaYal1o' },
{ id: 'dynamite', title: 'Dynamite', albumId: 'be', youtubeId: 'kK29Q_LpVUw' },

  // --- PROOF (2022) — new/unique tracks only ---
{ id: 'born-singer', title: 'Born Singer', albumId: 'proof', youtubeId: 'TbjUXK2M5n8' },
{ id: 'run-bts', title: 'Run BTS', albumId: 'proof', youtubeId: 'ssD6mzewGVo' },
{ id: 'blood-sweat-tears-proof', title: 'Blood Sweat & Tears', albumId: 'proof', youtubeId: 'b23_UkBrrQk' }, // ADDED (shared anthology track)
{ id: 'ddaeng', title: 'Ddaeng', albumId: 'proof', youtubeId: 'LbSU1_SG91w' },
{ id: 'yet-to-come', title: 'Yet To Come', albumId: 'proof', youtubeId: '3yZGKBU-kGU' },
{ id: 'for-youth', title: 'For Youth', albumId: 'proof', youtubeId: 'Q_ifPZ_rEXk' },
{ id: 'jump-demo', title: 'Jump (Demo)', albumId: 'proof', youtubeId: 'pGoq-QCjYDs' },
{ id: 'i-need-u-demo', title: 'I Need U (Demo)', albumId: 'proof', youtubeId: 'IdZWXVFmkQg' },
{ id: 'tony-montana-with-jimin', title: 'Tony Montana (with Jimin)', albumId: 'proof', memberId: 'suga', collaboratingMembers: ['jimin'], youtubeId: 'ECG5HlMZU9M' },
{ id: 'young-forever-rm-demo', title: "Young Forever (RM's Demo)", albumId: 'proof', memberId: 'rm', youtubeId: 'l0O8KDKgJ9s' },
{ id: 'spring-day-v-demo', title: "Spring Day (V's Demo)", albumId: 'proof', memberId: 'v', youtubeId: 'J2B-SyaXLxc' },
{ id: 'dna-jhope-demo', title: "DNA (J-Hope's Demo)", albumId: 'proof', memberId: 'j-hope', youtubeId: 'mgNBTXBu1jA' },
{ id: 'boy-with-luv-demo', title: 'Boy With Luv (Demo)', albumId: 'proof', youtubeId: 'AkDIRW64rLo' },

  // --- ARIRANG (2026) ---
{ id: 'body-to-body', title: 'Body to Body', albumId: 'arirang', youtubeId: 'RBaSiVjtKR4' },
{ id: 'hooligan', title: 'Hooligan', albumId: 'arirang', youtubeId: 'bs8Ihk2D2dc' },
{ id: 'aliens', title: 'Aliens', albumId: 'arirang', youtubeId: 'EC9_h_elSAY' },
{ id: 'fya', title: 'FYA', albumId: 'arirang', youtubeId: 'QWDayFgPDjQ' },
{ id: '2-0', title: '2.0', albumId: 'arirang', youtubeId: '_xeca0tl4C4' },
{ id: 'no-29', title: 'No. 29', albumId: 'arirang', youtubeId: '8wZNqBR8MOw' }, // EDITED id+title
{ id: 'swim', title: 'Swim', albumId: 'arirang', youtubeId: 'wt08t0fu53E' }, // ADDED
{ id: 'merry-go-round', title: 'Merry Go Round', albumId: 'arirang', youtubeId: 'Iy0SpSLW8wo' }, // ADDED
{ id: 'normal', title: 'Normal', albumId: 'arirang', youtubeId: '4QMp7lCxEb4' }, // ADDED
{ id: 'please', title: 'Please', albumId: 'arirang', youtubeId: '3N1k6ir55-Y' },
{ id: 'like-animals', title: 'Like Animals', albumId: 'arirang', youtubeId: 'U1YmRMDe9-Y' },
{ id: 'they-dont-know-bout-us', title: "They Don't Know 'Bout Us", albumId: 'arirang', youtubeId: 'Dt2P9jRa7w0' },
{ id: 'one-more-night', title: 'One More Night', albumId: 'arirang', youtubeId: '471JvbFq1Mw' }, // EDITED id+title
{ id: 'into-the-sun', title: 'Into the Sun', albumId: 'arirang', youtubeId: 'N_Id6KNQtLw' },

  // ============================================================
  // RM — SOLO
  // ============================================================
{ id: 'voice', title: 'Voice', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: 'phznkIcoEVQ' },
{ id: 'do-you', title: 'Do You', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: '0XAxf8aFtL4' },
{ id: 'awakening', title: 'Awakening', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: 'eH3o9SXLd5c' },
{ id: 'monster', title: 'Monster', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: '7kRee_11ucs' },
{ id: 'throw-away', title: 'Throw Away', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: 'WtDDhUzRSFw' },
{ id: 'joke', title: 'Joke', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: 'blnA4l_f6xw' },
{ id: 'god-rap', title: 'God Rap', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: '6yf7ozI2CZE' },
{ id: 'rush', title: 'Rush', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: '_93S66CCfGA' },
{ id: 'life-rm', title: 'Life', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: '-9LqvFJeuV4' },
{ id: 'adrift', title: 'Adrift', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: 'uSoFEnsD5kw' },
{ id: 'i-believe', title: 'I Believe', albumId: 'rm-mixtape-2015', memberId: 'rm', youtubeId: 'klZHkJ4G7Vw' },

{ id: 'tokyo', title: 'tokyo', albumId: 'mono', memberId: 'rm', youtubeId: 'fXVUTAOravs' },
{ id: 'seoul', title: 'seoul', albumId: 'mono', memberId: 'rm', youtubeId: 'JPT4ltYdStY' },
{ id: 'moonchild', title: 'moonchild', albumId: 'mono', memberId: 'rm', youtubeId: 'qAqgXZUHNsA' },
{ id: 'badbye', title: 'badbye', albumId: 'mono', memberId: 'rm', collaborators: ['eAeon'], youtubeId: 'Yasng0aKCSc' },
{ id: 'uhgood', title: 'uhgood', albumId: 'mono', memberId: 'rm', youtubeId: '7BH6fzOdKa8' },
{ id: 'everythingoes', title: 'everythingoes', albumId: 'mono', memberId: 'rm', collaborators: ['NELL'], youtubeId: 'h7tOmPqRlOI' },
{ id: 'forever-rain', title: 'forever rain', albumId: 'mono', memberId: 'rm', youtubeId: 'ZpH0moJRkr0' },

{ id: 'yun', title: 'Yun', albumId: 'indigo', memberId: 'rm', collaborators: ['Erykah Badu'], youtubeId: 'nCCkPnkdgOM' },
{ id: 'still-life', title: 'Still Life', albumId: 'indigo', memberId: 'rm', collaborators: ['Anderson .Paak'], youtubeId: 'W-9B4IJVdJw' },
{ id: 'all-day', title: 'All Day', albumId: 'indigo', memberId: 'rm', collaborators: ['Tablo'], youtubeId: 'sE5YAXaIypo' },
{ id: 'forgtful', title: 'Forg_tful', albumId: 'indigo', memberId: 'rm', collaborators: ['Kim Sawol'], youtubeId: 'cmJbVPTFtYg' },
{ id: 'closer-rm', title: 'Closer', albumId: 'indigo', memberId: 'rm', collaborators: ['Paul Blanco', 'Mahalia'], youtubeId: 'mJcjXjYWI6E' },
{ id: 'change-pt2', title: 'Change pt.2', albumId: 'indigo', memberId: 'rm', youtubeId: 'y5EhsK21YkA' },
{ id: 'lonely', title: 'Lonely', albumId: 'indigo', memberId: 'rm', youtubeId: '7gISsiqxlN8' },
{ id: 'hectic', title: 'Hectic', albumId: 'indigo', memberId: 'rm', collaborators: ['Colde'], youtubeId: '0LZeGrLGqFc' },
{ id: 'wild-flower', title: 'Wild Flower', albumId: 'indigo', memberId: 'rm', collaborators: ['youjeen'], youtubeId: 'N2mciE7aXHw' },
{ id: 'no2', title: 'No.2', albumId: 'indigo', memberId: 'rm', collaborators: ['Park Ji-yoon'], youtubeId: 'EJiPWFZjFxU' },

{ id: 'right-people-wrong-place', title: 'Right People, Wrong Place', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'uARrDKH_M8s' },
{ id: 'out-of-love', title: 'out of love', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'rnPZ4WSlBPY' },
{ id: 'domodachi', title: 'Domodachi', albumId: 'right-place-wrong-person', memberId: 'rm', collaborators: ['Little Simz'], youtubeId: 'JGk6bqdzKZ4' },
{ id: 'interlude-question', title: '? (Interlude)', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'eC1txOJS_pc' },
{ id: 'groin', title: 'Groin', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: '-EwHXnk4KlQ' },
{ id: 'heaven-rm', title: 'Heaven', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'VlIboHAuDDY' },
{ id: 'lost-rm', title: 'LOST!', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'zGTAKiqEGxo' },
{ id: 'around-the-world-in-a-day', title: 'Around the world in a day', albumId: 'right-place-wrong-person', memberId: 'rm', collaborators: ['Moses Sumney'], youtubeId: 'fjup672rFlE' },
{ id: 'credit-roll', title: 'ㅠㅠ (Credit Roll)', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'zKQDjopJdRo' },
{ id: 'come-back-to-me', title: 'Come back to me', albumId: 'right-place-wrong-person', memberId: 'rm', youtubeId: 'Ub84MnFnuX8' },

{ id: 'winter-flower', title: 'Winter Flower', albumId: null, memberId: 'rm', collaborators: ['Younha'], youtubeId: 'lZumx70VjU4' },
{ id: 'smoke-sprite', title: 'Smoke Sprite', albumId: null, memberId: 'rm', collaborators: ['So!YoON!'], youtubeId: '7xTQJbkwSfs' },
{ id: 'dont-ever-say-love-me', title: "Don't Ever Say Love Me", albumId: null, memberId: 'rm', collaborators: ['Colde'], youtubeId: 'I8pmc-Gr-Ts' },
{ id: 'neva-play', title: 'Neva Play', albumId: null, memberId: 'rm', collaborators: ['Megan Thee Stallion'], youtubeId: 'ZOnTAdiC2Tg' },
{ id: 'champion', title: 'Champion', albumId: null, memberId: 'rm', collaborators: ['Fall Out Boy'], youtubeId: 'X7rzi4T9YSY' },
{ id: 'change-wale-rm', title: 'Change', albumId: null, memberId: 'rm', collaborators: ['Wale'], youtubeId: '9rAyprZdo7o' },
{ id: 'crying-over-you', title: 'Crying Over You', albumId: null, memberId: 'rm', collaborators: ['HONNE', 'BEKA'], youtubeId: 'N5Y1ZSLNLjM' },
{ id: 'stop-the-rain', title: 'Stop The Rain', albumId: null, memberId: 'rm', collaborators: ['Tablo'], youtubeId: 'zG9j8FbaXjc' },

  // ============================================================
  // JIN — SOLO
  // ============================================================
{ id: 'running-wild', title: 'Running Wild', albumId: 'happy', memberId: 'jin', youtubeId: 'btmOzwvCWmw' },
{ id: 'ill-be-there', title: "I'll Be There", albumId: 'happy', memberId: 'jin', youtubeId: 'H7YJZDGrIos' },
{ id: 'another-level', title: 'Another Level', albumId: 'happy', memberId: 'jin', youtubeId: 'PIYkh9v4L6I' },
{ id: 'falling', title: 'Falling', albumId: 'happy', memberId: 'jin', youtubeId: '1hgtmw_laFs' },
{ id: 'heart-on-the-window', title: 'Heart on the Window', albumId: 'happy', memberId: 'jin', collaborators: ['Wendy'], youtubeId: 'w18l2cAePuI' },
{ id: 'i-will-come-to-you', title: 'I Will Come to You', albumId: 'happy', memberId: 'jin', youtubeId: '_IPISqNOevU' },

{ id: 'dont-say-you-love-me', title: "Don't Say You Love Me", albumId: 'echo', memberId: 'jin', youtubeId: 'sv1aHo-YQDw' },
{ id: 'nothing-without-your-love', title: 'Nothing Without Your Love', albumId: 'echo', memberId: 'jin', youtubeId: '7ue9yqfApQA' },
{ id: 'loser', title: 'Loser', albumId: 'echo', memberId: 'jin', youtubeId: 'MTjiawwYPhI' },
{ id: 'rope-it', title: 'Rope It', albumId: 'echo', memberId: 'jin', youtubeId: 'l7OexMEJLtE' },
{ id: 'with-the-clouds', title: 'With the Clouds', albumId: 'echo', memberId: 'jin', youtubeId: 'dpn4v93wQZY' },
{ id: 'background', title: 'Background', albumId: 'echo', memberId: 'jin', youtubeId: 'LYepnktGTLE' },
{ id: 'to-me-today', title: 'To Me, Today', albumId: 'echo', memberId: 'jin', youtubeId: 'UFeCEeD85AU' },

{ id: 'the-astronaut', title: 'The Astronaut', albumId: null, memberId: 'jin', youtubeId: '9SDI0z83Uks' },
{ id: 'super-tuna', title: 'Super Tuna', albumId: null, memberId: 'jin', youtubeId: 'GFjm2zCWHtw' },
{ id: 'yours', title: 'Yours', albumId: null, memberId: 'jin', youtubeId: 'EcjFsBl4lGI' },
{ id: 'tonight', title: 'Tonight', albumId: null, memberId: 'jin', youtubeId: 'xMFVyP2npjM' },
{ id: 'abyss', title: 'Abyss', albumId: null, memberId: 'jin', youtubeId: 'aqtSOksH-NE' },
{ id: 'its-definitely-you', title: "It's Definitely You", albumId: null, memberId: 'jin', collaboratingMembers: ['v'], youtubeId: 'exTpSZJJiP8' },
{ id: 'bad-decisions', title: 'Bad Decisions', albumId: null, memberId: 'jin', collaboratingMembers: ['jimin', 'v', 'jungkook'], collaborators: ['benny blanco', 'Snoop Dogg'], youtubeId: 'cMAeP4LwA_s' },

  // ============================================================
  // SUGA / AGUST D — SOLO
  // ============================================================
{ id: 'intro-dt-suga', title: 'Intro: DT sugA', albumId: 'agust-d', memberId: 'suga', collaborators: ['DJ Friz'], youtubeId: '6DVLYf_Ar6g' },
{ id: 'give-it-to-me', title: 'give it to me', albumId: 'agust-d', memberId: 'suga', youtubeId: '_Zgc12yL5ss' },
{ id: '724148', title: '724148', albumId: 'agust-d', memberId: 'suga', youtubeId: 'r71SC6VMYqw' },
{ id: '140503-at-dawn', title: '140503 at dawn', albumId: 'agust-d', memberId: 'suga', youtubeId: 'Jbx78w58bDo' },
{ id: 'the-last', title: 'The Last', albumId: 'agust-d', memberId: 'suga', youtubeId: 'hIDm_gzOwYk' },
{ id: 'tony-montana', title: 'Tony Montana', albumId: 'agust-d', memberId: 'suga', collaborators: ['Yankie'], youtubeId: 'ECG5HlMZU9M' },
{ id: 'interlude-dream-reality', title: 'Interlude: Dream, Reality', albumId: 'agust-d', memberId: 'suga', youtubeId: 'tZgLIuuAtvE' },
{ id: 'so-far-away', title: 'so far away', albumId: 'agust-d', memberId: 'suga', collaborators: ['SURAN'], youtubeId: 'T1E_pkE06Cg' },

{ id: 'moonlight', title: 'Moonlight', albumId: 'd-2', memberId: 'suga', youtubeId: 'YZ0Exxdj7YQ' },
{ id: 'daechwita', title: 'Daechwita', albumId: 'd-2', memberId: 'suga', youtubeId: '6cEYgc4N-BI' },
{ id: 'what-do-you-think', title: 'What do you think?', albumId: 'd-2', memberId: 'suga', youtubeId: 'ndlqBiq2ll4' },
{ id: 'strange', title: 'Strange', albumId: 'd-2', memberId: 'suga', collaboratingMembers: ['rm'], youtubeId: 'D3bXpqsT0LE' },
{ id: 'twenty-eight', title: '28', albumId: 'd-2', memberId: 'suga', collaborators: ['NiiHWA'], youtubeId: 'GLG31v_T1Qo' },
{ id: 'burn-it', title: 'Burn It', albumId: 'd-2', memberId: 'suga', collaborators: ['MAX'], youtubeId: 'XuyQB5rr4oQ' },
{ id: 'people', title: 'People', albumId: 'd-2', memberId: 'suga', youtubeId: 'sHbl6mt6X80' },
{ id: 'honsool', title: 'Honsool', albumId: 'd-2', memberId: 'suga', youtubeId: 'h90ACL8hSwA' },
{ id: 'interlude-set-me-free', title: 'Interlude: Set me free', albumId: 'd-2', memberId: 'suga', youtubeId: 'vrcsE6xWODA' },
{ id: 'dear-my-friend', title: 'Dear my friend', albumId: 'd-2', memberId: 'suga', collaborators: ['Kim Jong Wan of NELL'], youtubeId: 'GWA_Gy1LKkE' },

{ id: 'd-day', title: 'D-Day', albumId: 'd-day', memberId: 'suga', collaboratingMembers: ['rm'], youtubeId: 'PxnuqFD-f9c' },
{ id: 'haegeum', title: 'Haegeum', albumId: 'd-day', memberId: 'suga', youtubeId: 'FdfP-oBi3rI' },
{ id: 'huh', title: 'HUH?!', albumId: 'd-day', memberId: 'suga', collaboratingMembers: ['j-hope'], youtubeId: '0xMIFqc_u-o' },
{ id: 'amygdala', title: 'AMYGDALA', albumId: 'd-day', memberId: 'suga', youtubeId: 'RAchirIVZAM' },
{ id: 'sdl', title: 'SDL', albumId: 'd-day', memberId: 'suga', youtubeId: 'LEEZ2FS6loA' },
{ id: 'people-pt2', title: 'People Pt.2', albumId: 'd-day', memberId: 'suga', collaborators: ['IU'], youtubeId: 'h0f2CJw08Nw' },
{ id: 'polar-night', title: 'Polar Night', albumId: 'd-day', memberId: 'suga', youtubeId: 'fvcrtyaP3GY' },
{ id: 'interlude-dawn', title: 'Interlude: Dawn', albumId: 'd-day', memberId: 'suga', youtubeId: 'MKALKJnHXgo' },
{ id: 'snooze', title: 'Snooze', albumId: 'd-day', memberId: 'suga', collaborators: ['Ryuichi Sakamoto', 'WOOSUNG'], youtubeId: 'okfdIIUQOik' },
{ id: 'life-goes-on-suga', title: 'Life Goes On', albumId: 'd-day', memberId: 'suga', youtubeId: 'mzWnW1V9EMc' },

{ id: 'eight', title: 'Eight', albumId: null, memberId: 'suga', collaborators: ['IU'], youtubeId: 'yFkvinwYbes' },
{ id: 'girl-of-my-dreams', title: 'Girl of My Dreams', albumId: null, memberId: 'suga', collaborators: ['Juice WRLD'], youtubeId: 'vw9V_9swKaM' },
{ id: 'blueberry-eyes', title: 'Blueberry Eyes', albumId: null, memberId: 'suga', collaborators: ['MAX'], youtubeId: 'hwYd_6Bsp_c' },
{ id: 'sugas-interlude', title: "SUGA's Interlude", albumId: null, memberId: 'suga', collaborators: ['Halsey'], youtubeId: 'HdC3t26eaEc' },
{ id: 'that-that', title: 'That That', albumId: null, memberId: 'suga', collaborators: ['PSY'], youtubeId: 'uOdA5_R2x_E' },
{ id: 'song-request', title: 'Song Request', albumId: null, memberId: 'suga', collaborators: ['Lee Sora'], youtubeId: '_3XXFmtfg4k' },
{ id: 'we-dont-talk-together', title: "We Don't Talk Together", albumId: null, memberId: 'suga', collaborators: ['HEIZE', 'GIRIBOY'], youtubeId: '5GRy6fuOuyU' },

  // ============================================================
  // J-HOPE — SOLO
  // ============================================================
{ id: 'hope-world-title', title: 'Hope World', albumId: 'hope-world', memberId: 'j-hope', youtubeId: 'M1mKyHWTrdc' },
{ id: 'pop-piece-of-peace-pt1', title: 'P.O.P (Piece of Peace) Pt.1', albumId: 'hope-world', memberId: 'j-hope', youtubeId: 'zUsmV8ogRrU' },
{ id: 'daydream', title: 'Daydream', albumId: 'hope-world', memberId: 'j-hope', youtubeId: 'CJNITkGeJM0' },
{ id: 'base-line', title: 'Base Line', albumId: 'hope-world', memberId: 'j-hope', youtubeId: 'e8loM2YykmE' },
{ id: 'hangsang', title: 'HANGSANG', albumId: 'hope-world', memberId: 'j-hope', collaborators: ['Supreme Boi'], youtubeId: 'Uy65Fo4H294' },
{ id: 'airplane-jhope', title: 'Airplane', albumId: 'hope-world', memberId: 'j-hope', youtubeId: 'oOQp3hggqv8' },
{ id: 'blue-side', title: 'Blue Side', albumId: 'hope-world', memberId: 'j-hope', youtubeId: 'fYbfyspOgOA' },

{ id: 'pandoras-box', title: "Pandora's Box", albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: '1nn63i-tPRk' },
{ id: 'more', title: 'MORE', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: '1mnj6Vg8Rf4' },
{ id: 'stop', title: 'STOP', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: 'WjqHuhf0wYg' },
{ id: 'equal-sign', title: '= (Equal Sign)', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: '_hNuNiNhcI4' },
{ id: 'music-box-reflection', title: 'Music Box: Reflection', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: 'IElUjUUHkq4' },
{ id: 'what-if', title: 'What If...', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: 'QHLVk1JI8XI' },
{ id: 'safety-zone', title: 'Safety Zone', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: 'xUH3vf8YMKU' },
{ id: 'future', title: 'Future', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: 'Fh2PTrTaxv0' },
{ id: 'arson', title: 'Arson', albumId: 'jack-in-the-box', memberId: 'j-hope', youtubeId: 'qZrSpqtvN88' },

{ id: 'on-the-street-solo', title: 'on the street (solo version)', albumId: 'hope-on-the-street-vol1', memberId: 'j-hope', youtubeId: 'H0G1ta9qZfs' },
{ id: 'i-wonder', title: 'i wonder...', albumId: 'hope-on-the-street-vol1', memberId: 'j-hope', collaboratingMembers: ['jungkook'], youtubeId: 'SeZouxOauPw' },
{ id: 'lock-unlock', title: 'lock / unlock', albumId: 'hope-on-the-street-vol1', memberId: 'j-hope', collaborators: ['benny blanco', 'Nile Rodgers'], youtubeId: 'tOaWhRATZqk' },
{ id: 'i-dont-know', title: "i don't know", albumId: 'hope-on-the-street-vol1', memberId: 'j-hope', collaborators: ['HUH YUNJIN'], youtubeId: 'MWVGgSE9MZg' },
{ id: 'what-if-dance-mix', title: 'what if... (dance mix)', albumId: 'hope-on-the-street-vol1', memberId: 'j-hope', youtubeId: 'ttF2qiktKBM' },
{ id: 'neuron', title: 'NEURON', albumId: 'hope-on-the-street-vol1', memberId: 'j-hope', collaborators: ['Gaeko', 'Yoonmirae'], youtubeId: 'F_v2L_BWrHU' },

{ id: 'chicken-noodle-soup', title: 'Chicken Noodle Soup', albumId: null, memberId: 'j-hope', collaborators: ['Becky G'], youtubeId: 'sSH_sVChY4Y' },
{ id: 'on-the-street-j-cole', title: 'on the street', albumId: null, memberId: 'j-hope', collaborators: ['J. Cole'], youtubeId: 'H0G1ta9qZfs' },
{ id: 'sweet-dreams', title: 'Sweet Dreams', albumId: null, memberId: 'j-hope', collaborators: ['Miguel'], youtubeId: '2RooiTGMF_4' },
{ id: 'mona-lisa', title: 'MONA LISA', albumId: null, memberId: 'j-hope', youtubeId: 'uYBrB1jxMhw' },
{ id: 'killin-it-girl', title: "Killin' It Girl", albumId: null, memberId: 'j-hope', collaborators: ['GloRilla'], youtubeId: 'LXIeNZGl1Po' },
{ id: 'rush-hour', title: 'Rush Hour', albumId: null, memberId: 'j-hope', collaborators: ['Crush'], youtubeId: 'stibNqDOo1g' },
{ id: 'lv-bag', title: 'LV Bag', albumId: null, memberId: 'j-hope', collaborators: ['Don Toliver', 'Pharrell Williams'], youtubeId: 'LFy4BL_FeuQ' },

  // ============================================================
  // JIMIN — SOLO
  // ============================================================
{ id: 'face-off', title: 'Face-off', albumId: 'face', memberId: 'jimin', youtubeId: 'TLT_MqzRHfY' },
{ id: 'interlude-dive', title: 'Interlude: Dive', albumId: 'face', memberId: 'jimin', youtubeId: 'PUIRGc_53IY' },
{ id: 'like-crazy', title: 'Like Crazy', albumId: 'face', memberId: 'jimin', youtubeId: 'i2hE4R2Tmig' },
{ id: 'alone', title: 'Alone', albumId: 'face', memberId: 'jimin', youtubeId: '7q9UDPZuTi0' },
{ id: 'set-me-free-pt2', title: 'Set Me Free Pt.2', albumId: 'face', memberId: 'jimin', youtubeId: 'EJwDNsW1u3U' },

{ id: 'rebirth-intro', title: 'Rebirth (Intro)', albumId: 'muse', memberId: 'jimin', youtubeId: 'acWdVkYOzBs' },
{ id: 'interlude-showtime', title: 'Interlude: Showtime', albumId: 'muse', memberId: 'jimin', youtubeId: '1kn-cJ6fw0o' },
{ id: 'smeraldo-garden-marching-band', title: 'Smeraldo Garden Marching Band', albumId: 'muse', memberId: 'jimin', collaborators: ['Loco'], youtubeId: 'QszN3iNbLrs' },
{ id: 'slow-dance', title: 'Slow Dance', albumId: 'muse', memberId: 'jimin', collaborators: ['Sofia Carson'], youtubeId: '6NTj5TSQFR0' },
{ id: 'be-mine', title: 'Be Mine', albumId: 'muse', memberId: 'jimin', youtubeId: '9CSnV-gsmv8' },
{ id: 'who-jimin', title: 'Who', albumId: 'muse', memberId: 'jimin', youtubeId: 'yK7MoYrzAag' },
{ id: 'closer-than-this', title: 'Closer Than This', albumId: 'muse', memberId: 'jimin', youtubeId: 'Y8RkL_aMu-M' },

{ id: 'promise', title: 'Promise', albumId: null, memberId: 'jimin', youtubeId: 'PwhgRnjhB84' },
{ id: 'christmas-love', title: 'Christmas Love', albumId: null, memberId: 'jimin', youtubeId: 'LDPSNwJPnGY' },
{ id: 'with-you', title: 'With You', albumId: null, memberId: 'jimin', collaborators: ['Ha Sung-woon'], youtubeId: 'b0HsXVdPDvY' },
{ id: 'christmas-day', title: 'Christmas Day', albumId: null, memberId: 'jimin', collaboratingMembers: ['jungkook'], youtubeId: 'TgBI2nkpZss' },
{ id: 'vibe', title: 'Vibe', albumId: null, memberId: 'jimin', collaborators: ['Taeyang'], youtubeId: '_oTwiOQiPts' },
{ id: 'angel-pt1', title: 'Angel Pt. 1', albumId: null, memberId: 'jimin', collaborators: ['Kodak Black', 'NLE Choppa', 'JVKE', 'Muni Long'], youtubeId: '65DxyKRtvsQ' },

  // ============================================================
  // V — SOLO
  // ============================================================
{ id: 'rainy-days', title: 'Rainy Days', albumId: 'layover', memberId: 'v', youtubeId: 'GP0P6xJCERc' },
{ id: 'blue', title: 'Blue', albumId: 'layover', memberId: 'v', youtubeId: 'CpnF0dsqeR4' },
{ id: 'love-me-again', title: 'Love Me Again', albumId: 'layover', memberId: 'v', youtubeId: 'HJYzQhQaKWI' },
{ id: 'slow-dancing', title: 'Slow Dancing', albumId: 'layover', memberId: 'v', youtubeId: '1AP3-j1jG6g' },
{ id: 'for-us', title: 'For Us', albumId: 'layover', memberId: 'v', youtubeId: 'vZXVHW30i-c' },

{ id: 'scenery', title: 'Scenery', albumId: null, memberId: 'v', youtubeId: 'xe2r_KG2XdA' },
{ id: 'winter-bear', title: 'Winter Bear', albumId: null, memberId: 'v', youtubeId: '1iK-ttRjV-E' },
{ id: 'sweet-night', title: 'Sweet Night', albumId: null, memberId: 'v', youtubeId: '_pC6o6H3CmY' },
{ id: 'christmas-tree', title: 'Christmas Tree', albumId: null, memberId: 'v', youtubeId: 'CMbxzOQc0GI' },
{ id: 'fri-ends', title: 'FRI(END)S', albumId: null, memberId: 'v', youtubeId: 'gN9S70XduZ8' },
{ id: 'wherever-u-r', title: 'Wherever U R', albumId: null, memberId: 'v', collaborators: ['UMI'], youtubeId: 'dsueEQYPVCM' },
{ id: 'white-christmas', title: 'White Christmas', albumId: null, memberId: 'v', collaborators: ['Bing Crosby'], youtubeId: 'C4oI7GXdDsM' },
{ id: '4-oclock', title: "4 O'Clock", albumId: null, memberId: 'v', collaboratingMembers: ['rm'], youtubeId: 'Fjm_lwn0AEc' },
{ id: 'snow-flower', title: 'Snow Flower', albumId: null, memberId: 'v', collaborators: ['Peakboy'], youtubeId: '2nY0spA5UL4' },
{ id: 'winter-ahead', title: 'Winter Ahead', albumId: null, memberId: 'v', collaborators: ['Park Hyo Shin'], youtubeId: 'ourDHGd63gY' },

  // ============================================================
  // JUNG KOOK — SOLO
  // ============================================================
{ id: '3d', title: '3D', albumId: 'golden', memberId: 'jungkook', collaborators: ['Jack Harlow'], youtubeId: 'hS0AMFijhBo' },
{ id: 'closer-to-you', title: 'Closer to You', albumId: 'golden', memberId: 'jungkook', collaborators: ['Major Lazer'], youtubeId: 'SZzbWTXSGB8' },
{ id: 'seven', title: 'Seven', albumId: 'golden', memberId: 'jungkook', collaborators: ['Latto'], youtubeId: 'fc7qcKMBrLI' },
{ id: 'standing-next-to-you', title: 'Standing Next to You', albumId: 'golden', memberId: 'jungkook', youtubeId: 'eUvQwsDWc64' },
{ id: 'yes-or-no', title: 'Yes or No', albumId: 'golden', memberId: 'jungkook', youtubeId: 'uOFIcm-L0po' },
{ id: 'please-dont-change', title: "Please Don't Change", albumId: 'golden', memberId: 'jungkook', collaborators: ['DJ Snake'], youtubeId: 'Shz9iLeE6i4' },
{ id: 'hate-you', title: 'Hate You', albumId: 'golden', memberId: 'jungkook', youtubeId: '9IUzPzV1z1g' },
{ id: 'somebody', title: 'Somebody', albumId: 'golden', memberId: 'jungkook', youtubeId: 'ONxOGXC_YNk' },
{ id: 'too-sad-to-dance', title: 'Too Sad to Dance', albumId: 'golden', memberId: 'jungkook', youtubeId: 'uQ9A0xF7lAM' },
{ id: 'shot-glass-of-tears', title: 'Shot Glass of Tears', albumId: 'golden', memberId: 'jungkook', youtubeId: 'vpnQilFlc_4' },

{ id: 'still-with-you', title: 'Still With You', albumId: null, memberId: 'jungkook', youtubeId: 'BksBNbTIoPE' },
{ id: 'my-you', title: 'My You', albumId: null, memberId: 'jungkook', youtubeId: 'JUDtG2TVa3M' },
{ id: 'stay-alive', title: 'Stay Alive', albumId: null, memberId: 'jungkook', youtubeId: '8rLLm7Kjt-A' },
{ id: 'dreamers', title: 'Dreamers', albumId: null, memberId: 'jungkook', youtubeId: 'SJ8vecq2VPM' },
{ id: 'never-let-go', title: 'Never Let Go', albumId: null, memberId: 'jungkook', youtubeId: 'J_n4Ysi5iUM' },
{ id: 'left-and-right', title: 'Left and Right', albumId: null, memberId: 'jungkook', collaborators: ['Charlie Puth'], youtubeId: 'Otkibvs-aAs' },
{ id: 'who-lauv-jungkook', title: 'Who', albumId: null, memberId: 'jungkook', collaborators: ['Lauv'], youtubeId: 'U31F4JJiVx4' },
  
]

export default songs