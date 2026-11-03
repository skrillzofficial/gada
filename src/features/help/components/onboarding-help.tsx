"use client";

import { useRef } from "react";
import { CircleHelp, Mail, X } from "lucide-react";
import { HelpList } from "./help-list";
import { SUPPORT_EMAIL, profileSetupHelp } from "../help-content";

/** "Need help?" opens a panel over the form, so nothing the tasker typed is lost */
export function OnboardingHelp() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-gada"
      >
        <CircleHelp className="h-4 w-4" aria-hidden="true" />
        Need help?
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="onboarding-help-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close(); // click on the dim backdrop closes it
        }}
        className="m-0 ml-auto h-full max-h-none w-full max-w-md bg-surface p-0 backdrop:bg-gada-900/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line bg-white px-6 py-4">
            <h2 id="onboarding-help-title" className="text-xl font-semibold">
              Help with your profile
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close help"
              className="rounded-lg p-2 text-muted hover:bg-surface hover:text-gada"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            <p className="text-sm text-muted">Your answers are kept while you read this. Close the panel to carry on.</p>
            <HelpList items={profileSetupHelp} />
            <div className="rounded-2xl bg-gada p-5 text-white">
              <p className="font-semibold">Still stuck?</p>
              <p className="mt-1 text-sm text-gada-200">Our team usually replies within a day.</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-bridge px-4 py-2.5 text-sm font-semibold text-gada"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Email the Gada team
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
