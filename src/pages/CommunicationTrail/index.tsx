import Post from "~/templates/Post";
import CommunicationTrailDemo from "./CommunicationTrailDemo";

export default function CommunicationTrail() {
  return (
    <Post>
      <Post.Card.Body>
        <i>One shared timeline for every customer interaction</i>
      </Post.Card.Body>

      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          Product teams are flooded with customer signals across support,
          interviews, onboarding calls, and internal notes. The context gets
          fragmented, so teams lose the full journey.
          <br />
          <br />
          As a result, PMs and cross-functional teammates in customer success,
          design, and engineering make decisions with partial information. The
          team sees isolated events, but not the complete customer story.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Inspiration</Post.Card.Title>
        <Post.Card.Body>
          Having worked in product teams at startups, I have seen the problem
          solved manually by summarizing customer conversations in spreadsheets,
          documents, or Slack conversations that you end up searching for. Over
          time, that system becomes scattered, inaccessible, and time-consuming
          to maintain — most importantly it is not a structure that is easy to
          take in for new employees that need insight or background.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>
          Communication Trail turns every customer interaction into one shared
          timeline. Each customer has a trail with events, conversations, and
          milestones in chronological order.
          <br />
          <br />
          AI summarizes and tags each item by default, so teams can scan quickly
          and open the full conversation when needed.
        </Post.Card.Body>
        <Post.Card.Body>
          The timeline can include:
          <ul className="list-inside list-disc p-2">
            <li>manual notes</li>
            <li>uploaded interview and call transcripts</li>
            <li>support email</li>
            <li>other communication channels</li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          For B2B teams, customer trails are grouped under each company for a
          clear account-level and portfolio-level view.
        </Post.Card.Body>
        <Post.Card.Body>
          This gives product teams a stronger decision engine:
          <ul className="list-inside list-disc p-2">
            <li>understand exactly where each customer is in the journey</li>
            <li>
              prepare faster for customer meetings with structured history
            </li>
            <li>identify recurring friction before it becomes churn</li>
            <li>
              make better product decisions based on real customer context
            </li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          <i>
            Note: a future addition is product analytics events in the same
            timeline to visualize value realization alongside communication.
          </i>
        </Post.Card.Body>
        <Post.DemoButton
          title="Try the demo"
          demoComponent={<CommunicationTrailDemo />}
        />
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasability</Post.Card.Title>
        <Post.Card.Body>
          It should be quite simple builing an MVP based on reading from a set
          of emails and supporting manual uploading of transcripts.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
