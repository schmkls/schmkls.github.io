export type EventType =
  | "mail"
  | "platform-created"
  | "trial-started"
  | "became-customer"
  | "first-login"
  | "usage-stats"
  | "support-mail"
  | "interview"
  | "meeting-notes";

export interface Company {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  name: string;
  companyId: string;
}

export interface MailMessage {
  sender: string;
  subject: string;
  body: string;
}

export interface TranscriptExchange {
  question: string;
  answer: string;
}

export interface TimelineEvent {
  id: string;
  type: EventType;
  date: string;
  title: string;
  summary?: string;
  detail?: string;
  mailThread?: MailMessage[];
  transcript?: TranscriptExchange[];
  links?: { label: string; url: string }[];
}
