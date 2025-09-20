[![Netlify Status](https://api.netlify.com/api/v1/badges/6afb98c8-7f48-4d5f-94d1-3d12329ab7cc/deploy-status)](https://app.netlify.com/projects/jiawialo/deploys)

# Social Media Link Sharing Website

Halaman profil modern untuk membagikan link sosial media dengan tampilan profesional, animasi interaktif, dukungan PWA, dan dark mode.

## Fitur Utama

- Desain modern berbasis Tailwind CSS (CDN).
- Header profil dengan foto, nama, dan deskripsi singkat.
- Daftar link sosial: TikTok, Instagram, Facebook, dan Email (Gmail) dengan ikon resmi (via Simple Icons).
- Jam digital real-time.
- Dark mode dengan preferensi yang disimpan (light/dark/system) + panel pengaturan tampilan.
- Language switcher (ID/EN/中文) dengan penyimpanan pilihan bahasa.
- Loader/progress bar saat halaman dimuat (aktif secara default, dapat dimatikan).
- PWA: Service Worker + Web App Manifest untuk cache offline dasar dan prompt instal aplikasi.
- Fokus aksesibel (focus-visible) untuk navigasi keyboard yang lebih baik.

Catatan:
- Statistik klik belum diimplementasikan.
- Utilitas ripple effect dan animasi masuk (fade-up) sudah tersedia di kode, tetapi belum diaktifkan pada elemen apa pun secara default.

## Struktur Proyek

- `index.html` — Halaman utama (UI, tombol sosial, panel pengaturan, language switcher, loader opsional).
- `style.css` — Gaya tambahan: dark mode, ripple, animasi, fokus aksesibel.
- `script.js` — Inisialisasi dark mode, panel pengaturan, i18n, jam digital, PWA install button, ripple, dan animasi masuk.
- `sw.js` — Service Worker: cache app shell; network-first (HTML) dan cache-first (assets).
- `manifest.webmanifest` — Manifest PWA (name, icons, theme color, dsb.).
- `README.md` — Dokumentasi proyek.
- `529156440_...jpg` — Foto profil (ganti sesuai kebutuhan).
- `bg.jpg` — Gambar background (opsional).

## Cara Menjalankan

1. Unduh/clone repo ini.
2. Buka `index.html` langsung di browser untuk melihat hasilnya.
3. Untuk menguji PWA/Service Worker, jalankan melalui server lokal (mis. Live Server di VS Code), karena SW tidak aktif di file://.

## Kustomisasi Cepat

- Konten profil:
  - Ganti nama pada `#headlineTitle` dan deskripsi pada `#headlineDesc` di `index.html`.
  - Ganti gambar profil dengan file Anda, lalu perbarui `src` pada `<img>` di bagian header.
- Tautan sosial: perbarui atribut `href` untuk TikTok/Instagram/Facebook/Gmail di `index.html`.
- Bahasa: atur teks multibahasa di `script.js` pada objek `translations` (kunci `id`, `en`, `zh`).
- Tema & warna: sesuaikan warna gradien Tailwind di `index.html` dan warna di `manifest.webmanifest`/`<meta name="theme-color">`.
- CSS tambahan: Ubah efek di `style.css` sesuai kebutuhan.

### Mengaktifkan Ripple dan Animasi Masuk (Opsional)
- Ripple: tambahkan kelas `btn-link` pada elemen tombol/link yang ingin diberi efek. Contoh: `<a class="btn-link ...">`.
- Animasi masuk: tambahkan kelas `fade-up` pada elemen yang ingin dianimasikan saat muncul di viewport.


## PWA dan Icon

- Service worker (`sw.js`) sudah mencache file inti. Ubah `CACHE_NAME` jika Anda mengubah daftar asset agar cache terbarui.
- `manifest.webmanifest` saat ini memakai ikon JPG. Disarankan menyiapkan ikon PNG 192x192 dan 512x512, serta varian `purpose: "maskable"` untuk tampilan terbaik di Android.
- Prompt instal PWA akan muncul saat memenuhi kriteria. Tombol ringan akan muncul otomatis (`Install App`).

## Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun komersial.

---

Dibuat oleh Jia Wialo
