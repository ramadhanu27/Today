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
      'Douyin Subtitle Indonesia<br>Berbagi video, subtitle, dan info menarik seputar Douyin & budaya Tiongkok. Temukan konten terbaru!<br>Follow semua sosial media untuk update dan kolaborasi.'
  },
  en: {
    title: 'Jia Wialo',
    desc:
      'Douyin Subtitles in Indonesia<br>Sharing videos, subtitles, and interesting info about Douyin & Chinese culture. Discover the latest content!<br>Follow all social media for updates and collaboration.'
  },
  zh: {
    title: '贾·维娆 Jia Wialo',
    desc:
      '抖音印尼字幕<br>分享抖音视频、字幕以及中国文化的有趣资讯。发现最新内容！<br>关注所有社交媒体获取更新与合作信息。'
  }
};

function applyLanguage(lang) {
  const t = translations[lang] || translations.id;
  const titleEl = document.getElementById('headlineTitle');
  const descEl = document.getElementById('headlineDesc');
  if (titleEl) titleEl.textContent = t.title;
  if (descEl) descEl.innerHTML = t.desc; // contains <br>
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
const ANALYTICS_PASSWORD = 'admin123';

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
      country_code: location.country_code
    };

    const { error } = await supabase
      .from('page_visits')
      .insert([visitData]);

    if (error) {
      console.error('Error tracking visit:', error);
    }
  } catch (err) {
    console.error('Error tracking visit:', err);
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

  // Cancel password
  cancelPassword.addEventListener('click', () => {
    passwordModal.classList.add('hidden');
  });

  // Submit password
  const checkPassword = () => {
    if (analyticsPassword.value === ANALYTICS_PASSWORD) {
      passwordModal.classList.add('hidden');
      analyticsDashboard.classList.remove('hidden');
      loadAnalyticsData();
    } else {
      passwordError.classList.remove('hidden');
      analyticsPassword.value = '';
      analyticsPassword.focus();
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
    exportAnalyticsToCSV();
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

async function loadAnalyticsData() {
  try {
    // Get all visits
    const { data: allVisits, error: allError } = await supabase
      .from('page_visits')
      .select('*')
      .order('created_at', { ascending: false });

    if (allError) throw allError;

    // Calculate statistics
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayVisits = allVisits.filter(v => new Date(v.created_at) >= todayStart).length;
    const weekVisits = allVisits.filter(v => new Date(v.created_at) >= weekStart).length;
    const monthVisits = allVisits.filter(v => new Date(v.created_at) >= monthStart).length;
    const totalVisits = allVisits.length;

    // Update stats cards
    document.getElementById('todayVisits').textContent = todayVisits;
    document.getElementById('weekVisits').textContent = weekVisits;
    document.getElementById('monthVisits').textContent = monthVisits;
    document.getElementById('totalVisits').textContent = totalVisits;

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
    updateRecentVisitsTable(allVisits.slice(0, 10));

    // Update top countries
    updateTopCountries(allVisits);

    // Calculate live visitors (last 5 minutes)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const liveVisitors = allVisits.filter(v => new Date(v.created_at) >= fiveMinutesAgo).length;
    document.getElementById('liveVisitors').textContent = liveVisitors;

    // Update hourly chart
    updateHourlyChart(allVisits);

    // Update traffic sources chart
    updateTrafficSourcesChart(allVisits);

    // Update device breakdown chart
    updateDeviceChart(allVisits);

    // Load social media clicks
    await loadSocialClicks();

  } catch (error) {
    console.error('Error loading analytics:', error);
    alert('Error loading analytics data. Please check console for details.');
  }
}

// Update Chart
function updateChart(labels, data) {
  const ctx = document.getElementById('visitsChart');
  if (!ctx) return;

  // Destroy existing chart
  if (visitsChart) {
    visitsChart.destroy();
  }

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
            stepSize: 1
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
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
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
        legend: { position: 'bottom' }
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
        legend: { position: 'bottom' }
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

    const icons = {
      'TikTok': '🎵',
      'Instagram': '📷',
      'Facebook': '👥',
      'YouTube': '📺',
      'Gmail': '📧'
    };

    const colors = {
      'TikTok': 'from-cyan-400 to-pink-400',
      'Instagram': 'from-pink-500 to-purple-500',
      'Facebook': 'from-blue-500 to-blue-600',
      'YouTube': 'from-red-500 to-red-600',
      'Gmail': 'from-red-400 to-orange-400'
    };

    container.innerHTML = Object.entries(platformCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([platform, count]) => `
        <div class="bg-gradient-to-r ${colors[platform] || 'from-gray-400 to-gray-500'} rounded-lg p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">${icons[platform] || '🔗'}</span>
              <span class="font-semibold">${platform}</span>
            </div>
            <span class="text-2xl font-bold">${count}</span>
          </div>
          <p class="text-sm opacity-90 mt-1">${count} click${count !== 1 ? 's' : ''}</p>
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
