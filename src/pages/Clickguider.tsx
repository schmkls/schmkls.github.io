import Post from "~/templates/Post";

export default function Clickguider() {
  return (
    <Post>
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
        <Post.Card.Title>Who it's for</Post.Card.Title>
        <Post.Card.Body>
          SaaS companies whose users get stuck on complex flows, and whose
          customer success teams keep answering the same how-to questions.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>How it works</Post.Card.Title>
        <Post.Card.Body>
          <Post.List ordered>
            <li>
              A CS rep logs into Clickguider and clicks through a flow on their
              own platform, adding short explanations at each step.
            </li>
            <li>
              When a customer asks the in-product chatbot for help, it routes
              them to the right guide and walks them through it — highlighting
              the relevant buttons and fields as they go.
            </li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>User story</Post.Card.Title>
        <Post.Card.Body>
          Sven is a customer success manager at a SaaS platform that sells
          "Tinder for horse breeding." He knows uploading horse details and
          history is where customers get stuck most often, so he logs into
          Clickguider and records the flow once.
        </Post.Card.Body>
        <Post.Card.Body>
          Now, when a customer asks the chatbot how to upload horse details, it
          walks them through Sven's guide — step by step, with the relevant
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
          <Post.List>
            <li>
              <Post.Link href="https://www.pendo.io/">Pendo</Post.Link> — A
              widely used in-app guidance platform with a no-code visual
              designer that lets non-engineers build tooltips and multi-step
              walkthroughs that highlight UI elements as the user goes. Overlaps
              with Clickguider on the "record once, replay in-product" mechanic,
              but is broader (analytics, NPS, feedback) and not chatbot-driven
              by default.
            </li>
            <li>
              <Post.Link href="https://www.appcues.com/">Appcues</Post.Link> — A
              no-code onboarding tool focused specifically on in-product flows:
              tooltips, hotspots, and step-by-step walkthroughs embedded inside
              the host SaaS. Closest to the "CS rep records, customer gets
              walked through" loop, though guides are typically triggered by
              user segments/events rather than a chatbot.
            </li>
          </Post.List>
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
