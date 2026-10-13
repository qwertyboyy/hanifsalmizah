import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from './lib/supabase';
import { imageSource, projectPayload } from './lib/projects';
import './App.css';
import './Admin.css';

const emptyForm = { title: '', category: '', description: '', contribution: '', image: '', link: '', stack: '', published: false, sort_order: 0 };

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const fileInput = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) { setSession(nextSession); setChecking(false); }
    });
    supabase.auth.getSession().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError) setError('Sesi tidak dapat diperiksa. Muat ulang halaman.');
      setSession(data.session); setChecking(false);
    }).catch(() => { if (active) { setError('Tidak dapat terhubung. Muat ulang halaman.'); setChecking(false); } });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!session || !supabase) return;
    let active = true;
    supabase.rpc('is_portfolio_admin').then(({ data, error: accessError }) => {
      if (!active) return;
      setAllowed(!accessError && data === true);
      if (accessError) setError('Hak akses tidak dapat diperiksa. Pastikan setup database selesai, lalu login kembali.');
    }).catch(() => { if (active) setError('Hak akses tidak dapat diperiksa. Login kembali.'); });
    return () => { active = false; };
  }, [session]);

  const loadProjects = useCallback(async () => {
    setLoading(true); setLoadError('');
    try {
      const { data, error: fetchError } = await supabase.from('projects').select('*').order('sort_order').order('created_at');
      if (fetchError) throw fetchError;
      setProjects(data);
    } catch { setLoadError('Daftar proyek gagal dimuat. Coba lagi.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { if (session && allowed) { void loadProjects(); } }, [session, allowed, loadProjects]);
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function resetForm() {
    setEditing(null); setForm({ ...emptyForm }); setFile(null); setPreview(''); setDeleteTarget(null);
    if (fileInput.current) fileInput.current.value = '';
  }
  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }
  async function login(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice(''); setAllowed(false);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: authEmail.trim(), password });
      if (loginError) throw loginError;
      setPassword('');
    } catch { setError('Login gagal. Periksa email, password, dan koneksi Anda.'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;
      setAllowed(false); setProjects([]); resetForm(); setNotice('');
    } catch { setError('Gagal keluar. Coba lagi.'); }
    finally { setBusy(false); }
  }
  function edit(project) {
    resetForm(); setEditing(project.id);
    setForm({ ...project, link: project.link || '', stack: project.stack.join(', ') });
    setError(''); setNotice(''); editor.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function chooseFile(event) {
    const selected = event.target.files[0];
    setError(''); setFile(null); setPreview('');
    if (!selected) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selected.type) || selected.size > 5 * 1024 * 1024) {
      setError('Pilih gambar JPG, PNG, atau WebP dengan ukuran maksimal 5 MB.'); event.target.value = ''; return;
    }
    setFile(selected);
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    let uploadedPath = null;
    try {
      const payload = projectPayload({ ...form, image: file ? 'upload.png' : form.image });
      if (file) {
        const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.type];
        const path = `${session.user.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from('project-images').upload(path, file, { contentType: file.type, upsert: false });
        if (uploadError) throw new Error('Upload gambar gagal. Periksa koneksi dan pengaturan Storage.');
        uploadedPath = path;
        payload.image = supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
      }
      const query = editing ? supabase.from('projects').update(payload).eq('id', editing) : supabase.from('projects').insert(payload);
      const { data, error: saveError } = await query.select('id').single();
      if (saveError || !data) throw new Error('Proyek gagal disimpan. Periksa koneksi dan hak akses admin.');
      resetForm(); setNotice('Proyek berhasil disimpan. Proyek yang dipublikasikan akan muncul saat portfolio dibuka atau dimuat ulang.');
      await loadProjects();
    } catch (saveError) {
      if (uploadedPath) await supabase.storage.from('project-images').remove([uploadedPath]).catch(() => {});
      setError(saveError.message || 'Proyek gagal disimpan.');
    } finally { setBusy(false); }
  }
  async function removeProject() {
    setBusy(true); setError(''); setNotice('');
    try {
      const { data, error: deleteError } = await supabase.from('projects').delete().eq('id', deleteTarget.id).select('id').single();
      if (deleteError || !data) throw new Error();
      if (editing === deleteTarget.id) resetForm();
      setDeleteTarget(null); setNotice('Proyek berhasil dihapus.'); await loadProjects();
    } catch { setError('Proyek gagal dihapus. Periksa koneksi dan hak akses admin.'); }
    finally { setBusy(false); }
  }

  return <div className="admin-page">
    <header className="header"><div className="container header-inner"><a className="brand" href="#home"><span>[h]</span> Hanif Rafi.</a><a className="text-link" href="#home">← Lihat portfolio</a></div></header>
    <main className="container admin-main">
      <div className="admin-heading"><div><p className="eyebrow">/admin</p><h1>Kelola proyek</h1><p>Perbarui karya Anda dari satu tempat.</p></div>{session && <button className="button" disabled={busy} onClick={logout}>Keluar</button>}</div>
      {error && <p className="admin-message" role="alert">{error}</p>}
      {notice && <p className="admin-message" role="status">{notice}</p>}
      {!supabase ? <section className="admin-panel"><h2>Hubungkan Supabase terlebih dahulu</h2><p>Konfigurasi database belum tersedia. Ikuti panduan setup pada README proyek, lalu build ulang website.</p><a className="text-link" href="#home">Kembali ke portfolio →</a></section>
        : checking ? <p role="status">Memeriksa sesi…</p>
        : !session ? <form className="admin-panel login-form" onSubmit={login}><h2>Login admin</h2><p>Masuk menggunakan akun admin portfolio Anda.</p><fieldset disabled={busy}><label>Email<input type="email" autoComplete="username" value={authEmail} onChange={event => setAuthEmail(event.target.value)} required /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label><button className="button primary" type="submit">{busy ? 'Memproses…' : 'Masuk'}</button></fieldset></form>
        : !allowed ? <section className="admin-panel"><h2>Menunggu akses admin</h2><p>Akun {session.user.email} belum mendapat akses atau sedang diperiksa. Jika belum diberikan, tambahkan akun ini sebagai admin melalui setup Supabase, lalu login kembali.</p></section>
        : <div className="admin-layout">
          <section className="admin-panel" ref={editor}><h2>{editing ? 'Edit proyek' : 'Tambah proyek'}</h2><form onSubmit={save}><fieldset disabled={busy}>
            <label>Judul proyek<input name="title" value={form.title} onChange={update} maxLength={160} required /></label>
            <label>Kategori<input name="category" value={form.category} onChange={update} placeholder="Contoh: Aplikasi bisnis" maxLength={80} required /></label>
            <label>Deskripsi<textarea name="description" value={form.description} onChange={update} rows={3} maxLength={3000} required /></label>
            <label>Kontribusi saya<textarea name="contribution" value={form.contribution} onChange={update} rows={3} maxLength={3000} required /></label>
            <label>Teknologi<input name="stack" value={form.stack} onChange={update} placeholder="React, Express.js, MySQL" maxLength={1000} required /><span className="field-help">Pisahkan setiap teknologi dengan koma.</span></label>
            <label>Link website (opsional)<input type="url" name="link" value={form.link} onChange={update} placeholder="https://…" maxLength={2048} /></label>
            <label>Gambar proyek<input name="image" value={form.image} onChange={update} placeholder="https://… atau BSLH.png" maxLength={2048} required={!file} /><span className="field-help">Masukkan URL/nama file yang sudah ada, atau upload gambar di bawah.</span></label>
            <label>Upload screenshot<input type="file" accept="image/jpeg,image/png,image/webp" ref={fileInput} onChange={chooseFile} /><span className="field-help">JPG, PNG, atau WebP, maksimal 5 MB. Upload menggantikan URL saat disimpan.</span></label>
            {(file ? preview : imageSource(form.image)) && <img className="admin-preview" src={file ? preview : imageSource(form.image)} alt="Preview screenshot proyek" />}
            {file && <button type="button" className="text-link" onClick={() => { setFile(null); setPreview(''); fileInput.current.value = ''; }}>Batalkan upload</button>}
            <label>Urutan tampil<input type="number" name="sort_order" min="0" max="100000" step="1" value={form.sort_order} onChange={update} required /><span className="field-help">Angka lebih kecil ditampilkan lebih dahulu.</span></label>
            <label className="checkbox-label"><input type="checkbox" name="published" checked={form.published} onChange={update} />Publikasikan di portfolio</label>
            <div className="admin-actions"><button type="submit" className="button primary">{busy ? 'Menyimpan…' : 'Simpan proyek'}</button><button type="button" className="button" onClick={resetForm}>Batal / Kosongkan</button></div>
          </fieldset></form></section>
          <section className="admin-list"><div className="admin-list-heading"><h2>Daftar proyek ({projects.length})</h2><button className="button" disabled={loading || busy} onClick={loadProjects}>Muat ulang</button></div>
            {loading && <p role="status">Memuat proyek…</p>}{loadError && <p role="alert">{loadError}</p>}
            {!loading && !loadError && !projects.length && <p>Belum ada proyek. Tambahkan proyek pertama melalui formulir.</p>}
            {projects.map(project => <article className="admin-project" key={project.id}><img src={imageSource(project.image)} alt={`Screenshot ${project.title}`} /><div><span className="admin-badge">{project.published ? 'Dipublikasikan' : 'Draft'} · Urutan {project.sort_order}</span><h3>{project.title}</h3><p>{project.category}</p><div className="admin-actions"><button className="button" disabled={busy} onClick={() => edit(project)}>Edit</button><button className="button" disabled={busy} onClick={() => { setDeleteTarget(project); setError(''); }}>Hapus</button></div></div></article>)}
            {deleteTarget && <div className="admin-panel delete-confirm" role="group" aria-label="Konfirmasi hapus proyek"><h3>Hapus {deleteTarget.title}?</h3><p>Proyek akan dihapus dari database. Tindakan ini tidak dapat dibatalkan.</p><div className="admin-actions"><button className="button primary" disabled={busy} onClick={removeProject}>Ya, hapus proyek</button><button className="button" disabled={busy} onClick={() => setDeleteTarget(null)}>Batal</button></div></div>}
          </section>
        </div>}
    </main>
  </div>;
}
