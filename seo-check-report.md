# SEO Check Report

Generated: 2026-04-29

## Summary

- Site: The Blood of Dawnwalker Wiki
- Domain: thebloodofdawnwalker.wiki
- Routed locales: en, ja, de, es
- Result: pass with tracked fixes applied in Part 10

## Code Structure

- `src/app/[locale]/layout.tsx` owns `<html lang={locale}>`, metadata, robots directives, OpenGraph, Twitter Card, manifest, icons, and hreflang alternates.
- `src/app/[locale]/page.tsx` includes WebSite, SearchAction, Organization, and VideoGame JSON-LD for the homepage.
- `src/app/[locale]/[...slug]/page.tsx` generates list/detail metadata with title, description, OpenGraph, Twitter Card, robots, hreflang alternates, and English fallback for missing localized MDX.
- `src/components/content/ArticleStructuredData.tsx` emits Article JSON-LD and BreadcrumbList JSON-LD.
- `src/app/robots.ts` dynamically emits robots rules and sitemap URL from `NEXT_PUBLIC_SITE_URL` with a production fallback.
- `src/app/sitemap.ts` uses `NEXT_PUBLIC_SITE_URL` and current content types: release, platforms, editions, combat, story, world, media.

## H1 And Semantics

- Homepage has one H1 through `HomePageClient`.
- Content list pages have one H1 through `NavigationPage`.
- Detail pages have one H1 through `DetailPage`.
- H1 text and page metadata are centered on release date, platforms, editions, combat, story, world, media, and The Blood of Dawnwalker topic intent.

## Links And Structure

- Header navigation is generated from `NAVIGATION_CONFIG`.
- Legal/static pages are present for about, privacy policy, terms of service, and copyright.
- Breadcrumb UI and BreadcrumbList JSON-LD are present on detail pages.
- Current repository has no MDX article directory after earlier cleanup, so article list pages are intentionally omitted from sitemap until content is regenerated.
- Homepage module heading links are built by `buildModuleLinkMap`; modules without a corresponding article remain unlinked by design.

## Old Brand And Placeholder Audit

- Removed stale old-project compatibility normalization from dynamic page metadata.
- Removed non-routed stale locale files that still contained old-project translations.
- Updated the transpage quick translation helper so protected terms match The Blood of Dawnwalker.
- Removed old-project findings from this report.
- Skeleton placeholders are visual-only UI and no user-facing wait-state copy is emitted by the homepage placeholder.

## Images

- Public hero and favicon assets exist: `public/images/hero.webp`, `public/images/hero.png`, favicon files, Android icons, and Apple touch icon.
- Next.js image usages in content list/detail components include descriptive `alt` text.
- Homepage structured data points to `public/images/hero.webp` and the 512 icon as logo.

## Validation Notes

- Full verification is executed separately in this part: locale JSON validation, local curl checks, typecheck, lint, clean build, push, GitHub Actions watch, and redeploy.
- The legacy `scripts/check-seo.js` is not treated as authoritative because it expects a static `public/robots.txt` and `og-image.jpg`, while this app uses dynamic `app/robots.ts` and `hero.webp`.
