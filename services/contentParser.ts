/**
 * Simple parser for YAML frontmatter in Markdown files.
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
      const value = line.substring(colonIndex + 1).trim();
      
      if (value === '' || value === '[]') {
        data[key] = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value);
        } catch (e) {
          data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      } else {
        data[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  return { data, content: body };
};

/**
 * Fetches content from the local content directory.
 * Improved for GitHub Pages compatibility with subfolders.
 */
export const fetchContent = async (filename: string): Promise<string> => {
  // Determine base path to handle GitHub Pages subfolders automatically
  const getBasePath = () => {
    const fullPath = window.location.pathname;
    // If we are on a project page like /portfolio/, this gets /portfolio/
    const pathParts = fullPath.split('/');
    // Remove the last part if it's index.html or empty
    if (pathParts[pathParts.length - 1].includes('.') || pathParts[pathParts.length - 1] === '') {
        pathParts.pop();
    }
    return pathParts.join('/') || '';
  };

  const basePath = getBasePath();
  // Try two path strategies: absolute-relative and purely relative
  const paths = [
    `${basePath}/content/${filename}`.replace(/\/+/g, '/'),
    `./content/${filename}`
  ];

  for (const path of paths) {
    try {
      console.log(`[ContentParser] Attempting to fetch: ${path}`);
      const response = await fetch(path);
      if (response.ok) {
        const text = await response.text();
        if (text && !text.includes('<!DOCTYPE html>')) { // Ensure we didn't get index.html back (common 404 behavior)
          return text;
        }
      }
    } catch (e) {
      console.warn(`[ContentParser] Failed to fetch from ${path}:`, e);
    }
  }

  throw new Error(`Could not load content for ${filename} from any attempted path.`);
};

/**
 * Parses nested structures like projects and categories manually.
 */
export const parseComplexMarkdown = (content: string, key: string) => {
  if (!content) return { [key]: [], content: '' };
  
  const { data, content: body } = parseMarkdown(content);
  
  if (key === 'projects') {
    const projects: any[] = [];
    const lines = content.split('\n');
    let currentProject: any = null;
    
    lines.forEach(line => {
      const trimLine = line.trim();
      if (trimLine.startsWith('- title:')) {
        if (currentProject) projects.push(currentProject);
        currentProject = { title: trimLine.replace('- title:', '').trim().replace(/^["']|["']$/g, '') };
      } else if (currentProject && trimLine.startsWith('description:')) {
        currentProject.description = trimLine.replace('description:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentProject && trimLine.startsWith('github:')) {
        currentProject.github = trimLine.replace('github:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentProject && trimLine.startsWith('external:')) {
        currentProject.external = trimLine.replace('external:', '').trim().replace(/^["']|["']$/g, '');
      } else if (currentProject && trimLine.startsWith('icon:')) {
        currentProject.icon = trimLine.replace('icon:', '').trim().replace(/^["']|["']$/g, '');
      }
    });
    if (currentProject) projects.push(currentProject);
    return { projects, content: body };
  }

  if (key === 'tech-stack') {
    const categories: any[] = [];
    const lines = content.split('\n');
    let currentCat: any = null;
    
    lines.forEach(line => {
      const trimLine = line.trim();
      if (trimLine.startsWith('- label:')) {
        if (currentCat) categories.push(currentCat);
        currentCat = { label: trimLine.replace('- label:', '').trim().replace(/^["']|["']$/g, ''), items: [] };
      } else if (currentCat && trimLine.startsWith('items:')) {
        const itemsStr = trimLine.replace('items:', '').trim();
        currentCat.items = itemsStr.split(',').map(i => ({ name: i.trim().replace(/^["']|["']$/g, '') }));
      }
    });
    if (currentCat) categories.push(currentCat);
    return { categories };
  }

  if (key === 'certs') {
      const certs: any[] = [];
      const lines = content.split('\n');
      let currentCert: any = null;
      lines.forEach(line => {
          const trimLine = line.trim();
          if (trimLine.startsWith('- title:')) {
              if (currentCert) certs.push(currentCert);
              currentCert = { title: trimLine.replace('- title:', '').trim().replace(/^["']|["']$/g, '') };
          } else if (currentCert && trimLine.startsWith('link:')) {
              currentCert.link = trimLine.replace('link:', '').trim().replace(/^["']|["']$/g, '');
          }
      });
      if (currentCert) certs.push(currentCert);
      return { certs };
  }

  return { data, content: body };
};
