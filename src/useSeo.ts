import { useCallback } from 'react';
import type { SeoProps, UseSeoReturn } from './types';
import {
  setTitle,
  setMetaTag,
  setCanonical,
  setOpenGraphTags,
  setTwitterCardTags,
  setCustomMetaTags,
  injectJsonLd,
  formatKeywords,
  removeCanonical,
  removeJsonLd,
} from './utils';

const JSON_LD_ID = 'react-client-seo-jsonld';

/**
 * useSeo Hook
 * 
 * Hook-based API for managing SEO meta tags.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { updateSeo } = useSeo();
 *   
 *   useEffect(() => {
 *     updateSeo({
 *       title: 'My Page',
 *       description: 'Page description',
 *     });
 *   }, []);
 *   
 *   return <div>Content</div>;
 * }
 * ```
 */
export function useSeo(): UseSeoReturn {
  const updateSeo = useCallback((props: SeoProps) => {
    const {
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
    } = props;

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
    if (jsonLd) {
      injectJsonLd(jsonLd, JSON_LD_ID);
    }
  }, []);

  const clearSeo = useCallback(() => {
    // Note: We don't clear title, description, keywords as they might be set by other means
    // Only clear what we manage
    removeCanonical();
    removeJsonLd(JSON_LD_ID);
  }, []);

  return {
    updateSeo,
    clearSeo,
  };
}

