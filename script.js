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

// Inisialisasi Supabase Client
const supabaseUrl = 'https://xurxgmbbrelsbjhcnqnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cnhnbWJicmVsc2JqaGNucW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTQxNjgsImV4cCI6MjA3MzQ5MDE2OH0.JDwXLsZemX6_fI27aFwya1HHFthdR3HNntP9L8Ku3oA';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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

  // Fungsi untuk mendapatkan ID pengunjung unik
  function getVisitorId() {
    // Cek apakah sudah ada ID pengunjung di localStorage
    let visitorId = localStorage.getItem('visitorId');
    
    // Jika belum ada, buat ID baru
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('visitorId', visitorId);
    }
    
    return visitorId;
  }

  // Fungsi untuk menambah jumlah pengunjung
  async function incrementVisitorCount() {
    // Dapatkan ID pengunjung unik
    const visitorId = getVisitorId();
    
    // Dapatkan informasi browser dan perangkat
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    
    // Dapatkan informasi referrer
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
    
    console.log('Menyimpan data pengunjung dengan ID:', visitorId);
    
    // Simpan data kunjungan ke Supabase
    try {
      // Periksa apakah pengunjung ini sudah pernah berkunjung hari ini
      const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
      const startOfDay = today + 'T00:00:00.000Z';
      const endOfDay = today + 'T23:59:59.999Z';
      
      const { data: existingVisits, error: checkError } = await supabase
        .from('visitor_stats')
        .select('id')
        .eq('visitor_id', visitorId)
        .gte('visit_time', startOfDay)
        .lte('visit_time', endOfDay)
        .limit(1);
      
      if (checkError) {
        console.error('Error memeriksa kunjungan yang ada:', checkError);
      }
      
      // Jika pengunjung belum berkunjung hari ini, tambahkan data baru
      if (!existingVisits || existingVisits.length === 0) {
        const { data, error } = await supabase
          .from('visitor_stats')
          .insert([
            { 
              visitor_id: visitorId,
              visit_time: new Date().toISOString(),
              user_agent: userAgent,
              language: language,
              referrer: referrer,
              traffic_source: source,
              page: window.location.pathname
            }
          ]);
        
        if (error) {
          console.error('Error menyimpan data pengunjung ke Supabase:', error);
        } else {
          console.log('Data pengunjung berhasil disimpan ke Supabase');
        }
      } else {
        console.log('Pengunjung sudah tercatat hari ini, tidak menambahkan data baru');
      }
      
      // Setelah menyimpan data, panggil fungsi untuk mengambil total pengunjung unik
      await fetchTotalUniqueVisitors();
      
    } catch (err) {
      console.error('Error saat berinteraksi dengan Supabase:', err);
      
      // Fallback ke localStorage jika ada masalah dengan Supabase
      visitorStats.totalVisitors++;
      document.getElementById('visitorCount').textContent = visitorStats.totalVisitors;
      document.getElementById('totalVisitors').textContent = visitorStats.totalVisitors;
    }
    
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
    
    visitorStats.trafficSources[source]++;
    
    // Simpan data ke localStorage sebagai cadangan
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
  
  // Fungsi untuk mengambil total pengunjung unik dari Supabase
  async function fetchTotalUniqueVisitors() {
    try {
      // Mengambil jumlah pengunjung unik dengan menghitung distinct visitor_id
      const { data, error, count } = await supabase
        .from('visitor_stats')
        .select('visitor_id', { count: 'exact', head: false })
        .limit(1000); // Meningkatkan limit untuk memastikan semua data terhitung
      
      if (error) {
        console.error('Error mengambil jumlah pengunjung unik dari Supabase:', error);
        return;
      }
      
      // Hitung jumlah pengunjung unik dengan Set
      if (data && data.length > 0) {
        // Menggunakan Set untuk menghitung visitor_id unik
        const uniqueVisitors = new Set();
        data.forEach(visit => {
          if (visit.visitor_id) {
            uniqueVisitors.add(visit.visitor_id);
          }
        });
        
        const uniqueCount = uniqueVisitors.size;
        console.log('Jumlah pengunjung unik:', uniqueCount);
        
        // Update UI dengan jumlah pengunjung unik
        document.getElementById('visitorCount').textContent = uniqueCount;
        document.getElementById('totalVisitors').textContent = uniqueCount;
      } else if (count !== undefined) {
        // Fallback ke count jika data tidak tersedia
        document.getElementById('visitorCount').textContent = count;
        document.getElementById('totalVisitors').textContent = count;
        console.log('Menggunakan count dari Supabase:', count);
      }
    } catch (err) {
      console.error('Error saat mengambil data pengunjung dari Supabase:', err);
    }
  }
  
  // Panggil fungsi untuk mengambil total pengunjung unik
  fetchTotalUniqueVisitors();
  
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
  
  async function renderCharts() {
    // Panggil semua fungsi chart secara asynchronous
    try {
      console.log('Memulai render semua chart');
      await renderTrendChart('daily');
      await renderPopularPagesChart();
      await renderTrafficSourceChart();
      console.log('Semua chart berhasil dirender');
    } catch (err) {
      console.error('Error saat merender chart:', err);
    }
  }
  
  async function renderTrendChart(period) {
    // Hapus chart sebelumnya jika ada
    if (trendChart) {
      trendChart.destroy();
    }
    
    let data = [];
    let labels = [];
    let title = '';
    
    try {
      console.log('Memuat data tren untuk periode:', period);
      
      // Siapkan data berdasarkan periode dari Supabase
      if (period === 'daily') {
        // Ambil data 7 hari terakhir
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); // 7 hari termasuk hari ini
        
        console.log('Mengambil data dari', startDate.toISOString(), 'hingga', endDate.toISOString());
        
        const { data: visitsData, error } = await supabase
          .from('visitor_stats')
          .select('visit_time, visitor_id')
          .gte('visit_time', startDate.toISOString())
          .lte('visit_time', endDate.toISOString());
        
        if (error) {
          console.error('Error mengambil data kunjungan harian:', error);
          // Fallback ke data lokal jika ada error
          fallbackToLocalData('daily');
          return;
        }
        
        console.log('Data kunjungan yang diterima:', visitsData);
        
        // Kelompokkan data berdasarkan tanggal dan visitor_id untuk menghitung pengunjung unik per hari
        const dailyData = {};
        const uniqueVisitorsByDay = {};
        
        visitsData.forEach(visit => {
          const dateStr = visit.visit_time.split('T')[0];
          
          // Inisialisasi jika belum ada
          if (!dailyData[dateStr]) {
            dailyData[dateStr] = 0;
            uniqueVisitorsByDay[dateStr] = new Set();
          }
          
          // Tambahkan visitor_id ke set untuk menghitung pengunjung unik
          uniqueVisitorsByDay[dateStr].add(visit.visitor_id);
        });
        
        // Hitung jumlah pengunjung unik per hari
        for (const dateStr in uniqueVisitorsByDay) {
          dailyData[dateStr] = uniqueVisitorsByDay[dateStr].size;
        }
        
        console.log('Data harian yang diolah:', dailyData);
        
        // Buat array tanggal untuk 7 hari terakhir
        const dates = [];
        for (let i = 0; i < 7; i++) {
          const d = new Date(startDate);
          d.setDate(d.getDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          dates.push(dateStr);
        }
        
        labels = dates.map(date => {
          const d = new Date(date);
          return d.getDate() + '/' + (d.getMonth() + 1);
        });
        data = dates.map(date => dailyData[date] || 0);
        title = 'Kunjungan 7 Hari Terakhir';
        
      } else if (period === 'weekly') {
        // Ambil data 4 minggu terakhir
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 28); // 4 minggu terakhir
        
        console.log('Mengambil data mingguan dari', startDate.toISOString(), 'hingga', endDate.toISOString());
        
        const { data: visitsData, error } = await supabase
          .from('visitor_stats')
          .select('visit_time, visitor_id')
          .gte('visit_time', startDate.toISOString())
          .lte('visit_time', endDate.toISOString());
        
        if (error) {
          console.error('Error mengambil data kunjungan mingguan:', error);
          // Fallback ke data lokal jika ada error
          fallbackToLocalData('weekly');
          return;
        }
        
        console.log('Data kunjungan mingguan yang diterima:', visitsData);
        
        // Kelompokkan data berdasarkan minggu dan visitor_id untuk menghitung pengunjung unik per minggu
        const weeklyData = {};
        const uniqueVisitorsByWeek = {};
        
        visitsData.forEach(visit => {
          const visitDate = new Date(visit.visit_time);
          const year = visitDate.getFullYear();
          const weekNumber = getWeekNumber(visitDate);
          const weekKey = `${year}-${weekNumber}`;
          
          // Inisialisasi jika belum ada
          if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = 0;
            uniqueVisitorsByWeek[weekKey] = new Set();
          }
          
          // Tambahkan visitor_id ke set untuk menghitung pengunjung unik
          uniqueVisitorsByWeek[weekKey].add(visit.visitor_id);
        });
        
        // Hitung jumlah pengunjung unik per minggu
        for (const weekKey in uniqueVisitorsByWeek) {
          weeklyData[weekKey] = uniqueVisitorsByWeek[weekKey].size;
        }
        
        console.log('Data mingguan yang diolah:', weeklyData);
        
        // Ambil 4 minggu terakhir
        const weeks = [];
        for (let i = 0; i < 4; i++) {
          const d = new Date(endDate);
          d.setDate(d.getDate() - (i * 7));
          const weekNumber = getWeekNumber(d);
          const year = d.getFullYear();
          const weekKey = `${year}-${weekNumber}`;
          weeks.unshift(weekKey); // Tambahkan di awal array untuk urutan kronologis
        }
        
        labels = weeks.map(week => 'Minggu ' + week.split('-')[1]);
        data = weeks.map(week => weeklyData[week] || 0);
        title = 'Kunjungan 4 Minggu Terakhir';
        
      } else if (period === 'monthly') {
        // Ambil data 6 bulan terakhir
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 5); // 6 bulan terakhir
        
        console.log('Mengambil data bulanan dari', startDate.toISOString(), 'hingga', endDate.toISOString());
        
        const { data: visitsData, error } = await supabase
          .from('visitor_stats')
          .select('visit_time, visitor_id')
          .gte('visit_time', startDate.toISOString())
          .lte('visit_time', endDate.toISOString());
        
        if (error) {
          console.error('Error mengambil data kunjungan bulanan:', error);
          // Fallback ke data lokal jika ada error
          fallbackToLocalData('monthly');
          return;
        }
        
        console.log('Data kunjungan bulanan yang diterima:', visitsData);
        
        // Kelompokkan data berdasarkan bulan dan visitor_id untuk menghitung pengunjung unik per bulan
        const monthlyData = {};
        const uniqueVisitorsByMonth = {};
        
        visitsData.forEach(visit => {
          const visitDate = new Date(visit.visit_time);
          const year = visitDate.getFullYear();
          const month = visitDate.getMonth() + 1; // Bulan dimulai dari 0
          const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
          
          // Inisialisasi jika belum ada
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = 0;
            uniqueVisitorsByMonth[monthKey] = new Set();
          }
          
          // Tambahkan visitor_id ke set untuk menghitung pengunjung unik
          uniqueVisitorsByMonth[monthKey].add(visit.visitor_id);
        });
        
        // Hitung jumlah pengunjung unik per bulan
        for (const monthKey in uniqueVisitorsByMonth) {
          monthlyData[monthKey] = uniqueVisitorsByMonth[monthKey].size;
        }
        
        console.log('Data bulanan yang diolah:', monthlyData);
        
        // Ambil 6 bulan terakhir
        const months = [];
        for (let i = 0; i < 6; i++) {
          const d = new Date(endDate);
          d.setMonth(d.getMonth() - i);
          const year = d.getFullYear();
          const month = d.getMonth() + 1; // Bulan dimulai dari 0
          const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
          months.unshift(monthKey); // Tambahkan di awal array untuk urutan kronologis
        }
        
        labels = months.map(month => {
          const [year, monthNum] = month.split('-');
          return ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'][parseInt(monthNum) - 1];
        });
        data = months.map(month => monthlyData[month] || 0);
        title = 'Kunjungan 6 Bulan Terakhir';
      }
    } catch (err) {
      console.error('Error saat mengambil data tren dari Supabase:', err);
      // Fallback ke data lokal jika ada error
      fallbackToLocalData(period);
      return;
    }
    
    // Fungsi fallback ke data lokal
    function fallbackToLocalData(periodType) {
      if (periodType === 'daily') {
        const dailyData = visitorStats.dailyVisits;
        // Ambil 7 hari terakhir
        const dates = Object.keys(dailyData).sort().slice(-7);
        labels = dates.map(date => {
          const d = new Date(date);
          return d.getDate() + '/' + (d.getMonth() + 1);
        });
        data = dates.map(date => dailyData[date] || 0);
        title = 'Kunjungan 7 Hari Terakhir';
      } else if (periodType === 'weekly') {
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
  
  async function renderPopularPagesChart() {
    // Hapus chart sebelumnya jika ada
    if (pagesChart) {
      pagesChart.destroy();
    }
    
    try {
      console.log('Mengambil data halaman populer dari Supabase');
      
      // Ambil data dari Supabase untuk 30 hari terakhir
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 30 hari terakhir
      
      const { data: visitsData, error } = await supabase
        .from('visitor_stats')
        .select('page, visitor_id')
        .gte('visit_time', startDate.toISOString())
        .lte('visit_time', endDate.toISOString());
      
      if (error) {
        console.error('Error mengambil data halaman populer:', error);
        // Fallback ke data lokal
        fallbackToLocalPageData();
        return;
      }
      
      console.log('Data halaman yang diterima:', visitsData);
      
      // Kelompokkan data berdasarkan halaman
      const pageData = {};
      
      visitsData.forEach(visit => {
        if (visit.page) {
          // Gunakan pathname saja tanpa query string
          const pagePath = visit.page.split('?')[0];
          pageData[pagePath] = (pageData[pagePath] || 0) + 1;
        }
      });
      
      console.log('Data halaman yang diolah:', pageData);
      
      // Urutkan halaman berdasarkan jumlah kunjungan (descending)
      const sortedPages = Object.entries(pageData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Ambil 5 halaman teratas
      
      const labels = sortedPages.map(([page]) => {
        // Tampilkan nama halaman yang lebih pendek
        const pathParts = page.split('/');
        return pathParts[pathParts.length - 1] || 'Beranda';
      });
      
      const data = sortedPages.map(([, count]) => count);
      
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
              'rgba(239, 68, 68, 0.7)',
              'rgba(139, 92, 246, 0.7)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Halaman Populer (30 Hari Terakhir)',
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
    } catch (err) {
      console.error('Error saat mengambil data halaman populer:', err);
      // Fallback ke data lokal
      fallbackToLocalPageData();
    }
    
    // Fungsi fallback ke data lokal
    function fallbackToLocalPageData() {
      console.log('Menggunakan data lokal untuk halaman populer');
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
            title: {
              display: true,
              text: 'Halaman Populer (Data Lokal)',
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
  }
  
  async function renderTrafficSourceChart() {
    // Hapus chart sebelumnya jika ada
    if (trafficChart) {
      trafficChart.destroy();
    }
    
    try {
      console.log('Mengambil data sumber lalu lintas dari Supabase');
      
      // Ambil data dari Supabase untuk 30 hari terakhir
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 30 hari terakhir
      
      const { data: visitsData, error } = await supabase
        .from('visitor_stats')
        .select('traffic_source')
        .gte('visit_time', startDate.toISOString())
        .lte('visit_time', endDate.toISOString());
      
      if (error) {
        console.error('Error mengambil data sumber lalu lintas:', error);
        // Fallback ke data lokal
        fallbackToLocalTrafficData();
        return;
      }
      
      console.log('Data sumber lalu lintas yang diterima:', visitsData);
      
      // Kelompokkan data berdasarkan sumber lalu lintas
      const trafficData = {
        'organic': 0,
        'referral': 0,
        'social': 0,
        'direct': 0,
        'other': 0
      };
      
      visitsData.forEach(visit => {
        if (visit.traffic_source) {
          // Pastikan sumber lalu lintas valid
          if (trafficData.hasOwnProperty(visit.traffic_source)) {
            trafficData[visit.traffic_source]++;
          } else {
            trafficData['other']++;
          }
        } else {
          trafficData['direct']++;
        }
      });
      
      console.log('Data sumber lalu lintas yang diolah:', trafficData);
      
      const labels = {
        'organic': 'Organik',
        'referral': 'Referral',
        'social': 'Sosial Media',
        'direct': 'Langsung',
        'other': 'Lainnya'
      };
      
      // Filter hanya sumber lalu lintas yang memiliki nilai > 0
      const filteredSources = Object.keys(trafficData).filter(key => trafficData[key] > 0);
      
      const data = filteredSources.map(key => trafficData[key]);
      const chartLabels = filteredSources.map(key => labels[key]);
      
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
            title: {
              display: true,
              text: 'Sumber Lalu Lintas (30 Hari Terakhir)',
              font: {
                size: 16
              }
            },
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
      
      // Update analisis sumber lalu lintas
      analyzeTrafficSources(trafficData);
      
    } catch (err) {
      console.error('Error saat mengambil data sumber lalu lintas:', err);
      // Fallback ke data lokal
      fallbackToLocalTrafficData();
    }
    
    // Fungsi fallback ke data lokal
    function fallbackToLocalTrafficData() {
      console.log('Menggunakan data lokal untuk sumber lalu lintas');
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
            title: {
              display: true,
              text: 'Sumber Lalu Lintas (Data Lokal)',
              font: {
                size: 16
              }
            },
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
      
      // Update analisis sumber lalu lintas dengan data lokal
      analyzeTrafficSources(trafficData);
    }
  }
  
  // Analisis sumber traffic yang lebih detail
  function analyzeTrafficSources(trafficData = null) {
    // Gunakan data yang diberikan atau fallback ke data lokal
    const sourceData = trafficData || visitorStats.trafficSources;
    const total = Object.values(sourceData).reduce((sum, val) => sum + val, 0);
    
    console.log('Menganalisis sumber lalu lintas:', sourceData, 'Total:', total);
    
    // Hitung persentase untuk setiap sumber
    const percentages = {};
    for (const source in sourceData) {
      percentages[source] = total > 0 ? Math.round((sourceData[source] / total) * 100) : 0;
    }
    
    // Tentukan sumber traffic terbanyak
    let topSource = 'direct';
    let topValue = 0;
    
    for (const source in sourceData) {
      if (sourceData[source] > topValue) {
        topValue = sourceData[source];
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
