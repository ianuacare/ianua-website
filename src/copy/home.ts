/**
 * Copy editoriale per la home di Ianua.
 * Centralizzata per separare contenuti e UI.
 * I segmenti `italic: true` vengono renderizzati in Helvetica Neue Light Italic come accento editoriale.
 * I segmenti `bold: true` enfatizzano parole chiave senza appesantire il blocco.
 */

export type Segment = { text: string; italic?: boolean; bold?: boolean };

/** Titoli a due righe — sezione Ecosistema prodotti */
export const ecosystemTitle: Segment[][] = [
  [{ text: "Due prodotti.", bold: true }],
  [{ text: "Una visione", italic: true }, { text: " della cura." }],
];

/** Lead sotto il titolo della sezione Ecosistema prodotti */
export const ecosystemLead: Segment[] = [
  { text: "Strumenti progettati per " },
  { text: "il lavoro reale di chi cura", bold: true },
  { text: ": dalla psicoterapia all'analisi della documentazione clinica negli ospedali." },
];

export const navItems = [
  { href: "#ecosistema", label: "Ecosistema" },
  { href: "#approccio", label: "Approccio" },
  { href: "#editoriale", label: "Editoriale" },
  { href: "#contatti", label: "Contatti" },
] as const;

export const proofBar = {
  metrics: [
    {
      value: "100%",
      label: "Focus sui professionisti sanitari",
    },
    {
      value: "3",
      label: "Contesti operativi: ospedali, cliniche, studi privati",
    },
    {
      value: "2",
      label: "Prodotti integrati nell'ecosistema Ianua",
    },
  ],
};

export const products = [
  {
    key: "mind",
    eyebrow: "Per psicologi e professionisti della salute mentale",
    name: "Ianua Mind",
    tagline:
      "",
    bodySegments: [
      { text: "Ianua Mind", bold: true },
      {
        text: " permette di registrare le sedute in modo sicuro, con accesso esclusivo per il professionista, e di ottenere ",
      },
      { text: "insight strutturati", bold: true },
      { text: " attraverso analisi supportate da intelligenza artificiale." },
    ] satisfies Segment[],
    bullets: [
      "Registrazione sedute con archiviazione privata",
      "Generazione automatica di riassunti",
      "Individuazione di marcatori emotivi",
      "Identificazione di temi ricorrenti nel tempo",
      "Visualizzazione dell'evoluzione del percorso terapeutico",
    ],
    cta: { label: "Scopri Ianua Mind", href: "#contatti" },
  },
  {
    key: "studio",
    eyebrow: "Per ospedali, cliniche e centri di ricerca",
    name: "Ianua Studio",
    tagline:
      "",
    bodySegments: [
      { text: "Ianua Studio", bold: true },
      {
        text: " parte da un insieme di documenti clinici relativi a diverse ospedalizzazioni di un paziente e ne estrae le ",
      },
      { text: "informazioni rilevanti", bold: true },
      {
        text: ", utili sia al processo diagnostico sia alla ricerca scientifica.",
      },
    ] satisfies Segment[],
    bullets: [
      "Estrazione di informazioni strutturate da documenti clinici",
      "Identificazione di pattern, correlazioni e similarità",
      "Supporto al processo decisionale clinico",
      "Analisi a fini di ricerca: statistiche, insight, confronti tra casi",
    ],
    cta: { label: "Scopri Ianua Studio", href: "#contatti" },
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
    { text: " è il progetto editoriale di Ianua. Uno spazio dove raccontiamo come la " },
    { text: "tecnologia", bold: true },
    { text: " può potenziare — e mai sostituire — la " },
    { text: "dimensione umana", bold: true },
    { text: " della medicina." },
  ] satisfies Segment[],
  cta: { label: "Vai al magazine", href: "#editoriale" },
  status: "in arrivo",
};

export const approach = {
  eyebrow: "Approccio",
  title: [
    [{ text: "Quattro principi.", bold: true }],
    [{ text: "Una sola ", italic: false }, { text: "direzione", italic: true }, { text: ".", italic: false }],
  ] as Segment[][],
  features: [
    {
      title: "Privacy by design",
      text: [
        { text: "Archiviazione sicura", bold: true },
        {
          text: ", accesso esclusivo al professionista, conformità ai requisiti del settore sanitario.",
        },
      ] satisfies Segment[],
    },
    {
      title: "Insight strutturati",
      text: [
        { text: "Trasformiamo testi, sedute e documenti in dati leggibili", bold: true },
        { text: ": riassunti, marcatori, pattern, correlazioni." },
      ] satisfies Segment[],
    },
    {
      title: "Workflow integrati",
      text: [
        { text: "Strumenti pensati per inserirsi nelle routine cliniche esistenti", bold: true },
        { text: ", non per sostituirle." },
      ] satisfies Segment[],
    },
    {
      title: "Human-centred",
      text: [
        { text: "L'AI è un motore.", bold: true },
        { text: " Il giudizio clinico — e la relazione di cura — restano al centro." },
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
    "Ospedali",
    "Cliniche",
    "Centri di ricerca",
    "Medici di base",
    "Psicologi",
    "Professionisti della salute mentale",
  ],
};

export const insights = {
  eyebrow: "Editoriale — Ianuacare",
  title: [
    [{ text: "Letture sul futuro", bold: true }],
    [{ text: "della ", italic: false }, { text: "cura", italic: true }, { text: "." }],
  ] as Segment[][],
  status: "Magazine in arrivo",
  items: [
    {
      category: "Visione",
      date: "Prossimamente",
      title: "Perché parliamo di servizi, non di AI",
    },
    {
      category: "Pratica clinica",
      date: "Prossimamente",
      title: "Documenti clinici: dal silos al pattern",
    },
    {
      category: "Salute mentale",
      date: "Prossimamente",
      title: "Marcatori emotivi nelle sedute: una lettura longitudinale",
    },
  ],
};

export const contact = {
  eyebrow: "Contatti",
  title: [
    [{ text: "Apriamo insieme", bold: true }],
    [{ text: "la prossima " }, { text: "soglia", italic: true }, { text: " della cura." }],
  ] as Segment[][],
  bodySegments: [
    { text: "Lavori in una " },
    { text: "struttura sanitaria", bold: true },
    { text: ", in uno " },
    { text: "studio privato", bold: true },
    { text: " o in un " },
    { text: "centro di ricerca", bold: true },
    {
      text: "? Raccontaci il tuo contesto: torneremo da te entro pochi giorni lavorativi.",
    },
  ] satisfies Segment[],
  email: "info@ianua.it",
  formPlaceholder: "la tua email professionale",
  formCta: "richiedi un contatto",
  hint: "Ti risponderemo personalmente. Niente newsletter automatiche.",
};

export const footer = {
  brandLine: "Ianua — Healthcare technology, human at heart.",
  columns: [
    {
      title: "Ecosistema",
      links: [
        { label: "Ianua Mind", href: "#ecosistema" },
        { label: "Ianua Studio", href: "#ecosistema" },
        { label: "Ianuacare", href: "#editoriale" },
      ],
    },
    {
      title: "Brand",
      links: [
        { label: "Approccio", href: "#approccio" },
        { label: "Per chi lavoriamo", href: "#per-chi" },
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
