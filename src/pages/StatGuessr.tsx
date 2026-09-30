import Post from "~/templates/Post";

export default function StatGuessr() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The game</Post.Card.Title>
        <Post.Card.Body>
          Every round asks for a number. You type your guess, the real value is
          revealed, and you score based on how far off you were.
        </Post.Card.Body>
        <Post.Card.Body>
          <Post.Blockquote>
            How many people live in Germany?
            <br />
            You: 80,000,000 — Actual: 83,500,000
            <br />
            4.2% off → 9,580 / 10,000
          </Post.Blockquote>
        </Post.Card.Body>
        <Post.Card.Body>
          Questions get progressively harder within a game — from the population
          of Germany to the share of animal-caused deaths that are hippos.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Why it works</Post.Card.Title>
        <Post.Card.Body>
          Like GeoGuessr and Wordle, one daily challenge is enough to build a
          habit and something to compare with friends. Over time you get stats
          on which areas you have the best feel for — geography, science,
          economics, sports.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
