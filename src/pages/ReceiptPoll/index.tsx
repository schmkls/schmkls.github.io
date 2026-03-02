import Post from "~/templates/Post";

export default function ReceiptPoll({ tagline }: { tagline: string }) {
  return (
    <Post tagline={tagline}>
      <Post.Card>
        <Post.Card.Title>The Problem</Post.Card.Title>
        <Post.Card.Body>
          DJs get swarmed by drunk guests asking for &ldquo;just one
          song.&rdquo; The energy is real, but the process is chaos and
          doesn&apos;t create value for the club.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The Solution</Post.Card.Title>
        <Post.Card.Body>
          Turn requests into interaction through purchases. Every bar receipt
          includes a QR code. Guests scan it to upvote songs in the queue, so
          the crowd still shapes the night, but in a way that is fun,
          structured, and tied to revenue.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
