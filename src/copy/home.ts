/**
 * Copy editoriale per la home di Ianua Mind.
 * Centralizzata per separare contenuti e UI.
 */

export type Segment = { text: string; italic?: boolean; bold?: boolean };

export const navItems = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#ecosistema", label: "Ecosistema" },
  { href: "#approccio", label: "Approccio" },
  { href: "#contatti", label: "Contatti" },
] as const;

export const hero = {
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

export const proofBar = {
  metrics: [
    {
      value: "100%",
      label: "Focus su psicologi e professionisti della salute mentale",
    },
    {
      value: "4",
      label: "Tipi di insight immediati: sintesi, marcatori, temi, timeline",
    },
    {
      value: "1",
      label: "Esperienza unica: privacy-by-design con AI human-centred",
    },
  ],
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

/** Titoli a due righe — sezione Ecosistema prodotti */
export const ecosystemTitle: Segment[][] = [
  [{ text: "Ianua Mind al centro.", bold: true }],
  [{ text: "Ecosistema", italic: true }, { text: " per crescere con te." }],
];

/** Lead sotto il titolo della sezione Ecosistema prodotti */
export const ecosystemLead: Segment[] = [
  { text: "Ianua Mind è la soluzione dedicata ai professionisti della salute mentale. " },
  { text: "Ianua Studio", bold: true },
  { text: " estende la stessa visione a ospedali e ricerca clinica." },
];

export const products = [
  {
    key: "mind",
    eyebrow: "Per psicologi e professionisti della salute mentale",
    name: "Ianua Mind",
    tagline: "",
    bodySegments: [
      { text: "Ianua Mind", bold: true },
      {
        text: " permette di registrare le sedute in modo sicuro e ottenere insight strutturati utili al lavoro clinico quotidiano.",
      },
    ] satisfies Segment[],
    bullets: [
      "Registrazione privata delle sedute",
      "Sintesi automatica ad alta leggibilità",
      "Marcatori emotivi e temi ricorrenti",
      "Timeline evolutiva del percorso",
    ],
    cta: { label: "Richiedi demo Ianua Mind", href: "#contatti" },
  },
  {
    key: "studio",
    eyebrow: "Per ospedali, cliniche e centri di ricerca",
    name: "Ianua Studio",
    tagline: "",
    bodySegments: [
      { text: "Ianua Studio", bold: true },
      { text: " trasforma la documentazione clinica in informazioni strutturate per diagnosi e ricerca." },
    ] satisfies Segment[],
    bullets: [
      "Estrazione di dati clinici rilevanti",
      "Pattern e correlazioni tra casi",
      "Supporto al processo decisionale",
    ],
    cta: { label: "Scopri Ianua Studio", href: "#ecosistema" },
  },
] as const;

export const ianuacare = {
  eyebrow: "Progetto editoriale",
  name: "Ianuacare",
  titleLines: [
    [{ text: "Voce,", bold: true }],
    [
      { text: "insight e visione", bold: true },
      { text: " sul futuro della " },
      { text: "cura", italic: true },
      { text: "." },
    ],
  ] satisfies Segment[][],
  bodySegments: [
    { text: "Ianuacare", bold: true },
    { text: " è il progetto editoriale di Ianua: uno spazio per raccontare innovazione, ricerca e cura." },
  ] satisfies Segment[],
  cta: { label: "Richiedi una demo", href: "#contatti" },
  status: "in arrivo",
};

export const approach = {
  eyebrow: "Approccio e compliance",
  title: [
    [{ text: "Privacy by design.", bold: true }],
    [{ text: "AI al servizio del giudizio clinico." }],
  ] as Segment[][],
  features: [
    {
      title: "Privacy by design",
      text: [
        { text: "Archiviazione sicura e accesso riservato al professionista", bold: true },
        { text: ", con un impianto progettato per il contesto sanitario." },
      ] satisfies Segment[],
    },
    {
      title: "Insight strutturati",
      text: [
        { text: "Dalla seduta a dati leggibili", bold: true },
        { text: ": sintesi, marcatori, temi e progressione temporale." },
      ] satisfies Segment[],
    },
    {
      title: "Workflow integrati",
      text: [
        { text: "Pensato per la routine clinica reale", bold: true },
        { text: ", senza cambiare il modo in cui costruisci la relazione terapeutica." },
      ] satisfies Segment[],
    },
    {
      title: "Human-centred",
      text: [
        { text: "L'AI supporta, non sostituisce", bold: true },
        { text: ". La decisione resta sempre nel perimetro del professionista." },
      ] satisfies Segment[],
    },
  ],
} satisfies {
  eyebrow: string;
  title: Segment[][];
  features: { title: string; text: Segment[] }[];
};

export const audiences = {
  eyebrow: "Per chi lavoriamo",
  titleLines: [
    [
      { text: "Lavoriamo con chi ", bold: true },
      { text: "cura", italic: true },
      { text: "." },
    ],
  ] satisfies Segment[][],
  items: [
    "Psicologi",
    "Psicoterapeuti",
    "Equipe di salute mentale",
    "Cliniche",
    "Ospedali",
    "Centri di ricerca",
  ],
};

export const contact = {
  eyebrow: "Contatti",
  title: [
    [{ text: "Porta Ianua Mind", bold: true }],
    [{ text: "nel tuo lavoro clinico." }],
  ] as Segment[][],
  bodySegments: [
    { text: "Se lavori in " },
    { text: "studio privato", bold: true },
    { text: " o coordini un team di " },
    { text: "professionisti della salute mentale", bold: true },
    { text: ", raccontaci il tuo contesto: ti risponderemo con una proposta di demo." },
  ] satisfies Segment[],
  email: "info@ianua.it",
  formPlaceholder: "la tua email professionale",
  formCta: "richiedi demo",
  hint: "Ti risponderemo personalmente entro pochi giorni lavorativi.",
};

export const footer = {
  brandLine: "Ianua Mind — Healthcare technology, human at heart.",
  columns: [
    {
      title: "Prodotto",
      links: [
        { label: "Come funziona", href: "#come-funziona" },
        { label: "Feature", href: "#feature-mind" },
        { label: "Approccio", href: "#approccio" },
      ],
    },
    {
      title: "Ecosistema",
      links: [
        { label: "Ianua Mind", href: "#ecosistema" },
        { label: "Ianua Studio", href: "#ecosistema" },
      ],
    },
    {
      title: "Contatti",
      links: [
        { label: "info@ianua.it", href: "mailto:info@ianua.it" },
        { label: "Coming soon", href: "/coming-soon" },
      ],
    },
  ],
};
