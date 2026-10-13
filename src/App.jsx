import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiMenu,
  FiX,
  FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import profileImage from "./assets/pp.jpeg";
import "./App.css";
import { initialProjects } from "./data/projects";
import { supabase } from "./lib/supabase";
import { imageSource, safeWebUrl } from "./lib/projects";
import TypingHeading from "./TypingHeading";

const whatsapp =
  "https://wa.me/6282386247771?text=" +
  encodeURIComponent(
    "Halo Hanif, saya melihat portfolio Anda dan ingin berdiskusi tentang kebutuhan proyek saya.",
  );
const email = "mailto:hanifsalmizah0@gmail.com";
const navigation = [
  ["layanan", "Layanan"],
  ["projects", "Proyek"],
  ["tentang", "Tentang"],
  ["contact", "Kontak"],
];

function SectionHeading({ name, children }) {
  return (
    <div className="section-heading">
      <h2>
        <span aria-hidden="true">#</span>
        {name}
      </h2>
      <div className="heading-line" />
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState(supabase ? [] : initialProjects);
  const [projectStatus, setProjectStatus] = useState(
    supabase ? "loading" : "ready",
  );
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order")
      .order("created_at")
      .then(({ data, error }) => {
        if (!active) return;
        setProjectStatus(error ? "error" : "ready");
        setProjects(error ? [] : data);
      })
      .catch(() => {
        if (active) setProjectStatus("error");
      });
    return () => {
      active = false;
    };
  }, [retry]);
  return (
    <>
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Hanif Rafi, beranda">
            <span aria-hidden="true">[h]</span> Hanif Rafi
            <span className="brand-dot">.</span>
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <nav
            id="navigation"
            aria-label="Navigasi utama"
            className={menuOpen ? "navigation is-open" : "navigation"}
          >
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                <span>#</span>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="container">
        <section id="home" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Halo, saya Hanif Salmizah Rafi</p>
            <h1>
              <TypingHeading text="Fullstack Developer" />
              dari ide hingga implementasi.
            </h1>
            <p className="hero-description">
              Saya membantu menyederhanakan operasional melalui aplikasi yang
              dirancang sesuai alur kerja Anda.
            </p>
            <div className="actions">
              <a
                className="button primary"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Diskusikan proyek <FiArrowUpRight />
              </a>
              <a className="text-link" href="#projects">
                Lihat karya saya <FiArrowRight />
              </a>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait-frame">
              <img
                src={profileImage}
                alt="Hanif Salmizah Rafi, fullstack developer"
                fetchPriority="low"
              />
              <span className="portrait-corner" aria-hidden="true" />
            </div>
          </figure>
        </section>
        <section id="layanan" className="section">
          <SectionHeading name="layanan" />
          <p className="section-intro">
            Solusi yang dapat saya bantu kerjakan untuk kebutuhan Anda.
          </p>
          <div className="services">
            {[
              [
                "01",
                "Aplikasi web bisnis",
                "Sistem kasir, inventori, dan aplikasi operasional untuk membantu pencatatan serta pengelolaan data.",
              ],
              [
                "02",
                "Sistem informasi",
                "Aplikasi dengan pengelolaan data dan hak akses sesuai peran masing-masing pengguna.",
              ],
              [
                "03",
                "Perancangan & real-time",
                "Perancangan alur sistem dengan UML serta fitur pembaruan langsung untuk kebutuhan seperti antrian.",
              ],
            ].map(([number, title, description]) => (
              <article className="service" key={number}>
                <span className="service-number">/{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="projects" className="section">
          <SectionHeading name="proyek">
            <span className="section-meta">
              {String(projects.length).padStart(2, "0")} karya terpilih
            </span>
          </SectionHeading>
          <p className="section-intro">
            Contoh pekerjaan saya, beserta tujuan, kontribusi, dan teknologi
            yang digunakan.
          </p>
          <div aria-live="polite" className="project-status">
            {projectStatus === "loading" && <p>Memuat proyek...</p>}
            {projectStatus === "error" && (
              <p>
                Proyek belum dapat dimuat.{" "}
                <button
                  className="button"
                  onClick={() => {
                    setProjectStatus("loading");
                    setRetry(retry + 1);
                  }}
                >
                  Coba lagi
                </button>
              </p>
            )}
            {projectStatus === "ready" && projects.length === 0 && (
              <p>Proyek terbaru akan ditampilkan di sini.</p>
            )}
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project" key={project.id || project.title}>
                <img
                  className="project-image"
                  src={imageSource(project.image)}
                  alt={`Tampilan aplikasi ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  width="720"
                  height="405"
                />
                <ul className="project-stack" aria-label="Teknologi">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="project-body">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="contribution">
                    <span>Kontribusi saya</span>
                    <p>{project.contribution}</p>
                  </div>
                  {safeWebUrl(project.link) ? (
                    <a
                      className="button project-link"
                      href={safeWebUrl(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Lihat website ${project.title} (tab baru)`}
                    >
                      Lihat website <FiArrowUpRight />
                    </a>
                  ) : (
                    <a
                      className="text-link project-link"
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Diskusikan ${project.title} melalui WhatsApp`}
                    >
                      Tanyakan detail proyek <FiArrowUpRight />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="tentang" className="section">
          <SectionHeading name="tentang-saya" />
          <div className="about-grid">
            <div className="about-copy">
              <h3>Teknologi yang tepat, untuk kebutuhan yang jelas.</h3>
              <p>
                Saya Hanif Salmizah Rafi, seorang software engineer dan
                fullstack developer. Pekerjaan saya mencakup aplikasi
                operasional, sistem informasi pengelolaan sampah, dan sistem
                antrian wawancara.
              </p>
              <p>
                Pendekatan saya dimulai dari memahami alur kerja dan kebutuhan
                pengguna, lalu menerjemahkannya menjadi rancangan serta
                implementasi aplikasi.
              </p>
              <a className="text-link" href="#contact">
                Ceritakan kebutuhan Anda <FiArrowRight />
              </a>
            </div>
            <div className="skills">
              <h3>Teknologi &amp; tools</h3>
              {[
                ["Frontend", "React, Next.js, Tailwind CSS"],
                ["Backend", "Node.js, Express.js, Laravel"],
                ["Database", "MySQL"],
                ["Tools & perancangan", "Git, GitHub, VS Code, UML"],
              ].map(([title, items]) => (
                <div className="skill-row" key={title}>
                  <h4>{title}</h4>
                  <p>{items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <SectionHeading name="kontak" />
          <div className="contact-grid">
            <div>
              <h3>Punya proses yang ingin dibuat lebih sederhana?</h3>
              <p>
                Ceritakan ide, alur kerja, atau kendala Anda. Kita dapat
                mendiskusikan ruang lingkup, fitur yang dibutuhkan, dan langkah
                pengerjaannya.
              </p>
              <p className="contact-tip">
                Untuk memulai, sertakan gambaran proyek, target waktu, dan
                kisaran anggaran jika sudah tersedia.
              </p>
            </div>
            <div className="contact-box">
              <p className="contact-label">Mari mulai percakapan</p>
              <a
                className="contact-channel"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
                <span>
                  <strong>WhatsApp</strong>
                  <span>+62 823-8624-7771</span>
                </span>
                <FiArrowUpRight />
              </a>
              <a className="contact-channel" href={email}>
                <FiMail />
                <span>
                  <strong>Email</strong>
                  <span>hanifsalmizah0@gmail.com</span>
                </span>
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a className="brand" href="#home">
              [h] Hanif Rafi.
            </a>
            <p>Software Engineer &amp; Fullstack Developer</p>
          </div>
          <p>© {new Date().getFullYear()} Hanif Salmizah Rafi</p>
          <a href="#/admin" className="text-link">
            Admin
          </a>
          <a href="#home" className="text-link">
            Kembali ke atas ↑
          </a>
        </div>
      </footer>
    </>
  );
}
