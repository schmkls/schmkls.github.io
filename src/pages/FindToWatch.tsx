import Post from "~/templates/Post";

export default function FindToWatch() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Inspiration</Post.Card.Title>
        <Post.Card.Body>
          Living on a sports high school campus, we had a lot of movie nights.
          But finding the movie to watch was always a pain —{" "}
          <i>“No I've already seen that one”</i>,{" "}
          <i>“I can't watch too scary movies”</i>,{" "}
          <i>“Trust me, City of God is the best”</i>,{" "}
          <i>“No foreign languages please”</i>... A solution that often came was
          everyone got to recommend 3 movies and then we had a vote.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          Finding a movie to watch with friends or a partner is harder than it
          should be. You end up asking ChatGPT, but it doesn't get the vibe,
          gives generic suggestions, and recommends things on streaming services
          you don't have. When you finally pick something and it turns out to be
          bad, whoever championed it the hardest gets the blame.
        </Post.Card.Body>
        <Post.Card.Body>
          All the data needed to make a great group recommendation already
          exists on IMDB — we just need to use it.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <strong>1. Create a session</strong> and invite friends via link or
          code.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>2. Taste profiling</strong> — each person picks a set of
          movies they like and feel like watching tonight. These are used to
          build an individual taste profile. Optionally, connect your IMDB
          ratings instead.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>3. Nominations</strong> — each person also nominates a few
          movies they want to put directly into the vote pool.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>4. Recommendations</strong> — the system finds movies that
          match the group's combined taste profiles and merges them with all
          nominations into a single vote pool.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>5. Vote</strong> — everyone votes anonymously. Results are
          shown as a ranked list, with each movie labeled by which streaming
          services it's available on.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasibility</Post.Card.Title>
        <Post.Card.Body>
          A recommendation engine can be built on IMDB ratings using
          collaborative filtering:{" "}
          <i>
            “People who rate this movie highly (relative to their other ratings)
            also tend to rate these movies highly.”
          </i>{" "}
          Streaming availability can be sourced via an API like JustWatch.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
