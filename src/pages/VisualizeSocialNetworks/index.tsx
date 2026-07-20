import Post from "~/templates/Post";

export default function VisualizeSocialNetworks() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          LinkedIn and Instagram show you your connections one at a time. You
          see mutual friends with a single person, or whoever posted most
          recently. What you never see is the full picture: how your people
          relate to each other, which groups overlap, and who sits at the center
          of it all.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>
          Turn your social network into an actual network graph. Every person is
          a node; every relationship is an edge. The result is a visual map that
          reveals things your feed never could:
          <Post.List>
            <li>
              <strong>Clusters</strong> form around groups of people who know
              each other — your university friends, old coworkers, industry
              contacts
            </li>
            <li>
              <strong>Edge strength</strong> reflects interaction frequency —
              people you engage with often have thicker connections
            </li>
            <li>
              <strong>Node size</strong> reflects activity — more active
              accounts stand out visually
            </li>
            <li>
              <strong>Path tracing</strong> — search “How am I connected to
              [person]?” and see the exact chain of mutual connections
            </li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Features</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>Cluster by connectivity (mutual contacts/friends)</li>
            <li>Cluster by interaction (likes, comments)</li>
            <li>Connection path search between any two people</li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Use cases</Post.Card.Title>
        <Post.Card.Body>
          <strong>New in town, looking to connect</strong>
          <br />
          Alex just moved to a new city and wants to build a social life from
          scratch. He's into volleyball and has friends from volleyball practice
          from his old city. By visualizing his network, he discovers that two
          of his friends back home are both connected to a cluster of people in
          his new city — people who play recreational volleyball together on
          weekends. Instead of cold messaging strangers, Alex can reach out
          through a warm introduction chain he never knew existed.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>B2B sales, making the right connection</strong>
          <br />
          Sara sells a new category of software and is targeting a dream
          customer — a company she's never worked with before. She knows the
          right buyer is probably the VP of Operations, but has no direct line
          in. By mapping her network, she finds that a former colleague knows
          someone who used to work at that company, who is still connected to
          the exact person she needs to reach. Instead of a cold LinkedIn
          message with a 2% reply rate, Sara gets a warm intro that opens the
          door.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasibility</Post.Card.Title>
        <Post.Card.Body>
          Heavily dependent on data access — whether the platforms allow
          scraping or export, and what their API policies permit.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
