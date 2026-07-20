import Post from "~/templates/Post";
import FrictionDemo from "./FrictionDemo/FrictionDemo";

export default function Friction() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Inspiration</Post.Card.Title>
        <Post.Card.Body>
          Someone told me about friction-maxxing: the belief that modern
          platforms reduce friction by constantly matching us with what we
          already think and like. This reduced-friction dynamic feels good, but
          it can also narrow perspective and weaken idea quality over time.
        </Post.Card.Body>
        <Post.Card.Body>
          That inspired a question: what if we designed a platform where you are
          matched to friction, a platform nudging you towards bursting your
          filter bubble?
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          Most social platforms optimize for comfort and similarity. They feed
          us familiar opinions, familiar communities, and familiar arguments.
        </Post.Card.Body>
        <Post.Card.Body>
          But friction is not always negative. When it is structured and civil,
          friction can produce better ideas, stronger arguments, and broader
          understanding.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>
          Friction is a platform for civil discourse built around constructive
          disagreement.
        </Post.Card.Body>
        <Post.Card.Body>
          Users have public profiles (not anonymous), and can:
          <Post.List>
            <li>post statements</li>
            <li>upvote and downvote</li>
            <li>comment as either "Agree" or "Disagree"</li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          From there, Friction identifies strong opposing viewpoints and invites
          those users into live debates.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Debate Matching Model</Post.Card.Title>
        <Post.Card.Body>
          For each statement:
          <Post.List>
            <li>users vote and leave Agree/Disagree comments</li>
            <li>
              top-voted Agree and top-voted Disagree voices get debate invites
            </li>
            <li>
              if someone declines, the next strongest matched voice is invited
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          When users open the Debate section, they see incoming
          invites/notifications based on this matching model. During each live
          debate, viewers see the original statement plus each debater's core
          argument, so the disagreement is clear and grounded.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Why this matters</Post.Card.Title>
        <Post.Card.Body>
          Friction turns disagreement into a format that:
          <Post.List>
            <li>is structured and easy to follow</li>
            <li>exposes friction</li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Product Directions</Post.Card.Title>
        <Post.Card.Body>
          <Post.List ordered>
            <li>
              <strong>Standalone platform (main direction):</strong> Debate is
              the main interface, while threads act as a side view that supports
              debate creation and context. Users discover debates first, then
              dive into thread discussion for nuance.
            </li>
            <li>
              <strong>Debate-first mode:</strong> Livestream debates are the
              primary feed, and thread activity is tightly connected to each
              debate room. New debates are continuously generated from statement
              + Agree/Disagree engagement.
            </li>
            <li>
              <strong>Reddit add-on / Reddit-based approach:</strong> Friction
              can layer on top of real Reddit threads by analyzing opposing top
              comments and inviting matched users into live debates. This allows
              Friction to bootstrap from existing communities and existing
              discussion momentum.
            </li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Closing</Post.Card.Title>
        <Post.Card.Body>
          We do not need less disagreement. We need better disagreement.
        </Post.Card.Body>
        <Post.Card.Body>
          Friction is an experiment in making that possible at scale.
        </Post.Card.Body>
        <Post.DemoButton>
          <FrictionDemo />
        </Post.DemoButton>
      </Post.Card>
    </Post>
  );
}
