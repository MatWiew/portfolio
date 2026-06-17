"use client";

import { useEffect, useState } from "react";

export function SystemBar() {
  const [time, setTime] = useState<string>("--:--:--");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + " UTC");
      setUptime(Math.floor((Date.now() - start) / 1000));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-2 text-[10px] sm:text-xs tracking-widest border-b border-border-dim bg-bg-void/80 backdrop-blur-sm text-text-dim">
      <div className="flex items-center gap-4">
        <span className="text-text-primary font-bold hidden sm:inline">MWSYS v1.0.0</span>
        <span className="flex items-center gap-1.5">
          <span className="text-accent-green">◆</span>
          <span className="hidden sm:inline">SYSTEM HEALTH:</span> OPTIMAL
        </span>
        <span className="hidden md:inline">UPTIME: {uptime}s</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">PROCESSES: ∞</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
