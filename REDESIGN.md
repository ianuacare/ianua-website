# IANUA — revisione fotografica

Direzione approvata in chat: gradienti originali, niente corsivi o microetichette, fotografie umane, animazione ricerca → persone, prodotti insieme.

## Design e movimento

La home usa gli asset originali `bg-desktop.png` e `bg-mobile.png`, con sovrapposizioni scure per il contrasto. Logo e Helvetica Neue esistenti preservati. Rimossi anello vettoriale, palette avorio/rame, titoli serif e numerazione editoriale.

Apertura: fotografia a pieno schermo, ingresso della foto da scala 1.08 a 1 e del testo in due battute. Scorrendo, la fotografia ha un movimento verticale limitato e il testo sfuma. La sequenza seguente avvicina due immagini da traslazione ±15% e scala 0.82 fino a traslazione zero e scala 1, facendo scomparire la distanza occupata dal gradiente. Sticky soltanto su desktop; su mobile la sequenza è verticale e senza pin. Il pulsante Riduci movimento e la preferenza di sistema disattivano le trasformazioni. Ingressi dei contenuti con Motion; nessun controllo della rotella o dello scroll touch.

Mind e Studio condividono una griglia a due colonne; su mobile sono consecutivi nella stessa sezione. Due card separate coerenti con il layout rettilineo della pagina, con loghi e gradienti originali Mind/Studio. Funzionalità nei dettagli nativi, ingresso sfalsato e sollevamento al passaggio del puntatore. Microinterazioni su link, pulsanti e accordion; disattivabili con il controllo movimento e la preferenza di sistema. Contatto e pagine secondarie preservati.

## Fotografie e licenza

- `src/assets/images/home-human.jpg`: Magda Ehlers, https://www.pexels.com/photo/a-close-up-photo-of-an-elderly-people-holding-each-others-hand-4588206/
- `src/assets/images/home-research.jpg`: Edward Jenner, https://www.pexels.com/photo/man-using-a-microscope-inside-the-laboratory-4033020/
- Licenza consultata: https://www.pexels.com/license/ . Uso su siti consentito; vietata l'implicazione di endorsement. Le immagini sono illustrative e non rappresentano pazienti, risultati clinici o collaboratori di IANUA. Crediti nel footer.

Le immagini sono locali, 118 e 113 kB circa, con dimensioni dichiarate. Foto hero prioritaria; altre foto lazy-loaded. Nessuna nuova dipendenza applicativa.

## Metodo e limiti

Applicati concept e mappa di movimento di Masalale/awwwards-designer, approvati dall'utente. Adattamento allo stack React/Vite esistente richiesto dal brief. Non eseguito il flusso Stitch/Context7: strumenti non collegati; consultate le documentazioni ufficiali Motion per useScroll, useTransform e useReducedMotion.

La compilazione TypeScript e la build passano. Verificati nel browser immagini, prodotti affiancati, menu mobile/Escape, dettagli, destinazioni interne e controllo del movimento. Nessuna email reale inviata. Nessuna pubblicazione effettuata. I Core Web Vitals su hosting di produzione non sono stati misurati.

Avvio: `npm run dev`.

Foto editoriale: Tima Miroshnichenko, https://www.pexels.com/photo/people-studying-in-the-library-together-9572669/ — `home-editorial.jpg`, licenza Pexels. Sostituisce il microscopio nella sola sezione Ianuacare.

Revisione: luce radiale al puntatore sulle due card; ingresso sfalsato e sottolineatura al passaggio del mouse per i destinatari. Nessun movimento continuo. Effetti disattivati con Riduci movimento o preferenza di sistema; nessun effetto puntatore su touch. Foto editoriale di conversazione in biblioteca.
