export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface FrictionPost {
  id: string;
  authorId: string;
  text: string;
  timestamp: number;
  feed: "trending" | "following";
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  type: "agree" | "disagree";
  upvotes: number;
  downvotes: number;
  timestamp: number;
}

export interface Debate {
  id: string;
  postId: string;
  agreeCommentId: string;
  disagreeCommentId: string;
  status: "ongoing" | "scheduled";
  scheduledTime?: number;
}

export interface Notification {
  id: string;
  text: string;
  buttons?: { label: string }[];
  isSectionHeader?: boolean;
}
