import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CornerLeftUp,
  Link2,
} from "lucide-react";
import { cn } from "~/lib/utils";
import type { Claim, ClaimStatus, Story, TrailNode } from "./types";
import { getOutlet, stories } from "./seed";

type Route = { view: "feed" } | { view: "story"; id: string };

function parseHash(hash: string): Route {
  const match = /^#story\/(.+)$/.exec(hash);
  if (match?.[1]) return { view: "story", id: match[1] };
  return { view: "feed" };
}

function routeToHash(route: Route): string {
  return route.view === "story" ? `#story/${route.id}` : "#feed";
}

const STATUS: Record<
  ClaimStatus,
  {
    label: string;
    countLabel: string;
    dot: string;
    text: string;
    span: string;
    spanOpen: string;
    cardBorder: string;
  }
> = {
  sourced: {
    label: "Backed by a source",
    countLabel: "backed",
    dot: "bg-emerald-600",
    text: "text-emerald-700",
    span: "decoration-emerald-600/50 decoration-[1.5px] hover:bg-emerald-600/10",
    spanOpen: "bg-emerald-600/10",
    cardBorder: "border-emerald-600/50",
  },
  unsupported: {
    label: "No source found",
    countLabel: "unsourced",
    dot: "bg-amber-500",
    text: "text-amber-700",
    span: "decoration-amber-500 decoration-dotted decoration-2 hover:bg-amber-500/10",
    spanOpen: "bg-amber-500/10",
    cardBorder: "border-amber-500/60",
  },
  disputed: {
    label: "Conflicts with its source",
    countLabel: "conflicting",
    dot: "bg-rose-600",
    text: "text-rose-700",
    span: "decoration-rose-500/70 decoration-wavy hover:bg-rose-500/10",
    spanOpen: "bg-rose-500/10",
    cardBorder: "border-rose-500/60",
  },
};

function countClaims(story: Story): Record<ClaimStatus, number> {
  const counts: Record<ClaimStatus, number> = {
    sourced: 0,
    unsupported: 0,
    disputed: 0,
  };
  for (const claim of story.claims) counts[claim.status] += 1;
  return counts;
}

function totalPickups(story: Story): string {
  const n = story.downward.length + (story.morePickups ?? 0);
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;
}

function Monogram({
  outletId,
  size = "md",
  highlight = false,
}: {
  outletId: string;
  size?: "sm" | "md";
  highlight?: boolean;
}) {
  const outlet = getOutlet(outletId);
  const isHandle = outlet.name.startsWith("@");
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center font-semibold tracking-tight select-none",
        size === "sm" ? "size-5 text-[8px]" : "size-7 text-[10px]",
        isHandle ? "rounded-full" : "rounded-md",
        highlight
          ? "bg-primary text-primary-foreground"
          : "bg-foreground/10 text-foreground/70",
      )}
    >
      {outlet.short}
    </span>
  );
}

function StatusDot({ status }: { status: ClaimStatus }) {
  return (
    <span
      className={cn("size-1.5 shrink-0 rounded-full", STATUS[status].dot)}
    />
  );
}

function ClaimCounts({ story }: { story: Story }) {
  const counts = countClaims(story);
  return (
    <>
      {(Object.keys(counts) as ClaimStatus[]).map((status) =>
        counts[status] > 0 ? (
          <span key={status} className="inline-flex items-center gap-1">
            <StatusDot status={status} />
            {counts[status]} {STATUS[status].countLabel}
          </span>
        ) : null,
      )}
    </>
  );
}

/* ------------------------------- Feed view ------------------------------- */

function FeedCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const outlet = getOutlet(story.outletId);
  return (
    <li>
      <button
        onClick={onOpen}
        className="block w-full cursor-pointer py-5 text-left"
      >
        <div className="flex items-baseline gap-2">
          <span className="self-center">
            <Monogram outletId={story.outletId} size="sm" />
          </span>
          <span className="text-foreground truncate text-xs font-medium">
            {outlet.name}
          </span>
          <span className="text-muted-foreground truncate text-[11px]">
            {outlet.label}
          </span>
          <span className="text-muted-foreground ml-auto shrink-0 text-[11px]">
            {story.date}
          </span>
        </div>

        <h2
          className={cn(
            "text-foreground mt-2 leading-snug",
            story.kind === "article"
              ? "font-serif text-[17px] font-semibold"
              : "line-clamp-3 text-[15px]",
          )}
        >
          {story.title}
        </h2>
        {story.excerpt && (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-[13px]/relaxed">
            {story.excerpt}
          </p>
        )}

        <div className="bg-muted mt-3 rounded-lg px-3 py-2">
          <div className="text-muted-foreground flex items-start gap-1.5 text-[11px]/snug">
            <CornerLeftUp className="mt-px size-3 shrink-0" />
            <span>{story.originNote}</span>
          </div>
          <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
            <ClaimCounts story={story} />
            <span className="opacity-50">·</span>
            <span>{story.perspectives.length} versions</span>
            <span className="opacity-50">·</span>
            <span>{totalPickups(story)} pickups</span>
          </div>
        </div>
      </button>
    </li>
  );
}

function FeedView({ navigate }: { navigate: (route: Route) => void }) {
  const [kind, setKind] = useState<"all" | "article" | "post">("all");
  const [pasted, setPasted] = useState("");

  const visible = stories.filter((s) => kind === "all" || s.kind === kind);

  function handlePaste(e: React.FormEvent) {
    e.preventDefault();
    const value = pasted.trim().toLowerCase();
    if (!value) return;
    const isPost = value.includes("x.com") || value.includes("twitter");
    setPasted("");
    navigate({ view: "story", id: isPost ? "zone" : "coffee" });
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-xl px-4 pb-14 sm:px-6">
        <header className="pt-10 pb-7 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            referen<span className="text-primary">see</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-[13px]">
            See where your news comes from — and how others see it.
          </p>
        </header>

        <form
          onSubmit={handlePaste}
          className="border-border bg-background focus-within:border-foreground/40 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors"
        >
          <Link2 className="text-muted-foreground size-4 shrink-0" />
          <input
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            placeholder="Paste a link to any article or post"
            className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-foreground text-background hover:bg-foreground/85 shrink-0 cursor-pointer rounded-lg px-3 py-1 text-xs font-medium transition-colors"
          >
            Trace
          </button>
        </form>
        <p className="text-muted-foreground mt-1.5 px-1 text-[11px]">
          Demo — any link opens a sample analysis.
        </p>

        <nav className="mt-6 flex gap-1.5">
          {(
            [
              { key: "all", label: "All" },
              { key: "article", label: "Articles" },
              { key: "post", label: "Posts" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setKind(tab.key)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors",
                kind === tab.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <ul className="divide-border mt-2 divide-y">
          {visible.map((story) => (
            <FeedCard
              key={story.id}
              story={story}
              onOpen={() => navigate({ view: "story", id: story.id })}
            />
          ))}
        </ul>

        <p className="text-muted-foreground pt-8 text-center text-[11px]">
          Every outlet, story and person in this demo is fictional.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Story view ------------------------------- */

function ClaimCard({ claim, story }: { claim: Claim; story: Story }) {
  const style = STATUS[claim.status];
  const node = story.upward.find((n) => n.id === claim.nodeId);
  const outlet = node ? getOutlet(node.outletId) : undefined;
  return (
    <div
      className={cn(
        "bg-muted/60 mt-3 rounded-lg border-l-2 p-3",
        style.cardBorder,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase",
          style.text,
        )}
      >
        <StatusDot status={claim.status} />
        {style.label}
      </div>
      <p className="text-muted-foreground mt-1.5 text-[13px]/relaxed">
        {claim.note}
      </p>
      {node && outlet && (
        <div className="bg-background mt-2.5 flex items-center gap-2.5 rounded-md px-2.5 py-2">
          <Monogram outletId={node.outletId} />
          <div className="min-w-0">
            <div className="text-foreground truncate text-xs font-medium">
              {outlet.name}
              <span className="text-muted-foreground font-normal">
                {" "}
                · {node.date}
              </span>
            </div>
            <div className="text-muted-foreground truncate text-[11px]">
              {node.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StoryBody({
  story,
  openClaimId,
  onToggleClaim,
}: {
  story: Story;
  openClaimId: string | null;
  onToggleClaim: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const claimById = useMemo(
    () => new Map(story.claims.map((c) => [c.id, c])),
    [story],
  );

  const collapsible = story.kind === "article" && story.body.length > 2;
  const paragraphs =
    collapsible && !expanded ? story.body.slice(0, 2) : story.body;

  return (
    <div>
      <div className="relative">
        {paragraphs.map((para, i) => {
          const openClaim = para
            .map((seg) => seg.claimId)
            .filter((id): id is string => id != null)
            .map((id) => claimById.get(id))
            .find((c) => c?.id === openClaimId);
          return (
            <div key={i} className={cn(i > 0 && "mt-4")}>
              <p
                className={cn(
                  story.kind === "article"
                    ? "text-foreground/90 font-serif text-[15px]/[1.75]"
                    : "text-foreground text-[16px]/relaxed",
                )}
              >
                {para.map((seg, j) => {
                  const claim = seg.claimId
                    ? claimById.get(seg.claimId)
                    : undefined;
                  if (!claim) return <Fragment key={j}>{seg.text}</Fragment>;
                  const style = STATUS[claim.status];
                  return (
                    <span
                      key={j}
                      role="button"
                      tabIndex={0}
                      onClick={() => onToggleClaim(claim.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onToggleClaim(claim.id);
                        }
                      }}
                      className={cn(
                        "cursor-pointer underline underline-offset-[3px] transition-colors",
                        style.span,
                        openClaimId === claim.id && style.spanOpen,
                      )}
                    >
                      {seg.text}
                    </span>
                  );
                })}
              </p>
              {openClaim && <ClaimCard claim={openClaim} story={story} />}
            </div>
          );
        })}
        {collapsible && !expanded && (
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t to-transparent" />
        )}
      </div>
      {collapsible && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={cn(
            "border-border text-foreground hover:bg-muted mx-auto flex cursor-pointer items-center gap-1 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
            expanded ? "mt-4" : "-mt-2",
          )}
        >
          {expanded ? "Show less" : "Read the full article"}
          {expanded ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
      )}
    </div>
  );
}

function TrailItem({
  node,
  direction,
  isLast,
}: {
  node: TrailNode;
  direction: "up" | "down";
  isLast: boolean;
}) {
  const outlet = getOutlet(node.outletId);
  return (
    <li className="relative flex gap-3 pb-6 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className="bg-border absolute top-9 bottom-0 left-[13px] w-px"
        />
      )}
      <Monogram outletId={node.outletId} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground truncate text-[13px] font-medium">
            {outlet.name}
          </span>
          <span className="text-muted-foreground truncate text-[11px]">
            {outlet.label}
          </span>
          <span className="text-muted-foreground ml-auto shrink-0 text-[11px]">
            {node.date}
            {node.time && ` · ${node.time}`}
          </span>
        </div>
        <p className="text-foreground/85 mt-0.5 line-clamp-2 text-[13px]/snug">
          {node.title}
        </p>
        <p className="text-muted-foreground mt-1 text-xs/relaxed">
          {node.note}
        </p>
        <div className="mt-1.5 flex gap-1.5">
          {direction === "up" && (
            <span
              title={
                node.cited
                  ? "The piece links to this source directly"
                  : "Linked by Referensee from timing and text similarity"
              }
              className={cn(
                "border-border text-muted-foreground rounded-full border px-1.5 py-px text-[10px]",
                !node.cited && "border-dashed italic",
              )}
            >
              {node.cited ? "cited" : "inferred"}
            </span>
          )}
          {node.reach && (
            <span className="border-border text-muted-foreground rounded-full border px-1.5 py-px text-[10px]">
              {node.reach}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function TrailSection({ story }: { story: Story }) {
  const outlet = getOutlet(story.outletId);
  const hasTail = story.morePickups != null && story.morePickups > 0;
  return (
    <section className="mt-10">
      <h3 className="text-foreground text-[15px] font-semibold">The trail</h3>
      <p className="text-muted-foreground mt-0.5 text-xs">
        Where this came from, and where it went next — oldest first.
      </p>
      <ol className="mt-4">
        {story.upward.map((node) => (
          <TrailItem key={node.id} node={node} direction="up" isLast={false} />
        ))}

        <li className="relative flex gap-3 pb-6">
          <span
            aria-hidden
            className="bg-border absolute top-9 bottom-0 left-[13px] w-px"
          />
          <Monogram outletId={story.outletId} highlight />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-foreground truncate text-[13px] font-semibold">
                {outlet.name}
              </span>
              <span className="text-primary shrink-0 text-[11px] font-medium">
                the piece you&apos;re reading
              </span>
              <span className="text-muted-foreground ml-auto shrink-0 text-[11px]">
                {story.date}
              </span>
            </div>
            <p className="text-foreground/85 mt-0.5 line-clamp-1 text-[13px]/snug">
              {story.title}
            </p>
          </div>
        </li>

        {story.downward.map((node, i) => (
          <TrailItem
            key={node.id}
            node={node}
            direction="down"
            isLast={!hasTail && i === story.downward.length - 1}
          />
        ))}

        {hasTail && (
          <li className="flex gap-3">
            <span className="border-border text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-md border border-dashed text-[10px]">
              ⋯
            </span>
            <p className="text-muted-foreground self-center text-xs">
              + {story.morePickups?.toLocaleString("en")} more posts and
              articles cite this piece.
            </p>
          </li>
        )}
      </ol>
    </section>
  );
}

function PerspectiveRow({
  perspective,
}: {
  perspective: Story["perspectives"][number];
}) {
  const outlet = getOutlet(perspective.outletId);
  return (
    <li className="flex gap-3 py-4">
      <Monogram outletId={perspective.outletId} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground truncate text-[13px] font-medium">
            {outlet.name}
          </span>
          <span className="text-muted-foreground truncate text-[11px]">
            {outlet.label}
          </span>
          <span className="text-muted-foreground ml-auto shrink-0 text-[11px]">
            {perspective.date}
          </span>
        </div>
        <p className="text-foreground/85 mt-0.5 text-[13px]/snug font-medium">
          {perspective.title}
        </p>
        <p className="text-muted-foreground mt-1 text-xs/relaxed">
          {perspective.diff}
        </p>
      </div>
    </li>
  );
}

function PerspectivesSection({ story }: { story: Story }) {
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const activeFilter = story.filters.find((f) => f.id === activeFilterId);

  const groups = activeFilter
    ? [
        {
          key: "yes",
          label: activeFilter.yesLabel,
          items: story.perspectives.filter(
            (p) => p.stances[activeFilter.id] === "yes",
          ),
        },
        {
          key: "no",
          label: activeFilter.noLabel,
          items: story.perspectives.filter(
            (p) => p.stances[activeFilter.id] === "no",
          ),
        },
        {
          key: "silent",
          label: "Doesn't address it",
          items: story.perspectives.filter(
            (p) => p.stances[activeFilter.id] == null,
          ),
        },
      ].filter((group) => group.items.length > 0)
    : null;

  return (
    <section className="mt-10">
      <h3 className="text-foreground text-[15px] font-semibold">
        How others tell it
      </h3>
      <p className="text-muted-foreground mt-0.5 text-xs">
        {story.perspectives.length} versions of the same story — grouped by what
        they claim, not by politics.
      </p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {story.filters.map((filter) => {
          const active = filter.id === activeFilterId;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilterId(active ? null : filter.id)}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-xs transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {active && <Check className="size-3 shrink-0" />}
              {filter.label}
            </button>
          );
        })}
      </div>

      {groups ? (
        <div className="mt-2">
          {groups.map((group) => (
            <div key={group.key} className="mt-4 first:mt-2">
              <h4 className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    group.key === "yes" && "bg-foreground",
                    group.key === "no" && "border-foreground/60 border",
                    group.key === "silent" &&
                      "border-foreground/40 border border-dashed",
                  )}
                />
                {group.label} · {group.items.length}
              </h4>
              <ul className="divide-border divide-y">
                {group.items.map((p) => (
                  <PerspectiveRow key={p.id} perspective={p} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="divide-border mt-2 divide-y">
          {story.perspectives.map((p) => (
            <PerspectiveRow key={p.id} perspective={p} />
          ))}
        </ul>
      )}
    </section>
  );
}

function AnalysisBar({ story }: { story: Story }) {
  return (
    <div className="bg-muted rounded-xl px-4 py-3">
      <div className="text-foreground flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
        <span className="font-semibold">
          {story.claims.length} claims checked
        </span>
        <ClaimCounts story={story} />
      </div>
      <p className="text-muted-foreground mt-1 text-[11px]">
        Tap an underlined statement to see where it comes from.
      </p>
    </div>
  );
}

function StoryView({
  story,
  navigate,
}: {
  story: Story;
  navigate: (route: Route) => void;
}) {
  const [openClaimId, setOpenClaimId] = useState<string | null>(null);
  const outlet = getOutlet(story.outletId);

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-border bg-background/95 sticky top-0 z-10 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-xl items-center gap-2.5 px-4 py-2.5 sm:px-6">
          <button
            onClick={() => navigate({ view: "feed" })}
            aria-label="Back to feed"
            className="text-foreground hover:bg-muted -ml-1.5 cursor-pointer rounded-md p-1.5 transition-colors"
          >
            <ArrowLeft className="size-4" />
          </button>
          <Monogram outletId={story.outletId} size="sm" />
          <span className="text-foreground truncate text-[13px] font-medium">
            {outlet.name}
          </span>
          <span className="text-muted-foreground truncate text-[11px]">
            {outlet.label}
          </span>
        </div>
      </div>

      <article className="mx-auto max-w-xl px-4 pt-6 pb-14 sm:px-6">
        {story.kind === "article" ? (
          <>
            <h1 className="text-foreground font-serif text-[22px]/tight font-bold sm:text-2xl/tight">
              {story.title}
            </h1>
            <p className="text-muted-foreground mt-2 text-xs">
              {story.author && `By ${story.author} · `}
              {outlet.name} · {story.date}
            </p>
            <div className="mt-4">
              <AnalysisBar story={story} />
            </div>
            <div className="mt-5">
              <StoryBody
                story={story}
                openClaimId={openClaimId}
                onToggleClaim={(id) =>
                  setOpenClaimId((prev) => (prev === id ? null : id))
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2.5">
              <Monogram outletId={story.outletId} />
              <div className="min-w-0">
                <div className="text-foreground text-sm font-semibold">
                  {outlet.name}
                </div>
                <div className="text-muted-foreground text-[11px]">
                  {outlet.label} · {story.date}
                </div>
              </div>
            </div>
            <div className="mt-3.5">
              <StoryBody
                story={story}
                openClaimId={openClaimId}
                onToggleClaim={(id) =>
                  setOpenClaimId((prev) => (prev === id ? null : id))
                }
              />
            </div>
            <div className="mt-4">
              <AnalysisBar story={story} />
            </div>
          </>
        )}

        <TrailSection story={story} />
        <PerspectivesSection story={story} />

        <p className="text-muted-foreground pt-12 text-center text-[11px]">
          Referensee demo — every outlet, story and person here is fictional.
        </p>
      </article>
    </div>
  );
}

/* --------------------------------- Root ---------------------------------- */

export default function ReferenseeDemo() {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash),
  );

  const syncFromHash = useCallback(() => {
    setRoute(parseHash(window.location.hash));
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  const navigate = useCallback((next: Route) => {
    const hash = routeToHash(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    setRoute(next);
  }, []);

  const story =
    route.view === "story" ? stories.find((s) => s.id === route.id) : undefined;

  return (
    <div className="flex h-full flex-col">
      {story ? (
        <StoryView key={story.id} story={story} navigate={navigate} />
      ) : (
        <FeedView navigate={navigate} />
      )}
    </div>
  );
}
