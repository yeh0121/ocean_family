import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, Mail, Star, Fish, Youtube, Sparkles } from "lucide-react";

// --- Simple decorative SVGs ---
const WaveDivider = ({ flip = false }) => (
  <svg
    viewBox="0 0 1440 120"
    aria-hidden="true"
    className={`block w-full ${flip ? "rotate-180" : ""}`}
    preserveAspectRatio="none"
  >
    <path
      d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,74.7C672,85,768,107,864,117.3C960,128,1056,128,1152,112C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      className="fill-sky-100"
    />
  </svg>
);

const FloatingBubbles = ({ count = 12 }) => {
  const items = useMemo(() => Array.from({ length: count }), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((_, i) => {
        const size = 16 + (i % 5) * 8;
        const left = (i * 79) % 100; // pseudo-random
        const delay = (i % 7) * 0.6;
        const duration = 10 + (i % 6) * 3;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50 backdrop-blur-sm"
            style={{ width: size, height: size, left: `${left}%`, bottom: -40 }}
            animate={{ y: [0, -800], opacity: [0.6, 0.1] }}
            transition={{ repeat: Infinity, duration, delay, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

const StarBadge = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300/90 px-3 py-1 text-xs font-semibold text-amber-800 shadow">
    <Star className="h-4 w-4" /> {children}
  </div>
);

const SectionHeading = ({ title, subtitle, icon: Icon }) => (
  <div className="mx-auto mb-8 max-w-2xl text-center">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sky-800">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span className="text-xs font-semibold tracking-wide">{subtitle}</span>
    </div>
    <h2 className="text-3xl font-extrabold tracking-tight text-sky-900 md:text-4xl">{title}</h2>
  </div>
);

const PillButton = ({ href, children, Icon }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-amber-900 shadow transition hover:translate-y-[-1px] hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/60"
  >
    {Icon ? <Icon className="h-5 w-5" /> : null}
    {children}
  </a>
);

// Hidden star mini game in the hero section
const HiddenStars = ({ total = 5, onFoundAll }) => {
  const [found, setFound] = useState([]);
  const containerRef = useRef(null);

  // pre-generate star positions
  const positions = useMemo(
    () =>
      Array.from({ length: total }).map((_, i) => ({
        top: 10 + (i * 17) % 70, // percentage
        left: 8 + (i * 23) % 84,
        delay: (i % 5) * 0.4,
      })),
    [total]
  );

  useEffect(() => {
    if (found.length === total) onFoundAll?.();
  }, [found, total, onFoundAll]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {positions.map((p, i) => (
        <button
          key={i}
          aria-label="找找看藏在海中的小海星"
          onClick={() =>
            setFound((prev) => (prev.includes(i) ? prev : [...prev, i]))
          }
          className={`absolute rounded-full transition ${
            found.includes(i)
              ? "opacity-0"
              : "opacity-70 hover:scale-110 hover:opacity-100"
          }`}
          style={{ top: `${p.top}%`, left: `${p.left}%` }}
        >
          <motion.span
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0.9, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, delay: p.delay }}
            className="grid place-items-center rounded-full bg-yellow-300/90 p-1 shadow"
          >
            <Star className="h-5 w-5 text-amber-700" />
          </motion.span>
        </button>
      ))}

      <AnimatePresence>
        {found.length > 0 && found.length < total && (
          <motion.div
            className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-sky-900 shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            已找到 {found.length}/{total} 顆小海星，加油！
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {found.length === total && (
          <motion.div
            className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-amber-900 shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            恭喜！你找到了所有隱藏海星 ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function StarfishBrotherSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "首頁" },
    { id: "about", label: "認識我" },
    { id: "events", label: "活動行程" },
    { id: "videos", label: "影音精選" },
    { id: "contact", label: "聯絡我" },
  ];

  // --- Minimal runtime smoke tests (since we don't have a test runner here) ---
  useEffect(() => {
    if (typeof document === "undefined") return;
    try {
      const results = [];
      results.push(["navItems>=5", navItems.length >= 5]);
      const required = ["home", "about", "events", "videos", "contact"]; 
      results.push([
        "sections present",
        required.every((id) => !!document.getElementById(id))
      ]);
      const starButtons = document.querySelectorAll(
        'button[aria-label="找找看藏在海中的小海星"]'
      ).length;
      results.push(["hidden stars rendered", starButtons === 5]);
      const videoIframes = document.querySelectorAll("#videos iframe").length;
      results.push(["videos embedded>=2", videoIframes >= 2]);
      // eslint-disable-next-line no-console
      console.log(
        "[SmokeTests] StarfishBrotherSite",
        Object.fromEntries(results)
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[SmokeTests] failed", err);
    }
  }, []);

  return (
    <div
      className="min-h-screen scroll-smooth bg-gradient-to-b from-sky-50 to-sky-100 text-sky-900"
      style={{ fontFamily: '"Nunito", ui-sans-serif, system-ui' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-sky-100/50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-300 shadow">
              <Star className="h-6 w-6 text-amber-800" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold text-amber-700">海星哥哥</div>
              <div className="text-xs text-sky-600">Starfish Brother</div>
            </div>
          </a>

          <nav className="hidden gap-6 md:flex">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-full px-3 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100">
                {n.label}
              </a>
            ))}
          </nav>

          <button
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-amber-900 shadow hover:bg-amber-300 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            選單
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 pb-4">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl bg-white px-4 py-3 text-center font-semibold text-sky-700 shadow hover:bg-sky-50"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-50" />
        <FloatingBubbles />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <StarBadge>和海星哥哥一起玩</StarBadge>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-sky-900 md:text-5xl">
              嗨！我是 <span className="text-amber-600">海星哥哥</span><br />
              一起潛進奇妙的海底世界吧！
            </h1>
            <p className="mt-4 max-w-xl text-sky-700">
              唱唱跳跳、說故事、做遊戲～ 每一天都有新發現！
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PillButton href="#events" Icon={Calendar}>看看活動</PillButton>
              <a href="#videos" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-sky-800 shadow hover:bg-sky-50">
                <Play className="h-5 w-5" /> 觀看影片
              </a>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto aspect-square w-72 max-w-full rounded-[2rem] bg-gradient-to-br from-amber-200 via-amber-300 to-amber-200 p-4 shadow-2xl md:w-96"
            >
              <div className="absolute -left-4 -top-4 rotate-[-8deg] rounded-xl bg-white px-3 py-1 text-sm font-bold text-amber-700 shadow">
                海星哥哥比 YA ✌️
              </div>
              {/* Placeholder character illustration */}
              <div className="grid h-full w-full place-items-center rounded-[1.5rem] bg-amber-50">
                <motion.div
                  animate={{ rotate: [0, -4, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                  className="relative h-48 w-48"
                >
                  {/* starfish body */}
                  <div className="absolute inset-0 origin-center rotate-12 rounded-[40%] bg-gradient-to-br from-amber-300 to-amber-200" />
                  {/* eyes */}
                  <div className="absolute left-1/3 top-1/3 h-4 w-4 rounded-full bg-sky-900" />
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-900" />
                  {/* smile */}
                  <div className="absolute left-1/2 top-[62%] h-2 w-10 -translate-x-1/2 rounded-b-full border-b-4 border-sky-900" />
                </motion.div>
              </div>
              <HiddenStars total={5} onFoundAll={() => { /* celebratory UI handled inside */ }} />
            </motion.div>
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* About */}
      <section id="about" className="relative bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading title="認識海星哥哥" subtitle="ABOUT" icon={Sparkles} />
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl font-extrabold text-sky-900">來自海底的笑容傳遞員</h3>
              <p className="mt-3 leading-relaxed text-sky-800">
                我最喜歡帶著小朋友一起唱歌、跳舞和探索。每一次互動，都像撿到一顆會發亮的海星——把勇氣和好奇心裝進口袋！
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sky-800">
                <li>幼幼台節目演出與活動主持</li>
                <li>親子互動帶動唱、故事時間</li>
                <li>兒童安全與友善溝通倡議</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow">
                <FloatingBubbles count={8} />
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-sky-700">有趣小故事</p>
                  <p className="mt-1 text-sky-800">
                    小時候在海邊撿到一顆特別的海星，牠告訴我：「把笑容送給更多人。」從此我就成為傳遞笑容的海星哥哥！
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <WaveDivider flip />
      </section>

      {/* Events */}
      <section id="events" className="bg-gradient-to-b from-sky-100 to-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading title="活動行程" subtitle="EVENTS" icon={Calendar} />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                date: "10/05 (日)",
                title: "幼幼台現場互動秀",
                place: "台北 兒童新樂園",
                desc: "一起唱唱跳跳，找隱藏海星！",
              },
              {
                date: "10/19 (日)",
                title: "親子故事派對",
                place: "桃園 圖書館總館",
                desc: "海星哥哥說故事＋手作海星徽章。",
              },
              {
                date: "11/02 (日)",
                title: "海洋保育日",
                place: "基隆 潮境公園",
                desc: "小小淨灘員，守護海洋從你我開始！",
              },
            ].map((e, i) => (
              <motion.article
                key={i}
                className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-sky-700">
                  {e.date}
                </div>
                <h3 className="text-lg font-extrabold text-sky-900">{e.title}</h3>
                <p className="mt-1 text-sm text-sky-700">{e.place}</p>
                <p className="mt-3 text-sky-800">{e.desc}</p>
                <div className="mt-4">
                  <a className="inline-block rounded-full bg-sky-600 px-4 py-2 text-sm font-bold text-white shadow hover:bg-sky-500" href="#contact">
                    索取活動資訊
                  </a>
                </div>
                <Fish className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rotate-12 text-sky-200" />
              </motion.article>
            ))}
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* Videos */}
      <section id="videos" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading title="影音精選" subtitle="VIDEOS" icon={Youtube} />
          <div className="grid gap-6 md:grid-cols-2">
            {["dQw4w9WgXcQ", "ysz5S6PUM-U"].map((id, i) => (
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
                    src={`https://www.youtube.com/embed/${id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 text-sm text-sky-800">海星哥哥的精彩片段 #{i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <WaveDivider flip />
      </section>

      {/* Contact */}
      <section id="contact" className="relative bg-gradient-to-b from-sky-100 to-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading title="寫信給海星哥哥" subtitle="CONTACT" icon={Mail} />
          <div className="grid gap-8 md:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("已收到你的訊息！海星哥哥和小魚們會盡快回覆🐟");
              }}
              className="order-2 rounded-3xl border border-sky-100 bg-white p-6 shadow md:order-1"
            >
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-sky-900">你的名字</span>
                  <input required className="rounded-xl border border-sky-200 px-4 py-3 outline-none ring-amber-300/50 focus:ring" placeholder="小朋友或家長名字" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-sky-900">Email</span>
                  <input type="email" required className="rounded-xl border border-sky-200 px-4 py-3 outline-none ring-amber-300/50 focus:ring" placeholder="you@example.com" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-sky-900">訊息</span>
                  <textarea required rows={4} className="resize-y rounded-xl border border-sky-200 px-4 py-3 outline-none ring-amber-300/50 focus:ring" placeholder="想對海星哥哥說什麼？" />
                </label>
                <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-bold text-amber-900 shadow transition hover:bg-amber-300">
                  <Mail className="h-5 w-5" /> 送出
                </button>
              </div>
            </form>

            <div className="order-1 md:order-2">
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow">
                <h3 className="text-lg font-extrabold text-amber-800">合作與演出邀約</h3>
                <p className="mt-2 text-amber-900/90">
                  歡迎電視台、學校、親子館、品牌活動邀約！也可客製親子互動橋段與主題歌舞。
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-amber-900/90">
                  <li>學齡前友善、簡單易懂的互動流程</li>
                  <li>可搭配海洋保育或節慶主題</li>
                  <li>提供活動海報素材與社群宣傳文案</li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-sky-800">
                也可以寫信到：<a className="font-bold text-sky-700 underline" href="mailto:hello@starbro.example">hello@starbro.example</a>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-sky-700">© {new Date().getFullYear()} 海星哥哥 Starfish Brother</p>
          <div className="flex items-center gap-3 text-sky-700">
            <a href="#home" className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold hover:bg-sky-200">回到頂部</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
