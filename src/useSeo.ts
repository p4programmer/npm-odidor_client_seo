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
      author,
      robots,
      language,
      viewport,
      generator,
      revisitAfter,
      rating,
      distribution,
      copyright,
      themeColor,
      referrer,
      formatDetection,
      mobileWebAppCapable,
      appleMobileWebAppCapable,
      geoRegion,
      geoPlacename,
      geoPosition,
      icbm,
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

    // Set author
    if (author) {
      setMetaTag('author', author);
    }

    // Set robots
    if (robots) {
      setMetaTag('robots', robots);
    }

    // Set language
    if (language) {
      setMetaTag('language', language);
      setMetaTag('content-language', language);
    }

    // Set viewport
    if (viewport) {
      setMetaTag('viewport', viewport);
    }

    // Set generator
    if (generator) {
      setMetaTag('generator', generator);
    }

    // Set revisit-after
    if (revisitAfter) {
      setMetaTag('revisit-after', revisitAfter);
    }

    // Set rating
    if (rating) {
      setMetaTag('rating', rating);
    }

    // Set distribution
    if (distribution) {
      setMetaTag('distribution', distribution);
    }

    // Set copyright
    if (copyright) {
      setMetaTag('copyright', copyright);
    }

    // Set theme-color
    if (themeColor) {
      setMetaTag('theme-color', themeColor);
    }

    // Set referrer
    if (referrer) {
      setMetaTag('referrer', referrer);
    }

    // Set format-detection
    if (formatDetection) {
      setMetaTag('format-detection', formatDetection);
    }

    // Set mobile-web-app-capable
    if (mobileWebAppCapable) {
      setMetaTag('mobile-web-app-capable', mobileWebAppCapable);
    }

    // Set apple-mobile-web-app-capable
    if (appleMobileWebAppCapable) {
      setMetaTag('apple-mobile-web-app-capable', appleMobileWebAppCapable);
    }

    // Set geo tags
    if (geoRegion) {
      setMetaTag('geo.region', geoRegion);
    }
    if (geoPlacename) {
      setMetaTag('geo.placename', geoPlacename);
    }
    if (geoPosition) {
      setMetaTag('geo.position', geoPosition);
    }
    if (icbm) {
      setMetaTag('ICBM', icbm);
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

