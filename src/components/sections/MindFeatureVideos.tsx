import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { mindFeatureVideos } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import styles from "./MindFeatureVideos.module.css";

function useGridColumns(): number {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 901px)").matches) setCols(3);
      else if (window.matchMedia("(min-width: 541px)").matches) setCols(2);
      else setCols(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cols;
}

type FeatureCardProps = {
  item: (typeof mindFeatureVideos.items)[number];
  index: number;
  inView: boolean;
  reduceMotion: boolean;
};

function FeatureCard({ item, index, inView, reduceMotion }: FeatureCardProps) {
  return (
    <motion.li
      className={styles.card}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05, ease: easeOut }}
    >
      <button
        type="button"
        className={styles.thumbBtn}
        aria-label={`Riproduci video: ${item.title}`}
        disabled={!item.videoUrl}
        onClick={() => {
          if (item.videoUrl) window.open(item.videoUrl, "_blank", "noopener,noreferrer");
        }}
      >
        <span className={styles.thumb}>
          <span className={styles.play} aria-hidden>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.duration}>{item.duration}</span>
        </span>
      </button>
      <h3 className={styles.cardTitle}>{item.title}</h3>
    </motion.li>
  );
}

/**
 * Griglia di card video: prima riga visibile, le altre espandibili.
 */
export function MindFeatureVideos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const motionSafe = reduceMotion !== true;
  const cols = useGridColumns();
  const [expanded, setExpanded] = useState(false);

  const items = mindFeatureVideos.items;
  const firstRow = items.slice(0, cols);
  const rest = items.slice(cols);
  const hasMore = rest.length > 0;

  return (
    <section
      ref={ref}
      id="funzionalita"
      className={styles.section}
      aria-labelledby="mind-features-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{mindFeatureVideos.eyebrow}</p>
          <h2 id="mind-features-heading" className={styles.title}>
            {mindFeatureVideos.title}
          </h2>
        </header>

        <ul className={styles.grid}>
          {firstRow.map((item, index) => (
            <FeatureCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
              reduceMotion={!motionSafe}
            />
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {expanded && hasMore ? (
            <motion.div
              key="more-features"
              id="mind-feature-videos-more"
              className={styles.moreWrap}
              initial={motionSafe ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              exit={motionSafe ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: motionSafe ? 0.45 : 0, ease: easeOut }}
            >
              <ul className={styles.grid}>
                {rest.map((item, index) => (
                  <FeatureCard
                    key={item.id}
                    item={item}
                    index={firstRow.length + index}
                    inView={inView}
                    reduceMotion={!motionSafe}
                  />
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {hasMore ? (
          <div className={styles.ctaWrap}>
            <button
              type="button"
              className={styles.toggleBtn}
              aria-expanded={expanded}
              aria-controls="mind-feature-videos-more"
              onClick={() => setExpanded((open) => !open)}
            >
              {expanded ? mindFeatureVideos.collapseLabel : mindFeatureVideos.expandLabel}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
