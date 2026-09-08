import type { Dict } from '../dict';

export const ar: Dict = {
  'titlebar.settings': 'الإعدادات والمعايرة',
  'titlebar.hide': 'إخفاء الطبقة العلوية (Esc)',
  'titlebar.back': 'العودة إلى الحاسبة',
  'settings.title': 'الإعدادات · المعايرة',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'موقعي',
  'point.target': 'الهدف',
  'point.clear': 'مسح',
  'point.clearOrigin': 'مسح موقعي',
  'point.clearTarget': 'مسح الهدف',

  'result.azimuth': 'السمت',
  'result.distance': 'المسافة',
  'result.copyTitle': 'انقر للنسخ',
  'result.copied': 'تم نسخ {label}',
  'result.copyFailed': 'تعذّر النسخ',
  'result.saved': 'تم حفظ الهدف',
  'hint.ready': 'Enter يحفظ · انقر على رقم لنسخه',
  'hint.incomplete': 'أدخل الإحداثيات الأربعة كلها.',

  'history.title': 'السجل',
  'history.clearAction': 'إفراغ',
  'history.clearTitle': 'إفراغ السجل',
  'history.empty': '{key} يحفظ الهدف الحالي.',
  'history.load': 'إعادة تحميل هذا الهدف',
  'history.delete': 'حذف هذا الهدف',
  'history.deleteAria': 'حذف الهدف {label}',

  'footer.overlay': '{hotkey} يُظهر / يُخفي · {esc} يعيد التحكم إلى اللعبة',
  'footer.web': 'السمت 0° = الشمال، باتجاه عقارب الساعة.',

  'set.language.label': 'اللغة',
  'set.language.help': 'لغة الواجهة. الإنجليزية هي الافتراضية.',
  'set.scale.label': 'الأمتار لكل نقطة إحداثية',
  'set.scale.help':
    'الافتراض المبدئي: 10 نقاط = 1000 م، أي 100 م لكل نقطة. إذا كانت المسافة المعروضة خاطئة تناسبيًا داخل اللعبة، فالتصحيح يكون هنا.',
  'set.yaxis.label': 'اتجاه المحور Y',
  'set.yaxis.up': 'Y يزداد نحو الشمال',
  'set.yaxis.down': 'Y يزداد نحو الجنوب',
  'set.yaxis.help': 'إذا كان السمت المعروض منحرفًا بمقدار 180° داخل اللعبة، فهذا هو الإعداد الذي يجب عكسه.',
  'set.unit.label': 'وحدة السمت',
  'set.unit.deg': 'درجات (0-360)',
  'set.unit.mil': 'ملّيم',
  'set.unit.help':
    'اتركه بالدرجات ما دامت بوصلة اللعبة لم تُتحقّق بعد. ملّيمات المنظار تخصّ ارتفاع السبطانة لا الاتجاه.',
  'set.mil.label': 'معيار الملّيم',
  'set.mil.nato': '6400 — الناتو',
  'set.mil.warsaw': '6000 — حلف وارسو سابقًا',
  'set.hotkey.label': 'اختصار عام',
  'set.hotkey.help': 'صيغة Electron: Alt+M، Ctrl+Shift+A، F8. يُظهر الطبقة العلوية ويُخفيها.',
  'set.hotkey.error': 'الاختصار «{key}» مرفوض أو مستخدَم بالفعل.',
  'set.hotkey.errorGeneric': 'الاختصار غير قابل للتطبيق.',
  'set.opacity.label': 'عتامة الطبقة العلوية — {percent} %',
  'set.reset': 'إعادة تعيين الإعدادات',
};
