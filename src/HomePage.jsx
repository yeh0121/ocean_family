import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  Calendar,
  Mail,
  Star,
  Fish,
  Youtube,
  Sparkles,
} from "lucide-react";
/**
 * Ocean Family – One‑page React site (JSON‑driven)
 * -------------------------------------------------
 * • Single‑file component, no external icon libs.
 * • TailwindCSS + Framer Motion. All creatures as inline SVG.
 * • Reads content from `props.data` (JSON). Falls back to `siteData` demo.
 * • Sections: Nav, Hero, Services, Events, Hosts, Contact, Footer.
 * • Cute ocean vibe: waves, bubbles, floating creatures.
 */

// ============================
// Decorative SVGs (inline, no external deps)
// ============================
const WaveDivider = ({ flip = false }) => (
  <svg
    className={`block w-full ${flip ? "rotate-180" : ""}`}
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path
      fill="currentColor"
      d="M0,64L48,74.7C96,85,192,107,288,106.7C384,107,480,85,576,80C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    />
  </svg>
);

const IconBubble = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
    <circle cx="9" cy="10" r="3" fill="currentColor" opacity="0.2" />
  </svg>
);

const Dolphin = (props) => (
  <svg viewBox="0 0 128 64" fill="none" aria-hidden {...props}>
    <path
      d="M8 36c18-18 52-22 76-10 6 3 12 6 20 6-6 4-12 10-18 12-10 4-22 8-34 8-18 0-30-8-44-16z"
      fill="#71C7EC"
    />
    <circle cx="92" cy="28" r="2" fill="#083344" />
    <path
      d="M20 40c8 2 18 6 26 10-14-2-28-6-38-12 2 0 6 0 12 2z"
      fill="#5AB1D8"
    />
  </svg>
);

const Starfish = (props) => (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
    <path
      d="M32 4l6 14 16 2-12 10 4 16-14-8-14 8 4-16L10 20l16-2 6-14z"
      fill="#FFC857"
    />
  </svg>
);

const Whale = (props) => (
  <svg viewBox="0 0 128 64" fill="none" aria-hidden {...props}>
    <rect x="12" y="24" width="88" height="24" rx="12" fill="#9DD6EA" />
    <circle cx="40" cy="36" r="3" fill="#083344" />
    <path d="M100 28c8 2 14 6 18 12-8 0-14-2-18-6v-6z" fill="#7CC5DD" />
  </svg>
);

const Penguin = (props) => (
  <svg viewBox="0 0 48 64" fill="none" aria-hidden {...props}>
    <ellipse cx="24" cy="36" rx="16" ry="20" fill="#0F172A" />
    <ellipse cx="24" cy="40" rx="10" ry="14" fill="#FFFFFF" />
    <circle cx="18" cy="28" r="2" fill="#111827" />
    <circle cx="30" cy="28" r="2" fill="#111827" />
    <path d="M24 18l4 4h-8l4-4z" fill="#F59E0B" />
  </svg>
);

const Coral = (props) => (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
    <path
      d="M28 60c0-16 0-20 8-28s-6-8-6-14 10-8 10-2-4 8 2 12 14 4 8 10-10 8-10 14 0 8-12 8z"
      fill="#FCA5A5"
    />
  </svg>
);

const Anemone = (props) => (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
    <path
      d="M16 60c0-10 6-12 6-18s-8-6-6-12 10-6 10 0-4 8 2 12 10 4 10 10 0 8-22 8z"
      fill="#F9A8D4"
    />
  </svg>
);

// ============================
// Small helpers
// ============================
const SectionTitle = ({ title, subtitle }) => (
  <div className="mx-auto max-w-5xl text-center">
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-sky-900">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-sky-700/80 leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1 text-sm text-sky-800 shadow-sm">
    {children}
  </span>
);

// ============================
// Main component
// ============================
export default function OceanFamilyLanding({ data = siteData }) {
  // Basic entrance variants
  const floatY = {
    animate: { y: [0, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div
      className="min-h-screen scroll-smooth bg-gradient-to-b from-sky-100 to-sky-200 text-sky-900"
      style={{ fontFamily: '"Nunito", ui-sans-serif, system-ui' }}
    >
      {/* ===== Nav (translucent, stays same before/after scroll) ===== */}
      <header className="sticky top-0 z-40 border-b border-sky-100/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="w-12 place-items-center rounded-xl">
              <img src="assets/logo.png" alt="" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-sky-900">
              海洋家族
            </span>
          </a>
          <nav className="hidden gap-6 md:flex text-sky-800/90">
            <a className="hover:text-sky-900" href="#services">
              服務項目
            </a>
            <a className="hover:text-sky-900" href="#events">
              活動紀錄
            </a>
            <a className="hover:text-sky-900" href="#hosts">
              主持群
            </a>
            <a className="hover:text-sky-900" href="#contact">
              聯絡我們
            </a>
          </nav>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="home" className="relative overflow-hidden scroll-mt-24">
        {/* background waves */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-50" />
          <div className="absolute bottom-0 w-full text-sky-200">
            <WaveDivider />
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div className="absolute left-10 top-4 w-40" {...floatY}>
            <Dolphin />
          </motion.div>
          <motion.div
            className="absolute right-10 top-0 w-28"
            {...floatY}
            transition={{ ...floatY.transition, duration: 5 }}
          >
            <Whale />
          </motion.div>
          <motion.div
            className="absolute right-6 bottom-10 w-16"
            initial={{ rotate: -8 }}
            animate={{ rotate: [-8, 6, -8] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <Starfish />
          </motion.div>
          <motion.div className="absolute left-0 bottom-0 w-24 opacity-90">
            <Coral />
          </motion.div>
          <motion.div className="absolute left-24 bottom-2 w-16 opacity-90">
            <Anemone />
          </motion.div>
          <motion.div
            className="absolute right-20 bottom-2 w-16"
            {...floatY}
            transition={{ ...floatY.transition, duration: 3.6 }}
          >
            <Penguin />
          </motion.div>
          {/* bubbles */}
          <div className="absolute inset-0 -z-10">
            {[...Array(8)].map((_, i) => (
              <IconBubble
                key={i}
                className="absolute h-8 w-8 text-sky-400/40"
                style={{ left: `${10 + i * 10}%`, top: `${60 - i * 6}%` }}
              />
            ))}
          </div>
          <div>
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-sky-900 md:text-5xl">
              <img className="m-auto w-100" src="assets/海洋家族.png" alt="" />
            </h1>
            <p className="mt-4 max-w-prose text-[17px] leading-7 text-sky-800/90 whitespace-pre-line">
              {data.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {data.hero.ctas?.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={
                    c.kind === "primary"
                      ? "rounded-full bg-sky-500 px-5 py-2.5 text-white shadow hover:bg-sky-600"
                      : "rounded-full bg-amber-300/90 px-5 py-2.5 text-sky-900 shadow hover:bg-amber-300"
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>
            {/* Social links as pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {data.hero.socials?.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="transition hover:scale-[1.02]"
                >
                  <Pill>
                    <img
                      className="w-8 pr-2"
                      src={`assets/icon/${s.icon}`}
                      alt=""
                    />
                    {s.label}
                  </Pill>
                </a>
              ))}
            </div>
          </div>
          {/* Illustrations */}
          <div className="">
            <img src="assets/hero.png" alt="" />
          </div>
        </div>
      </section>

      {/* ===== Hosts ===== */}
      <section
        id="hosts"
        className="relative scroll-mt-24 pt-28 md:pt-32 pb-16 md:pb-20"
      >
        <div className="absolute top-0 w-full text-sky-200 pointer-events-none z-0">
          <WaveDivider />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <SectionTitle
            title="主持群介紹"
            subtitle="專業、親切，與孩子一起探索世界"
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.hosts.map((h) => (
              <article
                key={h.name}
                className="rounded-2xl border border-sky-200 bg-white/80 p-6 shadow-sm"
              >
                <img className="pb-4" src={h.image} alt="" />
                <span className="flex items-center justify-center gap-2">
                  <h3 className="text-lg font-bold text-sky-900">
                    {h.name}
                  
                  </h3>
                  <a className="" href={h.ig} target="_blank">
                      <img
                        className="w-10 pr-2"
                        src="assets/icon/Instagram.png"
                        alt=""
                      />
                    </a>
                </span>
                <ul className="mt-3 space-y-1  overflow-auto pr-2 text-sky-800/90">
                  {h.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" />{" "}
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Partners */}
          {/* {data.partners?.length > 0 && (
            <div className="mt-8 rounded-2xl bg-white/70 p-6 text-center text-sky-800/90 ring-1 ring-sky-100">
              <img
                className="m-auto pb-4 w-80"
                src="assets/host/host 7.png"
                alt=""
              />
              <p>特約合作藝人：{data.partners.join("、 ")}</p>
            </div>
          )} */}
        </div>
      </section>

      {/* ===== Services ===== */}
      <section
        id="services"
        className="relative scroll-mt-24 pt-28 md:pt-60 pb-16 md:pb-20"
      >
        <div className="absolute top-0 w-full text-sky-200 pointer-events-none z-0">
          <WaveDivider flip />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <SectionTitle
            title="服務項目"
            subtitle="從萬人的大型活動到小型私人派對皆可客製化演出內容"
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s) => (
              <div
                key={s.key}
                className="group rounded-2xl border border-sky-200 bg-white/80 p-6 shadow-sm transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-sky-900">{s.name}</h3>
                <p className="mt-2 text-sm text-sky-800/80">
                  更多內容請見活動紀錄 / 詳細頁
                </p>
                <a
                  href="#events"
                  className="mt-4 inline-block text-sky-700 underline-offset-4 hover:underline"
                >
                  查看活動紀錄 →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Events (focus: 歡樂唱跳) ===== */}
      <section id="events" className="scroll-mt-24 py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <SectionTitle
            title="活動紀錄"
            subtitle="族繁不及備載，持續更新"
          />

          {/* 2025 以前精選 */}
          <div className="mt-10 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
            <h3 className="text-xl font-bold text-sky-900">
              歡樂唱跳｜2025 年 7 月前
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.events.dance.highlightsBeforeJul2025.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2025 */}
          <div className="mt-6 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
            <h3 className="text-xl font-bold text-sky-900">
              歡樂唱跳｜2025 年
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.events.dance.y2025.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2024 */}
          <div className="mt-6 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
            <h3 className="text-xl font-bold text-sky-900">
              歡樂唱跳｜2024 年
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.events.dance.y2024.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 其他 2024 */}
          <div className="mt-6 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
            <h3 className="text-xl font-bold text-sky-900">其他 2024 年活動</h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.events.dance.y2024Other.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 其他服務簡列 */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* 私人派對 */}
            <div className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
              <h3 className="text-lg font-bold text-sky-900">私人派對</h3>
              <ul className="mt-3 space-y-1">
                {data.events.party.features.map((f, i) => (
                  <li key={i} className="text-sky-800/90">
                    • {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-sky-700/80">
                花絮：{data.events.party.note}
              </p>
            </div>

            {/* 活動主持 */}
            <div className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
              <h3 className="text-lg font-bold text-sky-900">活動主持</h3>
              <ul className="mt-3 space-y-1 overflow-auto pr-2">
                {data.events.hosting.list.map((f, i) => (
                  <li key={i} className="text-sky-800/90">
                    • {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* 人偶 / 影視 / 職人體驗 */}
            <div className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100">
              <h3 className="text-lg font-bold text-sky-900">
                人偶・影視・職人體驗
              </h3>
              <p className="mt-2 text-sky-800/90">人偶見面會：</p>
              <ul className="ml-3 list-disc text-sky-800/90">
                {data.events.mascot.list.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              <p className="mt-3 text-sky-800/90">影視拍攝：</p>
              <ul className="ml-3 list-disc text-sky-800/90">
                {data.events.media.list.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              <p className="mt-3 text-sky-800/90">職人體驗：</p>
              <p className="text-sm text-sky-700/80">
                {data.events.career.tagline}
              </p>
              <ul className="ml-3 mt-1 list-disc text-sky-800/90  overflow-auto pr-2">
                {data.events.career.cases.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionTitle title="影音精選" subtitle="VIDEOS" icon={Youtube} />
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {[
              ["IUq5H7BQi-E", "海洋家族原創金曲"],
              ["Ezqc3lW5eWo", "職人體驗"],
              ["49pd-uJUB2Q", "唱跳秀花絮"],
            ].map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl border border-sky-100 bg-sky-50 p-3 shadow"
              >
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black/5">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${id[0]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 text-sm text-sky-800 text-center">
                  {id[1]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="scroll-mt-24 py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <SectionTitle
            title="活動洽詢方式"
            subtitle="歡迎來信或從社群平台私訊我們"
          />
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3">
            {data.contact.items.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="rounded-xl border border-sky-200 bg-white/80 px-4 py-3 text-center text-sky-800/90 shadow-sm transition hover:shadow-md"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Soft Footer ===== */}
      <footer className="relative mt-6 border-t border-sky-100/80 bg-gradient-to-b from-white/80 to-sky-50/70 overflow-hidden ">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 pt-14 pb-10 text-center">
          <p className="text-sky-800/90">
            © {new Date().getFullYear()} 海洋家族 Ocean Family
          </p>
          <p className="text-sm text-sky-700/70">
            為孩子與家庭打造難忘的舞台體驗。
          </p>
        </div>
      </footer>
    </div>
  );
}
