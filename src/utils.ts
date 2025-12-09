import type { CustomMeta, JsonLd, OpenGraphMeta, TwitterCardMeta } from './types';

/**
 * Get or create a meta tag element
 */
function getOrCreateMetaTag(attribute: 'name' | 'property', value: string): HTMLMetaElement {
  const selector = `meta[${attribute}="${value}"]`;
  let element = document.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  return element;
}

/**
 * Set a meta tag by name
 */
export function setMetaTag(name: string, content: string): void {
  if (!content) return;

  const element = getOrCreateMetaTag('name', name);
  element.setAttribute('content', content);
}

/**
 * Set a meta tag by property (for Open Graph)
 */
export function setMetaProperty(property: string, content: string | number): void {
  if (content === undefined || content === null || content === '') return;

  const element = getOrCreateMetaTag('property', property);
  element.setAttribute('content', String(content));
}

/**
 * Set the page title
 */
export function setTitle(title: string): void {
  if (!title) return;
  document.title = title;
}

/**
 * Set canonical URL
 */
export function setCanonical(url: string): void {
  if (!url) return;

  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Remove canonical URL
 */
export function removeCanonical(): void {
  const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (link) {
    link.remove();
  }
}

/**
 * Set Open Graph meta tags
 */
export function setOpenGraphTags(og: OpenGraphMeta): void {
  if (!og) return;

  // Standard Open Graph properties
  if (og.title) setMetaProperty('og:title', og.title);
  if (og.description) setMetaProperty('og:description', og.description);
  if (og.type) setMetaProperty('og:type', og.type);
  if (og.url) setMetaProperty('og:url', og.url);
  if (og.image) setMetaProperty('og:image', og.image);
  if (og.imageWidth) setMetaProperty('og:image:width', og.imageWidth);
  if (og.imageHeight) setMetaProperty('og:image:height', og.imageHeight);
  if (og.imageAlt) setMetaProperty('og:image:alt', og.imageAlt);
  if (og.siteName) setMetaProperty('og:site_name', og.siteName);
  if (og.locale) setMetaProperty('og:locale', og.locale);

  // Handle additional custom og:* properties
  Object.keys(og).forEach((key) => {
    if (key.startsWith('og:') && key !== 'og:title' && key !== 'og:description' && 
        key !== 'og:type' && key !== 'og:url' && key !== 'og:image' && 
        key !== 'og:imageWidth' && key !== 'og:imageHeight' && 
        key !== 'og:imageAlt' && key !== 'og:siteName' && key !== 'og:locale') {
      const value = og[key as keyof OpenGraphMeta];
      if (value !== undefined && value !== null && value !== '') {
        setMetaProperty(key, value as string | number);
      }
    }
  });
}

/**
 * Set Twitter Card meta tags
 */
export function setTwitterCardTags(twitter: TwitterCardMeta): void {
  if (!twitter) return;

  if (twitter.card) setMetaTag('twitter:card', twitter.card);
  if (twitter.site) setMetaTag('twitter:site', twitter.site);
  if (twitter.creator) setMetaTag('twitter:creator', twitter.creator);
  if (twitter.title) setMetaTag('twitter:title', twitter.title);
  if (twitter.description) setMetaTag('twitter:description', twitter.description);
  if (twitter.image) setMetaTag('twitter:image', twitter.image);
  if (twitter.imageAlt) setMetaTag('twitter:image:alt', twitter.imageAlt);

  // Handle additional custom twitter:* properties
  Object.keys(twitter).forEach((key) => {
    if (key.startsWith('twitter:') && key !== 'twitter:card' && key !== 'twitter:site' && 
        key !== 'twitter:creator' && key !== 'twitter:title' && 
        key !== 'twitter:description' && key !== 'twitter:image' && 
        key !== 'twitter:imageAlt') {
      const value = twitter[key as keyof TwitterCardMeta];
      if (value !== undefined && value !== null && value !== '') {
        setMetaTag(key, String(value));
      }
    }
  });
}

/**
 * Set custom meta tags
 */
export function setCustomMetaTags(customMeta: CustomMeta[]): void {
  if (!customMeta || !Array.isArray(customMeta)) return;

  customMeta.forEach((meta) => {
    if (!meta.content) return;

    let element: HTMLMetaElement | null = null;

    if (meta.name) {
      element = getOrCreateMetaTag('name', meta.name);
    } else if (meta.property) {
      element = getOrCreateMetaTag('property', meta.property);
    } else if (meta.httpEquiv) {
      const selector = `meta[http-equiv="${meta.httpEquiv}"]`;
      element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('http-equiv', meta.httpEquiv);
        document.head.appendChild(element);
      }
    } else if (meta.charset) {
      let charsetElement = document.querySelector<HTMLMetaElement>('meta[charset]');
      if (!charsetElement) {
        charsetElement = document.createElement('meta');
        charsetElement.setAttribute('charset', meta.charset);
        document.head.insertBefore(charsetElement, document.head.firstChild);
      }
      return;
    }

    if (element) {
      element.setAttribute('content', meta.content);
    }
  });
}

/**
 * Inject JSON-LD structured data
 */
export function injectJsonLd(data: JsonLd, id?: string): () => void {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) {
    script.id = id;
    // Remove existing script with same id
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);

  // Return cleanup function
  return () => {
    script.remove();
  };
}

/**
 * Remove JSON-LD script by id
 */
export function removeJsonLd(id: string): void {
  const script = document.getElementById(id);
  if (script && script.getAttribute('type') === 'application/ld+json') {
    script.remove();
  }
}

/**
 * Format keywords as string
 */
export function formatKeywords(keywords: string | string[] | undefined): string {
  if (!keywords) return '';
  if (Array.isArray(keywords)) {
    return keywords.join(', ');
  }
  return keywords;
}

