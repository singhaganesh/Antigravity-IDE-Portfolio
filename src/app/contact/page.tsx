'use client';

import React, { useState } from 'react';
import { Send, Terminal, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getSocialLinks } from '@/components/icons/SocialIcons';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const socialLinks = getSocialLinks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="px-10 py-12 animate-fadeUp max-w-6xl mx-auto">
      <div className="text-text-green text-[15px] font-mono mb-6">
        {"// contact.json — open_connection( )"}
      </div>

      <div className="mb-12">
        <h1 className="text-[64px] font-black text-white leading-none font-display tracking-tight">Contact</h1>
        <p className="text-text-muted text-[14px] font-mono mt-3 max-w-xl leading-relaxed">
          {"// I'm currently open to new opportunities, collaborations, or just talking about tech and biking."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16 items-start">
        <div>
          <h2 className="text-text-cyan text-[13px] font-mono tracking-[0.2em] font-bold mb-8 uppercase flex items-center gap-3">
            <Globe size={16} />
            SOCIAL_CONNECTIVITY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-sidebar/40 border border-border-color rounded-xl p-5 flex items-center justify-between hover:border-[#00e5cc]/30 hover:bg-bg-sidebar/60 transition-all group overflow-hidden relative"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className="p-3 bg-bg-editor rounded-lg border border-border-color group-hover:border-white/10 transition-colors flex items-center justify-center min-w-[48px] min-h-[48px]" style={{ color: link.color }}>
                    <link.icon />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-text-muted text-[10px] font-mono tracking-widest font-bold uppercase opacity-60">{link.label}</span>
                    <span className="text-text-primary text-[15px] font-mono mt-0.5 group-hover:text-white transition-colors">{link.value}</span>
                  </div>
                </div>
                <span className="text-text-muted opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">↗</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" style={{ backgroundColor: link.color }} />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-bg-sidebar border border-border-color rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <h2 className="text-text-cyan text-[13px] font-mono tracking-[0.2em] font-bold mb-8 uppercase flex items-center gap-3">
            <Terminal size={16} />
            TRANSMIT_MESSAGE
          </h2>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="contact-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="space-y-2">
                  <label className="text-text-muted text-[11px] font-mono uppercase tracking-widest opacity-60">{"// name"}</label>
                  <input required type="text" placeholder="string" className="bg-bg-editor border border-border-color rounded-lg w-full px-4 py-3 text-[14px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-20" />
                </div>
                <div className="space-y-2">
                  <label className="text-text-muted text-[11px] font-mono uppercase tracking-widest opacity-60">{"// email"}</label>
                  <input required type="email" placeholder="string" className="bg-bg-editor border border-border-color rounded-lg w-full px-4 py-3 text-[14px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-20" />
                </div>
                <div className="space-y-2">
                  <label className="text-text-muted text-[11px] font-mono uppercase tracking-widest opacity-60">{"// message"}</label>
                  <textarea required rows={4} placeholder="string" className="bg-bg-editor border border-border-color rounded-lg w-full px-4 py-3 text-[14px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-20 resize-none" />
                </div>
                <button disabled={loading} type="submit" className="bg-[#00b8a9] text-[#1e1e1e] font-bold font-mono text-[14px] py-4 rounded-xl hover:bg-[#00e5cc] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,184,169,0.1)] disabled:opacity-50 disabled:cursor-not-allowed group">
                  {loading ? <span className="flex items-center gap-2 animate-pulse">TRANSMITTING...</span> : <>EXECUTE: SEND_MESSAGE() <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                </button>
              </motion.form>
            ) : (
              <motion.div key="success-message" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center py-12">
                <div className="w-20 h-20 bg-[#1e3a1e] rounded-full flex items-center justify-center mb-6 border border-[#4ec9b0]/30 shadow-[0_0_30px_rgba(78,201,176,0.2)]">
                  <ShieldCheck size={40} className="text-text-green" />
                </div>
                <h3 className="text-white font-bold text-[20px] font-mono mb-2">Message Transmitted</h3>
                <p className="text-text-muted text-[13px] font-mono max-w-[250px] leading-relaxed">Your signal has been received. I will respond via encrypted channel soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-text-cyan hover:underline text-[13px] font-mono flex items-center gap-2">{"← run_new_session( )"}</button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00e5cc]/5 blur-[60px] rounded-full -mb-10 -mr-10" />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
