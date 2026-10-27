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

  // Authentic Organization details
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.three-dots.in/#organization",
    "name": "Three Dots",
    "legalName": "Three Dots Software Development",
    "url": "https://www.three-dots.in",
    "logo": "https://www.three-dots.in/threedots.svg",
    "email": "contactus@three-dots.in",
    "telephone": "+919751813050",
    "sameAs": [
      "https://github.com/three-dots-devops",
      "https://www.linkedin.com/company/threedots-software"
    ]
  };

  // Base WebSite details
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.three-dots.in/#website",
    "url": "https://www.three-dots.in",
    "name": "Three Dots",
    "description": "Custom Software Development, WMS, and ERP Solutions in Chennai, India",
    "publisher": {
      "@id": "https://www.three-dots.in/#organization"
    }
  };

  // LocalBusiness schema with authentic address and contact details
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.three-dots.in/#localbusiness",
    "name": "Three Dots Software Development Company",
    "image": ogImage,
    "url": "https://www.three-dots.in",
    "telephone": "+919751813050",
    "email": "contactus@three-dots.in",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Arampakkam, Padappai",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "601301",
      "addressCountry": "IN"
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
      "https://github.com/three-dots-devops",
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
        "item": "https://www.three-dots.in"
      }
    ];

    if (pageKey === "about") {
      items.push({ "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.three-dots.in/about" });
    } else if (pageKey === "portfolio") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.three-dots.in/portfolio" });
    } else if (pageKey === "tces-case-study") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.three-dots.in/portfolio" });
      items.push({ "@type": "ListItem", "position": 3, "name": "TCES Exports Case Study", "item": "https://www.three-dots.in/portfolio/tces-exports-website-design-development" });
    } else if (pageKey === "ms-industries-ecommerce-website-redesign") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://www.three-dots.in/portfolio" });
      items.push({ "@type": "ListItem", "position": 3, "name": "MS Industries E-commerce Redesign", "item": "https://www.three-dots.in/case-studies/ms-industries-ecommerce-website-redesign" });
    } else if (pageKey === "contact") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://www.three-dots.in/contact" });
    } else if (pageKey === "blog") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.three-dots.in/blog" });
    } else if (pageKey === "blogDetails" && blogPost) {
      items.push({ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.three-dots.in/blog" });
      items.push({ "@type": "ListItem", "position": 3, "name": blogPost.title, "item": `https://www.three-dots.in/blog/${blogPost.id}` });
    } else if (pageKey === "terms") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://www.three-dots.in/terms" });
    } else if (pageKey === "privacy") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.three-dots.in/privacy" });
    } else if (pageKey === "tools") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.three-dots.in/tools" });
    } else if (pageKey === "qr-generator") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "QR Code Generator", "item": "https://www.three-dots.in/tools/qr-generator" });
    } else if (pageKey === "invoice-generator") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Invoice Generator", "item": "https://www.three-dots.in/tools/invoice-generator" });
    } else if (pageKey === "warehouse-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.three-dots.in/" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Warehouse Management Software", "item": "https://www.three-dots.in/services/warehouse-management-software" });
    } else if (pageKey === "franchise-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.three-dots.in/" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Franchise Management Software", "item": "https://www.three-dots.in/services/franchise-management-software" });
    } else if (pageKey === "custom-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.three-dots.in/" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Custom Software Development", "item": "https://www.three-dots.in/services/custom-software-development" });
    } else if (pageKey === "erp-development") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.three-dots.in/" });
      items.push({ "@type": "ListItem", "position": 3, "name": "ERP Development", "item": "https://www.three-dots.in/services/erp-development" });
    } else if (pageKey === "inventory-software") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.three-dots.in/" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Inventory Management Software", "item": "https://www.three-dots.in/services/inventory-management-software" });
    } else if (pageKey === "gst-invoice-landing") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Free GST Invoice Generator", "item": "https://www.three-dots.in/tools/gst-invoice-generator" });
    } else if (pageKey === "qr-landing") {
      items.push({ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.three-dots.in/tools" });
      items.push({ "@type": "ListItem", "position": 3, "name": "Free QR Code Generator", "item": "https://www.three-dots.in/tools/free-qr-code-generator" });
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
        "@id": `https://www.three-dots.in/blog/${blogPost.id}`
      },
      "headline": blogPost.title,
      "description": blogPost.excerpt || description,
      "image": blogPost.image || ogImage,
      "datePublished": blogPost.date ? new Date(blogPost.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      "author": {
        "@type": blogPost.author ? "Person" : "Organization",
        "name": blogPost.author || "Three Dots Team",
        "url": "https://www.three-dots.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Three Dots",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.three-dots.in/threedots.svg"
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
      serviceDesc = "Custom cloud-based WMS development for Indian businesses including receiving, barcode scanning, bin allocation, stock audits, and ERP integrations.";
      appCategory = "BusinessApplication";
    } else if (pageKey === "franchise-software") {
      serviceName = "Franchise Management Software Solutions";
      serviceDesc = "Centralized franchise software covering branch reporting, multi-branch royalty automation, staff coordination, and centralized visibility.";
      appCategory = "BusinessApplication";
    } else if (pageKey === "custom-software") {
      serviceName = "Custom Software & Web Application Development";
      serviceDesc = "Tailor-made software engineering in Chennai: scalable web applications, business portals, process automation, and full-stack solutions.";
    } else if (pageKey === "erp-development") {
      serviceName = "Enterprise Resource Planning (ERP) Software Development";
      serviceDesc = "Tailored ERP systems designed to automate operations, manage resources, and streamline reporting for Indian enterprises.";
      appCategory = "BusinessApplication";
    } else if (pageKey === "inventory-software") {
      serviceName = "Inventory Management Software Systems";
      serviceDesc = "Real-time stock tracking, SKU control, auto-reorder thresholds, HSN lookup, and multi-location inventory synchronization.";
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
        "@id": "https://www.three-dots.in/#organization"
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Chennai" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
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
          "description": "Contact Three Dots for a custom project quote."
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
          "a": "A Warehouse Management System (WMS) is specialized software designed to optimize and manage day-to-day warehouse operations, tracking inventory from receiving and bin allocation to picking, packing, and dispatch."
        },
        {
          "q": "Can custom warehouse software integrate with Tally, Zoho Books, or SAP?",
          "a": "Yes. Our custom WMS solutions integrate seamlessly with accounting and ERP platforms like Tally, Zoho Books, and SAP through secure REST API protocols."
        },
        {
          "q": "Do you support barcode and QR code scanners for warehouse picking?",
          "a": "Yes, our custom WMS supports barcode and QR code generation, thermal label printing, and integration with handheld Android barcode scanners and mobile cameras."
        },
        {
          "q": "Can the WMS manage multiple warehouse locations and 3PL operations?",
          "a": "Yes. We engineer multi-warehouse systems supporting distinct locations, inter-warehouse stock transfers, client-segregated inventory, and role-based permissions."
        }
      ];
    } else if (pageKey === "franchise-software") {
      faqs = [
        {
          "q": "What features are included in custom franchise management software?",
          "a": "Key features include centralized branch monitoring, automated royalty and fee calculation, branch inventory coordination, staff portals, and consolidated financial reporting."
        },
        {
          "q": "Can individual franchise branches be restricted to their own data?",
          "a": "Yes. The platform uses strict Role-Based Access Control (RBAC). Branch managers and franchisees only access their location's data, while brand owners have complete network-wide oversight."
        },
        {
          "q": "Can the software handle student, member, or customer data across branches?",
          "a": "Yes, we build centralized databases that manage student admissions, member subscriptions, batch allocations, or customer records consistently across all franchise outlets."
        }
      ];
    } else if (pageKey === "custom-software") {
      faqs = [
        {
          "q": "How does Three Dots approach custom software development in Chennai?",
          "a": "We follow an agile lifecycle starting with business requirement mapping and interactive Figma wireframes, followed by two-week sprint releases, continuous client testing, automated QA, and cloud deployment."
        },
        {
          "q": "Who owns the source code and IP after the project is completed?",
          "a": "You own 100% of the source code, design assets, and intellectual property upon project handover and final settlement."
        },
        {
          "q": "What tech stacks do you specialize in for custom business software?",
          "a": "We specialize in modern JavaScript/TypeScript ecosystems including React, Node.js, Next.js, PostgreSQL/Supabase, REST/GraphQL APIs, and cloud services (AWS, Render, Cloudflare)."
        }
      ];
    } else if (pageKey === "inventory-software") {
      faqs = [
        {
          "q": "How does the auto-reorder threshold system work?",
          "a": "You can configure minimum safety stock levels for each SKU. When current inventory falls below that threshold, the system flags the product and can automatically generate purchase order drafts."
        },
        {
          "q": "Does your inventory software support GST HSN and SAC codes?",
          "a": "Yes, items are tagged with HSN/SAC codes, tax slabs (5%, 12%, 18%, 28%), and SKU identifiers for straightforward GST compliance and tax filing."
        },
        {
          "q": "What is the difference between Inventory Management Software and WMS?",
          "a": "Inventory software tracks stock quantities, costs, and reorder levels across businesses. A WMS goes deeper inside the physical warehouse, managing bin/rack locations, pick routes, and packing workflows."
        }
      ];
    } else if (pageKey === "gst-invoice-landing") {
      faqs = [
        {
          "q": "Is this GST invoice generator free to use?",
          "a": "Yes, the Three Dots GST Invoice Generator is 100% free with no sign-up required, no watermarks, and no usage limit."
        },
        {
          "q": "How does the tool calculate CGST, SGST, and IGST?",
          "a": "Select the supplier state and recipient state. If both states match (intra-state), CGST and SGST are calculated equally. If states differ (inter-state), IGST is calculated automatically."
        },
        {
          "q": "Is my invoice financial data stored on your servers?",
          "a": "No, invoice generation happens client-side directly in your browser. Your financial figures, customer details, and invoices remain private."
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

  const getCaseStudySchema = () => {
    if (pageKey !== "tces-case-study") return null;
    return {
      "@context": "https://schema.org",
      "@type": ["CreativeWork", "CaseStudy"],
      "@id": "https://www.three-dots.in/portfolio/tces-exports-website-design-development#casestudy",
      "headline": "From Farmers to the World: Building a Digital Presence for TCES Exports",
      "name": "TCES Exports Website Design & Development Case Study",
      "description": "See how Three Dots designed and developed a modern website for TCES Exports, helping present Indian spices, sourcing, quality and export capabilities to global buyers.",
      "url": "https://www.three-dots.in/portfolio/tces-exports-website-design-development",
      "image": "https://www.three-dots.in/tces-exports-desktop-mobile-mockup.jpg",
      "author": {
        "@type": "Organization",
        "name": "Three Dots",
        "url": "https://www.three-dots.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Three Dots",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.three-dots.in/threedots.svg"
        }
      },
      "about": {
        "@type": "Organization",
        "name": "TCES Exports",
        "description": "Indian Spice Exporter connecting carefully sourced spices with buyers across international markets."
      }
    };
  };

  const serviceSchemas = getServiceSchema();
  const faqSchema = getFAQSchema();
  const caseStudySchema = getCaseStudySchema();

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
      <meta property="og:site_name" content="Three Dots" />

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

      {/* CaseStudy Schema */}
      {caseStudySchema && (
        <script type="application/ld+json">
          {JSON.stringify(caseStudySchema)}
        </script>
      )}

      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}
