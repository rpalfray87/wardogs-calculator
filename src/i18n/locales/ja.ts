import type { Dict } from '../dict';

export const ja: Dict = {
  'titlebar.settings': '設定とキャリブレーション',
  'titlebar.hide': 'オーバーレイを隠す（Esc）',
  'titlebar.back': '計算機に戻る',
  'settings.title': '設定 · キャリブレーション',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': '自分の位置',
  'point.target': '目標',
  'point.clear': 'クリア',
  'point.clearOrigin': '自分の位置をクリア',
  'point.clearTarget': '目標をクリア',

  'result.azimuth': '方位角',
  'result.distance': '距離',
  'result.copyTitle': 'クリックでコピー',
  'result.copied': '{label}をコピーしました',
  'result.copyFailed': 'コピーできません',
  'result.saved': '目標を記録しました',
  'hint.ready': 'Enter で記録 · 数字をクリックするとコピー',
  'hint.incomplete': '4 つの座標をすべて入力してください。',

  'history.title': '履歴',
  'history.clearAction': '消去',
  'history.clearTitle': '履歴を消去',
  'history.empty': '{key} で現在の目標を記録します。',
  'history.load': 'この目標を読み込み直す',
  'history.delete': 'この目標を削除',
  'history.deleteAria': '目標 {label} を削除',

  'footer.overlay': '{hotkey} で表示 / 非表示 · {esc} でゲームに操作を戻す',
  'footer.web': '方位角 0° = 北、時計回り。',

  'set.language.label': '言語',
  'set.language.help': 'インターフェースの言語です。既定は英語です。',
  'set.scale.label': '座標 1 点あたりのメートル数',
  'set.scale.help':
    '初期の想定：10 点 = 1000 m、つまり 1 点あたり 100 m。ゲーム内で表示距離が比例してずれる場合はここで補正します。',
  'set.yaxis.label': 'Y 軸の向き',
  'set.yaxis.up': 'Y は北に向かって増加',
  'set.yaxis.down': 'Y は南に向かって増加',
  'set.yaxis.help': 'ゲーム内で方位角が 180° ずれている場合は、この設定を切り替えます。',
  'set.unit.label': '方位角の単位',
  'set.unit.deg': '度（0-360）',
  'set.unit.mil': 'ミル',
  'set.unit.help':
    'ゲーム内のコンパスを確認するまでは度のままにしてください。照準器のミルは砲身の仰角用であり、方向用ではありません。',
  'set.mil.label': 'ミルの規格',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — 旧ワルシャワ条約機構',
  'set.hotkey.label': 'グローバルショートカット',
  'set.hotkey.help':
    'Electron の記法：Alt+M、Ctrl+Shift+A、F8。オーバーレイの表示と非表示を切り替えます。',
  'set.hotkey.error': 'ショートカット「{key}」は拒否されたか、すでに使用されています。',
  'set.hotkey.errorGeneric': 'ショートカットを適用できません。',
  'set.opacity.label': 'オーバーレイの不透明度 — {percent} %',
  'set.reset': '設定をリセット',
};
