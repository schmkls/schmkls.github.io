import { useState, useRef } from "react";
import { cn } from "~/lib/utils";
import MobileFrame from "~/components/MobileFrame";

type Expense = {
  id: number;
  merchant: string;
  amount: string;
  category: string;
  date: string;
  description: string;
  totalThisYear: string;
  co2: string;
};

const EXPENSES: Expense[] = [
  {
    id: 1,
    merchant: "Spotify",
    amount: "99 kr",
    category: "Subscriptions",
    date: "Feb 12",
    description: "Music streaming service",
    totalThisYear: "1 188 kr this year",
    co2: "~0.1 kg CO₂",
  },
  {
    id: 2,
    merchant: "McDonald's",
    amount: "142 kr",
    category: "Food & Drink",
    date: "Feb 14",
    description: "Fast food lunch",
    totalThisYear: "2 856 kr this year",
    co2: "~2.4 kg CO₂",
  },
];

const MONTHLY_DATA = [
  { month: "Oct", worthIt: 2, notWorthIt: 5 },
  { month: "Nov", worthIt: 4, notWorthIt: 4 },
  { month: "Dec", worthIt: 5, notWorthIt: 3 },
  { month: "Jan", worthIt: 7, notWorthIt: 2 },
  { month: "Feb", worthIt: 8, notWorthIt: 1 },
];

const MAX_BAR_VALUE = Math.max(
  ...MONTHLY_DATA.flatMap((d) => [d.worthIt, d.notWorthIt]),
);

export default function TinderForExpensesDemo() {
  const [tab, setTab] = useState<"swipe" | "overview">("swipe");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const remaining = EXPENSES.length - currentIndex;
  const currentExpense: Expense | undefined = EXPENSES[currentIndex];

  function handlePointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    setDragOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }

  function handlePointerUp() {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset.x) > 80) {
      setCurrentIndex((i) => i + 1);
    }
    setDragOffset({ x: 0, y: 0 });
  }

  function handlePointerCancel() {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }

  const rotation = dragOffset.x * 0.08;
  const showWorthIt = dragOffset.x > 40;
  const showNotWorthIt = dragOffset.x < -40;

  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <MobileFrame>
        {/* App title */}
        <div className="shrink-0 pb-1 text-center">
          <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100">
            Expense Review
          </span>
        </div>

        {/* Tabs */}
        <div className="mx-3 flex shrink-0 border-b border-zinc-200 dark:border-zinc-700">
          {(["overview", "swipe"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "-mb-px flex flex-1 items-center justify-center gap-1 py-2 text-[11px] font-medium capitalize transition-colors",
                tab === t
                  ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                  : "text-zinc-400",
              )}
            >
              {t === "swipe" ? "Swipe" : "Overview"}
              {t === "swipe" && remaining > 0 && (
                <span className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] leading-none font-bold text-white">
                  {remaining}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden">
          {tab === "swipe" ? (
            <div className="flex h-full flex-col items-center justify-between px-3 py-4">
              {currentExpense ? (
                <>
                  <div
                    className="w-full cursor-grab select-none active:cursor-grabbing"
                    style={{
                      transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.3}px) rotate(${rotation}deg)`,
                      transition: isDragging ? "none" : "transform 0.3s ease",
                      touchAction: "none",
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                      {/* Worth it overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl bg-green-400/20 transition-opacity duration-150",
                          showWorthIt ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <span className="absolute top-3 right-3 rotate-[-15deg] text-3xl">
                          🥳
                        </span>
                        <span className="absolute top-3 left-3 rotate-[-10deg] rounded-lg border-2 border-green-500 px-2 py-0.5 text-xs font-bold text-green-600">
                          WORTH IT
                        </span>
                      </div>

                      {/* Not worth it overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl bg-red-400/20 transition-opacity duration-150",
                          showNotWorthIt ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <span className="absolute top-3 left-3 rotate-15 text-3xl">
                          😬
                        </span>
                        <span className="absolute top-3 right-3 rotate-10 rounded-lg border-2 border-red-500 px-2 py-0.5 text-xs font-bold text-red-600">
                          MEH
                        </span>
                      </div>

                      <div className="mb-3 text-center">
                        <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                          {currentExpense.amount}
                        </div>
                        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                          {currentExpense.merchant}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex justify-between">
                          <span>Category</span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {currentExpense.category}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date</span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {currentExpense.date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Description</span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {currentExpense.description}
                          </span>
                        </div>
                        <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-700" />
                        <div className="flex justify-between">
                          <span>This year</span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {currentExpense.totalThisYear}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>CO₂ impact</span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {currentExpense.co2}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full justify-between px-2 text-xs text-zinc-400">
                    <span>😬 Not worth it</span>
                    <span>Worth it 🥳</span>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <span className="text-3xl">🎉</span>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    All caught up!
                  </p>
                  <p className="text-xs text-zinc-400">
                    Check the overview for your results.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col gap-3 px-4 pt-4 pb-2">
              <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Monthly breakdown
              </p>
              <div className="text-m flex gap-3 text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-sm bg-green-500" />
                  Worth it
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-sm bg-red-400" />
                  Not worth it
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex h-36 items-end gap-2">
                  {MONTHLY_DATA.map((d) => (
                    <div
                      key={d.month}
                      className="flex flex-1 items-end gap-0.5"
                    >
                      <div
                        className="flex-1 rounded-t-sm bg-green-500"
                        style={{
                          height: `${(d.worthIt / MAX_BAR_VALUE) * 144}px`,
                        }}
                      />
                      <div
                        className="flex-1 rounded-t-sm bg-red-400"
                        style={{
                          height: `${(d.notWorthIt / MAX_BAR_VALUE) * 144}px`,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {MONTHLY_DATA.map((d) => (
                    <div
                      key={d.month}
                      className="flex-1 text-center text-[9px] text-zinc-400"
                    >
                      {d.month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </MobileFrame>
    </div>
  );
}
