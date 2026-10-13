# Portfolio Hanif Rafi

React + Vite, GitHub Pages untuk frontend, Supabase untuk login admin, database proyek, dan screenshot.

## Menjalankan lokal

```powershell
npm.cmd install
npm.cmd run dev
```

Portfolio: `/hanifsalmizah/`. Admin: `/hanifsalmizah/#/admin`.
Tanpa konfigurasi Supabase, portfolio tetap menampilkan empat proyek awal; admin menampilkan petunjuk konfigurasi.

## Setup Supabase (sekali saja)

1. Buat proyek di https://supabase.com/dashboard.
2. Buka SQL Editor dan jalankan `supabase/schema.sql`, kemudian `supabase/seed.sql`. Seed memasukkan empat proyek lama dan tidak menimpa perubahan jika dijalankan ulang.
3. Di Authentication → Users, buat akun admin email/password melalui dashboard. Gunakan auto-confirm jika tersedia. Jangan tulis password di kode atau kirim lewat chat.
4. Salin User UID akun tersebut, lalu jalankan SQL berikut dengan UUID asli:

```sql
insert into public.portfolio_admins (user_id)
values ('GANTI-DENGAN-USER-UID')
on conflict (user_id) do nothing;
```

5. Nonaktifkan pendaftaran pengguna baru pada konfigurasi Authentication jika portfolio ini hanya untuk admin pribadi. Akun lain tetap tidak mendapatkan hak admin tanpa keanggotaan di `portfolio_admins`.
6. Salin `.env.example` menjadi `.env.local`. Isi Project URL dan **publishable key** dari pengaturan API proyek:

```dotenv
VITE_SUPABASE_URL=https://PROJECT-ANDA.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

7. Restart server dev. Buka `#/admin` lalu login dengan akun yang dibuat di langkah 3.

Publishable key memang dipakai di browser. Jangan gunakan secret key, service_role key, atau password database dalam variabel VITE_*; semua variabel tersebut masuk ke bundle publik. Hak akses dijaga oleh RLS database, bukan oleh kerahasiaan URL admin atau kode frontend.

## Mengelola proyek

- Tambah/edit judul, kategori, deskripsi, kontribusi, teknologi (dipisahkan koma), dan link website opsional.
- Gambar dapat berupa URL HTTP/HTTPS, nama file yang sudah berada di `public/images`, atau upload JPG/PNG/WebP maksimal 5 MB.
- Upload gambar baru disimpan saat tombol Simpan ditekan.
- Aktifkan `Publikasikan di portfolio` untuk menampilkan proyek ke pengunjung. Jika tidak aktif, proyek menjadi draft dan hanya admin yang dapat membacanya.
- Angka urutan kecil tampil lebih dulu. Jika sama, urut berdasarkan waktu dibuat.
- Hapus proyek membutuhkan konfirmasi. File screenshot lama tidak otomatis dihapus agar gambar yang dipakai ulang tidak rusak. Bersihkan file yang sudah tidak digunakan melalui dashboard Storage bila diperlukan.
- Bucket screenshot bersifat publik: siapa pun yang memiliki URL dapat membaca gambarnya, termasuk gambar draft. Jangan upload screenshot yang mengandung informasi rahasia.
- Perubahan langsung tersimpan di Supabase; tidak perlu deploy ulang ketika menambah atau mengedit proyek. Muat ulang portfolio untuk melihat perubahan.
- Jika database tidak tersedia, portfolio menampilkan opsi coba lagi, bukan data lama yang mungkin sudah dihapus atau dijadikan draft.

## Deploy ke GitHub Pages

Untuk cara deploy lokal yang sudah dipakai proyek ini:

```powershell
npm.cmd run build
npm.cmd run deploy
```

Pastikan `.env.local` sudah terisi saat build. Base Vite tetap `/hanifsalmizah/`.
Admin produksi: `https://qwertyboyy.github.io/hanifsalmizah/#/admin`.
Hash route ini dapat dibuka langsung dan di-refresh tanpa konfigurasi server tambahan.
Jika build lewat GitHub Actions, berikan kedua variabel VITE_SUPABASE_* pada environment langkah build; `.env.local` tidak ikut Git.

## Verifikasi

```powershell
npm.cmd run build
node --test tests/projects.test.mjs
```

Setelah Supabase terhubung, periksa:

1. Pengunjung dapat membaca proyek terpublikasi, tetapi tidak draft.
2. Pengunjung tanpa login tidak dapat insert/update/delete atau upload gambar.
3. Akun login yang tidak ada di `portfolio_admins` tidak bisa mengubah data atau membaca draft.
4. Admin dapat tambah, edit, upload, simpan draft, publish, ubah urutan, dan hapus proyek.
5. Refresh portfolio dan pastikan perubahan terlihat; refresh `#/admin` dan pastikan sesi login dipertahankan.

Sumber resmi: [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Storage access control](https://supabase.com/docs/guides/storage/security/access-control), [Login password](https://supabase.com/docs/reference/javascript/auth-signinwithpassword).
