/**
 * Simple parser for YAML frontmatter in Markdown files.
 * Corrected to handle nested structures and multiple value types more reliably.
 */
export const parseMarkdown = (content: string) => {
  if (!content) return { data: {}, content: '' };
  
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: content.trim() };
  }

  const yamlStr = match[1];
  const body = match[2].trim();
  const data: any = {};

  yamlStr.split('\n').forEach(line => {
    const trimLine = line.trim();
    if (!trimLine || trimLine.startsWith('#')) return;
    
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
      const value = line.substring(colonIndex + 1).trim();
      
      // Handle empty or array brackets
      if (value === '' || value === '[]') {
        data[key] = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Attempt JSON parse for arrays like ["Dev", "Ops"]
          data[key] = JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
          // Fallback manual split
          data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      } else {
        // Handle basic strings
        data[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  return { data, content: body };
};

/**
 * Fetches content from the local content directory.
 * Simplified for production deployment on custom domains.
 * IMPORTANT: Move your 'content' folder into the 'public' directory.
 */
export const fetchContent = async (filename: string): Promise<string> => {
  // Production files in /public are served from the root path
  const path = `/content/${filename}`;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const text = await response.text();

    // Prevent index.html fallback (common on GitHub Pages 404s)
    if (text.trim().startsWith('<!DOCTYPE html>')) {
      throw new Error(`404: ${filename} not found (received HTML instead)`);
    }

    return text;
  } catch (e) {
    console.error(`[ContentParser] Failed to load ${filename}:`, e);
    throw e;
  }
};

/**
 * Parses nested structures like projects, tech-stack, and certifications.
 */
export const parseComplexMarkdown = (content: string, key: string) => {
  if (!content) return { [key]: [], content: '' };
  
  const { data, content: body } = parseMarkdown(content);
  
  // Custom parsing for Project list
  if (key === 'projects') {
    const projects: any[] = [];
    const lines = content.split('\n');
    let current: any = null;
    
    lines.forEach(line => {
      const t = line.trim();
      if (t.startsWith('- title:')) {
        if (current) projects.push(current);
        current = { title: t.replace('- title:', '').trim().replace(/^["']|["']$/g, '') };
      } else if (current) {
        if (t.startsWith('description:')) current.description = t.replace('description:', '').trim().replace(/^["']|["']$/g, '');
        if (t.startsWith('github:')) current.github = t.replace('github:', '').trim().replace(/^["']|["']$/g, '');
        if (t.startsWith('external:')) current.external = t.replace('external:', '').trim().replace(/^["']|["']$/g, '');
        if (t.startsWith('icon:')) current.icon = t.replace('icon:', '').trim().replace(/^["']|["']$/g, '');
      }
    });
    if (current) projects.push(current);
    return { projects, content: body };
  }

  // Custom parsing for Tech Stack categories
  if (key === 'tech-stack') {
    const categories: any[] = [];
    const lines = content.split('\n');
    let current: any = null;
    
    lines.forEach(line => {
      const t = line.trim();
      if (t.startsWith('- label:')) {
        if (current) categories.push(current);
        current = { label: t.replace('- label:', '').trim().replace(/^["']|["']$/g, ''), items: [] };
      } else if (current && t.startsWith('items:')) {
        const itemsStr = t.replace('items:', '').trim();
        current.items = itemsStr.split(',').map(i => ({ name: i.trim().replace(/^["']|["']$/g, '') }));
      }
    });
    if (current) categories.push(current);
    return { categories };
  }

  // Custom parsing for Certifications
  if (key === 'certs') {
      const certs: any[] = [];
      const lines = content.split('\n');
      let current: any = null;

      lines.forEach(line => {
          const t = line.trim();
          if (t.startsWith('- title:')) {
              if (current) certs.push(current);
              current = { title: t.replace('- title:', '').trim().replace(/^["']|["']$/g, '') };
          } else if (current && t.startsWith('link:')) {
              current.link = t.replace('link:', '').trim().replace(/^["']|["']$/g, '');
          }
      });
      if (current) certs.push(current);
      return { certs };
  }

  return { data, content: body };
};
