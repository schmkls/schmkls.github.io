import Post from "~/templates/Post";

export default function TheOfflineGarden() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Background</Post.Card.Title>
        <p>
          We live in an era of constant connectivity. Every idle moment is
          filled — a notification here, a scroll there. But there is a strange
          peace in the garden, where the wifi does not reach and the phone has
          no signal bars.
        </p>
        <p>
          The offline garden is not a rejection of technology. It is a
          designated space where the brain is allowed to wander without
          redirection.
        </p>
      </Post.Card>

      <Post.HorizontalLine />

      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <p>
          Create a physical space — a corner of a room, a balcony, a patch of
          grass — that is intentionally kept free of screens and networked
          devices. The rules are simple: no phones, no laptops, no smartwatches.
        </p>
        <p>
          Bring only analog tools. A notebook. A book. Seeds if you want to grow
          something. The value is not in what you produce there, but in what you
          allow to decompress.
        </p>
      </Post.Card>

      <Post.HorizontalLine />

      <Post.Card>
        <Post.Card.Title>Why it works</Post.Card.Title>
        <p>
          Boredom is not the enemy of creativity — it is its precondition. When
          the brain is not servicing incoming stimuli, it enters a diffuse mode
          of thinking. Connections form between distant ideas. Problems that
          felt stuck suddenly have obvious solutions.
        </p>
        <p>
          The offline garden enforces this by making disconnection spatial
          rather than willpower-dependent. You do not resist the phone; you
          simply leave it in a different room.
        </p>
      </Post.Card>
    </Post>
  );
}
