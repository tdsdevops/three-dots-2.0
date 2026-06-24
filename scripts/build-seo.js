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

// Path mapping to match client-side routes
const pathMap = {
  'home': '',
  'about': '/about',
  'portfolio': '/portfolio',
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
  'qr-landing': '/tools/free-qr-code-generator'
};

// 2. Generate Sitemap
function generateSitemap() {
  const domain = 'https://three-dots.in';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Static pages from pathMap
  Object.keys(pathMap).forEach(key => {
    const p = pathMap[key];
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}${p}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>${p === '' ? '1.0' : p.startsWith('/services') ? '0.9' : '0.8'}</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  // Blog posts
  blogs.forEach(post => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}/blog/${post.id}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.6</priority>\n`;
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

Sitemap: https://three-dots.in/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
  console.log('✓ robots.txt generated successfully in dist/ and public/.');
}

// 4. Pre-render HTML
function preRenderPages() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  const template = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Organization Schema
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

  // WebSite Schema
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

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://three-dots.in/#localbusiness",
    "name": "ThreeDots Software Development Company",
    "image": "https://three-dots.in/threedots-og.png",
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
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": ["https://www.linkedin.com/company/threedots-software"],
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
  }

  function getArticleSchema(blogPost) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://three-dots.in/blog/${blogPost.id}`
      },
      "headline": blogPost.title,
      "description": blogPost.excerpt,
      "image": blogPost.image,
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
  }

  function getServiceSchema(pageKey, meta) {
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
      "@id": `${meta.canonical}#service`,
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
        "@id": `${meta.canonical}#software`,
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
  }

  function getFAQSchema(pageKey) {
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
  <meta property="og:site_name" content="ThreeDots" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonical}" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDescription}" />
  <meta name="twitter:image" content="${ogImage}" />
${schemaTags}
`;

    // Replace the title tag and add other metadata tags
    let result = html;
    if (result.includes('<title>')) {
      result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }
    
    // Inject before </head>
    result = result.replace('</head>', `${metaTags}\n</head>`);
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
    const meta = {
      title: `${post.title} | ThreeDots`,
      description: post.excerpt,
      keywords: `blog, ${post.category.toLowerCase()}, threedots, ${post.title.toLowerCase()}`,
      canonical: `https://three-dots.in/blog/${post.id}`,
      ogImage: post.image,
      ogTitle: `${post.title} | ThreeDots`,
      ogDescription: post.excerpt
    };
    
    const renderedHtml = injectMeta(template, meta, 'blogDetails', post);
    const postDir = path.join(distDir, 'blog', post.id);
    ensureDirExists(postDir);
    fs.writeFileSync(path.join(postDir, 'index.html'), renderedHtml, 'utf8');
    console.log(`✓ Pre-rendered blog post: ${post.id} (blog/${post.id}/index.html)`);
  });
}

// Execute
ensureDirExists(distDir);
generateSitemap();
generateRobots();
preRenderPages();
console.log('★ All SEO assets generated and page pre-rendering complete!');
