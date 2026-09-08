import type { Dict } from '../dict';

export const it: Dict = {
  'titlebar.settings': 'Impostazioni e calibrazione',
  'titlebar.hide': "Nascondi l'overlay (Esc)",
  'titlebar.back': 'Torna al calcolatore',
  'settings.title': 'Impostazioni · calibrazione',

  'key.enter': 'Invio',
  'key.esc': 'Esc',

  'point.origin': 'La mia posizione',
  'point.target': 'Bersaglio',
  'point.clear': 'Cancella',
  'point.clearOrigin': 'Cancella la mia posizione',
  'point.clearTarget': 'Cancella il bersaglio',

  'result.azimuth': 'Azimut',
  'result.distance': 'Distanza',
  'result.copyTitle': 'Clicca per copiare',
  'result.copied': '{label} copiato',
  'result.copyFailed': 'copia impossibile',
  'result.saved': 'Bersaglio memorizzato',
  'hint.ready': 'Invio memorizza · clicca su un numero per copiarlo',
  'hint.incomplete': 'Compila tutte e quattro le coordinate.',

  'history.title': 'Cronologia',
  'history.clearAction': 'Svuota',
  'history.clearTitle': 'Svuota la cronologia',
  'history.empty': '{key} memorizza il bersaglio corrente.',
  'history.load': 'Ricarica questo bersaglio',
  'history.delete': 'Elimina questo bersaglio',
  'history.deleteAria': 'Elimina il bersaglio {label}',

  'footer.overlay': '{hotkey} mostra / nasconde · {esc} restituisce il controllo al gioco',
  'footer.web': 'Azimut 0° = Nord, senso orario.',

  'set.language.label': 'Lingua',
  'set.language.help': "Lingua dell'interfaccia. L'inglese è il valore predefinito.",
  'set.scale.label': 'Metri per punto di coordinata',
  'set.scale.help':
    'Ipotesi di partenza: 10 punti = 1000 m, cioè 100 m per punto. Se la distanza indicata è proporzionalmente sbagliata nel gioco, si corregge qui.',
  'set.yaxis.label': "Verso dell'asse Y",
  'set.yaxis.up': 'Y cresce verso Nord',
  'set.yaxis.down': 'Y cresce verso Sud',
  'set.yaxis.help':
    "Se l'azimut mostrato è sfalsato di 180° nel gioco, è questa l'impostazione da invertire.",
  'set.unit.label': "Unità dell'azimut",
  'set.unit.deg': 'Gradi (0-360)',
  'set.unit.mil': 'Millesimi',
  'set.unit.help':
    "Lascia in gradi finché la bussola del gioco non è stata verificata. I millesimi del mirino servono all'elevazione del tubo, non alla direzione.",
  'set.mil.label': 'Standard dei millesimi',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — ex Patto di Varsavia',
  'set.hotkey.label': 'Scorciatoia globale',
  'set.hotkey.help': "Sintassi Electron: Alt+M, Ctrl+Shift+A, F8. Mostra e nasconde l'overlay.",
  'set.hotkey.error': 'Scorciatoia «{key}» rifiutata o già occupata.',
  'set.hotkey.errorGeneric': 'Scorciatoia non applicabile.',
  'set.opacity.label': "Opacità dell'overlay — {percent} %",
  'set.reset': 'Ripristina le impostazioni',
};
