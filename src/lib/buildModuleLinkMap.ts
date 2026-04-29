import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { Language, ContentItem } from '@/lib/content'

export interface ArticleLink {
  url: string
  title: string
}

export type ModuleLinkMap = Record<string, ArticleLink | null>

interface ArticleWithType extends ContentItem {
  contentType: string
}

// Module sub-field mapping: moduleKey -> { field, nameKey }
const MODULE_FIELDS: Record<string, { field: string; nameKey: string }> = {
  releaseDate: { field: 'items', nameKey: 'label' },
  preOrderAndEditions: { field: 'items', nameKey: 'edition' },
  platforms: { field: 'items', nameKey: 'platform' },
  systemRequirements: { field: 'items', nameKey: 'target' },
  story: { field: 'items', nameKey: 'title' },
  gameplay: { field: 'items', nameKey: 'title' },
  dayNightMechanics: { field: 'items', nameKey: 'title' },
  combatMagic: { field: 'items', nameKey: 'title' },
  choicesConsequences: { field: 'items', nameKey: 'question' },
  timeLimit: { field: 'items', nameKey: 'title' },
  openWorldMap: { field: 'items', nameKey: 'title' },
  charactersFactions: { field: 'items', nameKey: 'title' },
  vampiresMonsters: { field: 'items', nameKey: 'title' },
  trailersVideos: { field: 'items', nameKey: 'title' },
  multiplayerSinglePlayer: { field: 'items', nameKey: 'question' },
  rebelWolves: { field: 'items', nameKey: 'title' },
}

// Extra semantic keywords per module to boost matching for h2 titles
// These supplement the module title text when matching against articles
const MODULE_EXTRA_KEYWORDS: Record<string, string[]> = {
  releaseDate: ['launch date', 'September 3 2026', 'pre-order', 'Steam date', 'platforms'],
  preOrderAndEditions: ['Standard Edition', 'Eclipse Edition', 'Collector Edition', 'Sangoran Wayfarer', 'Day One Edition'],
  platforms: ['Steam PC', 'PlayStation 5', 'Xbox Series X', 'Xbox Play Anywhere', 'storefront'],
  systemRequirements: ['minimum specs', 'recommended specs', 'ultra settings', 'DLSS', 'FSR', '60 GB SSD'],
  story: ['Coen', 'Dawnwalker', 'Brencis', 'Vale Sangora', 'Black Death', '30 days'],
  gameplay: ['open world', 'narrative sandbox', 'time costs', 'human vampire', 'skill trees', 'exploration'],
  dayNightMechanics: ['day and night', 'Blood Hunger', 'Shadowstep', 'Clawride', 'Planeshift', '30 day clock'],
  combatMagic: ['sword fighting', 'rune magic', 'Burning Blood', 'Activation Charges', 'vampire claws', 'skill tree'],
  choicesConsequences: ['choices', 'consequences', 'alliances', 'time pressure', 'family rescue', 'quest outcomes'],
  timeLimit: ['30 days', '30 nights', 'time limit', 'hourglass', 'family rescue', 'world state'],
  openWorldMap: ['Vale Sangora', 'Svartrau', 'Howling Keep', "Shrike's Crag", 'Carpathian', 'fast travel'],
  charactersFactions: ['Coen', 'Lunka', 'Brencis', 'Vrakhiri', 'Xanthe', 'Blood Guards'],
  vampiresMonsters: ['Vrakhiri', 'murohni', 'kobolds', 'uriashi', 'likhos', 'psoglavs', 'undead'],
  trailersVideos: ['story trailer', 'Road to Launch', 'gameplay overview', 'reveal event', 'YouTube', 'official videos'],
  multiplayerSinglePlayer: ['single player', 'offline play', 'co-op', 'multiplayer', 'Xbox Play Anywhere', 'one player'],
  rebelWolves: ['Rebel Wolves', 'Bandai Namco', 'Unreal Engine 5', 'first chapter', 'RPG saga', 'CD Projekt RED'],
}

const FILLER_WORDS = ['the', 'blood', 'of', 'dawnwalker', '2026', '2025', 'complete', 'and', 'for', 'how', 'with', 'our', 'this', 'your', 'all', 'from', 'learn', 'master']

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSignificantTokens(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter(w => w.length > 2 && !FILLER_WORDS.includes(w))
}

function matchScore(queryText: string, article: ArticleWithType, extraKeywords?: string[]): number {
  const normalizedQuery = normalize(queryText)
  const normalizedTitle = normalize(article.frontmatter.title)
  const normalizedDesc = normalize(article.frontmatter.description || '')
  const normalizedSlug = article.slug.replace(/-/g, ' ').toLowerCase()

  let score = 0

  // Exact phrase match in title after stripping the current site title.
  const strippedQuery = normalizedQuery.replace(/the blood of dawnwalker\s*/g, '').trim()
  const strippedTitle = normalizedTitle.replace(/the blood of dawnwalker\s*/g, '').trim()
  if (strippedQuery.length > 3 && strippedTitle.includes(strippedQuery)) {
    score += 100
  }

  // Token overlap from query text
  const queryTokens = getSignificantTokens(queryText)
  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) score += 20
    if (normalizedDesc.includes(token)) score += 5
    if (normalizedSlug.includes(token)) score += 15
  }

  // Extra keywords scoring (for module h2 titles)
  if (extraKeywords) {
    for (const kw of extraKeywords) {
      const normalizedKw = normalize(kw)
      if (normalizedTitle.includes(normalizedKw)) score += 15
      if (normalizedDesc.includes(normalizedKw)) score += 5
      if (normalizedSlug.includes(normalizedKw)) score += 10
    }
  }

  return score
}

function findBestMatch(
  queryText: string,
  articles: ArticleWithType[],
  extraKeywords?: string[],
  threshold = 20,
): ArticleLink | null {
  let bestScore = 0
  let bestArticle: ArticleWithType | null = null

  for (const article of articles) {
    const score = matchScore(queryText, article, extraKeywords)
    if (score > bestScore) {
      bestScore = score
      bestArticle = article
    }
  }

  if (bestScore >= threshold && bestArticle) {
    return {
      url: `/${bestArticle.contentType}/${bestArticle.slug}`,
      title: bestArticle.frontmatter.title,
    }
  }

  return null
}

export async function buildModuleLinkMap(locale: Language): Promise<ModuleLinkMap> {
  // 1. Load all articles across all content types
  const allArticles: ArticleWithType[] = []
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    for (const item of items) {
      allArticles.push({ ...item, contentType })
    }
  }

  // 2. Load module data from en.json (use English for keyword matching)
  const enMessages = (await import('../locales/en.json')).default as any

  const linkMap: ModuleLinkMap = {}

  // 3. For each module, match h2 title and sub-items
  for (const [moduleKey, fieldConfig] of Object.entries(MODULE_FIELDS)) {
    const moduleData = enMessages.modules?.[moduleKey]
    if (!moduleData) continue

    // Match module h2 title (use extra keywords + lower threshold for broader matching)
    const moduleTitle = moduleData.title as string
    if (moduleTitle) {
      const extraKw = MODULE_EXTRA_KEYWORDS[moduleKey] || []
      linkMap[moduleKey] = findBestMatch(moduleTitle, allArticles, extraKw, 15)
    }

    // Match sub-items
    const subItems = moduleData[fieldConfig.field] as any[]
    if (Array.isArray(subItems)) {
      for (let i = 0; i < subItems.length; i++) {
        const itemName = subItems[i]?.[fieldConfig.nameKey] as string
        if (itemName) {
          const key = `${moduleKey}::${fieldConfig.field}::${i}`
          linkMap[key] = findBestMatch(itemName, allArticles)
        }
      }
    }
  }

  return linkMap
}
