import type { Dict } from '../dict';

export const nl: Dict = {
  'titlebar.settings': 'Instellingen en kalibratie',
  'titlebar.hide': 'Overlay verbergen (Esc)',
  'titlebar.back': 'Terug naar de calculator',
  'settings.title': 'Instellingen · kalibratie',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Mijn positie',
  'point.target': 'Doel',
  'point.clear': 'Wissen',
  'point.clearOrigin': 'Mijn positie wissen',
  'point.clearTarget': 'Het doel wissen',

  'result.azimuth': 'Azimut',
  'result.distance': 'Afstand',
  'result.copyTitle': 'Klik om te kopiëren',
  'result.copied': '{label} gekopieerd',
  'result.copyFailed': 'kopiëren mislukt',
  'result.saved': 'Doel opgeslagen',
  'hint.ready': 'Enter slaat op · klik op een getal om het te kopiëren',
  'hint.incomplete': 'Vul alle vier de coördinaten in.',

  'history.title': 'Geschiedenis',
  'history.clearAction': 'Legen',
  'history.clearTitle': 'De geschiedenis legen',
  'history.empty': '{key} slaat het huidige doel op.',
  'history.load': 'Dit doel opnieuw laden',
  'history.delete': 'Dit doel verwijderen',
  'history.deleteAria': 'Doel {label} verwijderen',

  'footer.overlay': '{hotkey} toont / verbergt · {esc} geeft de besturing terug aan het spel',
  'footer.web': 'Azimut 0° = Noorden, met de klok mee.',

  'set.language.label': 'Taal',
  'set.language.help': 'Taal van de interface. Engels is de standaard.',
  'set.scale.label': 'Meter per coördinaatpunt',
  'set.scale.help':
    'Uitgangspunt: 10 punten = 1000 m, dus 100 m per punt. Als de getoonde afstand in het spel proportioneel verkeerd is, corrigeer je dat hier.',
  'set.yaxis.label': 'Richting van de Y-as',
  'set.yaxis.up': 'Y neemt toe naar het Noorden',
  'set.yaxis.down': 'Y neemt toe naar het Zuiden',
  'set.yaxis.help':
    'Als de getoonde azimut in het spel 180° afwijkt, is dit de instelling die je moet omzetten.',
  'set.unit.label': 'Eenheid van de azimut',
  'set.unit.deg': 'Graden (0-360)',
  'set.unit.mil': 'Streepjes (mil)',
  'set.unit.help':
    'Laat het op graden staan zolang het kompas in het spel niet is gecontroleerd. De mils op het vizier dienen voor de buiselevatie, niet voor de richting.',
  'set.mil.label': 'Mil-standaard',
  'set.mil.nato': '6400 — NAVO',
  'set.mil.warsaw': '6000 — voormalig Warschaupact',
  'set.hotkey.label': 'Globale sneltoets',
  'set.hotkey.help': 'Electron-syntaxis: Alt+M, Ctrl+Shift+A, F8. Toont en verbergt de overlay.',
  'set.hotkey.error': 'Sneltoets “{key}” geweigerd of al bezet.',
  'set.hotkey.errorGeneric': 'Sneltoets niet toepasbaar.',
  'set.opacity.label': 'Dekking van de overlay — {percent} %',
  'set.reset': 'Instellingen herstellen',
};
