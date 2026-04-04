'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, FileText, Send } from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const socialLinks = [
    { icon: Mail, label: "EMAIL", value: "ganesh@example.com", href: "mailto:ganesh@example.com" },
    { icon: Linkedin, label: "LINKEDIN", value: "linkedin.com/in/ganeshsingha", href: "https://linkedin.com/in/ganeshsingha" },
    { icon: Github, label: "GITHUB", value: "github.com/ganeshsingha", href: "https://github.com/ganeshsingha" },
    { icon: FileText, label: "MEDIUM", value: "medium.com/@ganeshsingha", href: "https://medium.com/@ganeshsingha" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
  };

  return (
    <div className="px-10 py-12 animate-fadeUp">
      {/* Code comment label */}
      <div className="text-text-green text-[15px] font-mono mb-6">
        {"/* contact.css — let's build something */"}
      </div>

      {/* Section heading */}
      <div className="mb-10">
        <h1 className="text-[64px] font-black text-white leading-none font-display">Contact</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// open to work, collabs & good conversations"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — FIND ME ON */}
        <div>
          <h2 className="text-[#4ec9b0] text-[13px] font-mono tracking-widest font-bold mb-6 uppercase">
            FIND ME ON
          </h2>
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-sidebar border border-border-color rounded p-4 flex items-center justify-between hover:border-[#4ec9b0] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <link.icon className="text-[#4ec9b0] w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="text-[#4ec9b0] text-[11px] font-mono tracking-wider font-bold">{link.label}</span>
                    <span className="text-text-primary text-[13px] font-mono mt-0.5">{link.value}</span>
                  </div>
                </div>
                <span className="text-text-muted text-[14px] group-hover:text-[#4ec9b0] group-hover:translate-x-1 transition-all">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — SEND A MESSAGE */}
        <div>
          <h2 className="text-[#4ec9b0] text-[13px] font-mono tracking-widest font-bold mb-6 uppercase">
            SEND A MESSAGE
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-text-muted text-[12px] font-mono mb-1.5 block">{"// YOUR_NAME *"}</label>
                <input 
                  required
                  type="text"
                  placeholder="string"
                  className="bg-bg-editor border border-border-color rounded w-full px-4 py-2.5 text-[13px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-30"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-text-muted text-[12px] font-mono mb-1.5 block">{"// YOUR_EMAIL *"}</label>
                <input 
                  required
                  type="email"
                  placeholder="string"
                  className="bg-bg-editor border border-border-color rounded w-full px-4 py-2.5 text-[13px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-30"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="text-text-muted text-[12px] font-mono mb-1.5 block">{"// SUBJECT"}</label>
                <input 
                  type="text"
                  placeholder="string"
                  className="bg-bg-editor border border-border-color rounded w-full px-4 py-2.5 text-[13px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-30"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div>
                <label className="text-text-muted text-[12px] font-mono mb-1.5 block">{"// MESSAGE *"}</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="string"
                  className="bg-bg-editor border border-border-color rounded w-full px-4 py-2.5 text-[13px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-30 resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="bg-[#00e5cc] text-[#1e1e1e] font-bold font-mono text-[14px] py-3 rounded hover:bg-[#00b8a9] transition-all flex items-center justify-center gap-2"
              >
                transmit_message( ) <Send size={14} />
              </button>
            </form>
          ) : (
            <div className="bg-bg-sidebar border border-border-color rounded p-8 flex flex-col items-center text-center animate-fadeUp">
              <div className="text-[#4ec9b0] font-mono text-[16px] mb-2 font-bold">
                {"// message_transmitted: true ✓"}
              </div>
              <div className="text-text-muted text-[13px] font-mono max-w-xs">
                Signal received. Response within 24 hours.
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-text-cyan hover:underline text-[13px] font-mono"
              >
                {"← send_another( )"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
