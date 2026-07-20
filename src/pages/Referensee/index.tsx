import Post from "~/templates/Post";
import ReferenseeDemo from "./ReferenseeDemo/ReferenseeDemo";

export default function Referensee() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          We consume more news than ever, from more places than ever — and
          almost none of it tells us where it came from. On an ordinary day you
          scroll X or Instagram, then open svt.se, and at no point can you see:
          <Post.List>
            <li>
              where a claim originally came from, and how it traveled to the
              feed showing it to you
            </li>
            <li>
              which statements in a post or article are actually backed by a
              source
            </li>
            <li>
              how other outlets and communities are covering the same story —
              and where they disagree
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          It's tempting to call this a "filter bubble." But the bubble is the
          least of it: research — including the{" "}
          <Post.Link href="https://reutersinstitute.politics.ox.ac.uk/echo-chambers-filter-bubbles-and-polarisation-literature-review">
            Reuters Institute's own literature review
          </Post.Link>{" "}
          — finds echo chambers are weaker and more overstated than the popular
          story, and that most people do run into opposing views. The concrete
          problems are harder to dismiss:
          <Post.List>
            <li>
              <strong>Volume</strong> — far too much to cross-check anything by
              hand.
            </li>
            <li>
              <strong>Low trust</strong> —{" "}
              <Post.Link href="https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary">
                trust in news sits at a record low
              </Post.Link>
              ; people genuinely don't know what to believe.
            </li>
            <li>
              <strong>Fragmentation</strong> — news arrives through dozens of
              platforms and feeds, each with its own framing.
            </li>
            <li>
              <strong>Crude bias labels</strong> — the tools that exist rate
              whole publications on a fixed left–right axis, which says little
              about the specific article in front of you.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Seeing past your own feed still takes real work — juggling extra
          accounts, VPNs, or hunting down the same story at another outlet.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>
          Referensee shows you two things no consumer product does well today:{" "}
          <strong>where information came from</strong>, and{" "}
          <strong>how its framing differs across sources</strong> — at the level
          of the individual article or post, not the publication.
        </Post.Card.Body>
        <Post.Card.Body>
          Point Referensee at an X post or news article and it renders:
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>
            1. Provenance — where it came from and how it spread (the lead
            feature).
          </strong>
          <Post.List>
            <li>
              <strong>Upward:</strong> the sources the piece draws on, traced
              recursively — each a card (title, date, author) with a note on
              what that source is used for.
            </li>
            <li>
              <strong>Alongside:</strong> which specific facts or statements in
              the piece are <em>not</em> backed by any cited source.
            </li>
            <li>
              <strong>Downward:</strong> who picked it up afterward — later
              posts and articles that cite it, quote it, or reshare it with
              their own spin.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>
            2. Contrasting perspectives — how the same story is told elsewhere.
          </strong>{" "}
          Referensee surfaces alternative coverage with a one-line summary of
          what each reports differently. There is{" "}
          <strong>no fixed left–right axis</strong> — perspectives are grouped
          by what they actually claim, not by a pre-assigned political label.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>Claim filters.</strong> Referensee identifies the contested
          points in a story and turns them into toggle filters, so you can pivot
          the whole view by a single claim and instantly see who takes which
          stance — for example:
          <Post.List>
            <li>
              "Argues Roony Bardghji should have been selected for the national
              team"
            </li>
            <li>"Was less critical of Miljödata's handling of the leak"</li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Check a box and the coverage re-sorts around that stance.
        </Post.Card.Body>

        <Post.Card.Subtitle>Feed view</Post.Card.Subtitle>
        <Post.Card.Body>
          Beyond single links, Referensee supports scrollable feeds from popular
          sources, so the same provenance and contrast layer applies as you
          browse — for example NY Times, Al Jazeera, an X profile, or an
          Instagram profile or hashtag.
        </Post.Card.Body>

        <Post.Card.Subtitle>Pasting a link</Post.Card.Subtitle>
        <Post.Card.Body>
          Paste a link to any post or article to get its provenance tree and
          contrasting-coverage view on demand.
        </Post.Card.Body>

        <Post.Card.Body>
          <Post.Blockquote>
            <strong>Delivery.</strong> Referensee starts as a standalone web
            app. A browser extension that overlays the same visualization
            directly onto X and news sites is a natural later expansion.
          </Post.Blockquote>
        </Post.Card.Body>
        <Post.DemoButton>
          <ReferenseeDemo />
        </Post.DemoButton>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasibility</Post.Card.Title>
        <Post.Card.Body>The core is a scraping + AI pipeline.</Post.Card.Body>
        <Post.Card.Body>
          <strong>Data.</strong> News is the most tractable starting point:
          article text via readability parsers, plus aggregation backbones like{" "}
          <Post.Link href="https://blog.gdeltproject.org/">GDELT</Post.Link> —
          free, global, updated every 15 minutes, and already tracking a story's
          trajectory across outlets — and RSS for feeds. Social is harder: the{" "}
          <Post.Link href="https://postproxy.dev/blog/x-api-pricing-2026/">
            X API is now costly
          </Post.Link>{" "}
          (pay-per-use since 2026, no free tier), so X, Instagram, and Reddit
          come later. That cost is the main reason to start news-first.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>AI pipeline.</strong> For each article:
          <Post.List ordered>
            <li>
              <strong>Claim extraction</strong> — isolate atomic, verifiable
              statements (this is what surfaces "what has no source").
            </li>
            <li>
              <strong>Provenance linking</strong> — because news articles rarely
              include explicit citations, each claim's likely origin is{" "}
              <em>inferred</em> via embedding similarity and near-duplicate
              detection over earlier articles, ordered in time. This is exactly
              what the academic{" "}
              <Post.Link href="https://arxiv.org/pdf/1909.10266">
                NewsDeps
              </Post.Link>{" "}
              prototype does.
            </li>
            <li>
              <strong>Stance detection</strong> — classify how other coverage
              treats each claim (supports / refutes / differs); this powers both
              contrasting perspectives and the claim filters.
            </li>
            <li>
              <strong>Clustering & summarization</strong> — group articles on
              the same event and generate the short "what's reported
              differently" blurbs.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Modern LLMs already do claim detection, evidence ranking, and stance
          jointly, which keeps this affordable.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>MVP.</strong> Paste a news-article URL → extract its claims
          and likely source articles → render the upward source tree, flag
          unsupported statements, and show a few contrasting-coverage links with
          one-line stance summaries. Deferred: the full recursive downward
          reshare graph, live social feeds, and X/Instagram integration.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Timing/market</Post.Card.Title>
        <Post.Card.Body>
          <strong>The way people get news just shifted.</strong> For the first
          time,{" "}
          <Post.Link href="https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary">
            social media and video platforms are the world's single biggest news
            source — 54%, ahead of both TV and news sites
          </Post.Link>{" "}
          (Reuters Institute, 2026). Among 18–24s, 52% say social platforms and
          AI chatbots are their main route to news. At the same time, trust in
          news is at its lowest since tracking began. More sources, less trust —
          exactly the conditions where provenance and cross-checking matter.
        </Post.Card.Body>
        <Post.Card.Body>
          <strong>
            The closest product is{" "}
            <Post.Link href="https://ground.news/about">Ground News</Post.Link>{" "}
            — and where it stops is our opening.
          </strong>{" "}
          Ground News aggregates 50,000+ sources and tags each story with a
          left/center/right split. But it:
          <Post.List>
            <li>
              rates bias at the{" "}
              <strong>publication level, not the article level</strong> — a
              careful story in a partisan outlet still inherits the outlet's
              label (
              <Post.Link href="https://www.cjr.org/analysis/the-business-of-balance-ground-news.php">
                CJR
              </Post.Link>
              );
            </li>
            <li>
              leans on a <strong>fixed left–right axis</strong> that is
              US-centric and conflates political balance with truth;
            </li>
            <li>
              shows{" "}
              <strong>nothing about how information actually traveled</strong> —
              no provenance.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Referensee's wedge is the combination nobody offers:{" "}
          <strong>
            provenance + contrasting perspectives, rated per article, with no
            fixed political axis.
          </strong>{" "}
          The provenance piece is already proven feasible by research tools —{" "}
          <Post.Link href="https://arxiv.org/pdf/1909.10266">
            NewsDeps
          </Post.Link>
          ,{" "}
          <Post.Link href="https://news.iu.edu/stories/features/expose-the-truth/index.html">
            Hoaxy
          </Post.Link>
          , <Post.Link href="https://blog.gdeltproject.org/">GDELT</Post.Link> —
          none of which is a consumer product. The space is open.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
