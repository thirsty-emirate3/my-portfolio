import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const heading = '技術とユーザーをつなぎ、幅広い世代に対して使われるサービスを生み出せるエンジニア';
const byline = '筑波大学大学院 / 知能機能システム学位プログラム';

const bullets = [
  'チームで協働しながら成果を生み出す力',
  '技術力と最新技術への強い関心',
  'YouTube運営を通して培った顧客視点（登録者1.8万人）',
];

export const PatternPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-300">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </a>
          <div className="text-sm text-slate-500">/patterns – フル画面見出しプレビュー</div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] bg-white/65 p-8 sm:p-12 lg:p-16 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.35)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.18),transparent_32%)]" />
          <div className="pointer-events-none absolute -right-24 top-10 h-56 w-56 rounded-full bg-white/50 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700/80">目指す将来像</div>
              <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight text-slate-900 drop-shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
                {heading}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600">{byline}</p>

              <div className="space-y-4 rounded-3xl bg-white/80 px-6 py-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.5)] border border-white/60">
                <p className="text-xl sm:text-2xl font-semibold text-slate-800">その将来像に向けて、これまで</p>
                <ul className="space-y-3 text-xl sm:text-2xl text-slate-900">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-3 w-3 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xl sm:text-2xl text-slate-800">
                  を通じて、<span className="font-bold text-red-600">技術力と利用者視点の双方</span>を磨いてきました。
                </p>
              </div>
            </div>

            <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100/80 via-white to-sky-100/70 border border-white/60 shadow-inner shadow-black/10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.2),transparent_45%),radial-gradient(circle_at_75%_70%,rgba(59,130,246,0.18),transparent_45%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm">右側はビジュアル領域</div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
