import type { Outlet, Story } from "./types";

/**
 * All outlets, people, publications and stories below are fictional.
 *
 * Story 1 ("coffee") mirrors a documented pattern: most causal exaggeration
 * in health news originates in university press releases, and news stories
 * copy it (Sumner et al., BMJ 2014). Story 2 ("zone") mirrors how city
 * traffic proposals get reported as decided bans.
 */

const outletList: Outlet[] = [
  // Coffee story
  { id: "dailyspark", name: "The Daily Spark", label: "Tabloid", short: "DS" },
  {
    id: "annals",
    name: "Annals of Metabolic Health",
    label: "Peer-reviewed journal",
    short: "AM",
  },
  {
    id: "cnreviews",
    name: "Clinical Nutrition Reviews",
    label: "Peer-reviewed journal",
    short: "CN",
  },
  {
    id: "halden",
    name: "Halden University",
    label: "University press office",
    short: "HU",
  },
  { id: "novum", name: "Novum Wire", label: "Wire agency", short: "NW" },
  {
    id: "morninghealth",
    name: "@morninghealth",
    label: "X · 98k followers",
    short: "MH",
  },
  {
    id: "thecurrent",
    name: "The Current",
    label: "News aggregator",
    short: "TC",
  },
  {
    id: "vitalsigns",
    name: "Vital Signs",
    label: "Wellness newsletter",
    short: "VS",
  },
  { id: "meridian", name: "The Meridian", label: "Broadsheet", short: "ME" },
  { id: "nbs", name: "NBS News", label: "Public broadcaster", short: "NB" },
  { id: "metropost", name: "The Metro Post", label: "Tabloid", short: "MP" },
  {
    id: "beanbarrel",
    name: "Bean & Barrel",
    label: "Coffee-trade journal",
    short: "BB",
  },
  // Zero-emission zone story
  {
    id: "urbanpulse",
    name: "@urbanpulse",
    label: "X · 118k followers",
    short: "UP",
  },
  {
    id: "vhamn",
    name: "City of Västerhamn",
    label: "Transport office",
    short: "VH",
  },
  {
    id: "motorbladet",
    name: "Motorbladet",
    label: "Motoring site",
    short: "MB",
  },
  {
    id: "henrikjarl",
    name: "@henrikjarl",
    label: "X · Member of Parliament",
    short: "HJ",
  },
  {
    id: "evlinnea",
    name: "@evlinnea",
    label: "X · 46k followers",
    short: "EL",
  },
  { id: "bilisten", name: "Bilisten", label: "Motoring tabloid", short: "BI" },
  {
    id: "faktakollen",
    name: "Faktakollen",
    label: "Independent fact-checker",
    short: "FK",
  },
  {
    id: "vtidning",
    name: "Västerhamns Tidning",
    label: "Local daily",
    short: "VT",
  },
  // Breach story
  {
    id: "kommunservice",
    name: "Kommunservice AB",
    label: "Company statement",
    short: "KS",
  },
  {
    id: "cyberskydd",
    name: "Cyberskyddsmyndigheten",
    label: "National cyber authority",
    short: "CM",
  },
  {
    id: "linasund",
    name: "Lina Sund",
    label: "Security researcher",
    short: "LS",
  },
  {
    id: "sakerhetsbloggen",
    name: "Säkerhetsbloggen",
    label: "Security blog",
    short: "SB",
  },
  {
    id: "sunnedalsposten",
    name: "Sunnedals-Posten",
    label: "Local daily",
    short: "SP",
  },
  {
    id: "systemvarlden",
    name: "Systemvärlden",
    label: "IT trade press",
    short: "SV",
  },
  { id: "itlarm", name: "@it_larm", label: "X · 31k followers", short: "IL" },
  // Squad story
  {
    id: "laktarbladet",
    name: "Läktarbladet",
    label: "Sports site",
    short: "LB",
  },
  {
    id: "federation",
    name: "Football Federation",
    label: "Press conference",
    short: "FF",
  },
  {
    id: "clubnorrviken",
    name: "IFK Norrviken",
    label: "Club statement",
    short: "IN",
  },
  {
    id: "vinterszn",
    name: "@vinterszn",
    label: "X · Fan account",
    short: "VZ",
  },
  { id: "overtid", name: "Övertid", label: "Football podcast", short: "ÖT" },
  {
    id: "straffomradet",
    name: "Straffområdet",
    label: "Analytics blog",
    short: "ST",
  },
  { id: "uppspelet", name: "Uppspelet", label: "Tactics blog", short: "US" },
  {
    id: "norrvikenkuriren",
    name: "Norrviken-Kuriren",
    label: "Local daily",
    short: "NK",
  },
];

const outletsById = new Map(outletList.map((o) => [o.id, o]));

export function getOutlet(id: string): Outlet {
  return (
    outletsById.get(id) ?? { id, name: id, label: "Unknown source", short: "?" }
  );
}

export const stories: Story[] = [
  {
    id: "coffee",
    kind: "article",
    outletId: "dailyspark",
    author: "Jess Harmon",
    title: "Your coffee habit could be SHRINKING your brain, scientists warn",
    date: "15 Jul",
    excerpt:
      "New research links three cups a day to a smaller memory centre — and experts fear millions could be at risk.",
    originNote:
      "Traces to a peer-reviewed study — via a press release that added the causal spin",
    body: [
      [
        { text: "It is the warning no coffee lover wants to wake up to: " },
        {
          text: "three cups a day may be reshaping the brain's memory centre",
          claimId: "c-reshape",
        },
        { text: " — and millions of us drink more." },
      ],
      [
        { text: "Researchers at Halden University examined " },
        { text: "2,143 adults aged 45 to 65", claimId: "c-cohort" },
        { text: " and found that " },
        {
          text: "those drinking three or more cups a day had, on average, a 2.9 per cent smaller hippocampus",
          claimId: "c-effect",
        },
        { text: " — the region that files away memories." },
      ],
      [
        {
          text: "Experts now fear millions of heavy drinkers could be at risk of earlier memory decline",
          claimId: "c-experts",
        },
        { text: ", and the findings are already changing habits: " },
        {
          text: "sales of decaf have surged by 40 per cent as the news spread",
          claimId: "c-decaf",
        },
        { text: "." },
      ],
      [
        {
          text: "It is a sharp turnaround for a drink long treated as harmless — ",
        },
        {
          text: "coffee has repeatedly been linked to benefits, from liver health to longevity",
          claimId: "c-benefits",
        },
        { text: "." },
      ],
      [
        { text: "Now, " },
        {
          text: "the researchers behind the study are urging coffee lovers to cut back",
          claimId: "c-urging",
        },
        {
          text: " while the science gets settled. Perhaps make the next one a half-caf.",
        },
      ],
    ],
    claims: [
      {
        id: "c-reshape",
        status: "sourced",
        nodeId: "n-release",
        note: "This exact phrasing first appears in the university press release. The study itself reports an association — not a change over time.",
      },
      {
        id: "c-cohort",
        status: "sourced",
        nodeId: "n-paper",
        note: "Matches the study: a cross-sectional cohort of 2,143 adults with self-reported coffee intake.",
      },
      {
        id: "c-effect",
        status: "sourced",
        nodeId: "n-paper",
        note: "Matches the study's headline finding. The paper adds that the difference is within normal anatomical variation.",
      },
      {
        id: "c-experts",
        status: "unsupported",
        note: "No source found. No expert is named or quoted anywhere in the piece.",
      },
      {
        id: "c-decaf",
        status: "unsupported",
        note: "No source found — this figure first appears in this article.",
      },
      {
        id: "c-benefits",
        status: "sourced",
        nodeId: "n-umbrella",
        note: "Backed by a 2019 umbrella review of coffee and health outcomes, which the article links directly.",
      },
      {
        id: "c-urging",
        status: "disputed",
        nodeId: "n-paper",
        note: "Contradicted by the study itself: the authors write that “no consumption advice can be drawn from these data”.",
      },
    ],
    upward: [
      {
        id: "n-umbrella",
        outletId: "cnreviews",
        title:
          "Coffee consumption and health: an umbrella review of 218 meta-analyses",
        date: "Mar 2019",
        note: "Used for the background line on coffee's health benefits.",
        cited: true,
      },
      {
        id: "n-paper",
        outletId: "annals",
        title:
          "Habitual caffeine intake and hippocampal volume in mid-life adults: a cross-sectional analysis",
        date: "2 Jul",
        note: "The underlying study. Observational, self-reported intake — and the authors explicitly caution against causal readings.",
        cited: false,
      },
      {
        id: "n-release",
        outletId: "halden",
        title:
          "Three cups a day may be reshaping your brain, Halden study finds",
        date: "13 Jul",
        time: "08:30",
        note: "Introduces the causal phrasing. The paper's own wording — “associated with” — does not appear in the headline.",
        cited: false,
      },
      {
        id: "n-wire",
        outletId: "novum",
        title: "Study links heavy coffee drinking to smaller memory centres",
        date: "13 Jul",
        time: "10:02",
        note: "Reproduces the press release nearly verbatim. Likely the article's direct source.",
        cited: false,
      },
    ],
    downward: [
      {
        id: "n-mhealth",
        outletId: "morninghealth",
        title:
          "“Coffee is literally shrinking your brain. Study of 2,000+ adults. Wild.”",
        date: "15 Jul",
        reach: "4.1k reposts",
        note: "Drops the “may” — states causation as fact.",
      },
      {
        id: "n-current",
        outletId: "thecurrent",
        title: "Coffee linked to brain shrinkage, study suggests",
        date: "15 Jul",
        note: "Aggregates the Daily Spark piece, inheriting the unsourced “millions at risk” line.",
      },
      {
        id: "n-vital",
        outletId: "vitalsigns",
        title: "Why I'm quitting espresso (again)",
        date: "16 Jul",
        note: "Repeats the 40 per cent decaf figure — which no source supports.",
      },
    ],
    morePickups: 212,
    filters: [
      {
        id: "f-causal",
        label: "Presents the link as causal",
        yesLabel: "Presents it as causal",
        noLabel: "Treats it as an unproven association",
      },
      {
        id: "f-caveat",
        label: "Mentions the study can't show cause and effect",
        yesLabel: "Mentions the limits",
        noLabel: "Omits the limits",
      },
      {
        id: "f-advice",
        label: "Advises readers to cut back",
        yesLabel: "Advises cutting back",
        noLabel: "Says no change is warranted",
      },
    ],
    perspectives: [
      {
        id: "p-meridian",
        outletId: "meridian",
        title: "No, coffee probably isn't shrinking your brain",
        date: "15 Jul",
        diff: "Walks through the study design: cross-sectional, self-reported intake, and a difference within normal anatomical variation.",
        stances: { "f-causal": "no", "f-caveat": "yes", "f-advice": "no" },
      },
      {
        id: "p-nbs",
        outletId: "nbs",
        title: "What the coffee-and-memory study does — and doesn't — show",
        date: "15 Jul",
        diff: "Quotes an independent neurologist: heavy coffee drinkers also sleep less, which alone could explain the gap.",
        stances: { "f-causal": "no", "f-caveat": "yes" },
      },
      {
        id: "p-metro",
        outletId: "metropost",
        title: "Brain experts' coffee warning: how much is too much?",
        date: "15 Jul",
        diff: "Keeps the causal framing and adds a two-cup “safe limit” that appears in no source.",
        stances: { "f-causal": "yes", "f-caveat": "no", "f-advice": "yes" },
      },
      {
        id: "p-bean",
        outletId: "beanbarrel",
        title: "Cohort authors: no reason to change your coffee habits",
        date: "16 Jul",
        diff: "Interviews the study's lead author, who calls the coverage “a textbook overstatement”.",
        stances: { "f-causal": "no", "f-caveat": "yes", "f-advice": "no" },
      },
      {
        id: "p-vital",
        outletId: "vitalsigns",
        title: "Your brain on caffeine: time for a reset week?",
        date: "16 Jul",
        diff: "Accepts the causal framing wholesale and turns it into a seven-day “caffeine reset” plan.",
        stances: { "f-causal": "yes", "f-advice": "yes" },
      },
    ],
  },
  {
    id: "zone",
    kind: "post",
    outletId: "urbanpulse",
    title:
      "🚨 BREAKING: Västerhamn will BAN all petrol and diesel cars from the ENTIRE city from January 2028…",
    date: "14 Jul",
    originNote:
      "Traces to a consultation document — which says less than the post does",
    body: [
      [
        { text: "🚨 BREAKING: Västerhamn " },
        { text: "will BAN", claimId: "z-decided" },
        { text: " " },
        { text: "all petrol and diesel cars", claimId: "z-cars" },
        { text: " from " },
        { text: "the ENTIRE city", claimId: "z-scope" },
        { text: " " },
        { text: "from January 2028", claimId: "z-date" },
        { text: ". " },
        { text: "No exceptions — not even for residents", claimId: "z-exempt" },
        { text: "." },
      ],
      [
        {
          text: "The war on drivers has begun. RT so people see what's coming.",
        },
      ],
    ],
    claims: [
      {
        id: "z-decided",
        status: "disputed",
        nodeId: "n-remiss",
        note: "Nothing is decided. The document is a proposal open for consultation until 15 October; the council votes next spring.",
      },
      {
        id: "z-cars",
        status: "sourced",
        nodeId: "n-remiss",
        note: "Matches the proposal, which covers petrol and diesel passenger cars.",
      },
      {
        id: "z-scope",
        status: "disputed",
        nodeId: "n-remiss",
        note: "The proposal covers a 20-block zero-emission zone in the city core — about 2 per cent of Västerhamn's area.",
      },
      {
        id: "z-date",
        status: "sourced",
        nodeId: "n-remiss",
        note: "Matches the proposed start date — if the plan is adopted unchanged.",
      },
      {
        id: "z-exempt",
        status: "disputed",
        nodeId: "n-remiss",
        note: "The proposal exempts residents' existing vehicles until 2032, plus emergency and mobility transport.",
      },
    ],
    upward: [
      {
        id: "n-remiss",
        outletId: "vhamn",
        title:
          "Zero-emission zone in the city core — consultation draft (remiss 2026:14)",
        date: "8 Jul",
        note: "The origin. A proposal from the city's transport office, open for public consultation until 15 October.",
        cited: false,
      },
      {
        id: "n-motorbladet",
        outletId: "motorbladet",
        title:
          "Västerhamn wants to shut petrol cars out of the city core by 2028",
        date: "12 Jul",
        note: "First coverage of the draft. The body says “proposal” — the headline already says “shut out”. Likely where the post found the story.",
        cited: false,
      },
    ],
    downward: [
      {
        id: "n-evlinnea",
        outletId: "evlinnea",
        title: "“Huge if true 👀”",
        date: "14 Jul",
        reach: "2.1k reposts",
        note: "Spread the claim onward before anyone had checked it.",
      },
      {
        id: "n-jarl",
        outletId: "henrikjarl",
        title:
          "“First Västerhamn, then the rest of the country. Remember this in September.”",
        date: "15 Jul",
        reach: "7.2k reposts",
        note: "A member of parliament reshares the post's framing — scope and all — to a national audience.",
      },
      {
        id: "n-bilisten",
        outletId: "bilisten",
        title: "City set to outlaw petrol cars — “residents are furious”",
        date: "15 Jul",
        note: "Writes the story up from the viral post, keeping “entire city” and adding unnamed furious residents.",
      },
    ],
    morePickups: 1409,
    filters: [
      {
        id: "zf-decided",
        label: "Describes the ban as already decided",
        yesLabel: "Reports it as decided",
        noLabel: "Notes it's a proposal under consultation",
      },
      {
        id: "zf-scope",
        label: "Says it covers the whole city",
        yesLabel: "Says the whole city",
        noLabel: "Notes it's a 20-block core zone",
      },
      {
        id: "zf-war",
        label: "Frames it as an attack on drivers",
        yesLabel: "Frames it as anti-driver",
        noLabel: "Frames it as an air-quality measure",
      },
    ],
    perspectives: [
      {
        id: "p-fakta",
        outletId: "faktakollen",
        title: "No, Västerhamn has not banned petrol cars",
        date: "16 Jul",
        diff: "Checks the post against the draft: proposal-stage, core zone only, resident exemptions until 2032.",
        stances: { "zf-decided": "no", "zf-scope": "no" },
      },
      {
        id: "p-vtidning",
        outletId: "vtidning",
        title: "What the zero-emission proposal for the core actually says",
        date: "15 Jul",
        diff: "Maps the 20 blocks, lists the exemptions, and interviews the transport chief on the consultation timeline.",
        stances: { "zf-decided": "no", "zf-scope": "no", "zf-war": "no" },
      },
      {
        id: "p-motor",
        outletId: "motorbladet",
        title:
          "Västerhamn wants to shut petrol cars out of the city core by 2028",
        date: "12 Jul",
        diff: "Accurate in the body text — but its headline verb “shut out” is where the ban framing started.",
        stances: { "zf-decided": "no", "zf-scope": "no" },
      },
      {
        id: "p-bilisten",
        outletId: "bilisten",
        title: "City set to outlaw petrol cars — “residents are furious”",
        date: "15 Jul",
        diff: "Treats adoption as a formality and quotes only opponents.",
        stances: { "zf-decided": "yes", "zf-scope": "yes", "zf-war": "yes" },
      },
    ],
  },
  {
    id: "breach",
    kind: "article",
    outletId: "nbs",
    author: "Sara Lindqvist",
    title:
      "Breach at payroll provider exposes data on 200,000 municipal employees",
    date: "16 Jul",
    excerpt:
      "Kommunservice AB says the intrusion hit systems used by 61 municipalities. Samples of the data appeared online days before the company's timeline begins.",
    originNote:
      "Draws on three independent sources — which disagree on the timeline",
    body: [
      [
        {
          text: "Personal data on roughly 200,000 municipal employees has leaked after a breach at payroll provider Kommunservice AB. ",
        },
        {
          text: "The company says the intrusion was detected on Tuesday morning",
          claimId: "b-detected",
        },
        { text: " and that affected systems were isolated within hours." },
      ],
      [
        { text: "But the timeline is contested: " },
        {
          text: "samples of the data were offered on a criminal forum already on Sunday",
          claimId: "b-forum",
        },
        { text: ", two days before the company says it noticed anything." },
      ],
      [
        {
          text: "The national cyber authority has issued guidance to the 61 affected municipalities",
          claimId: "b-cert",
        },
        {
          text: ", and unions are demanding to know whether personal identity numbers are among the leaked fields.",
        },
      ],
      [
        { text: "According to sources in the incident response, " },
        {
          text: "the attackers are believed to be the same group behind last year's intrusion at a regional health authority",
          claimId: "b-attrib",
        },
        { text: ". Kommunservice declined to comment on attribution." },
      ],
    ],
    claims: [
      {
        id: "b-detected",
        status: "sourced",
        nodeId: "n-ksstatement",
        note: "Matches the company's public statement from 15 July.",
      },
      {
        id: "b-forum",
        status: "sourced",
        nodeId: "n-lina",
        note: "Backed by researcher Lina Sund's forum screenshots, posted 13 July — before the company's stated detection time.",
      },
      {
        id: "b-cert",
        status: "sourced",
        nodeId: "n-cyber",
        note: "Matches the authority's advisory 2026-11, published this morning.",
      },
      {
        id: "b-attrib",
        status: "unsupported",
        note: "No source found. No named authority has made any attribution — the line rests on anonymous “sources”.",
      },
    ],
    upward: [
      {
        id: "n-lina",
        outletId: "linasund",
        title:
          "Thread: fresh “kommun” payroll dump being shopped on a leak forum",
        date: "13 Jul",
        note: "Independent researcher's find — the earliest public trace of the breach.",
        cited: true,
      },
      {
        id: "n-ksstatement",
        outletId: "kommunservice",
        title: "Information regarding an IT security incident",
        date: "15 Jul",
        note: "The company's version: detection Tuesday, systems isolated, police report filed.",
        cited: true,
      },
      {
        id: "n-cyber",
        outletId: "cyberskydd",
        title: "Advisory 2026-11: incident at a municipal payroll provider",
        date: "16 Jul",
        note: "Guidance to affected municipalities; neither confirms nor dates the intrusion.",
        cited: true,
      },
    ],
    downward: [
      {
        id: "n-itlarm",
        outletId: "itlarm",
        title:
          "“200k municipal employees leaked. Personnummer likely included. You can't rotate your identity.”",
        date: "16 Jul",
        reach: "1.8k reposts",
        note: "Asserts identity numbers are included — which no source has confirmed.",
      },
      {
        id: "n-sunnedal",
        outletId: "sunnedalsposten",
        title: "Municipal staff in Sunnedal among those hit by payroll breach",
        date: "16 Jul",
        note: "Localises the NBS story for one of the 61 municipalities.",
      },
    ],
    morePickups: 58,
    filters: [
      {
        id: "bf-timeline",
        label: "Questions the company's disclosure timeline",
        yesLabel: "Challenges the timeline",
        noLabel: "Accepts the company's timeline",
      },
      {
        id: "bf-pnr",
        label: "Reports that identity numbers were leaked",
        yesLabel: "Says identity numbers leaked",
        noLabel: "Says that's unconfirmed",
      },
    ],
    perspectives: [
      {
        id: "p-sb",
        outletId: "sakerhetsbloggen",
        title:
          "The Kommunservice breach was visible four days before the press release",
        date: "16 Jul",
        diff: "Leads with the forum listing and calls the company's “detected Tuesday” line untenable.",
        stances: { "bf-timeline": "yes", "bf-pnr": "yes" },
      },
      {
        id: "p-sunnedal",
        outletId: "sunnedalsposten",
        title:
          "2,300 municipal staff in Sunnedal caught in national data breach",
        date: "16 Jul",
        diff: "Focuses on what affected employees should do; treats the company's timeline as given.",
        stances: { "bf-timeline": "no", "bf-pnr": "yes" },
      },
      {
        id: "p-system",
        outletId: "systemvarlden",
        title:
          "Kommunservice attack came through an unpatched file-transfer service",
        date: "16 Jul",
        diff: "Purely technical reconstruction; notes the leaked fields are still unverified.",
        stances: { "bf-pnr": "no" },
      },
      {
        id: "p-ks",
        outletId: "kommunservice",
        title: "Update: what we know about the incident",
        date: "16 Jul",
        diff: "The company's own telling: no evidence of misuse, identity numbers “not confirmed”, timeline unchanged.",
        stances: { "bf-timeline": "no", "bf-pnr": "no" },
      },
    ],
  },
  {
    id: "vinter",
    kind: "article",
    outletId: "laktarbladet",
    author: "Peter Ström",
    title:
      "Vinter left out of September squad — “purely about form”, insists Åkerlund",
    date: "12 Jul",
    excerpt:
      "The 21-year-old winger misses the qualifiers despite his spring numbers. The federation says form; others read the April injury differently.",
    originNote:
      "Traces to Friday's press conference — one detail has no source",
    body: [
      [
        {
          text: "Elias Vinter is not in the squad for September's qualifiers. ",
        },
        {
          text: "“It is purely about form over the last two months,” national coach Mats Åkerlund said",
          claimId: "v-quote",
        },
        { text: " as the 26-man list was presented on Friday." },
      ],
      [
        { text: "The winger's spring was interrupted: " },
        {
          text: "Vinter has started only once since his hamstring injury in April",
          claimId: "v-injury",
        },
        { text: ", though he scored twice in that appearance." },
      ],
      [
        { text: "The omission has not landed well. " },
        {
          text: "People close to the player say he learned of the decision through social media",
          claimId: "v-social",
        },
        { text: ", before any call from the federation." },
      ],
    ],
    claims: [
      {
        id: "v-quote",
        status: "sourced",
        nodeId: "n-presser",
        note: "Matches the federation's press-conference transcript.",
      },
      {
        id: "v-injury",
        status: "sourced",
        nodeId: "n-clubmed",
        note: "Matches IFK Norrviken's squad update from 28 June.",
      },
      {
        id: "v-social",
        status: "unsupported",
        note: "No source found — attributed only to unnamed “people close to the player”. No other outlet reports it.",
      },
    ],
    upward: [
      {
        id: "n-clubmed",
        outletId: "clubnorrviken",
        title: "Squad update: Vinter back in full training",
        date: "28 Jun",
        note: "Club medical note used for the injury timeline.",
        cited: true,
      },
      {
        id: "n-presser",
        outletId: "federation",
        title:
          "Press conference: squad announcement for the September qualifiers",
        date: "11 Jul",
        note: "The Åkerlund quotes come from here; the transcript is public.",
        cited: true,
      },
    ],
    downward: [
      {
        id: "n-fan",
        outletId: "vinterszn",
        title:
          "“learned it from social media. the federation should be ashamed 🤬”",
        date: "12 Jul",
        reach: "12k reposts",
        note: "Amplifies the unsourced detail as fact — it becomes the story's angle.",
      },
      {
        id: "n-podcast",
        outletId: "overtid",
        title: "Ep. 214: The Vinter snub",
        date: "13 Jul",
        note: "Spends 40 minutes on the social-media detail no source has confirmed.",
      },
    ],
    morePickups: 89,
    filters: [
      {
        id: "vf-selected",
        label: "Argues Vinter should have been in the squad",
        yesLabel: "Argues he should be in",
        noLabel: "Backs the coach's call",
      },
      {
        id: "vf-social",
        label: "Treats the social-media detail as established",
        yesLabel: "Treats it as fact",
        noLabel: "Notes it's unconfirmed",
      },
    ],
    perspectives: [
      {
        id: "p-straff",
        outletId: "straffomradet",
        title: "The numbers make the Vinter omission indefensible",
        date: "12 Jul",
        diff: "Builds the case from his per-90 stats — best among the league's wingers this spring.",
        stances: { "vf-selected": "yes", "vf-social": "no" },
      },
      {
        id: "p-uppspelet",
        outletId: "uppspelet",
        title: "Why Åkerlund's 4-3-3 has no room for Vinter right now",
        date: "12 Jul",
        diff: "Tactical read: without the ball Vinter doesn't fit the press — “form” was the polite word.",
        stances: { "vf-selected": "no" },
      },
      {
        id: "p-kuriren",
        outletId: "norrvikenkuriren",
        title: "Vinter misses out as squad is named",
        date: "11 Jul",
        diff: "Straight report of the announcement; carries the quote, skips the drama.",
        stances: {},
      },
    ],
  },
];
