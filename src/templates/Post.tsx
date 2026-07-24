import { createContext, useContext, type ReactNode } from "react";
import { DemoButton } from "~/components/DemoButton";
import { cn } from "~/lib/utils";

/**
 * Building blocks for idea posts. A post is a sequence of cards; each card
 * holds a title and one `Post.Card.Body` per paragraph:
 *
 *   export default function MyIdea() {
 *     return (
 *       <Post>
 *         <Post.Epigraph cite="Author" href="https://example.com">
 *           standalone quote, outside any card
 *         </Post.Epigraph>
 *         <Post.Card>
 *           <Post.Card.Title>Problem</Post.Card.Title>
 *           <Post.Card.Body>
 *             Prose is written naturally — apostrophes, quotes and dashes need
 *             no escaping. Inline vocabulary:
 *             <Post.Link href="https://example.com">external link</Post.Link>
 *             <Post.List>
 *               <li>bullet list — pass `ordered` for a numbered one</li>
 *               <li>lists indent automatically when nested</li>
 *             </Post.List>
 *             <Post.Blockquote>quoted aside</Post.Blockquote>
 *             sources as superscript refs: <Post.SourceLink href="…" index={1} />
 *           </Post.Card.Body>
 *           <Post.Card.Subtitle>Optional subheading</Post.Card.Subtitle>
 *           <Post.DemoButton><MyIdeaDemo /></Post.DemoButton>
 *         </Post.Card>
 *       </Post>
 *     );
 *   }
 *
 * Title and tagline come from the post's entry in ideas.ts: the router wraps
 * every post route in <PostMetaProvider>, so pages never pass them around.
 */

type PostMeta = { title: string; tagline: string };

const PostMetaContext = createContext<PostMeta | null>(null);

export function PostMetaProvider({
  meta,
  children,
}: {
  meta: PostMeta;
  children: ReactNode;
}) {
  return (
    <PostMetaContext.Provider value={meta}>{children}</PostMetaContext.Provider>
  );
}

function usePostMeta() {
  const meta = useContext(PostMetaContext);
  if (!meta) {
    throw new Error(
      "Post must be rendered inside <PostMetaProvider> — post routes get it from router.tsx",
    );
  }
  return meta;
}

function Post({ children }: { children: ReactNode }) {
  const { tagline } = usePostMeta();

  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <CardBody>
        <i>{tagline}</i>
      </CardBody>
      {children}
    </article>
  );
}

/* 0 outside any card, 1 inside a top-level card, 2 inside a nested card, … */
const CardDepthContext = createContext(0);

function Card({ children }: { children: ReactNode }) {
  const depth = useContext(CardDepthContext);

  return (
    <CardDepthContext.Provider value={depth + 1}>
      <div className="bg-muted flex flex-col gap-3 rounded-xl p-6">
        {children}
      </div>
    </CardDepthContext.Provider>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  const Heading = useContext(CardDepthContext) > 1 ? "h3" : "h2";
  return (
    <Heading className="text-foreground text-lg font-semibold">
      {children}
    </Heading>
  );
}

function CardSubtitle({ children }: { children: ReactNode }) {
  const Heading = useContext(CardDepthContext) > 1 ? "h4" : "h3";
  return (
    <Heading className="text-foreground font-semibold">{children}</Heading>
  );
}

function CardBody({ children }: { children: ReactNode }) {
  return (
    <div className="text-muted-foreground text-sm/relaxed">{children}</div>
  );
}

const ListDepthContext = createContext(0);

function List({
  ordered = false,
  children,
}: {
  ordered?: boolean;
  children: ReactNode;
}) {
  const depth = useContext(ListDepthContext);
  const Tag = ordered ? "ol" : "ul";

  return (
    <ListDepthContext.Provider value={depth + 1}>
      <Tag
        className={cn(
          "list-inside space-y-2 p-2",
          ordered ? "list-decimal" : "list-disc",
          depth > 0 && "pl-6",
        )}
      >
        {children}
      </Tag>
    </ListDepthContext.Provider>
  );
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {children}
    </a>
  );
}

function Epigraph({
  cite,
  href,
  children,
}: {
  cite: ReactNode;
  href?: string;
  children: ReactNode;
}) {
  return (
    <figure className="text-muted-foreground mx-auto max-w-xl text-center">
      <blockquote className="text-base/relaxed italic">“{children}”</blockquote>
      <figcaption className="mt-1 text-sm">
        — {href ? <Link href={href}>{cite}</Link> : cite}
      </figcaption>
    </figure>
  );
}

function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-border border-l-2 pl-4">
      {children}
    </blockquote>
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

function PostDemoButton({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const { title } = usePostMeta();
  return (
    <DemoButton title={title} label={label}>
      {children}
    </DemoButton>
  );
}

Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Post.Card = Card;
Post.List = List;
Post.Link = Link;
Post.Epigraph = Epigraph;
Post.Blockquote = Blockquote;
Post.SourceLink = SourceLink;
Post.DemoButton = PostDemoButton;

export default Post;
