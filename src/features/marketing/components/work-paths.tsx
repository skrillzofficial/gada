import {
  Code2,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Languages,
  Mic,
  PenLine,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";

type WorkPath = {
  icon: LucideIcon;
  title: string;
  description: string;
  goodFit: string;
  level: "Beginner-friendly" | "Needs specialist skills";
};

const paths: WorkPath[] = [
  {
    icon: Star,
    title: "AI response rating",
    description: "Read answers written by AI and rate them for accuracy, helpfulness and safety.",
    goodFit: "Careful readers with good judgement",
    level: "Beginner-friendly",
  },
  {
    icon: PenLine,
    title: "Writing & rewriting",
    description: "Write ideal answers to prompts, or improve AI responses so they're clearer and correct.",
    goodFit: "Clear, confident writers",
    level: "Beginner-friendly",
  },
  {
    icon: FileText,
    title: "Text annotation",
    description: "Label text by topic, sentiment or meaning so AI systems learn to understand language.",
    goodFit: "Detail-oriented people who enjoy consistency",
    level: "Beginner-friendly",
  },
  {
    icon: ImageIcon,
    title: "Image & video labelling",
    description: "Tag objects, draw boxes around them and describe scenes in images and video.",
    goodFit: "Patient people with a sharp eye",
    level: "Beginner-friendly",
  },
  {
    icon: Mic,
    title: "Transcription",
    description: "Turn recorded speech into accurate text, often including Nigerian accents and languages.",
    goodFit: "Good listeners and fast, accurate typists",
    level: "Beginner-friendly",
  },
  {
    icon: Languages,
    title: "Translation & localisation",
    description: "Translate and adapt content in languages like Yoruba, Igbo, Hausa and Nigerian Pidgin.",
    goodFit: "Fluent speakers of more than one language",
    level: "Needs specialist skills",
  },
  {
    icon: GraduationCap,
    title: "Subject-expert review",
    description: "Check AI answers in fields like maths, science, law, medicine or finance.",
    goodFit: "Graduates and professionals in a specific field",
    level: "Needs specialist skills",
  },
  {
    icon: Code2,
    title: "Coding evaluation",
    description: "Review, test and fix code written by AI across popular programming languages.",
    goodFit: "Developers and computer science students",
    level: "Needs specialist skills",
  },
];

export function WorkPaths() {
  return (
    <section id="paths" className="scroll-mt-20 overflow-hidden bg-gada py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-bridge">Paths you can grow into</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Find the work that fits you</h2>
          <p className="mt-4 text-lg text-gada-200">
            AI-training work comes in many forms. Your profile helps our team see where you&rsquo;ll
            shine, and which platforms to recommend.
          </p>
        </div>

        <div className="mt-12">
          <Carousel label="Kinds of AI-training work" tone="dark">
            {paths.map(({ icon: Icon, title, description, goodFit, level }) => (
              <article key={title} className="flex h-full flex-col rounded-3xl bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gada-50 text-gada">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      level === "Beginner-friendly" ? "bg-bridge-100 text-gada" : "bg-gada-50 text-gada"
                    }`}
                  >
                    {level}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm text-gada">
                  <span className="font-semibold">Good fit:</span> {goodFit}
                </p>
              </article>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
