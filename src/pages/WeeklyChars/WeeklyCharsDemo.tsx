import { useMemo, useState } from "react";
import { ArrowLeft, Home, Plus, Send, User as UserIcon } from "lucide-react";
import { seedUsers, seedPosts } from "./seed";
import type { Post, User } from "./types";

const CURRENT_USER_ID = "u1";

type View = { type: "feed" } | { type: "profile"; userId: string };

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function ReceivedCharacters({ chars }: { chars: Record<string, number> }) {
  const entries = Object.entries(chars).filter(([, count]) => count > 0);
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {entries.map(([char, count]) => (
        <span
          key={char}
          className="inline-flex items-center overflow-hidden rounded text-xs"
        >
          <span className="bg-muted py-0.5 pr-1 pl-1.5">{char}</span>
          <span className="bg-muted/50 text-muted-foreground py-0.5 pr-1.5 pl-1">
            {count}
          </span>
        </span>
      ))}
    </div>
  );
}

function analyzeChars(
  text: string,
  inventory: Record<string, number>,
): { char: string; available: boolean }[] {
  const used: Record<string, number> = {};
  return [...text].map((char) => {
    if (/\s/.test(char)) return { char, available: true };
    used[char] = (used[char] ?? 0) + 1;
    return { char, available: used[char] <= (inventory[char] ?? 0) };
  });
}

function sanitizeText(
  text: string,
  inventory: Record<string, number>,
): { sanitized: string; usedChars: Record<string, number> } {
  const used: Record<string, number> = {};
  const usedChars: Record<string, number> = {};
  const parts: string[] = [];
  for (const char of text) {
    if (/\s/.test(char)) {
      parts.push(char);
      continue;
    }
    used[char] = (used[char] ?? 0) + 1;
    if (used[char] <= (inventory[char] ?? 0)) {
      parts.push(char);
      usedChars[char] = (usedChars[char] ?? 0) + 1;
    }
  }
  return { sanitized: parts.join(""), usedChars };
}

function Composer({
  currentUser,
  onPost,
}: {
  currentUser: User;
  onPost: (text: string, usedChars: Record<string, number>) => void;
}) {
  const [text, setText] = useState("");

  const analysis = useMemo(
    () => analyzeChars(text, currentUser.characterInventory),
    [text, currentUser.characterInventory],
  );

  const hasUnavailable = analysis.some((a) => !a.available);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const { sanitized, usedChars } = sanitizeText(
      text,
      currentUser.characterInventory,
    );
    if (!sanitized.trim()) return;
    onPost(sanitized, usedChars);
    setText("");
  };

  return (
    <div className="border-border border-b px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-2xl leading-none">
          {currentUser.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="text-foreground placeholder:text-muted-foreground w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
            rows={2}
          />
          {text && hasUnavailable && (
            <div className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">
              {analysis.map((item, i) => (
                <span
                  key={i}
                  className={
                    item.available
                      ? "text-foreground"
                      : "text-muted-foreground/40 line-through"
                  }
                >
                  {item.char}
                </span>
              ))}
            </div>
          )}
          <div className="mt-2 flex items-center justify-end">
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="text-foreground hover:text-foreground/80 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold transition-colors disabled:cursor-default disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacterPicker({
  inventory,
  onPick,
  onClose,
}: {
  inventory: Record<string, number>;
  onPick: (char: string) => void;
  onClose: () => void;
}) {
  const available = Object.entries(inventory)
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (available.length === 0) {
    return (
      <div className="bg-muted border-border mt-1 rounded border p-2 text-xs">
        <div className="text-muted-foreground mb-1 flex items-center justify-between">
          <span>No characters available</span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted border-border mt-1 rounded border p-2 text-xs">
      <div className="text-muted-foreground mb-1.5 flex items-center justify-between">
        <span>Give a character</span>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-wrap gap-1">
        {available.map(([char, count]) => (
          <button
            key={char}
            onClick={() => onPick(char)}
            className="hover:bg-foreground/10 inline-flex cursor-pointer items-center overflow-hidden rounded font-mono transition-colors"
          >
            <span className="bg-background py-0.5 pr-1 pl-1.5">{char}</span>
            <span className="text-muted-foreground bg-background/50 py-0.5 pr-1.5 pl-1">
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
  author,
  currentUserInventory,
  onNavigateProfile,
  onGiveCharacter,
}: {
  post: Post;
  author: User;
  currentUserInventory: Record<string, number>;
  onNavigateProfile: (userId: string) => void;
  onGiveCharacter: (postId: string, char: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="border-border border-b px-4 py-3">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onNavigateProfile(author.id)}
          className="shrink-0 cursor-pointer text-2xl leading-none"
        >
          {author.avatar}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <button
              onClick={() => onNavigateProfile(author.id)}
              className="text-foreground min-w-0 cursor-pointer truncate text-sm font-semibold hover:underline"
            >
              {author.name}
            </button>
            <span className="text-muted-foreground shrink-0 text-xs">
              · {formatTime(post.timestamp)}
            </span>
          </div>
          <p className="text-foreground mt-1 text-sm leading-relaxed break-words">
            {post.text}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <ReceivedCharacters chars={post.receivedCharacters} />
            <button
              onClick={() => setPickerOpen((prev) => !prev)}
              className="text-muted-foreground hover:text-foreground ml-auto flex cursor-pointer items-center gap-1 rounded p-1 text-xs transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          {pickerOpen && (
            <CharacterPicker
              inventory={currentUserInventory}
              onPick={(char) => {
                onGiveCharacter(post.id, char);
              }}
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CharacterInventoryGrid({
  inventory,
}: {
  inventory: Record<string, number>;
}) {
  const entries = Object.entries(inventory)
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (entries.length === 0) return null;

  return (
    <div className="px-4 py-3">
      <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
        Character Inventory
      </div>
      <div className="flex flex-wrap gap-1">
        {entries.map(([char, count]) => (
          <span
            key={char}
            className="inline-flex items-center overflow-hidden rounded font-mono text-xs"
          >
            <span className="bg-muted py-0.5 pr-1 pl-1.5">{char}</span>
            <span className="bg-muted/50 text-muted-foreground py-0.5 pr-1.5 pl-1">
              {count}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProfileView({
  user,
  posts,
  currentUserInventory,
  onBack,
  onNavigateProfile,
  onGiveCharacter,
}: {
  user: User;
  posts: Post[];
  currentUserInventory: Record<string, number>;
  onBack: () => void;
  onNavigateProfile: (userId: string) => void;
  onGiveCharacter: (postId: string, char: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="border-border flex items-center gap-3 border-b px-4 py-3">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-foreground text-sm font-semibold">
          {user.name}
        </span>
      </div>
      <div className="flex items-center gap-4 px-4 py-6">
        <span className="text-4xl">{user.avatar}</span>
        <div className="min-w-0">
          <div className="text-foreground truncate font-semibold">
            {user.name}
          </div>
          <div className="text-muted-foreground text-xs">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </div>
        </div>
      </div>
      <CharacterInventoryGrid inventory={user.characterInventory} />
      <div className="border-border border-t">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            author={user}
            currentUserInventory={currentUserInventory}
            onNavigateProfile={onNavigateProfile}
            onGiveCharacter={onGiveCharacter}
          />
        ))}
      </div>
    </div>
  );
}

export default function WeeklyCharsDemo() {
  const [view, setView] = useState<View>({ type: "feed" });
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [posts, setPosts] = useState<Post[]>(seedPosts);

  const userMap = new Map(users.map((u) => [u.id, u]));
  const currentUser = userMap.get(CURRENT_USER_ID)!;
  const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);

  const navigateProfile = (userId: string) =>
    setView({ type: "profile", userId });
  const navigateFeed = () => setView({ type: "feed" });

  const handlePost = (text: string, usedChars: Record<string, number>) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      authorId: CURRENT_USER_ID,
      text,
      timestamp: Date.now(),
      receivedCharacters: {},
    };
    setPosts((prev) => [newPost, ...prev]);
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== CURRENT_USER_ID) return u;
        const inv = { ...u.characterInventory };
        for (const [char, count] of Object.entries(usedChars)) {
          inv[char] = (inv[char] ?? 0) - count;
        }
        return { ...u, characterInventory: inv };
      }),
    );
  };

  const handleGiveCharacter = (postId: string, char: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    if ((currentUser.characterInventory[char] ?? 0) <= 0) return;

    setUsers((prev) =>
      prev.map((u) => {
        const inv = { ...u.characterInventory };
        if (u.id === CURRENT_USER_ID) {
          inv[char] = (inv[char] ?? 0) - 1;
        } else if (u.id === post.authorId) {
          inv[char] = (inv[char] ?? 0) + 1;
        } else {
          return u;
        }
        return { ...u, characterInventory: inv };
      }),
    );

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const received = { ...p.receivedCharacters };
        received[char] = (received[char] ?? 0) + 1;
        return { ...p, receivedCharacters: received };
      }),
    );
  };

  const isMyProfile =
    view.type === "profile" && view.userId === CURRENT_USER_ID;

  const bottomNav = (
    <div className="border-border bg-background flex shrink-0 border-t">
      <button
        onClick={navigateFeed}
        className={`flex flex-1 cursor-pointer flex-col items-center gap-1 py-3 text-xs transition-colors ${
          view.type === "feed"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Home className="h-5 w-5" />
        Feed
      </button>
      <button
        onClick={() => navigateProfile(CURRENT_USER_ID)}
        className={`flex flex-1 cursor-pointer flex-col items-center gap-1 py-3 text-xs transition-colors ${
          isMyProfile
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <UserIcon className="h-5 w-5" />
        My Profile
      </button>
    </div>
  );

  if (view.type === "profile") {
    const user = userMap.get(view.userId);
    if (!user) return null;
    const userPosts = sortedPosts.filter((p) => p.authorId === user.id);
    return (
      <div className="bg-background mx-auto flex h-full w-full max-w-xl flex-col">
        <div className="flex-1 overflow-y-auto">
          <ProfileView
            user={user}
            posts={userPosts}
            currentUserInventory={currentUser.characterInventory}
            onBack={navigateFeed}
            onNavigateProfile={navigateProfile}
            onGiveCharacter={handleGiveCharacter}
          />
        </div>
        {bottomNav}
      </div>
    );
  }

  return (
    <div className="bg-background mx-auto flex h-full w-full max-w-xl flex-col">
      <div className="border-border flex shrink-0 items-center border-b px-4 py-3">
        <span className="text-foreground text-sm font-semibold tracking-wide">
          WeeklyChars
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Composer currentUser={currentUser} onPost={handlePost} />
        {sortedPosts.map((post) => {
          const author = userMap.get(post.authorId);
          if (!author) return null;
          return (
            <PostCard
              key={post.id}
              post={post}
              author={author}
              currentUserInventory={currentUser.characterInventory}
              onNavigateProfile={navigateProfile}
              onGiveCharacter={handleGiveCharacter}
            />
          );
        })}
      </div>
      {bottomNav}
    </div>
  );
}
