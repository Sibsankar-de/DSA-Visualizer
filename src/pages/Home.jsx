import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Code2, Gauge, Play } from 'lucide-react';

const MotionSection = motion.section;
const MotionDiv = motion.div;

const features = [
  {
    title: 'Visual Learning',
    desc: 'See every comparison, swap, and final placement with clear color states.',
    icon: BarChart3,
  },
  {
    title: 'Speed Control',
    desc: 'Start, pause, resume, and reset to study each step at your own pace.',
    icon: Gauge,
  },
  {
    title: 'Code + Animation',
    desc: 'Read the C++ implementation side-by-side while the logic runs on screen.',
    icon: Code2,
  },
];

const outcomes = [
  {
    title: 'Pattern Recognition',
    desc: 'Spot why swaps happen and how local comparisons shape the final order.',
    tag: 'Compare Faster',
    icon: BarChart3,
  },
  {
    title: 'Control the Pace',
    desc: 'Pause on critical moments, replay transitions, and inspect each step.',
    tag: 'Pause Anytime',
    icon: Gauge,
  },
  {
    title: 'Code Confidence',
    desc: 'Translate animation behavior directly into cleaner implementation logic.',
    tag: 'Implement Better',
    icon: Code2,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <MotionDiv className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/25 blur-3xl" />
      <MotionDiv className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <MotionSection
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-6 py-16 md:py-24"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionDiv variants={itemVariants}>
            <p className="mb-4 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-blue-300 uppercase">
              Interactive DSA Learning
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Understand Algorithms by
              <span className="block text-blue-500">Watching Them Work</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              DSA Lab turns algorithm logic into a step-by-step visual flow. Track
              each operation in real time and connect implementation details with
              actual behavior.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/algorithms"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-bold tracking-wide text-white transition hover:bg-blue-500"
              >
                <Play size={18} fill="currentColor" />
                Start Visualizing
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 bg-slate-900/70 px-7 py-3.5 text-sm font-bold tracking-wide text-slate-200 transition hover:border-blue-400 hover:text-white"
              >
                Contact Team
                <ArrowRight size={18} />
              </Link>
            </div>

            <MotionDiv className="mt-8 flex flex-wrap gap-3 text-xs font-semibold tracking-wide text-slate-300 uppercase">
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">
                Real-time Animation
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">
                Clean C++ Snippets
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">
                Open Source
              </span>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between border-b border-slate-700/60 pb-3">
                <p className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">
                  Live Preview
                </p>
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              <div className="flex h-64 items-end justify-between gap-2 rounded-2xl border border-slate-700/60 bg-slate-800/50 p-4">
                {[22, 58, 36, 82, 47, 68, 30, 74, 52, 90].map((height, idx) => (
                  <MotionDiv
                    key={idx}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05, duration: 0.45 }}
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-700 to-blue-400"
                  />
                ))}
              </div>

              <p className="mt-4 text-sm text-slate-300">
                Compare values, watch swaps, and follow the sorting progress bar by
                bar.
              </p>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv variants={itemVariants} className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-700/70 bg-slate-800/40 p-7 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-blue-500/70"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-3 text-blue-400">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </MotionDiv>
      </MotionSection>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <MotionDiv className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-8 md:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-blue-300 uppercase">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Learn DSA with a repeatable flow
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Pick an Algorithm',
                desc: 'Choose from available sorting visualizers and open the page in one click.',
              },
              {
                step: '02',
                title: 'Run and Observe',
                desc: 'Start the animation and follow comparisons, swaps, and sorted states.',
              },
              {
                step: '03',
                title: 'Control and Repeat',
                desc: 'Pause, resume, or reset any time until the pattern is fully clear.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6"
              >
                <p className="text-sm font-black text-blue-400">{item.step}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv className="mt-10 rounded-3xl border border-slate-700/70 bg-slate-900/70 p-8 md:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-blue-300 uppercase">
            Outcomes
          </p>
          <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            What you improve in every practice run
          </h3>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {outcomes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {item.desc}
                  </p>
                  <p className="mt-4 text-xs font-bold tracking-wide text-blue-300 uppercase">
                    {item.tag}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700/70 bg-slate-800/40 px-5 py-4">
            <p className="text-sm text-slate-200">
              Ready to practice with a full visual walkthrough?
            </p>
            <Link
              to="/algorithms"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Explore Algorithms
              <ArrowRight size={16} />
            </Link>
          </div>
        </MotionDiv>
      </section>
    </div>
  );
}
