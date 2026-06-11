import type { Segment } from "./home";

export const ianuaMindNavItems = [
  { href: "#funzionalita", label: "Funzionalità" },
  { href: "#prezzi", label: "Prezzi" },
  { href: "#faq", label: "FAQ" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#contatti", label: "Contatti" },
] as const;

export const ianuaMindHero = {
  title: "Dashboard clinica costruita per seguire percorsi, pazienti e sedute",
  subtitle:
    "Un'interfaccia chiara e rapida, pensata per il lavoro quotidiano del professionista.",
  socialProof: {
    count: "1.200+",
    text: "psicologi ci hanno scelto per migliorare diagnosi e gestione clinica.",
    avatars: ["FR", "ML", "AS"],
  },
  trustBadge: "Dati crittografati e conformità GDPR",
  primaryCta: { label: "Prova gratis 14 giorni", href: "#contatti" },
  secondaryCta: { label: "Prenota una demo", href: "#contatti" },
};

export type MindFeatureVideo = {
  id: string;
  title: string;
  duration: string;
  /** URL del video (YouTube, Vimeo, ecc.) — vuoto finché non disponibile */
  videoUrl?: string;
};

export const mindFeatureVideos = {
  eyebrow: "Scopri le funzionalità",
  title: "Guarda ianua-mind in azione",
  expandLabel: "Mostra tutte le funzionalità",
  collapseLabel: "Mostra meno",
  items: [
    {
      id: "sedute",
      title: "Registrazione sedute con archiviazione privata",
      duration: "1:24",
    },
    {
      id: "riassunti",
      title: "Generazione automatica di riassunti",
      duration: "1:12",
    },
    {
      id: "marcatori",
      title: "Individuazione di marcatori emotivi",
      duration: "0:58",
    },
    {
      id: "temi",
      title: "Identificazione di temi ricorrenti nel tempo",
      duration: "1:05",
    },
    {
      id: "evoluzione",
      title: "Visualizzazione dell'evoluzione del percorso terapeutico",
      duration: "1:18",
    },
    {
      id: "questionari",
      title: "Compilazione dei questionari psicologici — analisi nosografica",
      duration: "1:32",
    },
    {
      id: "chatbot",
      title: "Second-opinion chatbot",
      duration: "0:54",
    },
    {
      id: "anamnesi",
      title: "Compilazione semi-automatica dell'anamnesi psicologica",
      duration: "1:09",
    },
    {
      id: "genogramma",
      title: "Generazione semi-automatica del genogramma",
      duration: "1:15",
    },
  ] as MindFeatureVideo[],
};

export type MindPricingPlan = {
  id: string;
  name: string;
  price: number;
  /** Etichetta del ciclo di fatturazione (es. "ogni mese") */
  billingCycle: string;
  /** Costo mensile equivalente, per confronto */
  monthlyEquivalent: number;
  /** Risparmio in euro rispetto al piano mensile, se applicabile */
  savingsEuro?: number;
  /** Percentuale di risparmio rispetto al piano mensile */
  savingsPercent?: number;
  highlighted?: boolean;
  badge?: string;
  cta: { label: string; href: string };
};

export const mindPricingSharedFeatures = [
  "Registrazione sedute con archiviazione privata",
  "Generazione automatica di riassunti",
  "Individuazione di marcatori emotivi",
  "Identificazione di temi ricorrenti nel tempo",
  "Visualizzazione dell'evoluzione del percorso terapeutico",
  "Questionari psicologici e analisi nosografica",
  "Second-opinion chatbot",
  "Compilazione semi-automatica dell'anamnesi psicologica",
  "Generazione semi-automatica del genogramma",
] as const;

export const mindPricing = {
  eyebrow: "Prezzi trasparenti",
  title: "Scegli il ciclo di fatturazione",
  subtitle:
    "Tutte le funzionalità sono incluse in ogni abbonamento. Più a lungo ti impegni, più risparmi.",
  featuresTitle: "Incluso in ogni piano",
  monthlyReference: 99,
  plans: [
    {
      id: "mensile",
      name: "Mensile",
      price: 99,
      billingCycle: "fatturato ogni mese",
      monthlyEquivalent: 99,
      cta: { label: "Inizia gratis", href: "#contatti" },
    },
    {
      id: "trimestrale",
      name: "Trimestrale",
      price: 209,
      billingCycle: "fatturato ogni 3 mesi",
      monthlyEquivalent: 69.67,
      savingsEuro: 88,
      savingsPercent: 30,
      badge: "Risparmia il 30%",
      cta: { label: "Inizia gratis", href: "#contatti" },
    },
    {
      id: "annuale",
      name: "Annuale",
      price: 509,
      billingCycle: "fatturato ogni anno",
      monthlyEquivalent: 42.42,
      savingsEuro: 679,
      savingsPercent: 57,
      highlighted: true,
      badge: "Miglior risparmio",
      cta: { label: "Inizia gratis", href: "#contatti" },
    },
  ] satisfies MindPricingPlan[],
};

export type MindFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const mindFaq = {
  eyebrow: "Domande frequenti",
  title: "Risposte rapide",
  cta: { label: "Vedi tutte le domande", href: "#contatti" },
  items: [
    {
      id: "gdpr",
      question: "È conforme alla normativa GDPR?",
      answer:
        "Sì. I dati clinici sono crittografati, archiviati in UE e gestiti secondo i requisiti GDPR per la salute. Puoi esportare o eliminare i dati in qualsiasi momento.",
    },
    {
      id: "prova",
      question: "Come funziona la prova gratuita?",
      answer:
        "Hai 14 giorni per provare tutte le funzionalità senza carta di credito. Al termine puoi scegliere un piano o interrompere senza costi.",
    },
    {
      id: "sicurezza",
      question: "Le registrazioni delle sedute sono private?",
      answer:
        "Ogni seduta è accessibile solo al professionista titolare. L'archiviazione è privata e separata per paziente, con accessi tracciati.",
    },
    {
      id: "supporto",
      question: "Che tipo di supporto offrite?",
      answer:
        "Supporto via email per tutti i piani, con risposta prioritaria per Pro e Team. Disponibili anche sessioni di formazione per il tuo studio.",
    },
  ] satisfies MindFaqItem[],
};

export type MindTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
};

export const mindTestimonials = {
  eyebrow: "Cosa dicono gli psicologi",
  title: "Recensioni dai professionisti",
  items: [
    {
      id: "francesca",
      quote:
        "Finalmente una dashboard che mi fa risparmiare tempo dopo ogni seduta. I riassunti automatici sono precisi e mi aiutano a preparare il colloquio successivo.",
      name: "Dott.ssa Francesca R.",
      role: "Psicologa",
      location: "Milano",
      initials: "FR",
    },
    {
      id: "marco",
      quote:
        "La visualizzazione dell'evoluzione del percorso mi ha cambiato il modo di fare supervisione. Vedo subito i temi ricorrenti e i marcatori emotivi.",
      name: "Dott. Marco L.",
      role: "Psicoterapeuta",
      location: "Roma",
      initials: "ML",
    },
    {
      id: "anna",
      quote:
        "Uso ianua-mind ogni giorno in studio. L'anamnesi semi-automatica e il genogramma mi fanno guadagnare ore ogni settimana.",
      name: "Dott.ssa Anna S.",
      role: "Psicologa clinica",
      location: "Torino",
      initials: "AS",
    },
  ] satisfies MindTestimonial[],
};

export const mindContact = {
  eyebrow: "Siamo qui per te",
  title: "Parlaci delle tue esigenze",
  body: "Compila il modulo o contattaci direttamente. Ti risponderemo entro un giorno lavorativo.",
  email: "info@ianua.it",
  phone: "+39 02 1234 5678",
  form: {
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email",
    emailPlaceholder: "nome@studio.it",
    messageLabel: "Messaggio",
    messagePlaceholder: "Raccontaci come lavori e cosa ti serve…",
    submit: "Invia messaggio",
    hint: "Rispondiamo entro 24 ore lavorative.",
    success:
      "Grazie. Abbiamo registrato la richiesta e ti ricontatteremo presto.",
    error:
      "Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure scrivici a info@ianua.it.",
    loading: "Invio in corso…",
  },
};

export const mindFooter = {
  tagline:
    "Dashboard clinica per psicologi. Segui percorsi, pazienti e sedute con strumenti pensati per il lavoro quotidiano.",
  columns: [
    {
      title: "Prodotto",
      links: [
        { label: "Funzionalità", href: "#funzionalita" },
        { label: "Prezzi", href: "#prezzi" },
        { label: "Prova gratuita", href: "#contatti" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi siamo", href: "/" },
        { label: "Contatti", href: "#contatti" },
        { label: "Privacy", href: "#contatti" },
      ],
    },
    {
      title: "Risorse",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Recensioni", href: "#recensioni" },
        { label: "Demo", href: "#contatti" },
      ],
    },
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

/** @deprecated Sezioni legacy — non usate nella landing attuale */
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

/** @deprecated Sezioni legacy — non usate nella landing attuale */
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

/** @deprecated Sezioni legacy — non usate nella landing attuale */
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
