import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://thebloodofdawnwalker.wiki').replace(/\/$/, '')
  const path = '/about'

  return {
    title: 'About The Blood of Dawnwalker Wiki - Dark Fantasy RPG Resource',
    description: 'Learn about The Blood of Dawnwalker Wiki, a community-driven resource hub for release date, platforms, editions, story, choices, combat, trailers, and PC information.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'The Blood of Dawnwalker Wiki',
      title: 'About The Blood of Dawnwalker Wiki',
      description: 'Learn about our mission to provide useful The Blood of Dawnwalker release, story, gameplay, and platform resources.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'The Blood of Dawnwalker Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About The Blood of Dawnwalker Wiki',
      description: 'Learn about our mission to provide useful The Blood of Dawnwalker release, story, gameplay, and platform resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About The Blood of Dawnwalker Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for The Blood of Dawnwalker
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to The Blood of Dawnwalker Wiki</h2>
            <p>
              The Blood of Dawnwalker Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              master the dark fantasy action RPG "The Blood of Dawnwalker". We are a community-driven platform that provides comprehensive guides,
              release tracking, platform details, story explainers, choice breakdowns, trailer coverage, and PC information.
            </p>
            <p>
              Whether you're a new player just starting your survival journey or a seasoned veteran looking to optimize your strategies,
              The Blood of Dawnwalker Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower The Blood of Dawnwalker players with accurate, up-to-date information
              and powerful tools</strong> that help them succeed in the game. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest game changes, new items, and balance updates</li>
              <li><strong>Build useful tools:</strong> Develop guides, comparison tables, and planners that help players make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where players can learn, share strategies, and grow together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision The Blood of Dawnwalker Wiki as the <strong>go-to destination</strong> for every The Blood of Dawnwalker player seeking
              to improve their gameplay. We want to be the resource that players trust and rely on, whether they need
              launch details, edition comparisons, story context, combat explainers, or official source links.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release & Platforms</h3>
              <p className="text-slate-300">
                Track the September 3, 2026 launch date, PC, PS5, and Xbox Series X|S availability,
                plus regional and store-page details.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🛒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Editions & Pre-orders</h3>
              <p className="text-slate-300">
                Compare official editions, pre-order options, bonuses, and purchase links without mixing
                storefront details with story guidance.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌑</div>
              <h3 className="text-xl font-semibold text-white mb-2">Story & Characters</h3>
              <p className="text-slate-300">
                Follow Coen, Vale Sangora, vampire rule, and the 14th-century European setting through
                clear summaries based on official material.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">⚖️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Choices & Consequences</h3>
              <p className="text-slate-300">
                Explain the 30 days and 30 nights premise, time costs, branching quests,
                and how player choices can reshape the world.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🗡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Combat & Powers</h3>
              <p className="text-slate-300">
                Cover swordplay, magic, vampire powers, daytime and nighttime differences,
                and official gameplay footage as new details arrive.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailers & Specs</h3>
              <p className="text-slate-300">
                Collect official trailers, gameplay overviews, screenshots, wallpapers,
                and PC requirement notes in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              The Blood of Dawnwalker Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from players of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New strategies, hidden mechanics, and pro tips shared by players</li>
              <li><strong>Game updates:</strong> We monitor official updates and adjust our content accordingly</li>
              <li><strong>Meta shifts:</strong> We track gameplay trends and update guides based on real player experiences</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you found a new official source, spotted a trailer detail,
              or have suggestions for new guides, we'd love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              The Blood of Dawnwalker Wiki is maintained by a dedicated team of passionate gamers and developers who love
              The Blood of Dawnwalker as much as you do. We're players first, constantly testing strategies, exploring game
              mechanics, and staying updated with the latest discoveries.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game analysis:</strong> Deep understanding of The Blood of Dawnwalker mechanics and strategies</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "Dawnwatch" - Tracking the road to launch together.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>The Blood of Dawnwalker Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with the developers of The Blood of Dawnwalker or any official entities.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              The Blood of Dawnwalker Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@thebloodofdawnwalker.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@thebloodofdawnwalker.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@thebloodofdawnwalker.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@thebloodofdawnwalker.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@thebloodofdawnwalker.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@thebloodofdawnwalker.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@thebloodofdawnwalker.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@thebloodofdawnwalker.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, tips, and The Blood of Dawnwalker news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
