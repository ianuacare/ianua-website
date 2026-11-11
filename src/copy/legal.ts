/**
 * Testi legali di Ianua Mind.
 *
 * Non ancora rivisti da un legale. Le frasi che richiedono una valutazione legale
 * (qualifica come dispositivo medico, limitazione di responsabilità) sono state tolte, non inventate.
 *
 * La versione finisce nel registro dei consensi di mind.ianuacare.it:
 * quando un testo cambia nella sostanza, cambia anche la versione
 * (e va aggiornata la costante uguale in ianua-mind_front, lib/legal.ts).
 */

export type LegalSection = { title: string; paragraphs: string[] };

export type LegalDocument = {
  path: string;
  version: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export const PRIVACY_EMAIL = "privacy@ianuacare.it";

const TITOLARE = `Ianua (di seguito «Ianua»). Contatto per la privacy: ${PRIVACY_EMAIL}.`;

export const privacyPolicy: LegalDocument = {
  path: "/privacy",
  version: "privacy-2026-11-11",
  title: "Informativa privacy",
  description: "Come Ianua Mind tratta i dati dei professionisti che usano il servizio e dei loro pazienti.",
  updatedAt: "11 novembre 2026",
  sections: [
    {
      title: "1. Chi tratta i dati",
      paragraphs: [
        `Titolare del trattamento dei dati dei professionisti iscritti: ${TITOLARE}`,
        "Per i dati dei pazienti inseriti nel servizio il titolare è il professionista. Ianua tratta questi dati per suo conto come responsabile del trattamento (art. 28 GDPR), secondo le condizioni dei Termini di servizio.",
      ],
    },
    {
      title: "2. Quali dati del professionista trattiamo e perché",
      paragraphs: [
        "Dati dell'account (nome, email, credenziali di accesso) e dati di utilizzo del servizio: servono a creare l'account ed erogare il servizio. Base giuridica: esecuzione del contratto (art. 6.1.b GDPR).",
        "Dati di fatturazione, quando sottoscrivi un piano a pagamento: servono a emettere le fatture. Base giuridica: obbligo di legge (art. 6.1.c GDPR).",
        "Log tecnici (indirizzo IP, browser, orari di accesso): servono a proteggere il servizio da abusi e a dimostrare i consensi raccolti. Base giuridica: legittimo interesse (art. 6.1.f GDPR).",
        "Codice della campagna da cui sei arrivato (parametri UTM del link, senza dati personali): serve a capire quali iniziative funzionano. Base giuridica: legittimo interesse (art. 6.1.f GDPR).",
        `Email per novità e offerte: solo se lo scegli al momento della registrazione o in seguito. Base giuridica: consenso (art. 6.1.a GDPR e art. 130 Codice Privacy). Puoi revocarlo in ogni momento scrivendo a ${PRIVACY_EMAIL}.`,
      ],
    },
    {
      title: "3. I dati dei pazienti",
      paragraphs: [
        "Il professionista può inserire nel servizio dati dei pazienti, compresi dati relativi alla salute (art. 9 GDPR): anagrafica, note, registrazioni audio delle sedute, trascrizioni, questionari.",
        "Se il professionista usa la fatturazione ai pazienti, il servizio prepara le fatture e, su sua richiesta, trasmette i dati di spesa al Sistema Tessera Sanitaria.",
        "Il professionista è responsabile di avere una base giuridica valida e di informare i pazienti, in particolare prima di registrare una seduta.",
        "Ianua usa questi dati solo per erogare il servizio al professionista. Non li usa per finalità proprie e non li usa per addestrare modelli di intelligenza artificiale.",
      ],
    },
    {
      title: "4. Dove sono i dati e chi li elabora",
      paragraphs: [
        "L'archivio principale (account, schede dei pazienti, registrazioni audio, trascrizioni) è su Amazon Web Services nella regione eu-north-1 (Stoccolma, Unione Europea), con crittografia dei dati archiviati. Su AWS passano anche l'autenticazione e le email del servizio.",
        "Alcune elaborazioni avvengono presso fornitori con server negli Stati Uniti: OpenAI e Together AI per la trascrizione delle sedute e la generazione di sintesi e insight; Qdrant (Qdrant Solutions GmbH) per l'indice di ricerca nei testi delle sedute, che contiene parti delle trascrizioni ed è ospitato negli Stati Uniti.",
        "Questi trasferimenti fuori dall'Unione Europea si basano sulle clausole contrattuali standard approvate dalla Commissione europea (art. 46 GDPR), previste dai contratti con i fornitori.",
        `L'elenco aggiornato dei fornitori che trattano dati per conto di Ianua è disponibile su richiesta a ${PRIVACY_EMAIL}.`,
      ],
    },
    {
      title: "5. Per quanto tempo",
      paragraphs: [
        "Dati dell'account: per tutta la durata dell'account e per 12 mesi dopo la chiusura, poi vengono cancellati.",
        "Dati dei pazienti: finché il professionista li conserva nel servizio; alla chiusura dell'account sono cancellati entro 30 giorni, dopo averne permesso l'esportazione.",
        "Fatture: 10 anni, come richiesto dalla legge.",
        "Registro dei consensi: per tutta la durata del consenso e per i 10 anni successivi alla revoca, per poterlo dimostrare.",
      ],
    },
    {
      title: "6. I tuoi diritti",
      paragraphs: [
        `Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità dei tuoi dati e opporti al trattamento basato sul legittimo interesse (artt. 15-22 GDPR), scrivendo a ${PRIVACY_EMAIL}.`,
        "Puoi presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
        "I pazienti esercitano i loro diritti verso il professionista; Ianua lo aiuta a rispondere.",
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  path: "/termini",
  version: "termini-2026-11-11",
  title: "Termini di servizio",
  description: "Le condizioni d'uso di Ianua Mind per psicologi e professionisti della salute mentale.",
  updatedAt: "11 novembre 2026",
  sections: [
    {
      title: "1. Chi fornisce il servizio",
      paragraphs: [`Ianua Mind è fornito da ${TITOLARE}`],
    },
    {
      title: "2. A chi è rivolto",
      paragraphs: [
        "Il servizio è rivolto a psicologi, psicoterapeuti e altri professionisti della salute mentale, che lo usano nell'ambito della propria attività professionale. Non è rivolto ai consumatori.",
        "Registrandoti dichiari di essere un professionista abilitato o in formazione sotto supervisione.",
      ],
    },
    {
      title: "3. Account e prova gratuita",
      paragraphs: [
        "Per usare il servizio serve un account personale. Sei responsabile della riservatezza delle credenziali e di ciò che avviene con il tuo account.",
        "La prova gratuita dura 30 giorni e non richiede dati di pagamento. Alla fine della prova puoi scegliere un piano a pagamento. Se non lo fai, puoi chiedere l'esportazione dei tuoi dati entro 30 giorni; poi l'account e i dati vengono cancellati.",
        "Piani e prezzi sono quelli indicati su www.ianuacare.it/ianua-mind al momento dell'acquisto.",
      ],
    },
    {
      title: "4. Responsabilità del professionista",
      paragraphs: [
        "Sei titolare dei dati dei tuoi pazienti. Ti impegni a informarli e a raccogliere il loro consenso prima di registrare una seduta, nel rispetto del GDPR e del Codice deontologico.",
        "Ti impegni a non inserire dati di persone che non sono tuoi pazienti e a non usare il servizio per scopi illeciti.",
      ],
    },
    {
      title: "5. Intelligenza artificiale",
      paragraphs: [
        "Trascrizioni, sintesi e insight sono generati automaticamente e possono contenere errori. Sono un supporto al lavoro del professionista e non sostituiscono il suo giudizio clinico.",
      ],
    },
    {
      title: "6. Trattamento dei dati per conto del professionista",
      paragraphs: [
        "Per i dati dei pazienti, Ianua agisce come responsabile del trattamento (art. 28 GDPR): tratta i dati solo secondo le istruzioni del professionista, con misure di sicurezza adeguate, si avvale dei fornitori indicati nell'Informativa privacy e cancella o restituisce i dati alla fine del contratto.",
        `L'accordo completo sul trattamento dei dati è disponibile su richiesta a ${PRIVACY_EMAIL}.`,
      ],
    },
    {
      title: "7. Disponibilità e modifiche",
      paragraphs: [
        "Ci impegniamo a mantenere il servizio disponibile e sicuro, ma non possiamo garantire che sia sempre privo di interruzioni.",
        "Possiamo aggiornare questi termini. Le modifiche importanti ti saranno comunicate via email con almeno 30 giorni di anticipo.",
      ],
    },
    {
      title: "8. Recesso e chiusura dell'account",
      paragraphs: [
        `Puoi chiudere l'account in ogni momento scrivendo a ${PRIVACY_EMAIL}. Prima della chiusura ti aiutiamo a esportare i tuoi dati.`,
      ],
    },
    {
      title: "9. Legge applicabile",
      paragraphs: ["Questi termini sono regolati dalla legge italiana."],
    },
  ],
};
