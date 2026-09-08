import type { Dict } from '../dict';

export const bn: Dict = {
  'titlebar.settings': 'সেটিংস ও ক্যালিব্রেশন',
  'titlebar.hide': 'ওভারলে লুকান (Esc)',
  'titlebar.back': 'ক্যালকুলেটরে ফিরুন',
  'settings.title': 'সেটিংস · ক্যালিব্রেশন',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'আমার অবস্থান',
  'point.target': 'লক্ষ্য',
  'point.clear': 'মুছুন',
  'point.clearOrigin': 'আমার অবস্থান মুছুন',
  'point.clearTarget': 'লক্ষ্য মুছুন',

  'result.azimuth': 'দিগংশ',
  'result.distance': 'দূরত্ব',
  'result.copyTitle': 'কপি করতে ক্লিক করুন',
  'result.copied': '{label} কপি করা হয়েছে',
  'result.copyFailed': 'কপি করা যায়নি',
  'result.saved': 'লক্ষ্য সংরক্ষিত',
  'hint.ready': 'Enter সংরক্ষণ করে · কোনো সংখ্যায় ক্লিক করলে তা কপি হয়',
  'hint.incomplete': 'চারটি স্থানাঙ্কই পূরণ করুন।',

  'history.title': 'ইতিহাস',
  'history.clearAction': 'খালি করুন',
  'history.clearTitle': 'ইতিহাস খালি করুন',
  'history.empty': '{key} বর্তমান লক্ষ্য সংরক্ষণ করে।',
  'history.load': 'এই লক্ষ্য আবার লোড করুন',
  'history.delete': 'এই লক্ষ্য মুছে ফেলুন',
  'history.deleteAria': '{label} লক্ষ্য মুছে ফেলুন',

  'footer.overlay': '{hotkey} দেখায় / লুকায় · {esc} নিয়ন্ত্রণ গেমে ফিরিয়ে দেয়',
  'footer.web': 'দিগংশ 0° = উত্তর, ঘড়ির কাঁটার দিকে।',

  'set.language.label': 'ভাষা',
  'set.language.help': 'ইন্টারফেসের ভাষা। ডিফল্ট ইংরেজি।',
  'set.scale.label': 'প্রতি স্থানাঙ্ক বিন্দুতে মিটার',
  'set.scale.help':
    'প্রাথমিক ধারণা: 10 বিন্দু = 1000 মি., অর্থাৎ প্রতি বিন্দুতে 100 মি.। গেমে দেখানো দূরত্ব আনুপাতিকভাবে ভুল হলে এখানেই ঠিক করুন।',
  'set.yaxis.label': 'Y অক্ষের দিক',
  'set.yaxis.up': 'Y উত্তরের দিকে বাড়ে',
  'set.yaxis.down': 'Y দক্ষিণের দিকে বাড়ে',
  'set.yaxis.help': 'গেমে দেখানো দিগংশ 180° সরে গেলে এই সেটিংটিই বদলাতে হবে।',
  'set.unit.label': 'দিগংশের একক',
  'set.unit.deg': 'ডিগ্রি (0-360)',
  'set.unit.mil': 'মিল',
  'set.unit.help':
    'গেমের কম্পাস যাচাই না হওয়া পর্যন্ত ডিগ্রিতেই রাখুন। সাইটের মিল নলের উন্নতি কোণের জন্য, দিকের জন্য নয়।',
  'set.mil.label': 'মিল মান',
  'set.mil.nato': '6400 — ন্যাটো',
  'set.mil.warsaw': '6000 — সাবেক ওয়ারশ চুক্তি',
  'set.hotkey.label': 'গ্লোবাল শর্টকাট',
  'set.hotkey.help': 'Electron সিনট্যাক্স: Alt+M, Ctrl+Shift+A, F8। ওভারলে দেখায় ও লুকায়।',
  'set.hotkey.error': 'শর্টকাট “{key}” প্রত্যাখ্যাত বা ইতিমধ্যে দখলে।',
  'set.hotkey.errorGeneric': 'শর্টকাট প্রয়োগযোগ্য নয়।',
  'set.opacity.label': 'ওভারলের অস্বচ্ছতা — {percent} %',
  'set.reset': 'সেটিংস রিসেট করুন',
};
