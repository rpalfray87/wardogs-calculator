import type { Dict } from '../dict';

export const vi: Dict = {
  'titlebar.settings': 'Cài đặt và hiệu chỉnh',
  'titlebar.hide': 'Ẩn lớp phủ (Esc)',
  'titlebar.back': 'Quay lại máy tính',
  'settings.title': 'Cài đặt · hiệu chỉnh',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Vị trí của tôi',
  'point.target': 'Mục tiêu',
  'point.clear': 'Xóa',
  'point.clearOrigin': 'Xóa vị trí của tôi',
  'point.clearTarget': 'Xóa mục tiêu',

  'result.azimuth': 'Phương vị',
  'result.distance': 'Khoảng cách',
  'result.copyTitle': 'Nhấp để sao chép',
  'result.copied': 'Đã sao chép {label}',
  'result.copyFailed': 'không sao chép được',
  'result.saved': 'Đã lưu mục tiêu',
  'hint.ready': 'Enter để lưu · nhấp vào một con số để sao chép',
  'hint.incomplete': 'Điền đủ bốn tọa độ.',

  'history.title': 'Lịch sử',
  'history.clearAction': 'Xóa hết',
  'history.clearTitle': 'Xóa lịch sử',
  'history.empty': '{key} lưu mục tiêu hiện tại.',
  'history.load': 'Tải lại mục tiêu này',
  'history.delete': 'Xóa mục tiêu này',
  'history.deleteAria': 'Xóa mục tiêu {label}',

  'footer.overlay': '{hotkey} hiện / ẩn · {esc} trả quyền điều khiển lại cho trò chơi',
  'footer.web': 'Phương vị 0° = Bắc, theo chiều kim đồng hồ.',

  'set.language.label': 'Ngôn ngữ',
  'set.language.help': 'Ngôn ngữ giao diện. Mặc định là tiếng Anh.',
  'set.scale.label': 'Số mét trên mỗi điểm tọa độ',
  'set.scale.help':
    'Giả định ban đầu: 10 điểm = 1000 m, tức 100 m mỗi điểm. Nếu khoảng cách hiển thị sai theo tỷ lệ trong trò chơi, hãy chỉnh ở đây.',
  'set.yaxis.label': 'Chiều của trục Y',
  'set.yaxis.up': 'Y tăng về hướng Bắc',
  'set.yaxis.down': 'Y tăng về hướng Nam',
  'set.yaxis.help':
    'Nếu phương vị hiển thị lệch 180° trong trò chơi, đây chính là tùy chọn cần đảo lại.',
  'set.unit.label': 'Đơn vị phương vị',
  'set.unit.deg': 'Độ (0-360)',
  'set.unit.mil': 'Ly giác (mil)',
  'set.unit.help':
    'Cứ để ở đơn vị độ cho tới khi la bàn trong trò chơi được kiểm chứng. Ly giác trên kính ngắm dùng cho góc tà của nòng, không phải cho hướng.',
  'set.mil.label': 'Chuẩn ly giác',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — khối Warszawa cũ',
  'set.hotkey.label': 'Phím tắt toàn cục',
  'set.hotkey.help': 'Cú pháp Electron: Alt+M, Ctrl+Shift+A, F8. Hiện và ẩn lớp phủ.',
  'set.hotkey.error': 'Phím tắt “{key}” bị từ chối hoặc đã được dùng.',
  'set.hotkey.errorGeneric': 'Không áp dụng được phím tắt.',
  'set.opacity.label': 'Độ mờ đục của lớp phủ — {percent} %',
  'set.reset': 'Đặt lại cài đặt',
};
