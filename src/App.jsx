import React, { useEffect, useMemo, useState } from 'react';

function useSimulatedCrowd() {
  const [crowd, setCrowd] = useState({ percent: 42, count: 85, capacity: 200, updatedAt: Date.now() });

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowd((prev) => {
        // Simulate gentle drift toward a daypart target
        const hour = new Date().getHours();
        let target = 35;
        if (hour >= 6 && hour < 10) target = 55; // morning rush
        else if (hour >= 10 && hour < 16) target = 40; // midday
        else if (hour >= 16 && hour < 21) target = 78; // evening peak
        else if (hour >= 21 || hour < 6) target = 25; // late

        const noise = (Math.random() - 0.5) * 10;
        const next = Math.max(0, Math.min(100, prev.percent + (target - prev.percent) * 0.1 + noise));
        const capacity = 200; // demo capacity
        const count = Math.round((next / 100) * capacity);
        return { percent: Math.round(next), count, capacity, updatedAt: Date.now() };
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return crowd;
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur ${className}`}>
      {children}
    </span>
  );
}

function Meter({ percent }) {
  const color = percent < 50 ? 'from-emerald-400 to-lime-400' : percent < 80 ? 'from-amber-400 to-orange-500' : 'from-rose-500 to-red-600';
  return (
    <div className="w-full">
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-[width] duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.15) 0, rgba(255,255,255,0) 50%)' }} />
      </div>
    </div>
  );
}

function ChalkDust({ className = '' }) {
  // Subtle chalk dust texture using layered radial gradients
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 mix-blend-screen opacity-40 blur-[1px] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120px 60px at 15% 20%, rgba(255,255,255,.18), transparent 60%),\
           radial-gradient(200px 100px at 80% 10%, rgba(255,255,255,.12), transparent 60%),\
           radial-gradient(160px 80px at 60% 70%, rgba(255,255,255,.1), transparent 60%),\
           radial-gradient(240px 120px at 20% 85%, rgba(255,255,255,.08), transparent 60%)',
      }}
    />
  );
}

function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-zinc-900 text-white">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop')",
          filter: 'grayscale(10%) contrast(105%)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_500px_at_20%_-10%,rgba(255,255,255,.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(255,255,255,.08),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      <ChalkDust />

      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="h-8 w-8 rounded bg-white/90 text-zinc-900 grid place-items-center font-black">V</span>
          <span className="text-lg font-black tracking-widest">VAN CLIMB</span>
        </div>
        <div className="hidden gap-6 text-sm font-semibold md:flex">
          <a href="#crowd" className="hover:opacity-80">Crowd</a>
          <a href="#first" className="hover:opacity-80">First-Timers</a>
          <a href="#pricing" className="hover:opacity-80">Pricing</a>
          <a href="#visit" className="hover:opacity-80">Visit</a>
        </div>
      </nav>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-12 md:grid-cols-2 md:pt-10">
        <div>
          <Badge className="mb-4">Top-rope • Lead • Bouldering • Training</Badge>
          <h1 className="text-5xl font-black leading-[1.05] sm:text-6xl">
            Climb bold. Chalk up. Vancouver’s vertical playground.
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            World-class routes, fresh sets weekly, and community at the core. Drop in or start your climbing journey today.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#crowd" onClick={onCTAClick} className="rounded-lg bg-white px-5 py-3 font-extrabold text-zinc-900 shadow hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[0]">
              Check crowd now
            </a>
            <a href="#first" className="rounded-lg border border-white/30 bg-white/5 px-5 py-3 font-extrabold text-white shadow-sm backdrop-blur hover:bg-white/10">
              I’m new to climbing
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-2xl border border-white/20 bg-black/30 p-4 shadow-2xl backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1541397200919-0b05a7f57813?q=80&w=2069&auto=format&fit=crop"
              alt="Climber making a dynamic move on an overhang"
              className="h-72 w-full rounded-xl object-cover object-center shadow-2xl ring-1 ring-white/20"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            <div className="absolute -right-6 -top-6 rotate-2 rounded-xl border border-white/20 bg-black/40 p-3 shadow-xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1517957754645-708b2e2d6bc3?q=80&w=1976&auto=format&fit=crop"
                alt="Bouldering action"
                className="h-28 w-44 rounded-md object-cover ring-1 ring-white/20"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -rotate-2 rounded-xl border border-white/20 bg-black/40 p-3 shadow-xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1540917124281-342587941389?q=80&w=2069&auto=format&fit=crop"
                alt="Lead climbing action"
                className="h-28 w-44 rounded-md object-cover ring-1 ring-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CrowdSection({ crowd }) {
  const status = useMemo(() => {
    if (crowd.percent < 50) return { label: 'Chill', desc: 'Plenty of space on the walls.', color: 'text-emerald-400', dot: 'bg-emerald-400' };
    if (crowd.percent < 80) return { label: 'Lively', desc: 'Good vibes and short waits.', color: 'text-amber-400', dot: 'bg-amber-400' };
    return { label: 'Busy', desc: 'Peak hours. Expect some waits.', color: 'text-rose-500', dot: 'bg-rose-500' };
  }, [crowd.percent]);

  return (
    <section id="crowd" className="relative scroll-mt-24 bg-zinc-950 px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" aria-hidden />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black">Real-time Crowd Meter</h2>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className={`relative inline-flex h-2.5 w-2.5 items-center justify-center rounded-full ${status.dot}`}>
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full opacity-60" style={{ backgroundColor: 'currentColor' }} />
            </span>
            Live
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.5fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className={`text-5xl font-black leading-none ${status.color}`}>{crowd.percent}%</div>
                <div className="mt-1 text-white/70">{crowd.count} of {crowd.capacity} climbers</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-extrabold uppercase tracking-widest ${status.color}`}>{status.label}</div>
                <div className="text-xs text-white/70">{status.desc}</div>
              </div>
            </div>
            <Meter percent={crowd.percent} />
            <div className="mt-3 text-xs text-white/50">Updated {new Date(crowd.updatedAt).toLocaleTimeString()}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur">
            <h3 className="mb-2 text-lg font-extrabold">Peak Times</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Weekdays: 5–8 PM</li>
              <li>Weekends: 11 AM–3 PM</li>
              <li>Best time for bouldering: After 8 PM</li>
              <li>Best time for ropes: 10 AM–4 PM</li>
            </ul>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-white/70">
              Tip: Bring a brush—chalk up and brush holds after your send for that shared send energy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FirstTimers() {
  return (
    <section id="first" className="relative scroll-mt-24 bg-zinc-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-black">First time climbing?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-3 text-2xl font-extrabold">1. Waiver</div>
            <p className="text-white/80">Complete your digital waiver before you arrive. It saves time and gets you on the wall faster.</p>
            <a href="#visit" className="mt-4 inline-block text-sm font-bold text-white/90 underline decoration-dotted underline-offset-4">Fill out waiver</a>
          </div>
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-3 text-2xl font-extrabold">2. Intro Class</div>
            <p className="text-white/80">New to climbing? Our 30-minute bouldering intro covers safety, falling, and gym etiquette. No experience needed.</p>
            <span className="mt-4 inline-block text-sm font-bold text-white/90">Daily at 12 PM, 5 PM, 7 PM</span>
          </div>
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-3 text-2xl font-extrabold">3. Gear</div>
            <p className="text-white/80">We’ve got rentals: shoes, chalk, and harnesses. Wear comfy clothes. Chalk up and you’re set.</p>
            <span className="mt-4 inline-block text-sm font-bold text-white/90">Rental bundle: $10</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-black">Pricing</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-1 text-sm font-bold text-white/70">Drop-In</div>
            <div className="mb-3 text-4xl font-black">$22</div>
            <ul className="mb-6 space-y-2 text-sm text-white/80">
              <li>All-day access</li>
              <li>Includes re-entry</li>
              <li>Gear rental +$10</li>
            </ul>
            <button className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-extrabold hover:bg-white/20">Buy pass</button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>

          <div className="relative rounded-2xl border-2 border-white bg-white/10 p-6 shadow-xl backdrop-blur">
            <div className="mb-1 text-sm font-bold text-white/90">Monthly</div>
            <div className="mb-1 text-4xl font-black">$79</div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-300">Best value</div>
            <ul className="mb-6 space-y-2 text-sm text-white/90">
              <li>Unlimited climbs</li>
              <li>Member nights + discounts</li>
              <li>Freeze anytime</li>
            </ul>
            <button className="w-full rounded-lg bg-white px-4 py-2 font-extrabold text-zinc-900 hover:translate-y-[-1px] hover:shadow-lg">Join now</button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-1 text-sm font-bold text-white/70">10-Visit</div>
            <div className="mb-3 text-4xl font-black">$180</div>
            <ul className="mb-6 space-y-2 text-sm text-white/80">
              <li>Shareable</li>
              <li>Valid 12 months</li>
              <li>Transferable</li>
            </ul>
            <button className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-extrabold hover:bg-white/20">Get pack</button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="relative scroll-mt-24 bg-zinc-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-3xl font-black">Visit Van Climb</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="mb-2 text-lg font-extrabold">Hours</h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>Mon–Fri: 6 AM–11 PM</li>
              <li>Sat–Sun: 8 AM–10 PM</li>
            </ul>
            <h3 className="mb-2 mt-5 text-lg font-extrabold">Location</h3>
            <p className="text-sm text-white/80">123 Chalk Line, Mount Pleasant, Vancouver, BC</p>
            <a
              className="mt-3 inline-block rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20"
              href="https://maps.google.com/?q=Mount+Pleasant+Vancouver"
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1615212049275-7b9a1cad02ee?q=80&w=2069&auto=format&fit=crop"
              alt="Chalky hands clapping before a climb"
              className="h-72 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 rounded bg-black/50 px-3 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
              Community nights every Thursday • New sets weekly
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const crowd = useSimulatedCrowd();

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (window.location.hash) setTimeout(onHash, 50);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white/20 selection:text-white">
      <Hero onCTAClick={(e) => {
        e?.preventDefault?.();
        const el = document.getElementById('crowd');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }} />
      <CrowdSection crowd={crowd} />
      <FirstTimers />
      <Pricing />
      <Visit />

      <footer className="bg-black/60 px-6 py-10 text-white/70">
        <div className="mx-auto max-w-6xl flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="text-sm">© {new Date().getFullYear()} Van Climb, Vancouver BC</div>
          <div className="flex gap-4 text-sm">
            <a className="hover:text-white" href="#pricing">Membership</a>
            <a className="hover:text-white" href="#first">First-Timer Info</a>
            <a className="hover:text-white" href="#visit">Contact</a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 rounded-full border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm font-bold text-white/90">Live crowd: {crowd.percent}%</span>
          </div>
          <a href="#pricing" className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-zinc-900 shadow hover:translate-y-[-1px] hover:shadow-lg">Join now</a>
        </div>
      </div>
    </div>
  );
}
