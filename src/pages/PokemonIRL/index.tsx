import Post from "~/templates/Post";

export default function PokemonIRL() {
  return (
    <Post>
      <Post.Card.Body>
        <i>Catch &lsquo;em all — nature edition</i>
      </Post.Card.Body>

      <Post.Card>
        <Post.Card.Title>Inspiration</Post.Card.Title>
        <Post.Card.Body>
          I was out birdwatching with my friend Sture, during a time thinking
          about gamification and geolocation games. At some point it clicked: we
          are already surrounded by hundreds of fascinating species of birds,
          insects, plants, and fungi — we just don&apos;t enjoy it enough. What
          if we turned that into a game?
          <br />
          <br />
          We are living in the Pokémon universe. We just need the Pokédex.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>The game</Post.Card.Title>
        <Post.Card.Body>
          <strong>Pokémon IRL</strong> is a solo nature-collection game. Your
          goal is simple: go outside and catch as many species as you can.
          <br />
          <br />
          Catching means photographing a plant or animal in the wild. Each catch
          logs the species to your personal collection — your Pokédex. Species
          are assigned rarity scores based on how uncommon they are, and rarer
          catches score more points.
        </Post.Card.Body>
        <Post.Card>
          <Post.Card.Title>Evolutions</Post.Card.Title>
          <Post.Card.Body>
            Like in Pokémon, species have evolutions — but here they are
            grounded in biology. Catching a common species unlocks related,
            rarer species as recommendations for what to catch next. For
            example, spotting a common dandelion might point you toward a rarer
            related species in the same genus. This creates a natural
            progression that rewards curiosity and nudges players deeper into
            nature without overwhelming them.
            <br />
            <br />
            There is a lot more inspiration to draw from Pokémon — legendary
            species, seasonal events, type systems mapped to ecological
            categories — but for an initial version, a curated species list with
            evolution-based recommendations is the core.
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>How to catch</Post.Card.Title>
          <Post.Card.Body>
            Take a photo of the species in situ. The catch is logged to your
            collection. Any species of plant or animal found in the wild counts.
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>Validation</Post.Card.Title>
          <Post.Card.Body>
            Since this is a personal game, formal validation mechanisms are not
            necessary — and adding them would create friction that works against
            the spirit of the game. The goal is to get people outside and
            curious, not to police their catches.
            <br />
            <br />
            That said, the community plays an important role: players should be
            able to comment on each other&apos;s catches to help identify
            uncertain species, share knowledge, and cheer each other on.
            Community interaction is a tool for collaboration, not enforcement.
          </Post.Card.Body>
        </Post.Card>
      </Post.Card>
    </Post>
  );
}
