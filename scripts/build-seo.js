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

// 2. Generate Sitemap
function generateSitemap() {
  const domain = 'https://three-dots.in';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Static pages
  const staticPages = ['', '/about', '/portfolio', '/contact', '/blog', '/terms', '/privacy', '/tools', '/tools/qr-generator'];
  staticPages.forEach(p => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}${p}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n`;
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
    
    if (key === 'home') {
      // Overwrite base dist/index.html
      fs.writeFileSync(indexHtmlPath, renderedHtml, 'utf8');
      console.log('✓ Pre-rendered home page (index.html)');
    } else {
      const pageDir = path.join(distDir, key);
      ensureDirExists(pageDir);
      fs.writeFileSync(path.join(pageDir, 'index.html'), renderedHtml, 'utf8');
      console.log(`✓ Pre-rendered ${key} page (${key}/index.html)`);
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
