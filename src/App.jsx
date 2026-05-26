
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Download, Share2, MessageCircle, Snowflake, Bell, Factory,
  HeartCrack, Sparkles, Moon, ArrowDown, Quote, DoorOpen
} from "lucide-react";

const imageAssets = {
  cover: "/cover.png",
  city: "/images/aster-city.png",
  girl: "/images/nia-rooftop.png",
  bell: "/images/glass-bell-time.png",
  night: "/images/winter-night.png",
};

function TimeParticles({ dark = false }) {
  const particles = useMemo(
    () => Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 9,
      duration: 12 + Math.random() * 15,
      size: 2.5 + Math.random() * 6.5,
      opacity: 0.14 + Math.random() * 0.32,
    })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={dark ? "absolute top-[-20px] rounded-full bg-[#F7F1E6]" : "absolute top-[-20px] rounded-full bg-[#D7CBB9]"}
          style={{ left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, 940], x: [0, p.id % 2 ? 24 : -20], rotate: [0, 220] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.34em] ${light ? "text-[#D7CBB9]" : "text-[#A25B5B]"}`}>
      <span className={`h-px w-10 ${light ? "bg-[#D7CBB9]/55" : "bg-[#A25B5B]/45"}`} />
      <span>{children}</span>
    </div>
  );
}

function ImageWithFallback({ src, alt, className, fallbackClassName = "", children }) {
  return (
    <div className={`relative overflow-hidden ${fallbackClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling;
          if (fallback) fallback.classList.remove("hidden");
        }}
      />
      <div className="hidden h-full w-full">{children}</div>
    </div>
  );
}

function FallbackArt({ type = "city" }) {
  const Icon = type === "bell" ? Bell : type === "girl" ? Moon : Factory;
  return (
    <div className="flex h-full min-h-[260px] flex-col justify-between bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,.62),transparent_28%),linear-gradient(135deg,rgba(247,241,230,.92),rgba(215,203,185,.45))] p-8">
      <div className="flex items-center gap-3 text-sm tracking-[0.24em] text-[#A25B5B]">
        <Sparkles size={16} /> ASTER
      </div>
      <Icon className="self-center text-[#263241]/35" size={110} strokeWidth={1} />
      <p className="max-w-xs font-serif text-lg leading-8 text-[#6E6259]">
        시간과 울음이 조용히 쌓이는 도시의 한 장면
      </p>
    </div>
  );
}

function SymbolCard({ icon: Icon, title, children, image, tone = "light" }) {
  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[1.75rem] border border-[#D7CBB9]/80 bg-[#F7F1E6]/80 shadow-sm backdrop-blur"
    >
      <ImageWithFallback src={image} alt="" className="h-44 w-full object-cover transition duration-700 group-hover:scale-105" fallbackClassName="h-44">
        <FallbackArt type={tone} />
      </ImageWithFallback>
      <div className="p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#D7CBB9] bg-white/30 text-[#A25B5B]">
          <Icon size={21} strokeWidth={1.7} />
        </div>
        <h3 className="mb-3 font-serif text-xl font-semibold text-[#2B2A28]">{title}</h3>
        <p className="leading-8 text-[#6E6259]">{children}</p>
      </div>
    </motion.article>
  );
}

function RuleCard({ number, title, children, icon: Icon }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-[#D7CBB9] bg-white/25 p-7 shadow-sm"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#A25B5B]/[0.06] transition group-hover:bg-[#A25B5B]/[0.1]" />
      <div className="mb-8 flex items-start justify-between">
        <p className="font-serif text-5xl text-[#D7CBB9]">{number}</p>
        <Icon className="text-[#A25B5B]/55" size={26} strokeWidth={1.5} />
      </div>
      <h3 className="mb-3 font-serif text-xl font-semibold text-[#2B2A28]">{title}</h3>
      <p className="leading-8 text-[#6E6259]">{children}</p>
    </motion.article>
  );
}

function Tag({ children }) {
  return <span className="rounded-full border border-[#D7CBB9] bg-[#F7F1E6]/70 px-4 py-2 text-sm text-[#6E6259]">{children}</span>;
}

function BookSpread() {
  return (
    <div className="relative rounded-[2rem] border border-[#D7CBB9] bg-[#EFE5D6] p-3 shadow-2xl shadow-[#263241]/10">
      <div className="grid overflow-hidden rounded-[1.45rem] border border-[#D7CBB9] bg-[#F7F1E6] md:grid-cols-2">
        <div className="relative min-h-[460px] border-b border-[#D7CBB9] md:border-b-0 md:border-r">
          <ImageWithFallback src={imageAssets.cover} alt="동화책 표지" className="h-full w-full object-cover" fallbackClassName="h-full">
            <FallbackArt />
          </ImageWithFallback>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#263241]/15 via-transparent to-transparent" />
        </div>
        <div className="relative p-8 md:p-10">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-[#CBBDA8] md:block" />
          <p className="mb-6 text-xs tracking-[0.34em] text-[#A25B5B]">BOOK PAGE</p>
          <h3 className="font-serif text-3xl font-bold leading-tight">눈 내리는<br />시간의 굴뚝</h3>
          <div className="mt-10 space-y-5 font-serif text-lg leading-9 text-[#2B2A28]">
            <p>도시 아스테르는 해마다 겨울이 오면 눈이 내리지 않았다.</p>
            <p className="font-bold">대신 시간이 내렸다.</p>
            <p className="text-[#6E6259]">흰 가루처럼 부서진 어제와 은빛 조각처럼 반짝이는 내일이 하늘에서 조용히 떨어졌다.</p>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-[#6E6259]">
            <span className="h-px flex-1 bg-[#D7CBB9]" />
            <span>미리보기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SnowingTimeChimneyLandingPage() {
  const shareBook = async () => {
    const data = {
      title: "눈 내리는 시간의 굴뚝",
      text: "시간은 눈처럼 내렸고, 사람들은 슬픔을 팔아 내일을 얻었다.",
      url: window.location.href,
    };
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main className="min-h-screen bg-[#F7F1E6] text-[#2B2A28] selection:bg-[#A25B5B]/20 selection:text-[#2B2A28]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Serif+KR:wght@400;600;700&family=Pretendard:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: Pretendard, system-ui, sans-serif; }
        .font-serif { font-family: 'Noto Serif KR', 'Gowun Batang', serif; }
        .paper-texture {
          background-image:
            radial-gradient(circle at 20% 10%, rgba(255,255,255,0.62), transparent 30%),
            radial-gradient(circle at 92% 14%, rgba(38,50,65,0.1), transparent 22%),
            linear-gradient(135deg, rgba(215,203,185,0.2) 0 1px, transparent 1px);
          background-size: auto, auto, 18px 18px;
        }
      `}</style>

      <section className="paper-texture relative overflow-hidden border-b border-[#D7CBB9]">
        <ImageWithFallback src={imageAssets.night} alt="겨울밤의 아스테르 도시" className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-multiply" fallbackClassName="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_30%,rgba(38,50,65,.14),transparent_35%)]" />
        </ImageWithFallback>
        <TimeParticles />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F1E6]/80 via-[#F7F1E6]/70 to-[#F7F1E6]" />
        <div className="absolute right-[-12%] top-[-18%] h-[520px] w-[520px] rounded-full bg-[#263241]/10 blur-3xl" />
        <div className="absolute bottom-[-24%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#A25B5B]/10 blur-3xl" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a href="#top" className="font-serif text-lg font-bold tracking-tight text-[#2B2A28]" aria-label="홈으로 이동">눈 내리는 시간의 굴뚝</a>
          <div className="hidden items-center gap-8 text-sm text-[#6E6259] md:flex">
            <a href="#book" className="transition hover:text-[#A25B5B]">표지</a>
            <a href="#world" className="transition hover:text-[#A25B5B]">세계</a>
            <a href="#preview" className="transition hover:text-[#A25B5B]">미리보기</a>
            <a href="#download" className="transition hover:text-[#A25B5B]">읽기</a>
          </div>
        </nav>

        <div id="top" className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-6 pb-24 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <FadeIn>
            <p className="mb-5 text-sm font-medium tracking-[0.35em] text-[#A25B5B]">잔혹동화 · 철학동화 · 환상동화</p>
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-[-0.04em] text-[#2B2A28] md:text-7xl">눈 내리는<br />시간의 굴뚝</h1>
            <p className="mt-8 max-w-2xl font-serif text-2xl leading-10 text-[#263241] md:text-3xl">시간은 눈처럼 내렸고, 사람들은 슬픔을 팔아 내일을 얻었다.</p>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[#6E6259]">울 수 없는 아이 니아가, 도시의 가장 깊은 굴뚝 아래에서 잃어버린 울음을 찾는 이야기.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#preview" className="inline-flex items-center justify-center rounded-full bg-[#263241] px-7 py-4 text-sm font-semibold text-[#F7F1E6] shadow-sm transition hover:bg-[#2B2A28]"><BookOpen className="mr-2" size={18} /> 미리보기 읽기</a>
              <a href="/book.pdf" download className="inline-flex items-center justify-center rounded-full border border-[#263241]/30 bg-white/25 px-7 py-4 text-sm font-semibold text-[#263241] backdrop-blur transition hover:border-[#A25B5B] hover:text-[#A25B5B]"><Download className="mr-2" size={18} /> PDF 다운로드</a>
            </div>
          </FadeIn>

          <FadeIn className="relative mx-auto w-full max-w-xl" delay={0.08}>
            <div className="absolute -left-5 top-10 hidden h-56 w-40 rotate-[-8deg] rounded-[1.4rem] border border-[#D7CBB9] bg-[#F7F1E6]/80 p-3 shadow-xl shadow-[#263241]/10 lg:block">
              <ImageWithFallback src={imageAssets.bell} alt="유리 종과 시간 조각" className="h-full w-full rounded-[1rem] object-cover" fallbackClassName="h-full rounded-[1rem]"><FallbackArt type="bell" /></ImageWithFallback>
            </div>
            <div className="absolute -right-7 bottom-8 hidden h-48 w-36 rotate-[7deg] rounded-[1.4rem] border border-[#D7CBB9] bg-[#F7F1E6]/80 p-3 shadow-xl shadow-[#263241]/10 lg:block">
              <ImageWithFallback src={imageAssets.city} alt="아스테르 도시" className="h-full w-full rounded-[1rem] object-cover" fallbackClassName="h-full rounded-[1rem]"><FallbackArt /></ImageWithFallback>
            </div>
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-[#D7CBB9] bg-[#F7F1E6] p-3 shadow-2xl shadow-[#263241]/14">
              <ImageWithFallback src={imageAssets.cover} alt="동화책 눈 내리는 시간의 굴뚝 표지" className="aspect-[3/4] w-full rounded-[1.45rem] object-cover" fallbackClassName="aspect-[3/4] rounded-[1.45rem]"><FallbackArt /></ImageWithFallback>
            </div>
          </FadeIn>
        </div>

        <a href="#book" className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-[#D7CBB9] bg-[#F7F1E6]/60 p-3 text-[#6E6259] backdrop-blur transition hover:text-[#A25B5B] md:block" aria-label="아래로 이동"><ArrowDown size={18} /></a>
      </section>

      <section id="book" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <FadeIn>
            <SectionLabel>THE BOOK</SectionLabel>
            <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">표지에서 시작되는<br />조용한 겨울의 이야기</h2>
            <p className="mt-8 max-w-xl text-lg leading-9 text-[#6E6259]">굴뚝, 유리 종, 시간 눈, 지붕 위의 아이. 사이트 전체의 이미지는 책의 상징을 따라 천천히 펼쳐지는 삽화처럼 구성했다.</p>
          </FadeIn>
          <FadeIn delay={0.08}><BookSpread /></FadeIn>
        </div>
      </section>

      <section id="world" className="relative overflow-hidden border-y border-[#D7CBB9] bg-white/20 px-6 py-28 lg:px-8">
        <div className="absolute inset-0 opacity-50">
          <ImageWithFallback src={imageAssets.city} alt="눈 내리는 아스테르 도시" className="h-full w-full object-cover opacity-[0.18]" fallbackClassName="h-full"><FallbackArt /></ImageWithFallback>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <FadeIn>
              <SectionLabel>BOOK INTRODUCTION</SectionLabel>
              <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">시간이 눈처럼 내리는 도시,<br />아스테르</h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="rounded-[1.75rem] border border-[#D7CBB9] bg-[#F7F1E6]/80 p-8 shadow-sm backdrop-blur-sm">
                <div className="space-y-6 text-lg leading-9 text-[#6E6259]">
                  <p>도시 아스테르에는 겨울마다 눈이 내리지 않는다. 대신 흰 가루처럼 부서진 어제와 은빛 조각처럼 반짝이는 내일이 하늘에서 내려온다.</p>
                  <p>사람들은 그 시간을 항아리에 담아 먹고 살아가지만, 아무도 그 시간이 무엇으로 만들어지는지는 묻지 않는다. 이야기는 울 수 없는 아이 니아가 금지된 미소 굴뚝 아래로 내려가며 시작된다.</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <SymbolCard icon={Snowflake} title="시간 눈" image={imageAssets.city}>어제와 내일이 눈처럼 내리는 도시.</SymbolCard>
            <SymbolCard icon={Bell} title="유리 종" image={imageAssets.bell} tone="bell">울지 못하는 아이의 손끝에서 자라는 슬픔.</SymbolCard>
            <SymbolCard icon={Factory} title="미소 굴뚝" image={imageAssets.night}>사람들이 팔아버린 울음으로 내일을 만드는 장소.</SymbolCard>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#263241] px-6 py-32 text-[#F7F1E6] lg:px-8">
        <ImageWithFallback src={imageAssets.night} alt="밤의 굴뚝과 별빛" className="absolute inset-0 h-full w-full object-cover opacity-35" fallbackClassName="absolute inset-0"><div className="h-full w-full bg-[#263241]" /></ImageWithFallback>
        <div className="absolute inset-0 bg-[#263241]/58" />
        <TimeParticles dark />
        <div className="relative mx-auto max-w-4xl text-center">
          <Quote className="mx-auto mb-8 text-[#D7CBB9]" size={38} strokeWidth={1.3} />
          <blockquote className="font-serif text-3xl leading-[1.65] tracking-[-0.02em] md:text-4xl">울음은 사람을 무너뜨리기도 하지만,<br />때로는 사람과 사람 사이에 놓이는<br />가장 투명한 다리가 되었다.</blockquote>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#D7CBB9] bg-[#F7F1E6] p-3 shadow-xl shadow-[#263241]/10">
            <ImageWithFallback src={imageAssets.girl} alt="지붕 위에 앉아 굴뚝을 바라보는 니아" className="h-[520px] w-full rounded-[1.45rem] object-cover" fallbackClassName="h-[520px] rounded-[1.45rem]"><FallbackArt type="girl" /></ImageWithFallback>
            <div className="pointer-events-none absolute inset-3 rounded-[1.45rem] bg-gradient-to-t from-[#263241]/25 via-transparent to-transparent" />
            <p className="absolute bottom-10 left-10 max-w-xs font-serif text-lg leading-8 text-[#F7F1E6] drop-shadow">슬플 때마다 손끝에서 투명한 유리 종이 자라나는 아이.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <SectionLabel>CHARACTER</SectionLabel>
          <h2 className="font-serif text-4xl font-bold tracking-[-0.03em] md:text-5xl">울 수 없는 아이, 니아</h2>
          <div className="mt-8 space-y-6 text-lg leading-9 text-[#6E6259]">
            <p>니아는 평범한 아이였다. 빵 껍질을 좋아했고, 지붕 위에서 시간 눈을 받아먹었다. 하지만 니아는 자기 목소리로 울 수 없었다.</p>
            <p>니아의 결핍은 단순한 불행이 아니다. 그것은 이 도시가 감추고 있는 비밀과 연결되어 있다. 니아가 잃어버린 울음은 곧 도시 전체가 잃어버린 진실이기도 하다.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Tag>울 수 없는 아이</Tag><Tag>유리 종</Tag><Tag>잃어버린 어머니</Tag><Tag>금지된 굴뚝</Tag><Tag>슬픔과 성장</Tag>
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-[#D7CBB9] bg-white/20 px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionLabel>WORLD RULES</SectionLabel>
            <h2 className="font-serif text-4xl font-bold tracking-[-0.03em] md:text-5xl">아스테르의 세 가지 규칙</h2>
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <RuleCard icon={Snowflake} number="Ⅰ" title="눈 대신 시간이 내린다">사람들은 시간을 먹고, 저장하고, 나누어 살아간다.</RuleCard>
            <RuleCard icon={Bell} number="Ⅱ" title="슬픔은 밤 전에 잊어야 한다">슬픔은 가벼운 마음 상점에서 팔 수 있다.</RuleCard>
            <RuleCard icon={DoorOpen} number="Ⅲ" title="굴뚝에는 가까이 가면 안 된다">굴뚝 밑에는 오래된 울음이 산다고 전해진다.</RuleCard>
          </div>
        </div>
      </section>

      <section id="preview" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <FadeIn>
          <SectionLabel>PREVIEW</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <h2 className="font-serif text-4xl font-bold tracking-[-0.03em] md:text-5xl">미리보기</h2>
              <p className="mt-6 text-lg leading-9 text-[#6E6259]">책장을 넘기듯 읽히도록, 본문은 넓은 여백과 낮은 채도의 종이 질감 위에 배치했다.</p>
            </div>
            <article className="relative rounded-[2rem] border border-[#D7CBB9] bg-[#F7F1E6] p-8 shadow-xl shadow-[#263241]/5 md:p-12">
              <div className="absolute bottom-6 right-8 font-serif text-8xl text-[#D7CBB9]/35">1</div>
              <div className="relative space-y-6 font-serif text-xl leading-10 text-[#2B2A28]">
                <p>도시 아스테르는 해마다 겨울이 오면 눈이 내리지 않았다.</p>
                <p className="font-bold">대신 시간이 내렸다.</p>
                <p>흰 가루처럼 부서진 어제, 은빛 조각처럼 반짝이는 내일, 손바닥에 닿자마자 녹아 사라지는 한숨만 한 오후들이 하늘에서 조용히 떨어졌다.</p>
                <p>사람들은 아침마다 문밖에 쌓인 시간을 삽으로 퍼 담아 항아리에 보관했다. 어떤 집은 젊은 날을 장작처럼 쌓아두었고, 어떤 집은 아직 오지 않은 생일을 설탕처럼 아껴두었다.</p>
              </div>
              <a href="/book.pdf" className="relative mt-10 inline-flex items-center rounded-full border border-[#263241]/30 px-6 py-3 text-sm font-semibold text-[#263241] transition hover:border-[#A25B5B] hover:text-[#A25B5B]">계속 읽기 <BookOpen className="ml-2" size={17} /></a>
            </article>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <FadeIn>
          <SectionLabel>THEMES</SectionLabel>
          <h2 className="font-serif text-4xl font-bold tracking-[-0.03em] md:text-5xl">이 이야기가 품고 있는 것들</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              "상실은 사라지는 것이 아니라, 다른 모양으로 남는다.",
              "기억은 아프기 때문에 인간을 인간답게 만든다.",
              "거짓된 행복은 때때로 진실한 고통보다 잔혹하다.",
              "어른이 된다는 것은 슬픔과 함께 걷는 법을 배우는 일이다.",
            ].map((text) => (
              <div key={text} className="rounded-[1.5rem] border border-[#D7CBB9] bg-white/20 p-7 transition hover:-translate-y-1 hover:bg-white/30">
                <HeartCrack className="mb-6 text-[#A25B5B]/70" size={24} strokeWidth={1.5} />
                <p className="font-serif text-lg leading-8 text-[#2B2A28]">{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="download" className="relative overflow-hidden bg-[#263241] px-6 py-24 text-[#F7F1E6] lg:px-8">
        <ImageWithFallback src={imageAssets.night} alt="아스테르의 겨울밤" className="absolute inset-0 h-full w-full object-cover opacity-25" fallbackClassName="absolute inset-0"><div className="h-full w-full bg-[#263241]" /></ImageWithFallback>
        <div className="absolute inset-0 bg-gradient-to-r from-[#263241] via-[#263241]/90 to-[#263241]/70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionLabel light>READ THE BOOK</SectionLabel>
            <h2 className="font-serif text-4xl font-bold tracking-[-0.03em] md:text-5xl">지금, 아스테르의 굴뚝 아래로 내려가 보세요</h2>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[#D7CBB9]">〈눈 내리는 시간의 굴뚝〉은 아름답고 쓸쓸한 잔혹동화입니다. 슬픔을 잊고 살아가는 도시에서, 한 아이가 잃어버린 울음을 되찾기 위해 금지된 진실에 다가갑니다.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="/book.pdf" download className="inline-flex items-center justify-center rounded-full bg-[#F7F1E6] px-7 py-4 text-sm font-semibold text-[#263241] transition hover:bg-white"><Download className="mr-2" size={18} /> PDF로 읽기</a>
            <button onClick={shareBook} className="inline-flex items-center justify-center rounded-full border border-[#F7F1E6]/35 px-7 py-4 text-sm font-semibold text-[#F7F1E6] transition hover:border-[#F7F1E6]" aria-label="작품 공유하기"><Share2 className="mr-2" size={18} /> 작품 공유하기</button>
            <a href="mailto:?subject=눈 내리는 시간의 굴뚝 감상&body=이 동화책을 읽고 감상을 남겨보세요." className="inline-flex items-center justify-center rounded-full border border-[#F7F1E6]/35 px-7 py-4 text-sm font-semibold text-[#F7F1E6] transition hover:border-[#F7F1E6]"><MessageCircle className="mr-2" size={18} /> 감상 남기기</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D7CBB9] px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold">눈 내리는 시간의 굴뚝</h2>
            <p className="mt-2 text-sm text-[#6E6259]">잔혹동화 / 철학동화</p>
            <p className="mt-5 max-w-2xl font-serif text-lg leading-8 text-[#6E6259]">잃어버린 울음 하나가 별이 되어, 늙어가는 도시 위에서 조용히 흔들리고 있었다.</p>
          </div>
          <p className="text-sm text-[#6E6259]">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
