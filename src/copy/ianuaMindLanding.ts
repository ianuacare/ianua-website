import type { Segment } from "./home";

export const ianuaMindNavItems = [
  { href: "#funzionalita", label: "Funzionalità" },
  { href: "#percorso", label: "Percorso" },
  { href: "#sicurezza", label: "Sicurezza" },
  { href: "#faq", label: "FAQ" },
] as const;

export const ianuaMindHero = {
  title: "Dashboard clinica costruita per seguire percorsi, pazienti e sedute",
  subtitle:
    "Per psicologi e professionisti della salute mentale. Un'interfaccia chiara e rapida, pensata per il lavoro quotidiano.",
  socialProof: {
    text: "Pensato per semplificare il lavoro clinico quotidiano, senza compromettere la qualità della cura.",
  },
  trustBadge: "Dati crittografati e conformità GDPR",
  primaryCta: { label: "Prova gratuitamente", href: "#contatti" },
};

export type MindScene =
  | "session"
  | "summary"
  | "markers"
  | "path"
  | "forms"
  | "chat"
  | "history"
  | "geno";

export type MindFeature = {
  id: string;
  label: string;
  summary: string;
  scene: MindScene;
};

export const mindFeatures = {
  title: "Dalla seduta al percorso",
  lead: "Otto strumenti nella stessa dashboard. Scegline uno e guarda come si presenta il lavoro.",
  pause: "Metti in pausa",
  play: "Riprendi",
  items: [
    {
      id: "sedute",
      label: "Sedute",
      summary:
        "La seduta viene registrata e trascritta. L'archivio resta privato e consultabile solo dal professionista.",
      scene: "session",
    },
    {
      id: "riassunti",
      label: "Riassunti",
      summary:
        "Dopo la seduta compare una sintesi, pronta da rileggere prima dell'incontro successivo.",
      scene: "summary",
    },
    {
      id: "marcatori",
      label: "Marcatori",
      summary:
        "Temi ricorrenti e segnali emotivi restano visibili, senza perdersi tra una seduta e l'altra.",
      scene: "markers",
    },
    {
      id: "evoluzione",
      label: "Percorso",
      summary:
        "Le sedute si dispongono nel tempo, così il percorso si legge come continuità.",
      scene: "path",
    },
    {
      id: "questionari",
      label: "Questionari",
      summary:
        "I questionari psicologici stanno nel percorso e restituiscono una lettura nosografica ordinata.",
      scene: "forms",
    },
    {
      id: "chatbot",
      label: "Second opinion",
      summary:
        "Un confronto sul caso, a partire dal materiale già presente in cartella e dalla letteratura scientifica.",
      scene: "chat",
    },
    {
      id: "anamnesi",
      label: "Anamnesi",
      summary:
        "La scheda anamnestica si compila a partire dalla seduta e resta modificabile.",
      scene: "history",
    },
    {
      id: "genogramma",
      label: "Genogramma",
      summary:
        "Le relazioni familiari prendono forma in uno schema, dalle informazioni già raccolte.",
      scene: "geno",
    },
  ] satisfies MindFeature[],
};

export const mindFlow = {
  title: "Il ritmo di una seduta",
  lead: "Tre passaggi, poi si torna al paziente.",
  steps: [
    {
      id: "registra",
      title: "Registra",
      body: "Acquisisci la seduta in ambiente sicuro, con accesso riservato al professionista.",
    },
    {
      id: "analizza",
      title: "Analizza",
      body: "Ottieni riassunti, marcatori emotivi e temi ricorrenti già strutturati.",
    },
    {
      id: "monitora",
      title: "Monitora",
      body: "Consulta la progressione nel tempo e prepara il prossimo incontro con più contesto.",
    },
  ],
};

export const mindTrust = {
  title: "I dati clinici restano del professionista",
  lead: "Crittografia, archivio privato e conformità GDPR sono parte del prodotto.",
  items: [
    {
      id: "gdpr",
      title: "Conformità GDPR",
      body: "Dati clinici crittografati, archiviati in Unione Europea e gestiti secondo i requisiti per la salute. Si possono esportare o eliminare in qualsiasi momento.",
    },
    {
      id: "privato",
      title: "Archivio privato",
      body: "Ogni seduta è accessibile solo al professionista titolare. L'archivio è separato per paziente, con accessi tracciati.",
    },
    {
      id: "prova",
      title: "Prova senza carta",
      body: "Tutte le funzionalità si provano senza carta di credito. Al termine si sceglie un piano oppure si interrompe, senza costi.",
    },
  ],
};

export type MindFeatureVideo = {
  id: string;
  title: string;
  /** Path pubblico del video demo (sotto /public) */
  videoSrc?: string;
};

export const mindFeatureVideos = {
  eyebrow: "Scopri le funzionalità",
  title: "Guarda ianua-mind in azione",
  expandLabel: "Mostra tutte le funzionalità",
  collapseLabel: "Mostra meno",
  items: [
    {
      id: "sedute",
      title: "Registrazione e trascrizione sedute con archiviazione privata",
      videoSrc: "/ianua-mind/videos/registrazione_trascrizione.mp4",
    },
    {
      id: "riassunti",
      title: "Generazione automatica di riassunti",
      videoSrc: "/ianua-mind/videos/riassunto.mp4",
    },
    {
      id: "marcatori",
      title: "Individuazione di marcatori emotivi e dei temi ricorrenti",
      videoSrc: "/ianua-mind/videos/insights.mp4",
    },
    {
      id: "evoluzione",
      title: "Visualizzazione dell'evoluzione del percorso terapeutico",
      videoSrc: "/ianua-mind/videos/percorso.mp4",
    },
    {
      id: "questionari",
      title: "Compilazione dei questionari psicologici — analisi nosografica",
      videoSrc: "/ianua-mind/videos/questionario.mp4",
    },
    {
      id: "chatbot",
      title: "Second-opinion chatbot",
      videoSrc: "/ianua-mind/videos/chatbot.mp4",
    },
    {
      id: "anamnesi",
      title: "Compilazione semi-automatica dell'anamnesi psicologica",
      videoSrc: "/ianua-mind/videos/documento_clinico.mp4",
    },
    {
      id: "genogramma",
      title: "Generazione semi-automatica del genogramma",
      videoSrc: "/ianua-mind/videos/genogramma.mp4",
    },
  ] as MindFeatureVideo[],
};

export type MindComingSoonItem = {
  id: string;
  title: string;
  body: string;
};

export const mindComingSoon = {
  eyebrow: "Roadmap",
  title: "Novità in arrivo",
  subtitle:
    "Stiamo costruendo nuove funzionalità per rendere ancora più fluido il lavoro clinico quotidiano.",
  badge: "In arrivo",
  items: [
    {
      id: "meeting",
      title: "Creazione meeting in piattaforma",
      body: "Organizza e avvia gli incontri direttamente da Ianua Mind, senza uscire dal flusso di lavoro.",
    },
    {
      id: "note-manoscritte",
      title: "Caricamento note scritte a mano",
      body: "Digitalizza appunti manoscritti e collegali al percorso del paziente in pochi passaggi.",
    },
    {
      id: "tono-voce",
      title: "Analisi del tono di voce",
      body: "Evidenzia variazioni di tono e intensità vocale per arricchire la lettura della seduta.",
    },
  ] satisfies MindComingSoonItem[],
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
      price: 210,
      billingCycle: "fatturato ogni 3 mesi",
      monthlyEquivalent: 70,
      savingsEuro: 87,
      savingsPercent: 29,
      badge: "Risparmia il 29%",
      cta: { label: "Inizia gratis", href: "#contatti" },
    },
    {
      id: "annuale",
      name: "Annuale",
      price: 600,
      billingCycle: "fatturato ogni anno",
      monthlyEquivalent: 50,
      savingsEuro: 588,
      savingsPercent: 50,
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
        "Puoi provare gratuitamente tutte le funzionalità senza carta di credito. Al termine puoi scegliere un piano o interrompere senza costi.",
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


export const mindTestimonials = {
  eyebrow: "Dal mondo clinico",
  title: "Recensioni dai professionisti",
  comingSoon: "Coming soon",
};

export const mindContact = {
  eyebrow: "Siamo qui per te",
  title: "Parlaci delle tue esigenze",
  body: "Compila il modulo o contattaci direttamente. Ti risponderemo entro un giorno lavorativo.",
  email: "ianuacare@gmail.com",
  phone: "+1 2394754346",
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
      "Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure scrivici a ianuacare@gmail.com.",
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
        { label: "Percorso", href: "#percorso" },
        { label: "Novità", href: "#novita" },
        { label: "Prova gratuita", href: "#contatti" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi siamo", href: "/" },
        { label: "Contatti", href: "#contatti" },
        { label: "Sicurezza", href: "#sicurezza" },
      ],
    },
    {
      title: "Risorse",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Novità in arrivo", href: "#novita" },
        { label: "Scrivici", href: "#contatti" },
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
