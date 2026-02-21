import Post from "~/templates/Post";

export default function PaperComputing() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Background</Post.Card.Title>
        <p>
          Digital tools are optimized for execution. They are fast, searchable,
          and infinitely editable. But that flexibility comes at a cost — the
          friction of commitment is near zero, so ideas never have to survive
          long enough to become real.
        </p>
        <p>
          Paper computing is the practice of using pen and paper not as a backup
          for digital tools, but as a primary thinking environment for certain
          classes of problems.
        </p>
      </Post.Card>

      <Post.HorizontalLine />

      <Post.Card>
        <Post.Card.Title>What paper is good at</Post.Card.Title>
        <p>
          Paper excels at spatial reasoning. You can draw a box, arrow through
          it, cross it out, circle something three pages back, and the
          relationship between all those marks is preserved spatially in a way
          no digital canvas quite replicates.
        </p>
        <p>
          It also forces commitment. When you write something down by hand, you
          are more likely to have actually decided something. The slowness is
          the feature.
        </p>
      </Post.Card>

      <Post.HorizontalLine />

      <Post.Card>
        <Post.Card.Title>A workflow</Post.Card.Title>
        <p>
          Use a single A5 notebook per project phase. At the start of each
          session, write the date and a one-sentence goal. Sketch freely. At the
          end, spend three minutes transcribing only the decisions — not the
          thinking — into a digital note.
        </p>
        <p>
          The notebook holds the messy thinking. The digital note holds the
          clean conclusions. The paper is not the archive; it is the laboratory.
        </p>
      </Post.Card>
    </Post>
  );
}
