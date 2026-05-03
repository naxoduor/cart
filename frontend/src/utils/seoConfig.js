// SEO configuration for routes
export const seoConfig = {
  "/": {
    title: "Shop Online | Quality Products at Best Prices",
    description: "Browse and shop our collection of high-quality products. Fast shipping, secure checkout, and great customer service.",
    keywords: "shop, online store, products, shopping, buy online",
    ogTitle: "Shop Online | Quality Products",
    ogDescription: "Discover quality products at unbeatable prices",
    ogType: "website",
    canonical: "/",
    robots: "index, follow"
  },
  "/cart": {
    title: "Your Cart | Ready for Checkout",
    description: "Review your selected items, compare costs, and proceed to a secure checkout experience.",
    keywords: "shopping cart, checkout, review items, secure shopping",
    ogTitle: "Your Shopping Cart",
    ogDescription: "Review your selected items and prepare for secure checkout.",
    ogType: "website",
    ogImage: "/100watts.jpg",
    twitterImage: "/100watts.jpg",
    canonical: "/cart",
    robots: "noindex, follow"
  },
  "/checkout": {
    title: "Checkout | Secure Payment & Delivery",
    description: "Complete your purchase with secure payment, delivery details, and a fast order confirmation.",
    keywords: "checkout, secure payment, delivery, order confirmation",
    ogTitle: "Secure Checkout",
    ogDescription: "Secure payment and delivery for your order.",
    ogType: "website",
    ogImage: "/100watts.jpg",
    twitterImage: "/100watts.jpg",
    canonical: "/checkout",
    robots: "noindex, follow"
  },
  "/allorders": {
    title: "My Orders | Order History",
    description: "View and track all your past orders and their status.",
    keywords: "orders, order history, tracking",
    ogTitle: "My Orders",
    ogDescription: "Track your orders",
    ogType: "website",
    canonical: "/allorders",
    robots: "noindex, follow"
  },
  "/products": {
    title: "Product Details | Shop Now",
    description: "View detailed product information and add items to your cart.",
    keywords: "product, details, shopping",
    ogTitle: "Product Details",
    ogDescription: "View product information",
    ogType: "product",
    ogImage: "/100watts.jpg",
    twitterImage: "/100watts.jpg",
    canonical: "/products",
    robots: "index, follow"
  },
  "/products/*": {
    title: "Product Details | Shop Now",
    description: "View detailed product information and add items to your cart.",
    keywords: "product, details, shopping",
    ogTitle: "Product Details",
    ogDescription: "View product information",
    ogType: "product",
    ogImage: "/100watts.jpg",
    twitterImage: "/100watts.jpg",
    canonical: "/products",
    robots: "index, follow"
  },
  "/addproduct": {
    title: "Add Product | Manage Catalog",
    description: "Add new products to the catalog.",
    keywords: "add product, manage catalog",
    ogTitle: "Add Product",
    ogDescription: "Manage your product catalog",
    ogType: "website",
    robots: "noindex, nofollow"
  },
  "/updateproduct": {
    title: "Update Product | Manage Catalog",
    description: "Update existing product information.",
    keywords: "update product, manage catalog",
    ogTitle: "Update Product",
    ogDescription: "Manage your product catalog",
    ogType: "website",
    robots: "noindex, nofollow"
  },
  "/404": {
    title: "Page Not Found | Online Shop",
    description: "The page you are looking for can't be found. Return to shopping for quality electrical and solar products.",
    keywords: "404, not found, page missing, online shop",
    ogTitle: "Page Not Found",
    ogDescription: "The page you are looking for can't be found.",
    ogType: "website",
    canonical: "/404",
    robots: "noindex, follow"
  }
};

/**
 * Get SEO configuration for a route path.
 * Supports exact match and prefix-based fallback for dynamic routes.
 * @param {string} path - Current route path
 */
const getSEOConfigForPath = (path) => {
  if (seoConfig[path]) {
    return seoConfig[path];
  }

  const prefixMatch = Object.keys(seoConfig).find((key) => {
    if (key.endsWith("/*")) {
      return path.startsWith(key.replace("/*", ""));
    }
    return key !== "/" && path.startsWith(key);
  });

  return seoConfig[prefixMatch] || seoConfig["/404"] || seoConfig["/"];
};

/**
 * Update document meta tags and title for SEO
 * @param {string} path - Current route path
 * @param {object} customMeta - Optional custom metadata to override defaults
 */
export const updatePageSEO = (path, customMeta = {}) => {
  // Find matching SEO config for the path
  const config = getSEOConfigForPath(path);
  const meta = { ...config, ...customMeta };

  // Update document title
  document.title = meta.title;

  // Helper function to set or update meta tag
  const setMeta = (name, content, type = "name") => {
    let tag = document.querySelector(`meta[${type}="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(type, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  // Update standard meta tags
  setMeta("description", meta.description);
  setMeta("keywords", meta.keywords);
  setMeta("robots", meta.robots);

  // Update canonical tag
  let canonicalTag = document.querySelector("link[rel='canonical']");
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.rel = "canonical";
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.href = `${window.location.origin}${meta.canonical}`;

  // Update Open Graph meta tags
  setMeta("og:title", meta.ogTitle, "property");
  setMeta("og:description", meta.ogDescription, "property");
  setMeta("og:type", meta.ogType, "property");
  setMeta("og:url", window.location.href, "property");
  if (meta.ogImage) {
    setMeta("og:image", `${window.location.origin}${meta.ogImage}`, "property");
  }

  // Update Twitter Card tags
  setMeta("twitter:title", meta.title, "name");
  setMeta("twitter:description", meta.description, "name");
  setMeta("twitter:card", "summary_large_image", "name");
  if (meta.twitterImage) {
    setMeta("twitter:image", `${window.location.origin}${meta.twitterImage}`, "name");
  }
};

/**
 * Create structured data (JSON-LD) for rich snippets
 * @param {string} type - Schema.org type (e.g., "Organization", "WebPage", "Product")
 * @param {object} data - Schema data
 */
export const addStructuredData = (type, data) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  let script = document.querySelector(`script[type='application/ld+json'][data-schema-type='${type}']`);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schemaType = type;
    document.head.appendChild(script);
  }
  script.innerHTML = JSON.stringify(schemaData);
};

/**
 * Add organization schema for homepage
 */
export const addOrganizationSchema = () => {
  addStructuredData("Organization", {
    name: "Online Shop",
    description: "Quality products at best prices",
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@onlineshop.com"
    }
  });
};

/**
 * Add website schema for search engines
 */
export const addWebsiteSchema = () => {
  addStructuredData("WebSite", {
    name: "Online Shop",
    url: window.location.origin,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${window.location.origin}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });
};
