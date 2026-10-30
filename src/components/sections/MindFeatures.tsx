import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mindFeatures } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import { MindScenes } from "./MindScenes";
import styles from "./MindFeatures.module.css";

/**
 * Selettore delle funzionalità: il testo resta leggibile e la grafica cambia
 * con la voce scelta. Avanza da sola su desktop e si ferma su hover, focus o pausa.
 */
export function MindFeatures() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [compact, setCompact] = useState(false);
  const items = mindFeatures.items;
  const current = items[active] ?? items[0];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 860px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const autoplay = reduceMotion !== true && !compact && !userPaused && !held;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % items.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [autoplay, items.length, active]);

  useEffect(() => {
    if (!current) return;
    const tab = document.getElementById(`mind-tab-${current.id}`);
    const list = tab?.parentElement;
    if (!tab || !list || list.scrollWidth <= list.clientWidth) return;
    const left =
      tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft - 12;
    list.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [current, reduceMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    setUserPaused(true);
    setActive(next);
    window.requestAnimationFrame(() => {
      document.getElementById(`mind-tab-${items[next].id}`)?.focus();
    });
  };

  if (!current) return null;

  return (
    <section id="funzionalita" className={styles.section} aria-labelledby="mind-features-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="mind-features-heading" className={styles.title}>
            {mindFeatures.title}
          </h2>
          <p className={styles.lead}>{mindFeatures.lead}</p>
        </header>

        <div
          className={styles.layout}
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            const next = event.relatedTarget;
            if (next instanceof Node && event.currentTarget.contains(next)) return;
            setHeld(false);
          }}
        >
          <div className={styles.controls}>
            <div className={styles.tabs} role="tablist" aria-label="Funzionalità di Ianua Mind">
              {items.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.id}
                    id={`mind-tab-${item.id}`}
                    type="button"
                    role="tab"
                    className={selected ? styles.tabActive : styles.tab}
                    aria-selected={selected}
                    aria-controls={`mind-panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => {
                      setUserPaused(true);
                      setActive(index);
                    }}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {reduceMotion !== true && !compact ? (
              <button
                type="button"
                className={styles.pause}
                onClick={() => setUserPaused((value) => !value)}
              >
                {userPaused ? mindFeatures.play : mindFeatures.pause}
              </button>
            ) : null}
          </div>

          <div className={styles.stage}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                role="tabpanel"
                id={`mind-panel-${current.id}`}
                aria-labelledby={`mind-tab-${current.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: easeOut }}
              >
                <h3 className={styles.stageTitle}>{current.summary}</h3>
                <div className={styles.art}>
                  <MindScenes scene={current.scene} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
