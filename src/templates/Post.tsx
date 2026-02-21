import type { ReactNode } from "react";

function Post({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      {children}
    </article>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-muted p-6">
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-foreground">{children}</h2>;
}

function HorizontalLine() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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

Card.Title = CardTitle;
Post.Card = Card;
Post.HorizontalLine = HorizontalLine;
Post.Image = PostImage;

export default Post;
