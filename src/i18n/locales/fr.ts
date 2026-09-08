import type { Dict } from '../dict';

export const fr: Dict = {
  'titlebar.settings': 'Réglages et calibration',
  'titlebar.hide': "Masquer l'overlay (Échap)",
  'titlebar.back': 'Retour au calculateur',
  'settings.title': 'Réglages · calibration',

  'key.enter': 'Entrée',
  'key.esc': 'Échap',

  'point.origin': 'Ma position',
  'point.target': 'Cible',
  'point.clear': 'Effacer',
  'point.clearOrigin': 'Effacer ma position',
  'point.clearTarget': 'Effacer la cible',

  'result.azimuth': 'Azimut',
  'result.distance': 'Distance',
  'result.copyTitle': 'Cliquer pour copier',
  'result.copied': '{label} copié',
  'result.copyFailed': 'copie impossible',
  'result.saved': 'Cible mémorisée',
  'hint.ready': 'Entrée mémorise · clic sur un chiffre le copie',
  'hint.incomplete': 'Renseigne les quatre coordonnées.',

  'history.title': 'Historique',
  'history.clearAction': 'Vider',
  'history.clearTitle': "Vider l'historique",
  'history.empty': '{key} mémorise la cible en cours.',
  'history.load': 'Recharger cette cible',
  'history.delete': 'Supprimer cette cible',
  'history.deleteAria': 'Supprimer la cible {label}',

  'footer.overlay': '{hotkey} affiche / masque · {esc} rend la main au jeu',
  'footer.web': 'Azimut 0° = Nord, rotation horaire.',

  'set.language.label': 'Langue',
  'set.language.help': "Langue de l'interface. L'anglais est la valeur par défaut.",
  'set.scale.label': 'Mètres par point de coordonnée',
  'set.scale.help':
    "Hypothèse de départ : 10 points = 1000 m, soit 100 m par point. Si la distance annoncée est proportionnellement fausse en jeu, c'est ici qu'on corrige.",
  'set.yaxis.label': "Sens de l'axe Y",
  'set.yaxis.up': 'Y augmente vers le Nord',
  'set.yaxis.down': 'Y augmente vers le Sud',
  'set.yaxis.help':
    "Si l'azimut affiché est décalé de 180° en jeu, c'est ce réglage qu'il faut basculer.",
  'set.unit.label': "Unité de l'azimut",
  'set.unit.deg': 'Degrés (0-360)',
  'set.unit.mil': 'Millièmes',
  'set.unit.help':
    "À laisser en degrés tant que la boussole du jeu n'a pas été vérifiée. Les millièmes du viseur servent à l'élévation du tube, pas à la direction.",
  'set.mil.label': 'Standard des millièmes',
  'set.mil.nato': '6400 — OTAN',
  'set.mil.warsaw': '6000 — ex-Pacte de Varsovie',
  'set.hotkey.label': 'Raccourci global',
  'set.hotkey.help': "Syntaxe Electron : Alt+M, Ctrl+Shift+A, F8. Affiche et masque l'overlay.",
  'set.hotkey.error': 'Raccourci « {key} » refusé ou déjà pris.',
  'set.hotkey.errorGeneric': 'Raccourci non applicable.',
  'set.opacity.label': "Opacité de l'overlay — {percent} %",
  'set.reset': 'Réinitialiser les réglages',
};
