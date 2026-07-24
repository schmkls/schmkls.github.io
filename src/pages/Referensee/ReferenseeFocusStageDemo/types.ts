/**
 * Types for the Referensee focus-stage demo seed. Self-contained — nothing
 * here is shared with the rest of the site.
 */

export type Verdict = "supports" | "partial" | "differs" | "none";

/** A run of body text; `c` marks it as the claim span for that claim id. */
type Seg = { t: string; c?: string };

type Claim = { id: string; verdict: Verdict; quote: string };

/**
 * One traced source relation of a piece: what the piece says vs what the
 * source actually says about one claim. `to: null` = no source found.
 */
type SourceLink = {
  to: string | null;
  cited: boolean;
  claimId: string;
  pieceQuote: string;
  sourceQuote: string;
  verdict: Verdict;
};

type Pickup = { id: string; note: string; reach: string };

export type Stance = "does" | "not" | "na";

export type Piece = {
  id: string;
  outlet: string;
  monogram: string;
  descriptor: string;
  date: string;
  headline: string;
  paras: Seg[][];
  /** How many paragraphs the collapsed focus card shows. */
  teaserParas: number;
  claims: Claim[];
  sources: SourceLink[];
  pickups: Pickup[];
  /** Dashed tail pill shown when the pickup list is a sample ("" = none). */
  pickupsTail: string;
  perspectives: { id: string; diff: string }[];
  filters: { label: string; stance: Partial<Record<string, Stance>> }[];
  /** True when nothing is upstream — the earliest piece in the chain. */
  origin?: boolean;
};
