import React, { useEffect } from 'react';

const DEFAULT_TITLE = 'Better Teresa';
const DEFAULT_DESCRIPTION = 'Transparent civic portal for the Municipality of Teresa, Rizal — services, records, tourism, and local government information.';
const DEFAULT_OG_IMAGE = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/1319c9771_ChatGPTImageAug4202610_51_11PM.png';

// Manages document title, meta description, canonical URL, Open Graph tags,
// and JSON-LD structured data for a page. Restores defaults on unmount.
export default function Seo({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd
}) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title || DEFAULT_TITLE;

    const setMeta = (selector, attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute('content');
      el.setAttribute('content', content);
      return prev;
    };

    const prevDesc = setMeta(null, 'name', 'description', description || DEFAULT_DESCRIPTION);
    setMeta(null, 'property', 'og:title', title || DEFAULT_TITLE);
    setMeta(null, 'property', 'og:description', description || DEFAULT_DESCRIPTION);
    setMeta(null, 'property', 'og:type', ogType);
    setMeta(null, 'property', 'og:image', ogImage);

    let linkEl = document.head.querySelector('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonical || window.location.origin);

    let scriptEl = document.getElementById('bt-page-jsonld');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'bt-page-jsonld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      document.title = prevTitle;
      if (prevDesc) setMeta(null, 'name', 'description', prevDesc);
      const jd = document.getElementById('bt-page-jsonld');
      if (jd) jd.remove();
    };
  }, [title, description, canonical, ogImage, ogType, jsonLd]);

  return null;
}