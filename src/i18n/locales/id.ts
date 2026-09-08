import type { Dict } from '../dict';

export const id: Dict = {
  'titlebar.settings': 'Pengaturan dan kalibrasi',
  'titlebar.hide': 'Sembunyikan overlay (Esc)',
  'titlebar.back': 'Kembali ke kalkulator',
  'settings.title': 'Pengaturan · kalibrasi',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Posisi saya',
  'point.target': 'Sasaran',
  'point.clear': 'Hapus',
  'point.clearOrigin': 'Hapus posisi saya',
  'point.clearTarget': 'Hapus sasaran',

  'result.azimuth': 'Azimut',
  'result.distance': 'Jarak',
  'result.copyTitle': 'Klik untuk menyalin',
  'result.copied': '{label} disalin',
  'result.copyFailed': 'gagal menyalin',
  'result.saved': 'Sasaran tersimpan',
  'hint.ready': 'Enter menyimpan · klik angka untuk menyalinnya',
  'hint.incomplete': 'Isi keempat koordinat.',

  'history.title': 'Riwayat',
  'history.clearAction': 'Kosongkan',
  'history.clearTitle': 'Kosongkan riwayat',
  'history.empty': '{key} menyimpan sasaran saat ini.',
  'history.load': 'Muat ulang sasaran ini',
  'history.delete': 'Hapus sasaran ini',
  'history.deleteAria': 'Hapus sasaran {label}',

  'footer.overlay': '{hotkey} menampilkan / menyembunyikan · {esc} mengembalikan kendali ke game',
  'footer.web': 'Azimut 0° = Utara, searah jarum jam.',

  'set.language.label': 'Bahasa',
  'set.language.help': 'Bahasa antarmuka. Bahasa Inggris adalah bawaannya.',
  'set.scale.label': 'Meter per titik koordinat',
  'set.scale.help':
    'Asumsi awal: 10 titik = 1000 m, yaitu 100 m per titik. Jika jarak yang ditampilkan secara proporsional salah di dalam game, perbaiki di sini.',
  'set.yaxis.label': 'Arah sumbu Y',
  'set.yaxis.up': 'Y bertambah ke arah Utara',
  'set.yaxis.down': 'Y bertambah ke arah Selatan',
  'set.yaxis.help':
    'Jika azimut yang ditampilkan meleset 180° di dalam game, pengaturan inilah yang harus dibalik.',
  'set.unit.label': 'Satuan azimut',
  'set.unit.deg': 'Derajat (0-360)',
  'set.unit.mil': 'Mil',
  'set.unit.help':
    'Biarkan dalam derajat selama kompas dalam game belum diperiksa. Nilai mil pada bidikan dipakai untuk elevasi laras, bukan untuk arah.',
  'set.mil.label': 'Standar mil',
  'set.mil.nato': '6400 — NATO',
  'set.mil.warsaw': '6000 — bekas Pakta Warsawa',
  'set.hotkey.label': 'Pintasan global',
  'set.hotkey.help':
    'Sintaks Electron: Alt+M, Ctrl+Shift+A, F8. Menampilkan dan menyembunyikan overlay.',
  'set.hotkey.error': 'Pintasan “{key}” ditolak atau sudah dipakai.',
  'set.hotkey.errorGeneric': 'Pintasan tidak dapat diterapkan.',
  'set.opacity.label': 'Opasitas overlay — {percent} %',
  'set.reset': 'Setel ulang pengaturan',
};
