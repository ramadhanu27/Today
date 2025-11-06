// Inisialisasi Dark Mode
function initDarkMode() {
    // Cek preferensi tema dari localStorage
    let darkModePreference = localStorage.getItem('darkModePreference') || 'system';
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Fungsi untuk mendeteksi preferensi sistem
    function prefersDarkMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Fungsi untuk menerapkan tema
    function applyTheme() {
        let shouldApplyDark = false;
        
        switch (darkModePreference) {
            case 'dark':
                shouldApplyDark = true;
                break;
            case 'light':
                shouldApplyDark = false;
                break;
            case 'system':
            default:
                shouldApplyDark = prefersDarkMode();
                break;
        }
        
        if (shouldApplyDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Update ikon
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');
        if (sunIcon && moonIcon) {
            sunIcon.classList.toggle('hidden', shouldApplyDark);
            moonIcon.classList.toggle('hidden', !shouldApplyDark);
        }
        
        // Simpan status dark mode
        localStorage.setItem('darkMode', shouldApplyDark);
    }
    
    // Terapkan tema saat inisialisasi
    applyTheme();
    
    // Tambahkan listener untuk perubahan preferensi sistem
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (darkModePreference === 'system') {
                applyTheme();
            }
        });
    }
    
    // Toggle dark mode saat tombol diklik
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            // Jika menggunakan preferensi sistem, ubah ke manual
            if (darkModePreference === 'system') {
                darkModePreference = prefersDarkMode() ? 'light' : 'dark';
            } else {
                // Toggle antara light dan dark
                darkModePreference = darkModePreference === 'dark' ? 'light' : 'dark';
            }
            
            localStorage.setItem('darkModePreference', darkModePreference);
            applyTheme();
            
            // Refresh charts if analytics dashboard is open
            const dashboard = document.getElementById('analyticsDashboard');
            if (dashboard && !dashboard.classList.contains('hidden')) {
                loadAnalyticsData();
            }
        });
    }
    
    // Ekspos fungsi untuk digunakan di panel pengaturan
    window.darkModeUtils = {
        setPreference: (preference) => {
            darkModePreference = preference;
            localStorage.setItem('darkModePreference', preference);
            applyTheme();
        },
        getPreference: () => darkModePreference,
        applyTheme: applyTheme
    };
}

// Inisialisasi panel pengaturan
function initSettingsPanel() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    
    // Tampilkan panel pengaturan
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.remove('hidden');
        setTimeout(() => {
            settingsPanel.classList.remove('opacity-0', 'translate-y-2');
        }, 10);
        
        // Set radio button sesuai preferensi saat ini
        const currentPreference = window.darkModeUtils.getPreference();
        document.querySelector(`input[name="theme"][value="${currentPreference}"]`).checked = true;
    });
    
    // Tutup panel pengaturan
    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
            settingsPanel.classList.add('hidden');
        }, 300);
    });
    
    // Ubah tema saat radio button dipilih
    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                window.darkModeUtils.setPreference(radio.value);
            }
        });
    });
    
    // Tutup panel jika klik di luar panel
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && e.target !== settingsToggle && !settingsToggle.contains(e.target) && !settingsPanel.classList.contains('hidden')) {
            settingsPanel.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => {
                settingsPanel.classList.add('hidden');
            }, 300);
        }
    });
}

// Internationalization (i18n)
const translations = {
  id: {
    title: 'Jia Wialo',
    desc:
      'Douyin Subtitle Indonesia<br>Berbagi video, subtitle, dan info menarik seputar Douyin & budaya Tiongkok. Temukan konten terbaru!<br>Follow semua sosial media untuk update dan kolaborasi.',
    // Analytics Dashboard
    analytics: {
      title: 'Dashboard Analytics',
      passwordTitle: 'Akses Analytics',
      passwordDesc: 'Masukkan password untuk melihat dashboard analytics',
      passwordPlaceholder: 'Password',
      adminLogin: 'Login Admin',
      cancel: 'Batal',
      viewAsGuest: 'Lihat sebagai Tamu (Hanya Baca)',
      incorrectPassword: 'Password salah',
      adminMode: '👑 Mode Admin',
      viewOnly: '👁️ Hanya Lihat',
      timeRange: 'Rentang Waktu:',
      today: 'Hari Ini',
      yesterday: 'Kemarin',
      last7days: '7 Hari Terakhir',
      last30days: '30 Hari Terakhir',
      last90days: '90 Hari Terakhir',
      thisMonth: 'Bulan Ini',
      lastMonth: 'Bulan Lalu',
      allTime: 'Semua Waktu',
      customRange: 'Rentang Kustom',
      apply: 'Terapkan',
      to: 'sampai',
      liveNow: 'Live Sekarang',
      todayVisits: 'Kunjungan Hari Ini',
      thisWeek: 'Minggu Ini',
      thisMonth2: 'Bulan Ini',
      totalVisits: 'Total Kunjungan',
      avgSession: 'Rata-rata Sesi',
      goalsTargets: 'Tujuan & Target',
      editGoals: 'Edit Tujuan',
      dailyGoal: 'Target Harian',
      weeklyGoal: 'Target Mingguan',
      monthlyGoal: 'Target Bulanan',
      complete: 'selesai',
      goalAchieved: 'Target Tercapai! 🎯',
      moreToGo: 'lagi untuk mencapai target',
      last7DaysTrend: 'Tren 7 Hari Terakhir',
      todayHourlyTraffic: 'Traffic Per Jam Hari Ini',
      trafficSources: 'Sumber Traffic',
      deviceBreakdown: 'Pembagian Perangkat',
      socialMediaClicks: 'Klik Media Sosial',
      topCountries: 'Negara Teratas',
      recentVisits: 'Kunjungan Terbaru',
      dateTime: 'Tanggal & Waktu',
      location: 'Lokasi',
      referrer: 'Referrer',
      device: 'Perangkat',
      exportCSV: 'Export CSV',
      refreshData: 'Refresh Data',
      setYourGoals: 'Atur Tujuan Anda',
      dailyVisitsGoal: 'Target Kunjungan Harian',
      weeklyVisitsGoal: 'Target Kunjungan Mingguan',
      monthlyVisitsGoal: 'Target Kunjungan Bulanan',
      saveGoals: 'Simpan Tujuan',
      noDataYet: 'Belum ada data',
      loading: 'Memuat...',
      noClicksYet: 'Belum ada klik',
      visits: 'kunjungan',
      click: 'klik',
      clicks: 'klik',
      direct: 'Langsung',
      socialMedia: 'Media Sosial',
      searchEngine: 'Mesin Pencari',
      other: 'Lainnya',
      mobile: 'Mobile',
      desktop: 'Desktop',
      tablet: 'Tablet',
      unknown: 'Tidak Diketahui',
      adminRequired: 'Akses admin diperlukan',
      adminRequiredGoals: 'Akses admin diperlukan untuk edit tujuan',
      adminRequiredExport: 'Akses admin diperlukan untuk export data'
    }
  },
  en: {
    title: 'Jia Wialo',
    desc:
      'Douyin Subtitles in Indonesia<br>Sharing videos, subtitles, and interesting info about Douyin & Chinese culture. Discover the latest content!<br>Follow all social media for updates and collaboration.',
    // Analytics Dashboard
    analytics: {
      title: 'Analytics Dashboard',
      passwordTitle: 'Analytics Access',
      passwordDesc: 'Enter password to view analytics dashboard',
      passwordPlaceholder: 'Password',
      adminLogin: 'Admin Login',
      cancel: 'Cancel',
      viewAsGuest: 'View as Guest (Read Only)',
      incorrectPassword: 'Incorrect password',
      adminMode: '👑 Admin Mode',
      viewOnly: '👁️ View Only',
      timeRange: 'Time Range:',
      today: 'Today',
      yesterday: 'Yesterday',
      last7days: 'Last 7 Days',
      last30days: 'Last 30 Days',
      last90days: 'Last 90 Days',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      allTime: 'All Time',
      customRange: 'Custom Range',
      apply: 'Apply',
      to: 'to',
      liveNow: 'Live Now',
      todayVisits: "Today's Visits",
      thisWeek: 'This Week',
      thisMonth2: 'This Month',
      totalVisits: 'Total Visits',
      avgSession: 'Avg. Session',
      goalsTargets: 'Goals & Targets',
      editGoals: 'Edit Goals',
      dailyGoal: 'Daily Goal',
      weeklyGoal: 'Weekly Goal',
      monthlyGoal: 'Monthly Goal',
      complete: 'complete',
      goalAchieved: 'Goal Achieved! 🎯',
      moreToGo: 'more to go',
      last7DaysTrend: 'Last 7 Days Trend',
      todayHourlyTraffic: "Today's Hourly Traffic",
      trafficSources: 'Traffic Sources',
      deviceBreakdown: 'Device Breakdown',
      socialMediaClicks: 'Social Media Clicks',
      topCountries: 'Top Countries',
      recentVisits: 'Recent Visits',
      dateTime: 'Date & Time',
      location: 'Location',
      referrer: 'Referrer',
      device: 'Device',
      exportCSV: 'Export CSV',
      refreshData: 'Refresh Data',
      setYourGoals: 'Set Your Goals',
      dailyVisitsGoal: 'Daily Visits Goal',
      weeklyVisitsGoal: 'Weekly Visits Goal',
      monthlyVisitsGoal: 'Monthly Visits Goal',
      saveGoals: 'Save Goals',
      noDataYet: 'No data yet',
      loading: 'Loading...',
      noClicksYet: 'No clicks yet',
      visits: 'visits',
      click: 'click',
      clicks: 'clicks',
      direct: 'Direct',
      socialMedia: 'Social Media',
      searchEngine: 'Search Engine',
      other: 'Other',
      mobile: 'Mobile',
      desktop: 'Desktop',
      tablet: 'Tablet',
      unknown: 'Unknown',
      adminRequired: 'Admin access required',
      adminRequiredGoals: 'Admin access required to edit goals',
      adminRequiredExport: 'Admin access required to export data'
    }
  },
  zh: {
    title: '贾·维娆 Jia Wialo',
    desc:
      '抖音印尼字幕<br>分享抖音视频、字幕以及中国文化的有趣资讯。发现最新内容！<br>关注所有社交媒体获取更新与合作信息。',
    analytics: {
      title: '分析仪表板',
      passwordTitle: '分析访问',
      passwordDesc: '输入密码查看分析仪表板',
      passwordPlaceholder: '密码',
      adminLogin: '管理员登录',
      cancel: '取消',
      viewAsGuest: '以访客身份查看（只读）',
      incorrectPassword: '密码错误',
      adminMode: '👑 管理员模式',
      viewOnly: '👁️ 仅查看',
      timeRange: '时间范围：',
      today: '今天',
      yesterday: '昨天',
      last7days: '最近7天',
      last30days: '最近30天',
      last90days: '最近90天',
      thisMonth: '本月',
      lastMonth: '上月',
      allTime: '所有时间',
      customRange: '自定义范围',
      apply: '应用',
      to: '至',
      liveNow: '实时在线',
      todayVisits: '今日访问',
      thisWeek: '本周',
      thisMonth2: '本月',
      totalVisits: '总访问量',
      avgSession: '平均会话',
      goalsTargets: '目标与指标',
      editGoals: '编辑目标',
      dailyGoal: '每日目标',
      weeklyGoal: '每周目标',
      monthlyGoal: '每月目标',
      complete: '完成',
      goalAchieved: '目标达成！🎯',
      moreToGo: '还需',
      last7DaysTrend: '最近7天趋势',
      todayHourlyTraffic: '今日每小时流量',
      trafficSources: '流量来源',
      deviceBreakdown: '设备分布',
      socialMediaClicks: '社交媒体点击',
      topCountries: '热门国家',
      recentVisits: '最近访问',
      dateTime: '日期时间',
      location: '位置',
      referrer: '来源',
      device: '设备',
      exportCSV: '导出CSV',
      refreshData: '刷新数据',
      setYourGoals: '设置目标',
      dailyVisitsGoal: '每日访问目标',
      weeklyVisitsGoal: '每周访问目标',
      monthlyVisitsGoal: '每月访问目标',
      saveGoals: '保存目标',
      noDataYet: '暂无数据',
      loading: '加载中...',
      noClicksYet: '暂无点击',
      visits: '次访问',
      click: '次点击',
      clicks: '次点击',
      direct: '直接访问',
      socialMedia: '社交媒体',
      searchEngine: '搜索引擎',
      other: '其他',
      mobile: '移动设备',
      desktop: '桌面设备',
      tablet: '平板设备',
      unknown: '未知',
      adminRequired: '需要管理员权限',
      adminRequiredGoals: '需要管理员权限才能编辑目标',
      adminRequiredExport: '需要管理员权限才能导出数据'
    }
  }
};

function applyLanguage(lang) {
  const t = translations[lang] || translations.id;
  const titleEl = document.getElementById('headlineTitle');
  const descEl = document.getElementById('headlineDesc');
  if (titleEl) titleEl.textContent = t.title;
  if (descEl) descEl.innerHTML = t.desc; // contains <br>
  
  // Apply to analytics dashboard if exists
  applyAnalyticsLanguage(lang);
}

function applyAnalyticsLanguage(lang) {
  const t = (translations[lang] || translations.id).analytics;
  
  // Password Modal
  const passwordTitle = document.querySelector('#passwordModal h3');
  const passwordDesc = document.querySelector('#passwordModal p');
  const passwordInput = document.getElementById('analyticsPassword');
  const submitPassword = document.getElementById('submitPassword');
  const cancelPassword = document.getElementById('cancelPassword');
  const viewAsGuest = document.getElementById('viewAsGuest');
  const passwordError = document.getElementById('passwordError');
  
  if (passwordTitle) passwordTitle.textContent = t.passwordTitle;
  if (passwordDesc) passwordDesc.textContent = t.passwordDesc;
  if (passwordInput) passwordInput.placeholder = t.passwordPlaceholder;
  if (submitPassword) submitPassword.textContent = t.adminLogin;
  if (cancelPassword) cancelPassword.textContent = t.cancel;
  if (viewAsGuest) {
    const svg = viewAsGuest.querySelector('svg');
    viewAsGuest.innerHTML = '';
    if (svg) viewAsGuest.appendChild(svg);
    viewAsGuest.appendChild(document.createTextNode(t.viewAsGuest));
  }
  if (passwordError) passwordError.textContent = t.incorrectPassword;
  
  // Dashboard Header
  const dashboardTitle = document.querySelector('#analyticsDashboard h2');
  if (dashboardTitle) dashboardTitle.textContent = t.title;
  
  // Update mode indicator if visible
  updateModeUI();
  
  // Date Range Filter
  const timeRangeLabel = document.getElementById('timeRangeLabel');
  if (timeRangeLabel) timeRangeLabel.textContent = t.timeRange;
  
  // Update dropdown options
  const dateFilterOptions = document.querySelectorAll('#dateRangeFilter option');
  dateFilterOptions.forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (key && t[key]) {
      option.textContent = t[key];
    }
  });
  
  // Custom date "to" text
  const customDateTo = document.querySelector('#customDateInputs span');
  if (customDateTo) customDateTo.textContent = t.to;
  
  // Apply button
  const applyBtn = document.getElementById('applyCustomDate');
  if (applyBtn) applyBtn.textContent = t.apply;
  
  // Goals Modal
  const goalsModalTitle = document.querySelector('#editGoalsModal h3');
  const dailyGoalLabel = document.querySelector('label[for="dailyGoal"]') || document.querySelectorAll('#editGoalsModal label')[0];
  const weeklyGoalLabel = document.querySelector('label[for="weeklyGoal"]') || document.querySelectorAll('#editGoalsModal label')[1];
  const monthlyGoalLabel = document.querySelector('label[for="monthlyGoal"]') || document.querySelectorAll('#editGoalsModal label')[2];
  const saveGoalsBtn = document.getElementById('saveGoals');
  const cancelGoalsBtn = document.getElementById('cancelGoals');
  
  if (goalsModalTitle) goalsModalTitle.textContent = t.setYourGoals;
  if (dailyGoalLabel) dailyGoalLabel.textContent = t.dailyVisitsGoal;
  if (weeklyGoalLabel) weeklyGoalLabel.textContent = t.weeklyVisitsGoal;
  if (monthlyGoalLabel) monthlyGoalLabel.textContent = t.monthlyVisitsGoal;
  if (saveGoalsBtn) saveGoalsBtn.textContent = t.saveGoals;
  if (cancelGoalsBtn) cancelGoalsBtn.textContent = t.cancel;
  
  // Action Buttons
  const exportBtn = document.querySelector('#exportCSV span:not(.sm\\:hidden)');
  const exportBtnMobile = document.querySelector('#exportCSV .sm\\:hidden');
  const refreshBtn = document.querySelector('#refreshAnalytics span:not(.sm\\:hidden)');
  const refreshBtnMobile = document.querySelector('#refreshAnalytics .sm\\:hidden');
  
  if (exportBtn) exportBtn.textContent = t.exportCSV;
  if (exportBtnMobile) exportBtnMobile.textContent = t.exportCSV.split(' ')[0]; // "Export" only
  if (refreshBtn) refreshBtn.textContent = t.refreshData;
  if (refreshBtnMobile) refreshBtnMobile.textContent = t.refreshData.split(' ')[0]; // "Refresh" only
  
  // Store current language for later use
  window.currentAnalyticsLang = lang;
  
  // Re-render dynamic content if dashboard is open
  const dashboard = document.getElementById('analyticsDashboard');
  if (dashboard && !dashboard.classList.contains('hidden')) {
    updateGoalsDisplay();
  }
}

function initLanguage() {
  const select = document.getElementById('langSwitcher');
  // Load saved language or detect from browser (id/en/zh)
  let saved = localStorage.getItem('siteLanguage');
  if (!saved) {
    const nav = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
    if (nav.startsWith('zh')) saved = 'zh';
    else if (nav.startsWith('en')) saved = 'en';
    else saved = 'id';
  }
  applyLanguage(saved);
  if (select) {
    select.value = saved;
    select.addEventListener('change', () => {
      const lang = select.value;
      localStorage.setItem('siteLanguage', lang);
      applyLanguage(lang);
    });
  }
}

// Supabase Configuration
const SUPABASE_URL = 'https://tlspobjgdbtbapbzctlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsc3BvYmpnZGJ0YmFwYnpjdGx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQzNjE0MSwiZXhwIjoyMDc4MDEyMTQxfQ.TcBWSNyPCGJjXqDjSxpd38OThl-Pkca9cifNIH7IAIs';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Analytics Password (change this to your desired password)
const ANALYTICS_PASSWORD = 'jiawialo641';

// Panggil fungsi inisialisasi dark mode dan panel pengaturan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSettingsPanel();
    initLanguage();
    registerServiceWorker();
    initRipple();
    initEntranceAnimations();
    initAnalytics();
    trackPageVisit();
    initClickTracking();
});

// Jam digital
function updateClock() {
  const now = new Date();
  let h = now.getHours().toString().padStart(2, "0");
  let m = now.getMinutes().toString().padStart(2, "0");
  let s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("digitalClock").textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Ripple effect for buttons/links
function initRipple() {
  const targets = document.querySelectorAll('.btn-link');
  targets.forEach((el) => {
    // Ensure container styles
    el.classList.add('ripple-container', 'focusable');
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

// Entrance animations
function initEntranceAnimations() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.fade-up').forEach((el) => {
      el.classList.add('show');
    });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));
}

// PWA: Service Worker registration and install prompt
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('Service Worker registered');
    }).catch(err => console.warn('SW registration failed:', err));
  }

  // Handle install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Create a lightweight install button if not exists
    if (!document.getElementById('pwaInstallBtn')) {
      const btn = document.createElement('button');
      btn.id = 'pwaInstallBtn';
      btn.textContent = 'Install App';
      btn.className = 'fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm z-50';
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('PWA install:', outcome);
            deferredPrompt = null;
          }
        } finally {
          btn.remove();
        }
      });
      document.body.appendChild(btn);
    }
  });

  // Optionally hide the button after installed
  window.addEventListener('appinstalled', () => {
    const btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.remove();
    console.log('App installed');
  });
}

// ============ ANALYTICS FUNCTIONS ============

// Generate unique session ID
function getSessionId() {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

// Get geolocation from IP with multiple fallbacks
async function getGeolocation() {
  // Try multiple APIs in sequence
  const apis = [
    // API 1: ip-api.com (free, unlimited for non-commercial)
    async () => {
      const response = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,city');
      const data = await response.json();
      if (data.status === 'success') {
        return {
          country: data.country,
          city: data.city,
          country_code: data.countryCode
        };
      }
      throw new Error('ip-api failed');
    },
    // API 2: ipapi.co (backup)
    async () => {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data.country_name) {
        return {
          country: data.country_name,
          city: data.city,
          country_code: data.country_code
        };
      }
      throw new Error('ipapi.co failed');
    },
    // API 3: ipwhois.app (backup)
    async () => {
      const response = await fetch('https://ipwho.is/');
      const data = await response.json();
      if (data.success) {
        return {
          country: data.country,
          city: data.city,
          country_code: data.country_code
        };
      }
      throw new Error('ipwho.is failed');
    }
  ];

  // Try each API until one succeeds
  for (const api of apis) {
    try {
      const result = await api();
      console.log('Geolocation detected:', result);
      return result;
    } catch (error) {
      console.warn('Geolocation API attempt failed:', error.message);
      continue;
    }
  }

  // All APIs failed
  console.warn('All geolocation APIs failed');
  return {
    country: 'Unknown',
    city: 'Unknown',
    country_code: 'XX'
  };
}

// Track page visit
let visitStartTime = Date.now();
let currentVisitId = null;

async function trackPageVisit() {
  try {
    // Get geolocation
    const location = await getGeolocation();
    
    const visitData = {
      created_at: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      page_url: window.location.href,
      session_id: getSessionId(),
      country: location.country,
      city: location.city,
      country_code: location.countryCode,
      session_duration: 0
    };

    const { data, error } = await supabase
      .from('page_visits')
      .insert([visitData])
      .select();

    if (error) {
      console.error('Error tracking visit:', error);
    } else {
      console.log('Visit tracked successfully');
      if (data && data[0]) {
        currentVisitId = data[0].id;
        visitStartTime = Date.now();
      }
    }
  } catch (err) {
    console.error('Error tracking visit:', err);
  }
}

// Update session duration
async function updateSessionDuration() {
  if (!currentVisitId) return;
  
  const duration = Math.floor((Date.now() - visitStartTime) / 1000); // in seconds
  
  try {
    const { error } = await supabase
      .from('page_visits')
      .update({ session_duration: duration })
      .eq('id', currentVisitId);
    
    if (error) {
      console.error('Error updating session duration:', error);
    }
  } catch (err) {
    console.error('Error updating session duration:', err);
  }
}

// Update duration every 30 seconds
setInterval(updateSessionDuration, 30000);

// Update on page unload
window.addEventListener('beforeunload', () => {
  updateSessionDuration();
});

// Analytics mode: 'guest' or 'admin'
let analyticsMode = 'guest';

// Update UI based on mode
function updateModeUI() {
  const lang = window.currentAnalyticsLang || localStorage.getItem('siteLanguage') || 'id';
  const t = (translations[lang] || translations.id).analytics;
  
  const modeIndicator = document.getElementById('modeIndicator');
  const editGoalsBtn = document.getElementById('editGoals');
  const exportCSVBtn = document.getElementById('exportCSV');
  
  if (analyticsMode === 'admin') {
    // Admin mode - full access
    if (modeIndicator) modeIndicator.textContent = t.adminMode;
    if (modeIndicator) {
      modeIndicator.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      modeIndicator.classList.remove('hidden');
    }
    
    if (editGoalsBtn) editGoalsBtn.classList.remove('hidden');
    if (exportCSVBtn) exportCSVBtn.disabled = false;
    if (exportCSVBtn) exportCSVBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    // Guest mode - read only
    if (modeIndicator) modeIndicator.textContent = t.viewOnly;
    if (modeIndicator) {
      modeIndicator.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      modeIndicator.classList.remove('hidden');
    }
    
    if (editGoalsBtn) editGoalsBtn.classList.add('hidden');
    if (exportCSVBtn) exportCSVBtn.disabled = true;
    if (exportCSVBtn) exportCSVBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
}

// Initialize Analytics UI
function initAnalytics() {
  const analyticsToggle = document.getElementById('analyticsToggle');
  const passwordModal = document.getElementById('passwordModal');
  const analyticsDashboard = document.getElementById('analyticsDashboard');
  const analyticsPassword = document.getElementById('analyticsPassword');
  const submitPassword = document.getElementById('submitPassword');
  const cancelPassword = document.getElementById('cancelPassword');
  const viewAsGuest = document.getElementById('viewAsGuest');
  const closeDashboard = document.getElementById('closeDashboard');
  const passwordError = document.getElementById('passwordError');
  const refreshAnalytics = document.getElementById('refreshAnalytics');

  // Debug log
  console.log('Analytics initialized. Button found:', !!analyticsToggle);
  
  if (!analyticsToggle) {
    console.error('Analytics button not found!');
    return;
  }

  // Show password modal
  analyticsToggle.addEventListener('click', () => {
    console.log('Analytics button clicked!');
    passwordModal.classList.remove('hidden');
    analyticsPassword.value = '';
    passwordError.classList.add('hidden');
    setTimeout(() => analyticsPassword.focus(), 100);
  });

  // View as Guest
  viewAsGuest.addEventListener('click', () => {
    analyticsMode = 'guest';
    passwordModal.classList.add('hidden');
    analyticsDashboard.classList.remove('hidden');
    updateModeUI();
    loadAnalyticsData();
  });

  // Cancel password
  cancelPassword.addEventListener('click', () => {
    passwordModal.classList.add('hidden');
  });

  // Submit password
  const checkPassword = () => {
    if (analyticsPassword.value === ANALYTICS_PASSWORD) {
      analyticsMode = 'admin';
      passwordModal.classList.add('hidden');
      analyticsDashboard.classList.remove('hidden');
      passwordError.classList.add('hidden');
      updateModeUI();
      loadAnalyticsData();
    } else {
      passwordError.classList.remove('hidden');
    }
  };

  submitPassword.addEventListener('click', checkPassword);
  analyticsPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });

  // Close dashboard
  closeDashboard.addEventListener('click', () => {
    analyticsDashboard.classList.add('hidden');
  });

  // Refresh analytics
  refreshAnalytics.addEventListener('click', () => {
    loadAnalyticsData();
  });

  // Export CSV
  const exportCSV = document.getElementById('exportCSV');
  exportCSV.addEventListener('click', () => {
    if (analyticsMode !== 'admin') {
      const lang = window.currentAnalyticsLang || localStorage.getItem('siteLanguage') || 'id';
      const t = (translations[lang] || translations.id).analytics;
      alert(t.adminRequiredExport);
      return;
    }
    exportAnalyticsToCSV();
  });

  // Date Range Filter
  const dateRangeFilter = document.getElementById('dateRangeFilter');
  const customDateInputs = document.getElementById('customDateInputs');
  const applyCustomDate = document.getElementById('applyCustomDate');

  dateRangeFilter.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      customDateInputs.classList.remove('hidden');
    } else {
      customDateInputs.classList.add('hidden');
      loadAnalyticsData();
    }
  });

  applyCustomDate.addEventListener('click', () => {
    loadAnalyticsData();
  });

  // Goals Management
  const editGoalsBtn = document.getElementById('editGoals');
  const editGoalsModal = document.getElementById('editGoalsModal');
  const saveGoalsBtn = document.getElementById('saveGoals');
  const cancelGoalsBtn = document.getElementById('cancelGoals');

  editGoalsBtn.addEventListener('click', () => {
    if (analyticsMode !== 'admin') {
      const lang = window.currentAnalyticsLang || localStorage.getItem('siteLanguage') || 'id';
      const t = (translations[lang] || translations.id).analytics;
      alert(t.adminRequiredGoals);
      return;
    }
    loadGoalsToForm();
    editGoalsModal.classList.remove('hidden');
  });

  saveGoalsBtn.addEventListener('click', () => {
    saveGoals();
    editGoalsModal.classList.add('hidden');
    updateGoalsDisplay();
  });

  cancelGoalsBtn.addEventListener('click', () => {
    editGoalsModal.classList.add('hidden');
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      passwordModal.classList.add('hidden');
      analyticsDashboard.classList.add('hidden');
    }
  });
}

// Load Analytics Data
let visitsChart = null;

// Get date range from filter
function getDateRange() {
  const filter = document.getElementById('dateRangeFilter').value;
  const now = new Date();
  let startDate, endDate = now;

  switch(filter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'yesterday':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case '7days':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90days':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case 'thisMonth':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'lastMonth':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'custom':
      const startInput = document.getElementById('startDate').value;
      const endInput = document.getElementById('endDate').value;
      if (startInput && endInput) {
        startDate = new Date(startInput);
        endDate = new Date(endInput);
        endDate.setHours(23, 59, 59, 999);
      } else {
        startDate = new Date(0);
      }
      break;
    default: // 'all'
      startDate = new Date(0);
  }

  return { startDate, endDate };
}

async function loadAnalyticsData() {
  try {
    // Get all visits
    const { data: allVisits, error: allError } = await supabase
      .from('page_visits')
      .select('*')
      .order('created_at', { ascending: false });

    if (allError) throw allError;

    // Filter by date range
    const { startDate, endDate } = getDateRange();
    const filteredVisits = allVisits.filter(v => {
      const visitDate = new Date(v.created_at);
      return visitDate >= startDate && visitDate <= endDate;
    });

    // Calculate statistics
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayVisits = allVisits.filter(v => new Date(v.created_at) >= todayStart).length;
    const weekVisits = allVisits.filter(v => new Date(v.created_at) >= weekStart).length;
    const monthVisits = allVisits.filter(v => new Date(v.created_at) >= monthStart).length;
    const totalVisits = filteredVisits.length;

    // Calculate average session duration
    const validSessions = filteredVisits.filter(v => v.session_duration && v.session_duration > 0);
    const avgDuration = validSessions.length > 0
      ? Math.floor(validSessions.reduce((sum, v) => sum + v.session_duration, 0) / validSessions.length)
      : 0;
    
    const formatDuration = (seconds) => {
      if (seconds < 60) return `${seconds}s`;
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}m ${secs}s`;
    };

    // Update stats cards
    document.getElementById('todayVisits').textContent = todayVisits;
    document.getElementById('weekVisits').textContent = weekVisits;
    document.getElementById('monthVisits').textContent = monthVisits;
    document.getElementById('totalVisits').textContent = totalVisits;
    document.getElementById('avgSession').textContent = formatDuration(avgDuration);

    // Prepare chart data (last 7 days)
    const last7Days = [];
    const visitsByDay = {};
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push(dateStr);
      visitsByDay[dateStr] = 0;
    }

    allVisits.forEach(visit => {
      const dateStr = visit.created_at.split('T')[0];
      if (visitsByDay.hasOwnProperty(dateStr)) {
        visitsByDay[dateStr]++;
      }
    });

    const chartData = last7Days.map(date => visitsByDay[date]);
    const chartLabels = last7Days.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    // Update chart
    updateChart(chartLabels, chartData);

    // Update recent visits table
    updateRecentVisitsTable(filteredVisits.slice(0, 10));

    // Update top countries
    updateTopCountries(filteredVisits);

    // Calculate live visitors (last 5 minutes)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const liveVisitors = allVisits.filter(v => new Date(v.created_at) >= fiveMinutesAgo).length;
    document.getElementById('liveVisitors').textContent = liveVisitors;

    // Update hourly chart
    updateHourlyChart(filteredVisits);

    // Update traffic sources chart
    updateTrafficSourcesChart(filteredVisits);

    // Update device breakdown chart
    updateDeviceChart(filteredVisits);

    // Load social media clicks
    await loadSocialClicks();

    // Update goals display
    updateGoalsDisplay();

  } catch (error) {
    console.error('Error loading analytics:', error);
    alert('Error loading analytics data. Please check console for details.');
  }
}

// Get chart colors based on theme
function getChartColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    text: isDark ? '#e5e7eb' : '#374151',
    grid: isDark ? '#374151' : '#e5e7eb',
    background: isDark ? '#1f2937' : '#ffffff'
  };
}

// Update Chart
function updateChart(labels, data) {
  const ctx = document.getElementById('visitsChart');
  if (!ctx) return;

  // Destroy existing chart
  if (visitsChart) {
    visitsChart.destroy();
  }

  const colors = getChartColors();

  // Create new chart
  visitsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Visits',
        data: data,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: colors.text
          },
          grid: {
            color: colors.grid
          }
        },
        x: {
          ticks: {
            color: colors.text
          },
          grid: {
            color: colors.grid
          }
        }
      }
    }
  });
}

// Update Recent Visits Table
function updateRecentVisitsTable(visits) {
  const tbody = document.getElementById('recentVisitsTable');
  if (!tbody) return;

  if (visits.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
          No visits recorded yet
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = visits.map(visit => {
    const date = new Date(visit.created_at);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Parse user agent for device info
    const ua = visit.user_agent.toLowerCase();
    let device = 'Desktop';
    if (ua.includes('mobile')) device = 'Mobile';
    else if (ua.includes('tablet')) device = 'Tablet';

    // Shorten referrer
    let referrer = visit.referrer;
    if (referrer === 'Direct') {
      referrer = 'Direct';
    } else {
      try {
        const url = new URL(referrer);
        referrer = url.hostname;
      } catch {
        referrer = 'Unknown';
      }
    }

    // Location with flag emoji
    const location = visit.country && visit.country !== 'Unknown' 
      ? `${getCountryFlag(visit.country_code)} ${visit.city}, ${visit.country}`
      : '🌍 Unknown';

    return `
      <tr class="text-gray-700 dark:text-gray-300">
        <td class="px-4 py-3">${formattedDate}</td>
        <td class="px-4 py-3">${location}</td>
        <td class="px-4 py-3">${referrer}</td>
        <td class="px-4 py-3">${device}</td>
      </tr>
    `;
  }).join('');
}

// Get country flag emoji from country code
function getCountryFlag(countryCode) {
  if (!countryCode || countryCode === 'XX') return '🌍';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Update Top Countries
function updateTopCountries(visits) {
  const container = document.getElementById('topCountriesList');
  if (!container) return;

  // Count visits by country
  const countryCounts = {};
  visits.forEach(visit => {
    const country = visit.country || 'Unknown';
    const countryCode = visit.country_code || 'XX';
    const key = `${country}|${countryCode}`;
    
    if (!countryCounts[key]) {
      countryCounts[key] = { country, countryCode, count: 0 };
    }
    countryCounts[key].count++;
  });

  // Sort by count and get top 5
  const topCountries = Object.values(countryCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (topCountries.length === 0) {
    container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No data yet</p>';
    return;
  }

  const maxCount = topCountries[0].count;

  container.innerHTML = topCountries.map(item => {
    const percentage = (item.count / maxCount) * 100;
    return `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${getCountryFlag(item.countryCode)}</span>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.country}</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">${item.count} visits</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-purple-600 h-2 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============ NEW ANALYTICS FEATURES ============

// Update Hourly Chart
let hourlyChart = null;

function updateHourlyChart(visits) {
  const ctx = document.getElementById('hourlyChart');
  if (!ctx) return;

  // Get today's visits
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayVisits = visits.filter(v => new Date(v.created_at) >= todayStart);

  // Count by hour (0-23)
  const hourCounts = new Array(24).fill(0);
  todayVisits.forEach(visit => {
    const hour = new Date(visit.created_at).getHours();
    hourCounts[hour]++;
  });

  const labels = Array.from({length: 24}, (_, i) => `${i}:00`);
  const colors = getChartColors();

  if (hourlyChart) hourlyChart.destroy();

  hourlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Visits',
        data: hourCounts,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { 
        legend: { 
          display: false 
        } 
      },
      scales: {
        y: { 
          beginAtZero: true, 
          ticks: { 
            stepSize: 1,
            color: colors.text
          },
          grid: {
            color: colors.grid
          }
        },
        x: {
          ticks: {
            color: colors.text
          },
          grid: {
            color: colors.grid
          }
        }
      }
    }
  });
}

// Update Traffic Sources Chart
let sourcesChart = null;

function updateTrafficSourcesChart(visits) {
  const ctx = document.getElementById('sourcesChart');
  if (!ctx) return;

  // Categorize referrers
  const sources = {
    'Direct': 0,
    'Social Media': 0,
    'Search Engine': 0,
    'Other': 0
  };

  visits.forEach(visit => {
    const ref = visit.referrer.toLowerCase();
    if (ref === 'direct' || !ref) {
      sources['Direct']++;
    } else if (ref.includes('facebook') || ref.includes('instagram') || ref.includes('tiktok') || ref.includes('twitter') || ref.includes('youtube')) {
      sources['Social Media']++;
    } else if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo')) {
      sources['Search Engine']++;
    } else {
      sources['Other']++;
    }
  });

  const colors = getChartColors();

  if (sourcesChart) sourcesChart.destroy();

  sourcesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(sources),
      datasets: [{
        data: Object.values(sources),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: {
            color: colors.text
          }
        }
      }
    }
  });
}

// Update Device Chart
let deviceChart = null;

function updateDeviceChart(visits) {
  const ctx = document.getElementById('deviceChart');
  if (!ctx) return;

  const devices = { 'Mobile': 0, 'Desktop': 0, 'Tablet': 0 };

  visits.forEach(visit => {
    const ua = visit.user_agent.toLowerCase();
    if (ua.includes('mobile')) devices['Mobile']++;
    else if (ua.includes('tablet')) devices['Tablet']++;
    else devices['Desktop']++;
  });

  const colors = getChartColors();

  if (deviceChart) deviceChart.destroy();

  deviceChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(devices),
      datasets: [{
        data: Object.values(devices),
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: {
            color: colors.text
          }
        }
      }
    }
  });
}

// ============ CLICK TRACKING ============

// Initialize click tracking for social media links
function initClickTracking() {
  const socialLinks = document.querySelectorAll('a[href*="tiktok"], a[href*="instagram"], a[href*="facebook"], a[href*="youtube"], a[href*="gmail"]');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      const href = link.href;
      let platform = 'Unknown';
      
      if (href.includes('tiktok')) platform = 'TikTok';
      else if (href.includes('instagram')) platform = 'Instagram';
      else if (href.includes('facebook')) platform = 'Facebook';
      else if (href.includes('youtube')) platform = 'YouTube';
      else if (href.includes('gmail')) platform = 'Gmail';
      
      // Track click
      await trackSocialClick(platform);
    });
  });
}

// Track social media click
async function trackSocialClick(platform) {
  try {
    const location = await getGeolocation();
    
    const clickData = {
      created_at: new Date().toISOString(),
      platform: platform,
      session_id: getSessionId(),
      country: location.country,
      city: location.city
    };

    const { error } = await supabase
      .from('social_clicks')
      .insert([clickData]);

    if (error) {
      console.error('Error tracking click:', error);
    } else {
      console.log('Click tracked:', platform);
    }
  } catch (err) {
    console.error('Error tracking click:', err);
  }
}

// Load social media clicks
async function loadSocialClicks() {
  try {
    const { data: clicks, error } = await supabase
      .from('social_clicks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Count by platform
    const platformCounts = {};
    clicks.forEach(click => {
      platformCounts[click.platform] = (platformCounts[click.platform] || 0) + 1;
    });

    // Update UI
    const container = document.getElementById('socialClicksList');
    if (!container) return;

    if (Object.keys(platformCounts).length === 0) {
      container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4 col-span-2">No clicks yet</p>';
      return;
    }

    const getIcon = (platform) => {
      const iconMap = {
        'TikTok': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
        'Instagram': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
        'Facebook': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        'YouTube': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
        'Gmail': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/></svg>`
      };
      return iconMap[platform] || `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>`;
    };

    const colors = {
      'TikTok': 'from-black to-gray-800',
      'Instagram': 'from-purple-500 via-pink-500 to-orange-500',
      'Facebook': 'from-blue-600 to-blue-700',
      'YouTube': 'from-red-600 to-red-700',
      'Gmail': 'from-red-500 to-orange-500'
    };

    container.innerHTML = Object.entries(platformCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([platform, count]) => `
        <div class="bg-gradient-to-r ${colors[platform] || 'from-gray-400 to-gray-500'} rounded-lg sm:rounded-xl p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex-shrink-0">${getIcon(platform)}</div>
              <span class="text-sm sm:text-base font-semibold">${platform}</span>
            </div>
            <span class="text-xl sm:text-2xl font-bold">${count}</span>
          </div>
          <p class="text-xs sm:text-sm opacity-90 mt-1">${count} ${count !== 1 ? 'clicks' : 'click'}</p>
        </div>
      `).join('');

  } catch (error) {
    console.error('Error loading social clicks:', error);
  }
}

// ============ EXPORT TO CSV ============

async function exportAnalyticsToCSV() {
  try {
    // Get all visits
    const { data: visits, error } = await supabase
      .from('page_visits')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Create CSV content
    const headers = ['Date & Time', 'Country', 'City', 'Referrer', 'Device', 'User Agent'];
    const rows = visits.map(visit => {
      const date = new Date(visit.created_at).toLocaleString();
      const ua = visit.user_agent.toLowerCase();
      const device = ua.includes('mobile') ? 'Mobile' : ua.includes('tablet') ? 'Tablet' : 'Desktop';
      
      return [
        date,
        visit.country || 'Unknown',
        visit.city || 'Unknown',
        visit.referrer || 'Direct',
        device,
        visit.user_agent
      ];
    });

    // Build CSV
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    console.log('CSV exported successfully');
  } catch (error) {
    console.error('Error exporting CSV:', error);
    alert('Error exporting data. Please check console.');
  }
}

// ============ GOAL TRACKING ============

// Default goals
const DEFAULT_GOALS = {
  daily: 50,
  weekly: 300,
  monthly: 1000
};

// Get goals from localStorage
function getGoals() {
  const saved = localStorage.getItem('analyticsGoals');
  return saved ? JSON.parse(saved) : DEFAULT_GOALS;
}

// Save goals to localStorage
function saveGoals() {
  const goals = {
    daily: parseInt(document.getElementById('dailyGoal').value) || DEFAULT_GOALS.daily,
    weekly: parseInt(document.getElementById('weeklyGoal').value) || DEFAULT_GOALS.weekly,
    monthly: parseInt(document.getElementById('monthlyGoal').value) || DEFAULT_GOALS.monthly
  };
  localStorage.setItem('analyticsGoals', JSON.stringify(goals));
}

// Load goals to form
function loadGoalsToForm() {
  const goals = getGoals();
  document.getElementById('dailyGoal').value = goals.daily;
  document.getElementById('weeklyGoal').value = goals.weekly;
  document.getElementById('monthlyGoal').value = goals.monthly;
}

// Update goals display
function updateGoalsDisplay() {
  const lang = window.currentAnalyticsLang || localStorage.getItem('siteLanguage') || 'id';
  const t = (translations[lang] || translations.id).analytics;
  
  const goals = getGoals();
  const container = document.getElementById('goalsContainer');
  
  // Get current stats from the cards
  const todayVisits = parseInt(document.getElementById('todayVisits').textContent) || 0;
  const weekVisits = parseInt(document.getElementById('weekVisits').textContent) || 0;
  const monthVisits = parseInt(document.getElementById('monthVisits').textContent) || 0;
  
  const goalsData = [
    { label: t.dailyGoal, current: todayVisits, target: goals.daily, color: 'blue' },
    { label: t.weeklyGoal, current: weekVisits, target: goals.weekly, color: 'green' },
    { label: t.monthlyGoal, current: monthVisits, target: goals.monthly, color: 'purple' }
  ];
  
  container.innerHTML = goalsData.map(goal => {
    const percentage = Math.min(100, Math.floor((goal.current / goal.target) * 100));
    const isComplete = percentage >= 100;
    
    return `
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">${goal.label}</span>
          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">${goal.current} / ${goal.target}</span>
            ${isComplete ? '<span class="text-green-500">🎉</span>' : ''}
          </div>
        </div>
        <div class="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-${goal.color}-400 to-${goal.color}-600 rounded-full transition-all duration-500" 
               style="width: ${percentage}%"></div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500 dark:text-gray-400">${percentage}% ${t.complete}</span>
          ${isComplete 
            ? `<span class="text-xs text-green-600 dark:text-green-400 font-semibold">${t.goalAchieved}</span>` 
            : `<span class="text-xs text-gray-500 dark:text-gray-400">${goal.target - goal.current} ${t.moreToGo}</span>`
          }
        </div>
      </div>
    `;
  }).join('');
}
