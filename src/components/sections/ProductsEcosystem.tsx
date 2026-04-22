import type { MouseEvent } from "react";
import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ecosystemLead, ecosystemTitle, products } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import mindWordmark from "../../assets/branding/Ianuamind_bianco.svg";
import studioWordmark from "../../assets/branding/Ianuastudio_bianco.svg";
import { easeOut } from "./_motion";
import styles from "./ProductsEcosystem.module.css";

const wordmarks: Record<string, string> = {
  mind: mindWordmark,
  studio: studioWordmark,
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.05 + i * 0.12, ease: easeOut },
  }),
};

const bulletVariants = {
  hidden: { opacity: 0, x: -16 },
  shown: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: 0.4 + i * 0.06, ease: easeOut },
  }),
};

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.25 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 220,
    damping: 22,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 60%)`,
  );

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const accentClass = product.key === "mind" ? styles.cardMind : styles.cardStudio;

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${accentClass}`}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }
      }
    >
      {!reduce ? (
        <motion.div className={styles.cardGlow} aria-hidden style={{ background: glowBg }} />
      ) : null}

      <div className={styles.cardHead}>
        <p className={styles.cardEyebrow}>{product.eyebrow}</p>
        <span className={styles.cardIndex}>{`0${index + 1}`}</span>
      </div>

      <div className={styles.cardWordmarkRow}>
        <h3 className={styles.cardName}>
          <span className={styles.srOnly}>{product.name}</span>
          <img
            src={wordmarks[product.key]}
            alt=""
            aria-hidden
            className={styles.cardWordmark}
            loading="lazy"
          />
        </h3>
      </div>

      <p className={styles.cardTagline}>{product.tagline}</p>
      <p className={styles.cardBody}>
        <EditorialText lines={[product.bodySegments]} boldClassName={styles.bodyStrong} />
      </p>

      <ul className={styles.bulletList} role="list">
        {product.bullets.map((bullet, bi) => (
          <motion.li
            key={bullet}
            className={styles.bullet}
            custom={bi}
            variants={bulletVariants}
            initial="hidden"
            animate={inView ? "shown" : "hidden"}
          >
            <span className={styles.bulletMark} aria-hidden>
              +
            </span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>

      <a className={styles.cardCta} href={product.cta.href}>
        <span>{product.cta.label}</span>
        <span aria-hidden className={styles.cardCtaArrow}>
          →
        </span>
      </a>
    </motion.article>
  );
}

export function ProductsEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="ecosistema"
      className={styles.section}
      aria-labelledby="ecosistema-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            Ecosistema prodotti
          </p>
          <motion.h2
            id="ecosistema-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <EditorialText
              lines={ecosystemTitle}
              italicClassName={styles.titleItalic}
              boldClassName={styles.titleStrong}
              lineClassName={styles.titleLine}
            />
          </motion.h2>
          <motion.p
            className={styles.lead}
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          >
            <EditorialText lines={[ecosystemLead]} boldClassName={styles.leadStrong} />
          </motion.p>
        </header>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard key={p.key} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
