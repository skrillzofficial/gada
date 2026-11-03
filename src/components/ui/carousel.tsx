"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  label: string;
  children: ReactNode;
  /** "light" for white sections, "dark" for blue sections */
  tone?: "light" | "dark";
};

export function Carousel({ label, children, tone = "light" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // ResizeObserver fires once straight away, which sets the initial button state
    const observer = new ResizeObserver(updateButtons);
    observer.observe(el);
    el.addEventListener("scroll", updateButtons, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", updateButtons);
    };
  }, [updateButtons]);

  function scroll(direction: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: reduceMotion ? "auto" : "smooth" });
  }

  const buttonClass =
    tone === "dark"
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-line bg-white text-gada hover:bg-surface";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:scroll-px-0 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-bridge sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {Children.toArray(children).map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            className="shrink-0 basis-[85%] snap-start sm:basis-[46%] lg:basis-[31.5%]"
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={!canPrev}
          aria-label="Previous slides"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${buttonClass}`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={!canNext}
          aria-label="Next slides"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${buttonClass}`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
