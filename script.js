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

// Panggil fungsi inisialisasi dark mode dan panel pengaturan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSettingsPanel();
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

// Dark Mode
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  // Cek preferensi tema dari localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Terapkan tema sesuai preferensi
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
  
  // Toggle dark mode saat tombol diklik
  darkModeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    
    // Update ikon
    const isDark = document.documentElement.classList.contains('dark');
    sunIcon.classList.toggle('hidden', isDark);
    moonIcon.classList.toggle('hidden', !isDark);
    
    // Simpan preferensi ke localStorage
    localStorage.setItem('darkMode', isDark);
  });
});

// Statistik Pengunjung
document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi data statistik dari localStorage atau buat baru jika belum ada
  let visitorStats = JSON.parse(localStorage.getItem('visitorStats')) || {
    totalVisitors: 0,
    visitDurations: [],
    dailyVisits: {},
    weeklyVisits: {},
    monthlyVisits: {},
    pageVisits: {
      'home': 0,
      'about': 0,
      'contact': 0,
      'gallery': 0
    },
    trafficSources: {
      'organic': 0,
      'referral': 0,
      'social': 0,
      'direct': 0,
      'other': 0
    },
    lastVisit: null,
    visitorLocations: [] // Array untuk menyimpan lokasi pengunjung
  };

  // Fungsi untuk menambah jumlah pengunjung
  function incrementVisitorCount() {
    visitorStats.totalVisitors++;
    document.getElementById('visitorCount').textContent = visitorStats.totalVisitors;
    document.getElementById('totalVisitors').textContent = visitorStats.totalVisitors;
    
    // Simpan waktu kunjungan
    const visitTime = new Date();
    visitorStats.lastVisit = visitTime.toISOString();
    
    // Update statistik harian, mingguan, dan bulanan
    const dateStr = visitTime.toISOString().split('T')[0];
    const weekNum = getWeekNumber(visitTime);
    const monthStr = dateStr.substring(0, 7); // YYYY-MM format
    
    visitorStats.dailyVisits[dateStr] = (visitorStats.dailyVisits[dateStr] || 0) + 1;
    visitorStats.weeklyVisits[weekNum] = (visitorStats.weeklyVisits[weekNum] || 0) + 1;
    visitorStats.monthlyVisits[monthStr] = (visitorStats.monthlyVisits[monthStr] || 0) + 1;
    
    // Deteksi sumber traffic (contoh sederhana)
    const referrer = document.referrer;
    let source = 'direct';
    
    if (referrer) {
      if (referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo')) {
        source = 'organic';
      } else if (referrer.includes('facebook') || referrer.includes('instagram') || referrer.includes('twitter')) {
        source = 'social';
      } else {
        source = 'referral';
      }
    }
    
    visitorStats.trafficSources[source]++;
    
    // Simpan data ke localStorage
    localStorage.setItem('visitorStats', JSON.stringify(visitorStats));
    
    // Mulai menghitung durasi kunjungan
    startDurationTracking();
  }
  
  // Fungsi untuk mendapatkan nomor minggu dari tanggal
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
  
  // Fungsi untuk menghitung durasi kunjungan
  let visitStartTime = new Date();
  
  function startDurationTracking() {
    visitStartTime = new Date();
    
    // Tambahkan event listener untuk menghitung durasi saat pengguna meninggalkan halaman
    window.addEventListener('beforeunload', saveDuration);
  }
  
  function saveDuration() {
    const duration = (new Date() - visitStartTime) / 1000 / 60; // dalam menit
    visitorStats.visitDurations.push(duration);
    
    // Hitung rata-rata durasi
    const avgDuration = visitorStats.visitDurations.reduce((sum, dur) => sum + dur, 0) / 
                        visitorStats.visitDurations.length;
    
    // Update durasi rata-rata
    visitorStats.avgDuration = avgDuration;
    
    // Simpan data ke localStorage
    localStorage.setItem('visitorStats', JSON.stringify(visitorStats));
  }
  
  // Tambahkan pengunjung saat halaman dimuat
  incrementVisitorCount();
  
  // Fungsi untuk menampilkan durasi rata-rata
  function updateAvgDuration() {
    const avgDuration = visitorStats.avgDuration || 0;
    document.getElementById('avgDuration').textContent = avgDuration.toFixed(1) + ' menit';
  }
  
  updateAvgDuration();
  
  // Event listener untuk tombol statistik
  const statsToggleBtn = document.getElementById('statsToggleBtn');
  const statsModal = document.getElementById('statsModal');
  const closeStatsBtn = document.getElementById('closeStatsBtn');
  
  statsToggleBtn.addEventListener('click', function() {
    statsModal.classList.remove('hidden');
    renderCharts();
  });
  
  closeStatsBtn.addEventListener('click', function() {
    statsModal.classList.add('hidden');
  });
  
  // Event listener untuk tombol periode tren
  const trendButtons = document.querySelectorAll('.trend-btn');
  trendButtons.forEach(button => {
    button.addEventListener('click', function() {
      trendButtons.forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      this.classList.remove('bg-gray-200', 'text-gray-700');
      this.classList.add('bg-blue-500', 'text-white');
      
      renderTrendChart(this.dataset.period);
    });
  });
  
  // Fungsi untuk membuat grafik
  let trendChart, pagesChart, trafficChart;
  
  function renderCharts() {
    renderTrendChart('daily');
    renderPopularPagesChart();
    renderTrafficSourceChart();
  }
  
  function renderTrendChart(period) {
    // Hapus chart sebelumnya jika ada
    if (trendChart) {
      trendChart.destroy();
    }
    
    let data, labels, title;
    
    // Siapkan data berdasarkan periode
    if (period === 'daily') {
      const dailyData = visitorStats.dailyVisits;
      // Ambil 7 hari terakhir
      const dates = Object.keys(dailyData).sort().slice(-7);
      labels = dates.map(date => {
        const d = new Date(date);
        return d.getDate() + '/' + (d.getMonth() + 1);
      });
      data = dates.map(date => dailyData[date] || 0);
      title = 'Kunjungan 7 Hari Terakhir';
    } else if (period === 'weekly') {
      const weeklyData = visitorStats.weeklyVisits;
      // Ambil 4 minggu terakhir
      const weeks = Object.keys(weeklyData).sort().slice(-4);
      labels = weeks.map(week => 'Minggu ' + week.split('-')[1]);
      data = weeks.map(week => weeklyData[week] || 0);
      title = 'Kunjungan 4 Minggu Terakhir';
    } else {
      const monthlyData = visitorStats.monthlyVisits;
      // Ambil 6 bulan terakhir
      const months = Object.keys(monthlyData).sort().slice(-6);
      labels = months.map(month => {
        const [year, monthNum] = month.split('-');
        return ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'][parseInt(monthNum) - 1];
      });
      data = months.map(month => monthlyData[month] || 0);
      title = 'Kunjungan 6 Bulan Terakhir';
    }
    
    // Buat chart baru
    const ctx = document.getElementById('visitorTrendChart').getContext('2d');
    trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Jumlah Pengunjung',
          data: data,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 16
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
  
  function renderPopularPagesChart() {
    // Hapus chart sebelumnya jika ada
    if (pagesChart) {
      pagesChart.destroy();
    }
    
    const pageData = visitorStats.pageVisits;
    const labels = Object.keys(pageData);
    const data = Object.values(pageData);
    
    // Buat chart baru
    const ctx = document.getElementById('popularPagesChart').getContext('2d');
    pagesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Jumlah Kunjungan',
          data: data,
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
  
  function renderTrafficSourceChart() {
    // Hapus chart sebelumnya jika ada
    if (trafficChart) {
      trafficChart.destroy();
    }
    
    const trafficData = visitorStats.trafficSources;
    const labels = {
      'organic': 'Organik',
      'referral': 'Referral',
      'social': 'Sosial Media',
      'direct': 'Langsung',
      'other': 'Lainnya'
    };
    
    const data = Object.keys(trafficData).map(key => trafficData[key]);
    const chartLabels = Object.keys(trafficData).map(key => labels[key]);
    
    // Buat chart baru
    const ctx = document.getElementById('trafficSourceChart').getContext('2d');
    trafficChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: chartLabels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(139, 92, 246, 0.7)'
          ],
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              font: {
                size: 10
              }
            }
          }
        }
      }
    });
  }
  
  // Analisis sumber traffic yang lebih detail
  function analyzeTrafficSources() {
    const trafficData = visitorStats.trafficSources;
    const total = Object.values(trafficData).reduce((sum, val) => sum + val, 0);
    
    // Hitung persentase untuk setiap sumber
    const percentages = {};
    for (const source in trafficData) {
      percentages[source] = total > 0 ? Math.round((trafficData[source] / total) * 100) : 0;
    }
    
    // Tentukan sumber traffic terbanyak
    let topSource = 'direct';
    let topValue = 0;
    
    for (const source in trafficData) {
      if (trafficData[source] > topValue) {
        topValue = trafficData[source];
        topSource = source;
      }
    }
    
    // Tambahkan informasi ke modal
    const trafficAnalysisDiv = document.createElement('div');
    trafficAnalysisDiv.className = 'mt-6 bg-blue-50 p-4 rounded-lg';
    trafficAnalysisDiv.innerHTML = `
      <h3 class="font-semibold text-gray-700 mb-2">Analisis Sumber Traffic</h3>
      <p class="text-gray-600 mb-2">Sumber traffic terbanyak: <span class="font-bold text-blue-600">${
        topSource === 'organic' ? 'Organik' :
        topSource === 'referral' ? 'Referral' :
        topSource === 'social' ? 'Sosial Media' :
        topSource === 'direct' ? 'Langsung' : 'Lainnya'
      } (${percentages[topSource]}%)</span></p>
      <div class="grid grid-cols-2 gap-2 mt-3">
        ${Object.keys(percentages).map(source => `
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">${
              source === 'organic' ? 'Organik' :
              source === 'referral' ? 'Referral' :
              source === 'social' ? 'Sosial Media' :
              source === 'direct' ? 'Langsung' : 'Lainnya'
            }</span>
            <div class="w-24 bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${percentages[source]}%"></div>
            </div>
            <span class="text-xs font-medium text-gray-700">${percentages[source]}%</span>
          </div>
        `).join('')}
      </div>
    `;
    
    // Tambahkan ke modal jika belum ada
    const existingAnalysis = document.querySelector('.traffic-analysis');
    if (existingAnalysis) {
      existingAnalysis.replaceWith(trafficAnalysisDiv);
    } else {
      const modalContent = document.querySelector('#statsModal .bg-white');
      modalContent.appendChild(trafficAnalysisDiv);
      trafficAnalysisDiv.classList.add('traffic-analysis');
    }
  }
  
  // Panggil analisis saat modal dibuka
  statsToggleBtn.addEventListener('click', function() {
    statsModal.classList.remove('hidden');
    renderCharts();
    analyzeTrafficSources();
    initVisitorMap(); // Inisialisasi peta pengunjung
  });
  
  // Fungsi untuk mendapatkan lokasi pengunjung dan menampilkan peta
  function getVisitorLocation() {
    // Gunakan IP Geolocation API untuk mendapatkan lokasi pengunjung
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        // Simpan lokasi pengunjung jika valid
        if (data.latitude && data.longitude) {
          const locationData = {
            lat: data.latitude,
            lng: data.longitude,
            city: data.city || 'Unknown',
            country: data.country_name || 'Unknown',
            ip: data.ip || 'Unknown',
            timestamp: new Date().toISOString()
          };
          
          // Tambahkan ke array lokasi pengunjung (batasi hingga 100 entri)
          visitorStats.visitorLocations.push(locationData);
          if (visitorStats.visitorLocations.length > 100) {
            visitorStats.visitorLocations.shift(); // Hapus entri tertua jika melebihi 100
          }
          
          // Simpan ke localStorage
          localStorage.setItem('visitorStats', JSON.stringify(visitorStats));
          
          // Update peta jika modal statistik sedang terbuka
          if (!statsModal.classList.contains('hidden')) {
            updateVisitorMap();
          }
        }
      })
      .catch(error => {
        console.error('Error getting visitor location:', error);
      });
  }
  
  // Fungsi untuk menginisialisasi peta
  let visitorMap;
  function initVisitorMap() {
    // Periksa apakah peta sudah diinisialisasi
    if (visitorMap) {
      updateVisitorMap();
      return;
    }
    
    // Inisialisasi peta dengan lokasi default (Indonesia)
    visitorMap = L.map('visitorMap').setView([-2.5489, 118.0149], 4);
    
    // Tambahkan layer peta dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(visitorMap);
    
    // Update peta dengan lokasi pengunjung
    updateVisitorMap();
  }
  
  // Fungsi untuk memperbarui peta dengan marker lokasi pengunjung
  function updateVisitorMap() {
    // Pastikan peta sudah diinisialisasi
    if (!visitorMap) return;
    
    // Hapus semua marker yang ada
    visitorMap.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        visitorMap.removeLayer(layer);
      }
    });
    
    // Tambahkan marker untuk setiap lokasi pengunjung
    visitorStats.visitorLocations.forEach(location => {
      const marker = L.marker([location.lat, location.lng]).addTo(visitorMap);
      marker.bindPopup(`
        <b>${location.city}, ${location.country}</b><br>
        Waktu kunjungan: ${new Date(location.timestamp).toLocaleString()}
      `);
    });
    
    // Jika tidak ada lokasi, tambahkan pesan
    if (visitorStats.visitorLocations.length === 0) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'text-center py-4 text-gray-500';
      messageDiv.innerHTML = 'Belum ada data lokasi pengunjung';
      document.getElementById('visitorMap').appendChild(messageDiv);
    }
    
    // Sesuaikan tampilan peta
    visitorMap.invalidateSize();
  }
  
  // Panggil fungsi untuk mendapatkan lokasi pengunjung saat halaman dimuat
  getVisitorLocation();
});
