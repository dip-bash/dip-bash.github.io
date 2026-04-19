import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Bio from './components/Bio';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certifications from './components/Certifications';
import { fetchContent, parseMarkdown, parseComplexMarkdown } from './services/contentParser';
import { PortfolioData, Identity } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>({
    identity: null,
    about: null,
    projects: [],
    techStack: [],
    certifications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Use separate try-catches to allow partial failure
        const safeFetch = async (file: string) => {
          try {
            return await fetchContent(file);
          } catch (e) {
            console.error(`Error loading ${file}:`, e);
            return '';
          }
        };

        const [idMd, aboutMd, projectsMd, techMd, certsMd] = await Promise.all([
          safeFetch('identity.md'),
          safeFetch('about.md'),
          safeFetch('projects.md'),
          safeFetch('tech-stack.md'),
          safeFetch('certifications.md')
        ]);

        const idParsed = parseMarkdown(idMd);
        const aboutParsed = parseMarkdown(aboutMd);
        const projectsParsed = parseComplexMarkdown(projectsMd, 'projects');
        const techParsed = parseComplexMarkdown(techMd, 'tech-stack');
        const certsParsed = parseComplexMarkdown(certsMd, 'certs');

        const rawId = idParsed.data;
        const identity: Identity = {
          name: rawId.name || 'Saumyadip Jana',
          status: rawId.status || 'Developer',
          location: rawId.location || 'India',
          email: rawId.email || '',
          pronouns: rawId.pronouns || 'he/him',
          socials: {
            twitter: rawId.twitter || '',
            github: rawId.github || '',
            linkedin: rawId.linkedin || '',
          }
        };

        setData({
          identity,
          about: { 
            roles: Array.isArray(aboutParsed.data.roles) ? aboutParsed.data.roles : ["Developer"], 
            bio: aboutParsed.content || "Welcome to my portfolio."
          },
          projects: projectsParsed.projects || [],
          techStack: techParsed.categories || [],
          certifications: certsParsed.certs || []
        });
      } catch (error) {
        console.error("Critical error loading portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg text-text-muted font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest animate-pulse">Initializing Environment...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main id="home" className="max-w-[850px] mx-auto px-6 py-16 md:py-24 flex flex-col gap-20 md:gap-24 relative z-10">
        <div className="pt-8 md:pt-12">
          <Header identity={data.identity} roles={data.about?.roles || []} />
        </div>
        
        <section id="about" className="scroll-mt-24">
          <Bio bio={data.about?.bio || ''} />
        </section>

        {data.projects.length > 0 && (
          <section id="projects" className="scroll-mt-24">
            <Projects projects={data.projects} />
          </section>
        )}

        {data.techStack.length > 0 && (
          <section id="tech" className="scroll-mt-24">
            <TechStack stack={data.techStack} />
          </section>
        )}

        {data.certifications.length > 0 && (
          <section id="certs" className="scroll-mt-24">
            <Certifications certifications={data.certifications} />
          </section>
        )}

        <section id="contact" className="scroll-mt-24">
          <Contact identity={data.identity} />
        </section>

        <footer className="text-center text-xs text-text-muted mt-8 font-mono pb-12 opacity-50">
          <p>&copy; {new Date().getFullYear()} {data.identity?.name || 'Saumyadip Jana'}</p>
        </footer>
      </main>
    </>
  );
};

export default App;
