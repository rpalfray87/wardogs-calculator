import type { ClipboardEvent, RefObject } from 'react';
import type { Point } from '../core/ballistics';
import { isBlank, parseCoord, parsePair } from '../core/parse';

interface CoordInputProps {
  id: string;
  /** Shown as a chip inside the field, which saves a whole label line. */
  axis: 'X' | 'Y';
  /** Full name announced by screen readers, e.g. "Target X". */
  fullLabel: string;
  value: string;
  onChange: (value: string) => void;
  /** Called when an "X Y" pair is pasted, so both fields fill at once. */
  onPastePair?: (pair: Point) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export function CoordInput({
  id,
  axis,
  fullLabel,
  value,
  onChange,
  onPastePair,
  inputRef,
}: CoordInputProps) {
  const invalid = !isBlank(value) && parseCoord(value) === null;

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    if (!onPastePair) return;
    const pair = parsePair(event.clipboardData.getData('text'));
    if (!pair) return;
    event.preventDefault();
    onPastePair(pair);
  }

  return (
    <div className="field">
      <span className="field__tag" aria-hidden="true">
        {axis}
      </span>
      <input
        id={id}
        ref={inputRef}
        // type="text" rather than "number": spinners, the scroll wheel and
        // type=number rejecting commas all make fast entry painful.
        type="text"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label={fullLabel}
        aria-invalid={invalid}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={handlePaste}
        onFocus={(event) => event.target.select()}
      />
    </div>
  );
}
