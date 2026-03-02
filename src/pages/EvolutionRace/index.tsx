import Post from "~/templates/Post";

export default function EvolutionRace({ tagline }: { tagline: string }) {
  return (
    <Post tagline={tagline}>
      <Post.Card>
        <Post.Card.Title>Purpose</Post.Card.Title>
        <Post.Card.Body>
          Evolution is one of biology&apos;s most fundamental concepts, yet
          it&apos;s often taught passively. Evolution Race makes it active:
          players feel the pressure of natural selection by making the choices
          that shaped real species.
          <br />
          <br />
          The goal is a classroom web game so engaging that students play it
          during lunch break (and teachers pay for it).
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The game</Post.Card.Title>
        <Post.Card.Body>
          All players start as the same ancient ancestor and race to evolve into
          a target modern species — for example, from an early hoofed mammal to
          a modern horse.
          <br />
          <br />
          At each step, every player independently chooses between three
          evolutionary directions. Only one path leads toward the target. The
          others veer off into dead ends — or extinction. Choose a lineage that
          went extinct and it&apos;s game over; you restart from the beginning.
          <br />
          <br />
          The first player to reach the target species wins.
          <br />
          <br />
          Throughout the race, each player can see their full evolutionary path
          and how their species looked at every stage — visualized as a branch
          in the tree of life.
        </Post.Card.Body>

        <Post.Card>
          <Post.Card.Title>
            Example race: early land mammal → horse
          </Post.Card.Title>
          <Post.Card.Body>
            Starting from a small early hoofed mammal (~60 million years ago),
            players navigate five decision points — habitat strategy, foot
            structure, diet specialization, teeth and digestion, and finally
            speed versus size. Each wrong turn leads toward a real lineage:
            tapirs, rhinoceroses, hippo relatives, deer and cows. Only the
            correct sequence of choices reaches <em>Equus</em> — the modern
            horse.
            <br />
            <br />
            Every wrong answer is grounded in actual evolutionary history, so
            losing still teaches something real.
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>Tree of life visualization</Post.Card.Title>
          <Post.Card.Body>
            As players progress, their personal path grows as a branch on a
            shared tree. Dead ends are visible — showing real extinct lineages —
            while the winning path reaches the target species at the tip. This
            makes the competitive race also a map of deep evolutionary time. A
            good reference for what this could look like is{" "}
            <a
              href="https://www.onezoom.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              onezoom.org
            </a>
            .
          </Post.Card.Body>
        </Post.Card>
      </Post.Card>
    </Post>
  );
}
