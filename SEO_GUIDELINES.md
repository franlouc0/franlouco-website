# SEO Guidelines & Best Practices

This document outlines SEO best practices to maintain when updating the website. Always refer to this guide when making content changes.

## 📋 Table of Contents

1. [Metadata Updates](#metadata-updates)
2. [Structured Data (JSON-LD)](#structured-data-json-ld)
3. [Image Optimization](#image-optimization)
4. [Semantic HTML](#semantic-html)
5. [Content Updates](#content-updates)
6. [Performance](#performance)
7. [Accessibility](#accessibility)
8. [LLM SEO](#llm-seo)

---

## Metadata Updates

### When to Update (`app/layout.tsx`)

**Update metadata when:**
- Job title/role changes
- Company/employer changes
- New skills or expertise areas
- Description changes
- Social media profiles change

**Required fields to update:**
```typescript
export const metadata: Metadata = {
  title: {
    default: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    template: "%s | Francisco Lourenço",
  },
  description: "Update this with current role and key expertise...",
  keywords: [
    // Add new keywords when adding new roles, companies, or skills
  ],
  openGraph: {
    title: "Keep in sync with title.default",
    description: "Keep in sync with description",
    images: [{ url: `${siteUrl}/profile.jpg` }], // Update if profile image changes
  },
  twitter: {
    // Keep in sync with Open Graph
  },
}
```

**⚠️ IMPORTANT:** Always keep `title`, `description`, `openGraph`, and `twitter` fields synchronized.

---

## Structured Data (JSON-LD)

### When to Update (`app/layout.tsx`)

**Update JSON-LD when:**
- Starting a new job/role
- Leaving a company
- Adding new skills to `knowsAbout`
- New social profiles
- Location changes

**Required updates:**
```typescript
const jsonLd = {
  "@type": "Person",
  jobTitle: "Update with current role(s)",
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Role Title",
      occupationLocation: {
        "@type": "Organization",
        name: "Company Name",
      },
    },
    // ADD: New occupations/roles
    // REMOVE: Past roles (move to alumniOf if relevant)
  ],
  alumniOf: [
    // ADD: Past organizations if relevant for SEO
  ],
  knowsAbout: [
    // ADD: New skills, technologies, or expertise areas
  ],
}
```

**⚠️ IMPORTANT:** 
- Use `hasOccupation` (not `worksFor`) to properly represent roles at different organizations
- `jobTitle` should NOT be on Organization objects - use `hasOccupation` with `Occupation` type instead
- Keep `hasOccupation` current (only active roles). Move past roles to `alumniOf` if relevant

---

## Image Optimization

### Alt Text Best Practices

**Always include descriptive alt text for images:**

✅ **Good:**
```typescript
alt={`${company} logo - ${role} at ${company}`}
alt={`${project.title} - ${project.description}`}
```

❌ **Bad:**
```typescript
alt="logo"
alt="image"
alt="project"
```

### Image Requirements

- **Profile images:** Use high-quality images (min 1200x630px for OG images)
- **Company logos:** Use optimized PNG/JPG (24x24px minimum for thumbnails)
- **Project images:** Use descriptive filenames and alt text
- **Always use `loading="lazy"`** for images below the fold
- **Include `sizes` attribute** for responsive images

### When Adding New Images

1. Add to `/public/` directory
2. Use descriptive filenames: `company-name-logo.jpg`
3. Optimize image size (use tools like TinyPNG, ImageOptim)
4. Update alt text in component
5. If it's a profile/OG image, update `metadata.openGraph.images`

---

## Semantic HTML

### HTML Structure

**Use semantic HTML elements:**

✅ **Good:**
```html
<header> <!-- Profile section -->
<section aria-labelledby="about-heading">
<article> <!-- Project cards -->
<nav aria-label="Social links">
<aside aria-label="Profile and experience">
```

❌ **Bad:**
```html
<div> <!-- Use semantic elements instead -->
```

### ARIA Labels

**Always include ARIA labels for:**
- Navigation menus: `aria-label="Navigation name"`
- Sections: `aria-labelledby` or `aria-label`
- Buttons with icons only: `aria-label="Button purpose"`
- Links without clear context: `aria-label="Link destination"`
- Hidden elements: `aria-hidden="true"`

**Example:**
```typescript
<button
  onClick={handleClick}
  aria-label="Open contact form to work together"
>
  <Icon aria-hidden="true" />
  Button Text
</button>
```

---

## Content Updates

### Experience Section (`components/experience-section.tsx`)

**When adding/updating experiences:**

1. ✅ Add to `experiences` array
2. ✅ Set `isActive: true` for current roles
3. ✅ Remove `isActive` (or set `false`) for past roles
4. ✅ Update logo path if available
5. ✅ **IMPORTANT:** Update `jsonLd.worksFor` in `app/layout.tsx` if it's a current role
6. ✅ **IMPORTANT:** Move to `jsonLd.alumniOf` if it's a past role

**Example:**
```typescript
{
  role: "New Role Title",
  company: "Company Name",
  years: "2025 - Present", // or "2025 - 2025" for past
  logo: "/company-logo.jpg", // Add to /public/ directory
  isActive: true, // Only for current roles
}
```

### Featured Work Section (`components/featured-work-section.tsx`)

**When adding articles/works:**

1. ✅ Add descriptive title (SEO-friendly)
2. ✅ Use actual URLs when articles are published
3. ✅ Keep titles under 60 characters for SEO
4. ✅ Consider updating `keywords` in metadata if new topics are added

---

## Performance

### Image Loading

**Always use:**
```typescript
<Image
  src={imageUrl}
  alt="Descriptive alt text"
  loading="lazy" // For images below fold
  sizes="(max-width: 640px) 100vw, 50vw, 33vw" // Responsive sizes
  fill // For container-based sizing
  // OR
  width={24}
  height={24}
/>
```

### Next.js Configuration (`next.config.js`)

**Current optimizations (DO NOT REMOVE):**
- `compress: true` - Enable compression
- `poweredByHeader: false` - Security
- `reactStrictMode: true` - Development checks
- `swcMinify: true` - Fast minification
- Image formats: AVIF and WebP

**⚠️ IMPORTANT:** Keep these optimizations enabled.

---

## Accessibility

### Required for All Updates

1. ✅ **Semantic HTML** - Use appropriate elements
2. ✅ **ARIA labels** - For screen readers
3. ✅ **Alt text** - For all images
4. ✅ **Keyboard navigation** - Test tab navigation
5. ✅ **Color contrast** - Ensure WCAG AA compliance
6. ✅ **Focus indicators** - Visible focus states

### Testing Checklist

Before deploying:
- [ ] Run Lighthouse accessibility audit (target: 90+)
- [ ] Test with keyboard navigation
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Check all images have alt text

---

## LLM SEO

### Optimizing for AI Crawlers (ChatGPT, Perplexity, etc.)

**Best practices:**

1. ✅ **Clear content hierarchy** - Use proper heading tags (h1, h2, h3)
2. ✅ **Plain text content** - Key information should be in visible text, not just tooltips
3. ✅ **Descriptive alt text** - AI crawlers read image alt text
4. ✅ **Structured data** - JSON-LD is crucial for AI understanding
5. ✅ **Keyword-rich descriptions** - Use natural language with relevant keywords
6. ✅ **FAQ schema** - Consider adding if FAQ content exists

**Current implementation:**
- ✅ JSON-LD Person schema
- ✅ JSON-LD ProfessionalService schema
- ✅ Semantic HTML structure
- ✅ Descriptive alt texts

**To improve:**
- Consider adding FAQ schema if FAQ section is added
- Add Article schema for blog posts/articles
- Add BreadcrumbList schema for multi-page navigation

---

## Sitemap & Robots

### Automatic Generation

**Files:**
- `app/sitemap.ts` - Auto-generates `/sitemap.xml`
- `app/robots.ts` - Auto-generates `/robots.txt`

**When adding new pages:**
1. ✅ Update `app/sitemap.ts` with new routes
2. ✅ Ensure proper `priority` and `changeFrequency`
3. ✅ Update `lastModified` dates

**Example:**
```typescript
{
  url: `${baseUrl}/blog/article-slug`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.8,
}
```

---

## Quick Reference Checklist

### When Adding New Content/Page

- [ ] Update metadata in `app/layout.tsx` if relevant
- [ ] Update JSON-LD structured data if role/company changes
- [ ] Add descriptive alt text to all images
- [ ] Use semantic HTML elements
- [ ] Add ARIA labels where needed
- [ ] Update `sitemap.ts` if new page
- [ ] Test accessibility (keyboard nav, screen reader)
- [ ] Test performance (Lighthouse)
- [ ] Verify SEO (Google Rich Results Test)

### When Updating Experience

- [ ] Update experience in `experience-section.tsx`
- [ ] Update `jsonLd.worksFor` or `jsonLd.alumniOf` in `app/layout.tsx`
- [ ] Update logo if changed
- [ ] Set `isActive: true/false` correctly
- [ ] Update keywords in metadata if new domain/skill

### When Adding Images

- [ ] Optimize image size (compress)
- [ ] Use descriptive filename
- [ ] Add descriptive alt text
- [ ] Use `loading="lazy"` if below fold
- [ ] Include `sizes` for responsive images
- [ ] Update OG image in metadata if profile image

---

## Testing Tools

### Before Deployment

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
   - Tests structured data (JSON-LD)

2. **Google Search Console:** https://search.google.com/search-console
   - Monitor search performance
   - Submit sitemap
   - Check indexing status

3. **Lighthouse (Chrome DevTools):**
   - SEO score (target: 90+)
   - Performance score (target: 90+)
   - Accessibility score (target: 90+)

4. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
   - Test Open Graph tags

5. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
   - Test Twitter card tags

---

## Important Notes

### ⚠️ CRITICAL: Keep These Synchronized

1. **Metadata fields:** `title.default`, `description`, `openGraph.*`, `twitter.*`
2. **JSON-LD and actual content:** `worksFor` should match current roles
3. **Profile image:** If changed, update in metadata and JSON-LD
4. **Site URL:** Update `siteUrl` constant if domain changes

### 🔄 Regular Maintenance

- **Monthly:** Review and update experience section
- **Quarterly:** Review keywords and update if needed
- **As needed:** Update structured data when roles change
- **As needed:** Update sitemap when new pages added

---

## Contact

For SEO questions or issues, refer to this document or consult SEO best practices documentation from:
- [Google Search Central](https://developers.google.com/search)
- [Next.js SEO Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)

---

**Last Updated:** January 2025
**Next Review:** February 2025
