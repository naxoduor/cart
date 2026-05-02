import { useEffect } from "react";
import { updatePageSEO, addStructuredData } from "./seoConfig";

/**
 * Custom hook for managing component-level SEO
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {object} options - Additional SEO options (keywords, ogTitle, ogDescription, ogType, schema)
 */
export const useSEO = (title, description, options = {}) => {
  useEffect(() => {
    const customMeta = {
      title: `${title} | Online Shop`,
      description,
      keywords: options.keywords || "product, shopping",
      ogTitle: options.ogTitle || title,
      ogDescription: options.ogDescription || description,
      ogType: options.ogType || "website",
      ...options
    };

    updatePageSEO(window.location.pathname, customMeta);

    // Add structured data if provided
    if (options.schema) {
      addStructuredData(options.schema.type, options.schema.data);
    }
  }, [title, description, options]);
};
