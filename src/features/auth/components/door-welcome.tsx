"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import door from "@/assets/images/welcome-door.webp";

type Phase = "closed" | "opening" | "entering" | "welcome";

/*
  Position of the doorway inside welcome-door.webp (564 x 1002), in percent.
  The moving door is an exact copy of that part of the photo, rotated on its hinge.
*/
const DOORWAY = { left: 29.96, top: 23.85, width: 38.3, height: 58.28 };
const PANEL = { width: 37.06 }; // the door itself, without the light strip on its right
const PANEL_BG = { size: "269.86% 171.58%", position: "47.61% 57.18%" };

export function DoorWelcome({ name }: { name?: string }) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = reduceMotion
      ? [setTimeout(() => setPhase("welcome"), 0)]
      : [
          setTimeout(() => setPhase("opening"), 500),
          setTimeout(() => setPhase("entering"), 2000),
          setTimeout(() => setPhase("welcome"), 3200),
        ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isOpen = phase !== "closed";
  const isEntering = phase === "entering" || phase === "welcome";
  const isWelcome = phase === "welcome";

  return (
    <main className="relative h-svh overflow-hidden bg-[#050a1d]">
      {/* The scene: always the full screen height, centred, keeping the photo's shape */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-full aspect-[564/1002] -translate-x-1/2"
      >
        <div
          className="relative h-full w-full transition-transform duration-[1400ms] ease-in"
          style={{
            transform: isEntering ? "scale(4.5)" : "scale(1)",
            transformOrigin: `${DOORWAY.left + DOORWAY.width / 2}% ${DOORWAY.top + DOORWAY.height / 2}%`,
          }}
        >
          <Image src={door} alt="" fill priority placeholder="blur" sizes="60vh" className="object-cover" />

          {/* Doorway: warm light behind the door */}
          <div
            className="absolute [perspective:1600px]"
            style={{
              left: `${DOORWAY.left}%`,
              top: `${DOORWAY.top}%`,
              width: `${DOORWAY.width}%`,
              height: `${DOORWAY.height}%`,
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b from-[#ffe9a8] via-[#ffd66b] to-[#f5c518] transition-[opacity,box-shadow] duration-1000 ${
                isOpen ? "opacity-100 shadow-[0_0_140px_50px_rgba(255,206,92,0.55)]" : "opacity-0"
              }`}
            />

            {/* The door panel, swinging inwards on its left hinge */}
            <div
              className="absolute inset-y-0 left-0 origin-left transition-transform duration-[1500ms] ease-[cubic-bezier(0.55,0.05,0.25,1)]"
              style={{
                width: `${(PANEL.width / DOORWAY.width) * 100}%`,
                backgroundImage: `url(${door.src})`,
                backgroundSize: PANEL_BG.size,
                backgroundPosition: PANEL_BG.position,
                transform: isOpen ? "rotateY(82deg)" : "rotateY(0deg)",
              }}
            >
              {/* gets darker as it turns away from the light */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-[1500ms] ${
                  isOpen ? "opacity-50" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* soften the photo's edges into the background on wide screens (moves with the zoom) */}
          <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#050a1d] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#050a1d] to-transparent" />
        </div>

      </div>

      {/* Light floods the screen as we step through */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[#fff8e6] transition-opacity duration-700 ${
          isEntering ? "opacity-100 delay-700" : "opacity-0"
        }`}
      />

      {/* Welcome message */}
      <section
        aria-live="polite"
        className={`absolute inset-0 flex items-center justify-center px-6 text-center transition-all duration-700 ${
          isWelcome ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {isWelcome && (
          <div className="max-w-lg">
            <Image
              src="/brand/gada-logo-primary.svg"
              alt="Gada"
              width={140}
              height={37}
              unoptimized
              className="mx-auto h-10 w-auto"
            />
            <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
              Welcome to Gada{name ? `, ${name}` : ""}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              You&rsquo;ve stepped through. Let&rsquo;s set up your profile so our team can get to
              know you and help you take your next step.
            </p>
            <ButtonLink href="/onboarding" size="lg" className="mt-8">
              Set up my profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        )}
      </section>

      {/* Always let people skip the animation */}
      {!isWelcome && (
        <button
          type="button"
          onClick={() => setPhase("welcome")}
          className="absolute bottom-6 right-6 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          Skip
        </button>
      )}
    </main>
  );
}
