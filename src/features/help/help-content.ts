export type HelpItem = { q: string; a: string };

// TODO: replace with Gada's real support address once the domain is set up
export const SUPPORT_EMAIL = "support@gada.example";

export const profileSetupHelp: HelpItem[] = [
  {
    q: "Why do you need my real name?",
    a: "AI-training platforms check your identity when you sign up, so the name on your Gada profile should match your ID. It also helps our team verify you.",
  },
  {
    q: "What should I write in my bio?",
    a: "Keep it simple: your background (studies or work), what you're good at, any AI-training experience, and what kind of work you're looking for.",
  },
  {
    q: "I haven't done any projects yet. Is that a problem?",
    a: "Not at all. Tick “I haven't worked on any projects yet” and continue. Many taskers start as beginners, and we'll suggest good first steps.",
  },
  {
    q: "Is my information safe?",
    a: "Only the Gada team sees your full profile while it's under review. We never sell your data, and we'll never ask for passwords or bank details.",
  },
  {
    q: "How long does the review take?",
    a: "Usually up to 3 working days. You'll get an email as soon as you're verified.",
  },
];

export const memberHelp: HelpItem[] = [
  {
    q: "When will I be verified?",
    a: "Most profiles are reviewed within 3 working days. Improving your profile strength can help our team assess you faster.",
  },
  {
    q: "How are platforms recommended to me?",
    a: "Our team looks at your skills, subjects, languages and country, then recommends platforms where you have a good chance of being accepted.",
  },
  {
    q: "Does Gada guarantee I'll be accepted or earn money?",
    a: "No. Each platform makes its own decisions and work can vary week to week. We help you choose well and prepare, but we can't promise results.",
  },
  {
    q: "Why do some Apply buttons use referral links?",
    a: "Some platforms give Gada a referral bonus when someone we recommend signs up. It costs you nothing and never reduces your pay.",
  },
  {
    q: "Can I use someone else's account, or let someone use mine?",
    a: "No. Always sign up and work under your own name. Platforms ban shared accounts, and you could lose your earnings.",
  },
  ...profileSetupHelp.slice(0, 1),
];
