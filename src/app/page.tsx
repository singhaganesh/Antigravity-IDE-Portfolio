'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Typewriter = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, phrases]);

  return (
    <div className="flex items-center gap-1">
      <span className="text-[15px] font-mono text-text-primary">{displayText}</span>
      <span className="w-2 h-4 bg-[#00e5cc] animate-blink" />
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  const rolePills = [
    { label: 'Full Stack Dev', color: '#4ec9b0' },
    { label: 'React / Next.js', color: '#61dafb' },
    { label: 'Node.js Backend', color: '#68a063' },
    { label: 'Open to Work', color: '#c586c0' },
  ];

  const phrases = [
    "Turning ideas into scalable products.",
    "Building full stack solutions.",
    "Crafting clean, maintainable code.",
    "Available for freelance & full-time.",
  ];

  return (
    <div className="px-10 py-12 relative min-h-full flex flex-col animate-fadeUp overflow-hidden">
      {/* Star Particles */}
      {isClient && particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-8 relative z-10">
        {"// hello world !! Welcome to my portfolio"}
      </div>

      {/* Floating Element (Top Right) */}
      <div className="absolute top-8 right-8 w-20 h-20 bg-bg-sidebar border border-border-color rounded flex items-center justify-center animate-float [animation-direction:reverse] z-10">
        <div className="w-2 h-4 bg-[#00e5cc] animate-blink" />
      </div>

      {/* Name Section */}
      <div className="animate-float relative z-10">
        <h1 className="font-display font-black text-[96px] leading-[0.9] flex flex-col">
          <span className="text-white">Ganesh</span>
          <span className="text-[#00e5cc]">Singha</span>
        </h1>
      </div>

      {/* Role Pills */}
      <div className="mt-8 flex gap-3 flex-wrap relative z-10">
        {rolePills.map((pill) => (
          <div
            key={pill.label}
            className="rounded-full border border-border-color px-4 py-1.5 text-[13px] font-mono flex items-center gap-2 text-text-primary hover:bg-bg-hover hover:border-[#555] transition-colors cursor-default"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pill.color }} />
            {pill.label}
          </div>
        ))}
      </div>

      {/* Typewriter Line */}
      <div className="mt-6 relative z-10">
        <Typewriter phrases={phrases} />
      </div>

      {/* Bio Paragraph */}
      <div className="mt-8 max-w-[640px] text-[15px] font-mono leading-relaxed text-text-primary relative z-10">
        I live at the crossroads of{" "}
        <span className="text-text-cyan font-bold">full stack engineering</span> and{" "}
        <span className="text-text-blue font-bold">clean product thinking</span>. I
        build systems that are genuinely{" "}
        <span className="text-text-orange">scalable</span> and{" "}
        <span className="text-text-yellow">maintainable</span>.
      </div>

      {/* CTA Buttons Row */}
      <div className="mt-10 flex gap-3 relative z-10">
        <button
          onClick={() => router.push('/projects')}
          className="bg-[#00e5cc] text-[#1e1e1e] font-bold px-5 py-2.5 rounded text-[13px] hover:bg-[#00b8a9] transition-colors"
        >
          ⚡ Projects
        </button>
        <button
          onClick={() => router.push('/about')}
          className="bg-transparent border border-text-primary text-text-primary px-5 py-2.5 rounded text-[13px] hover:bg-bg-hover transition-colors"
        >
          ◎ About Me
        </button>
        <button
          onClick={() => router.push('/contact')}
          className="bg-transparent border border-text-primary text-text-primary px-5 py-2.5 rounded text-[13px] hover:bg-bg-hover transition-colors"
        >
          ✉ Contact
        </button>
      </div>
    </div>
  );
}
