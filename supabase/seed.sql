-- Empat proyek awal. Aman dijalankan ulang; tidak menimpa edit admin.
insert into public.projects (id, title, category, description, contribution, image, link, stack, published, sort_order)
values
('00000000-0000-4000-8000-000000000001', 'Sistem Informasi Bank Sampah', 'Sistem informasi', 'Digitalisasi pencatatan bank sampah untuk menggantikan proses manual dan mengatur akses pengguna.', 'Pengembangan sistem dengan tiga peran pengguna dan kontrol akses berdasarkan peran.', 'BSLH.png', 'https://banksampah.dlh.padang.go.id/', array['React', 'Express.js', 'MySQL'], true, 1),
('00000000-0000-4000-8000-000000000002', 'Sistem Antrian Interview', 'Aplikasi real-time', 'Sistem pengelolaan antrian wawancara dengan pembaruan secara langsung untuk membantu pengaturan jadwal.', 'Pengembangan aplikasi antrian dan pembaruan status secara real-time.', 'interviewQA.png', null, array['Laravel', 'Socket.io', 'Tailwind CSS', 'MySQL'], true, 2),
('00000000-0000-4000-8000-000000000003', 'POS Web', 'Aplikasi bisnis', 'Aplikasi kasir berbasis web untuk membantu pengelolaan penjualan dan persediaan barang.', 'Pengembangan aplikasi web untuk pencatatan transaksi dan pengelolaan inventori.', 'pos.png', null, array['Laravel', 'MySQL', 'Tailwind CSS'], true, 3),
('00000000-0000-4000-8000-000000000004', 'Lembaga Pengelola Sampah', 'Perancangan sistem', 'Perancangan diagram untuk sistem informasi lembaga pengelola sampah.', 'Pembuatan diagram UML sebagai dokumentasi alur dan rancangan sistem.', 'LPS.png', 'https://lpspadang.admin.co.id/', array['UML'], true, 4)
on conflict (id) do nothing;
