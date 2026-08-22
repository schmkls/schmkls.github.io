import Post from "~/templates/Post";

export default function ReceiptPoll() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The Problem</Post.Card.Title>
        <Post.Card.Body>
          DJs get swarmed by drunk guests asking for “just one song.” The energy
          is real, but the process is chaos and doesn't create value for the
          club.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The Solution</Post.Card.Title>
        <Post.Card.Body>
          Turn requests into interaction through purchases. Every bar receipt
          includes a QR code. Guests scan it to vote between two song
          alternatives, so the crowd still shapes the night, but in a way that
          is fun, structured, and tied to revenue.
        </Post.Card.Body>
        <Post.Card.Body>
          This should probably be an integration to{" "}
          <Post.Link href="https://www.soundtrack.io/">Soundtrack.io</Post.Link>
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
