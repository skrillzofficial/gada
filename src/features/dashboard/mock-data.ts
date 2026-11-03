import type { ProfileDraft } from "@/features/profiles/schema";

/* Sample data until the backend is connected */

export type ReviewStatus = "pending_review" | "verified";

export const APPLICATION_STAGES = ["Not started", "Applied", "Assessment", "Accepted", "Earning"] as const;
export type ApplicationStage = (typeof APPLICATION_STAGES)[number];

export type Recommendation = {
  id: string;
  platform: string;
  summary: string;
  workTypes: string[];
  acceptsCountry: boolean;
  whyYou: string;
  tip: string;
  referralUrl: string;
  stage: ApplicationStage;
};

export const POST_CATEGORIES = ["Getting started", "Questions", "Platform tips", "Wins"] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];

export type CommunityPost = {
  id: string;
  author: string;
  initials: string;
  category: PostCategory;
  title: string;
  body?: string;
  replies: number;
  likes?: number;
  timeAgo: string;
  pinned?: boolean;
  fromTeam?: boolean;
};

export const sampleProfile: ProfileDraft = {
  photoUrl: null,
  fullName: "Maris Okafor",
  headline: "Biology graduate and AI response rater",
  city: "Lagos",
  country: "Nigeria",
  bio: "I'm a biology graduate from Ibadan. I've rated AI responses for six months and I enjoy careful, detailed work.",
  workTypes: ["AI response rating", "Text annotation"],
  subjects: ["Biology"],
  languages: ["English", "Yoruba"],
  hoursPerWeek: "20–30",
  experience: "Some experience",
  projects: [
    {
      id: "p1",
      title: "Rating chatbot answers in Yoruba",
      workType: "AI response rating",
      organisation: "Remote AI platform",
      description: "Rated and corrected AI answers in Yoruba against detailed quality guidelines.",
      startMonth: "2025-08",
      endMonth: "",
      link: "",
    },
  ],
  noProjects: false,
  consent: true,
};

export const sampleRecommendations: Recommendation[] = [
  {
    id: "r1",
    platform: "Sample Platform A",
    summary: "Rate and improve AI answers in English and African languages.",
    workTypes: ["AI response rating", "Writing & rewriting"],
    acceptsCountry: true,
    whyYou: "Your Yoruba and AI rating experience are a strong match.",
    tip: "Read the guidelines twice before the assessment. Accuracy matters more than speed.",
    referralUrl: "https://example.com/referral-a",
    stage: "Not started",
  },
  {
    id: "r2",
    platform: "Sample Platform B",
    summary: "Expert review projects for science graduates.",
    workTypes: ["Subject-expert review"],
    acceptsCountry: true,
    whyYou: "Biology graduates are in demand for science review projects.",
    tip: "Have your degree certificate ready to upload.",
    referralUrl: "https://example.com/referral-b",
    stage: "Applied",
  },
  {
    id: "r3",
    platform: "Sample Platform C",
    summary: "Text labelling and data annotation, flexible hours.",
    workTypes: ["Text annotation"],
    acceptsCountry: true,
    whyYou: "A good place to build steady experience alongside rating work.",
    tip: "Start with the practice tasks; they count towards your quality score.",
    referralUrl: "https://example.com/referral-c",
    stage: "Not started",
  },
];

export const samplePosts: CommunityPost[] = [
  { id: "c1", author: "Tunde A.", initials: "TA", category: "Wins", title: "Passed my first assessment after two tries!", replies: 24, timeAgo: "2h" },
  { id: "c2", author: "Grace E.", initials: "GE", category: "Platform tips", title: "How I keep my quality score above 90%", replies: 41, timeAgo: "5h" },
  { id: "c3", author: "Musa I.", initials: "MI", category: "Questions", title: "Which payment method works best from Nigeria?", replies: 17, timeAgo: "1d" },
];

export const sampleFeed: CommunityPost[] = [
  {
    id: "f0",
    author: "Gada team",
    initials: "G",
    category: "Getting started",
    title: "Welcome to the community! Read this first",
    body: "Introduce yourself, read the guidelines on the right, and remember: always sign up to platforms under your own name. Never pay anyone for an account or a task.",
    replies: 86,
    likes: 214,
    timeAgo: "Pinned",
    pinned: true,
    fromTeam: true,
  },
  {
    id: "f1",
    author: "Tunde A.",
    initials: "TA",
    category: "Wins",
    title: "Passed my first assessment after two tries!",
    body: "What changed the second time: I read every example in the guidelines and slowed down. Don't give up if the first attempt doesn't go well.",
    replies: 24,
    likes: 92,
    timeAgo: "2h",
  },
  {
    id: "f2",
    author: "Grace E.",
    initials: "GE",
    category: "Platform tips",
    title: "How I keep my quality score above 90%",
    body: "Three habits: I re-read the task instructions every session, I keep my own notes of common mistakes, and I never rush the last few tasks of the day.",
    replies: 41,
    likes: 133,
    timeAgo: "5h",
  },
  {
    id: "f3",
    author: "Musa I.",
    initials: "MI",
    category: "Questions",
    title: "Which payment method works best from Nigeria?",
    body: "I've just been accepted and need to set up payouts. What are people using, and how long do transfers take?",
    replies: 17,
    likes: 21,
    timeAgo: "1d",
  },
  {
    id: "f4",
    author: "Chiamaka N.",
    initials: "CN",
    category: "Getting started",
    title: "Complete beginner here. Where should I start?",
    body: "I studied English and I'm good with grammar. Which kind of work suits me best as a first step?",
    replies: 33,
    likes: 40,
    timeAgo: "2d",
  },
];
