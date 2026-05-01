import Post from "~/templates/Post";

export default function Salesque({ tagline }: { tagline: string }) {
  return (
    <Post tagline={tagline}>
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
        <Post.Card.Title>Who it&apos;s for</Post.Card.Title>
        <Post.Card.Body>
          Sales teams — especially Heads of Revenue Operations and sales
          enablement leads — who want to onboard new reps faster, keep answers
          consistent, and get more value out of every call.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <ul className="list-inside list-disc space-y-2 p-2">
            <li>The call is transcribed live.</li>
            <li>
              An LLM analyses the transcript against the sales process
              you&apos;ve defined and tracks which steps have been covered (e.g.
              after every X transcribed sentences).
            </li>
            <li>
              For each customer question, the AI runs a semantic search (RAG)
              across your FAQ and context and suggests answers, with a
              confidence score.
            </li>
            <li>
              The rep sees, in real time:
              <ul className="list-inside list-disc p-2 pl-6">
                <li>
                  Visual feedback on how the sales process is progressing.
                </li>
                <li>Suggested next steps in the process.</li>
                <li>
                  Suggested answers each time the customer asks a question.
                </li>
              </ul>
            </li>
          </ul>
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
          <ol className="list-inside list-decimal space-y-2 p-2">
            <li>
              Identify whether you&apos;re talking to someone relevant to
              purchasing (manager, owner, bar lead). If it&apos;s e.g. a new
              server, ask if you can speak to someone in a more relevant role.
            </li>
            <li>Identify what kind of restaurant it is.</li>
            <li>
              Identify whether controlling music volume is a problem for the
              customer. Check common drivers:
              <ul className="list-inside list-disc p-2 pl-6">
                <li>
                  Need for different vibes and volume at breakfast, lunch, and
                  evening.
                </li>
                <li>
                  Staff don&apos;t have the time or knowledge to manage music.
                </li>
                <li>They want to maximise the atmosphere.</li>
              </ul>
            </li>
            <li>
              If relevant, mention a success story from a larger, similar
              customer.
            </li>
            <li>On interest: offer the customer a trial period.</li>
            <li>On interest: send the customer a getting-started guide.</li>
          </ol>
        </Post.Card.Body>
        <Post.Card.Body>
          In your FAQ you add answers to common questions, e.g.:
          <ul className="list-inside list-disc space-y-2 p-2">
            <li>
              <strong>Q:</strong> How long does a demo period last?
              <br />
              <strong>A:</strong> A demo period lasts … and can be activated by
              visiting … or contacting …
            </li>
            <li>
              <strong>Q:</strong> What&apos;s the difference between
              business-tier and pro-tier?
              <br />
              <strong>A:</strong> The difference between business-tier and
              pro-tier is …
            </li>
            <li>
              <strong>Q:</strong> …
              <br />
              <strong>A:</strong> …
            </li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          In the rest of the context you add a link to your website, where more
          information can be found.
        </Post.Card.Body>
        <Post.Card.Body>
          When a rep is on a call using Salesque, the call is transcribed and
          the rep gets:
          <ul className="list-inside list-disc p-2">
            <li>Visual feedback on how the sales process is progressing.</li>
            <li>Suggested next steps in the sales process.</li>
            <li>Suggested answers every time the customer asks a question.</li>
          </ul>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Services solving the same problem</Post.Card.Title>
        <Post.Card.Body>
          <ul className="list-inside list-disc space-y-2 p-2">
            <li>
              <a
                href="https://www.clari.com/products/copilot/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Clari Copilot (formerly Wingman)
              </a>{" "}
              — The closest match: real-time transcription during sales calls,
              with live battle cards, objection-handling cues, and monologue
              alerts surfaced on the rep&apos;s screen as keywords come up.
              Overlaps almost entirely with Salesque&apos;s &quot;suggest
              answers, prompt next step&quot; loop; differs in that the sales
              process is structured around battle cards rather than an explicit,
              sequential pipeline tracker.
            </li>
            <li>
              <a
                href="https://www.gong.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Gong
              </a>{" "}
              — The category leader for conversation intelligence: every call is
              recorded, transcribed, and analyzed for deal risk, talk ratios,
              and trending objections. Solves the same underlying need (extract
              value from sales calls, onboard reps faster) but is heavier on
              post-call analytics and deal forecasting than on real-time,
              in-call assistance.
            </li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          There is a wide range of sales-call AI tools (Chorus by ZoomInfo,
          Avoma, Fireflies, Salesloft Conversations, Outreach Kaia) — most are
          biased toward post-call summaries and CRM auto-fill, so
          Salesque&apos;s edge would be the explicit, user-defined sales-process
          tracker plus live FAQ retrieval.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
