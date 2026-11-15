# Referensee

See where your news comes from — and how others see it

> “Knowledge will forever govern ignorance.”\
> — [James Madison](https://founders.archives.gov/documents/Madison/04-02-02-0480)

## Problem

Every piece of news reaches you at the end of a chain: something happens, someone reports or films it, others pick that up, quote it, and reframe it — until one version lands in your feed. Posts and articles often point to their sources, but actually following the chain — checking what each source really says, how the information was originally gathered, and what got added or twisted along the way — is far too tiresome to do by hand.

- **Low trust** — [trust in news sits at a record low](https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary); people genuinely don't know what to believe.
- **Crude bias labels** — the tools that exist rate whole publications on a fixed left–right axis, which says little about the specific article in front of you.
- **More AI-generated content** — a growing share of online content is produced by AI agents, whether with intent to mislead or simply as a by-product of pursuing some other goal. Either way, it has become cheap to flood feeds with content that shapes perspectives — or outright propaganda. And unlike a journalist, AI carries no responsibility to cite its sources: it produces confident claims with no trail back to where they came from. As that kind of content compounds, tracing what is true — and knowing who to trust — only gets harder. That is not sustainable. This was written by AI btw.

## Solution

Referensee shows you two things no consumer product does well today: **where information came from**, and **how its framing differs across sources** — at the level of the individual article or post, not the publication.

The main view puts one post or article in focus, with its connections laid out around it as smaller cards: **upward**, the sources it draws on; **downward**, the posts and articles that later used it as a source or reference it; **horizontally**, contrasting perspectives on the same story.

**1. Provenance — where it came from and how it spread (the lead feature).**

- **Upward:** the sources the piece draws on, traced recursively — each a card (title, date, author).
- **Annotated links:** every connection to a source is labeled with which claim in the piece it backs — and with what the source *actually says* about that claim. A citation that only partially supports its statement, or says something different altogether, is visible at a glance.
- **Alongside:** which specific facts or statements in the piece are *not* backed by any cited source.
- **Downward:** who picked it up afterward — later posts and articles that cite it, quote it, or reshare it with their own spin.

**2. Contrasting perspectives — how the same story is told elsewhere.** Referensee surfaces alternative coverage with a one-line summary of what each reports differently. There is **no fixed left–right axis** — perspectives are grouped by what they actually claim, not by a pre-assigned political label.

**Claim filters.** Referensee identifies the contested points in a story and turns them into toggle filters, so you can pivot the whole view by a single claim and instantly see who takes which stance — for example:

- "Argues Roony Bardghji should have been selected for the national team"
- "Was less critical of Miljödata's handling of the leak"

Check a box and the coverage re-sorts around that stance.

**Two ways in.** Paste a link to any post or article to put it in focus on demand — or browse a scrollable feed from a popular source (NY Times, Al Jazeera, an X profile, an Instagram profile or hashtag), with the same provenance-and-contrast view one tap away from anything in the feed.

> **Delivery.** Referensee starts as a standalone web app. A browser extension that overlays the same visualization directly onto X and news sites is a natural later expansion.

## Feasibility

The core is a scraping + AI pipeline.

**Data.** News is the most tractable starting point: article text via readability parsers, plus aggregation backbones like [GDELT](https://blog.gdeltproject.org/) — free, global, updated every 15 minutes, and already tracking a story's trajectory across outlets — and RSS for feeds. Social is harder: the [X API is now costly](https://postproxy.dev/blog/x-api-pricing-2026/) (pay-per-use since 2026, no free tier), so X, Instagram, and Reddit come later. That cost is the main reason to start news-first.

**AI pipeline.** For each article:

1. **Claim extraction** — isolate atomic, verifiable statements (this is what surfaces "what has no source").
2. **Provenance linking** — because news articles rarely include explicit citations, each claim's likely origin is *inferred* via embedding similarity and near-duplicate detection over earlier articles, ordered in time. This is exactly what the academic [NewsDeps](https://arxiv.org/pdf/1909.10266) prototype does.
3. **Stance detection** — classify how other coverage treats each claim (supports / refutes / differs); this powers both contrasting perspectives, the claim filters, and the annotations on source links.
4. **Clustering & summarization** — group articles on the same event and generate the short "what's reported differently" blurbs.

Modern LLMs already do claim detection, evidence ranking, and stance jointly, which keeps this affordable.

**MVP.** Paste a news-article URL → extract its claims and likely source articles → render the upward source tree with annotated links, flag unsupported statements, and show a few contrasting-coverage links with one-line stance summaries. Deferred: the full recursive downward reshare graph, live social feeds, and X/Instagram integration.

## Timing/market

**The way people get news just shifted.** For the first time, [social media and video platforms are the world's single biggest news source — 54%, ahead of both TV and news sites](https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary) (Reuters Institute, 2026). Among 18–24s, 52% say social platforms and AI chatbots are their main route to news. At the same time, trust in news is at its lowest since tracking began. More sources, less trust — exactly the conditions where provenance and cross-checking matter.

**The closest product is [Ground News](https://ground.news/about) — and where it stops is our opening.** Ground News aggregates 50,000+ sources and tags each story with a left/center/right split. But it:

- rates bias at the **publication level, not the article level** — a careful story in a partisan outlet still inherits the outlet's label ([CJR](https://www.cjr.org/analysis/the-business-of-balance-ground-news.php));
- leans on a **fixed left–right axis** that is US-centric and conflates political balance with truth;
- shows **nothing about how information actually traveled** — no provenance.

Referensee's wedge is the combination nobody offers: **provenance + contrasting perspectives, rated per article, with no fixed political axis.** The provenance piece is already proven feasible by research tools — [NewsDeps](https://arxiv.org/pdf/1909.10266), [Hoaxy](https://news.iu.edu/stories/features/expose-the-truth/index.html), [GDELT](https://blog.gdeltproject.org/) — none of which is a consumer product. The space is open.
