import Post from "~/templates/Post";

export default function Salesque() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <Post.Card.Body>
          Set up the context around what you sell — your sales process, FAQ,
          product info — and Salesque helps your reps run better calls. During a
          live call, audio is transcribed in real time and Salesque suggests
          questions to ask, surfaces answers when the customer asks something,
          points out which part of the sales process to push on next, and gives
          visual feedback on how the call is progressing.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Who it's for</Post.Card.Title>
        <Post.Card.Body>
          Sales teams — especially Heads of Revenue Operations and sales
          enablement leads — who want to onboard new reps faster, keep answers
          consistent, and get more value out of every call.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>The call is transcribed live.</li>
            <li>
              An LLM analyses the transcript against the sales process you've
              defined and tracks which steps have been covered (e.g. after every
              X transcribed sentences).
            </li>
            <li>
              For each customer question, the AI runs a semantic search (RAG)
              across your FAQ and context and suggests answers, with a
              confidence score.
            </li>
            <li>
              The rep sees, in real time:
              <Post.List>
                <li>
                  Visual feedback on how the sales process is progressing.
                </li>
                <li>Suggested next steps in the process.</li>
                <li>
                  Suggested answers each time the customer asks a question.
                </li>
              </Post.List>
            </li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>User story</Post.Card.Title>
        <Post.Card.Body>
          Your company sells a SaaS service that automatically tunes the music
          volume and vibe in restaurants and venues based on factors like
          ambient noise, time of day, number of guests, holidays, and customer
          feedback.
        </Post.Card.Body>
        <Post.Card.Body>
          As Head of Revenue Operations, you use Salesque to help new reps get
          into the sales process faster, give accurate answers when questions
          come up, and maximise the value of every call.
        </Post.Card.Body>
        <Post.Card.Body>
          You set up your sales process as:
          <Post.List ordered>
            <li>
              Identify whether you're talking to someone relevant to purchasing
              (manager, owner, bar lead). If it's e.g. a new server, ask if you
              can speak to someone in a more relevant role.
            </li>
            <li>Identify what kind of restaurant it is.</li>
            <li>
              Identify whether controlling music volume is a problem for the
              customer. Check common drivers:
              <Post.List>
                <li>
                  Need for different vibes and volume at breakfast, lunch, and
                  evening.
                </li>
                <li>Staff don't have the time or knowledge to manage music.</li>
                <li>They want to maximise the atmosphere.</li>
              </Post.List>
            </li>
            <li>
              If relevant, mention a success story from a larger, similar
              customer.
            </li>
            <li>On interest: offer the customer a trial period.</li>
            <li>On interest: send the customer a getting-started guide.</li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          In your FAQ you add answers to common questions, e.g.:
          <Post.List>
            <li>
              <strong>Q:</strong> How long does a demo period last?
              <br />
              <strong>A:</strong> A demo period lasts … and can be activated by
              visiting … or contacting …
            </li>
            <li>
              <strong>Q:</strong> What's the difference between business-tier
              and pro-tier?
              <br />
              <strong>A:</strong> The difference between business-tier and
              pro-tier is …
            </li>
            <li>
              <strong>Q:</strong> …
              <br />
              <strong>A:</strong> …
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          In the rest of the context you add a link to your website, where more
          information can be found.
        </Post.Card.Body>
        <Post.Card.Body>
          When a rep is on a call using Salesque, the call is transcribed and
          the rep gets:
          <Post.List>
            <li>Visual feedback on how the sales process is progressing.</li>
            <li>Suggested next steps in the sales process.</li>
            <li>Suggested answers every time the customer asks a question.</li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Services solving the same problem</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>
              <Post.Link href="https://garba.ai/">Garba.ai</Post.Link>
            </li>
            <li>
              <Post.Link href="https://www.clari.com/products/copilot/">
                Clari Copilot (formerly Wingman)
              </Post.Link>{" "}
              — The closest match: real-time transcription during sales calls,
              with live battle cards, objection-handling cues, and monologue
              alerts surfaced on the rep's screen as keywords come up. Overlaps
              almost entirely with Salesque's "suggest answers, prompt next
              step" loop; differs in that the sales process is structured around
              battle cards rather than an explicit, sequential pipeline tracker.
            </li>
            <li>
              <Post.Link href="https://www.gong.io/">Gong</Post.Link> — The
              category leader for conversation intelligence: every call is
              recorded, transcribed, and analyzed for deal risk, talk ratios,
              and trending objections. Solves the same underlying need (extract
              value from sales calls, onboard reps faster) but is heavier on
              post-call analytics and deal forecasting than on real-time,
              in-call assistance.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          There is a wide range of sales-call AI tools (Chorus by ZoomInfo,
          Avoma, Fireflies, Salesloft Conversations, Outreach Kaia) — most are
          biased toward post-call summaries and CRM auto-fill, so Salesque's
          edge would be the explicit, user-defined sales-process tracker plus
          live FAQ retrieval.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
