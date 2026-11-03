import { z } from "zod";

/* ---------- Options shown in the form ---------- */

export const WORK_TYPES = [
  "AI response rating",
  "Writing & rewriting",
  "Text annotation",
  "Image & video labelling",
  "Transcription",
  "Translation & localisation",
  "Subject-expert review",
  "Coding evaluation",
  "Other",
] as const;

export const SUBJECTS = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Medicine & health",
  "Agriculture",
  "Law",
  "Finance & accounting",
  "Computer science",
  "Education",
  "Literature & languages",
  "Other",
] as const;

export const LANGUAGES = [
  "English",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Nigerian Pidgin",
  "French",
  "Arabic",
  "Swahili",
] as const;

export const HOURS_PER_WEEK = ["Less than 10", "10–20", "20–30", "30–40", "More than 40"] as const;

export const EXPERIENCE_LEVELS = ["Beginner", "Some experience", "Experienced"] as const;

/* ---------- Validation, one schema per step ---------- */

export const aboutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  headline: z
    .string()
    .trim()
    .min(5, "Add a short headline, e.g. “Biology graduate and AI response rater”")
    .max(80, "Keep your headline under 80 characters"),
  city: z.string().trim().min(2, "Enter your city"),
  country: z.string().trim().min(2, "Enter your country"),
  bio: z
    .string()
    .trim()
    .min(40, "Tell us a little more about yourself (at least 40 characters)")
    .max(500, "Keep your bio under 500 characters"),
});

export const skillsSchema = z.object({
  workTypes: z.array(z.enum(WORK_TYPES)).min(1, "Choose at least one kind of work"),
  subjects: z.array(z.enum(SUBJECTS)),
  languages: z.array(z.enum(LANGUAGES)).min(1, "Choose at least one language"),
  hoursPerWeek: z.enum(HOURS_PER_WEEK, { error: "Choose how many hours you can work" }),
  experience: z.enum(EXPERIENCE_LEVELS, { error: "Choose your experience level" }),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(3, "Give the project a title"),
  workType: z.enum(WORK_TYPES, { error: "Choose the kind of work" }),
  organisation: z.string().trim().max(80, "Keep this under 80 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Describe what you did (at least 20 characters)")
    .max(400, "Keep this under 400 characters"),
  startMonth: z.string().regex(/^\d{4}-\d{2}$/, "Choose a start month"),
  endMonth: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}$/)]), // "" means ongoing
  link: z.union([z.literal(""), z.url("Enter a full link starting with https://")]),
});

export const projectsStepSchema = z
  .object({
    projects: z.array(projectSchema),
    noProjects: z.boolean(),
  })
  .refine((v) => v.projects.length > 0 || v.noProjects, {
    message: "Add at least one project, or tick “I haven’t worked on any projects yet”.",
    path: ["projects"],
  });

export const reviewSchema = z.object({
  consent: z.literal(true, { error: "Please confirm before submitting" }),
});

/* ---------- Types ---------- */

export type Project = z.infer<typeof projectSchema>;

/** What the form holds while someone is filling it in (values may still be empty) */
export type ProfileDraft = {
  photoUrl: string | null;
  fullName: string;
  headline: string;
  city: string;
  country: string;
  bio: string;
  workTypes: string[];
  subjects: string[];
  languages: string[];
  hoursPerWeek: string;
  experience: string;
  projects: Project[];
  noProjects: boolean;
  consent: boolean;
};

export type ProjectDraft = Omit<Project, "workType"> & { workType: string };

export const emptyDraft: ProfileDraft = {
  photoUrl: null,
  fullName: "",
  headline: "",
  city: "",
  country: "Nigeria",
  bio: "",
  workTypes: [],
  subjects: [],
  languages: ["English"],
  hoursPerWeek: "",
  experience: "",
  projects: [],
  noProjects: false,
  consent: false,
};

export type FieldErrors = Record<string, string>;

/** Turn Zod issues into { fieldName: "first error message" } */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
