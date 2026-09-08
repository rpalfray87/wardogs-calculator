import type { Dict } from '../dict';

export const ko: Dict = {
  'titlebar.settings': '설정 및 보정',
  'titlebar.hide': '오버레이 숨기기 (Esc)',
  'titlebar.back': '계산기로 돌아가기',
  'settings.title': '설정 · 보정',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': '내 위치',
  'point.target': '목표',
  'point.clear': '지우기',
  'point.clearOrigin': '내 위치 지우기',
  'point.clearTarget': '목표 지우기',

  'result.azimuth': '방위각',
  'result.distance': '거리',
  'result.copyTitle': '클릭하면 복사됩니다',
  'result.copied': '{label} 복사됨',
  'result.copyFailed': '복사할 수 없음',
  'result.saved': '목표 저장됨',
  'hint.ready': 'Enter로 저장 · 숫자를 클릭하면 복사',
  'hint.incomplete': '네 개의 좌표를 모두 입력하세요.',

  'history.title': '기록',
  'history.clearAction': '비우기',
  'history.clearTitle': '기록 비우기',
  'history.empty': '{key} 키로 현재 목표를 저장합니다.',
  'history.load': '이 목표 다시 불러오기',
  'history.delete': '이 목표 삭제',
  'history.deleteAria': '목표 {label} 삭제',

  'footer.overlay': '{hotkey} 표시 / 숨김 · {esc} 게임으로 제어 반환',
  'footer.web': '방위각 0° = 북쪽, 시계 방향.',

  'set.language.label': '언어',
  'set.language.help': '인터페이스 언어입니다. 기본값은 영어입니다.',
  'set.scale.label': '좌표 1점당 미터',
  'set.scale.help':
    '초기 가정: 10점 = 1000 m, 즉 점당 100 m. 게임에서 표시되는 거리가 비례적으로 어긋나면 여기서 보정합니다.',
  'set.yaxis.label': 'Y축 방향',
  'set.yaxis.up': 'Y가 북쪽으로 증가',
  'set.yaxis.down': 'Y가 남쪽으로 증가',
  'set.yaxis.help': '게임에서 방위각이 180° 어긋나면 바꿔야 할 설정은 바로 이것입니다.',
  'set.unit.label': '방위각 단위',
  'set.unit.deg': '도 (0-360)',
  'set.unit.mil': '밀',
  'set.unit.help':
    '게임 내 나침반을 확인하기 전까지는 도 단위로 두세요. 조준경의 밀은 포신 고각용이며 방향용이 아닙니다.',
  'set.mil.label': '밀 규격',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — 구 바르샤바 조약',
  'set.hotkey.label': '전역 단축키',
  'set.hotkey.help': 'Electron 문법: Alt+M, Ctrl+Shift+A, F8. 오버레이를 표시하고 숨깁니다.',
  'set.hotkey.error': '단축키 “{key}” 이(가) 거부되었거나 이미 사용 중입니다.',
  'set.hotkey.errorGeneric': '단축키를 적용할 수 없습니다.',
  'set.opacity.label': '오버레이 불투명도 — {percent} %',
  'set.reset': '설정 초기화',
};
