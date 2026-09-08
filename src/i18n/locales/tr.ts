import type { Dict } from '../dict';

export const tr: Dict = {
  'titlebar.settings': 'Ayarlar ve kalibrasyon',
  'titlebar.hide': 'Yer paylaşımını gizle (Esc)',
  'titlebar.back': 'Hesaplayıcıya dön',
  'settings.title': 'Ayarlar · kalibrasyon',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Konumum',
  'point.target': 'Hedef',
  'point.clear': 'Temizle',
  'point.clearOrigin': 'Konumumu temizle',
  'point.clearTarget': 'Hedefi temizle',

  'result.azimuth': 'Azimut',
  'result.distance': 'Mesafe',
  'result.copyTitle': 'Kopyalamak için tıklayın',
  'result.copied': '{label} kopyalandı',
  'result.copyFailed': 'kopyalanamadı',
  'result.saved': 'Hedef kaydedildi',
  'hint.ready': 'Enter kaydeder · bir sayıya tıklayınca kopyalanır',
  'hint.incomplete': 'Dört koordinatın hepsini doldurun.',

  'history.title': 'Geçmiş',
  'history.clearAction': 'Temizle',
  'history.clearTitle': 'Geçmişi temizle',
  'history.empty': '{key} geçerli hedefi kaydeder.',
  'history.load': 'Bu hedefi yeniden yükle',
  'history.delete': 'Bu hedefi sil',
  'history.deleteAria': '{label} hedefini sil',

  'footer.overlay': '{hotkey} gösterir / gizler · {esc} kontrolü oyuna geri verir',
  'footer.web': 'Azimut 0° = Kuzey, saat yönünde.',

  'set.language.label': 'Dil',
  'set.language.help': 'Arayüz dili. Varsayılan İngilizcedir.',
  'set.scale.label': 'Koordinat noktası başına metre',
  'set.scale.help':
    'Başlangıç varsayımı: 10 nokta = 1000 m, yani nokta başına 100 m. Oyunda bildirilen mesafe orantılı olarak yanlışsa düzeltme burada yapılır.',
  'set.yaxis.label': 'Y ekseninin yönü',
  'set.yaxis.up': 'Y kuzeye doğru artar',
  'set.yaxis.down': 'Y güneye doğru artar',
  'set.yaxis.help':
    'Gösterilen azimut oyunda 180° kaymışsa değiştirilmesi gereken ayar budur.',
  'set.unit.label': 'Azimut birimi',
  'set.unit.deg': 'Derece (0-360)',
  'set.unit.mil': 'Mil',
  'set.unit.help':
    'Oyundaki pusula doğrulanana kadar derecede bırakın. Nişangahtaki mil değerleri namlu yüksekliği içindir, yön için değil.',
  'set.mil.label': 'Mil standardı',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — eski Varşova Paktı',
  'set.hotkey.label': 'Genel kısayol',
  'set.hotkey.help':
    'Electron söz dizimi: Alt+M, Ctrl+Shift+A, F8. Yer paylaşımını gösterir ve gizler.',
  'set.hotkey.error': '“{key}” kısayolu reddedildi veya zaten kullanılıyor.',
  'set.hotkey.errorGeneric': 'Kısayol uygulanamıyor.',
  'set.opacity.label': 'Yer paylaşımı opaklığı — %{percent}',
  'set.reset': 'Ayarları sıfırla',
};
