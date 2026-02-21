import Post from "~/templates/Post";

export default function AmbientProductivity() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Background</Post.Card.Title>
        <p>
          Most productivity advice is about doing more. More focus, more
          discipline, more structure. But some of the most useful work happens
          in the background — while walking, cooking, or falling asleep.
        </p>
        <p>
          Ambient productivity is the practice of feeding problems to your
          subconscious and trusting that it will return with answers when
          conditions are right.
        </p>
      </Post.Card>

      <Post.HorizontalLine />

      <Post.Card>
        <Post.Card.Title>The technique</Post.Card.Title>
        <p>
          Before switching off for a walk or a shower, spend two minutes writing
          down the exact problem you are stuck on. Be specific. Not
          &ldquo;figure out the architecture&rdquo; but &ldquo;decide whether to
          use an event bus or direct function calls for this notification
          flow.&rdquo;
        </p>
        <p>
          Then leave it alone. Do not force the thinking. Go do the other thing.
          Keep something to capture with — a pocket notebook, a voice memo app —
          for when the answer surfaces.
        </p>
      </Post.Card>

      <Post.HorizontalLine />

      <Post.Card>
        <Post.Card.Title>What it is not</Post.Card.Title>
        <p>
          This is not a replacement for focused work. Complex problems still
          need deliberate thinking. Ambient productivity is a supplement — a way
          to keep processing running in parallel rather than letting problems
          sit cold between focused sessions.
        </p>
        <p>
          It also requires a certain lightness. The subconscious does not
          respond well to pressure. Trust is part of the technique.
        </p>
      </Post.Card>
    </Post>
  );
}
