import type { ClipboardEvent, RefObject } from 'react';
import type { Point } from '../core/ballistics';
import { isBlank, parseCoord, parsePair } from '../core/parse';

interface CoordInputProps {
  id: string;
  /** Affiche en pastille dans le champ : gagne la hauteur d'une ligne de label. */
  axis: 'X' | 'Y';
  /** Nom complet lu par les lecteurs d'ecran, ex. "Cible X". */
  fullLabel: string;
  value: string;
  onChange: (value: string) => void;
  /** Appele quand on colle une paire "X Y" : remplit les deux champs d'un coup. */
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
        // type="text" et non "number" : les spinners, la molette et le rejet de la
        // virgule par type=number rendent la saisie rapide penible.
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
