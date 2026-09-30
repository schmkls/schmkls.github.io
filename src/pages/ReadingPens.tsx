import Post from "~/templates/Post";

export default function ReadingPens() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <Post.Card.Body>
          Drop in a document (PDF to begin with) and read it with a set of pens.
          Instead of copying text into a chat, you mark a passage with the pen
          for what you want done with it:
        </Post.Card.Body>
        <Post.Card.Body>
          <Post.List>
            <li>ELI5 — dumb it down</li>
            <li>Summarise</li>
            <li>Quiz me on this</li>
            <li>Draw it — turn the passage into a diagram</li>
            <li>Custom — your own prompt as a pen</li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Why pens</Post.Card.Title>
        <Post.Card.Body>
          Marking is already how people read carefully. Making the highlighter
          do something keeps you in the document, and the result stays next to
          the passage it came from. Could be a website, or a Chrome or Word
          extension.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
