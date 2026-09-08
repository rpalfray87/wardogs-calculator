/** Dictionnaire de reference : c'est lui qui definit les cles disponibles. */
export const en = {
  'titlebar.settings': 'Settings and calibration',
  'titlebar.hide': 'Hide the overlay (Esc)',
  'titlebar.back': 'Back to the calculator',
  'settings.title': 'Settings · calibration',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'My position',
  'point.target': 'Target',
  'point.clear': 'Clear',
  'point.clearOrigin': 'Clear my position',
  'point.clearTarget': 'Clear the target',

  'result.azimuth': 'Azimuth',
  'result.distance': 'Distance',
  'result.copyTitle': 'Click to copy',
  'result.copied': '{label} copied',
  'result.copyFailed': 'copy failed',
  'result.saved': 'Target saved',
  'hint.ready': 'Enter saves · click a number to copy it',
  'hint.incomplete': 'Fill in all four coordinates.',

  'history.title': 'History',
  'history.clearAction': 'Clear',
  'history.clearTitle': 'Clear the history',
  'history.empty': '{key} saves the current target.',
  'history.load': 'Reload this target',
  'history.delete': 'Delete this target',
  'history.deleteAria': 'Delete target {label}',

  'footer.overlay': '{hotkey} shows / hides · {esc} gives control back to the game',
  'footer.web': 'Azimuth 0° = North, clockwise.',

  'set.language.label': 'Language',
  'set.language.help': 'Interface language. English is the default.',
  'set.scale.label': 'Meters per coordinate point',
  'set.scale.help':
    'Starting assumption: 10 points = 1000 m, i.e. 100 m per point. If the reported distance is proportionally wrong in game, this is where to correct it.',
  'set.yaxis.label': 'Direction of the Y axis',
  'set.yaxis.up': 'Y increases towards the North',
  'set.yaxis.down': 'Y increases towards the South',
  'set.yaxis.help': 'If the azimuth shown is off by 180° in game, this is the setting to flip.',
  'set.unit.label': 'Azimuth unit',
  'set.unit.deg': 'Degrees (0-360)',
  'set.unit.mil': 'Mils',
  'set.unit.help':
    'Leave it on degrees until the in-game compass has been checked. The mils on the sight are for tube elevation, not for direction.',
  'set.mil.label': 'Mil standard',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — former Warsaw Pact',
  'set.hotkey.label': 'Global shortcut',
  'set.hotkey.help':
    'Electron syntax: Alt+M, Ctrl+Shift+A, F8. Shows and hides the overlay.',
  'set.hotkey.error': 'Shortcut “{key}” rejected or already taken.',
  'set.hotkey.errorGeneric': 'Shortcut not applicable.',
  'set.opacity.label': 'Overlay opacity — {percent} %',
  'set.reset': 'Reset the settings',
};
