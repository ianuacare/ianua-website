import lung from "../assets/images/lab/polmoni-3d.png";
import hospital from "../assets/images/lab/ospedale.jpg";
import records from "../assets/images/lab/documenti.jpg";
import laboratory from "../assets/images/lab/laboratorio.jpg";
import breast from "../assets/images/lab/ecografia-mammaria.png";
import eeg from "../assets/images/lab/cervello-eeg.png";

/** Schede editoriali: metodi documentati e applicazioni potenziali, senza promesse cliniche. */
export const labProjects = [
  {
    id: "segmentazione-polmonare",
    title: "Segmentazione polmonare 3D",
    image: lung,
    imageAlt: "Due viste azzurre della segmentazione tridimensionale dei polmoni.",
    photoId: null,
    paragraphs: [
      "Delineare i polmoni nelle TAC toraciche è un passaggio preliminare per misurare volumi e studiare il tessuto polmonare. Questo progetto sviluppa una pipeline di segmentazione con una rete residuale 3D U-Net, addestrata sul dataset LCTSC, che restituisce maschere volumetriche e mappe di probabilità esplorabili in 2D e 3D.",
      "Il report documenta un Dice medio di 0,973 su 10 casi di test. Per radiologi e centri di ricerca, è una base riproducibile per esplorare analisi quantitative e radiomica. La sperimentazione utilizza volumi ridotti a 64³ voxel: dettaglio anatomico e generalizzazione su altri dati restano da valutare.",
    ],
    pdf: "segmentazione-polmonare-3d.pdf",
    resource: "Leggi il report",
  },
  {
    id: "liste-attesa",
    title: "Ottimizzazione delle liste d’attesa ospedaliere",
    image: hospital,
    imageAlt: "Edificio ospedaliero e accesso alla struttura.",
    photoId: "668300",
    paragraphs: [
      "Come assegnare una capacità ospedaliera limitata quando cambiano urgenze, nuovi arrivi e condizioni dei pazienti? Lo studio costruisce un ambiente di simulazione che considera tempi di attesa, rischio e deterioramento, confrontando due algoritmi di apprendimento per rinforzo, PPO e DQN, con regole FIFO e priorità Top-K.",
      "Gli esperimenti rendono visibile un compromesso centrale per le direzioni sanitarie: PPO contiene maggiormente il rischio simulato, mentre DQN limita di più i superamenti delle soglie di attesa. Il valore è poter confrontare criteri di programmazione prima di applicarli; i risultati derivano da pazienti sintetici e non dimostrano una riduzione delle attese in ospedali reali.",
    ],
    pdf: "ottimizzazione-liste-attesa.pdf",
    resource: "Leggi il report",
  },
  {
    id: "informazioni-cliniche",
    title: "Estrazione automatica di informazioni cliniche",
    image: records,
    imageAlt: "Professionista sanitaria con una cartella durante un colloquio.",
    photoId: "7089401",
    paragraphs: [
      "Trasformare lettere di dimissione e documenti scansionati in informazioni strutturate può alleggerire il lavoro di trascrizione e preparazione dei dati per la ricerca. Il progetto integra OCR con Marker e riconoscimento di entità cliniche, lavorando su 291 documenti e un insieme di 74 campi che comprende diagnosi, anamnesi, terapie ed esiti.",
      "Lo studio confronta l’estrazione diretta tramite modelli linguistici con una pipeline Bio_ClinicalBERT, adattata su annotazioni generate da un LLM, seguita dalla classificazione delle entità. Per ospedali e gruppi di ricerca, esplora come rendere interrogabile il patrimonio documentale. I test evidenziano anche errori di estrazione: verifica specialistica e valutazioni più ampie restano essenziali.",
    ],
    pdf: null,
    resource: null,
  },
  {
    id: "anomalie-ipotiroidismo",
    title: "Rilevamento anomalie nei dati sull’ipotiroidismo",
    image: laboratory,
    imageAlt: "Modello molecolare utilizzato in un contesto di ricerca.",
    photoId: "3825527",
    paragraphs: [
      "Nei dati sanitari, un profilo insolito può meritare un approfondimento prima ancora di essere interpretato clinicamente. Questo studio esplora un dataset sull’ipotiroidismo di 7.200 osservazioni e 21 attributi, analizzando distribuzioni, duplicati e relazioni tra variabili, per poi confrontare LOF, DBSCAN, autoencoder e Minimum Covariance Determinant.",
      "Il confronto misura quanto i metodi concordano sugli outlier e come cambia la struttura dei gruppi dopo la loro rimozione. Per chi gestisce dataset clinici, offre un percorso di analisi della qualità e dei profili atipici. Le variabili non hanno nomi clinici esplicativi: un’anomalia statistica non equivale a una diagnosi né a una probabilità clinica di malattia.",
    ],
    pdf: "anomalie-ipotiroidismo.pdf",
    resource: "Leggi il report",
  },
  {
    id: "breast-insight",
    title: "Breast Insight — Segmentazione dei tumori mammari",
    image: breast,
    imageAlt: "Ecografia mammaria affiancata alla mappa di segmentazione a colori.",
    photoId: null,
    paragraphs: [
      "Breast Insight esplora un percorso che collega delineazione delle masse, estrazione di caratteristiche radiomiche e classificazione. Il prototipo adatta Segment Anything Model (SAM) al compito di segmentazione, utilizza PyRadiomics per descrivere le regioni individuate e confronta modelli SVM e Random Forest, anche con tecniche per gestire lo sbilanciamento dei dati.",
      "Una web app riunisce caricamento, segmentazione e classificazione, rendendo il flusso esplorabile anche al di fuori dei notebook di ricerca. La presentazione riporta un Dice medio di 0,85 per la segmentazione. È un esempio di come integrare analisi delle immagini e strumenti accessibili al professionista, con risultati sperimentali da verificare su casistiche cliniche indipendenti.",
    ],
    pdf: "breast-insight.pdf",
    resource: "Sfoglia la presentazione",
  },
  {
    id: "episense-ai",
    title: "EpiSenseAI — Classificazione epilessia da EEG",
    image: eeg,
    imageAlt: "Illustrazione del cervello con tracciati elettroencefalografici sullo sfondo.",
    photoId: null,
    paragraphs: [
      "EpiSenseAI studia la classificazione di segnali EEG attraverso una pipeline che comprende analisi dei dati, standardizzazione, individuazione degli outlier e riduzione della dimensionalità con PCA. Su 200 pattern, suddivisi tra due classi del dataset, confronta Support Vector Machine e Random Forest con ricerca degli iperparametri e validazione incrociata stratificata.",
      "Sensibilità, specificità e accuratezza aiutano a leggere i diversi comportamenti dei modelli, affiancate da confronti statistici. Per neurologi e ricercatori, il progetto offre un esempio di valutazione comparativa dei segnali ad alta dimensionalità. Il campione limitato e le due classi studiate circoscrivono i risultati: non si tratta di una validazione diagnostica su tutte le forme di epilessia.",
    ],
    pdf: "episense-ai.pdf",
    resource: "Sfoglia la presentazione",
  },
] as const;
