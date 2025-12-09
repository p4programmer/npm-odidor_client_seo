import { useEffect } from 'react';
import type { SeoProps } from './types';
import {
  setTitle,
  setMetaTag,
  setCanonical,
  setOpenGraphTags,
  setTwitterCardTags,
  setCustomMetaTags,
  injectJsonLd,
  formatKeywords,
} from './utils';

const JSON_LD_ID = 'react-client-seo-jsonld';

/**
 * SEO Component
 * 
 * Renders and updates SEO meta tags in the document head.
 * Returns null (no UI rendering).
 * 
 * @example
 * ```tsx
 * <Seo
 *   title="My Page Title"
 *   description="Page description"
 *   keywords={['react', 'seo']}
 *   canonical="https://example.com/page"
 *   ogImage="https://example.com/image.jpg"
 *   jsonLd={{ "@context": "https://schema.org", "@type": "WebPage" }}
 * />
 * ```
 */
export function Seo({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType,
  ogUrl,
  ogTitle,
  ogDescription,
  ogSiteName,
  ogLocale,
  twitterCard,
  twitterSite,
  twitterCreator,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterImageAlt,
  jsonLd,
  customMeta,
  openGraph,
  twitter,
}: SeoProps) {
  useEffect(() => {
    // Set title
    if (title) {
      setTitle(title);
    }

    // Set description
    if (description) {
      setMetaTag('description', description);
    }

    // Set keywords
    const keywordsStr = formatKeywords(keywords);
    if (keywordsStr) {
      setMetaTag('keywords', keywordsStr);
    }

    // Set canonical URL
    if (canonical) {
      setCanonical(canonical);
    }

    // Build Open Graph object
    const ogData: any = {
      ...openGraph,
    };

    if (ogTitle || title) {
      ogData.title = ogTitle || title;
    }
    if (ogDescription || description) {
      ogData.description = ogDescription || description;
    }
    if (ogType) {
      ogData.type = ogType;
    }
    if (ogUrl || canonical) {
      ogData.url = ogUrl || canonical;
    }
    if (ogImage) {
      ogData.image = ogImage;
    }
    if (ogSiteName) {
      ogData.siteName = ogSiteName;
    }
    if (ogLocale) {
      ogData.locale = ogLocale;
    }

    if (Object.keys(ogData).length > 0) {
      setOpenGraphTags(ogData);
    }

    // Build Twitter Card object
    const twitterData: any = {
      ...twitter,
    };

    if (twitterCard) {
      twitterData.card = twitterCard;
    }
    if (twitterSite) {
      twitterData.site = twitterSite;
    }
    if (twitterCreator) {
      twitterData.creator = twitterCreator;
    }
    if (twitterTitle || title) {
      twitterData.title = twitterTitle || title;
    }
    if (twitterDescription || description) {
      twitterData.description = twitterDescription || description;
    }
    if (twitterImage || ogImage) {
      twitterData.image = twitterImage || ogImage;
    }
    if (twitterImageAlt) {
      twitterData.imageAlt = twitterImageAlt;
    }

    if (Object.keys(twitterData).length > 0) {
      setTwitterCardTags(twitterData);
    }

    // Set custom meta tags
    if (customMeta) {
      setCustomMetaTags(customMeta);
    }

    // Inject JSON-LD
    let cleanupJsonLd: (() => void) | null = null;
    if (jsonLd) {
      cleanupJsonLd = injectJsonLd(jsonLd, JSON_LD_ID);
    }

    // Cleanup function
    return () => {
      if (cleanupJsonLd) {
        cleanupJsonLd();
      }
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    ogUrl,
    ogTitle,
    ogDescription,
    ogSiteName,
    ogLocale,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterImageAlt,
    jsonLd,
    customMeta,
    openGraph,
    twitter,
  ]);

  return null;
}

