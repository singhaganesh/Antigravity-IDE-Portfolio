'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bike, Zap, Compass, Calendar, Code2, MapPin } from 'lucide-react';

// Hardcoded Data to optimize performance
const adventuresData = [
  {
    "id": 1,
    "title": "Sandakphu Expedition",
    "date": "Oct 2025",
    "location": "Indo-Nepal Border",
    "desc": "Reached an altitude of 11,930ft via the challenging terrain of the Nepal border. This expedition was a true test of human endurance and machine performance in sub-zero temperatures and thin air. Documented the entire journey through the lens of a developer exploring nature's complex architecture.",
    "images": [
      "https://images.unsplash.com/photo-1558981403-c5f9199ad25e?q=80&w=1000",
      "https://images.unsplash.com/photo-1558981453-22a9d67df40d?q=80&w=1000",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=1000"
    ]
  },
  {
    "id": 2,
    "title": "Binary Battleground 2K25",
    "date": "Jan 2025",
    "location": "Brainware University",
    "desc": "Secured 1st Place at the annual university coding competition. Solved complex algorithmic problems under tight deadlines, demonstrating deep proficiency in Java and problem-solving logic. This milestone reinforces my commitment to writing performant and elegant 'Antigravity Code'.",
    "images": [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000"
    ]
  },
  {
    "id": 3,
    "title": "Ride To Rock: Gangasagar",
    "date": "Dec 2024",
    "location": "Gangasagar, WB",
    "desc": "Joined the 'Ride To Rock' community journey to the sacred confluence of the Ganges. This community ride focused on the harmony between different riding styles and collective documentation of the local environment. A perfect example of life beyond the keyboard.",
    "images": [
      "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1000",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000"
    ]
  },
  {
    "id": 4,
    "title": "Burdwan to Kolkata Sprints",
    "date": "Ongoing",
    "location": "NH-19 / West Bengal",
    "desc": "Regular highway sprints documenting machine health and fuel efficiency across varying weather conditions. These solo tours serve as my primary method for testing touring gear like the SMK Gullwing helmet and analyzing real-world performance metrics.",
    "images": [
      "https://images.unsplash.com/photo-1471440671318-55fc17642271?q=80&w=1000",
      "https://images.unsplash.com/photo-1511068122820-006ec463c79b?q=80&w=1000"
    ]
  }
];

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
          {adventuresData.map((item, index) => (
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

                {/* Horizontal Image Gallery */}
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth">
                  {item.images.map((img, imgIdx) => (
                    <div 
                      key={imgIdx} 
                      className="relative min-w-[400px] h-[260px] rounded-xl overflow-hidden border border-border-color group snap-start bg-bg-sidebar/20"
                    >
                      <Image
                        src={img}
                        alt={`${item.title} - ${imgIdx}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Preserved Scanning Animation */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-text-cyan/30 -translate-y-full group-hover:translate-y-[260px] transition-transform duration-[3000ms] ease-linear pointer-events-none z-20" />
                      {/* Decorative Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-editor/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
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
