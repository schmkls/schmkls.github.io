// Referensee focus-stage demo seed — all outlets, people, and stories are
// fictional. Two stories: a coffee study spun into a tabloid claim, and a
// "downtown car ban" that never was.
import type { Piece, Verdict } from "./types";

export const PIECES: Record<string, Piece> = {
  spark: {
    id: "spark",
    outlet: "The Daily Spark",
    monogram: "DS",
    descriptor: "Tabloid",
    date: "Mar 14, 2026",
    headline: "Three cups a day melts belly fat, scientists say",
    teaserParas: 2,
    paras: [
      [
        {
          t: "Scientists have found that drinking three cups of coffee a day ",
        },
        { t: "melts stubborn belly fat", c: "c2" },
        { t: ", according to a major new university study." },
      ],
      [
        { t: "The research, which tracked " },
        { t: "more than 2,000 adults over four years", c: "c1" },
        { t: ", found that regular coffee drinkers " },
        { t: "carried significantly less visceral fat", c: "c5" },
        { t: " — the dangerous kind that wraps around the organs." },
      ],
      [
        { t: "Even better, the slimming effect held for " },
        { t: "participants of all ages", c: "c3" },
        { t: ", the researchers said, from students to pensioners." },
      ],
      [
        { t: "Espresso and filter coffee " },
        { t: "worked equally well", c: "c6" },
        { t: ", though researchers reportedly warn that " },
        { t: "the effect disappears if you add milk", c: "c7" },
        { t: "." },
      ],
      [
        { t: "In light of the findings, " },
        { t: "doctors now recommend upping your intake", c: "c4" },
        { t: " to three cups a day." },
      ],
      [
        { t: "Nutritionists are already calling it " },
        { t: "the biggest breakthrough since the Mediterranean diet", c: "c8" },
        { t: " — and " },
        { t: "sales of coffee machines have already doubled", c: "c9" },
        { t: ", retailers report." },
      ],
    ],
    claims: [
      {
        id: "c1",
        verdict: "supports",
        quote: "more than 2,000 adults over four years",
      },
      { id: "c2", verdict: "partial", quote: "melts stubborn belly fat" },
      { id: "c3", verdict: "differs", quote: "participants of all ages" },
      {
        id: "c4",
        verdict: "none",
        quote: "doctors now recommend upping your intake",
      },
      {
        id: "c5",
        verdict: "supports",
        quote: "carried significantly less visceral fat",
      },
      {
        id: "c6",
        verdict: "partial",
        quote: "espresso and filter coffee worked equally well",
      },
      {
        id: "c7",
        verdict: "differs",
        quote: "the effect disappears if you add milk",
      },
      {
        id: "c8",
        verdict: "none",
        quote: "the biggest breakthrough since the Mediterranean diet",
      },
      {
        id: "c9",
        verdict: "none",
        quote: "sales of coffee machines have already doubled",
      },
    ],
    sources: [
      {
        to: "press",
        cited: true,
        claimId: "c2",
        verdict: "partial",
        pieceQuote: "“melts stubborn belly fat”",
        sourceQuote: "“coffee consumption is linked to lower visceral fat”",
      },
      {
        to: "wire",
        cited: false,
        claimId: "c1",
        verdict: "supports",
        pieceQuote: "“more than 2,000 adults over four years”",
        sourceQuote: "“researchers followed 2,113 adults for four years”",
      },
      {
        to: "press",
        cited: true,
        claimId: "c3",
        verdict: "differs",
        pieceQuote: "“participants of all ages”",
        sourceQuote:
          "“in adults aged 20 to 65” — over-65s were excluded from the study",
      },
      {
        to: null,
        cited: false,
        claimId: "c4",
        verdict: "none",
        pieceQuote: "“doctors now recommend upping your intake”",
        sourceQuote:
          "No source found for this claim — no medical body has issued such a recommendation.",
      },
      {
        to: "wire",
        cited: false,
        claimId: "c5",
        verdict: "supports",
        pieceQuote: "“carried significantly less visceral fat”",
        sourceQuote: "“coffee intake is associated with lower visceral fat”",
      },
      {
        to: "press",
        cited: true,
        claimId: "c6",
        verdict: "partial",
        pieceQuote: "“espresso and filter coffee worked equally well”",
        sourceQuote:
          "“the association held across coffee types, though decaf was not assessed”",
      },
      {
        to: "wire",
        cited: false,
        claimId: "c7",
        verdict: "differs",
        pieceQuote: "“the effect disappears if you add milk”",
        sourceQuote:
          "“no analysis of milk or additives was performed” — the authors made no such claim",
      },
      {
        to: null,
        cited: false,
        claimId: "c8",
        verdict: "none",
        pieceQuote: "“the biggest breakthrough since the Mediterranean diet”",
        sourceQuote:
          "No source found — no nutritionist is quoted or referenced in any traced source.",
      },
      {
        to: null,
        cited: false,
        claimId: "c9",
        verdict: "none",
        pieceQuote: "“sales of coffee machines have already doubled”",
        sourceQuote:
          "No source found — no retail figures exist in any traced source.",
      },
    ],
    pickups: [
      {
        id: "xpost",
        note: "Quoted the headline, dropped every caveat",
        reach: "4.1k reposts",
      },
      { id: "current", note: "Aggregated the piece near-verbatim", reach: "" },
      {
        id: "vital",
        note: "Rewrote it as a “3-cup morning ritual” tip",
        reach: "38k subscribers",
      },
    ],
    pickupsTail: "+214 more posts and articles cite this piece",
    perspectives: [
      {
        id: "meridian",
        diff: "Reports an association, not a cause — quotes an outside researcher",
      },
      {
        id: "nbs",
        diff: "Leads with the study’s limitations and the missing causal link",
      },
      {
        id: "bean",
        diff: "Celebrates the finding uncritically as a win for coffee",
      },
    ],
    filters: [
      {
        label: "Presents the coffee–fat link as causal",
        stance: { bean: "does", meridian: "not", nbs: "not" },
      },
      {
        label: "Mentions the study’s limitations",
        stance: { meridian: "does", nbs: "does", bean: "not" },
      },
    ],
  },

  press: {
    id: "press",
    outlet: "Halden University Press Office",
    monogram: "HU",
    descriptor: "University press release",
    date: "Mar 11, 2026",
    headline: "Coffee drinkers show lower belly fat, Halden study finds",
    teaserParas: 2,
    paras: [
      [
        { t: "A new study from Halden University finds that " },
        { t: "coffee consumption is linked to lower visceral fat", c: "p1" },
        { t: " in adults aged 20 to 65." },
      ],
      [
        { t: "Researchers say the findings suggest that " },
        {
          t: "a daily coffee habit may help keep dangerous belly fat at bay",
          c: "p2",
        },
        { t: "." },
      ],
      [
        { t: "The study followed " },
        { t: "2,113 participants over four years", c: "p3" },
        { t: ", measuring metabolic markers annually." },
      ],
    ],
    claims: [
      { id: "p1", verdict: "supports", quote: "linked to lower visceral fat" },
      {
        id: "p2",
        verdict: "differs",
        quote: "may help keep belly fat at bay",
      },
      {
        id: "p3",
        verdict: "supports",
        quote: "2,113 participants over four years",
      },
    ],
    sources: [
      {
        to: "study",
        cited: true,
        claimId: "p1",
        verdict: "supports",
        pieceQuote: "“linked to lower visceral fat”",
        sourceQuote:
          "“an inverse association between coffee intake and visceral adiposity was observed”",
      },
      {
        to: "study",
        cited: true,
        claimId: "p2",
        verdict: "differs",
        pieceQuote: "“may help keep dangerous belly fat at bay”",
        sourceQuote:
          "“no causal link can be established from this observational design”",
      },
    ],
    pickups: [
      { id: "spark", note: "Upgraded “linked to” into “melts”", reach: "" },
      {
        id: "bean",
        note: "Repeated the release’s framing verbatim",
        reach: "",
      },
    ],
    pickupsTail: "+31 more outlets picked up this release",
    perspectives: [
      {
        id: "wire",
        diff: "Covers the same study but keeps its caveats intact",
      },
    ],
    filters: [],
  },

  wire: {
    id: "wire",
    outlet: "Novum Wire",
    monogram: "NW",
    descriptor: "Wire service brief",
    date: "Mar 11, 2026",
    headline:
      "Study links coffee intake to lower visceral fat; authors urge caution",
    teaserParas: 2,
    paras: [
      [
        { t: "Researchers at Halden University report that " },
        { t: "coffee intake is associated with lower visceral fat", c: "w1" },
        { t: " in a four-year observational study." },
      ],
      [
        { t: "The team " },
        { t: "followed 2,113 adults for four years", c: "w2" },
        {
          t: " and stressed that the design cannot establish cause and effect.",
        },
      ],
    ],
    claims: [
      {
        id: "w1",
        verdict: "supports",
        quote: "associated with lower visceral fat",
      },
      {
        id: "w2",
        verdict: "supports",
        quote: "followed 2,113 adults for four years",
      },
    ],
    sources: [
      {
        to: "study",
        cited: true,
        claimId: "w1",
        verdict: "supports",
        pieceQuote: "“associated with lower visceral fat”",
        sourceQuote: "“an inverse association … was observed”",
      },
      {
        to: "study",
        cited: true,
        claimId: "w2",
        verdict: "supports",
        pieceQuote: "“followed 2,113 adults for four years”",
        sourceQuote: "“n = 2,113; median follow-up 4.1 years”",
      },
    ],
    pickups: [
      {
        id: "spark",
        note: "Took the sample size, ignored the caution",
        reach: "",
      },
      { id: "current", note: "Ran the brief unchanged", reach: "" },
    ],
    pickupsTail: "",
    perspectives: [
      {
        id: "press",
        diff: "Same study, but frames the association as a likely benefit",
      },
    ],
    filters: [],
  },

  study: {
    id: "study",
    outlet: "Annals of Metabolic Health",
    monogram: "AM",
    descriptor: "Peer-reviewed journal",
    date: "Mar 10, 2026",
    origin: true,
    headline:
      "Coffee consumption and metabolic markers: a longitudinal cohort study (n = 2,113)",
    teaserParas: 2,
    paras: [
      [
        { t: "In a prospective cohort of " },
        { t: "2,113 adults aged 20–65", c: "s1" },
        {
          t: " followed for a median of 4.1 years, an inverse association between coffee intake and visceral adiposity was observed.",
        },
      ],
      [
        { t: "The authors note that " },
        {
          t: "no causal link can be established from this observational design",
          c: "s2",
        },
        {
          t: ", and that residual confounding by lifestyle factors is likely.",
        },
      ],
    ],
    claims: [
      { id: "s1", verdict: "supports", quote: "2,113 adults aged 20–65" },
      {
        id: "s2",
        verdict: "supports",
        quote: "no causal link can be established",
      },
    ],
    sources: [],
    pickups: [
      {
        id: "press",
        note: "Softened “association” into a likely benefit",
        reach: "",
      },
      { id: "wire", note: "Kept the caveats intact", reach: "" },
      {
        id: "meridian",
        note: "Quoted the paper directly, with outside comment",
        reach: "",
      },
    ],
    pickupsTail: "+58 more pieces trace back to this study",
    perspectives: [],
    filters: [],
  },

  xpost: {
    id: "xpost",
    outlet: "@morninghealth",
    monogram: "MH",
    descriptor: "X · 98k followers",
    date: "Mar 14, 2026",
    headline: "“Coffee literally MELTS belly fat. Three cups a day. Science.”",
    teaserParas: 1,
    paras: [
      [
        { t: "Coffee literally " },
        { t: "MELTS belly fat", c: "x1" },
        { t: ". Three cups a day. Science. ☕" },
      ],
    ],
    claims: [{ id: "x1", verdict: "partial", quote: "MELTS belly fat" }],
    sources: [
      {
        to: "spark",
        cited: true,
        claimId: "x1",
        verdict: "partial",
        pieceQuote: "“coffee literally MELTS belly fat”",
        sourceQuote:
          "“melts stubborn belly fat, according to a … study” — the tabloid at least mentioned a study",
      },
    ],
    pickups: [],
    pickupsTail:
      "4.1k reposts · 12k likes — reposts carry no further annotation",
    perspectives: [
      {
        id: "meridian",
        diff: "The same story with the causal claim removed entirely",
      },
    ],
    filters: [],
  },

  current: {
    id: "current",
    outlet: "The Current",
    monogram: "TC",
    descriptor: "News aggregator",
    date: "Mar 15, 2026",
    headline: "Tabloid: three coffees a day “melts” belly fat",
    teaserParas: 1,
    paras: [
      [
        { t: "The Daily Spark reports that " },
        { t: "three cups of coffee a day melts belly fat", c: "g1" },
        { t: ", citing a Halden University study of 2,113 adults." },
      ],
    ],
    claims: [
      {
        id: "g1",
        verdict: "supports",
        quote: "three cups a day melts belly fat",
      },
    ],
    sources: [
      {
        to: "spark",
        cited: true,
        claimId: "g1",
        verdict: "supports",
        pieceQuote: "“melts belly fat”",
        sourceQuote:
          "“melts stubborn belly fat” — faithfully attributed to the tabloid, spin included",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      {
        id: "nbs",
        diff: "Covers the study itself rather than the tabloid’s retelling",
      },
    ],
    filters: [],
  },

  vital: {
    id: "vital",
    outlet: "Vital Signs",
    monogram: "VS",
    descriptor: "Wellness newsletter",
    date: "Mar 17, 2026",
    headline: "The 3-cup morning ritual your metabolism will thank you for",
    teaserParas: 1,
    paras: [
      [
        { t: "New research says a " },
        { t: "three-cup coffee ritual torches visceral fat", c: "v1" },
        { t: " — here’s how to build the habit." },
      ],
    ],
    claims: [
      {
        id: "v1",
        verdict: "partial",
        quote: "three-cup ritual torches visceral fat",
      },
    ],
    sources: [
      {
        to: "spark",
        cited: false,
        claimId: "v1",
        verdict: "partial",
        pieceQuote: "“torches visceral fat”",
        sourceQuote:
          "“melts stubborn belly fat” — inferred: same numbers, same day-after timing, no attribution",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      { id: "bean", diff: "Also enthusiastic, but at least names the study" },
    ],
    filters: [],
  },

  meridian: {
    id: "meridian",
    outlet: "The Meridian",
    monogram: "TM",
    descriptor: "Broadsheet",
    date: "Mar 12, 2026",
    headline:
      "Coffee drinkers tend to carry less belly fat — but don’t credit the espresso yet",
    teaserParas: 2,
    paras: [
      [
        { t: "A Halden University cohort study finds that " },
        { t: "coffee intake is associated with lower visceral fat", c: "m1" },
        { t: ", though the authors caution against causal readings." },
      ],
      [
        {
          t: "“Coffee drinkers differ from non-drinkers in many ways,” said Dr. Lena Okafor, an epidemiologist not involved in the work. ",
        },
        {
          t: "“This design simply cannot tell you the coffee did it.”",
          c: "m2",
        },
      ],
    ],
    claims: [
      {
        id: "m1",
        verdict: "supports",
        quote: "associated with lower visceral fat",
      },
      {
        id: "m2",
        verdict: "supports",
        quote: "this design cannot tell you the coffee did it",
      },
    ],
    sources: [
      {
        to: "study",
        cited: true,
        claimId: "m1",
        verdict: "supports",
        pieceQuote: "“associated with lower visceral fat”",
        sourceQuote: "“an inverse association … was observed”",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      {
        id: "spark",
        diff: "Turns the association into a causal “melts” claim",
      },
      {
        id: "nbs",
        diff: "Similar framing; leads even harder with the limitations",
      },
    ],
    filters: [],
  },

  nbs: {
    id: "nbs",
    outlet: "NBS News",
    monogram: "NB",
    descriptor: "National broadcaster",
    date: "Mar 12, 2026",
    headline: "That coffee-and-belly-fat study? Here’s what it actually shows",
    teaserParas: 2,
    paras: [
      [
        { t: "Headlines say coffee melts fat. The study behind them " },
        { t: "shows an association, observed in adults aged 20–65", c: "n1" },
        {
          t: " — and its authors are the first to say it proves no such thing.",
        },
      ],
      [
        { t: "The paper " },
        { t: "explicitly rules out causal conclusions", c: "n2" },
        { t: ", citing its observational design." },
      ],
    ],
    claims: [
      {
        id: "n1",
        verdict: "supports",
        quote: "an association, in adults aged 20–65",
      },
      {
        id: "n2",
        verdict: "supports",
        quote: "explicitly rules out causal conclusions",
      },
    ],
    sources: [
      {
        to: "study",
        cited: true,
        claimId: "n1",
        verdict: "supports",
        pieceQuote: "“an association, observed in adults aged 20–65”",
        sourceQuote:
          "“n = 2,113 adults aged 20–65 … an inverse association was observed”",
      },
      {
        to: "press",
        cited: true,
        claimId: "n2",
        verdict: "partial",
        pieceQuote:
          "“its authors are the first to say it proves no such thing”",
        sourceQuote:
          "The press release itself leaned toward benefit language — the caution comes from the paper, not the release",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      {
        id: "spark",
        diff: "The causal tabloid version this piece is pushing back on",
      },
      {
        id: "meridian",
        diff: "Reaches the same conclusion with an outside expert",
      },
    ],
    filters: [],
  },

  bean: {
    id: "bean",
    outlet: "Bean & Barrel",
    monogram: "BB",
    descriptor: "Coffee trade journal",
    date: "Mar 13, 2026",
    headline: "It’s official: your three-a-day habit is a health plan",
    teaserParas: 1,
    paras: [
      [
        { t: "Halden University confirms what we’ve always known — " },
        { t: "coffee keeps belly fat at bay", c: "b1" },
        { t: ". Pour another." },
      ],
    ],
    claims: [
      { id: "b1", verdict: "partial", quote: "coffee keeps belly fat at bay" },
    ],
    sources: [
      {
        to: "press",
        cited: true,
        claimId: "b1",
        verdict: "partial",
        pieceQuote: "“coffee keeps belly fat at bay”",
        sourceQuote:
          "“may help keep dangerous belly fat at bay” — the release’s hedge (“may”) was dropped",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      {
        id: "spark",
        diff: "Goes further still — full causal claim, no study caveats",
      },
    ],
    filters: [],
  },

  // ——— Second seed: the "downtown car ban" that never was ———
  cwpost: {
    id: "cwpost",
    outlet: "@citywatch",
    monogram: "CW",
    descriptor: "X · 41k followers",
    date: "Jun 2, 2026",
    headline:
      "“BREAKING: Council has BANNED cars from downtown starting January.”",
    teaserParas: 1,
    paras: [
      [
        { t: "BREAKING: Council has " },
        { t: "BANNED cars from downtown starting January", c: "k1" },
        { t: ". It’s done. " },
        { t: "No exemptions, not even deliveries", c: "k2" },
        { t: "." },
      ],
    ],
    claims: [
      { id: "k1", verdict: "differs", quote: "BANNED cars from downtown" },
      {
        id: "k2",
        verdict: "none",
        quote: "no exemptions, not even deliveries",
      },
    ],
    sources: [
      {
        to: "agenda",
        cited: false,
        claimId: "k1",
        verdict: "differs",
        pieceQuote: "“Council has BANNED cars … It’s done.”",
        sourceQuote:
          "“Item 7: motion to open public consultation on a low-traffic downtown pilot” — a proposal to consult, not a ban",
      },
      {
        to: null,
        cited: false,
        claimId: "k2",
        verdict: "none",
        pieceQuote: "“no exemptions, not even deliveries”",
        sourceQuote:
          "No source found — the agenda item contains no exemption details at all.",
      },
    ],
    pickups: [
      {
        id: "gazette",
        note: "Reported the “ban” as fact, citing the post",
        reach: "",
      },
    ],
    pickupsTail: "+1.9k reposts before the correction",
    perspectives: [
      {
        id: "ledger",
        diff: "Read the agenda: it’s a consultation on a pilot, not a ban",
      },
    ],
    filters: [
      {
        label: "Reports the ban as already decided",
        stance: { gazette: "does", ledger: "not" },
      },
    ],
  },

  agenda: {
    id: "agenda",
    outlet: "City of Farrow Council",
    monogram: "CF",
    descriptor: "Public meeting agenda",
    date: "May 30, 2026",
    origin: true,
    headline:
      "Council agenda, June session — Item 7: downtown low-traffic pilot consultation",
    teaserParas: 1,
    paras: [
      [
        { t: "Item 7: " },
        {
          t: "motion to open a public consultation on a low-traffic downtown pilot",
          c: "a1",
        },
        { t: ", with findings to be reported in Q4." },
      ],
    ],
    claims: [
      {
        id: "a1",
        verdict: "supports",
        quote: "motion to open a public consultation",
      },
    ],
    sources: [],
    pickups: [
      {
        id: "cwpost",
        note: "Turned a consultation motion into a decided ban",
        reach: "1.9k reposts",
      },
      { id: "ledger", note: "Reported the item accurately", reach: "" },
    ],
    pickupsTail: "",
    perspectives: [],
    filters: [],
  },

  gazette: {
    id: "gazette",
    outlet: "Farrow Gazette",
    monogram: "FG",
    descriptor: "Local news site",
    date: "Jun 3, 2026",
    headline: "Downtown car ban confirmed for January, sources say",
    teaserParas: 1,
    paras: [
      [
        { t: "The council has " },
        { t: "confirmed a downtown car ban starting January", c: "z1" },
        { t: ", according to widely shared reports." },
      ],
    ],
    claims: [
      { id: "z1", verdict: "differs", quote: "confirmed a downtown car ban" },
    ],
    sources: [
      {
        to: "cwpost",
        cited: true,
        claimId: "z1",
        verdict: "differs",
        pieceQuote: "“confirmed a downtown car ban”",
        sourceQuote:
          "The post itself cites nothing — and the underlying agenda item is a consultation motion",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      { id: "ledger", diff: "Checked the agenda before publishing" },
    ],
    filters: [],
  },

  ledger: {
    id: "ledger",
    outlet: "The Farrow Ledger",
    monogram: "FL",
    descriptor: "Local newspaper",
    date: "Jun 3, 2026",
    headline:
      "No, downtown isn’t banning cars — council will consult on a pilot",
    teaserParas: 1,
    paras: [
      [
        { t: "Despite viral posts, the June agenda shows only " },
        {
          t: "a motion to consult the public on a low-traffic pilot",
          c: "l1",
        },
        { t: ". Nothing has been decided." },
      ],
    ],
    claims: [
      {
        id: "l1",
        verdict: "supports",
        quote: "a motion to consult the public",
      },
    ],
    sources: [
      {
        to: "agenda",
        cited: true,
        claimId: "l1",
        verdict: "supports",
        pieceQuote: "“a motion to consult the public on a low-traffic pilot”",
        sourceQuote:
          "“Item 7: motion to open a public consultation on a low-traffic downtown pilot”",
      },
    ],
    pickups: [],
    pickupsTail: "",
    perspectives: [
      { id: "gazette", diff: "Reported the viral version as confirmed" },
    ],
    filters: [],
  },
};

export const FEED: { id: string; teaser: string }[] = [
  {
    id: "spark",
    teaser:
      "Traces back to a university press release — 3 claims have no source",
  },
  {
    id: "cwpost",
    teaser: "A “decided ban” that traces back to a consultation motion",
  },
];

export const VERDICT_META: Record<Verdict, { label: string; color: string }> = {
  supports: { label: "supports", color: "#0E8A5F" },
  partial: { label: "partial", color: "#B07C10" },
  differs: { label: "differs", color: "#C2453F" },
  none: { label: "no source found", color: "#8A867D" },
};
