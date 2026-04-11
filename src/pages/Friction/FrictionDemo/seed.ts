import type { User, FrictionPost, Comment, Debate, Notification } from "./types";

const now = Date.now();
const HOUR = 3_600_000;
const DAY = 24 * HOUR;

export const CURRENT_USER_ID = "u1";

export const seedUsers: User[] = [
  { id: "u1", name: "You", avatar: "🦊" },
  { id: "u2", name: "Anja", avatar: "🐙" },
  { id: "u3", name: "JohnWick", avatar: "🎸" },
  { id: "u4", name: "Andrea95", avatar: "🌻" },
  { id: "u5", name: "JanuschBro", avatar: "🍜" },
  { id: "u6", name: "CarlDaman", avatar: "🌊" },
  { id: "u7", name: "MikaRun", avatar: "🔥" },
  { id: "u8", name: "LisaWho", avatar: "🐝" },
];

// --- Posts ---
// Trending posts have higher interaction counts (more comments, upvotes)
export const seedPosts: FrictionPost[] = [
  // Trending posts
  {
    id: "p1",
    authorId: "u2",
    text: "Universal basic income would solve more problems than any targeted welfare program. Change my mind.",
    timestamp: now - 2 * HOUR,
    feed: "trending",
  },
  {
    id: "p2",
    authorId: "u3",
    text: "Social media companies should be legally required to show chronological feeds by default. Algorithmic feeds are designed to addict, not inform.",
    timestamp: now - 5 * HOUR,
    feed: "trending",
  },
  {
    id: "p3",
    authorId: "u6",
    text: "Remote work is making us worse communicators. We traded watercooler chats for Slack threads and lost all nuance.",
    timestamp: now - 8 * HOUR,
    feed: "trending",
  },
  {
    id: "p4",
    authorId: "u7",
    text: "Electric cars won't save the planet. We need fewer cars, not different cars. Invest in public transport instead.",
    timestamp: now - 12 * HOUR,
    feed: "trending",
  },
  // Following posts
  {
    id: "p5",
    authorId: "u4",
    text: "Just finished reading 'Thinking, Fast and Slow.' Everyone should read it — changes how you see every debate.",
    timestamp: now - 1 * HOUR,
    feed: "following",
  },
  {
    id: "p6",
    authorId: "u5",
    text: "Hot take: coding bootcamps produce better junior devs than most CS degrees. Fight me.",
    timestamp: now - 3 * HOUR,
    feed: "following",
  },
  {
    id: "p7",
    authorId: "u8",
    text: "Pineapple on pizza is objectively good and the discourse against it is performative.",
    timestamp: now - 6 * HOUR,
    feed: "following",
  },
  {
    id: "p8",
    authorId: "u2",
    text: "Unpopular opinion: meetings are actually valuable when done right. The problem is most people don't know how to run one.",
    timestamp: now - 10 * HOUR,
    feed: "following",
  },
];

// --- Comments ---
// Trending posts get more comments (5-8) with higher vote counts
// Following posts get fewer comments (3-4) with lower vote counts
export const seedComments: Comment[] = [
  // Post p1 — UBI (trending, 6 comments)
  { id: "c1", postId: "p1", authorId: "u3", text: "Absolutely. The current system is a patchwork of band-aids. UBI simplifies everything.", type: "agree", upvotes: 47, downvotes: 8, timestamp: now - 1.5 * HOUR },
  { id: "c2", postId: "p1", authorId: "u5", text: "This ignores inflation entirely. If everyone gets free money, prices just go up.", type: "disagree", upvotes: 39, downvotes: 12, timestamp: now - 1.8 * HOUR },
  { id: "c3", postId: "p1", authorId: "u4", text: "Finland's pilot program showed promising mental health improvements.", type: "agree", upvotes: 31, downvotes: 5, timestamp: now - 1.9 * HOUR },
  { id: "c4", postId: "p1", authorId: "u7", text: "Who pays for it? The math doesn't add up at scale.", type: "disagree", upvotes: 28, downvotes: 15, timestamp: now - 1.7 * HOUR },
  { id: "c5", postId: "p1", authorId: "u8", text: "It could replace dozens of bureaucratic programs and save admin costs.", type: "agree", upvotes: 22, downvotes: 3, timestamp: now - 1.6 * HOUR },
  { id: "c6", postId: "p1", authorId: "u6", text: "Work gives people purpose. Remove the incentive and society crumbles.", type: "disagree", upvotes: 19, downvotes: 11, timestamp: now - 1.4 * HOUR },

  // Post p2 — Algorithmic feeds (trending, 7 comments)
  { id: "c7", postId: "p2", authorId: "u4", text: "Yes! I miss seeing posts in order. Algorithms just show me rage bait.", type: "agree", upvotes: 52, downvotes: 4, timestamp: now - 4 * HOUR },
  { id: "c8", postId: "p2", authorId: "u6", text: "Algorithms help surface relevant content. Without them you'd miss important posts from people you follow.", type: "disagree", upvotes: 35, downvotes: 18, timestamp: now - 4.5 * HOUR },
  { id: "c9", postId: "p2", authorId: "u7", text: "The EU is already pushing for this. About time.", type: "agree", upvotes: 29, downvotes: 6, timestamp: now - 4.2 * HOUR },
  { id: "c10", postId: "p2", authorId: "u2", text: "Chronological feeds were chaos. You'd scroll through 200 posts to find something good.", type: "disagree", upvotes: 24, downvotes: 10, timestamp: now - 4.8 * HOUR },
  { id: "c11", postId: "p2", authorId: "u5", text: "At minimum give users the choice. Let me opt out.", type: "agree", upvotes: 41, downvotes: 2, timestamp: now - 4.3 * HOUR },
  { id: "c12", postId: "p2", authorId: "u8", text: "Most people wouldn't switch back. The algorithm works for the majority.", type: "disagree", upvotes: 18, downvotes: 9, timestamp: now - 4.6 * HOUR },
  { id: "c13", postId: "p2", authorId: "u1", text: "Algorithms optimize for engagement, not well-being. That's the core problem.", type: "agree", upvotes: 44, downvotes: 7, timestamp: now - 4.1 * HOUR },

  // Post p3 — Remote work (trending, 5 comments)
  { id: "c14", postId: "p3", authorId: "u2", text: "Hard disagree. Async communication is MORE thoughtful because you have to write it out.", type: "disagree", upvotes: 38, downvotes: 14, timestamp: now - 7 * HOUR },
  { id: "c15", postId: "p3", authorId: "u5", text: "As an introvert, remote work gave me a voice. I never spoke up in meetings.", type: "disagree", upvotes: 33, downvotes: 8, timestamp: now - 7.5 * HOUR },
  { id: "c16", postId: "p3", authorId: "u7", text: "Hybrid is the answer. Pure remote kills team culture.", type: "agree", upvotes: 42, downvotes: 11, timestamp: now - 7.2 * HOUR },
  { id: "c17", postId: "p3", authorId: "u4", text: "Watercooler chats were mostly gossip. Let's not romanticize them.", type: "disagree", upvotes: 27, downvotes: 6, timestamp: now - 7.8 * HOUR },
  { id: "c18", postId: "p3", authorId: "u8", text: "I've seen junior devs struggle so much without in-person mentorship. Remote isn't for everyone.", type: "agree", upvotes: 36, downvotes: 9, timestamp: now - 7.3 * HOUR },

  // Post p4 — Electric cars (trending, 5 comments)
  { id: "c19", postId: "p4", authorId: "u3", text: "This is a false dichotomy. We can do both — better cars AND better transit.", type: "disagree", upvotes: 45, downvotes: 7, timestamp: now - 11 * HOUR },
  { id: "c20", postId: "p4", authorId: "u2", text: "Exactly. The car industry just rebranded the problem. Still sprawl, still parking lots, still traffic.", type: "agree", upvotes: 38, downvotes: 12, timestamp: now - 11.5 * HOUR },
  { id: "c21", postId: "p4", authorId: "u4", text: "In rural areas you NEED a car. Public transport can't serve everywhere.", type: "disagree", upvotes: 31, downvotes: 5, timestamp: now - 11.2 * HOUR },
  { id: "c22", postId: "p4", authorId: "u8", text: "Japan and Netherlands prove you can design cities without car dependency.", type: "agree", upvotes: 29, downvotes: 8, timestamp: now - 11.8 * HOUR },
  { id: "c23", postId: "p4", authorId: "u6", text: "EVs at least reduce emissions per trip. Don't let perfect be the enemy of good.", type: "disagree", upvotes: 26, downvotes: 10, timestamp: now - 11.3 * HOUR },

  // Post p5 — Thinking Fast and Slow (following, 3 comments)
  { id: "c24", postId: "p5", authorId: "u7", text: "Great book. The anchoring bias chapter blew my mind.", type: "agree", upvotes: 8, downvotes: 1, timestamp: now - 0.5 * HOUR },
  { id: "c25", postId: "p5", authorId: "u3", text: "Half the studies in that book failed to replicate though.", type: "disagree", upvotes: 6, downvotes: 3, timestamp: now - 0.8 * HOUR },
  { id: "c26", postId: "p5", authorId: "u6", text: "Even if some studies are shaky, the frameworks it gives you are useful.", type: "agree", upvotes: 5, downvotes: 1, timestamp: now - 0.3 * HOUR },

  // Post p6 — Bootcamps (following, 4 comments)
  { id: "c27", postId: "p6", authorId: "u1", text: "Bootcamp grads know how to ship. CS grads know how to theorize.", type: "agree", upvotes: 12, downvotes: 4, timestamp: now - 2.5 * HOUR },
  { id: "c28", postId: "p6", authorId: "u2", text: "Until you need someone who understands data structures, algorithms, or systems design.", type: "disagree", upvotes: 10, downvotes: 3, timestamp: now - 2.8 * HOUR },
  { id: "c29", postId: "p6", authorId: "u8", text: "Bootcamps teach you React. CS degrees teach you how to THINK. Different value.", type: "disagree", upvotes: 9, downvotes: 2, timestamp: now - 2.6 * HOUR },
  { id: "c30", postId: "p6", authorId: "u4", text: "Most real-world dev work doesn't need deep CS. Bootcamps are practical.", type: "agree", upvotes: 7, downvotes: 2, timestamp: now - 2.3 * HOUR },

  // Post p7 — Pineapple pizza (following, 4 comments)
  { id: "c31", postId: "p7", authorId: "u5", text: "Sweet + savory is a classic combo. It works on pizza too.", type: "agree", upvotes: 9, downvotes: 3, timestamp: now - 5.5 * HOUR },
  { id: "c32", postId: "p7", authorId: "u3", text: "The texture is wrong. Warm pineapple on cheese is an abomination.", type: "disagree", upvotes: 11, downvotes: 5, timestamp: now - 5.8 * HOUR },
  { id: "c33", postId: "p7", authorId: "u6", text: "Italian food purists are the worst. Let people eat what they like.", type: "agree", upvotes: 7, downvotes: 2, timestamp: now - 5.3 * HOUR },
  { id: "c34", postId: "p7", authorId: "u7", text: "I've tried it with an open mind three times. It's bad every time.", type: "disagree", upvotes: 8, downvotes: 4, timestamp: now - 5.6 * HOUR },

  // Post p8 — Meetings (following, 3 comments)
  { id: "c35", postId: "p8", authorId: "u1", text: "The issue is 90% of meetings have no agenda and no outcome. But when they do, they're great.", type: "agree", upvotes: 6, downvotes: 1, timestamp: now - 9 * HOUR },
  { id: "c36", postId: "p8", authorId: "u7", text: "This could have been an email. Always.", type: "disagree", upvotes: 8, downvotes: 2, timestamp: now - 9.5 * HOUR },
  { id: "c37", postId: "p8", authorId: "u4", text: "Standup meetings are proof that short, structured meetings work.", type: "agree", upvotes: 5, downvotes: 1, timestamp: now - 9.2 * HOUR },
];

// --- Debates ---
// Roughly 1 in 10 comments → ~4 debates across 37 comments
export const seedDebates: Debate[] = [
  {
    id: "d1",
    postId: "p1",
    agreeCommentId: "c1",
    disagreeCommentId: "c2",
    status: "ongoing",
  },
  {
    id: "d2",
    postId: "p2",
    agreeCommentId: "c7",
    disagreeCommentId: "c8",
    status: "scheduled",
    scheduledTime: now + 3 * HOUR,
  },
  {
    id: "d3",
    postId: "p3",
    agreeCommentId: "c16",
    disagreeCommentId: "c14",
    status: "ongoing",
  },
  {
    id: "d4",
    postId: "p4",
    agreeCommentId: "c20",
    disagreeCommentId: "c19",
    status: "scheduled",
    scheduledTime: now + DAY,
  },
];

// --- Notifications ---
export const seedNotifications: Notification[] = [
  {
    id: "n1",
    text: "Debate on @Anja's post in 3 hours",
  },
  {
    id: "n2",
    text: "@JanuschBro wants to debate you on @JohnWick's post",
    buttons: [{ label: "Find a time" }, { label: "See details" }],
  },
  {
    id: "n3",
    text: "Suggested debates",
    isSectionHeader: true,
  },
  {
    id: "n4",
    text: "@Andrea95 disagrees with you on @CarlDaman's post, debate?",
    buttons: [{ label: "See details" }, { label: "Invite for debate" }],
  },
];
