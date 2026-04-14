'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bike, Zap, Compass, Calendar, Code2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// Hardcoded Data to optimize performance
const adventuresData = [
  {
    "id": 6,
    "title": "Sandakphu Expedition",
    "date": "May 2025",
    "location": "Nepal",
    "aspect": "3/4",
    "desc": "Conquering the grueling, steep roads up to 11,930ft via the Nepal border. This expedition pushed the motorcycle's endurance and rider grit in sub-zero temperatures, proving that the toughest, rockiest terrains yield the most unforgettable motovlogging stories",
    "images": [
      "/assets/photos/sandakphu-2.jpeg",
      "/assets/photos/sandakphu-3.jpeg",
      "/assets/photos/sandakphu-4.jpeg",
      "/assets/photos/sandakphu-1.jpeg",
    ]
  },
    {
    "id": 5,
    "title": "Tilicho Trek",
    "date": "Oct 2025",
    "location": "Nepal",
    "aspect": "3/4",
    "desc": "Transitioning from the saddle to the trail for one of the world's highest altitude treks (4,919m). Exploring the extreme elements of the Himalayas, where meticulous route planning meets raw physical endurance far beyond the reach of standard asphalt.",
    "images": [
      "/assets/photos/tilicho-4.jpeg",
      "/assets/photos/tilicho-1.jpeg",
      "/assets/photos/tilicho-2.jpeg",
      "/assets/photos/tilicho-3.jpeg"
    ]
  },
  {
    "id": 4,
    "title": "Manang Exploration",
    "date": "Oct 2025",
    "location": "Nepal",
    "aspect": "3/4",
    "desc": "Navigating the rugged, rocky tracks of the Annapurna circuit. Manang served as an unforgiving high-altitude proving ground, testing long-range touring equipment and suspension against harsh crosswinds and ancient, unpaved mountain roads.",
    "images": [
      "/assets/photos/manang-4.jpeg",
      "/assets/photos/manang-1.jpeg",
      "/assets/photos/manang-2.jpeg",
      "/assets/photos/manang-3.jpeg",
      "/assets/photos/manang-5.jpeg",
      "/assets/photos/manang-6.jpeg"
    ]
  },
  {
    "id": 3,
    "title": "Purulia Sprints",
    "date": "Aug 2025",
    "location": "Purulia, WB",
    "aspect": "3/4",
    "desc": "Carving through the twisting tarmac and red dirt roads of the Ayodhya Hills. A thrilling low-altitude ride focused on cornering agility, machine health, and maintaining optimal tire grip through West Bengal's winding wilderness.",
    "images": [
      "/assets/photos/purulia-1.jpeg",
      "/assets/photos/purulia-4.jpeg",
      "/assets/photos/purulia-2.jpeg",
      "/assets/photos/purulia-3.jpeg"
    ]
  },
  {
    "id": 2,
    "title": "Darjeeling Ride",
    "date": "May 2024",
    "location": "Darjeeling, WB",
    "aspect": "4/3",
    "desc": "A classic ascent up the tight, winding mountain roads to the Queen of the Hills. This journey tested the bike's cooling efficiency and low-end torque on steep, misty gradients while navigating the slick routes through sprawling tea estates.",
    "images": [
      "/assets/photos/darjeeling-1.jpeg",
      "/assets/photos/darjeeling-2.jpeg",
      "/assets/photos/darjeeling-3.jpeg"
    ]
  },
    {
    "id": 1,
    "title": "Mustang Valley",
    "date": "Oct 2023",
    "location": "Nepal",
    "aspect": "3/4",
    "desc": "An epic endurance ride through the desert-like, wind-swept canyons of the forbidden kingdom. Battling loose gravel, river crossings, and heavy dust to push the absolute limits of adventure motorcycling on some of the most isolated roads.",
    "images": [
      "/assets/photos/mustang-1.jpeg",
      "/assets/photos/mustang-5.jpeg",
      "/assets/photos/mustang-3.jpeg",
      "/assets/photos/mustang-4.jpeg",
      "/assets/photos/mustang-2.jpeg"
    ]
  }
];

const AdventureGallery = ({ item }: { item: typeof adventuresData[0] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 5);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/gallery">
      {/* Smart Navigation Buttons */}
      {showLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-bg-editor/80 border border-border-color flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:border-text-cyan hover:text-text-cyan shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      
      {showRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-bg-editor/80 border border-border-color flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:border-text-cyan hover:text-text-cyan shadow-xl"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Horizontal Image Gallery */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth"
      >
        {item.images.map((img, imgIdx) => (
          <div 
            key={imgIdx} 
            className="relative h-[400px] rounded-xl overflow-hidden border border-border-color group snap-start bg-bg-sidebar/20"
            style={{ 
              aspectRatio: item.aspect || "16/9",
              flexShrink: 0
            }}
          >
            <Image
              src={img}
              alt={`${item.title} - ${imgIdx}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Preserved Scanning Animation */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-text-cyan/30 -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[3000ms] ease-linear pointer-events-none z-20" />
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-editor/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdventuresPage() {
  return (
    <div className="flex flex-col h-full bg-bg-editor animate-fadeUp">
      <div className="px-10 py-12">
        {/* Preserved Header Section */}
        <div className="text-text-green text-[15px] font-mono mb-8">
          {"<!-- adventures.bike — life_beyond_the_keyboard -->"}
        </div>

        <div className="mb-16">
          <h1 className="text-[64px] font-black text-white leading-none font-display tracking-tight flex items-center gap-6">
            <Bike size={56} className="text-text-cyan" />
            Adventures
          </h1>
          <p className="text-text-muted text-[16px] font-mono mt-4 max-w-2xl leading-relaxed italic opacity-80">
            {"> Documenting expeditions, community rides, and competitive milestones. Pushing limits on two wheels and silicon."}
          </p>
        </div>

        {/* New Timeline Layout */}
        <div className="relative border-l border-border-color ml-4 pl-10 space-y-24 py-4">
          {[...adventuresData].sort((a, b) => b.id - a.id).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Dot (Matching Experience page) */}
              <div className="absolute -left-[51px] top-0 w-5 h-5 rounded-full bg-bg-editor border-2 border-text-cyan shadow-[0_0_10px_rgba(0,229,204,0.3)] z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-text-cyan animate-pulse" />
              </div>

              {/* Content Row */}
              <div className="flex flex-col gap-6 max-w-6xl">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-[32px] font-bold text-white font-display leading-tight">{item.title}</h2>
                    <div className="h-[1px] flex-1 bg-border-color/30" />
                  </div>
                  
                  <div className="flex items-center gap-6 text-text-muted font-mono text-[13px] mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-text-orange" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-2 text-text-blue">
                      <MapPin size={14} />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-text-primary text-[16px] font-mono leading-relaxed mb-8 max-w-4xl opacity-90">
                    {item.desc}
                  </p>
                </div>

                <AdventureGallery item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Log */}
      <div className="mt-20 px-10 py-8 border-t border-border-color bg-bg-sidebar/10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3 text-text-muted font-mono text-[12px]">
          <Zap size={14} className="text-text-yellow" />
          <span>established_connection: biker_ganesh.logs</span>
        </div>
        <div className="text-[11px] text-text-muted font-mono uppercase tracking-[0.2em] opacity-40">
          --- End of Log File ---
        </div>
      </div>
    </div>
  );
}
