
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

---

## 📊 Analytics Dashboard

### **Dashboard Features**

#### **1. Stats Cards (6 Metrics)**
- 🔴 **Live Now**: Visitor aktif dalam 5 menit terakhir
- 🔵 **Today's Visits**: Total kunjungan hari ini
- 🟢 **This Week**: Total kunjungan minggu ini
- 🟣 **This Month**: Total kunjungan bulan ini
- 🟠 **Total Visits**: Total semua kunjungan (filtered by date range)
- 🔵 **Avg. Session**: Rata-rata durasi visitor di website

#### **2. Interactive Charts**
- **Last 7 Days Trend**: Line chart untuk melihat tren kunjungan
- **Today's Hourly Traffic**: Bar chart traffic per jam (0-23)
- **Traffic Sources**: Doughnut chart (Direct, Social Media, Search Engine, Other)
- **Device Breakdown**: Pie chart (Mobile, Desktop, Tablet)

#### **3. Goals & Targets** 🎯
- Set custom goals untuk Daily, Weekly, Monthly visits
- Progress bars dengan percentage
- Achievement celebration saat goal tercapai
- "X more to go" counter
- Saved di localStorage (persistent)

#### **4. Social Media Clicks** 📱
- Track klik pada setiap social media link
- Display dengan icon SVG asli (TikTok, Instagram, Facebook, YouTube, Gmail)
- Brand-accurate gradient colors
- Sorted by click count

#### **5. Top Countries** 🌍
- Top 5 negara dengan visitor terbanyak
- Flag emoji untuk setiap negara
- Progress bar visualization
- Visit count per country

#### **6. Recent Visits Table** 📋
- 10 kunjungan terbaru
- Columns: Date & Time, Location, Referrer, Device
- Responsive: Hide "Referrer" column di mobile
- Horizontal scroll untuk data banyak

#### **7. Date Range Filter** 📅
- 9 preset options:
  - Today, Yesterday
  - Last 7/30/90 Days
  - This Month, Last Month
  - All Time
  - Custom Range (date picker)
- Filter semua charts dan data secara real-time

#### **8. Action Buttons**
- **Export CSV** (Admin only): Download semua analytics data
- **Refresh Data**: Reload analytics data

### **Access Modes**

#### **👁️ View Mode (Public)**
- Akses tanpa password
- Bisa lihat semua stats & charts
- Bisa filter date range
- Bisa refresh data
- **Tidak bisa**: Edit goals, Export CSV

#### **👑 Admin Mode (Password Protected)**
- Password: `jiawialo641` (configurable di `script.js`)
- Full access semua fitur
- Bisa edit goals
- Bisa export CSV
- Badge indicator: "👑 Mode Admin"

---

## 🛠️ Teknologi

### **Frontend**
- **HTML5**: Semantic markup
- **Tailwind CSS 3.4**: Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Chart.js 4.4**: Interactive charts
- **SVG Icons**: Custom social media icons

### **Backend & Database**
- **Supabase**: 
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - RESTful API
- **Supabase Client**: JavaScript SDK via CDN

### **APIs**
- **Geolocation APIs** (with fallbacks):
  1. `ip-api.com` (primary)
  2. `ipapi.co` (fallback 1)
  3. `ipwho.is` (fallback 2)

### **PWA**
- **Service Worker**: Offline caching
- **Web App Manifest**: Installable app
- **Cache Strategy**: 
  - Network-first for HTML
  - Cache-first for assets

---

## 📁 Struktur Proyek

```
Today/
├── index.html              # Main HTML file
├── style.css               # Custom CSS (dark mode, ripple, animations)
├── script.js               # Main JavaScript (1700+ lines)
│   ├── Dark Mode Logic
│   ├── Language Switcher (i18n)
│   ├── PWA Install Prompt
│   ├── Ripple Effect
│   ├── Entrance Animations
│   ├── Digital Clock
│   ├── Supabase Configuration
│   ├── Analytics Dashboard
│   ├── Geolocation Tracking
│   ├── Session Duration
│   ├── Click Tracking
│   ├── Charts (Chart.js)
│   ├── Goals Management
│   └── CSV Export
├── sw.js                   # Service Worker
├── manifest.webmanifest    # PWA Manifest
├── 529156440_...jpg        # Profile photo
├── bg.jpg                  # Background image (optional)
├── README.md               # This file
├── SUPABASE_SETUP.md       # Supabase setup guide
├── DEPLOYMENT_FIX.md       # Deployment troubleshooting
├── MULTILANGUAGE_DASHBOARD.md  # Multi-language docs
└── LANGUAGE_FIX.md         # Language implementation details
```

---

## 🚀 Setup & Instalasi

### **Prerequisites**
- Browser modern (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Akun Supabase (gratis)
- Git (optional)

### **Quick Start**

#### **1. Clone/Download Project**
```bash
git clone <repository-url>
cd Today
```

#### **2. Setup Supabase**
Lihat file `SUPABASE_SETUP.md` untuk panduan lengkap.

**Quick Steps:**
1. Buat project di [supabase.com](https://supabase.com)
2. Copy URL dan Anon Key
3. Update di `script.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

4. Jalankan SQL di Supabase SQL Editor:
```sql
-- Lihat SUPABASE_SETUP.md untuk SQL lengkap
CREATE TABLE page_visits (...);
CREATE TABLE social_clicks (...);
```

#### **3. Konfigurasi Password**
Update password analytics di `script.js`:
```javascript
const ANALYTICS_PASSWORD = 'your-secure-password';
```

#### **4. Jalankan Locally**
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: VS Code Live Server
# Install extension, lalu klik "Go Live"
```

Buka: `http://localhost:8000`

---

## 🔧 Konfigurasi Supabase

### **Database Tables**

#### **1. `page_visits` Table**
Menyimpan semua kunjungan website.

**Columns:**
- `id`: BIGSERIAL PRIMARY KEY
- `created_at`: TIMESTAMPTZ (auto)
- `page_url`: TEXT
- `referrer`: TEXT
- `user_agent`: TEXT
- `session_id`: TEXT
- `country`: TEXT
- `city`: TEXT
- `country_code`: TEXT
- `session_duration`: INTEGER (seconds)

#### **2. `social_clicks` Table**
Menyimpan klik pada social media links.

**Columns:**
- `id`: BIGSERIAL PRIMARY KEY
- `created_at`: TIMESTAMPTZ (auto)
- `platform`: TEXT (TikTok, Instagram, etc.)
- `session_id`: TEXT
- `country`: TEXT
- `city`: TEXT

### **Row Level Security (RLS)**

Kedua table menggunakan RLS dengan policies:
- ✅ **Public INSERT**: Siapa saja bisa insert data
- ✅ **Public SELECT**: Siapa saja bisa read data
- ❌ **No UPDATE/DELETE**: Tidak ada yang bisa update/delete

### **Indexes**
- `idx_page_visits_created_at`: Untuk sorting by date
- `idx_social_clicks_created_at`: Untuk sorting by date
- `idx_social_clicks_platform`: Untuk grouping by platform

---

## 🎨 Kustomisasi

### **1. Profile Content**

#### **Nama & Deskripsi**
Edit di `script.js` → `translations` object:
```javascript
const translations = {
  id: {
    title: 'Nama Anda',
    desc: 'Deskripsi Anda<br>Baris kedua'
  },
  en: { ... },
  zh: { ... }
};
```

#### **Foto Profil**
Ganti file `529156440_...jpg` dengan foto Anda, atau update di `index.html`:
```html
<img src="your-photo.jpg" alt="Profile">
```

### **2. Social Media Links**

Edit di `index.html`:
```html
<a href="https://tiktok.com/@your-username" data-platform="TikTok">
<a href="https://instagram.com/your-username" data-platform="Instagram">
<a href="https://facebook.com/your-username" data-platform="Facebook">
<a href="https://youtube.com/@your-channel" data-platform="YouTube">
<a href="mailto:your-email@gmail.com" data-platform="Gmail">
```

**Important:** Jangan hapus `data-platform` attribute (untuk click tracking)!

### **3. Colors & Theme**

#### **Gradient Colors**
Edit di `index.html`:
```html
<!-- Background gradient -->
<div class="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">

<!-- Button gradients -->
<a class="bg-gradient-to-r from-pink-500 to-purple-600">
```

#### **Theme Color**
Edit di `index.html` dan `manifest.webmanifest`:
```html
<meta name="theme-color" content="#8B5CF6">
```

### **4. Default Goals**

Edit di `script.js`:
```javascript
const DEFAULT_GOALS = {
  daily: 50,    // Target harian
  weekly: 300,  // Target mingguan
  monthly: 1000 // Target bulanan
};
```

### **5. Language**

#### **Default Language**
Edit di `script.js` → `initLanguage()`:
```javascript
else saved = 'id'; // 'id', 'en', atau 'zh'
```

#### **Add New Language**
Tambahkan di `translations` object:
```javascript
const translations = {
  id: { ... },
  en: { ... },
  zh: { ... },
  jp: {  // Japanese
    title: 'タイトル',
    desc: '説明',
    analytics: { ... }
  }
};
```

### **6. Ripple Effect & Animations**

#### **Enable Ripple**
Tambahkan class `btn-link`:
```html
<a class="btn-link ...">Button</a>
```

#### **Enable Fade-up Animation**
Tambahkan class `fade-up`:
```html
<div class="fade-up">Content</div>
```

---

## 🌐 Deployment

### **Netlify (Recommended)**

#### **Method 1: Drag & Drop**
1. Login ke [netlify.com](https://netlify.com)
2. Drag folder `Today` ke Netlify
3. Done! ✅

#### **Method 2: Git**
1. Push code ke GitHub
2. Connect repository di Netlify
3. Auto-deploy on push

#### **Environment Variables**
Tidak perlu! Supabase keys sudah di client-side.

### **Vercel**
```bash
npm i -g vercel
vercel
```

### **GitHub Pages**
1. Push ke GitHub
2. Settings → Pages
3. Select branch → Save

### **Custom Domain**
1. Beli domain (Namecheap, GoDaddy, dll)
2. Add custom domain di Netlify/Vercel
3. Update DNS records
4. Wait for SSL certificate

---

## 📱 PWA Installation

### **Desktop (Chrome/Edge)**
1. Buka website
2. Klik icon "Install" di address bar
3. Atau klik button "Install App" di website

### **Mobile (Android)**
1. Buka website di Chrome
2. Tap menu (⋮)
3. Tap "Add to Home screen"
4. Icon akan muncul di home screen

### **Mobile (iOS)**
1. Buka website di Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Icon akan muncul di home screen

---

## 🔒 Security

### **Analytics Password**
- Default: `jiawialo641`
- **PENTING**: Ganti password di production!
- Stored di `script.js` → `ANALYTICS_PASSWORD`

### **Supabase Keys**
- Anon key aman di client-side
- Protected by Row Level Security (RLS)
- No service role key di client

### **HTTPS**
- Netlify/Vercel auto-provide SSL
- Required untuk PWA & Service Worker

---

## 📊 Analytics Data

### **What's Tracked**
- ✅ Page visits (URL, referrer, user agent)
- ✅ Geolocation (country, city)
- ✅ Session duration
- ✅ Social media clicks
- ✅ Device type (mobile/desktop/tablet)
- ✅ Traffic source (direct/social/search)

### **What's NOT Tracked**
- ❌ Personal information (name, email)
- ❌ Passwords
- ❌ Form data
- ❌ Cookies (except localStorage for preferences)

### **Privacy Compliant**
- No third-party trackers
- No cookies for tracking
- Self-hosted analytics
- GDPR friendly

---

## 🐛 Troubleshooting

### **Analytics tidak muncul**
1. Check Supabase credentials
2. Check browser console for errors
3. Verify tables exist di Supabase
4. Check RLS policies enabled

### **Geolocation tidak akurat**
- API gratis memiliki limitasi
- Gunakan VPN untuk test
- Fallback ke "Unknown" jika API gagal

### **Charts tidak muncul**
1. Check Chart.js loaded (CDN)
2. Check browser console
3. Verify data exists di database

### **PWA tidak install**
1. Must use HTTPS (localhost OK)
2. Need Service Worker
3. Need manifest.webmanifest
4. Check browser compatibility

### **Dark mode tidak save**
- Check localStorage enabled
- Check browser privacy settings
- Try different browser

---

## 📚 Documentation Files

- `README.md` - This file (overview & setup)
- `SUPABASE_SETUP.md` - Detailed Supabase configuration
- `DEPLOYMENT_FIX.md` - Deployment troubleshooting
- `MULTILANGUAGE_DASHBOARD.md` - Multi-language implementation
- `LANGUAGE_FIX.md` - Language system details

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun komersial.

---

## 👨‍💻 Author

**Jia Wialo**
- Website: [jiawialo.netlify.app](https://jiawialo.netlify.app)
- TikTok: [@jiawialo](https://tiktok.com/@jiawialo)
- Instagram: [@jiawialo](https://instagram.com/jiawialo)

---

## 🙏 Credits

- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Simple yet flexible JavaScript charting
- **Supabase** - Open source Firebase alternative
- **Netlify** - Deploy & hosting platform
- **Simple Icons** - SVG icons for popular brands

---

**⭐ Star this repo if you find it useful!**
