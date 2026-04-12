'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Bike, Map, Youtube, Award, Camera, Globe, Compass, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import adventuresData from '@/data/adventures.json';

const iconMap: { [key: string]: any } = {
  expedition: Map,
  achievement: Award,
  youtube: Youtube,
  gear: Camera,
  touring: Compass
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Adventure Preview"
            fill
            className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination Dots for multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-30 flex gap-1.5">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? "bg-[#00e5cc] w-3" : "bg-white/30"}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function AdventuresPage() {
  return (
    <div className="flex flex-col h-full bg-bg-editor animate-fadeUp">
      <div className="px-10 pt-12">
        <div className="text-text-green text-[15px] font-mono mb-8">
          {"<!-- adventures.bike — life_beyond_the_keyboard -->"}
        </div>

        <div className="mb-12">
          <h1 className="text-[64px] font-black text-white leading-none font-display tracking-tight flex items-center gap-6">
            <Bike size={56} className="text-text-cyan" />
            Adventures
          </h1>
          <p className="text-text-muted text-[16px] font-mono mt-4 max-w-2xl leading-relaxed">
            {"> Documenting expeditions, community rides, and competitive milestones. Pushing limits on two wheels and silicon."}
          </p>
        </div>

        {/* Bento Box Grid with 3:4 Aspect Ratio constraint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl pb-20">
          {adventuresData.map((item, index) => {
            const Icon = iconMap[item.type] || Zap;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`relative group overflow-hidden rounded-xl border border-border-color bg-bg-sidebar/40 aspect-[3/4] ${item.span}`}
              >
                <ImageSlider images={item.images} />

                {/* IDE-style overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg-editor via-bg-editor/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className="text-text-cyan" />
                    <span className="text-text-cyan font-mono text-[11px] font-bold uppercase tracking-widest">
                      // {item.category}
                    </span>
                  </div>
                  <h3 className="text-white text-[22px] font-bold font-display leading-tight group-hover:text-[#00e5cc] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-[13px] font-mono mt-3 leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Decorative scanline */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00e5cc]/20 -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[4000ms] ease-linear pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto px-10 py-6 border-t border-border-color bg-bg-sidebar/10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3 text-text-muted font-mono text-[12px]">
          <Zap size={14} className="text-text-yellow" />
          <span>Established connection: biker_ganesh.logs</span>
        </div>
        <div className="text-[11px] text-text-muted font-mono uppercase tracking-[0.2em]">
          End of file
        </div>
      </div>
    </div>
  );
}
