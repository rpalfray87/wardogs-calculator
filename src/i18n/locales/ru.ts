import type { Dict } from '../dict';

export const ru: Dict = {
  'titlebar.settings': 'Настройки и калибровка',
  'titlebar.hide': 'Скрыть оверлей (Esc)',
  'titlebar.back': 'Назад к калькулятору',
  'settings.title': 'Настройки · калибровка',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Моя позиция',
  'point.target': 'Цель',
  'point.clear': 'Очистить',
  'point.clearOrigin': 'Очистить мою позицию',
  'point.clearTarget': 'Очистить цель',

  'result.azimuth': 'Азимут',
  'result.distance': 'Дальность',
  'result.copyTitle': 'Нажмите, чтобы скопировать',
  'result.copied': '{label} скопирован',
  'result.copyFailed': 'скопировать не удалось',
  'result.saved': 'Цель сохранена',
  'hint.ready': 'Enter сохраняет · клик по числу копирует его',
  'hint.incomplete': 'Заполните все четыре координаты.',

  'history.title': 'История',
  'history.clearAction': 'Очистить',
  'history.clearTitle': 'Очистить историю',
  'history.empty': '{key} сохраняет текущую цель.',
  'history.load': 'Загрузить эту цель заново',
  'history.delete': 'Удалить эту цель',
  'history.deleteAria': 'Удалить цель {label}',

  'footer.overlay': '{hotkey} показывает / скрывает · {esc} возвращает управление игре',
  'footer.web': 'Азимут 0° = север, по часовой стрелке.',

  'set.language.label': 'Язык',
  'set.language.help': 'Язык интерфейса. По умолчанию английский.',
  'set.scale.label': 'Метров на единицу координат',
  'set.scale.help':
    'Исходное допущение: 10 единиц = 1000 м, то есть 100 м на единицу. Если показанная дальность пропорционально расходится с игрой, исправьте её здесь.',
  'set.yaxis.label': 'Направление оси Y',
  'set.yaxis.up': 'Y возрастает на север',
  'set.yaxis.down': 'Y возрастает на юг',
  'set.yaxis.help':
    'Если показанный азимут в игре смещён на 180°, переключить нужно именно эту настройку.',
  'set.unit.label': 'Единица азимута',
  'set.unit.deg': 'Градусы (0-360)',
  'set.unit.mil': 'Тысячные',
  'set.unit.help':
    'Оставьте градусы, пока компас в игре не проверен. Тысячные на прицеле служат для возвышения ствола, а не для направления.',
  'set.mil.label': 'Стандарт тысячных',
  'set.mil.nato': '6400 — НАТО',
  'set.mil.warsaw': '6000 — бывший Варшавский договор',
  'set.hotkey.label': 'Глобальное сочетание клавиш',
  'set.hotkey.help': 'Синтаксис Electron: Alt+M, Ctrl+Shift+A, F8. Показывает и скрывает оверлей.',
  'set.hotkey.error': 'Сочетание «{key}» отклонено или уже занято.',
  'set.hotkey.errorGeneric': 'Сочетание неприменимо.',
  'set.opacity.label': 'Непрозрачность оверлея — {percent} %',
  'set.reset': 'Сбросить настройки',
};
