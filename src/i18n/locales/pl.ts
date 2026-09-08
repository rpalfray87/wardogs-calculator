import type { Dict } from '../dict';

export const pl: Dict = {
  'titlebar.settings': 'Ustawienia i kalibracja',
  'titlebar.hide': 'Ukryj nakładkę (Esc)',
  'titlebar.back': 'Powrót do kalkulatora',
  'settings.title': 'Ustawienia · kalibracja',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Moja pozycja',
  'point.target': 'Cel',
  'point.clear': 'Wyczyść',
  'point.clearOrigin': 'Wyczyść moją pozycję',
  'point.clearTarget': 'Wyczyść cel',

  'result.azimuth': 'Azymut',
  'result.distance': 'Odległość',
  'result.copyTitle': 'Kliknij, aby skopiować',
  'result.copied': 'Skopiowano: {label}',
  'result.copyFailed': 'kopiowanie niemożliwe',
  'result.saved': 'Cel zapisany',
  'hint.ready': 'Enter zapisuje · kliknij liczbę, aby ją skopiować',
  'hint.incomplete': 'Uzupełnij wszystkie cztery współrzędne.',

  'history.title': 'Historia',
  'history.clearAction': 'Wyczyść',
  'history.clearTitle': 'Wyczyść historię',
  'history.empty': '{key} zapisuje bieżący cel.',
  'history.load': 'Wczytaj ten cel ponownie',
  'history.delete': 'Usuń ten cel',
  'history.deleteAria': 'Usuń cel {label}',

  'footer.overlay': '{hotkey} pokazuje / ukrywa · {esc} oddaje sterowanie grze',
  'footer.web': 'Azymut 0° = Północ, zgodnie z ruchem wskazówek zegara.',

  'set.language.label': 'Język',
  'set.language.help': 'Język interfejsu. Domyślnie angielski.',
  'set.scale.label': 'Metry na punkt współrzędnych',
  'set.scale.help':
    'Założenie wyjściowe: 10 punktów = 1000 m, czyli 100 m na punkt. Jeśli podawana odległość jest w grze proporcjonalnie błędna, poprawia się ją tutaj.',
  'set.yaxis.label': 'Zwrot osi Y',
  'set.yaxis.up': 'Y rośnie w kierunku północy',
  'set.yaxis.down': 'Y rośnie w kierunku południa',
  'set.yaxis.help':
    'Jeśli wyświetlany azymut jest w grze przesunięty o 180°, to właśnie to ustawienie należy przełączyć.',
  'set.unit.label': 'Jednostka azymutu',
  'set.unit.deg': 'Stopnie (0-360)',
  'set.unit.mil': 'Tysięczne',
  'set.unit.help':
    'Zostaw stopnie, dopóki kompas w grze nie zostanie zweryfikowany. Tysięczne na celowniku służą do podniesienia lufy, a nie do kierunku.',
  'set.mil.label': 'Standard tysięcznych',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — dawny Układ Warszawski',
  'set.hotkey.label': 'Skrót globalny',
  'set.hotkey.help': 'Składnia Electron: Alt+M, Ctrl+Shift+A, F8. Pokazuje i ukrywa nakładkę.',
  'set.hotkey.error': 'Skrót „{key}” odrzucony lub już zajęty.',
  'set.hotkey.errorGeneric': 'Skrót nie do zastosowania.',
  'set.opacity.label': 'Krycie nakładki — {percent} %',
  'set.reset': 'Przywróć ustawienia domyślne',
};
