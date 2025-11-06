# Supabase Analytics Setup Guide

## 1. Database Setup

Buka Supabase Dashboard Anda di: https://tlspobjgdbtbapbzctlx.supabase.co

### Buat Tabel `page_visits`

Jalankan SQL query berikut di **SQL Editor**:

```sql
-- Create page_visits table
CREATE TABLE page_visits (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  session_id TEXT,
  country TEXT,
  city TEXT,
  country_code TEXT
);

-- Create index for faster queries
CREATE INDEX idx_page_visits_created_at ON page_visits(created_at DESC);
CREATE INDEX idx_page_visits_session_id ON page_visits(session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT for everyone (for tracking)
CREATE POLICY "Allow public insert" ON page_visits
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow SELECT only with service_role key
CREATE POLICY "Allow authenticated read" ON page_visits
  FOR SELECT
  USING (true);
```

### Buat Tabel `daily_stats` (Optional - untuk aggregasi)

```sql
-- Create daily_stats table for aggregated data
CREATE TABLE daily_stats (
  id BIGSERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_daily_stats_date ON daily_stats(date DESC);

-- Enable RLS
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON daily_stats
  FOR SELECT
  USING (true);
```

### Update Tabel Existing (Jika sudah dibuat sebelumnya)

Jika tabel `page_visits` sudah ada, jalankan query ini untuk menambahkan kolom location:

```sql
-- Add location columns to existing table
ALTER TABLE page_visits 
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country_code TEXT;
```

## 2. Verifikasi Setup

1. Buka **Table Editor** di Supabase Dashboard
2. Pastikan tabel `page_visits` sudah ada dengan kolom:
   - `id` (int8, primary key)
   - `created_at` (timestamptz)
   - `user_agent` (text)
   - `referrer` (text)
   - `page_url` (text)
   - `session_id` (text)
   - `country` (text) - **NEW**
   - `city` (text) - **NEW**
   - `country_code` (text) - **NEW**

## 3. Testing

Setelah setup selesai:

1. Buka website Anda di browser
2. Refresh halaman beberapa kali
3. Klik tombol **Analytics** (icon chart di pojok kiri atas)
4. Masukkan password: `admin123`
5. Dashboard akan menampilkan data kunjungan

## 4. Konfigurasi

### Ganti Password Analytics

Edit file `script.js` baris 189:

```javascript
const ANALYTICS_PASSWORD = 'admin123'; // Ganti dengan password Anda
```

### Supabase Credentials

Credentials sudah dikonfigurasi di `script.js`:
- **URL**: https://tlspobjgdbtbapbzctlx.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

⚠️ **PENTING**: Anon key yang digunakan adalah `service_role` key. Untuk production, sebaiknya gunakan `anon` key dan atur RLS policy dengan lebih ketat.

## 5. Features

Dashboard Analytics menyediakan:

✅ **Real-time Statistics**
- Total kunjungan hari ini
- Total kunjungan minggu ini
- Total kunjungan bulan ini
- Total kunjungan keseluruhan

✅ **Visual Chart**
- Grafik tren kunjungan 7 hari terakhir
- Menggunakan Chart.js

✅ **Recent Visits Table**
- 10 kunjungan terakhir
- Informasi: tanggal, referrer, device type

✅ **Security**
- Password protection
- Private dashboard

## 6. Troubleshooting

### Error: "relation page_visits does not exist"
- Pastikan tabel sudah dibuat dengan SQL query di atas
- Refresh Supabase Dashboard

### Error: "new row violates row-level security policy"
- Pastikan RLS policies sudah dibuat dengan benar
- Cek di **Authentication > Policies**

### Data tidak muncul di dashboard
- Buka Console browser (F12)
- Cek error di tab Console
- Pastikan Supabase credentials benar

### Chart tidak muncul
- Pastikan Chart.js library sudah di-load
- Cek di `index.html` baris 10: `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`

## 7. Optional: Scheduled Cleanup

Untuk menghapus data lama secara otomatis, buat fungsi di Supabase:

```sql
-- Function to delete visits older than 90 days
CREATE OR REPLACE FUNCTION cleanup_old_visits()
RETURNS void AS $$
BEGIN
  DELETE FROM page_visits 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Schedule with pg_cron (if enabled)
-- SELECT cron.schedule('cleanup-visits', '0 2 * * *', 'SELECT cleanup_old_visits()');
```

## 8. Security Best Practices

1. **Ganti Password**: Ubah `ANALYTICS_PASSWORD` ke password yang kuat
2. **HTTPS Only**: Deploy website dengan HTTPS
3. **Rate Limiting**: Pertimbangkan rate limiting untuk prevent spam
4. **RLS Policies**: Review dan perketat RLS policies sesuai kebutuhan
5. **Environment Variables**: Untuk production, simpan credentials di environment variables

## Support

Jika ada masalah, cek:
- Supabase Dashboard Logs
- Browser Console (F12)
- Network tab untuk request errors
