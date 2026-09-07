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
  onEnter?: () => void;
  action?: ReactNode;
  xRef?: RefObject<HTMLInputElement>;
  yRef?: RefObject<HTMLInputElement>;
}

export function PointBlock({
  idPrefix,
  title,
  value,
  onChange,
  onEnter,
  action,
  xRef,
  yRef,
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
          label="X"
          value={value.x}
          onChange={(x) => onChange({ ...value, x })}
          onPastePair={fillFromPair}
          onEnter={onEnter}
          inputRef={xRef}
        />
        <CoordInput
          id={`${idPrefix}-y`}
          label="Y"
          value={value.y}
          onChange={(y) => onChange({ ...value, y })}
          onPastePair={fillFromPair}
          onEnter={onEnter}
          inputRef={yRef}
        />
      </div>
    </section>
  );
}
