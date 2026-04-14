'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  ChevronDown, 
  Mic, 
  Send,
  X,
  Plus
} from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PREDEFINED_QA: Record<string, string> = {
  "stack": "Ganesh specializes in Java, Kotlin, React, Next.js, TypeScript, Spring Boot, and Tailwind CSS! He builds everything from EV Management platforms to full-stack Chat Apps.",
  "tech stack": "Ganesh specializes in Java, Kotlin, React, Next.js, TypeScript, Spring Boot, and Tailwind CSS! He builds everything from EV Management platforms to full-stack Chat Apps.",
  "technologies": "Ganesh specializes in Java, Kotlin, React, Next.js, TypeScript, Spring Boot, and Tailwind CSS! He builds everything from EV Management platforms to full-stack Chat Apps.",
  "project": "His latest major project is the EV-Project, a comprehensive EV Charging Management System featuring real-time slot booking and STOMP telemetry using Spring Boot and Jetpack Compose.",
  "projects": "His latest major project is the EV-Project, a comprehensive EV Charging Management System featuring real-time slot booking and STOMP telemetry using Spring Boot and Jetpack Compose.",
  "contact": "You can navigate to the Contact page, or grab his email/LinkedIn! You can also download his resume right from the File menu at the top.",
  "who": "I am the Antigravity IDE Assistant, built specifically to guide you through Ganesh's portfolio. Try asking me about his projects, skills, or experience!",
  "who are you": "I am the Antigravity IDE Assistant, built specifically to guide you through Ganesh's portfolio. Try asking me about his projects, skills, or experience!",
  "hi": "Hello! I am the Antigravity IDE Assistant. Try asking me about Ganesh's projects, skills, or experience!",
  "hello": "Hello! I am the Antigravity IDE Assistant. Try asking me about Ganesh's projects, skills, or experience!"
};

const SUGGESTED_QUESTIONS = [
  "What is your tech stack?",
  "Tell me about your projects",
  "How can I contact you?",
  "Who are you?"
];

const AgentPanel = () => {
  const { agentPanelWidth, setIsAgentPanelOpen } = useActiveFile();
  const [messages, setMessages] = useState<{role: 'user' | 'agent', content: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Define breakpoints for the internal layout
  const isNarrow = agentPanelWidth < 320;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (overrideText?: string) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : inputValue;
    if (!textToSend.trim()) return;

    const userMsg = textToSend.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (typeof overrideText !== 'string') {
      setInputValue('');
    }

    // Process answer
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      let response = "I'm a simple portfolio agent! I can only answer predefined questions about Ganesh's experience, stack, or projects for now.";
      
      for (const [key, value] of Object.entries(PREDEFINED_QA)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }
      
      setMessages(prev => [...prev, { role: 'agent', content: response }]);
    }, 600);
  };

  return (
    <div className="w-full h-full bg-[#181818] border-l border-border-color flex flex-col select-none overflow-hidden">
      {/* Header */}
      <div className="h-[35px] flex items-center justify-between px-4 border-b border-border-color bg-bg-sidebar flex-shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <Users size={14} className="text-muted flex-shrink-0" />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div 
            className="cursor-pointer text-muted hover:text-white transition-colors"
            onClick={() => { setMessages([]); setInputValue(''); }}
            title="New Chat"
          >
            <Plus size={14} />
          </div>
          <div 
            className="cursor-pointer text-muted hover:text-white transition-colors"
            onClick={() => setIsAgentPanelOpen(false)}
            title="Close"
          >
            <X size={14} />
          </div>
        </div>
      </div>

      {/* Main Title Area / Chat Area */}
      {messages.length === 0 ? (
        <div className={cn("px-6 py-10 transition-all flex flex-col gap-6", isNarrow && "px-4 py-6")}>
          <h2 className={cn("text-white font-bold font-display break-words", isNarrow ? "text-[16px]" : "text-[18px]")}>
            Ganesh's Copilot
          </h2>
          <div className="flex flex-col gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <div 
                key={i}
                onClick={() => handleSend(q)}
                className="bg-[#ffffff08] hover:bg-[#ffffff15] text-[#cccccc] text-[12px] px-3 py-2 rounded-md cursor-pointer transition-colors border border-border-color/50 w-max max-w-full"
              >
                {q}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5 text-[13px] font-mono scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex flex-col gap-1.5 max-w-[90%]", msg.role === 'user' ? "self-end items-end" : "self-start items-start")}>
              <div className="text-[10px] text-muted uppercase tracking-wider">{msg.role === 'user' ? 'You' : 'Agent'}</div>
              <div className={cn("px-3 py-2 rounded-lg leading-relaxed select-text", msg.role === 'user' ? "bg-[#04395e] text-white" : "bg-[#252526] text-[#cccccc]")}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Chat Input Area */}
      <div className={cn("flex-shrink-0 flex flex-col px-4 min-w-0 transition-all", messages.length === 0 ? "flex-1 justify-end pb-4" : "pb-4 pt-2")}>
        <div className="bg-[#1e1e1e] border border-border-color rounded-xl flex items-end shadow-lg overflow-hidden group focus-within:border-[#007acc50] transition-colors px-2 py-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-[#cccccc] text-[13px] font-mono leading-relaxed overflow-y-auto resize-none outline-none placeholder:text-muted placeholder:opacity-50 scrollbar-hide select-text px-2 py-1 max-h-[120px]"
            rows={1}
          />
          
          <div 
            onClick={() => handleSend()}
            className={cn(
              "p-2 rounded-lg transition-colors cursor-pointer flex-shrink-0 ml-1 mb-[2px]",
              inputValue.trim().length > 0 ? "bg-[#04395e] text-white hover:bg-[#007acc]" : "bg-[#ffffff10] text-muted hover:bg-[#ffffff20]"
            )}
          >
            <Send size={15} />
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="p-6 text-center mt-auto">
        <p className="text-[10px] text-muted font-mono leading-relaxed opacity-60">
          AI may make mistakes. Double-check all generated code.
        </p>
      </div>
    </div>
  );
};

export default AgentPanel;
