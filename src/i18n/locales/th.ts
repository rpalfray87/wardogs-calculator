import type { Dict } from '../dict';

export const th: Dict = {
  'titlebar.settings': 'การตั้งค่าและการปรับเทียบ',
  'titlebar.hide': 'ซ่อนโอเวอร์เลย์ (Esc)',
  'titlebar.back': 'กลับไปที่เครื่องคิดเลข',
  'settings.title': 'การตั้งค่า · การปรับเทียบ',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'ตำแหน่งของฉัน',
  'point.target': 'เป้าหมาย',
  'point.clear': 'ล้าง',
  'point.clearOrigin': 'ล้างตำแหน่งของฉัน',
  'point.clearTarget': 'ล้างเป้าหมาย',

  'result.azimuth': 'มุมภาค',
  'result.distance': 'ระยะทาง',
  'result.copyTitle': 'คลิกเพื่อคัดลอก',
  'result.copied': 'คัดลอก{label}แล้ว',
  'result.copyFailed': 'คัดลอกไม่สำเร็จ',
  'result.saved': 'บันทึกเป้าหมายแล้ว',
  'hint.ready': 'Enter เพื่อบันทึก · คลิกที่ตัวเลขเพื่อคัดลอก',
  'hint.incomplete': 'กรอกพิกัดให้ครบทั้งสี่ค่า',

  'history.title': 'ประวัติ',
  'history.clearAction': 'ล้าง',
  'history.clearTitle': 'ล้างประวัติ',
  'history.empty': '{key} บันทึกเป้าหมายปัจจุบัน',
  'history.load': 'โหลดเป้าหมายนี้อีกครั้ง',
  'history.delete': 'ลบเป้าหมายนี้',
  'history.deleteAria': 'ลบเป้าหมาย {label}',

  'footer.overlay': '{hotkey} แสดง / ซ่อน · {esc} คืนการควบคุมให้เกม',
  'footer.web': 'มุมภาค 0° = ทิศเหนือ ตามเข็มนาฬิกา',

  'set.language.label': 'ภาษา',
  'set.language.help': 'ภาษาของส่วนติดต่อผู้ใช้ ค่าเริ่มต้นคือภาษาอังกฤษ',
  'set.scale.label': 'เมตรต่อหนึ่งจุดพิกัด',
  'set.scale.help':
    'สมมติฐานเริ่มต้น: 10 จุด = 1000 ม. หรือ 100 ม. ต่อจุด หากระยะทางที่แสดงคลาดเคลื่อนตามสัดส่วนในเกม ให้แก้ที่นี่',
  'set.yaxis.label': 'ทิศของแกน Y',
  'set.yaxis.up': 'Y เพิ่มขึ้นไปทางทิศเหนือ',
  'set.yaxis.down': 'Y เพิ่มขึ้นไปทางทิศใต้',
  'set.yaxis.help': 'ถ้ามุมภาคที่แสดงคลาดไป 180° ในเกม นี่คือการตั้งค่าที่ต้องสลับ',
  'set.unit.label': 'หน่วยของมุมภาค',
  'set.unit.deg': 'องศา (0-360)',
  'set.unit.mil': 'มิล',
  'set.unit.help':
    'ให้คงหน่วยองศาไว้จนกว่าจะตรวจสอบเข็มทิศในเกมแล้ว ค่ามิลบนศูนย์เล็งใช้สำหรับมุมยกของลำกล้อง ไม่ใช่สำหรับทิศทาง',
  'set.mil.label': 'มาตรฐานมิล',
  'set.mil.nato': '6400 — นาโต',
  'set.mil.warsaw': '6000 — อดีตกลุ่มสนธิสัญญาวอร์ซอ',
  'set.hotkey.label': 'ปุ่มลัดส่วนกลาง',
  'set.hotkey.help': 'ไวยากรณ์ของ Electron: Alt+M, Ctrl+Shift+A, F8 ใช้แสดงและซ่อนโอเวอร์เลย์',
  'set.hotkey.error': 'ปุ่มลัด “{key}” ถูกปฏิเสธหรือถูกใช้ไปแล้ว',
  'set.hotkey.errorGeneric': 'ใช้ปุ่มลัดนี้ไม่ได้',
  'set.opacity.label': 'ความทึบของโอเวอร์เลย์ — {percent} %',
  'set.reset': 'รีเซ็ตการตั้งค่า',
};
