export type Outlet = {
  id: string;
  /** Display name, e.g. "The Daily Spark" or "@urbanpulse" */
  name: string;
  /** Small descriptor shown next to the name, e.g. "Tabloid" or "X · 118k followers" */
  label: string;
  /** 1–2 character monogram for the avatar */
  short: string;
};

export type ClaimStatus = "sourced" | "unsupported" | "disputed";

export type Claim = {
  id: string;
  status: ClaimStatus;
  /** Trail node that backs (sourced) or contradicts (disputed) the claim */
  nodeId?: string;
  /** Explanation shown when the claim is tapped */
  note: string;
};

type Segment = { text: string; claimId?: string };
export type Paragraph = Segment[];

export type TrailNode = {
  id: string;
  outletId: string;
  title: string;
  date: string;
  time?: string;
  /** What this source is used for / what this pickup added */
  note: string;
  /** Upward nodes: explicitly cited by the piece vs inferred by Referensee */
  cited?: boolean;
  /** Downward nodes: spread indicator, e.g. "4.1k reposts" */
  reach?: string;
};

export type Filter = {
  id: string;
  /** The contested claim, e.g. "Presents the link as causal" */
  label: string;
  /** Group heading for coverage that takes the stance */
  yesLabel: string;
  /** Group heading for coverage that takes the opposite stance */
  noLabel: string;
};

export type Perspective = {
  id: string;
  outletId: string;
  title: string;
  date: string;
  /** One line on what this telling reports differently */
  diff: string;
  /** filterId -> stance; a missing filterId means the piece doesn't address it */
  stances: Record<string, "yes" | "no">;
};

export type Story = {
  id: string;
  kind: "article" | "post";
  outletId: string;
  author?: string;
  title: string;
  date: string;
  /** Feed-card snippet (articles only) */
  excerpt?: string;
  /** Feed-card provenance one-liner */
  originNote: string;
  body: Paragraph[];
  claims: Claim[];
  /** Chronological: origin first, ending just before the piece itself */
  upward: TrailNode[];
  /** Who picked it up afterwards */
  downward: TrailNode[];
  morePickups?: number;
  filters: Filter[];
  perspectives: Perspective[];
};
