import Post from "~/templates/Post";

export default function WeeklyChars() {
  return (
    <Post>
      <Post.Card.Body>
        <i>Earn your voice, one character at a time</i>
      </Post.Card.Body>
      <Post.Card>
        <Post.Card.Title>The Problem</Post.Card.Title>
        <Post.Card.Body>
          In April 2015, Kanye West posted more than 200 tweets in 10 hours.{" "}
          <Post.SourceLink
            href="https://www.xxlmag.com/kanye-west-wild-random-tweets/?utm_source=schmkls.github.io"
            index={1}
          />
        </Post.Card.Body>
        <Post.Card.Body>
          Today, many feeds are dominated by a few high-volume posters, while
          everyone else gets buried. Social platforms reward output volume over
          signal, so attention gets concentrated instead of distributed.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>
          A social platform where every user gets a weekly character budget: one
          of each character (including emojis) — one <i>a</i>, one <i>b</i>, one{" "}
          🚀, and so on. To write a post, you can only use the characters you
          currently have. There are no likes or upvotes — only character
          transfers. Profiles show:
        </Post.Card.Body>
        <Post.Card.Body>
          <ul className="list-inside list-disc p-2">
            <li>posts (text + author + characters received)</li>
            <li>current character inventory (how many of each character)</li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          This is an experiment in increasing{" "}
          <strong>distributional diversity</strong> in communication: less
          spammy output, more intentional expression, and a way to give people
          you value more voice.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
