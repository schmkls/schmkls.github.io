import Post from "~/templates/Post";

export default function PlaceYourMusic({ tagline }: { tagline: string }) {
  return (
    <Post tagline={tagline}>
      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <Post.Card.Body>
          A Spotify-integrated map that shows where music is loved. Sign up, and
          your listening history gets pinned to your geolocation. Open the map
          and see a heatmap of what&apos;s popular where.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Who it&apos;s for</Post.Card.Title>
        <Post.Card.Body>
          Travellers, road-trippers, and anyone curious about how music taste
          varies by place — a discovery tool for the geographic side of music.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <ul className="list-inside list-disc space-y-2 p-2">
            <li>
              On signup, your Spotify library is loaded onto the map at your
              location, weighted by how much you listen to each track.
            </li>
            <li>
              In map view, you see a heatmap of popular songs across regions.
            </li>
            <li>
              A <strong>uniqueness slider</strong> lets you tune what
              &quot;popular&quot; means:
              <ul className="list-inside list-disc p-2 pl-6">
                <li>
                  <strong>Max uniqueness</strong> — songs especially popular{" "}
                  <em>here</em> but not popular elsewhere (the local sound).
                </li>
                <li>
                  <strong>No uniqueness</strong> — songs ranked by raw
                  popularity for the place, regardless of how popular they are
                  anywhere else.
                </li>
              </ul>
            </li>
          </ul>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Services solving the same problem</Post.Card.Title>
        <Post.Card.Body>
          <ul className="list-inside list-disc space-y-2 p-2">
            <li>
              <a
                href="https://carto.com/blog/spotify/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Spotify&apos;s Musical Map of the World
              </a>{" "}
              (built with Carto) — Spotify&apos;s own project mapping listening
              data across 1,000+ cities, with &quot;distinctive&quot; playlists
              that weight a song&apos;s local popularity against its global
              popularity. This is essentially the &quot;max uniqueness&quot;
              mode of Place Your Music, but as a one-off Spotify data project
              rather than a live, user-personalized product with a tunable
              slider.
            </li>
            <li>
              <a
                href="https://localify.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Localify
              </a>{" "}
              — A Spotify-integrated platform that uses your location and
              listening history to recommend local artists and nearby events.
              Overlaps on the &quot;your library + geography&quot; mechanic, but
              optimizes for local-artist discovery and live events rather than a
              heatmap of what&apos;s popular where.
            </li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          Adjacent but not direct matches:{" "}
          <a
            href="https://www.everynoise.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Every Noise at Once
          </a>{" "}
          maps music geographically by genre (not city-level popularity), and
          Spotify&apos;s annual &quot;Wrapped Mapped&quot; feature shows top
          tracks per country but isn&apos;t an interactive, personal heatmap.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
