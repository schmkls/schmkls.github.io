import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";

function DemoOverlay({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function handleClose() {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    setTimeout(onClose, 300);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape" || closingRef.current) return;
      closingRef.current = true;
      setVisible(false);
      setTimeout(onClose, 300);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div
      className={cn(
        `bg-background fixed inset-0 z-50 flex flex-col transition-all duration-300`,
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div className="border-border flex shrink-0 items-center justify-between border-b px-6 py-4">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          {title}
        </span>
        <button
          onClick={handleClose}
          className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-md p-2 transition-colors focus:outline-none"
          aria-label="Close demo"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>,
    document.body,
  );
}

/**
 * Self-contained launcher for a demo: a button that opens its children
 * fullscreen. The demo is only mounted while open, so demos stay decoupled
 * from the rest of the app. `title` is the overlay header — the idea's title.
 */
export function DemoButton({
  title,
  label = "Try the demo",
  className,
  children,
}: {
  title: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/85 cursor-pointer self-start rounded-lg px-5 py-2 text-sm font-medium transition-colors focus:outline-none",
          className,
        )}
      >
        {label}
      </button>
      {open && (
        <DemoOverlay title={title} onClose={() => setOpen(false)}>
          {children}
        </DemoOverlay>
      )}
    </>
  );
}
