'use client'

import { useEffect, Suspense, lazy } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Castle,
  Check,
  ChevronDown,
  Clock,
  CloudFog,
  Compass,
  Cpu,
  Crown,
  Drama,
  ExternalLink,
  Gamepad2,
  Gem,
  GitBranch,
  Handshake,
  HeartPulse,
  Hourglass,
  Landmark,
  Map,
  MapPinned,
  Monitor,
  Moon,
  Mountain,
  Pickaxe,
  Route,
  ScrollText,
  Shield,
  ShoppingBag,
  Skull,
  Sparkles,
  Swords,
  Trees,
  UserCog,
  UserRound,
  Users,
  Video,
  Building2,
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import enMessages from '@/locales/en.json'

const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  locale: string
  officialLinks: {
    releaseGuide: string
    officialSite: string
    steam: string
    discord: string
    reddit: string
    x: string
    youtube: string
    trailer: string
    twitch: string
  }
  featuredVideo: {
    videoId: string
    title: string
  }
}

const cardClass =
  'scroll-reveal p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300'

const mutedCardClass =
  'p-5 rounded-xl border border-border bg-white/5 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors'

const badgeClass =
  'inline-flex items-center rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]'

export default function HomePageClient({
  latestArticles,
  locale,
  officialLinks,
  featuredVideo,
}: HomePageClientProps) {
  const messages = useMessages() as typeof enMessages
  const usesCurrentHomepage =
    messages?.hero?.title === enMessages.hero.title &&
    messages?.tools?.cards?.[0]?.title === enMessages.tools.cards[0].title
  const t = usesCurrentHomepage ? messages : enMessages
  const toolCards = t.tools.cards

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                         bg-[hsl(var(--nav-theme)/0.1)]
                         border border-[hsl(var(--nav-theme)/0.3)] mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={officialLinks.releaseGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={officialLinks.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId={featuredVideo.videoId}
              title={featuredVideo.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#release-date" onClick={(event) => { event.preventDefault(); scrollToSection('release-date') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[0].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[0].description}</p>
            </a>
            <a href="#pre-order-and-editions" onClick={(event) => { event.preventDefault(); scrollToSection('pre-order-and-editions') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[1].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[1].description}</p>
            </a>
            <a href="#platforms" onClick={(event) => { event.preventDefault(); scrollToSection('platforms') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[2].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[2].description}</p>
            </a>
            <a href="#system-requirements" onClick={(event) => { event.preventDefault(); scrollToSection('system-requirements') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[3].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[3].description}</p>
            </a>
            <a href="#the-blood-of-dawnwalker-story" onClick={(event) => { event.preventDefault(); scrollToSection('the-blood-of-dawnwalker-story') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[4].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[4].description}</p>
            </a>
            <a href="#the-blood-of-dawnwalker-gameplay" onClick={(event) => { event.preventDefault(); scrollToSection('the-blood-of-dawnwalker-gameplay') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[5].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[5].description}</p>
            </a>
            <a href="#the-blood-of-dawnwalker-day-and-night-mechanics" onClick={(event) => { event.preventDefault(); scrollToSection('the-blood-of-dawnwalker-day-and-night-mechanics') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[6].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[6].description}</p>
            </a>
            <a href="#the-blood-of-dawnwalker-combat-and-magic" onClick={(event) => { event.preventDefault(); scrollToSection('the-blood-of-dawnwalker-combat-and-magic') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[7].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[7].description}</p>
            </a>
            <a href="#choices-and-consequences" onClick={(event) => { event.preventDefault(); scrollToSection('choices-and-consequences') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[8].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[8].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[8].description}</p>
            </a>
            <a href="#30-days-time-limit" onClick={(event) => { event.preventDefault(); scrollToSection('30-days-time-limit') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[9].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[9].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[9].description}</p>
            </a>
            <a href="#open-world-and-map" onClick={(event) => { event.preventDefault(); scrollToSection('open-world-and-map') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[10].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[10].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[10].description}</p>
            </a>
            <a href="#characters-and-factions" onClick={(event) => { event.preventDefault(); scrollToSection('characters-and-factions') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[11].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[11].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[11].description}</p>
            </a>
            <a href="#vampires-and-monsters" onClick={(event) => { event.preventDefault(); scrollToSection('vampires-and-monsters') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[12].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[12].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[12].description}</p>
            </a>
            <a href="#trailers-and-gameplay-videos" onClick={(event) => { event.preventDefault(); scrollToSection('trailers-and-gameplay-videos') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[13].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[13].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[13].description}</p>
            </a>
            <a href="#multiplayer-and-single-player" onClick={(event) => { event.preventDefault(); scrollToSection('multiplayer-and-single-player') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[14].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[14].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[14].description}</p>
            </a>
            <a href="#rebel-wolves" onClick={(event) => { event.preventDefault(); scrollToSection('rebel-wolves') }} className={`${cardClass} group cursor-pointer`}>
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[15].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[15].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[15].description}</p>
            </a>
          </div>
        </div>
      </section>

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Release Date */}
      <section id="release-date" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.releaseDate.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.releaseDate.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.releaseDate.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.releaseDate.items.map((item: any, index: number) => {
              const icons = [CalendarDays, Clock, Monitor, ShoppingBag]
              const Icon = icons[index] || CalendarDays
              return (
                <div key={item.label} className={mutedCardClass}>
                  <Icon className="w-6 h-6 text-[hsl(var(--nav-theme-light))] mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
                  <h3 className="text-2xl font-bold mb-3">{item.value}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.releaseDate.intro}</p>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Pre Order and Editions */}
      <section id="pre-order-and-editions" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.preOrderAndEditions.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.preOrderAndEditions.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.preOrderAndEditions.subtitle}</p>
          </div>
          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)] text-left">
                <tr>
                  <th className="p-4 font-semibold">Edition</th>
                  <th className="p-4 font-semibold">Format</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.preOrderAndEditions.items.map((item: any) => (
                  <tr key={item.edition} className="border-t border-border align-top">
                    <td className="p-4 font-semibold text-[hsl(var(--nav-theme-light))]">{item.edition}</td>
                    <td className="p-4 text-muted-foreground">{item.format}</td>
                    <td className="p-4 text-muted-foreground">{item.price}</td>
                    <td className="p-4 text-muted-foreground">{item.best_for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="scroll-reveal md:hidden grid gap-4">
            {t.modules.preOrderAndEditions.items.map((item: any) => (
              <div key={item.edition} className={mutedCardClass}>
                <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">{item.edition}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.format}</p>
                <p className="text-sm mb-2">{item.price}</p>
                <p className="text-sm text-muted-foreground">{item.included}</p>
              </div>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.preOrderAndEditions.intro}</p>
        </div>
      </section>

      {/* Module 3: Platforms */}
      <section id="platforms" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.platforms.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.platforms.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.platforms.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.platforms.items.map((item: any, index: number) => {
              const icons = [Monitor, Gamepad2, Shield, Cpu]
              const Icon = icons[index] || Monitor
              return (
                <div key={item.platform} className={mutedCardClass}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                    <div>
                      <h3 className="font-bold">{item.platform}</h3>
                      <p className="text-xs text-[hsl(var(--nav-theme-light))]">{item.status}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.features}</p>
                  <a href={item.store_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:underline">
                    Open official storefront <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )
            })}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.platforms.intro}</p>
        </div>
      </section>

      {/* Module 4: System Requirements */}
      <section id="system-requirements" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.systemRequirements.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.systemRequirements.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.systemRequirements.subtitle}</p>
          </div>
          <div className="scroll-reveal hidden lg:block overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)] text-left">
                <tr>
                  <th className="p-4">Tier</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">CPU</th>
                  <th className="p-4">GPU</th>
                  <th className="p-4">VRAM</th>
                  <th className="p-4">Storage</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.systemRequirements.items.map((item: any, index: number) => (
                  <tr key={`${item.tier}-${index}`} className="border-t border-border align-top">
                    <td className="p-4 font-semibold text-[hsl(var(--nav-theme-light))]">{item.tier}</td>
                    <td className="p-4 text-muted-foreground">{item.target}</td>
                    <td className="p-4 text-muted-foreground">{item.cpu}</td>
                    <td className="p-4 text-muted-foreground">{item.gpu}</td>
                    <td className="p-4 text-muted-foreground">{item.vram}</td>
                    <td className="p-4 text-muted-foreground">{item.storage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="scroll-reveal lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.systemRequirements.items.map((item: any, index: number) => (
              <div key={`${item.tier}-${index}`} className={mutedCardClass}>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <div>
                    <h3 className="font-bold">{item.tier}</h3>
                    <p className="text-xs text-muted-foreground">{item.target}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <span className="text-muted-foreground">Preset</span><span>{item.preset}</span>
                  <span className="text-muted-foreground">CPU</span><span>{item.cpu}</span>
                  <span className="text-muted-foreground">GPU</span><span>{item.gpu}</span>
                  <span className="text-muted-foreground">RAM</span><span>{item.ram}</span>
                  <span className="text-muted-foreground">VRAM</span><span>{item.vram}</span>
                  <span className="text-muted-foreground">Storage</span><span>{item.storage}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.systemRequirements.intro}</p>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 5: Story */}
      <section id="the-blood-of-dawnwalker-story" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.story.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.story.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.story.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6">
            <div className="p-6 rounded-xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.08)]">
              <ScrollText className="w-7 h-7 text-[hsl(var(--nav-theme-light))] mb-4" />
              <p className="text-muted-foreground">{t.modules.story.intro}</p>
            </div>
            <div className="space-y-3">
              {t.modules.story.items.map((item: any) => (
                <details key={item.title} className="group rounded-xl border border-border bg-card p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.title}
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-sm text-muted-foreground">{item.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((highlight: string) => (
                      <span key={highlight} className={badgeClass}>{highlight}</span>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 6: Gameplay */}
      <section id="the-blood-of-dawnwalker-gameplay" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.gameplay.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.gameplay.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.gameplay.subtitle}</p>
          </div>
          <div className="scroll-reveal relative space-y-5">
            {t.modules.gameplay.items.map((item: any) => (
              <div key={item.step} className="grid grid-cols-[auto_1fr] gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.12)] font-bold text-[hsl(var(--nav-theme-light))]">{item.step}</div>
                <div className={mutedCardClass}>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <p className="text-sm text-[hsl(var(--nav-theme-light))]">{item.player_value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.gameplay.intro}</p>
        </div>
      </section>

      {/* Module 7: Day and Night Mechanics */}
      <section id="the-blood-of-dawnwalker-day-and-night-mechanics" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.dayNightMechanics.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.dayNightMechanics.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.dayNightMechanics.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.dayNightMechanics.items.map((item: any) => (
              <details key={item.title} className="group rounded-xl border border-border bg-card p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  <span className="inline-flex items-center gap-2"><Moon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />{item.title}</span>
                  <ChevronDown className="w-5 h-5 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm text-muted-foreground">{item.content}</p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail: string) => (
                    <li key={detail} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />{detail}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.dayNightMechanics.intro}</p>
        </div>
      </section>

      {/* Module 8: Combat and Magic */}
      <section id="the-blood-of-dawnwalker-combat-and-magic" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.combatMagic.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.combatMagic.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.combatMagic.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.combatMagic.items.map((item: any, index: number) => {
              const icons = [Swords, Shield, Sparkles, Moon, Skull, GitBranch]
              const Icon = icons[index] || Swords
              return (
                <div key={item.title} className={mutedCardClass}>
                  <Icon className="w-6 h-6 text-[hsl(var(--nav-theme-light))] mb-4" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag: string) => (
                      <span key={tag} className={badgeClass}>{tag}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.combatMagic.intro}</p>
        </div>
      </section>

      {/* Module 9: Choices and Consequences */}
      <section id="choices-and-consequences" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.choicesConsequences.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.choicesConsequences.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.choicesConsequences.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-5">
            <div className="space-y-3">
              {t.modules.choicesConsequences.items.map((item: any, index: number) => (
                <details key={item.question} open={index === 0} className="group rounded-xl border border-border bg-card p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.question}
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-sm text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="rounded-xl border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.08)] p-6 lg:sticky lg:top-24 self-start">
              <GitBranch className="w-7 h-7 text-[hsl(var(--nav-theme-light))] mb-4" />
              <h3 className="text-xl font-bold mb-4">{t.modules.choicesConsequences.highlightTitle}</h3>
              <div className="space-y-3">
                {t.modules.choicesConsequences.highlights.map((highlight: any, index: number) => {
                  const icons = [GitBranch, Hourglass, HeartPulse, Handshake]
                  const Icon = icons[index] || GitBranch
                  return (
                    <div key={highlight.label} className="rounded-lg border border-border bg-background/40 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                        <h4 className="font-semibold">{highlight.label}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{highlight.detail}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.choicesConsequences.intro}</p>
        </div>
      </section>

      {/* Module 10: 30 Days Time Limit */}
      <section id="30-days-time-limit" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.timeLimit.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.timeLimit.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.timeLimit.subtitle}</p>
          </div>
          <div className="scroll-reveal md:hidden space-y-4">
            {t.modules.timeLimit.items.map((item: any) => (
              <div key={item.step} className="grid grid-cols-[auto_1fr] gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.12)] font-bold text-[hsl(var(--nav-theme-light))]">
                  {item.step}
                </div>
                <div className={mutedCardClass}>
                  <span className={badgeClass}>{item.timeImpact}</span>
                  <h3 className="font-bold mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal hidden md:block overflow-x-auto pb-2">
            <div className="relative min-w-[1120px]">
              <div className="absolute left-12 right-12 top-6 h-px bg-border" />
              <div className="grid grid-cols-7 gap-4">
                {t.modules.timeLimit.items.map((item: any) => (
                  <div key={item.step} className="relative">
                    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-background font-bold text-[hsl(var(--nav-theme-light))]">
                      {item.step}
                    </div>
                    <div className="h-full rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Hourglass className="w-4 h-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-xs font-medium text-[hsl(var(--nav-theme-light))]">{item.timeImpact}</span>
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="scroll-reveal mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.timeLimit.summary.map((item: any, index: number) => {
              const icons = [Compass, Clock, BadgeCheck]
              const Icon = icons[index] || Compass
              return (
                <div key={item.label} className={mutedCardClass}>
                  <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-3" />
                  <h3 className="font-bold mb-2">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              )
            })}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.timeLimit.intro}</p>
        </div>
      </section>

      {/* Module 11: Open World and Map */}
      <section id="open-world-and-map" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.openWorldMap.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.openWorldMap.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.openWorldMap.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.openWorldMap.items.map((item: any, index: number) => {
              const icons = [MapPinned, Building2, Landmark, Castle, Trees, Pickaxe, Mountain, CloudFog, Map, Route]
              const Icon = icons[index] || Map
              return (
                <div key={item.title} className={mutedCardClass}>
                  <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-3" />
                  <span className={badgeClass}>{item.type}</span>
                  <h3 className="font-bold mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.openWorldMap.intro}</p>
        </div>
      </section>

      {/* Module 12: Characters and Factions */}
      <section id="characters-and-factions" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.charactersFactions.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.charactersFactions.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.charactersFactions.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.charactersFactions.items.map((item: any, index: number) => {
              const icons = [UserRound, HeartPulse, Crown, Gem, Drama, Swords, Users, Shield, Handshake, UserCog]
              const Icon = icons[index] || Users
              return (
                <div key={item.title} className={mutedCardClass}>
                  <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-3" />
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={badgeClass}>{item.faction}</span>
                    <span className={badgeClass}>{item.role}</span>
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.charactersFactions.intro}</p>
        </div>
      </section>

      {/* Module 13: Vampires and Monsters */}
      <section id="vampires-and-monsters" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.vampiresMonsters.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.vampiresMonsters.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.vampiresMonsters.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.vampiresMonsters.items.map((item: any) => (
              <details key={item.title} className="group rounded-xl border border-border bg-card p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  <span className="inline-flex items-center gap-2"><Skull className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />{item.title}</span>
                  <ChevronDown className="w-5 h-5 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                </summary>
                <span className={`${badgeClass} mt-4`}>{item.type}</span>
                <p className="mt-4 text-sm text-[hsl(var(--nav-theme-light))]">{item.summary}</p>
                <p className="mt-3 text-sm text-muted-foreground">{item.details}</p>
              </details>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.vampiresMonsters.intro}</p>
        </div>
      </section>

      {/* Module 14: Trailers and Gameplay Videos */}
      <section id="trailers-and-gameplay-videos" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.trailersVideos.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.trailersVideos.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.trailersVideos.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.trailersVideos.items.map((item: any) => (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={`${mutedCardClass} block`}>
                <Video className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-3" />
                <span className={badgeClass}>{item.format}</span>
                <h3 className="font-bold mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.focus}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
                  Watch official video <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.trailersVideos.intro}</p>
        </div>
      </section>

      {/* Module 15: Multiplayer and Single Player */}
      <section id="multiplayer-and-single-player" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.multiplayerSinglePlayer.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.multiplayerSinglePlayer.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.multiplayerSinglePlayer.subtitle}</p>
          </div>
          <div className="scroll-reveal space-y-3">
            {t.modules.multiplayerSinglePlayer.items.map((item: any) => (
              <details key={item.question} className="group rounded-xl border border-border bg-card p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.question}
                  <ChevronDown className="w-5 h-5 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.multiplayerSinglePlayer.intro}</p>
        </div>
      </section>

      {/* Module 16: Rebel Wolves */}
      <section id="rebel-wolves" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <span className={badgeClass}>{t.modules.rebelWolves.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{t.modules.rebelWolves.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.rebelWolves.subtitle}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.rebelWolves.items.map((item: any) => (
              <div key={item.title} className={mutedCardClass}>
                <Building2 className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-3" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--nav-theme-light))] mb-3">{item.summary}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-muted-foreground text-center max-w-3xl mx-auto">{t.modules.rebelWolves.intro}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
          communityHref={officialLinks.discord}
          gameHref={officialLinks.steam}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={officialLinks.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a href={officialLinks.x} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a href={officialLinks.reddit} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a href={officialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a href={officialLinks.steam} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.steamStore}
                  </a>
                </li>
                <li>
                  <a href={officialLinks.officialSite} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.officialSite}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">
                    {t.footer.about}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {t.footer.privacy}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {t.footer.terms}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {t.footer.copyrightNotice}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
