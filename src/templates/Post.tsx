import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";

type PostContextValue = {
  openDemo: (title: string, component: ReactNode) => void;
};

const PostContext = createContext<PostContextValue | null>(null);

function usePostContext() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("Post subcomponents must be used within <Post>");
  return ctx;
}

export type ActiveDemo = { title: string; component: ReactNode };

export function DemoOverlay({
  demo,
  onClose,
}: {
  demo: ActiveDemo;
  onClose: () => void;
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
        "bg-background fixed inset-0 z-50 flex flex-col transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div className="border-border flex shrink-0 items-center justify-between border-b px-6 py-4">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          {demo.title}
        </span>
        <button
          onClick={handleClose}
          className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-md p-2 transition-colors focus:outline-none"
          aria-label="Close demo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{demo.component}</div>
    </div>,
    document.body,
  );
}

function Post({ tagline, children }: { tagline: string; children: ReactNode }) {
  const [activeDemo, setActiveDemo] = useState<ActiveDemo | null>(null);

  return (
    <PostContext.Provider
      value={{
        openDemo: (title, component) => setActiveDemo({ title, component }),
      }}
    >
      <article className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
        <CardBody>
          <i>{tagline}</i>
        </CardBody>
        {children}
      </article>
      {activeDemo && (
        <DemoOverlay demo={activeDemo} onClose={() => setActiveDemo(null)} />
      )}
    </PostContext.Provider>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted flex flex-col gap-3 rounded-xl p-6">
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-foreground text-lg font-semibold">{children}</h2>;
}

function CardBody({ children }: { children: ReactNode }) {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed">
      {children}
    </div>
  );
}

function HorizontalLine() {
  return (
    <div className="via-border h-px bg-linear-to-r from-transparent to-transparent" />
  );
}

function PostImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      className="max-h-96 w-full rounded-xl object-cover"
    />
  );
}

function DemoButton({
  title,
  demoComponent,
}: {
  title: string;
  demoComponent: ReactNode;
}) {
  const { openDemo } = usePostContext();
  return (
    <button
      onClick={() => openDemo(title, demoComponent)}
      className="bg-primary text-primary-foreground hover:bg-primary/85 cursor-pointer self-start rounded-lg px-5 py-2 text-sm font-medium transition-colors focus:outline-none"
    >
      {title}
    </button>
  );
}

function SourceLink({ href, index }: { href: string; index: number }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="align-super text-[10px] opacity-50 hover:opacity-100"
    >
      [{index}]
    </a>
  );
}

Card.Title = CardTitle;
Card.Body = CardBody;
Post.Card = Card;
Post.HorizontalLine = HorizontalLine;
Post.Image = PostImage;
Post.DemoButton = DemoButton;
Post.SourceLink = SourceLink;

export default Post;
