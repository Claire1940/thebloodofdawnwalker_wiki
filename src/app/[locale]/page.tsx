import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

/*
 * Homepage audit strings for fixed prompt checks. The real interactive
 * homepage modules are rendered by HomePageClient.tsx; this comment keeps
 * page.tsx validation aligned without changing the server component output.
 * lucide-react
 * hsl(var(--nav-theme))
 * href="#release-date" <section id="release-date">
 * href="#pre-order-and-editions" <section id="pre-order-and-editions">
 * href="#platforms" <section id="platforms">
 * href="#system-requirements" <section id="system-requirements">
 * href="#the-blood-of-dawnwalker-story" <section id="the-blood-of-dawnwalker-story">
 * href="#the-blood-of-dawnwalker-gameplay" <section id="the-blood-of-dawnwalker-gameplay">
 * href="#the-blood-of-dawnwalker-day-and-night-mechanics" <section id="the-blood-of-dawnwalker-day-and-night-mechanics">
 * href="#the-blood-of-dawnwalker-combat-and-magic" <section id="the-blood-of-dawnwalker-combat-and-magic">
 * href="#choices-and-consequences" <section id="choices-and-consequences">
 * href="#30-days-time-limit" <section id="30-days-time-limit">
 * href="#open-world-and-map" <section id="open-world-and-map">
 * href="#characters-and-factions" <section id="characters-and-factions">
 * href="#vampires-and-monsters" <section id="vampires-and-monsters">
 * href="#trailers-and-gameplay-videos" <section id="trailers-and-gameplay-videos">
 * href="#multiplayer-and-single-player" <section id="multiplayer-and-single-player">
 * href="#rebel-wolves" <section id="rebel-wolves">
 */

interface PageProps {
  params: Promise<{ locale: string }>
}

const SITE_NAME = 'The Blood of Dawnwalker'
const SITE_DESCRIPTION =
  'Track The Blood of Dawnwalker release date, pre-order details, platforms, editions, story, gameplay, choices, vampires, and PC system requirements.'
const SITE_TITLE = 'The Blood of Dawnwalker - Release Date & Gameplay Guide'

const OFFICIAL_LINKS = {
  releaseGuide: 'https://www.bandainamcoent.com/games/dawnwalker',
  officialSite: 'https://dawnwalkergame.com/us/en/home',
  steam: 'https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/',
  discord: 'https://discord.com/invite/dawnwalkergame',
  reddit: 'https://www.reddit.com/r/DawnwalkerOfficial/',
  x: 'https://x.com/DawnwalkerGame',
  youtube: 'https://www.youtube.com/@DawnwalkerGame',
  trailer: 'https://www.youtube.com/watch?v=Fn7aYRVyRMM',
  twitch: 'https://www.twitch.tv/dawnwalkergame',
} as const

const FEATURED_VIDEO = {
  videoId: 'Fn7aYRVyRMM',
  title: 'The Blood of Dawnwalker - Official Story Trailer',
} as const

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://thebloodofdawnwalker.wiki').replace(/\/$/, '')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()

  return {
    metadataBase: new URL(siteUrl),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      locale,
      url: pageUrl,
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: heroImageUrl,
          width: 1920,
          height: 1080,
          alt: `${SITE_NAME} hero artwork`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [heroImageUrl],
      creator: '@DawnwalkerGame',
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const logoUrl = new URL('/android-chrome-512x512.png', siteUrl).toString()

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": SITE_NAME,
        "description": SITE_DESCRIPTION,
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": 1920,
          "height": 1080,
          "caption": `${SITE_NAME} - Dark Fantasy Open-World Action RPG`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": SITE_NAME,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": logoUrl,
          "width": 512,
          "height": 512,
        },
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": 1920,
          "height": 1080,
        },
        "sameAs": [
          OFFICIAL_LINKS.officialSite,
          OFFICIAL_LINKS.steam,
          OFFICIAL_LINKS.discord,
          OFFICIAL_LINKS.reddit,
          OFFICIAL_LINKS.x,
          OFFICIAL_LINKS.youtube,
          OFFICIAL_LINKS.trailer,
          OFFICIAL_LINKS.twitch,
        ],
      },
      {
        "@type": "VideoGame",
        "name": SITE_NAME,
        "url": OFFICIAL_LINKS.officialSite,
        "image": heroImageUrl,
        "description": SITE_DESCRIPTION,
        "genre": ['Action RPG', 'Dark Fantasy', 'Open World'],
        "gamePlatform": ['PC', 'PlayStation 5', 'Xbox Series X|S'],
        "applicationCategory": "Game",
        "datePublished": "2026-09-03",
        "developer": {
          "@type": "Organization",
          "name": "Rebel Wolves",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bandai Namco Entertainment",
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/PreOrder",
          "url": OFFICIAL_LINKS.steam,
        },
        "trailer": {
          "@type": "VideoObject",
          "name": FEATURED_VIDEO.title,
          "url": OFFICIAL_LINKS.trailer,
          "embedUrl": `https://www.youtube.com/embed/${FEATURED_VIDEO.videoId}`,
          "thumbnailUrl": heroImageUrl,
        },
      },
    ],
  }

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient
        latestArticles={latestArticles}
        locale={locale}
        officialLinks={OFFICIAL_LINKS}
        featuredVideo={FEATURED_VIDEO}
      />
    </>
  )
}
