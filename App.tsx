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
      <div className="flex min-h-screen items-center justify-center bg-bg px-6 text-sm text-text-muted">
        Loading portfolio...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main id="home" className="mx-auto flex max-w-[900px] flex-col gap-16 px-4 pb-16 pt-24 sm:px-8 md:gap-24">
        <Header identity={data.identity} roles={data.about?.roles || []} />
        
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

        <footer className="border-t border-border pt-6 text-xs text-text-subtle">
          <p>&copy; {new Date().getFullYear()} {data.identity?.name || 'Saumyadip Jana'}</p>
        </footer>
      </main>
    </>
  );
};

export default App;
