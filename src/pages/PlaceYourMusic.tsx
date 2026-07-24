import Post from "~/templates/Post";

export default function PlaceYourMusic() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <Post.Card.Body>
          A Spotify-integrated map that shows where music is loved. Sign up, and
          your listening history gets pinned to your geolocation. Open the map
          and see a heatmap of what's popular where.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Who it's for</Post.Card.Title>
        <Post.Card.Body>
          Travellers, road-trippers, and anyone curious about how music taste
          varies by place — a discovery tool for the geographic side of music.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>
              On signup, your Spotify library is loaded onto the map at your
              location, weighted by how much you listen to each track.
            </li>
            <li>
              In map view, you see a heatmap of popular songs across regions.
            </li>
            <li>
              A <strong>uniqueness slider</strong> lets you tune what "popular"
              means:
              <Post.List>
                <li>
                  <strong>Max uniqueness</strong> — songs especially popular{" "}
                  <em>here</em> but not popular elsewhere (the local sound).
                </li>
                <li>
                  <strong>No uniqueness</strong> — songs ranked by raw
                  popularity for the place, regardless of how popular they are
                  anywhere else.
                </li>
              </Post.List>
            </li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Services solving the same problem</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>
              <Post.Link href="https://carto.com/blog/spotify/">
                Spotify's Musical Map of the World
              </Post.Link>{" "}
              (built with Carto) — Spotify's own project mapping listening data
              across 1,000+ cities, with "distinctive" playlists that weight a
              song's local popularity against its global popularity. This is
              essentially the "max uniqueness" mode of Place Your Music, but as
              a one-off Spotify data project rather than a live,
              user-personalized product with a tunable slider.
            </li>
            <li>
              <Post.Link href="https://localify.org/">Localify</Post.Link> — A
              Spotify-integrated platform that uses your location and listening
              history to recommend local artists and nearby events. Overlaps on
              the "your library + geography" mechanic, but optimizes for
              local-artist discovery and live events rather than a heatmap of
              what's popular where.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Adjacent but not direct matches:{" "}
          <Post.Link href="https://www.everynoise.com/">
            Every Noise at Once
          </Post.Link>{" "}
          maps music geographically by genre (not city-level popularity), and
          Spotify's annual "Wrapped Mapped" feature shows top tracks per country
          but isn't an interactive, personal heatmap.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
