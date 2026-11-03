import type { ProfileDraft } from "@/features/profiles/schema";
import { sampleProfile } from "@/features/dashboard/mock-data";

/* Sample data for the admin area until the backend is connected */

export type TaskerStatus =
  "pending_review" | "changes_requested" | "verified" | "rejected";
export const TASKER_LEVELS = ["Beginner", "Ready", "Experienced"] as const;
export type TaskerLevel = (typeof TASKER_LEVELS)[number];

export type AdminTasker = {
  id: string;
  profile: ProfileDraft;
  email: string;
  status: TaskerStatus;
  level?: TaskerLevel;
  submittedOn: string;
};

function tasker(
  id: string,
  fullName: string,
  extra: Partial<ProfileDraft>,
  meta: Omit<AdminTasker, "id" | "profile">,
): AdminTasker {
  return { id, profile: { ...sampleProfile, fullName, ...extra }, ...meta };
}

export const adminTaskers: AdminTasker[] = [
  tasker(
    "t1",
    "Maris Okafor",
    {},
    {
      email: "maris@example.com",
      status: "pending_review",
      submittedOn: "3 Nov 2026",
    },
  ),
  tasker(
    "t2",
    "Ibrahim Sule",
    {
      headline: "Hausa translator and transcriber",
      city: "Kano",
      workTypes: ["Transcription", "Translation & localisation"],
      languages: ["English", "Hausa", "Arabic"],
      subjects: [],
      experience: "Experienced",
      bio: "Professional Hausa–English translator with four years of transcription work for media and research projects.",
      projects: [
        {
          id: "p-t2",
          title: "Hausa radio transcription",
          workType: "Transcription",
          organisation: "Community radio archive",
          description:
            "Transcribed and translated over 200 hours of Hausa radio interviews into English.",
          startMonth: "2022-03",
          endMonth: "",
          link: "",
        },
      ],
    },
    {
      email: "ibrahim@example.com",
      status: "pending_review",
      submittedOn: "2 Nov 2026",
    },
  ),
  tasker(
    "t3",
    "Chiamaka Nwosu",
    {
      headline: "English graduate, new to AI training",
      city: "Enugu",
      workTypes: ["Writing & rewriting"],
      languages: ["English", "Igbo"],
      subjects: ["Literature & languages"],
      experience: "Beginner",
      projects: [],
      noProjects: true,
      bio: "I studied English at UNN and I'm strong with grammar and clear writing. I'm looking for my first AI-training role.",
    },
    {
      email: "chiamaka@example.com",
      status: "pending_review",
      submittedOn: "2 Nov 2026",
    },
  ),
  tasker(
    "t4",
    "Tunde Adeyemi",
    {
      headline: "Data annotator and Python learner",
      city: "Ibadan",
      workTypes: ["Text annotation", "Coding evaluation"],
      subjects: ["Computer science"],
      experience: "Some experience",
      projects: [
        {
          id: "p-t4",
          title: "Labelling customer support messages",
          workType: "Text annotation",
          organisation: "Remote data company",
          description:
            "Tagged customer messages by intent and sentiment for a support chatbot.",
          startMonth: "2025-11",
          endMonth: "",
          link: "",
        },
      ],
    },
    {
      email: "tunde@example.com",
      status: "verified",
      level: "Ready",
      submittedOn: "28 Oct 2026",
    },
  ),
  tasker(
    "t5",
    "Grace Eze",
    {
      headline: "Pharmacist and medical reviewer",
      city: "Port Harcourt",
      workTypes: ["Subject-expert review", "AI response rating"],
      subjects: ["Medicine & health"],
      experience: "Experienced",
      projects: [
        {
          id: "p-t5",
          title: "Reviewing AI answers to medicine questions",
          workType: "Subject-expert review",
          organisation: "AI research project",
          description:
            "Checked AI answers about medicines and dosages for accuracy and safety.",
          startMonth: "2025-06",
          endMonth: "",
          link: "",
        },
      ],
    },
    {
      email: "grace@example.com",
      status: "verified",
      level: "Experienced",
      submittedOn: "21 Oct 2026",
    },
  ),
  tasker(
    "t6",
    "Musa Ibrahim",
    {
      headline: "Image labelling and transcription",
      city: "Abuja",
      workTypes: ["Image & video labelling"],
      experience: "Some experience",
      projects: [
        {
          id: "p-t6",
          title: "Labelling traffic images",
          workType: "Image & video labelling",
          organisation: "Mapping startup",
          description:
            "Drew boxes around vehicles and road signs in Abuja street images.",
          startMonth: "2026-01",
          endMonth: "",
          link: "",
        },
      ],
    },
    {
      email: "musa@example.com",
      status: "changes_requested",
      submittedOn: "30 Oct 2026",
    },
  ),
];

export type AdminPlatform = {
  id: string;
  name: string;
  summary: string;
  workTypes: string[];
  countries: string;
  referralUrl: string;
  tip: string;
  active: boolean;
};

export const adminPlatforms: AdminPlatform[] = [
  {
    id: "pl1",
    name: "Sample Platform A",
    summary: "Rate and improve AI answers in English and African languages.",
    workTypes: ["AI response rating", "Writing & rewriting"],
    countries: "Nigeria, Ghana, Kenya",
    referralUrl: "https://example.com/referral-a",
    tip: "Read the guidelines twice before the assessment. Accuracy matters more than speed.",
    active: true,
  },
  {
    id: "pl2",
    name: "Sample Platform B",
    summary: "Expert review projects for science graduates.",
    workTypes: ["Subject-expert review"],
    countries: "Nigeria, South Africa",
    referralUrl: "https://example.com/referral-b",
    tip: "Have your degree certificate ready to upload.",
    active: true,
  },
  {
    id: "pl3",
    name: "Sample Platform C",
    summary: "Text labelling and data annotation, flexible hours.",
    workTypes: ["Text annotation"],
    countries: "Worldwide",
    referralUrl: "https://example.com/referral-c",
    tip: "Start with the practice tasks; they count towards your quality score.",
    active: false,
  },
];

export type ModerationPost = {
  id: string;
  author: string;
  title: string;
  category: string;
  postedOn: string;
  reports: number;
  reportReason?: string;
  pinned: boolean;
  hidden: boolean;
};

export const moderationPosts: ModerationPost[] = [
  {
    id: "m0",
    author: "Gada team",
    title: "Welcome to the community! Read this first",
    category: "Getting started",
    postedOn: "1 Oct 2026",
    reports: 0,
    pinned: true,
    hidden: false,
  },
  {
    id: "m1",
    author: "Unknown user",
    title: "Selling verified accounts, DM me",
    category: "Questions",
    postedOn: "3 Nov 2026",
    reports: 7,
    reportReason: "Selling accounts",
    pinned: false,
    hidden: false,
  },
  {
    id: "m2",
    author: "Tunde A.",
    title: "Passed my first assessment after two tries!",
    category: "Wins",
    postedOn: "3 Nov 2026",
    reports: 0,
    pinned: false,
    hidden: false,
  },
  {
    id: "m3",
    author: "Ada K.",
    title: "Pay ₦5,000 and I'll pass your assessment for you",
    category: "Platform tips",
    postedOn: "2 Nov 2026",
    reports: 4,
    reportReason: "Asking for money",
    pinned: false,
    hidden: false,
  },
  {
    id: "m4",
    author: "Grace E.",
    title: "How I keep my quality score above 90%",
    category: "Platform tips",
    postedOn: "2 Nov 2026",
    reports: 0,
    pinned: false,
    hidden: false,
  },
];

export function findTasker(id: string) {
  return adminTaskers.find((t) => t.id === id);
}
