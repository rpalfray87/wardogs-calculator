import type { ReactNode, RefObject } from 'react';
import type { Point } from '../core/ballistics';
import { CoordInput } from './CoordInput';

export interface CoordFields {
  x: string;
  y: string;
}

export const EMPTY_FIELDS: CoordFields = { x: '', y: '' };

interface PointBlockProps {
  idPrefix: string;
  title: string;
  value: CoordFields;
  onChange: (next: CoordFields) => void;
  action?: ReactNode;
  xRef?: RefObject<HTMLInputElement>;
}

export function PointBlock({
  idPrefix,
  title,
  value,
  onChange,
  action,
  xRef,
}: PointBlockProps) {
  function fillFromPair(pair: Point) {
    onChange({ x: String(pair.x), y: String(pair.y) });
  }

  return (
    <section className="block">
      <div className="block__head">
        <h2 className="block__title">{title}</h2>
        {action}
      </div>
      <div className="block__grid">
        <CoordInput
          id={`${idPrefix}-x`}
          axis="X"
          fullLabel={`${title} X`}
          value={value.x}
          onChange={(x) => onChange({ ...value, x })}
          onPastePair={fillFromPair}
          inputRef={xRef}
        />
        <CoordInput
          id={`${idPrefix}-y`}
          axis="Y"
          fullLabel={`${title} Y`}
          value={value.y}
          onChange={(y) => onChange({ ...value, y })}
          onPastePair={fillFromPair}
        />
      </div>
    </section>
  );
}
