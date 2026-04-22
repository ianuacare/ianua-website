import { Fragment } from "react";
import type { Segment } from "../copy/home";

type EditorialTextProps = {
  lines: Segment[][];
  italicClassName?: string;
  boldClassName?: string;
  lineClassName?: string;
};

function renderSegment(
  seg: Segment,
  segIdx: number,
  italicClassName?: string,
  boldClassName?: string,
) {
  const key = segIdx;
  if (seg.bold && seg.italic) {
    return (
      <strong key={key} className={boldClassName}>
        <em className={italicClassName}>{seg.text}</em>
      </strong>
    );
  }
  if (seg.bold) {
    return (
      <strong key={key} className={boldClassName}>
        {seg.text}
      </strong>
    );
  }
  if (seg.italic) {
    return (
      <em key={key} className={italicClassName}>
        {seg.text}
      </em>
    );
  }
  return <Fragment key={key}>{seg.text}</Fragment>;
}

/**
 * Renderizza testo a più righe con segmenti in italic distinguibili
 * tramite className dedicata, così da poter applicare animazioni e accenti
 * tipografici editoriali (Helvetica Neue Light Italic).
 * Segmenti `bold` usano il tag semantic strong con peso moderato tramite CSS.
 */
export function EditorialText({
  lines,
  italicClassName,
  boldClassName,
  lineClassName,
}: EditorialTextProps) {
  return (
    <>
      {lines.map((segments, lineIdx) => (
        <span key={lineIdx} className={lineClassName}>
          {segments.map((seg, segIdx) =>
            renderSegment(seg, segIdx, italicClassName, boldClassName),
          )}
        </span>
      ))}
    </>
  );
}
