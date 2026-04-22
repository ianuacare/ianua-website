import { useEffect, useRef, useState } from "react";

type Options = {
  start?: number;
  duration?: number;
  decimals?: number;
  enabled?: boolean;
};

/**
 * Conta da `start` a `end` quando `enabled` diventa true.
 * Usata in coppia con motion `useInView({ once: true })`.
 */
export function useCountUp(
  end: number,
  { start = 0, duration = 1400, decimals = 0, enabled = true }: Options = {},
) {
  const [value, setValue] = useState(start);
  const startedAt = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    startedAt.current = null;

    const step = (ts: number) => {
      if (startedAt.current === null) startedAt.current = ts;
      const elapsed = ts - startedAt.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = start + (end - start) * eased;
      setValue(next);
      if (t < 1) rafId.current = requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [end, start, duration, enabled]);

  return Number(value.toFixed(decimals));
}
