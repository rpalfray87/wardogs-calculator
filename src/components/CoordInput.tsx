import type { ClipboardEvent, KeyboardEvent, RefObject } from 'react';
import type { Point } from '../core/ballistics';
import { isBlank, parseCoord, parsePair } from '../core/parse';

interface CoordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Appele quand on colle une paire "X Y" : permet de remplir les deux champs. */
  onPastePair?: (pair: Point) => void;
  onEnter?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export function CoordInput({
  id,
  label,
  value,
  onChange,
  onPastePair,
  onEnter,
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

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && onEnter) {
      event.preventDefault();
      onEnter();
    }
  }

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        // type="text" et non "number" : les spinners, la molette et le rejet de la
        // virgule par type=number rendent la saisie rapide penible.
        type="text"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="—"
        aria-invalid={invalid}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={(event) => event.target.select()}
      />
    </div>
  );
}
