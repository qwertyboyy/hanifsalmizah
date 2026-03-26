import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import fileImg from "./assets/profle.jpeg";
import { FaReact, FaNodeJs, FaGithub, FaLaravel } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SiNextdotjs, SiTailwindcss, SiMysql, SiGit } from "react-icons/si";
import { useRef } from "react";

export default function Portfolio() {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  const projects = [
    {
      title: "Sistem Informasi Bank Sampah",
      desc: "Mengubah pencatatan manual menjadi sistem digital yang lebih efisien dan memiliki 3 Role Based Access Control.",
      tech: "React • ExpressJS • MySQL",
      image: "./images/dashboardBS.png",
    },
    {
      title: "Sistem Informasi Lembaga Pengeloala Sampah",
      desc: "Membantu Pembuatan UML Diagram untuk sistem informasi lembaga pengelola sampah.",
      tech: "UML Diagram",
      image: "./images/LPS.png",
      link: "https://lpspadang.admin.co.id/",
    },
    {
      title: "Coming Soon",
      desc: "Coming Soon",
      tech: "-",
      image: "",
    },
    {
      title: "Coming Soon",
      desc: "Coming Soon",
      tech: "-",
      image: "",
    },
  ];

  return (
    <div className="bg-[#0b0d12] text-white font-sans scroll-smooth">
      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* BOLA 1 */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-purple-500 opacity-60 blur-[120px]"
        />

        {/* BOLA 2 */}
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-500 opacity-60 blur-[120px]"
        />

        {/* BOLA 3 */}
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -60, 100, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-pink-500 opacity-40 blur-[120px]"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/50 z-1" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="fixed top-0 w-full bg-[#0b0d12]/70 backdrop-blur border-b border-gray-800 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="font-semibold">My Portfolio</h1>
            <div className="hidden md:flex gap-6 text-sm text-gray-300">
              <a href="#home" className="hover:text-white">
                Home
              </a>
              <a href="#projects" className="hover:text-white">
                Projects
              </a>
              <a href="#tech-stack" className="hover:text-white">
                Stack
              </a>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 pt-24"
        >
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-400 mb-2">Hi, I’m</p>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hanif Salmizah Rafi
              </h1>

              <h2 className="text-xl font-bold md:text-2xl text-pink-500 mb-6">
                <TypeAnimation
                  sequence={[
                    "Software Engineer",
                    2000,
                    "Fullstack Developer",
                    2000,
                    "Creative Builder",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </h2>

              <p className="text-gray-400 max-w-lg mb-8">
                Mengembangkan produk digital dari konsep hingga implementasi,
                dengan pendekatan yang menggabungkan teknologi, efisiensi, dan
                pengalaman pengguna.
              </p>

              <div className="flex gap-4">
                <a href="#projects">
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition">
                    View Projects
                  </button>
                </a>

                <a href="#contact">
                  <button className="border border-gray-600 px-6 py-3 rounded-xl hover:border-white transition">
                    Contact Me
                  </button>
                </a>
              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-85 h-85 bg-[#1a1d26] rounded-2xl flex items-center justify-center">
                <img
                  src={fileImg}
                  alt="Profile"
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="px-4 sm:px-6 py-14 sm:py-20 max-w-6xl mx-auto scroll-mt-24"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Featured Projects
          </h2>

          <p className="text-gray-400 mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base">
            Project terpilih yang pernah saya kerjakan, mencakup berbagai
            teknologi dan solusi kreatif untuk tantangan yang berbeda.
          </p>

          <div className="relative">
            {/* GRADIENT LEFT */}
            <div className="hidden md:block pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0b0d12] to-transparent z-10" />

            {/* GRADIENT RIGHT */}
            <div className="hidden md:block pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0b0d12] to-transparent z-10" />

            {/* BUTTON LEFT */}
            <button
              onClick={() =>
                scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
              }
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* BUTTON RIGHT */}
            <button
              onClick={() =>
                scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
              }
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full hover:bg-white/20 hover:scale-110 transition"
            >
              <FiChevronRight size={20} />
            </button>

            {/* SCROLL AREA */}
            <div
              ref={scrollRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[60%] md:auto-cols-[40%] lg:auto-cols-[33.333%] gap-4 sm:gap-6 min-w-full">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={window.innerWidth > 768 ? { scale: 1.05 } : {}}
                    className="snap-start bg-[#12141b]/80 p-4 sm:p-6 rounded-2xl border border-gray-800 transition"
                  >
                    {/* IMAGE */}
                    <div className="h-40 sm:h-44 rounded-xl mb-4 overflow-hidden bg-gray-800">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* TITLE */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg sm:text-xl font-semibold mb-2 inline-block hover:text-purple-400 transition"
                    >
                      {project.title}
                    </a>

                    {/* DESC */}
                    <p className="text-gray-400 text-sm mb-3 sm:mb-4 line-clamp-3">
                      {project.desc}
                    </p>

                    {/* TECH */}
                    <p className="text-xs text-gray-500">{project.tech}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section id="tech-stack" className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* FRONTEND */}
            <div className="bg-[#12141b]/70 backdrop-blur p-6 rounded-2xl border border-gray-800">
              <h3 className="text-purple-400 mb-4 font-semibold">Frontend</h3>

              <div className="space-y-3">
                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <FaReact className="text-cyan-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_cyan]" />

                  <span className="transition duration-300 group-hover:text-white">
                    ReactJS
                  </span>
                </div>

                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SiNextdotjs className="text-blue-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_blue]" />

                  <span className="transition duration-300 group-hover:text-white">
                    NextJS
                  </span>
                </div>

                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SiTailwindcss className="text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_cyan]" />
                  <span className="transition duration-300 group-hover:text-white">
                    TailwindCSS
                  </span>
                </div>
              </div>
            </div>

            {/* BACKEND */}
            <div className="bg-[#12141b]/70 backdrop-blur p-6 rounded-2xl border border-gray-800">
              <h3 className="text-blue-400 mb-4 font-semibold">Backend</h3>

              <div className="space-y-3">
                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <FaNodeJs className="text-green-500" />
                  <span>NodeJS</span>
                </div>

                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <FaLaravel className="text-green-500" />
                  <span>Laravel</span>
                </div>

                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SiMysql className="text-blue-300 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_blue]" />
                  <span className="transition duration-300 group-hover:text-white">
                    MySQL
                  </span>
                </div>
              </div>
            </div>

            {/* TOOLS */}
            <div className="bg-[#12141b]/70 backdrop-blur p-6 rounded-2xl border border-gray-800">
              <h3 className="text-pink-400 mb-4 font-semibold">Tools</h3>

              <div className="space-y-3">
                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <FaGithub />
                  <span>GitHub</span>
                </div>

                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <VscVscode className="text-blue-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_blue]" />
                  <span className="transition duration-300 group-hover:text-white">
                    VS Code
                  </span>
                </div>

                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12141b] border border-gray-800 transition duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SiGit className="text-orange-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_orange]" />
                  <span className="transition duration-300 group-hover:text-white">
                    Git Bash
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="px-4 sm:px-6 py-16 sm:py-20 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Let’s Work Together
          </h2>

          <p className="text-gray-400 mb-8 text-sm sm:text-base max-w-xl mx-auto">
            Punya project, ide, atau peluang kolaborasi? Langsung aja hubungi
            kontak di bawah ini. saya terbuka untuk freelance, kerja sama, atau
            sekedar diskusi.
          </p>

          {/* CTA UTAMA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/6282386247771"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Send Whatsapp
            </a>

            <a
              href="hanifsalmizah0@gmail.com"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Send Email
            </a>
          </div>

          {/* ALTERNATIVE (BIAR KELIATAN TRUSTED) */}
          <p className="text-gray-500 text-xs sm:text-sm mt-6">
            Biasanya respon cepat via WhatsApp
          </p>
        </section>
      </div>
    </div>
  );
}
