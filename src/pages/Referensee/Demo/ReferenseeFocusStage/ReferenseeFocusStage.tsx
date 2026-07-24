/**
 * Referensee "focus stage" demo — an interactive, fictional-data walkthrough.
 * One piece sits in focus; where its information came from is laid out above
 * (annotated with verdicts), where it went below, and how others tell the same
 * story in a rail to the right. Clicking any card refocuses the stage with a
 * spatial travel animation.
 *
 * Two connection treatments, picked via the `mode` prop: "lines" draws an SVG
 * map with verdict chips over the stage; "sections" partitions sources into
 * SUPPORTS / PARTIAL / DIFFERS / NO SOURCE FOUND columns.
 *
 * Deliberately self-contained: own palette, own Google-Fonts load, inline
 * styles + a scoped <style> block — no coupling to the site's theme.
 */
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { FEED, PIECES, VERDICT_META } from "./seed";
import type { Piece, Stance, Verdict } from "./types";

type Mode = "lines" | "sections";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..700&family=Instrument+Sans:wght@400..700&family=Spline+Sans+Mono:wght@400..600&display=swap";

const SERIF = "'Newsreader',serif";
const SANS = "'Instrument Sans',system-ui,sans-serif";
const MONO = "'Spline Sans Mono',monospace";

const RAIL_W = "clamp(310px,27vw,380px)";

const VERDICTS: Verdict[] = ["supports", "partial", "differs", "none"];

/**
 * Hover states, media queries, and keyframes — everything inline styles can't
 * express. Hooks are ids and data attributes so the demo defines no CSS
 * classes. `!important` beats the inline styles; hover transforms stay
 * non-important so the FLIP travel animation's inline transform wins mid-fly.
 */
const DEMO_CSS = `
#rfs-root ::selection{background:#E6E2D4;}
@keyframes rfs-fade{from{opacity:0;}to{opacity:1;}}
[data-rfs-hover="feed"]:hover{border-color:#1C1B18 !important;box-shadow:0 8px 24px -14px rgba(28,27,24,0.3);}
[data-rfs-hover="g2"]:hover{opacity:1 !important;border-color:#B8B4A9 !important;}
[data-rfs-hover="up"]:hover{transform:translateY(-2px);border-color:#8A867D !important;box-shadow:0 10px 24px -14px rgba(28,27,24,0.35) !important;}
[data-rfs-hover="side"]:hover{transform:translateX(-2px);border-color:#8A867D !important;box-shadow:0 8px 20px -14px rgba(28,27,24,0.35);}
[data-rfs-hover="down"]:hover{transform:translateY(2px);border-color:#8A867D !important;box-shadow:0 10px 24px -14px rgba(28,27,24,0.35);}
[data-rfs-hover="ctl"]:hover{color:#1C1B18 !important;}
[data-rfs-hover="filter"]:hover{border-color:#8A867D !important;}
@media (max-width:1250px){
#rfs-mid{grid-template-columns:1fr !important;}
#rfs-rail{border-left:none !important;border-top:1px solid #E0DDD5;}
#rfs-rail-list{display:flex !important;flex-direction:row !important;overflow-x:auto;gap:12px;padding-bottom:10px;}
#rfs-rail-list > div{min-width:290px;flex:0 0 auto;}
#rfs-srcin,#rfs-pkin{margin-right:0 !important;}
#rfs-svg path[data-down]{display:none;}
}
@media (max-width:900px){
#rfs-crumbs{display:none;}
#rfs-legend{display:none;}
}
@media (max-width:720px){
#rfs-svg,#rfs-chips{display:none !important;}
}
`;

/* ------------------------------ geometry ------------------------------- */

type Line = {
  d: string;
  color: string;
  dash: string;
  claimId: string | null;
  down: boolean;
};
type Chip = {
  x: number;
  y: number;
  label: string;
  color: string;
  claimId: string;
  /** Index into the focus piece's `sources`, for the popover lookup. */
  i: number;
};
type G2Line = { d: string; color: string; dash: string };
type Geometry = {
  lines: Line[];
  chips: Chip[];
  g2: G2Line[];
  w: number;
  h: number;
};

const EMPTY_GEOMETRY: Geometry = { lines: [], chips: [], g2: [], w: 0, h: 0 };

type PopoverState = {
  x: number;
  y: number;
  claim: string;
  src: string;
  verdict: string;
  color: string;
  cited: boolean;
};

/* --------------------------- pure helpers ------------------------------ */

function parseHash(): string | null {
  const m = /#piece\/([a-z]+)/i.exec(window.location.hash);
  return m && PIECES[m[1]] ? m[1] : null;
}

/** Distinct direct-source piece ids, in order of appearance. */
function gen1IdsOf(piece: Piece): string[] {
  const ids: string[] = [];
  for (const s of piece.sources) {
    if (s.to && !ids.includes(s.to)) ids.push(s.to);
  }
  return ids;
}

type G2Link = { from: string; to: string; cited: boolean; verdict: Verdict };

/** Sources-of-sources: the faded second generation above the gen-1 row. */
function gen2Of(piece: Piece, gen1Ids: string[]) {
  const ids: string[] = [];
  const links: G2Link[] = [];
  for (const gid of gen1Ids) {
    for (const s of PIECES[gid].sources) {
      if (!s.to || gen1Ids.includes(s.to) || s.to === piece.id) continue;
      if (!ids.includes(s.to)) ids.push(s.to);
      if (!links.some((l) => l.from === s.to && l.to === gid)) {
        links.push({ from: s.to, to: gid, cited: s.cited, verdict: s.verdict });
      }
    }
  }
  return { ids, links };
}

function snapRects(root: HTMLElement): Record<string, DOMRect> {
  const map: Record<string, DOMRect> = {};
  root.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
    map[el.dataset.flip ?? ""] = el.getBoundingClientRect();
  });
  return map;
}

/**
 * FLIP travel: cards shared between the old and new stage transform from
 * their old position/scale to the new one; cards new to the stage fade in
 * slightly delayed.
 */
function runFlip(root: HTMLElement, from: Record<string, DOMRect>) {
  root.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
    const old = from[el.dataset.flip ?? ""];
    if (!old) {
      const target = el.style.opacity;
      el.style.opacity = "0";
      requestAnimationFrame(() => {
        el.style.transition = "opacity .3s ease .32s";
        el.style.opacity = target || "1";
        setTimeout(() => {
          el.style.transition = "";
          if (!target) el.style.opacity = "";
        }, 720);
      });
      return;
    }
    const r = el.getBoundingClientRect();
    const dx = old.left - r.left;
    const dy = old.top - r.top;
    const sx = old.width / r.width;
    const sy = old.height / r.height;
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2 && Math.abs(sx - 1) < 0.02) return;
    el.style.transformOrigin = "top left";
    el.style.transition = "none";
    el.style.transform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.transition = "transform .5s cubic-bezier(.22,.9,.26,1)";
        el.style.transform = "none";
        setTimeout(() => {
          el.style.transition = "";
          el.style.transformOrigin = "";
          el.style.transform = "";
        }, 580);
      }),
    );
  });
}

/** Scroll top of the stage into view — or center the focus card when stacked. */
function centerFocus(root: HTMLElement, narrow: boolean, instant: boolean) {
  const el = root.querySelector('[data-anchor="focus"]');
  if (!el) return;
  const r = el.getBoundingClientRect();
  const rootR = root.getBoundingClientRect();
  const top = narrow
    ? r.top - rootR.top + root.scrollTop - (root.clientHeight - r.height) / 2
    : 0;
  root.scrollTo({
    top: Math.max(0, top),
    behavior: instant ? "instant" : "auto",
  });
}

/**
 * Measure card anchors and lay out the connection map: cubic beziers from
 * each source card (or the ghost box) to slots on the focus card's top edge,
 * assigned left-to-right in source-x order so lines never cross; plain gray
 * curves down to the pickups; short straight lines gen2 → gen1.
 */
function measureStage(stage: HTMLElement, piece: Piece, mode: Mode): Geometry {
  const srect = stage.getBoundingClientRect();
  const rectOf = (anchor: string) => {
    const el = stage.querySelector(`[data-anchor="${anchor}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: r.left - srect.left,
      y: r.top - srect.top,
      w: r.width,
      h: r.height,
    };
  };
  const F = rectOf("focus");
  if (!F) return EMPTY_GEOMETRY;
  if (mode !== "lines") {
    return { ...EMPTY_GEOMETRY, w: stage.scrollWidth, h: stage.scrollHeight };
  }

  const lines: Line[] = [];
  const chips: Chip[] = [];
  const ghostSrcs = piece.sources.filter((s) => !s.to);
  const items = piece.sources
    .map((s, i) => {
      let a = null;
      let frac = 0.5;
      if (s.to) {
        a = rectOf(`s:${s.to}`);
      } else {
        a = rectOf("ghostbox");
        frac = (ghostSrcs.indexOf(s) + 1) / (ghostSrcs.length + 1);
      }
      return a ? { s, i, x1: a.x + a.w * frac, y1: a.y + a.h } : null;
    })
    .filter((x) => x !== null);
  items.sort((p, q) => p.x1 - q.x1);
  items.forEach((it, idx) => {
    const { s } = it;
    const x2 = F.x + F.w * ((idx + 1) / (items.length + 1));
    const y2 = F.y;
    const my = (it.y1 + y2) / 2;
    lines.push({
      d: `M ${it.x1} ${it.y1} C ${it.x1} ${my}, ${x2} ${my}, ${x2} ${y2}`,
      color: VERDICT_META[s.verdict].color,
      dash: s.cited && s.verdict !== "none" ? "" : "7 5",
      claimId: s.claimId,
      down: false,
    });
    chips.push({
      x: (it.x1 + x2) / 2,
      y: my - 11 + (idx % 2) * 22,
      label: VERDICT_META[s.verdict].label,
      color: VERDICT_META[s.verdict].color,
      claimId: s.claimId,
      i: it.i,
    });
  });

  piece.pickups.forEach((p, i) => {
    const a = rectOf(`pk:${p.id}`);
    if (!a) return;
    const x1 = F.x + F.w * ((i + 1) / (piece.pickups.length + 1));
    const y1 = F.y + F.h;
    const x2 = a.x + a.w / 2;
    const y2 = a.y;
    const my = (y1 + y2) / 2;
    lines.push({
      d: `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`,
      color: "#A7A297",
      dash: "",
      claimId: null,
      down: true,
    });
  });

  const g2: G2Line[] = [];
  for (const l of gen2Of(piece, gen1IdsOf(piece)).links) {
    const a = rectOf(`g2:${l.from}`);
    const b = rectOf(`s:${l.to}`);
    if (!a || !b) continue;
    g2.push({
      d: `M ${a.x + a.w / 2} ${a.y + a.h} L ${b.x + b.w / 2} ${b.y}`,
      color: VERDICT_META[l.verdict].color,
      dash: l.cited ? "" : "6 5",
    });
  }

  return { lines, chips, g2, w: stage.scrollWidth, h: stage.scrollHeight };
}

/* ------------------------- shared style bits --------------------------- */

const cardBase: CSSProperties = {
  position: "relative",
  zIndex: 2,
  flex: "0 1 236px",
  minWidth: 188,
  background: "#FFFFFF",
  border: "1px solid #DBD7CD",
  borderRadius: 10,
  padding: "12px 14px",
  cursor: "pointer",
  boxSizing: "border-box",
  transition: "opacity .2s ease, box-shadow .2s ease, border-color .2s ease",
};

const clamp2: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const zoneLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.16em",
  color: "#8A867D",
};

const popLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: 9.5,
  letterSpacing: "0.13em",
  color: "#8A867D",
  marginBottom: 4,
};

const monoTag: CSSProperties = {
  fontFamily: MONO,
  fontSize: 9.5,
  letterSpacing: "0.1em",
  color: "#A7A297",
};

/* -------------------------- small components --------------------------- */

function Wordmark({ small }: { small?: boolean }) {
  return (
    <svg width={small ? 15 : 26} height={small ? 20 : 34} viewBox="0 0 26 34">
      <circle cx="13" cy="5" r="4" fill="#8A867D" />
      <line
        x1="13"
        y1="9"
        x2="13"
        y2="25"
        stroke="#0E8A5F"
        strokeWidth={small ? 2.4 : 2}
      />
      <circle cx="13" cy="29" r="4.5" fill="#1C1B18" />
    </svg>
  );
}

function Monogram({
  text,
  size,
  radius,
  fontSize,
  bg = "#1C1B18",
}: {
  text: string;
  size: number;
  radius: number;
  fontSize: number;
  bg?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bg,
        color: "#F4F3EF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO,
        fontSize,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
}

/** Colored claim-count row: "9 claims · 2 supported · 2 partial · …". */
function Tally({ piece }: { piece: Piece }) {
  const counts: Record<Verdict, number> = {
    supports: 0,
    partial: 0,
    differs: 0,
    none: 0,
  };
  for (const c of piece.claims) counts[c.verdict]++;
  const names: Record<Verdict, string> = {
    supports: "supported",
    partial: "partial",
    differs: "differs",
    none: "unsourced",
  };
  return (
    <>
      <span style={{ color: "#1C1B18", fontWeight: 600 }}>
        {piece.claims.length} claims
      </span>
      {VERDICTS.filter((v) => counts[v] > 0).map((v) => (
        <span key={v} style={{ color: VERDICT_META[v].color, fontWeight: 600 }}>
          {`· ${counts[v]} ${names[v]}`}
        </span>
      ))}
    </>
  );
}

/* ---------------------------- main component --------------------------- */

export default function ReferenseeFocusStage({
  mode = "lines",
}: {
  mode?: Mode;
}) {
  const [focus, setFocus] = useState<{ id: string | null; trail: string[] }>(
    () => {
      const id = parseHash();
      return { id, trail: id ? [id] : [] };
    },
  );
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [activeClaim, setActiveClaim] = useState<string | null>(null);
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [ghostsOpen, setGhostsOpen] = useState(false);
  const [narrow, setNarrow] = useState(() => window.innerWidth < 1250);
  const [linesReady, setLinesReady] = useState(false);
  const [geom, setGeom] = useState<Geometry>(EMPTY_GEOMETRY);
  const [measureTick, setMeasureTick] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const focusIdRef = useRef(focus.id);
  const prevFocusRef = useRef(focus.id);
  const flipFromRef = useRef<Record<string, DOMRect> | null>(null);

  useEffect(() => {
    focusIdRef.current = focus.id;
  }, [focus.id]);

  /* Hash routing: #piece/<id> is the focus; browser back travels the trail. */
  useEffect(() => {
    const onHash = () => {
      const id = parseHash();
      const cur = focusIdRef.current;
      if (id === cur) return;
      const root = rootRef.current;
      if (cur && id && root) flipFromRef.current = snapRects(root);
      setFocus((prev) => {
        let trail: string[] = [];
        if (id) {
          const ix = prev.trail.indexOf(id);
          trail = ix >= 0 ? prev.trail.slice(0, ix + 1) : [...prev.trail, id];
        }
        return { id, trail };
      });
      setExpanded(false);
      setActiveFilter(null);
      setActiveClaim(null);
      setPopover(null);
      setGhostsOpen(false);
      setLinesReady(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* Leave the URL the way we found it when the demo closes. */
  useEffect(() => {
    return () => {
      if (
        /^#piece\//i.test(window.location.hash) ||
        window.location.href.endsWith("#")
      ) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      setNarrow(window.innerWidth < 1250);
      setMeasureTick((t) => t + 1);
    };
    window.addEventListener("resize", onResize);
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) setMeasureTick((t) => t + 1);
    });
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /*
   * After every layout-affecting change: run the pending FLIP travel if a
   * refocus queued one (lines re-measure + fade back in once it settles),
   * otherwise re-measure on the next frame.
   */
  useLayoutEffect(() => {
    // Not read directly, but each of these moves cards around — the map must
    // be re-measured when they change:
    void expanded;
    void activeFilter;
    void ghostsOpen;
    void measureTick;

    const root = rootRef.current;
    const piece = focus.id ? PIECES[focus.id] : null;
    const remeasure = () => {
      const stage = stageRef.current;
      if (stage && piece) setGeom(measureStage(stage, piece, mode));
      setLinesReady(true);
    };

    if (flipFromRef.current && root) {
      const from = flipFromRef.current;
      flipFromRef.current = null;
      prevFocusRef.current = focus.id;
      centerFocus(root, narrow, true);
      runFlip(root, from);
      const timer = setTimeout(remeasure, 540);
      return () => clearTimeout(timer);
    }

    const focusChanged = prevFocusRef.current !== focus.id;
    prevFocusRef.current = focus.id;
    const raf = requestAnimationFrame(() => {
      remeasure();
      if (focusChanged && root) centerFocus(root, narrow, false);
    });
    return () => cancelAnimationFrame(raf);
  }, [focus.id, expanded, activeFilter, ghostsOpen, narrow, mode, measureTick]);

  const go = (id: string) => {
    if (id !== focusIdRef.current) window.location.hash = `#piece/${id}`;
  };
  const goHome = () => {
    window.location.hash = "";
  };

  const piece = focus.id ? PIECES[focus.id] : null;

  const showPop = (chip: Chip) => {
    if (!piece) return;
    const s = piece.sources[chip.i];
    const maxX = stageRef.current ? stageRef.current.clientWidth : 1200;
    setActiveClaim(chip.claimId);
    setPopover({
      x: Math.min(Math.max(chip.x, 170), maxX - 170),
      y: chip.y,
      claim: s.pieceQuote,
      src: s.sourceQuote,
      verdict: VERDICT_META[s.verdict].label,
      color: VERDICT_META[s.verdict].color,
      cited: s.cited,
    });
  };
  const hidePop = () => {
    setPopover(null);
    setActiveClaim(null);
  };

  return (
    <div
      id="rfs-root"
      ref={rootRef}
      style={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: "#F4F3EF",
        color: "#1C1B18",
        fontFamily: SANS,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{DEMO_CSS}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" precedence="default" href={FONTS_HREF} />
      {piece ? renderStage(piece) : renderLanding()}
    </div>
  );

  /* ------------------------------ landing ------------------------------ */

  function renderLanding() {
    return (
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <Wordmark />
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 38,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Referensee
          </div>
        </div>
        <div
          style={{
            fontSize: 15,
            color: "#6E6A61",
            marginBottom: 36,
            textAlign: "center",
            maxWidth: 440,
            lineHeight: 1.5,
          }}
        >
          See where a story's information came from — and how the same story is
          told elsewhere.
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            go("spark");
          }}
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            maxWidth: 560,
            marginBottom: 56,
          }}
        >
          <input
            type="text"
            placeholder="Paste a link to any article or post"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "14px 18px",
              fontSize: 15,
              fontFamily: SANS,
              border: "1px solid #D8D4CA",
              borderRadius: 10,
              background: "#FFFFFF",
              outline: "none",
              color: "#1C1B18",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 22px",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: SANS,
              background: "#1C1B18",
              color: "#F4F3EF",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Trace it
          </button>
        </form>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "#8A867D",
            marginBottom: 14,
          }}
        >
          OR OPEN A SAMPLE STORY
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 820,
          }}
        >
          {FEED.map((f) => {
            const p = PIECES[f.id];
            return (
              <div
                key={f.id}
                data-rfs-hover="feed"
                onClick={() => go(f.id)}
                style={{
                  width: 370,
                  background: "#FFFFFF",
                  border: "1px solid #DBD7CD",
                  borderRadius: 12,
                  padding: "18px 20px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <Monogram
                    text={p.monogram}
                    size={26}
                    radius={6}
                    fontSize={11}
                  />
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {p.outlet}
                  </div>
                  <div style={{ fontSize: 12, color: "#8A867D" }}>
                    {`${p.descriptor} · ${p.date}`}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: 10,
                  }}
                >
                  {p.headline}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "#6E6A61",
                    lineHeight: 1.45,
                    marginBottom: 10,
                  }}
                >
                  {`↳ ${f.teaser}`}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    fontFamily: MONO,
                    fontSize: 11,
                  }}
                >
                  <Tally piece={p} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 64, fontSize: 11, color: "#A7A297" }}>
          All outlets, people, and stories in this demo are fictional.
        </div>
      </div>
    );
  }

  /* ------------------------------- stage ------------------------------- */

  function renderStage(f: Piece) {
    const gen1Ids = gen1IdsOf(f);
    const gen2 = gen2Of(f, gen1Ids);
    const ghostSrcs = f.sources.filter((s) => !s.to);
    const shownGhosts = ghostsOpen ? ghostSrcs : ghostSrcs.slice(0, 2);
    const sections = mode === "sections";

    const railGroups = ((): {
      head: string | null;
      items: { piece: Piece; diff: string }[];
    }[] => {
      const mk = (p: { id: string; diff: string }) => ({
        piece: PIECES[p.id],
        diff: p.diff,
      });
      const fl = activeFilter != null ? f.filters[activeFilter] : undefined;
      if (fl) {
        const groups: Record<Stance, { id: string; diff: string }[]> = {
          does: [],
          not: [],
          na: [],
        };
        for (const p of f.perspectives) groups[fl.stance[p.id] ?? "na"].push(p);
        const labels: Record<Stance, string> = {
          does: "DOES",
          not: "DOES NOT",
          na: "DOESN’T ADDRESS IT",
        };
        return (["does", "not", "na"] as Stance[])
          .filter((k) => groups[k].length > 0)
          .map((k) => ({
            head: `${labels[k]} · ${groups[k].length}`,
            items: groups[k].map(mk),
          }));
      }
      return f.perspectives.length
        ? [{ head: null, items: f.perspectives.map(mk) }]
        : [];
    })();

    return (
      <div
        ref={stageRef}
        style={{
          position: "relative",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mode === "lines" && (
          <svg
            id="rfs-svg"
            width={geom.w}
            height={geom.h}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: "none",
              opacity: linesReady ? 1 : 0,
              transition: "opacity .35s ease",
            }}
          >
            {geom.g2.map((l, i) => (
              <path
                key={`g2-${i}`}
                d={l.d}
                stroke={l.color}
                strokeWidth={1.3}
                strokeDasharray={l.dash || undefined}
                fill="none"
                opacity={0.45}
                strokeLinecap="round"
              />
            ))}
            {geom.lines.map((l, i) => {
              let o = l.down ? 0.55 : 0.9;
              let w = l.down ? 1.4 : 1.8;
              if (activeClaim) {
                if (l.claimId === activeClaim) {
                  o = 1;
                  w = 2.6;
                } else {
                  o = 0.1;
                }
              }
              return (
                <path
                  key={i}
                  d={l.d}
                  data-down={l.down ? "1" : undefined}
                  stroke={l.color}
                  strokeWidth={w}
                  strokeDasharray={l.dash || undefined}
                  fill="none"
                  opacity={o}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        )}

        {mode === "lines" && (
          <div id="rfs-chips">
            {geom.chips.map((c, i) => {
              const dimmed = activeClaim !== null && activeClaim !== c.claimId;
              return (
                <div
                  key={i}
                  onMouseEnter={() => showPop(c)}
                  onMouseLeave={hidePop}
                  onClick={() => showPop(c)}
                  style={{
                    position: "absolute",
                    left: c.x,
                    top: c.y,
                    transform: "translate(-50%,-50%)",
                    zIndex: 5,
                    fontFamily: MONO,
                    fontSize: 10.5,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    padding: "3px 10px",
                    borderRadius: 999,
                    background: "#FFFFFF",
                    border: `1.5px solid ${c.color}`,
                    color: c.color,
                    boxShadow: "0 2px 8px -2px rgba(28,27,24,0.25)",
                    cursor: "default",
                    opacity: dimmed ? 0.25 : 1,
                    transition: "opacity .2s ease",
                    display: linesReady ? "block" : "none",
                  }}
                >
                  {c.label}
                </div>
              );
            })}
          </div>
        )}

        {popover && (
          <div
            style={{
              position: "absolute",
              left: popover.x,
              top: popover.y + 16,
              transform: "translateX(-50%)",
              zIndex: 20,
              width: 320,
              boxSizing: "border-box",
              background: "#FFFFFF",
              border: "1px solid #D8D4CA",
              borderRadius: 12,
              padding: "14px 16px",
              boxShadow: "0 18px 44px -16px rgba(28,27,24,0.35)",
              pointerEvents: "none",
              animation: "rfs-fade .15s ease",
            }}
          >
            <div style={popLabel}>THE PIECE SAYS</div>
            <div style={{ fontSize: 13, lineHeight: 1.45, marginBottom: 10 }}>
              {popover.claim}
            </div>
            <div style={popLabel}>THE SOURCE SAYS</div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.45,
                color: "#3A382F",
                marginBottom: 12,
              }}
            >
              {popover.src}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10.5,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: popover.color,
                  color: "#FFFFFF",
                }}
              >
                {popover.verdict}
              </span>
              <span
                style={{ fontFamily: MONO, fontSize: 10, color: "#8A867D" }}
              >
                {popover.cited
                  ? "CITED BY THE PIECE"
                  : "INFERRED BY REFERENSEE"}
              </span>
            </div>
          </div>
        )}

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 22px",
            height: 52,
            background: "rgba(244,243,239,0.94)",
            borderBottom: "1px solid #E0DDD5",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            onClick={goHome}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <Wordmark small />
            <span style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 600 }}>
              Referensee
            </span>
          </div>
          <div
            id="rfs-crumbs"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 12.5,
              color: "#6E6A61",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <span onClick={goHome} style={{ cursor: "pointer" }}>
              Feed
            </span>
            {focus.trail.map((id) => (
              <span
                key={id}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <span style={{ color: "#B8B4A9", margin: "0 7px" }}>›</span>
                <span
                  onClick={() => go(id)}
                  style={{
                    cursor: "pointer",
                    color: id === f.id ? "#1C1B18" : "#6E6A61",
                    fontWeight: id === f.id ? 600 : 400,
                  }}
                >
                  {PIECES[id].outlet}
                </span>
              </span>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div
            id="rfs-legend"
            style={{
              display: "flex",
              gap: 14,
              fontFamily: MONO,
              fontSize: 10.5,
              color: "#6E6A61",
            }}
          >
            {VERDICTS.map((v) => (
              <span
                key={v}
                style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background:
                      v === "none" ? "transparent" : VERDICT_META[v].color,
                    border: v === "none" ? "1.5px dashed #8A867D" : "none",
                    display: "inline-block",
                  }}
                />
                {VERDICT_META[v].label}
              </span>
            ))}
          </div>
        </div>

        {/* Sources band */}
        <div
          style={{
            background: "#EDECE5",
            borderBottom: "1px solid #E3E0D6",
            padding: "16px 32px 14px",
          }}
        >
          <div id="rfs-srcin" style={{ marginRight: RAIL_W }}>
            <div style={{ ...zoneLabel, marginBottom: 16 }}>
              WHERE IT CAME FROM · OLDER ↑
            </div>
            {gen2.ids.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 44,
                }}
              >
                {gen2.ids.map((id) => {
                  const p = PIECES[id];
                  return (
                    <div
                      key={id}
                      data-anchor={`g2:${id}`}
                      data-flip={id}
                      data-rfs-hover="g2"
                      onClick={() => go(id)}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: 176,
                        background: "#F3F2EC",
                        border: "1px solid #E0DDD5",
                        borderRadius: 8,
                        padding: "8px 10px",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        opacity: 0.72,
                        transition: "opacity .2s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          marginBottom: 4,
                        }}
                      >
                        <Monogram
                          text={p.monogram}
                          size={17}
                          radius={4}
                          fontSize={8.5}
                          bg="#8A867D"
                        />
                        <div style={{ fontSize: 11.5, fontWeight: 600 }}>
                          {p.outlet}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#8A867D",
                          marginBottom: 3,
                        }}
                      >
                        {`${p.descriptor} · ${p.date}`}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#55524A",
                          lineHeight: 1.35,
                          ...clamp2,
                        }}
                      >
                        {p.headline}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {f.origin && f.sources.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    border: "1.5px dashed #A7A297",
                    borderRadius: 999,
                    padding: "8px 18px",
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "#6E6A61",
                  }}
                >
                  EARLIEST PIECE IN THE CHAIN — NOTHING UPSTREAM
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "stretch",
              }}
            >
              {!sections &&
                gen1Ids.map((id) => {
                  const p = PIECES[id];
                  const mine = f.sources.filter((s) => s.to === id);
                  const hlSrc = activeClaim
                    ? mine.find((s) => s.claimId === activeClaim)
                    : undefined;
                  const dim = activeClaim !== null && !hlSrc;
                  return (
                    <div
                      key={id}
                      data-anchor={`s:${id}`}
                      data-flip={id}
                      data-rfs-hover="up"
                      onClick={() => go(id)}
                      style={{
                        ...cardBase,
                        opacity: dim ? 0.35 : 1,
                        boxShadow: hlSrc
                          ? `0 0 0 2px ${VERDICT_META[hlSrc.verdict].color}`
                          : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 5,
                        }}
                      >
                        <Monogram
                          text={p.monogram}
                          size={22}
                          radius={6}
                          fontSize={10}
                        />
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {p.outlet}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#8A867D",
                          marginBottom: 5,
                        }}
                      >
                        {`${p.descriptor} · ${p.date}`}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "#3A382F",
                          lineHeight: 1.4,
                          marginBottom: 8,
                          ...clamp2,
                        }}
                      >
                        {p.headline}
                      </div>
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {mine.map((s, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: MONO,
                              fontSize: 10,
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: 99,
                              border: `1.5px solid ${VERDICT_META[s.verdict].color}`,
                              color: VERDICT_META[s.verdict].color,
                            }}
                          >
                            {VERDICT_META[s.verdict].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              {sections &&
                (["supports", "partial", "differs"] as Verdict[]).map((v) => {
                  const entries = f.sources.filter(
                    (s) => s.to && s.verdict === v,
                  );
                  if (entries.length === 0) return null;
                  return (
                    <div
                      key={v}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        flex: "1 1 0",
                        minWidth: 178,
                        maxWidth: 340,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: MONO,
                          fontSize: 10.5,
                          letterSpacing: "0.12em",
                          color: VERDICT_META[v].color,
                          borderBottom: `2px solid ${VERDICT_META[v].color}`,
                          paddingBottom: 5,
                        }}
                      >
                        {`${VERDICT_META[v].label.toUpperCase()} · ${entries.length}`}
                      </div>
                      {entries.map((s, i) => {
                        const p = PIECES[s.to ?? ""];
                        const active = activeClaim === s.claimId;
                        const dim = activeClaim !== null && !active;
                        return (
                          <div
                            key={i}
                            data-flip={p.id}
                            data-rfs-hover="up"
                            onClick={() => go(p.id)}
                            style={{
                              ...cardBase,
                              flex: "0 0 auto",
                              minWidth: 0,
                              width: "auto",
                              opacity: dim ? 0.35 : 1,
                              boxShadow: active
                                ? `0 0 0 2px ${VERDICT_META[v].color}`
                                : "none",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 4,
                              }}
                            >
                              <Monogram
                                text={p.monogram}
                                size={22}
                                radius={6}
                                fontSize={10}
                              />
                              <div style={{ fontSize: 13, fontWeight: 600 }}>
                                {p.outlet}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "#8A867D",
                                marginBottom: 7,
                              }}
                            >
                              {`${p.descriptor} · ${p.date}`}
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                lineHeight: 1.5,
                                marginBottom: 5,
                              }}
                            >
                              <span style={monoTag}>PIECE </span>
                              <span
                                style={{
                                  borderBottom: `2px solid ${VERDICT_META[v].color}`,
                                  color: "#26241F",
                                }}
                              >
                                {s.pieceQuote}
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                lineHeight: 1.5,
                                color: "#55524A",
                              }}
                            >
                              <span style={monoTag}>SOURCE </span>
                              {s.sourceQuote}
                            </div>
                            <div
                              style={{
                                fontFamily: MONO,
                                fontSize: 9.5,
                                color: "#A7A297",
                                marginTop: 6,
                              }}
                            >
                              {s.cited
                                ? "CITED BY THE PIECE"
                                : "INFERRED BY REFERENSEE"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              {ghostSrcs.length > 0 && (
                <div
                  data-anchor="ghostbox"
                  style={
                    sections
                      ? {
                          position: "relative",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          flex: "1 1 0",
                          minWidth: 178,
                          maxWidth: 340,
                          boxSizing: "border-box",
                        }
                      : {
                          position: "relative",
                          zIndex: 2,
                          border: "1.5px dashed #A7A297",
                          borderRadius: 12,
                          padding: "10px 12px",
                          boxSizing: "border-box",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          flex: "0 1 252px",
                          minWidth: 200,
                          alignSelf: "flex-start",
                          marginLeft: 14,
                        }
                  }
                >
                  <div
                    style={
                      sections
                        ? {
                            fontFamily: MONO,
                            fontSize: 10.5,
                            letterSpacing: "0.12em",
                            color: "#8A867D",
                            borderBottom: "2px dashed #A7A297",
                            paddingBottom: 5,
                          }
                        : {
                            fontFamily: MONO,
                            fontSize: 10,
                            letterSpacing: "0.13em",
                            color: "#8A867D",
                          }
                    }
                  >
                    {`NO SOURCE FOUND${ghostSrcs.length > 1 ? ` · ${ghostSrcs.length}` : ""}`}
                  </div>
                  {shownGhosts.map((s, i) => {
                    const hl = activeClaim === s.claimId;
                    const dim = activeClaim !== null && !hl;
                    const cl = f.claims.find((c) => c.id === s.claimId);
                    return (
                      <div
                        key={i}
                        style={{
                          ...(sections
                            ? {
                                background: "#FFFFFF",
                                border: "1.5px dashed #A7A297",
                                borderRadius: 10,
                                padding: "10px 12px",
                              }
                            : {
                                background: "#F1EFE9",
                                borderRadius: 8,
                                padding: "8px 10px",
                              }),
                          color: "#6E6A61",
                          opacity: dim ? 0.4 : 1,
                          boxShadow: hl ? "0 0 0 2px #8A867D" : "none",
                          transition: "opacity .2s ease, box-shadow .2s ease",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontStyle: "italic",
                            lineHeight: 1.45,
                          }}
                        >
                          {`“${cl?.quote ?? ""}”`}
                        </div>
                      </div>
                    );
                  })}
                  {ghostSrcs.length > 2 && (
                    <div
                      data-rfs-hover="ctl"
                      onClick={() => setGhostsOpen((o) => !o)}
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        color: "#55524A",
                        cursor: "pointer",
                      }}
                    >
                      {ghostsOpen
                        ? "− SHOW FEWER"
                        : `+ ${ghostSrcs.length - 2} MORE UNSOURCED CLAIMS`}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Focus card + rail */}
        <div
          id="rfs-mid"
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: `minmax(0,1fr) ${RAIL_W}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "96px 40px 96px",
            }}
          >
            <div
              data-anchor="focus"
              data-flip={f.id}
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: 640,
                background: "#FFFFFF",
                border: "1.5px solid #24231F",
                borderRadius: 14,
                boxShadow: "0 22px 48px -20px rgba(28,27,24,0.32)",
                padding: "26px 30px 22px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <Monogram
                  text={f.monogram}
                  size={40}
                  radius={9}
                  fontSize={15}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>
                    {f.outlet}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#8A867D" }}>
                    {`${f.descriptor} · ${f.date}`}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 29,
                  fontWeight: 600,
                  lineHeight: 1.14,
                  letterSpacing: "-0.005em",
                  marginBottom: 12,
                  textWrap: "pretty",
                }}
              >
                {f.headline}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 7,
                  flexWrap: "wrap",
                  fontFamily: MONO,
                  fontSize: 11.5,
                  paddingBottom: 14,
                  borderBottom: "1px solid #ECE9E0",
                  marginBottom: 14,
                }}
              >
                <Tally piece={f} />
              </div>
              {(expanded ? f.paras : f.paras.slice(0, f.teaserParas)).map(
                (segs, pi) => (
                  <p
                    key={pi}
                    style={{
                      fontSize: 15.5,
                      lineHeight: 1.68,
                      margin: "0 0 13px",
                      color: "#26241F",
                      textWrap: "pretty",
                    }}
                  >
                    {segs.map((seg, si) => {
                      const claimId = seg.c;
                      if (!claimId) return <span key={si}>{seg.t}</span>;
                      const cl = f.claims.find((c) => c.id === claimId);
                      const col = VERDICT_META[cl?.verdict ?? "none"].color;
                      const active = activeClaim === claimId;
                      return (
                        <span
                          key={si}
                          onClick={() => {
                            setActiveClaim(active ? null : claimId);
                            setPopover(null);
                          }}
                          style={{
                            borderBottom:
                              (cl?.verdict === "none"
                                ? "2px dashed "
                                : "2px solid ") + col,
                            cursor: "pointer",
                            background: active ? `${col}1E` : "transparent",
                            borderRadius: 2,
                            padding: "0 1px",
                            transition: "background .15s ease",
                          }}
                        >
                          {seg.t}
                        </span>
                      );
                    })}
                  </p>
                ),
              )}
              {f.paras.length > f.teaserParas && (
                <div
                  data-rfs-hover="ctl"
                  onClick={() => setExpanded((e) => !e)}
                  style={{
                    marginTop: 4,
                    paddingTop: 12,
                    borderTop: "1px solid #ECE9E0",
                    fontFamily: MONO,
                    fontSize: 11.5,
                    letterSpacing: "0.1em",
                    color: "#55524A",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {expanded ? "COLLAPSE THE PIECE ↑" : "READ THE FULL PIECE ↓"}
                </div>
              )}
            </div>
          </div>

          <div
            id="rfs-rail"
            style={{
              borderLeft: "1px solid #E0DDD5",
              background: "#FAF9F6",
              padding: "22px 24px 32px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ ...zoneLabel, marginBottom: 16 }}>
              HOW OTHERS TELL IT →
            </div>
            {f.filters.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.13em",
                    color: "#A7A297",
                    marginBottom: 8,
                  }}
                >
                  CLAIM FILTERS — GROUP BY WHAT EACH PIECE CLAIMS
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  {f.filters.map((fl, i) => {
                    const active = activeFilter === i;
                    return (
                      <div
                        key={i}
                        data-rfs-hover="filter"
                        onClick={() => setActiveFilter(active ? null : i)}
                        style={{
                          fontSize: 12,
                          lineHeight: 1.35,
                          padding: "8px 12px",
                          borderRadius: 9,
                          cursor: "pointer",
                          transition: "all .15s ease",
                          border: active
                            ? "1.5px solid #1C1B18"
                            : "1px solid #D8D4CA",
                          background: active ? "#1C1B18" : "#FFFFFF",
                          color: active ? "#F4F3EF" : "#3A382F",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {fl.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div
              id="rfs-rail-list"
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {railGroups.map((grp, gi) => (
                <div
                  key={gi}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {grp.head && (
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 10.5,
                        letterSpacing: "0.12em",
                        color: "#55524A",
                        borderBottom: "1px solid #E0DDD5",
                        paddingBottom: 5,
                      }}
                    >
                      {grp.head}
                    </div>
                  )}
                  {grp.items.map((pv) => (
                    <div
                      key={pv.piece.id}
                      data-flip={pv.piece.id}
                      data-rfs-hover="side"
                      onClick={() => go(pv.piece.id)}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "#FFFFFF",
                        border: "1px solid #DBD7CD",
                        borderRadius: 10,
                        padding: "12px 14px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 4,
                        }}
                      >
                        <Monogram
                          text={pv.piece.monogram}
                          size={20}
                          radius={5}
                          fontSize={9}
                          bg="#55524A"
                        />
                        <div style={{ fontSize: 12.5, fontWeight: 600 }}>
                          {pv.piece.outlet}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          color: "#8A867D",
                          marginBottom: 5,
                        }}
                      >
                        {`${pv.piece.descriptor} · ${pv.piece.date}`}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#3A382F",
                          lineHeight: 1.4,
                          marginBottom: 6,
                        }}
                      >
                        {pv.piece.headline}
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "#6E6A61",
                          fontStyle: "italic",
                          lineHeight: 1.4,
                        }}
                      >
                        {`≠ ${pv.diff}`}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {f.perspectives.length === 0 && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#A7A297",
                    fontStyle: "italic",
                  }}
                >
                  No other tellings of this story traced.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pickups band */}
        <div
          style={{
            background: "#EDECE5",
            borderTop: "1px solid #E3E0D6",
            padding: "80px 32px 16px",
          }}
        >
          <div id="rfs-pkin" style={{ marginRight: RAIL_W }}>
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "stretch",
                marginBottom: 14,
              }}
            >
              {f.pickups.map((pk) => {
                const p = PIECES[pk.id];
                return (
                  <div
                    key={pk.id}
                    data-anchor={`pk:${pk.id}`}
                    data-flip={pk.id}
                    data-rfs-hover="down"
                    onClick={() => go(pk.id)}
                    style={{
                      position: "relative",
                      zIndex: 2,
                      width: 250,
                      background: "#FFFFFF",
                      border: "1px solid #DBD7CD",
                      borderRadius: 10,
                      padding: "12px 14px",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 5,
                      }}
                    >
                      <Monogram
                        text={p.monogram}
                        size={22}
                        radius={6}
                        fontSize={10}
                      />
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {p.outlet}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#8A867D",
                        marginBottom: 5,
                      }}
                    >
                      {`${p.descriptor} · ${p.date}`}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "#3A382F",
                        lineHeight: 1.4,
                        marginBottom: 7,
                        ...clamp2,
                      }}
                    >
                      {p.headline}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "#6E6A61",
                        fontStyle: "italic",
                        lineHeight: 1.4,
                      }}
                    >
                      {`↳ ${pk.note}`}
                    </div>
                    {pk.reach && (
                      <div
                        style={{
                          fontFamily: MONO,
                          fontSize: 10,
                          color: "#8A867D",
                          marginTop: 5,
                        }}
                      >
                        {pk.reach}
                      </div>
                    )}
                  </div>
                );
              })}
              {f.pickupsTail && (
                <div
                  style={{
                    alignSelf: "center",
                    border: "1px dashed #B8B4A9",
                    borderRadius: 999,
                    padding: "9px 18px",
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "#6E6A61",
                    background: "#F1EFE9",
                  }}
                >
                  {f.pickupsTail}
                </div>
              )}
              {f.pickups.length === 0 && !f.pickupsTail && (
                <div
                  style={{
                    alignSelf: "center",
                    fontSize: 12,
                    color: "#A7A297",
                    fontStyle: "italic",
                  }}
                >
                  No pickups traced for this piece yet.
                </div>
              )}
            </div>
            <div style={zoneLabel}>WHERE IT WENT · NEWER ↓</div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: 14,
            fontSize: 11,
            color: "#A7A297",
            background: "#F4F3EF",
          }}
        >
          All outlets, people, and stories in this demo are fictional. Click any
          card to travel the map.
        </div>
      </div>
    );
  }
}
