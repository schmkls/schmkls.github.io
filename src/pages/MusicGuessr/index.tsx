import Post from "~/templates/Post";

export default function TinderForExpenses() {
  return (
    <Post>
      <Post.Card.Body>
        <i>Geoguessr for music lovers</i>
      </Post.Card.Body>
      <Post.Card>
        <Post.Card.Title>The game</Post.Card.Title>
        <Post.Card.Body>
          Similarly to GeoGuessr, the users playing have a limited time to place
          the pin on the map and get a score based on how close to the correct
          location they are. The difference is instead of Google Street-images
          showing, songs are playing and you can skip as many songs as you like
          until you have made your guess or the time has run out.
          <br />
          The songs playing are connected to the correct geolocation based on
          open data (and possibly community contributions).
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasibility</Post.Card.Title>
        <Post.Card.Body>
          It should be quite possible to scrape the data from Wikipedia and
          Spotify.
          <br />
          The game has been done quite awesomely at{" "}
          <a
            href="https://meloguessr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            meloguessr.com
          </a>
          - it just seems to be missing the feature of challenging each other
          making it a multiplayer game. I also believe songs should be skippable
          since song to geolocation is not always a 1:1 mapping.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
