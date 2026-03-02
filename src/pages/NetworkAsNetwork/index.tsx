import Post from "~/templates/Post";

export default function NetworkAsNetwork({ tagline }: { tagline: string }) {
  return (
    <Post tagline={tagline}>
      <Post.Card>
        <Post.Card.Title>The Opportunity</Post.Card.Title>
        <Post.Card.Body>
          Social media has optimized for engagement at the cost of genuine
          connection. Billions of users feel manipulated by algorithms they
          cannot see, yet every &ldquo;healthier&rdquo; alternative has failed
          to reach mainstream adoption because it stripped away the one thing
          that makes social media sticky: a real sense of belonging.
          <br />
          <br />
          This idea is the social network where the algorithm is the product —
          not a black box.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          Platforms like Instagram and TikTok hide their recommendation logic by
          design. Users doom-scroll without understanding why they see what they
          see, or how they relate to the people around them. Privacy-first
          alternatives like Mastodon have attracted early adopters but never
          broke through, because visibility and algorithmic transparency alone
          are not compelling enough.
          <br />
          <br />
          <strong>The core insight:</strong> the missing addictive factor is not
          better content — it is a visible, explorable sense of where you belong
          in a network of other people. Seeing, feeling, and navigating your own
          social graph is fundamentally more compelling than a feed.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>
          Network as Network makes the social graph the primary interface.
          Rather than burying the algorithm behind an infinite scroll, we
          surface it as an interactive visualization of your social world. You
          don&apos;t just receive posts — you see <em>why</em> those people are
          in your world, how strongly they connect to you, and how they cluster
          together.
        </Post.Card.Body>

        <Post.Card>
          <Post.Card.Title>The Network View</Post.Card.Title>
          <Post.Card.Body>
            Your profile is a node at the center. People you interact with are
            nodes around you, organized into natural clusters — your Formula 1
            community, your close friends, a professional group. Edges between
            nodes reflect interaction strength and direction: wider where
            interaction is heavier, asymmetric where it is one-sided.
            <br />
            <br />
            Tap any node to re-center the graph around that person&apos;s
            network. Explore their clusters, discover adjacent communities,
            navigate back. The graph becomes a living, explorable map of your
            social world.
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>The Feed View</Post.Card.Title>
          <Post.Card.Body>
            Familiar to anyone who has used TikTok or Instagram — but with one
            critical difference: above every post is a small, expandable
            visualization showing exactly <em>why</em> you are seeing it: which
            nodes and edges connect you to this content. Transparency is not
            buried in a settings page. It is built into every post.
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>The Profile View</Post.Card.Title>
          <Post.Card.Body>
            Standard profile functionality: posts (images, video, captions),
            with the user&apos;s position in their own network visible.
          </Post.Card.Body>
        </Post.Card>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Why Now</Post.Card.Title>
        <Post.Card.Body>
          <ul className="list-inside list-disc space-y-1 p-2">
            <li>
              This is better for community, bringing people together rather than
              separating them into their own doom-scroll filter bubble
              addictions.
            </li>
            <li>
              The EU&apos;s Digital Services Act now mandates algorithmic
              transparency for large platforms.
            </li>
            <li>
              User trust in major social platforms is at a historic low,
              creating genuine appetite for alternatives.{" "}
              <Post.SourceLink
                href="https://www.mobil.se/nyheter/svenskar-litar-inte-pa-sociala-medier/1610327"
                index={1}
              />{" "}
              <Post.SourceLink
                href="https://www.pewresearch.org/short-reads/2025/10/29/how-americans-trust-in-information-from-news-organizations-and-social-media-sites-has-changed-over-time/"
                index={2}
              />
            </li>
          </ul>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The Moat</Post.Card.Title>
        <Post.Card.Body>
          Social networks are winner-take-most markets driven by network
          effects. The moat here is the same, but with a compounding dynamic
          unique to this product: the denser the graph, the more meaningful the
          visualization, the stronger the sense of belonging. The product gets
          demonstrably better with every new user — in a way that is{" "}
          <em>visible</em> to the user, not just felt abstractly.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasibility</Post.Card.Title>
        <Post.Card.Body>
          The chances of succeeding as a social media startup has been low, ie
          it is hard.{" "}
          <Post.SourceLink
            href="https://youtu.be/Th8JoIan4dg?list=PLQ-uHSnFig5M9fW16o2l35jrfdsxGknNB&t=784"
            index={1}
          />
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
