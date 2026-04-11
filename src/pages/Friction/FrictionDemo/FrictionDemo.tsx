import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Bell,
  Flame,
  MessageSquare,
  Pencil,
  Swords,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { cn } from "~/lib/utils";
import type { FrictionPost, Comment, Debate } from "./types";
import {
  seedPosts,
  seedUsers,
  seedComments,
  seedDebates,
  seedNotifications,
  CURRENT_USER_ID,
} from "./seed";

type Route =
  | { tab: "feed"; sub: "trending" | "following" | "profile" }
  | { tab: "feed"; sub: "post"; postId: string }
  | { tab: "feed"; sub: "user"; userId: string }
  | { tab: "debates" }
  | { tab: "debates"; sub: "profile"; userId: string };

function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  const segments = raw.split("/");

  if (segments[0] === "debates") {
    return { tab: "debates" };
  }
  if (segments[0] === "profile" && segments[1]) {
    return { tab: "feed", sub: "user", userId: segments[1] };
  }
  if (segments[0] === "post" && segments[1]) {
    return { tab: "feed", sub: "post", postId: segments[1] };
  }
  if (segments[0] === "feed") {
    if (segments[1] === "following") return { tab: "feed", sub: "following" };
    if (segments[1] === "profile") return { tab: "feed", sub: "profile" };
    return { tab: "feed", sub: "trending" };
  }
  return { tab: "feed", sub: "trending" };
}

function routeToHash(route: Route): string {
  if (route.tab === "debates") return "#debates";
  if (route.sub === "post" && "postId" in route) return `#post/${route.postId}`;
  if (route.sub === "user" && "userId" in route)
    return `#profile/${route.userId}`;
  if (route.sub === "profile") return "#feed/profile";
  if (route.sub === "following") return "#feed/following";
  return "#feed/trending";
}

function formatDate(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function PostCard({
  post,
  comments,
  debates,
  navigate,
}: {
  post: FrictionPost;
  comments: Comment[];
  debates: Debate[];
  navigate: (route: Route) => void;
}) {
  const [activeTab, setActiveTab] = useState<"comments" | "debates">(
    "comments",
  );
  const author = seedUsers.find((u) => u.id === post.authorId);

  const postComments = comments.filter((c) => c.postId === post.id);
  const topAgree = postComments
    .filter((c) => c.type === "agree")
    .sort((a, b) => b.upvotes - a.upvotes)[0];
  const topDisagree = postComments
    .filter((c) => c.type === "disagree")
    .sort((a, b) => b.upvotes - a.upvotes)[0];

  const postDebates = debates.filter((d) => d.postId === post.id);
  const topDebates = postDebates.slice(0, 2);

  const renderMiniComment = (c: Comment) => {
    const commentAuthor = seedUsers.find((u) => u.id === c.authorId);
    return (
      <div key={c.id} className="flex items-start gap-2 py-1.5">
        <button
          onClick={() =>
            navigate({ tab: "feed", sub: "user", userId: c.authorId })
          }
          className="shrink-0 text-xs"
        >
          {commentAuthor?.avatar}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <button
              onClick={() =>
                navigate({ tab: "feed", sub: "user", userId: c.authorId })
              }
              className="text-foreground text-xs font-medium"
            >
              {commentAuthor?.name}
            </button>
            <span
              className={cn(
                "rounded px-1 py-0.5 text-[10px] font-medium",
                c.type === "agree"
                  ? "bg-green-500/15 text-green-600 dark:text-green-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400",
              )}
            >
              {c.type === "agree" ? "Agree" : "Disagree"}
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
            {c.text}
          </p>
        </div>
        <span className="text-muted-foreground shrink-0 text-[10px]">
          ▲{c.upvotes}
        </span>
      </div>
    );
  };

  const renderMiniDebate = (d: Debate) => {
    const agreeComment = comments.find((c) => c.id === d.agreeCommentId);
    const disagreeComment = comments.find((c) => c.id === d.disagreeCommentId);
    const agreeUser = agreeComment
      ? seedUsers.find((u) => u.id === agreeComment.authorId)
      : null;
    const disagreeUser = disagreeComment
      ? seedUsers.find((u) => u.id === disagreeComment.authorId)
      : null;
    return (
      <div key={d.id} className="border-border rounded border p-2">
        <div className="text-muted-foreground mb-1.5 text-[10px] font-medium uppercase">
          {d.status === "ongoing"
            ? "🔴 Ongoing"
            : `📅 ${d.scheduledTime ? formatDate(d.scheduledTime) : "Scheduled"}`}
        </div>
        {agreeComment && agreeUser && (
          <div className="flex items-start gap-1.5 py-0.5">
            <span className="shrink-0 text-xs">{agreeUser.avatar}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-foreground text-xs font-medium">
                  {agreeUser.name}
                </span>
                <span className="rounded bg-green-500/15 px-1 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                  Agree
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                {agreeComment.text}
              </p>
            </div>
          </div>
        )}
        {disagreeComment && disagreeUser && (
          <div className="flex items-start gap-1.5 py-0.5">
            <span className="shrink-0 text-xs">{disagreeUser.avatar}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-foreground text-xs font-medium">
                  {disagreeUser.name}
                </span>
                <span className="rounded bg-red-500/15 px-1 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                  Disagree
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                {disagreeComment.text}
              </p>
            </div>
          </div>
        )}
        <button className="bg-foreground/10 text-foreground mt-1.5 w-full cursor-pointer rounded px-2 py-1 text-[10px] font-medium transition-colors hover:bg-foreground/20">
          {d.status === "ongoing" ? "Watch" : "Get notified"}
        </button>
      </div>
    );
  };

  return (
    <div className="border-border border-b">
      {/* Post header + content */}
      <div className="flex gap-3 p-3 pb-2">
        <button
          onClick={() =>
            navigate({ tab: "feed", sub: "user", userId: post.authorId })
          }
          className="text-lg leading-none"
        >
          {author?.avatar}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <button
              onClick={() =>
                navigate({ tab: "feed", sub: "user", userId: post.authorId })
              }
              className="text-foreground text-sm font-medium"
            >
              {author?.name}
            </button>
            <span className="text-muted-foreground text-xs">
              {formatDate(post.timestamp)}
            </span>
          </div>
          <button
            onClick={() =>
              navigate({ tab: "feed", sub: "post", postId: post.id })
            }
            className="mt-1 text-left text-sm"
          >
            {post.text}
          </button>
        </div>
      </div>

      {/* Comments / Debates tabs */}
      <div className="flex px-3">
        {(["comments", "debates"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative cursor-pointer px-3 py-1.5 text-xs transition-colors",
              activeTab === tab
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === "comments" ? "Comments" : "Debates on this post"}
            {activeTab === tab && (
              <span className="bg-foreground absolute bottom-0 left-0 right-0 h-0.5 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-3 pb-3 pt-1">
        {activeTab === "comments" ? (
          <div>
            {topAgree && renderMiniComment(topAgree)}
            {topDisagree && renderMiniComment(topDisagree)}
            {!topAgree && !topDisagree && (
              <p className="text-muted-foreground py-1 text-xs">
                No comments yet
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 pt-1">
            {topDebates.length > 0 ? (
              topDebates.map(renderMiniDebate)
            ) : (
              <p className="text-muted-foreground py-1 text-xs">
                No debates yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CreatePostInput({
  onPost,
}: {
  onPost: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handlePost = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onPost(trimmed);
    setText("");
  };

  return (
    <div className="border-border flex gap-2 border-b p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Express your opinion"
        rows={2}
        className="bg-muted text-foreground placeholder:text-muted-foreground flex-1 resize-none rounded-md px-3 py-2 text-sm outline-none"
      />
      <button
        onClick={handlePost}
        className="bg-foreground text-background self-end rounded-md px-4 py-2 text-sm font-medium"
      >
        Post
      </button>
    </div>
  );
}

function ExpandedPostView({
  post,
  comments,
  debates,
  navigate,
  userVotes,
  onVote,
}: {
  post: FrictionPost;
  comments: Comment[];
  debates: Debate[];
  navigate: (route: Route) => void;
  userVotes: Record<string, "up" | "down" | null>;
  onVote: (commentId: string, direction: "up" | "down") => void;
}) {
  const [activeTab, setActiveTab] = useState<"comments" | "debates">(
    "comments",
  );
  const author = seedUsers.find((u) => u.id === post.authorId);
  const postComments = comments.filter((c) => c.postId === post.id);
  const postDebates = debates.filter((d) => d.postId === post.id);

  const renderComment = (c: Comment) => {
    const commentAuthor = seedUsers.find((u) => u.id === c.authorId);
    return (
      <div key={c.id} className="border-border border-b px-3 py-2.5">
        <div className="flex items-start gap-2">
          <button
            onClick={() =>
              navigate({ tab: "feed", sub: "user", userId: c.authorId })
            }
            className="shrink-0 text-sm"
          >
            {commentAuthor?.avatar}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1.5">
              <button
                onClick={() =>
                  navigate({ tab: "feed", sub: "user", userId: c.authorId })
                }
                className="text-foreground text-xs font-medium"
              >
                {commentAuthor?.name}
              </button>
              <span
                className={cn(
                  "rounded px-1 py-0.5 text-[10px] font-medium",
                  c.type === "agree"
                    ? "bg-green-500/15 text-green-600 dark:text-green-400"
                    : "bg-red-500/15 text-red-600 dark:text-red-400",
                )}
              >
                {c.type === "agree" ? "Agree" : "Disagree"}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {formatDate(c.timestamp)}
              </span>
            </div>
            <p className="text-foreground mt-1 text-sm">{c.text}</p>
            <div className="mt-1.5 flex items-center gap-3 text-xs">
              <button
                onClick={() => onVote(c.id, "up")}
                className={cn(
                  "flex cursor-pointer items-center gap-1 transition-colors",
                  userVotes[c.id] === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground hover:text-green-600 dark:hover:text-green-400",
                )}
              >
                <ThumbsUp className="h-3 w-3" />
                {c.upvotes}
              </button>
              <button
                onClick={() => onVote(c.id, "down")}
                className={cn(
                  "flex cursor-pointer items-center gap-1 transition-colors",
                  userVotes[c.id] === "down"
                    ? "text-red-600 dark:text-red-400"
                    : "text-muted-foreground hover:text-red-600 dark:hover:text-red-400",
                )}
              >
                <ThumbsDown className="h-3 w-3" />
                {c.downvotes}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDebate = (d: Debate) => {
    const agreeComment = comments.find((c) => c.id === d.agreeCommentId);
    const disagreeComment = comments.find((c) => c.id === d.disagreeCommentId);
    const agreeUser = agreeComment
      ? seedUsers.find((u) => u.id === agreeComment.authorId)
      : null;
    const disagreeUser = disagreeComment
      ? seedUsers.find((u) => u.id === disagreeComment.authorId)
      : null;
    return (
      <div key={d.id} className="border-border border-b p-3">
        <div className="text-muted-foreground mb-2 text-[10px] font-medium uppercase">
          {d.status === "ongoing"
            ? "🔴 Ongoing"
            : `📅 ${d.scheduledTime ? formatDate(d.scheduledTime) : "Scheduled"}`}
        </div>
        {agreeComment && agreeUser && (
          <div className="flex items-start gap-2 py-1">
            <span className="shrink-0 text-sm">{agreeUser.avatar}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-foreground text-xs font-medium">
                  {agreeUser.name}
                </span>
                <span className="rounded bg-green-500/15 px-1 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                  Agree
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                {agreeComment.text}
              </p>
            </div>
          </div>
        )}
        {disagreeComment && disagreeUser && (
          <div className="flex items-start gap-2 py-1">
            <span className="shrink-0 text-sm">{disagreeUser.avatar}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-foreground text-xs font-medium">
                  {disagreeUser.name}
                </span>
                <span className="rounded bg-red-500/15 px-1 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                  Disagree
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                {disagreeComment.text}
              </p>
            </div>
          </div>
        )}
        <button className="bg-foreground/10 text-foreground mt-2 w-full cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/20">
          {d.status === "ongoing" ? "Watch" : "Get notified"}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Back button */}
      <div className="border-border flex items-center gap-2 border-b px-3 py-2.5">
        <button
          onClick={() => window.history.back()}
          className="text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-foreground text-sm font-medium">Post</span>
      </div>

      {/* Post header + content */}
      <div className="flex gap-3 p-3 pb-2">
        <button
          onClick={() =>
            navigate({ tab: "feed", sub: "user", userId: post.authorId })
          }
          className="text-lg leading-none"
        >
          {author?.avatar}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <button
              onClick={() =>
                navigate({ tab: "feed", sub: "user", userId: post.authorId })
              }
              className="text-foreground text-sm font-medium"
            >
              {author?.name}
            </button>
            <span className="text-muted-foreground text-xs">
              {formatDate(post.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm">{post.text}</p>
        </div>
      </div>

      {/* Comments / Debates tabs */}
      <div className="border-border flex border-b px-3">
        {(["comments", "debates"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative cursor-pointer px-3 py-2 text-xs transition-colors",
              activeTab === tab
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === "comments" ? "Comments" : "Debates on this post"}
            {activeTab === tab && (
              <span className="bg-foreground absolute bottom-0 left-0 right-0 h-0.5 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "comments" ? (
          <div>
            {postComments.length > 0 ? (
              postComments
                .sort((a, b) => b.upvotes - a.upvotes)
                .map(renderComment)
            ) : (
              <p className="text-muted-foreground p-3 text-sm">
                No comments yet
              </p>
            )}
          </div>
        ) : (
          <div>
            {postDebates.length > 0 ? (
              postDebates.map(renderDebate)
            ) : (
              <p className="text-muted-foreground p-3 text-sm">
                No debates yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type TimelineEvent =
  | { kind: "post"; ts: number; post: FrictionPost }
  | { kind: "comment"; ts: number; comment: Comment; post: FrictionPost | undefined }
  | { kind: "debate"; ts: number; debate: Debate; post: FrictionPost | undefined };

function ProfileView({
  userId,
  posts,
  comments,
  debates,
  navigate,
  showBack,
}: {
  userId: string;
  posts: FrictionPost[];
  comments: Comment[];
  debates: Debate[];
  navigate: (route: Route) => void;
  showBack: boolean;
}) {
  const user = seedUsers.find((u) => u.id === userId);
  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">User not found</p>
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.authorId === userId);
  const userComments = comments.filter((c) => c.authorId === userId);
  const userDebates = debates.filter((d) => {
    const agreeComment = comments.find((c) => c.id === d.agreeCommentId);
    const disagreeComment = comments.find((c) => c.id === d.disagreeCommentId);
    return agreeComment?.authorId === userId || disagreeComment?.authorId === userId;
  });

  // Build timeline
  const events: TimelineEvent[] = [
    ...userPosts.map((p) => ({ kind: "post" as const, ts: p.timestamp, post: p })),
    ...userComments.map((c) => ({
      kind: "comment" as const,
      ts: c.timestamp,
      comment: c,
      post: posts.find((p) => p.id === c.postId),
    })),
    ...userDebates.map((d) => ({
      kind: "debate" as const,
      ts: d.scheduledTime ?? 0,
      debate: d,
      post: posts.find((p) => p.id === d.postId),
    })),
  ].sort((a, b) => b.ts - a.ts);

  return (
    <div className="flex flex-1 flex-col">
      {showBack && (
        <div className="border-border flex items-center gap-2 border-b px-3 py-2.5">
          <button
            onClick={() => window.history.back()}
            className="text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-foreground text-sm font-medium">Profile</span>
        </div>
      )}

      {/* User header */}
      <div className="flex flex-col items-center gap-1 px-3 pt-6 pb-4">
        <span className="text-4xl">{user.avatar}</span>
        <span className="text-foreground text-lg font-semibold">{user.name}</span>
      </div>

      {/* Stats */}
      <div className="border-border flex border-y">
        {[
          { label: "Posts", count: userPosts.length, icon: <Pencil className="h-3.5 w-3.5" /> },
          { label: "Comments", count: userComments.length, icon: <MessageSquare className="h-3.5 w-3.5" /> },
          { label: "Debates", count: userDebates.length, icon: <Swords className="h-3.5 w-3.5" /> },
        ].map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-0.5 py-3">
            <div className="text-muted-foreground flex items-center gap-1 text-[10px]">{s.icon}{s.label}</div>
            <span className="text-foreground text-sm font-semibold">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-muted-foreground px-3 pt-3 pb-1 text-xs font-medium uppercase">
          Activity
        </div>
        {events.length === 0 && (
          <p className="text-muted-foreground px-3 py-4 text-sm">No activity yet</p>
        )}
        {events.map((ev) => {
          if (ev.kind === "post") {
            return (
              <button
                key={`post-${ev.post.id}`}
                onClick={() => navigate({ tab: "feed", sub: "post", postId: ev.post.id })}
                className="border-border flex w-full items-start gap-2.5 border-b px-3 py-2.5 text-left"
              >
                <div className="bg-blue-500/15 text-blue-600 dark:text-blue-400 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <Pencil className="h-3 w-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-foreground text-xs font-medium">Posted</span>
                    <span className="text-muted-foreground text-[10px]">{formatDate(ev.ts)}</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">{ev.post.text}</p>
                </div>
              </button>
            );
          }
          if (ev.kind === "comment") {
            return (
              <button
                key={`comment-${ev.comment.id}`}
                onClick={() =>
                  ev.post
                    ? navigate({ tab: "feed", sub: "post", postId: ev.post.id })
                    : undefined
                }
                className="border-border flex w-full items-start gap-2.5 border-b px-3 py-2.5 text-left"
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    ev.comment.type === "agree"
                      ? "bg-green-500/15 text-green-600 dark:text-green-400"
                      : "bg-red-500/15 text-red-600 dark:text-red-400",
                  )}
                >
                  <MessageSquare className="h-3 w-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-foreground text-xs font-medium">
                      {ev.comment.type === "agree" ? "Agreed" : "Disagreed"}
                    </span>
                    <span className="text-muted-foreground text-[10px]">{formatDate(ev.ts)}</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">{ev.comment.text}</p>
                </div>
              </button>
            );
          }
          // debate
          const agreeComment = comments.find((c) => c.id === ev.debate.agreeCommentId);
          const disagreeComment = comments.find((c) => c.id === ev.debate.disagreeCommentId);
          const opponent =
            agreeComment?.authorId === userId ? disagreeComment : agreeComment;
          const opponentUser = opponent
            ? seedUsers.find((u) => u.id === opponent.authorId)
            : null;
          return (
            <button
              key={`debate-${ev.debate.id}`}
              onClick={() =>
                ev.post
                  ? navigate({ tab: "feed", sub: "post", postId: ev.post.id })
                  : undefined
              }
              className="border-border flex w-full items-start gap-2.5 border-b px-3 py-2.5 text-left"
            >
              <div className="bg-purple-500/15 text-purple-600 dark:text-purple-400 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                <Swords className="h-3 w-3" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-foreground text-xs font-medium">
                    Debate {opponentUser ? `vs ${opponentUser.name}` : ""}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1 py-0.5 text-[10px] font-medium",
                      ev.debate.status === "ongoing"
                        ? "bg-red-500/15 text-red-600 dark:text-red-400"
                        : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
                    )}
                  >
                    {ev.debate.status === "ongoing" ? "Ongoing" : "Scheduled"}
                  </span>
                </div>
                {ev.post && (
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                    on: {ev.post.text}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DebatesView({
  debates,
  posts,
  comments,
  navigate,
}: {
  debates: Debate[];
  posts: FrictionPost[];
  comments: Comment[];
  navigate: (route: Route) => void;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifCount = seedNotifications.filter((n) => !n.isSectionHeader).length;

  return (
    <div className="relative flex h-full flex-col">
      {/* Notification bell */}
      <button
        onClick={() => setShowNotifications((prev) => !prev)}
        className="text-foreground absolute top-3 right-3 z-10 cursor-pointer"
      >
        <Bell className="h-5 w-5" />
        {notifCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {notifCount}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowNotifications(false)}
          />
          <div className="bg-background border-border absolute top-10 right-3 z-20 w-72 rounded-lg border shadow-lg">
            <div className="border-border border-b px-3 py-2">
              <span className="text-foreground text-sm font-medium">
                Notifications
              </span>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {seedNotifications.map((n) =>
                n.isSectionHeader ? (
                  <div
                    key={n.id}
                    className="text-muted-foreground px-3 pt-3 pb-1 text-[10px] font-medium uppercase"
                  >
                    {n.text}
                  </div>
                ) : (
                  <div
                    key={n.id}
                    className="border-border border-b px-3 py-2.5 last:border-b-0"
                  >
                    <p className="text-foreground text-xs">{n.text}</p>
                    {n.buttons && (
                      <div className="mt-1.5 flex gap-1.5">
                        {n.buttons.map((b) => (
                          <button
                            key={b.label}
                            className="bg-foreground/10 text-foreground cursor-pointer rounded px-2 py-1 text-[10px] font-medium transition-colors hover:bg-foreground/20"
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </>
      )}

      {/* Snap-scroll debate feed */}
      <div className="h-full snap-y snap-mandatory overflow-y-auto">
        {debates.map((d) => {
          const post = posts.find((p) => p.id === d.postId);
          const agreeComment = comments.find(
            (c) => c.id === d.agreeCommentId,
          );
          const disagreeComment = comments.find(
            (c) => c.id === d.disagreeCommentId,
          );
          const agreeUser = agreeComment
            ? seedUsers.find((u) => u.id === agreeComment.authorId)
            : null;
          const disagreeUser = disagreeComment
            ? seedUsers.find((u) => u.id === disagreeComment.authorId)
            : null;
          const postAuthor = post
            ? seedUsers.find((u) => u.id === post.authorId)
            : null;

          return (
            <div
              key={d.id}
              className="flex h-full snap-start flex-col"
            >
              {/* Original post (condensed) */}
              {post && (
                <button
                  onClick={() =>
                    navigate({ tab: "feed", sub: "post", postId: post.id })
                  }
                  className="border-border flex shrink-0 items-start gap-2 border-b px-3 py-2.5 text-left"
                >
                  <span className="text-sm">{postAuthor?.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-foreground text-xs font-medium">
                      {postAuthor?.name}
                    </span>
                    <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                      {post.text}
                    </p>
                  </div>
                </button>
              )}

              {/* Debate info */}
              <div className="border-border shrink-0 border-b px-3 py-2">
                <div className="text-muted-foreground mb-1 text-[10px] font-medium uppercase">
                  {d.status === "ongoing"
                    ? "🔴 Ongoing"
                    : `📅 ${d.scheduledTime ? formatDate(d.scheduledTime) : "Scheduled"}`}
                </div>
                <div className="flex items-center gap-2">
                  {agreeUser && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{agreeUser.avatar}</span>
                      <span className="text-foreground text-xs font-medium">
                        {agreeUser.name}
                      </span>
                      <span className="rounded bg-green-500/15 px-1 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                        Agree
                      </span>
                    </div>
                  )}
                  <span className="text-muted-foreground text-xs">vs</span>
                  {disagreeUser && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{disagreeUser.avatar}</span>
                      <span className="text-foreground text-xs font-medium">
                        {disagreeUser.name}
                      </span>
                      <span className="rounded bg-red-500/15 px-1 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                        Disagree
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Two "video streams" stacked vertically */}
              <div className="flex min-h-0 flex-1 flex-col">
                {/* Agree stream */}
                <div className="bg-muted relative flex flex-1 items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center gap-1">
                    <span className="text-3xl">{agreeUser?.avatar}</span>
                    <span className="text-foreground text-sm font-medium">
                      {agreeUser?.name}
                    </span>
                    <span className="rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                      Agree
                    </span>
                  </div>
                  <div className="bg-foreground/5 absolute inset-0" />
                </div>
                {/* Disagree stream */}
                <div className="bg-muted relative flex flex-1 items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center gap-1">
                    <span className="text-3xl">{disagreeUser?.avatar}</span>
                    <span className="text-foreground text-sm font-medium">
                      {disagreeUser?.name}
                    </span>
                    <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                      Disagree
                    </span>
                  </div>
                  <div className="bg-foreground/5 absolute inset-0" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FrictionDemo() {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash),
  );
  const [posts, setPosts] = useState<FrictionPost[]>(seedPosts);
  const [comments, setComments] = useState<Comment[]>(seedComments);
  const [userVotes, setUserVotes] = useState<
    Record<string, "up" | "down" | null>
  >({});

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

  const handleCreatePost = useCallback(
    (text: string, feed: "trending" | "following") => {
      const newPost: FrictionPost = {
        id: `p-new-${Date.now()}`,
        authorId: CURRENT_USER_ID,
        text,
        timestamp: Date.now(),
        feed,
      };
      setPosts((prev) => [newPost, ...prev]);
    },
    [],
  );

  const handleVote = useCallback(
    (commentId: string, direction: "up" | "down") => {
      const current = userVotes[commentId] ?? null;
      let newVote: "up" | "down" | null;

      if (current === direction) {
        newVote = null;
      } else {
        newVote = direction;
      }

      setUserVotes((prev) => ({ ...prev, [commentId]: newVote }));
      setComments((prev) =>
        prev.map((c) => {
          if (c.id !== commentId) return c;
          let { upvotes, downvotes } = c;
          // Remove previous vote
          if (current === "up") upvotes--;
          if (current === "down") downvotes--;
          // Apply new vote
          if (newVote === "up") upvotes++;
          if (newVote === "down") downvotes++;
          return { ...c, upvotes, downvotes };
        }),
      );
    },
    [userVotes],
  );

  const feedSubTabs: { key: "trending" | "following" | "profile"; label: string }[] = [
    { key: "trending", label: "Trending" },
    { key: "following", label: "Following" },
    { key: "profile", label: "My Profile" },
  ];

  const activeSub =
    route.tab === "feed" &&
    (route.sub === "trending" || route.sub === "following" || route.sub === "profile")
      ? route.sub
      : null;

  const renderContent = () => {
    if (route.tab === "debates") {
      return (
        <DebatesView
          debates={seedDebates}
          posts={posts}
          comments={comments}
          navigate={navigate}
        />
      );
    }

    // User profile view (clicked from avatar/username)
    if (route.sub === "user" && "userId" in route) {
      return (
        <ProfileView
          userId={route.userId}
          posts={posts}
          comments={comments}
          debates={seedDebates}
          navigate={navigate}
          showBack={true}
        />
      );
    }

    // Expanded post view
    if (route.sub === "post" && "postId" in route) {
      const post = posts.find((p) => p.id === route.postId);
      if (!post) {
        return (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground text-sm">Post not found</p>
          </div>
        );
      }
      return (
        <ExpandedPostView
          post={post}
          comments={comments}
          debates={seedDebates}
          navigate={navigate}
          userVotes={userVotes}
          onVote={handleVote}
        />
      );
    }

    const isFeedList = route.sub === "trending" || route.sub === "following";
    const feedFilter = route.sub === "following" ? "following" : "trending";

    const feedPosts = isFeedList
      ? posts.filter((p) => p.feed === feedFilter)
      : [];

    return (
      <div className="flex flex-1 flex-col">
        {/* Sub-tabs for main feed views */}
        {activeSub && (
          <div className="border-border flex shrink-0 border-b">
            {feedSubTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => navigate({ tab: "feed", sub: t.key })}
                className={cn(
                  "relative flex-1 cursor-pointer py-2.5 text-center text-sm transition-colors",
                  activeSub === t.key
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                {activeSub === t.key && (
                  <span className="bg-foreground absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {isFeedList && (
          <>
            <CreatePostInput
              onPost={(text) => handleCreatePost(text, feedFilter)}
            />
            <div className="flex flex-col">
              {feedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  comments={comments}
                  debates={seedDebates}
                  navigate={navigate}
                />
              ))}
            </div>
          </>
        )}

        {!isFeedList && route.sub === "profile" && (
          <ProfileView
            userId={CURRENT_USER_ID}
            posts={posts}
            comments={comments}
            debates={seedDebates}
            navigate={navigate}
            showBack={false}
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-background mx-auto flex h-full w-full max-w-md flex-col">
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>

      {/* Bottom tab bar */}
      <div className="border-border bg-background flex shrink-0 border-t">
        <button
          onClick={() => navigate({ tab: "feed", sub: "trending" })}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center gap-1 py-3 text-xs transition-colors",
            route.tab === "feed"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Flame className="h-5 w-5" />
          Friction
        </button>
        <button
          onClick={() => navigate({ tab: "debates" })}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center gap-1 py-3 text-xs transition-colors",
            route.tab === "debates"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Swords className="h-5 w-5" />
          Debates
        </button>
      </div>
    </div>
  );
}
