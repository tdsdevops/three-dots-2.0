import React from "react";
import { Helmet } from "react-helmet-async";
import seoData from "../data/seoMetadata.json";

/**
 * Reusable SEO component for injecting dynamic meta tags and structured schema markup.
 * 
 * @param {string} pageKey - Key corresponding to the page in seoMetadata.json (home, about, etc.)
 * @param {string} [customTitle] - Override default title
 * @param {string} [customDescription] - Override default description
 * @param {string} [customKeywords] - Override default keywords
 * @param {string} [customCanonical] - Override default canonical URL
 * @param {string} [customOgImage] - Override default social image
 * @param {string} [schemaType] - Type of schema ('LocalBusiness', 'Article', etc.)
 * @param {object} [blogPost] - Dynamic blog post object for 'Article' schema
 */
export default function SEO({
  pageKey,
  customTitle,
  customDescription,
  customKeywords,
  customCanonical,
  customOgImage,
  schemaType,
  blogPost,
}) {
  // Fall back to home if pageKey is not found
  const meta = seoData[pageKey] || seoData.home;

  const title = customTitle || meta.title;
  const description = customDescription || meta.description;
  const keywords = customKeywords || meta.keywords;
  const canonical = customCanonical || meta.canonical;
  const ogImage = customOgImage || meta.ogImage;
  const ogTitle = customTitle || meta.ogTitle || title;
  const ogDescription = customDescription || meta.ogDescription || description;

  // Base Organization details
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://three-dots.in/#organization",
    "name": "ThreeDots",
    "url": "https://three-dots.in",
    "logo": "https://three-dots.in/threedots.svg",
    "sameAs": [
      "https://github.com/three-dots-devops",
      "https://www.linkedin.com/company/threedots-software"
    ]
  };

  // Base WebSite details
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://three-dots.in/#website",
    "url": "https://three-dots.in",
    "name": "ThreeDots Software",
    "description": "Premium Custom Software and Web Development Agency",
    "publisher": {
      "@id": "https://three-dots.in/#organization"
    }
  };

  // Chennai LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://three-dots.in/#localbusiness",
    "name": "ThreeDots Software Development Company",
    "image": ogImage,
    "url": "https://three-dots.in",
    "telephone": "+919444300000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Chennai Technology Hub, Old Mahabalipuram Rd",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600096",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9716",
      "longitude": "80.2474"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/threedots-software"
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Chennai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Tamil Nadu"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ]
  };

  // Breadcrumb schema
  const getBreadcrumbs = () => {
    const items = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://three-dots.in"
      }
    ];

    if (pageKey === "about") {
      items.push({ "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://three-dots.in/about" });
    } else if (pageKey === "portfolio") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://three-dots.in/portfolio" });
    } else if (pageKey === "contact") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://three-dots.in/contact" });
    } else if (pageKey === "blog") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://three-dots.in/blog" });
    } else if (pageKey === "blogDetails" && blogPost) {
      items.push({ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://three-dots.in/blog" });
      items.push({ "@type": "ListItem", "position": 3, "name": blogPost.title, "item": `https://three-dots.in/blog/${blogPost.id}` });
    } else if (pageKey === "terms") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://three-dots.in/terms" });
    } else if (pageKey === "privacy") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://three-dots.in/privacy" });
    } else if (pageKey === "tools") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://three-dots.in/tools" });
    } else if (pageKey === "qr-generator") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "QR Code Generator", "item": "https://three-dots.in/tools/qr-generator" });
    } else if (pageKey === "invoice-generator") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Invoice Generator", "item": "https://three-dots.in/tools/invoice-generator" });
    } else if (pageKey === "warehouse-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Warehouse Management Software", "item": "https://three-dots.in/services/warehouse-management-software" });
    } else if (pageKey === "franchise-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Franchise Management Software", "item": "https://three-dots.in/services/franchise-management-software" });
    } else if (pageKey === "custom-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Custom Software Development", "item": "https://three-dots.in/services/custom-software-development" });
    } else if (pageKey === "erp-development") {
      items.push({ "@type": "ListItem", "position": 2, "name": "ERP Development", "item": "https://three-dots.in/services/erp-development" });
    } else if (pageKey === "inventory-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Inventory Management Software", "item": "https://three-dots.in/services/inventory-management-software" });
    } else if (pageKey === "gst-invoice-landing") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "GST Invoice Generator", "item": "https://three-dots.in/tools/gst-invoice-generator" });
    } else if (pageKey === "qr-landing") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Free QR Code Generator", "item": "https://three-dots.in/tools/free-qr-code-generator" });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
  };

  // Article (BlogPost) Schema
  const getArticleSchema = () => {
    if (!blogPost) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://three-dots.in/blog/${blogPost.id}`
      },
      "headline": blogPost.title,
      "description": blogPost.excerpt || description,
      "image": blogPost.image || ogImage,
      "datePublished": blogPost.date ? new Date(blogPost.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "ThreeDots Team",
        "url": "https://three-dots.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ThreeDots",
        "logo": {
          "@type": "ImageObject",
          "url": "https://three-dots.in/threedots.svg"
        }
      }
    };
  };

  const getServiceSchema = () => {
    let serviceName = "";
    let serviceDesc = "";
    let appCategory = "";

    if (pageKey === "warehouse-software") {
      serviceName = "Warehouse Management Software (WMS) Development";
      serviceDesc = "Custom cloud-based WMS development including barcode scanning, real-time inventory levels, stock audits, and ERP integrations.";
      appCategory = "BusinessApplication";
    } else if (pageKey === "franchise-software") {
      serviceName = "Franchise Management Software Solutions";
      serviceDesc = "Centralized franchise software covering student dashboards, multi-branch reporting, automatic royalty payments, and invoicing.";
      appCategory = "BusinessApplication";
    } else if (pageKey === "custom-software") {
      serviceName = "Custom Software & Web Application Development";
      serviceDesc = "Tailor-made software solutions, secure client portals, automated business workflows, and full-stack React platforms.";
    } else if (pageKey === "erp-development") {
      serviceName = "Enterprise Resource Planning (ERP) Software Development";
      serviceDesc = "Tailored ERP systems designed to automate operations, manage resources, and streamline reporting for Indian enterprises.";
      appCategory = "BusinessApplication";
    } else if (pageKey === "inventory-software") {
      serviceName = "Inventory Management Software Systems";
      serviceDesc = "Real-time stock tracking, SKU control, HSN lookup, and purchase order automation.";
      appCategory = "BusinessApplication";
    } else {
      return null;
    }

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      "name": serviceName,
      "description": serviceDesc,
      "provider": {
        "@id": "https://three-dots.in/#organization"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" }
      ]
    };

    if (appCategory) {
      const appSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${canonical}#software`,
        "name": serviceName,
        "applicationCategory": appCategory,
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "description": "Contact us for a custom project quote."
        }
      };
      return [serviceSchema, appSchema];
    }

    return [serviceSchema];
  };

  const getFAQSchema = () => {
    let faqs = [];
    if (pageKey === "warehouse-software") {
      faqs = [
        {
          "q": "What is a Warehouse Management System (WMS)?",
          "a": "A WMS is software designed to optimize and manage warehouse operations, tracking inventory from arrival to dispatch."
        },
        {
          "q": "Can custom warehouse software integrate with Tally or Zoho?",
          "a": "Yes, our custom WMS integrates with major accounting and ERP platforms like Tally, Zoho Books, and SAP through secure API protocols."
        }
      ];
    } else if (pageKey === "franchise-software") {
      faqs = [
        {
          "q": "What features are included in franchise management software?",
          "a": "Key features include branch revenue analytics, centralized operations dashboards, student/staff portals, and royalty billing."
        }
      ];
    } else if (pageKey === "erp-development") {
      faqs = [
        {
          "q": "Why choose custom ERP over off-the-shelf software?",
          "a": "Custom ERP matches your exact operational workflows, avoids licensing fees per user, and scales seamlessly as your business grows."
        }
      ];
    } else {
      return null;
    }

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };
  };

  const serviceSchemas = getServiceSchema();
  const faqSchema = getFAQSchema();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={schemaType === "Article" ? "article" : "website"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ThreeDots" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema Markups */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Local Business schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Breadcrumb markup */}
      <script type="application/ld+json">
        {JSON.stringify(getBreadcrumbs())}
      </script>

      {/* Dynamic Article schema */}
      {schemaType === "Article" && blogPost && (
        <script type="application/ld+json">
          {JSON.stringify(getArticleSchema())}
        </script>
      )}

      {/* Dynamic Service/Software schemas */}
      {serviceSchemas && serviceSchemas.map((s, idx) => (
        <script key={`service-schema-${idx}`} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}

      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}
