import type { Dict } from '../dict';

export const de: Dict = {
  'titlebar.settings': 'Einstellungen und Kalibrierung',
  'titlebar.hide': 'Overlay ausblenden (Esc)',
  'titlebar.back': 'Zurück zum Rechner',
  'settings.title': 'Einstellungen · Kalibrierung',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Meine Position',
  'point.target': 'Ziel',
  'point.clear': 'Löschen',
  'point.clearOrigin': 'Meine Position löschen',
  'point.clearTarget': 'Ziel löschen',

  'result.azimuth': 'Azimut',
  'result.distance': 'Entfernung',
  'result.copyTitle': 'Zum Kopieren klicken',
  'result.copied': '{label} kopiert',
  'result.copyFailed': 'Kopieren fehlgeschlagen',
  'result.saved': 'Ziel gespeichert',
  'hint.ready': 'Enter speichert · Klick auf eine Zahl kopiert sie',
  'hint.incomplete': 'Trage alle vier Koordinaten ein.',

  'history.title': 'Verlauf',
  'history.clearAction': 'Leeren',
  'history.clearTitle': 'Verlauf leeren',
  'history.empty': '{key} speichert das aktuelle Ziel.',
  'history.load': 'Dieses Ziel erneut laden',
  'history.delete': 'Dieses Ziel löschen',
  'history.deleteAria': 'Ziel {label} löschen',

  'footer.overlay': '{hotkey} zeigt / verbirgt · {esc} gibt die Kontrolle ans Spiel zurück',
  'footer.web': 'Azimut 0° = Norden, im Uhrzeigersinn.',

  'set.language.label': 'Sprache',
  'set.language.help': 'Sprache der Oberfläche. Englisch ist die Voreinstellung.',
  'set.scale.label': 'Meter pro Koordinatenpunkt',
  'set.scale.help':
    'Ausgangsannahme: 10 Punkte = 1000 m, also 100 m pro Punkt. Wenn die angezeigte Entfernung im Spiel proportional falsch ist, wird sie hier korrigiert.',
  'set.yaxis.label': 'Richtung der Y-Achse',
  'set.yaxis.up': 'Y wächst nach Norden',
  'set.yaxis.down': 'Y wächst nach Süden',
  'set.yaxis.help':
    'Wenn der angezeigte Azimut im Spiel um 180° abweicht, ist das die Einstellung, die umgestellt werden muss.',
  'set.unit.label': 'Einheit des Azimuts',
  'set.unit.deg': 'Grad (0-360)',
  'set.unit.mil': 'Strich (mil)',
  'set.unit.help':
    'Auf Grad lassen, solange der Kompass im Spiel nicht überprüft wurde. Die Strich-Werte im Visier dienen der Rohrerhöhung, nicht der Richtung.',
  'set.mil.label': 'Strich-Standard',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — ehemaliger Warschauer Pakt',
  'set.hotkey.label': 'Globales Tastenkürzel',
  'set.hotkey.help': 'Electron-Syntax: Alt+M, Ctrl+Shift+A, F8. Blendet das Overlay ein und aus.',
  'set.hotkey.error': 'Tastenkürzel „{key}“ abgelehnt oder bereits belegt.',
  'set.hotkey.errorGeneric': 'Tastenkürzel nicht anwendbar.',
  'set.opacity.label': 'Deckkraft des Overlays — {percent} %',
  'set.reset': 'Einstellungen zurücksetzen',
};
