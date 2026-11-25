import React from 'react';
import { Identity } from '../types';
import Icon from './Icon';

interface ContactProps {
  identity: Identity | null;
}

const Contact: React.FC<ContactProps> = ({ identity }) => {
  if (!identity) return null;

  const socialLinks = [
    { label: 'GitHub', href: identity.socials.github, icon: 'github' },
    { label: 'LinkedIn', href: identity.socials.linkedin, icon: 'linkedin' },
    { label: 'X', href: identity.socials.twitter, icon: 'arrow-up-right' },
  ].filter((link) => link.href);

  return (
    <section className="space-y-8">
      <div className="max-w-xl space-y-3">
        <h2 className="text-xl font-medium tracking-tight text-text-main">Contact</h2>
        <p className="text-base leading-7 text-text-muted">
          Get in touch about a project, an engineering role, or anything else.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <a
            href={`mailto:${identity.email}`}
            className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 transition-colors duration-150 hover:border-text-subtle"
          >
            <Icon name="mail" className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <span className="min-w-0">
              <span className="block text-sm font-medium text-text-main">Email</span>
              <span className="mt-1 block break-all text-sm text-text-muted">{identity.email}</span>
            </span>
          </a>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-main">
              <Icon name="map" className="h-4 w-4 text-accent" />
              {identity.location}
            </div>
            <p className="mt-2 text-sm text-text-muted">{identity.status}</p>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-150 hover:text-accent"
                >
                  <Icon name={link.icon} className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <form action="https://formspree.io/f/xnngkdnw" method="POST" className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm text-text-muted">Your name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full rounded-lg border border-border bg-bg px-3 py-3 text-sm text-text-main placeholder:text-text-subtle focus:border-accent focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm text-text-muted">Your email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-border bg-bg px-3 py-3 text-sm text-text-main placeholder:text-text-subtle focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm text-text-muted">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="How can I help?"
              required
              className="w-full resize-y rounded-lg border border-border bg-bg px-3 py-3 text-sm text-text-main placeholder:text-text-subtle focus:border-accent focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-bg transition-colors duration-150 hover:bg-[#a9c5ff]"
          >
            Send message
            <Icon name="send" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
