/**
 * Open Graph metadata
 */
export interface OpenGraphMeta {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  imageAlt?: string;
  siteName?: string;
  locale?: string;
  [key: `og:${string}`]: string | number | undefined;
}

/**
 * Twitter Card metadata
 */
export interface TwitterCardMeta {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  [key: `twitter:${string}`]: string | number | undefined;
}

/**
 * Custom meta tag
 */
export interface CustomMeta {
  name?: string;
  property?: string;
  content: string;
  httpEquiv?: string;
  charset?: string;
}

/**
 * JSON-LD structured data
 */
export type JsonLd = Record<string, any> | Array<Record<string, any>>;

/**
 * SEO component props
 */
export interface SeoProps {
  /** Page title */
  title?: string;
  /** Meta description */
  description?: string;
  /** Meta keywords (comma-separated string or array) */
  keywords?: string | string[];
  /** Canonical URL */
  canonical?: string;
  /** Open Graph metadata */
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
  ogLocale?: string;
  /** Twitter Card metadata */
  twitterCard?: TwitterCardMeta['card'];
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  /** JSON-LD structured data */
  jsonLd?: JsonLd;
  /** Custom meta tags */
  customMeta?: CustomMeta[];
  /** Additional Open Graph properties */
  openGraph?: OpenGraphMeta;
  /** Additional Twitter Card properties */
  twitter?: TwitterCardMeta;
}

/**
 * Hook return type
 */
export interface UseSeoReturn {
  updateSeo: (props: SeoProps) => void;
  clearSeo: () => void;
}

