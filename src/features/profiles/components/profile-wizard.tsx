"use client";

import { useState } from "react";
import type { ZodType } from "zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  aboutSchema,
  emptyDraft,
  projectsStepSchema,
  reviewSchema,
  skillsSchema,
  toFieldErrors,
  type FieldErrors,
  type ProfileDraft,
} from "../schema";
import { StepAbout } from "./step-about";
import { StepSkills } from "./step-skills";
import { StepProjects } from "./step-projects";
import { StepReview } from "./step-review";
import { OnboardingArt, type ArtScene } from "./onboarding-art";
import { art as artStyles } from "./onboarding-art-styles";

type Step = {
  title: string;
  intro: string;
  schema: ZodType;
  art: { scene: ArtScene; heading: string; text: string };
};

const STEPS: Step[] = [
  {
    title: "About you",
    intro:
      "Let's start with the basics. This is what our team and, later, the community will see.",
    schema: aboutSchema,
    art: {
      scene: "about",
      heading: "Let's get to know you",
      text: "A clear, honest profile helps our team match you to the right platforms.",
    },
  },
  {
    title: "Your skills",
    intro: "Tell us what you can do. This shapes the platforms we recommend.",
    schema: skillsSchema,
    art: {
      scene: "skills",
      heading: "Every skill opens a door",
      text: "Languages, subjects and the work you enjoy all count.",
    },
  },
  {
    title: "Past projects",
    intro: "Show the work you've done before.",
    schema: projectsStepSchema,
    art: {
      scene: "projects",
      heading: "Show what you've done",
      text: "Real examples, even small ones, help our team see your strengths.",
    },
  },
  {
    title: "Review & submit",
    intro:
      "Check everything looks right, then send your profile for assessment.",
    schema: reviewSchema,
    art: {
      scene: "review",
      heading: "Almost there",
      text: "One last look, then your profile goes to the Gada team.",
    },
  },
];

function ArtPanel({
  scene,
  heading,
  text,
}: {
  scene: ArtScene;
  heading: string;
  text: string;
}) {
  return (
    <aside className="sticky top-8 hidden overflow-hidden rounded-3xl bg-gada p-8 lg:block">
      <OnboardingArt scene={scene} className="mx-auto w-full max-w-sm" />
      <div key={scene} className={`mt-4 text-center ${artStyles.enter}`}>
        <p className="font-display text-2xl font-bold text-white">{heading}</p>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gada-200">
          {text}
        </p>
      </div>
    </aside>
  );
}

function ArtBanner({ scene }: { scene: ArtScene }) {
  return (
    <div className="-mx-6 -mt-6 mb-6 flex h-44 items-center justify-center overflow-hidden rounded-t-3xl bg-gada sm:-mx-8 sm:-mt-8 lg:hidden">
      <OnboardingArt scene={scene} className="h-52 w-52" />
    </div>
  );
}

export function ProfileWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"editing" | "submitting" | "submitted">(
    "editing",
  );

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  function update(patch: Partial<ProfileDraft>) {
    setDraft((d) => ({ ...d, ...patch }));
    // clear errors for the fields that just changed
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch)) delete next[key];
      return next;
    });
  }

  function goTo(target: number) {
    setErrors({});
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleNext() {
    const result = current.schema.safeParse(draft);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    if (!isLast) return goTo(step + 1);

    setStatus("submitting");
    // TODO (backend step): save the profile with status "pending_review"
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("submitted");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (status === "submitted") {
    const firstName = draft.fullName.trim().split(" ")[0];
    return (
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-line bg-white text-center">
        <div className="flex h-64 items-center justify-center bg-gada sm:h-80">
          <OnboardingArt scene="success" className="h-full" />
        </div>
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-bold">
            Thanks, {firstName}! Your profile is in.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
            Our team will review it, usually within 3 working days. We&rsquo;ll
            email you when you&rsquo;re verified, and the community will unlock
            for you.
          </p>
          <ButtonLink href="/dashboard" size="lg" className="mt-8">
            Go to my dashboard
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
      <ArtPanel {...current.art} />

      <div>
        {/* Progress */}
        <ol
          className="grid grid-cols-4 gap-2"
          aria-label="Profile setup progress"
        >
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <div
                className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-gada" : "bg-line"}`}
              />
              <p
                className={`mt-2 hidden text-xs font-semibold sm:block ${i === step ? "text-gada" : "text-muted"}`}
                aria-current={i === step ? "step" : undefined}
              >
                {i < step && (
                  <Check className="mr-1 inline h-3 w-3" aria-hidden="true" />
                )}
                {s.title}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-8">
          <ArtBanner scene={current.art.scene} />
          <p className="text-sm font-semibold text-bridge-600">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{current.title}</h1>
          <p className="mt-2 text-muted">{current.intro}</p>

          <div className="mt-8">
            {step === 0 && (
              <StepAbout draft={draft} update={update} errors={errors} />
            )}
            {step === 1 && (
              <StepSkills draft={draft} update={update} errors={errors} />
            )}
            {step === 2 && (
              <StepProjects draft={draft} update={update} errors={errors} />
            )}
            {step === 3 && (
              <StepReview
                draft={draft}
                update={update}
                errors={errors}
                goTo={goTo}
              />
            )}
          </div>

          {Object.keys(errors).length > 0 && (
            <p
              role="alert"
              className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              Please fix the highlighted fields to continue.
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className={step === 0 ? "invisible" : ""}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />{" "}
                  Submitting…
                </>
              ) : isLast ? (
                "Submit for assessment"
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
