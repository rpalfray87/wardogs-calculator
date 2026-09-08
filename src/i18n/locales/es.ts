import type { Dict } from '../dict';

export const es: Dict = {
  'titlebar.settings': 'Ajustes y calibración',
  'titlebar.hide': 'Ocultar la superposición (Esc)',
  'titlebar.back': 'Volver a la calculadora',
  'settings.title': 'Ajustes · calibración',

  'key.enter': 'Intro',
  'key.esc': 'Esc',

  'point.origin': 'Mi posición',
  'point.target': 'Objetivo',
  'point.clear': 'Borrar',
  'point.clearOrigin': 'Borrar mi posición',
  'point.clearTarget': 'Borrar el objetivo',

  'result.azimuth': 'Azimut',
  'result.distance': 'Distancia',
  'result.copyTitle': 'Haz clic para copiar',
  'result.copied': '{label} copiado',
  'result.copyFailed': 'no se pudo copiar',
  'result.saved': 'Objetivo guardado',
  'hint.ready': 'Intro guarda · haz clic en un número para copiarlo',
  'hint.incomplete': 'Rellena las cuatro coordenadas.',

  'history.title': 'Historial',
  'history.clearAction': 'Vaciar',
  'history.clearTitle': 'Vaciar el historial',
  'history.empty': '{key} guarda el objetivo actual.',
  'history.load': 'Recargar este objetivo',
  'history.delete': 'Eliminar este objetivo',
  'history.deleteAria': 'Eliminar el objetivo {label}',

  'footer.overlay': '{hotkey} muestra / oculta · {esc} devuelve el control al juego',
  'footer.web': 'Azimut 0° = Norte, sentido horario.',

  'set.language.label': 'Idioma',
  'set.language.help': 'Idioma de la interfaz. El inglés es el valor por defecto.',
  'set.scale.label': 'Metros por punto de coordenada',
  'set.scale.help':
    'Hipótesis inicial: 10 puntos = 1000 m, es decir 100 m por punto. Si la distancia indicada es proporcionalmente errónea en el juego, se corrige aquí.',
  'set.yaxis.label': 'Sentido del eje Y',
  'set.yaxis.up': 'Y aumenta hacia el Norte',
  'set.yaxis.down': 'Y aumenta hacia el Sur',
  'set.yaxis.help':
    'Si el azimut mostrado está desfasado 180° en el juego, este es el ajuste que hay que invertir.',
  'set.unit.label': 'Unidad del azimut',
  'set.unit.deg': 'Grados (0-360)',
  'set.unit.mil': 'Milésimas',
  'set.unit.help':
    'Déjalo en grados mientras no se haya verificado la brújula del juego. Las milésimas de la mira sirven para la elevación del tubo, no para la dirección.',
  'set.mil.label': 'Estándar de milésimas',
  'set.mil.nato': '6400 — OTAN',
  'set.mil.warsaw': '6000 — antiguo Pacto de Varsovia',
  'set.hotkey.label': 'Atajo global',
  'set.hotkey.help':
    'Sintaxis de Electron: Alt+M, Ctrl+Shift+A, F8. Muestra y oculta la superposición.',
  'set.hotkey.error': 'Atajo «{key}» rechazado o ya ocupado.',
  'set.hotkey.errorGeneric': 'Atajo no aplicable.',
  'set.opacity.label': 'Opacidad de la superposición — {percent} %',
  'set.reset': 'Restablecer los ajustes',
};
