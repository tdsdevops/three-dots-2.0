import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const indexHtmlPath = path.join(distDir, 'index.html');
const seoMetadataPath = path.join(rootDir, 'src', 'data', 'seoMetadata.json');
const blogsPath = path.join(rootDir, 'src', 'data', 'blogs.json');

// Helper to make directory recursive
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Load data
const seoData = JSON.parse(fs.readFileSync(seoMetadataPath, 'utf8'));
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

// Canonical domain: standardize to preferred www domain matching DNS & server 301 redirects
const domain = 'https://www.three-dots.in';

// Path mapping to match client-side routes
const pathMap = {
  'home': '',
  'about': '/about',
  'portfolio': '/portfolio',
  'tces-case-study': '/portfolio/tces-exports-website-design-development',
  'contact': '/contact',
  'blog': '/blog',
  'terms': '/terms',
  'privacy': '/privacy',
  'tools': '/tools',
  'qr-generator': '/tools/qr-generator',
  'invoice-generator': '/tools/invoice-generator',
  'warehouse-software': '/services/warehouse-management-software',
  'franchise-software': '/services/franchise-management-software',
  'custom-software': '/services/custom-software-development',
  'erp-development': '/services/erp-development',
  'inventory-software': '/services/inventory-management-software',
  'gst-invoice-landing': '/tools/gst-invoice-generator',
  'qr-landing': '/tools/free-qr-code-generator',
  'indian-spice-exporter-website': '/blog/indian-spice-exporter-website',
  'ms-industries-ecommerce-website-redesign': '/case-studies/ms-industries-ecommerce-website-redesign'
};

// 2. Generate Sitemap
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Static pages from pathMap
  Object.keys(pathMap).forEach(key => {
    const p = pathMap[key];
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}${p}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${p === '' ? '1.0' : p.startsWith('/services') ? '0.9' : p.startsWith('/tools') ? '0.85' : '0.8'}</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  // Blog posts
  blogs.forEach(post => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}/blog/${post.id}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.7</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  sitemap += `</urlset>\n`;
  
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log('✓ sitemap.xml generated successfully in dist/ and public/.');
}

// 3. Generate Robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.three-dots.in/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
  console.log('✓ robots.txt generated successfully in dist/ and public/.');
}

// 3b. Generate CNAME
function generateCNAME() {
  const cname = 'www.three-dots.in\n';
  fs.writeFileSync(path.join(distDir, 'CNAME'), cname, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'CNAME'), cname, 'utf8');
  console.log('✓ CNAME generated successfully in dist/ and public/.');
}

// 4. Pre-render HTML
function preRenderPages() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  let rawTemplate = fs.readFileSync(indexHtmlPath, 'utf8');
  // Strip previous SEO meta, canonical, title, and schema injections, but PRESERVE viewport, charset, and theme-color!
  const template = rawTemplate
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+(?:name|property|robots)="(?!(?:viewport|charset|theme-color)\b)[^"]*"\s+content="[^"]*"\s*\/?>/gi, '')
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  
  // Organization Schema - Authentic company data matching visible website details
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

  // WebSite Schema
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

  // LocalBusiness Schema - Authentic location details (Padappai, Chennai/Tamil Nadu)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.three-dots.in/#localbusiness",
    "name": "Three Dots Software Development Company",
    "image": "https://www.three-dots.in/threedots-og.png",
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
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://github.com/three-dots-devops",
      "https://www.linkedin.com/company/threedots-software"
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Chennai" },
      { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
      { "@type": "Country", "name": "India" }
    ]
  };

  function getBreadcrumbs(pageKey, blogPost) {
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
  }

  function getArticleSchema(blogPost) {
    const fullImg = blogPost.image.startsWith('http') ? blogPost.image : `https://www.three-dots.in${blogPost.image.startsWith('/') ? '' : '/'}${blogPost.image}`;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.three-dots.in/blog/${blogPost.id}`
      },
      "headline": blogPost.title,
      "description": blogPost.excerpt,
      "image": fullImg,
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
  }

  function getServiceSchema(pageKey, meta) {
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
      "@id": `${meta.canonical}#service`,
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
        "@id": `${meta.canonical}#software`,
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
  }

  function getFAQSchema(pageKey) {
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
  }

  function getCaseStudySchema(pageKey, meta) {
    if (pageKey !== 'tces-case-study') return null;
    return {
      "@context": "https://schema.org",
      "@type": ["CreativeWork", "CaseStudy"],
      "@id": `${meta.canonical}#casestudy`,
      "headline": "From Farmers to the World: Building a Digital Presence for TCES Exports",
      "name": "TCES Exports Website Design & Development Case Study",
      "description": meta.description,
      "url": meta.canonical,
      "image": meta.ogImage,
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
  }

  function injectMeta(html, meta, pageKey, blogPost = null) {
    const title = meta.title;
    const description = meta.description;
    const keywords = meta.keywords;
    const canonical = meta.canonical;
    const ogImage = meta.ogImage;
    const ogTitle = meta.ogTitle || title;
    const ogDescription = meta.ogDescription || description;
    const isArticle = pageKey === 'blogDetails';

    const breadcrumbs = getBreadcrumbs(pageKey, blogPost);
    const schemas = [
      organizationSchema,
      websiteSchema,
      localBusinessSchema,
      breadcrumbs
    ];

    const caseStudySchema = getCaseStudySchema(pageKey, meta);
    if (caseStudySchema) {
      schemas.push(caseStudySchema);
    }

    if (isArticle && blogPost) {
      schemas.push(getArticleSchema(blogPost));
    }

    const serviceSchemas = getServiceSchema(pageKey, meta);
    if (serviceSchemas) {
      serviceSchemas.forEach(s => schemas.push(s));
    }

    const faqSchema = getFAQSchema(pageKey);
    if (faqSchema) {
      schemas.push(faqSchema);
    }

    const schemaTags = schemas.map(s => 
      `  <script type="application/ld+json">${JSON.stringify(s)}</script>`
    ).join('\n');

    const metaTags = `
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="${isArticle ? 'article' : 'website'}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:description" content="${ogDescription}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:site_name" content="Three Dots" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonical}" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDescription}" />
  <meta name="twitter:image" content="${ogImage}" />
${schemaTags}
`;

    // Ensure viewport meta tag is always present in all pre-rendered pages
    let finalMetaTags = metaTags;
    if (!html.includes('name="viewport"')) {
      finalMetaTags = `  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n` + finalMetaTags;
    }

    // Remove any existing <title> from the template so there is exactly one
    let result = html.replace(/<title>.*?<\/title>/gi, '');
    
    // Inject before </head>
    result = result.replace('</head>', `${finalMetaTags}\n</head>`);
    return result;
  }

  // Pre-render static pages
  Object.keys(seoData).forEach(key => {
    const meta = seoData[key];
    const renderedHtml = injectMeta(template, meta, key);
    
    const routePath = pathMap[key];
    if (routePath === undefined) {
      console.warn(`Warning: pathMap for key "${key}" not defined. Skipping static folder creation.`);
      return;
    }

    if (key === 'home') {
      // Overwrite base dist/index.html
      fs.writeFileSync(indexHtmlPath, renderedHtml, 'utf8');
      console.log('✓ Pre-rendered home page (index.html)');
    } else {
      // Remove leading slash and resolve folder directory path
      const relativeFolder = routePath.startsWith('/') ? routePath.slice(1) : routePath;
      const pageDir = path.join(distDir, relativeFolder);
      ensureDirExists(pageDir);
      fs.writeFileSync(path.join(pageDir, 'index.html'), renderedHtml, 'utf8');
      console.log(`✓ Pre-rendered ${key} page (${relativeFolder}/index.html)`);
    }
  });

  // Pre-render dynamic blog posts
  blogs.forEach(post => {
    const fullOgImg = post.image.startsWith('http') ? post.image : `https://www.three-dots.in${post.image.startsWith('/') ? '' : '/'}${post.image}`;
    const meta = {
      title: `${post.title} | Three Dots`,
      description: post.excerpt,
      keywords: `blog, ${post.category.toLowerCase()}, threedots, ${post.title.toLowerCase()}`,
      canonical: `https://www.three-dots.in/blog/${post.id}`,
      ogImage: fullOgImg,
      ogTitle: `${post.title} | Three Dots`,
      ogDescription: post.excerpt
    };
    
    const renderedHtml = injectMeta(template, meta, 'blogDetails', post);
    const postDir = path.join(distDir, 'blog', post.id);
    ensureDirExists(postDir);
    fs.writeFileSync(path.join(postDir, 'index.html'), renderedHtml, 'utf8');
    console.log(`✓ Pre-rendered blog post: ${post.id} (blog/${post.id}/index.html)`);
  });

  // Pre-render 404 error page for static hosting
  const notFoundMeta = {
    title: "Page Not Found (404) | Three Dots",
    description: "The page you are looking for does not exist. Browse custom software development services, WMS, ERP, and free business tools at Three Dots.",
    keywords: "404 not found, threedots",
    canonical: "https://www.three-dots.in/404",
    ogImage: "https://www.three-dots.in/threedots-og.png",
    ogTitle: "Page Not Found | Three Dots",
    ogDescription: "The page you are looking for does not exist. Browse our custom software and tools."
  };
  const rendered404 = injectMeta(template, notFoundMeta, 'home').replace('name="robots" content="index, follow"', 'name="robots" content="noindex, follow"');
  fs.writeFileSync(path.join(distDir, '404.html'), rendered404, 'utf8');
  console.log('✓ Pre-rendered 404 page (404.html)');
}

// Execute
ensureDirExists(distDir);
generateSitemap();
generateRobots();
generateCNAME();
preRenderPages();
console.log('★ All SEO assets generated and page pre-rendering complete!');
