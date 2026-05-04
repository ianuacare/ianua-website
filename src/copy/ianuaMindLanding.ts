import type { Segment } from "./home";

export const ianuaMindNavItems = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#feature-mind", label: "Feature" },
  { href: "#contatti", label: "Contatti" },
] as const;

export const ianuaMindHero = {
  eyebrow: "Ianua Mind",
  title: [
    [{ text: "Insight clinici strutturati,", bold: true }],
    [{ text: "senza perdere la relazione terapeutica." }],
  ] as Segment[][],
  body: [
    { text: "Registra le sedute in modo sicuro, ottieni " },
    { text: "sintesi e segnali utili", bold: true },
    { text: ", segui l'evoluzione del percorso nel tempo e resta concentrato sul lavoro clinico." },
  ] as Segment[],
  primaryCta: { label: "Richiedi demo", href: "#contatti" },
  secondaryCta: { label: "Vedi come funziona", href: "#come-funziona" },
};

export const mindPainPoints = {
  eyebrow: "Problemi che risolve",
  title: [
    [{ text: "Meno dispersione.", bold: true }],
    [{ text: "Più continuità clinica." }],
  ] as Segment[][],
  items: [
    {
      title: "Note frammentate",
      body: "Trasforma osservazioni sparse in sintesi leggibili e coerenti tra una seduta e l'altra.",
    },
    {
      title: "Segnali deboli nel tempo",
      body: "Evidenzia marcatori emotivi e ricorrenze che rischiano di perdersi nella memoria operativa.",
    },
    {
      title: "Difficoltà nel monitoraggio",
      body: "Costruisce una vista evolutiva del percorso terapeutico utile in supervisione e follow-up.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "Come funziona",
  title: [
    [{ text: "Tre step." }],
    [{ text: "Un workflow clinico naturale.", bold: true }],
  ] as Segment[][],
  steps: [
    {
      title: "Registra",
      body: "Acquisisci la seduta in ambiente sicuro con accesso riservato al professionista.",
    },
    {
      title: "Analizza",
      body: "Ottieni riassunti automatici, marcatori emotivi e temi ricorrenti strutturati.",
    },
    {
      title: "Monitora",
      body: "Consulta la progressione nel tempo e prepara il prossimo incontro con più contesto.",
    },
  ],
};

export const mindFeatureStack = {
  eyebrow: "Feature stack Ianua Mind",
  title: [
    [{ text: "Tutto il necessario" }],
    [{ text: "per seguire il percorso in profondità.", bold: true }],
  ] as Segment[][],
  features: [
    {
      title: "Riassunti automatici",
      body: "Sintesi per ridurre il tempo di rielaborazione post-seduta.",
    },
    {
      title: "Marcatori emotivi",
      body: "Segnali strutturati su tono, stress e stabilità narrativa.",
    },
    {
      title: "Temi ricorrenti",
      body: "Pattern che emergono tra sedute e aiutano la lettura longitudinale.",
    },
    {
      title: "Timeline terapeutica",
      body: "Evoluzione visuale del percorso per decisioni più informate.",
    },
  ],
};
