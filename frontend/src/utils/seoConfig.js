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
    title: "Shopping Cart | Your Orders",
    description: "Review and manage your shopping cart items before checkout.",
    keywords: "shopping cart, checkout, orders",
    ogTitle: "Shopping Cart",
    ogDescription: "Complete your purchase",
    ogType: "website",
    canonical: "/cart",
    robots: "noindex, follow"
  },
  "/checkout": {
    title: "Secure Checkout | Complete Your Order",
    description: "Fast and secure checkout process. Enter your delivery details and complete your order.",
    keywords: "checkout, secure payment, delivery",
    ogTitle: "Checkout",
    ogDescription: "Complete your purchase securely",
    ogType: "website",
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
  }
};

/**
 * Update document meta tags and title for SEO
 * @param {string} path - Current route path
 * @param {object} customMeta - Optional custom metadata to override defaults
 */
export const updatePageSEO = (path, customMeta = {}) => {
  // Find matching SEO config for the path
  const config = seoConfig[path] || seoConfig["/"];
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

  // Update Twitter Card tags
  setMeta("twitter:title", meta.title, "name");
  setMeta("twitter:description", meta.description, "name");
  setMeta("twitter:card", "summary_large_image", "name");
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

  let script = document.querySelector("script[type='application/ld+json']");
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
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
