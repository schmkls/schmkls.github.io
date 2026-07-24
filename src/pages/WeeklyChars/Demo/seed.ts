import type { User, Post } from "./types";

function inventory(chars: string, base = 10): Record<string, number> {
  const inv: Record<string, number> = {};
  for (const ch of chars) {
    if (ch === " ") continue;
    inv[ch] = base;
  }
  return inv;
}

function merge(...parts: Record<string, number>[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const part of parts) {
    for (const [k, v] of Object.entries(part)) {
      result[k] = (result[k] ?? 0) + v;
    }
  }
  return result;
}

const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const punctuation = ".,!?'-:;\"()@#";
const emojis = "🔥⚽🌊💀😂❤️👀🎯✨🙌";

const baseChars = lowerLetters + upperLetters + digits + punctuation;

export const seedUsers: User[] = [
  {
    id: "u1",
    name: "Mann Murklan",
    avatar: "🦊",
    characterInventory: merge(
      inventory(baseChars, 5),
      inventory("etaoins", 5),
      inventory("ETAOINS", 3),
      inventory("xyz", -4),
      inventory(emojis, 3),
      inventory("🔥😂", 2),
    ),
  },
  {
    id: "u2",
    name: "xtr3m3_vibes",
    avatar: "🐙",
    characterInventory: merge(
      inventory(baseChars, 10),
      inventory("aeiou", -3),
      inventory("XYZ", 8),
      inventory("0123", 6),
      inventory(emojis, 2),
      inventory("💀👀", 4),
    ),
  },
  {
    id: "u3",
    name: "Marco Rossi",
    avatar: "🎸",
    characterInventory: merge(
      inventory(baseChars, 10),
      inventory("rstlne", 7),
      inventory("RSTLNE", 4),
      inventory("qjkz", -5),
      inventory(emojis, 3),
      inventory("⚽🎯", 3),
    ),
  },
  {
    id: "u4",
    name: "noodl_qu33n",
    avatar: "🍜",
    characterInventory: merge(
      inventory(baseChars, 10),
      inventory("aeo", 4),
      inventory("!?", 6),
      inventory("vwxyz", -3),
      inventory(emojis, 2),
      inventory("✨❤️", 5),
    ),
  },
  {
    id: "u5",
    name: "Aisha Patel",
    avatar: "🌻",
    characterInventory: merge(
      inventory(baseChars, 10),
      inventory("htp", 8),
      inventory("HTP", 5),
      inventory("jkqxz", -6),
      inventory(emojis, 3),
      inventory("🙌🔥", 2),
    ),
  },
  {
    id: "u6",
    name: "driftw00d",
    avatar: "🌊",
    characterInventory: merge(
      inventory(baseChars, 10),
      inventory("dfrt", 3),
      inventory("0123456789", 5),
      inventory("AEIOU", -4),
      inventory(emojis, 2),
      inventory("🌊💀", 4),
    ),
  },
];

const now = Date.now();
const HOUR = 3600_000;

export const seedPosts: Post[] = [
  {
    id: "p1",
    authorId: "u1",
    text: "nba finals got me stressed ngl",
    timestamp: now - 1 * HOUR,
    receivedCharacters: { "🔥": 2, s: 1 },
  },
  {
    id: "p2",
    authorId: "u3",
    text: "election season alrdy? feels too soon smh",
    timestamp: now - 2 * HOUR,
    receivedCharacters: { e: 3, "!": 1 },
  },
  {
    id: "p3",
    authorId: "u2",
    text: "tht nw trd plcy tho... big L 4 sm ppl",
    timestamp: now - 3 * HOUR,
    receivedCharacters: { a: 2, t: 1 },
  },
  {
    id: "p4",
    authorId: "u4",
    text: "messi or ronaldo? dnt @ me w wrong ansr",
    timestamp: now - 5 * HOUR,
    receivedCharacters: { "⚽": 1, o: 2, r: 1 },
  },
  {
    id: "p5",
    authorId: "u5",
    text: "ppl rly vtin 4 tht?? no thx",
    timestamp: now - 6 * HOUR,
    receivedCharacters: {},
  },
  {
    id: "p6",
    authorId: "u6",
    text: "surf ws unrl 2day. 3ft sets all mrning",
    timestamp: now - 8 * HOUR,
    receivedCharacters: { "🌊": 3 },
  },
  {
    id: "p7",
    authorId: "u1",
    text: "can w tlk abt hw d pow @ alta mkes frskn sesns nxt lvl",
    timestamp: now - 10 * HOUR,
    receivedCharacters: { w: 1, e: 2 },
  },
  {
    id: "p8",
    authorId: "u3",
    text: "nw polcy on rent ctrl actlly lks solid",
    timestamp: now - 12 * HOUR,
    receivedCharacters: { o: 1, l: 1 },
  },
];
