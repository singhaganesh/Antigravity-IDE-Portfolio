'use client';

import React, { useState } from 'react';
import { Send, Terminal, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GmailLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
    <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
    <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
    <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
  </svg>
);

const LinkedInLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
    <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
    <path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
  </svg>
);

const GithubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.521-1.304.959-1.602-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    { 
      icon: GmailLogo, 
      label: "EMAIL", 
      value: "ganeshsingha741@gmail.com", 
      href: "mailto:ganeshsingha741@gmail.com",
      color: "#ea4335"
    },
    { 
      icon: LinkedInLogo, 
      label: "LINKEDIN", 
      value: "ganesh-singha", 
      href: "https://www.linkedin.com/in/ganesh-singha/",
      color: "#0077b5"
    },
    { 
      icon: GithubLogo, 
      label: "GITHUB", 
      value: "singhaganesh", 
      href: "https://github.com/singhaganesh",
      color: "#ffffff"
    },
    { 
      icon: InstagramLogo, 
      label: "INSTAGRAM", 
      value: "biker_ganesh", 
      href: "https://www.instagram.com/biker_ganesh/",
      color: "#e4405f"
    },
    { 
      icon: YoutubeLogo, 
      label: "YOUTUBE", 
      value: "@biker_ganesh", 
      href: "https://www.youtube.com/@biker_ganesh",
      color: "#ff0000"
    }
  ];

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
        {"/* contact.css — open_connection( ) */"}
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
