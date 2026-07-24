import Post from "~/templates/Post";

export default function Encircled() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Inspiration</Post.Card.Title>
        <Post.Card.Body>
          <strong>Pokémon GO</strong> deserves credit for making 2015–2016 so
          fun. Suddenly kids were outside playing, interacting, and going on
          adventures. What if a game could bring that back?
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>Curve Fever</strong> cured plenty of classroom boredom. The
          game is simple yet compelling — the winning move: encircle your
          opponents. I love it because the rules require no prior knowledge,
          unlike Pokémon GO.
        </Post.Card.Body>
        <Post.Card.Body>
          As a kid my friends played <strong>Geocaching</strong>, which led us
          into the woods on real adventures.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The game</Post.Card.Title>
        <Post.Card.Body>
          Capture area by walking and tracing an enclosed shape. When your path
          returns to its starting point, you can close the loop. The starting
          point becomes a <i>Home</i>, and the enclosed area becomes its{" "}
          <i>Territory</i>.
        </Post.Card.Body>
        <Post.Card.Body>
          You can have multiple <i>Homes</i>, each with its own <i>Territory</i>
          . If someone encircles your <i>Home</i>, you lose it along with its{" "}
          <i>Territory</i>.
        </Post.Card.Body>
        <Post.Card.Body>
          You earn XP every time you capture someone else's <i>Home</i>. XP can
          be spent to protect a <i>Home</i>, forcing any would-be capturer to
          enclose a minimum area in order to claim it.
        </Post.Card.Body>
        <Post.Card.Body>
          The leaderboard ranks players by total <i>Territory</i> area
          (worldwide or within the current map view).
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>INTVL</Post.Card.Title>
        <Post.Card.Body>
          <Post.Link href="https://www.intvl.com.au/">intvl.com.au</Post.Link>{" "}
          is a very similar game which seems awesome. The target group seems to
          be runners. It could be interesting to reason about how to make it
          more engaging for kids — more gamified, making it possible to get a
          good score without covering large distances in less populated areas.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
