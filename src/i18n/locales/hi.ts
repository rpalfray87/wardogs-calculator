import type { Dict } from '../dict';

export const hi: Dict = {
  'titlebar.settings': 'सेटिंग्स और अंशांकन',
  'titlebar.hide': 'ओवरले छिपाएँ (Esc)',
  'titlebar.back': 'कैलकुलेटर पर वापस',
  'settings.title': 'सेटिंग्स · अंशांकन',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'मेरी स्थिति',
  'point.target': 'लक्ष्य',
  'point.clear': 'साफ़ करें',
  'point.clearOrigin': 'मेरी स्थिति साफ़ करें',
  'point.clearTarget': 'लक्ष्य साफ़ करें',

  'result.azimuth': 'दिगंश',
  'result.distance': 'दूरी',
  'result.copyTitle': 'कॉपी करने के लिए क्लिक करें',
  'result.copied': '{label} कॉपी किया गया',
  'result.copyFailed': 'कॉपी नहीं हो सका',
  'result.saved': 'लक्ष्य सहेजा गया',
  'hint.ready': 'Enter सहेजता है · किसी संख्या पर क्लिक करने से वह कॉपी हो जाती है',
  'hint.incomplete': 'चारों निर्देशांक भरें।',

  'history.title': 'इतिहास',
  'history.clearAction': 'खाली करें',
  'history.clearTitle': 'इतिहास खाली करें',
  'history.empty': '{key} मौजूदा लक्ष्य को सहेजता है।',
  'history.load': 'यह लक्ष्य फिर से लोड करें',
  'history.delete': 'यह लक्ष्य हटाएँ',
  'history.deleteAria': 'लक्ष्य {label} हटाएँ',

  'footer.overlay': '{hotkey} दिखाता / छिपाता है · {esc} नियंत्रण खेल को लौटाता है',
  'footer.web': 'दिगंश 0° = उत्तर, दक्षिणावर्त।',

  'set.language.label': 'भाषा',
  'set.language.help': 'इंटरफ़ेस की भाषा। डिफ़ॉल्ट अंग्रेज़ी है।',
  'set.scale.label': 'प्रति निर्देशांक बिंदु मीटर',
  'set.scale.help':
    'प्रारंभिक अनुमान: 10 बिंदु = 1000 मी., यानी प्रति बिंदु 100 मी.। यदि खेल में दिखाई गई दूरी अनुपात में ग़लत है, तो सुधार यहीं करें।',
  'set.yaxis.label': 'Y अक्ष की दिशा',
  'set.yaxis.up': 'Y उत्तर की ओर बढ़ता है',
  'set.yaxis.down': 'Y दक्षिण की ओर बढ़ता है',
  'set.yaxis.help': 'यदि खेल में दिखाया गया दिगंश 180° से हटा हुआ है, तो यही सेटिंग बदलनी है।',
  'set.unit.label': 'दिगंश की इकाई',
  'set.unit.deg': 'डिग्री (0-360)',
  'set.unit.mil': 'मिल',
  'set.unit.help':
    'जब तक खेल का कम्पास जाँचा न जाए, इसे डिग्री पर ही रहने दें। दृष्टि की मिल इकाइयाँ नली के उन्नयन के लिए हैं, दिशा के लिए नहीं।',
  'set.mil.label': 'मिल मानक',
  'set.mil.nato': '6400 — नाटो',
  'set.mil.warsaw': '6000 — पूर्व वारसा संधि',
  'set.hotkey.label': 'वैश्विक शॉर्टकट',
  'set.hotkey.help': 'Electron सिंटैक्स: Alt+M, Ctrl+Shift+A, F8. ओवरले दिखाता और छिपाता है।',
  'set.hotkey.error': 'शॉर्टकट “{key}” अस्वीकृत या पहले से लिया गया।',
  'set.hotkey.errorGeneric': 'शॉर्टकट लागू नहीं किया जा सकता।',
  'set.opacity.label': 'ओवरले की अपारदर्शिता — {percent} %',
  'set.reset': 'सेटिंग्स रीसेट करें',
};
