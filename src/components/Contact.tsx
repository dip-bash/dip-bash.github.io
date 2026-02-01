
import React from 'react';
import { Identity } from '../types';

interface ContactProps {
  identity: Identity | null;
}

const Contact: React.FC<ContactProps> = ({ identity }) => {
  if (!identity) return null;

  return (
    <section id="contact" className="fade-in space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">Let's Collaborate</h2>
        <p className="text-text-muted leading-relaxed font-main">
          Have a project in mind or just want to say hi? Feel free to reach out through any of the platforms below or send a direct message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <a href={`mailto:${identity.email}`} className="flex items-center gap-4 p-6 border border-border rounded-2xl bg-surface hover:border-accent/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <i className="fas fa-envelope text-6xl rotate-12"></i>
              </div>
              <div className="w-12 h-12 flex items-center justify-center border border-border rounded-xl bg-bg text-orange-400 text-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-at"></i>
              </div>
              <div className="relative">
                <h3 className="text-sm font-bold">Email</h3>
                <p className="text-xs text-text-muted mt-1 font-mono">{identity.email}</p>
              </div>
            </a>

            {identity.socials.twitter && (
              <a href={identity.socials.twitter} target="_blank" className="flex items-center gap-4 p-6 border border-border rounded-2xl bg-surface hover:border-[#1DA1F2]/30 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <i className="fab fa-twitter text-6xl -rotate-12"></i>
                </div>
                <div className="w-12 h-12 flex items-center justify-center border border-border rounded-xl bg-bg text-[#1DA1F2] text-xl group-hover:scale-110 transition-transform">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="relative">
                  <h3 className="text-sm font-bold">X (Twitter)</h3>
                  <p className="text-xs text-text-muted mt-1 font-mono">@dip_bash</p>
                </div>
              </a>
            )}

            <div className="p-8 border border-border rounded-2xl bg-gradient-to-br from-accent/5 to-accent-purple/5 border-dashed relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent-purple rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    Current Location
                </h3>
                <p className="text-sm text-text-muted font-mono">{identity.location}</p>
                <p className="text-[10px] text-[#404040] mt-4 uppercase tracking-[0.2em] font-bold">Open for Remote Roles</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border p-8 rounded-3xl relative">
          <form action="https://formspree.io/f/xnngkdnw" method="POST" className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-accent uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="e.g. John Doe" 
                      required 
                      className="w-full bg-bg border border-border text-text-main p-4 rounded-xl font-main text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-[#333]"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-accent uppercase tracking-widest ml-1">Your Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="e.g. john@example.com" 
                      required 
                      className="w-full bg-bg border border-border text-text-main p-4 rounded-xl font-main text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-[#333]"
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-[10px] font-mono text-accent uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  placeholder="Tell me about your project..." 
                  required 
                  className="w-full bg-bg border border-border text-text-main p-4 rounded-xl font-main text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-[#333] resize-none"
                ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full relative group overflow-hidden bg-white text-black py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-white/5 transition-all active:scale-[0.98]"
            >
              <span className="relative z-10">Send Direct Message</span>
              <i className="fas fa-paper-plane text-[10px] relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
