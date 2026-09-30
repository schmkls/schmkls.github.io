import Post from "~/templates/Post";

export default function ViewingRoute() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The Problem</Post.Card.Title>
        <Post.Card.Body>
          Looking for a home means going to viewings, and viewings take time.
          They are short, spread across the city, and often overlap — so you end
          up seeing fewer homes than you could.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The Solution</Post.Card.Title>
        <Post.Card.Body>
          Paste a link to your saved filter on{" "}
          <Post.Link href="https://www.hemnet.se/">Hemnet</Post.Link> or{" "}
          <Post.Link href="https://www.booli.se/">Booli</Post.Link>, pick a day,
          and get a route that fits in as many viewings as possible — with
          travel time between them accounted for.
        </Post.Card.Body>
        <Post.Card.Body>
          For anyone buying a home who wants each round of viewings to count.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
