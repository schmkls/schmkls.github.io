# Place Your Music

Music on the map

## The idea

A Spotify-integrated map that shows where music is loved. Sign up, and your listening history gets pinned to your geolocation. Open the map and see a heatmap of what's popular where.

## Who it's for

Travellers, road-trippers, and anyone curious about how music taste varies by place — a discovery tool for the geographic side of music.

## How it works

- On signup, your Spotify library is loaded onto the map at your location, weighted by how much you listen to each track.
- In map view, you see a heatmap of popular songs across regions.
- A **uniqueness slider** lets you tune what "popular" means:
  - **Max uniqueness** — songs especially popular *here* but not popular elsewhere (the local sound).
  - **No uniqueness** — songs ranked by raw popularity for the place, regardless of how popular they are anywhere else.

## Services solving the same problem

- [Spotify's Musical Map of the World](https://carto.com/blog/spotify/) (built with Carto) — Spotify's own project mapping listening data across 1,000+ cities, with "distinctive" playlists that weight a song's local popularity against its global popularity. This is essentially the "max uniqueness" mode of Place Your Music, but as a one-off Spotify data project rather than a live, user-personalized product with a tunable slider.
- [Localify](https://localify.org/) — A Spotify-integrated platform that uses your location and listening history to recommend local artists and nearby events. Overlaps on the "your library + geography" mechanic, but optimizes for local-artist discovery and live events rather than a heatmap of what's popular where.

Adjacent but not direct matches: [Every Noise at Once](https://www.everynoise.com/) maps music geographically by genre (not city-level popularity), and Spotify's annual "Wrapped Mapped" feature shows top tracks per country but isn't an interactive, personal heatmap.
