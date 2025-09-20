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

// Panggil fungsi inisialisasi dark mode dan panel pengaturan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSettingsPanel();
    initLanguage();
    registerServiceWorker();
    initRipple();
    initEntranceAnimations();
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
