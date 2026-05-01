import Post from "~/templates/Post";

export default function Clickguider({ tagline }: { tagline: string }) {
  return (
    <Post tagline={tagline}>
      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <Post.Card.Body>
          Like Scribe, but embedded in your own product. Customer success teams
          record step-by-step guides by clicking through their platform; end
          users get those guides delivered through a chatbot that walks them
          through the flow and highlights the relevant UI elements as they go.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Who it&apos;s for</Post.Card.Title>
        <Post.Card.Body>
          SaaS companies whose users get stuck on complex flows, and whose
          customer success teams keep answering the same how-to questions.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <ol className="list-inside list-decimal space-y-2 p-2">
            <li>
              A CS rep logs into Clickguider and clicks through a flow on their
              own platform, adding short explanations at each step.
            </li>
            <li>
              When a customer asks the in-product chatbot for help, it routes
              them to the right guide and walks them through it — highlighting
              the relevant buttons and fields as they go.
            </li>
          </ol>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>User story</Post.Card.Title>
        <Post.Card.Body>
          Sven is a customer success manager at a SaaS platform that sells
          &quot;Tinder for horse breeding.&quot; He knows uploading horse
          details and history is where customers get stuck most often, so he
          logs into Clickguider and records the flow once.
        </Post.Card.Body>
        <Post.Card.Body>
          Now, when a customer asks the chatbot how to upload horse details, it
          walks them through Sven&apos;s guide — step by step, with the relevant
          inputs highlighted on screen.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Services solving the same problem</Post.Card.Title>
        <Post.Card.Body>
          There is a glut of digital adoption / in-app guidance platforms in
          this space, but the two closest to Clickguider are:
        </Post.Card.Body>
        <Post.Card.Body>
          <ul className="list-inside list-disc space-y-2 p-2">
            <li>
              <a
                href="https://www.pendo.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Pendo
              </a>{" "}
              — A widely used in-app guidance platform with a no-code visual
              designer that lets non-engineers build tooltips and multi-step
              walkthroughs that highlight UI elements as the user goes. Overlaps
              with Clickguider on the &quot;record once, replay in-product&quot;
              mechanic, but is broader (analytics, NPS, feedback) and not
              chatbot-driven by default.
            </li>
            <li>
              <a
                href="https://www.appcues.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Appcues
              </a>{" "}
              — A no-code onboarding tool focused specifically on in-product
              flows: tooltips, hotspots, and step-by-step walkthroughs embedded
              inside the host SaaS. Closest to the &quot;CS rep records,
              customer gets walked through&quot; loop, though guides are
              typically triggered by user segments/events rather than a chatbot.
            </li>
          </ul>
        </Post.Card.Body>
        <Post.Card.Body>
          Beyond these, similar offerings include WalkMe, Whatfix, Userpilot,
          Chameleon, UserGuiding, and Tango Nuggets — what differentiates
          Clickguider would be the chatbot-as-entrypoint that routes a free-text
          question to the right recorded guide.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
