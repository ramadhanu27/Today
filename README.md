[![Netlify Status](https://api.netlify.com/api/v1/badges/6afb98c8-7f48-4d5f-94d1-3d12329ab7cc/deploy-status)](https://app.netlify.com/projects/jiawialo/deploys)

# 🌟 Jia Wialo - Personal Profile & Analytics Dashboard

Website profil personal modern dengan **Analytics Dashboard** lengkap untuk tracking visitor, clicks, dan statistik website. Dilengkapi dengan dark mode, multi-language support (ID/EN/中文), dan PWA capabilities.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Analytics Dashboard](#-analytics-dashboard)
- [Teknologi](#-teknologi)
- [Setup & Instalasi](#-setup--instalasi)
- [Konfigurasi Supabase](#-konfigurasi-supabase)
- [Kustomisasi](#-kustomisasi)
- [Deployment](#-deployment)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### **Website Profil**
- ✅ **Desain Modern**: Berbasis Tailwind CSS dengan gradient backgrounds
- ✅ **Header Profil**: Foto, nama, dan deskripsi multi-bahasa
- ✅ **Social Media Links**: TikTok, Instagram, Facebook, YouTube, Gmail dengan icon SVG asli
- ✅ **Jam Digital**: Real-time clock dengan format 24 jam
- ✅ **Dark Mode**: 3 mode (Light/Dark/System) dengan smooth transition
- ✅ **Multi-Language**: Support Bahasa Indonesia, English, dan 中文 (Chinese)
- ✅ **PWA Ready**: Installable sebagai aplikasi dengan offline support
- ✅ **Responsive**: Optimal di mobile, tablet, dan desktop
- ✅ **Ripple Effect**: Material Design ripple pada buttons
- ✅ **Entrance Animations**: Fade-up animations untuk smooth UX

### **Analytics Dashboard** 🎯
- ✅ **Dual Mode Access**: 
  - 👁️ **View Mode** (Public): Siapa saja bisa lihat analytics
  - 👑 **Admin Mode** (Protected): Full access dengan password
- ✅ **Real-time Statistics**: Live visitor counter (5 menit terakhir)
- ✅ **Visitor Tracking**: Track semua kunjungan dengan detail lengkap
- ✅ **Geolocation**: Deteksi negara dan kota visitor (dengan flag emoji)
- ✅ **Session Duration**: Track berapa lama visitor stay di website
- ✅ **Click Tracking**: Track klik pada social media links
- ✅ **Charts & Visualizations**: 4 interactive charts dengan Chart.js
- ✅ **Goals & Targets**: Set dan track daily/weekly/monthly goals
- ✅ **Date Range Filter**: Filter data by custom date range
- ✅ **Export to CSV**: Download analytics data
- ✅ **Multi-Language Dashboard**: Semua text ter-translate otomatis
- ✅ **Dark Mode Support**: Charts adjust colors based on theme

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
