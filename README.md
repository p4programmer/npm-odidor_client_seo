# react-client-seo

A lightweight, production-ready client-side SEO renderer for React and Vite applications. No server-side rendering required!

## Features

- ✅ **Lightweight** - No heavy dependencies
- ✅ **Client-side only** - Works with React and Vite apps
- ✅ **TypeScript support** - Full type definitions included
- ✅ **React 17+ & 18+** - Compatible with both versions
- ✅ **Component & Hook APIs** - Use `<Seo />` component or `useSeo()` hook
- ✅ **Auto-updates** - Automatically creates/updates tags, avoids duplicates
- ✅ **Comprehensive** - Supports title, meta tags, Open Graph, Twitter Cards, JSON-LD, and custom meta tags

## Installation

```bash
npm install react-client-seo
```

```bash
yarn add react-client-seo
```

```bash
pnpm add react-client-seo
```

## Peer Dependencies

- `react` >= 17.0.0
- `react-dom` >= 17.0.0

## Usage

### Component API

```tsx
import { Seo } from 'react-client-seo';

function App() {
  return (
    <>
      <Seo
        title="My Page Title"
        description="This is a great page about React SEO"
        keywords={['react', 'seo', 'meta tags']}
        canonical="https://example.com/page"
      />
      <div>Your content here</div>
    </>
  );
}
```

### Hook API

```tsx
import { useSeo } from 'react-client-seo';
import { useEffect } from 'react';

function MyComponent() {
  const { updateSeo } = useSeo();

  useEffect(() => {
    updateSeo({
      title: 'My Page Title',
      description: 'Page description',
      keywords: 'react, seo',
    });
  }, []);

  return <div>Content</div>;
}
```

## Examples

### Basic Usage

```tsx
<Seo
  title="Home Page"
  description="Welcome to our website"
  keywords="home, welcome, website"
/>
```

### Open Graph Tags

```tsx
<Seo
  title="Article Title"
  description="Article description"
  ogImage="https://example.com/image.jpg"
  ogType="article"
  ogUrl="https://example.com/article"
  ogSiteName="My Website"
  ogLocale="en_US"
/>
```

### Twitter Cards

```tsx
<Seo
  title="Article Title"
  description="Article description"
  twitterCard="summary_large_image"
  twitterSite="@username"
  twitterCreator="@author"
  twitterImage="https://example.com/image.jpg"
  twitterImageAlt="Article image"
/>
```

### JSON-LD Structured Data

```tsx
<Seo
  title="Product Page"
  description="Amazing product"
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Amazing Product",
    "description": "This is an amazing product",
    "image": "https://example.com/product.jpg",
    "offers": {
      "@type": "Offer",
      "price": "99.99",
      "priceCurrency": "USD"
    }
  }}
/>
```

### Advanced Open Graph with Custom Properties

```tsx
<Seo
  title="Article"
  openGraph={{
    title: "Custom OG Title",
    description: "Custom OG description",
    type: "article",
    url: "https://example.com/article",
    image: "https://example.com/image.jpg",
    "og:article:author": "John Doe",
    "og:article:published_time": "2024-01-01T00:00:00Z",
  }}
/>
```

### Custom Meta Tags

```tsx
<Seo
  title="Page Title"
  customMeta={[
    { name: "author", content: "John Doe" },
    { name: "robots", content: "index, follow" },
    { property: "custom:property", content: "value" },
    { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
  ]}
/>
```

### Complete Example

```tsx
import { Seo } from 'react-client-seo';

function ProductPage({ product }) {
  return (
    <>
      <Seo
        title={`${product.name} - My Store`}
        description={product.description}
        keywords={product.tags}
        canonical={`https://mystore.com/products/${product.id}`}
        ogImage={product.image}
        ogType="product"
        ogUrl={`https://mystore.com/products/${product.id}`}
        ogSiteName="My Store"
        twitterCard="summary_large_image"
        twitterSite="@mystore"
        twitterImage={product.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": product.image,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }}
        customMeta={[
          { name: "robots", content: "index, follow" },
        ]}
      />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}
```

## API Reference

### `<Seo />` Component Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Page title |
| `description` | `string` | Meta description |
| `keywords` | `string \| string[]` | Meta keywords (comma-separated string or array) |
| `canonical` | `string` | Canonical URL |
| `ogImage` | `string` | Open Graph image URL |
| `ogType` | `string` | Open Graph type (e.g., "article", "website") |
| `ogUrl` | `string` | Open Graph URL |
| `ogTitle` | `string` | Open Graph title (defaults to `title`) |
| `ogDescription` | `string` | Open Graph description (defaults to `description`) |
| `ogSiteName` | `string` | Open Graph site name |
| `ogLocale` | `string` | Open Graph locale |
| `twitterCard` | `'summary' \| 'summary_large_image' \| 'app' \| 'player'` | Twitter Card type |
| `twitterSite` | `string` | Twitter site handle |
| `twitterCreator` | `string` | Twitter creator handle |
| `twitterTitle` | `string` | Twitter title (defaults to `title`) |
| `twitterDescription` | `string` | Twitter description (defaults to `description`) |
| `twitterImage` | `string` | Twitter image URL |
| `twitterImageAlt` | `string` | Twitter image alt text |
| `jsonLd` | `object \| object[]` | JSON-LD structured data |
| `customMeta` | `CustomMeta[]` | Custom meta tags |
| `openGraph` | `OpenGraphMeta` | Additional Open Graph properties |
| `twitter` | `TwitterCardMeta` | Additional Twitter Card properties |

### `useSeo()` Hook

Returns an object with:

- `updateSeo(props: SeoProps)` - Update SEO tags
- `clearSeo()` - Clear managed SEO tags (canonical, JSON-LD)

## TypeScript

Full TypeScript support is included. Import types as needed:

```tsx
import type { SeoProps, OpenGraphMeta, TwitterCardMeta, CustomMeta, JsonLd } from 'react-client-seo';
```

## How It Works

- The component/hook automatically creates meta tags if they don't exist
- Updates existing tags if they're already present
- Avoids duplicate tags
- Cleans up JSON-LD scripts on unmount (component API)
- Works entirely client-side - no SSR required

## Publishing to NPM

1. Update version in `package.json`
2. Build the package:
   ```bash
   npm run build
   ```
3. Publish:
   ```bash
   npm publish
   ```

The `prepare` script automatically runs before publishing, ensuring the package is built.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

