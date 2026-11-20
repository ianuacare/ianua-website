# Lab IANUA

Pagina pubblica `/lab`, collegata dalla navigazione e dal footer della home.
Mantiene palette, font, logo, navigazione responsive e linguaggio editoriale della home.
Le sei schede sono in `src/copy/lab.ts`; la pagina è `src/pages/Lab.tsx`.

## Fonti dei contenuti

| Scheda | Materiale consultato | Risorsa pubblica |
| --- | --- | --- |
| Segmentazione polmonare 3D | `advanced_computational_techniques.pdf`, Downloads; pp. 1–6, test su 10 casi a p. 4 | `public/lab/segmentazione-polmonare-3d.pdf` |
| Liste d’attesa | `optimization_hospital.pdf`, Downloads; simulazione e confronto PPO/DQN/FIFO/Top-K, pp. 1–7 | `public/lab/ottimizzazione-liste-attesa.pdf` |
| Informazioni cliniche | `A Novel way to extract entities from electronic.pdf`, Downloads; OCR e dataset pp. 4–6, confronto e limiti pp. 21–23; README e albero del progetto DanieleCecca/Extract-entities-from-HER, revisione `77bd613a99fed431e1c68a72805ae1968386ccd2` | Nessun PDF pubblico: il report contiene dati personali identificativi nella tabella di esempio a p. 23. La scheda rimanda ai contatti. |
| Ipotiroidismo | `paper.pdf`, Downloads; analisi esplorativa, confronto degli outlier e limiti interpretativi | `public/lab/anomalie-ipotiroidismo.pdf` |
| Breast Insight | `Desktop/Healthcare/Project2/InsightsBreast.pdf`, 16 slide; SAM, PyRadiomics, classificatori, web app | `public/lab/breast-insight.pdf` |
| EpiSenseAI | `Desktop/Healthcare/Project1/EpiSenseAI.pdf`, 17 slide; 200 pattern, PCA, SVM/RF, validazione e metriche | `public/lab/episense-ai.pdf` |

Tutti i cinque PDF richiesti sono stati recuperati e copiati senza modifiche.
Per aggiungere il report sull’estrazione occorre una versione priva di dati personali,
anche nelle immagini e nelle tabelle. Non è stato copiato nella cartella pubblica.
Le schede descrivono metodi, risultati sperimentali, applicazioni e limiti.
La pagina non contiene link ai repository.

## Fotografie

Le immagini illustrative sono servite localmente. Le pagine delle foto Pexels,
lo stesso provider della home, sono raggiungibili dai crediti nel footer di Lab.

| File in `src/assets/images/lab/` | ID Pexels | Soggetto |
| --- | --- | --- |
| `polmoni-3d.png` | — | Due viste della segmentazione tridimensionale dei polmoni fornite dall’utente |
| `ospedale.jpg` | 668300 | Struttura ospedaliera |
| `documenti.jpg` | 7089401 | Colloquio con documentazione |
| `laboratorio.jpg` | 3825527 | Modello molecolare |
| `ecografia-mammaria.png` | — | Ecografia mammaria e mappa di segmentazione fornite dall’utente |
| `cervello-eeg.png` | — | Illustrazione di cervello e tracciati EEG fornita dall’utente |

## Verifica

- `npm run build`
- `npx tsc --noEmit`
- Nessuno script lint è configurato nel progetto.
- Avviare `npm run dev`, poi `node scripts/check-lab.mjs` (Chrome installato).
  `LAB_TEST_ORIGIN` e `LAB_TEST_BROWSER` permettono di scegliere server e browser.
  Lo script controlla navigazione home/Lab, sei schede, cinque risposte PDF reali,
  assenza di link GitHub, metadati, nessun overflow a 820/390/320 px, menu ed Escape
  con ritorno del focus, ritorno alle sezioni home, reload diretto e errori runtime.
  Le schermate desktop e mobile sono salvate nella cartella temporanea di sistema.

Routing coerente con le route esistenti e con la documentazione
[React Router](https://reactrouter.com/7.14.2/start/data/routing).
La sitemap generata include `/lab`; i file PDF in `public/lab` vengono copiati in `dist/lab`.
