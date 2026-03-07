import { useState } from 'react'

const SIMPLE_ICONS_CDN_BASE_URL = 'https://cdn.simpleicons.org'

const LANGUAGE_DEFINITIONS = [
  {
    key: 'firebase',
    label: 'Firebase',
    matches: ['firebase', 'firestore', 'firebase auth', 'firebase cloud functions'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/firebase/FFFFFF?viewbox=auto`,
    fallbackText: 'FB',
    fallbackClassName: 'text-white',
  },
  {
    key: 'supabase',
    label: 'Supabase',
    matches: ['supabase'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/supabase/FFFFFF?viewbox=auto`,
    fallbackText: 'SB',
    fallbackClassName: 'text-white',
  },
  {
    key: 'react-native',
    label: 'React Native',
    matches: ['react native', 'react-native'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/react/FFFFFF?viewbox=auto`,
    fallbackText: 'RN',
    fallbackClassName: 'text-white',
  },
  {
    key: 'react',
    label: 'React',
    matches: ['react'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/react/FFFFFF?viewbox=auto`,
    fallbackText: 'R',
    fallbackClassName: 'text-white',
  },
  {
    key: 'typescript',
    label: 'TypeScript',
    matches: ['typescript', 'ts'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/typescript/FFFFFF?viewbox=auto`,
    fallbackText: 'TS',
    fallbackClassName: 'text-white',
  },
  {
    key: 'c++',
    label: 'C++',
    matches: ['c++'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/cplusplus/FFFFFF?viewbox=auto`,
    fallbackText: 'C++',
    fallbackClassName: 'text-white',
  },
  {
    key: 'c',
    label: 'C',
    matches: ['c'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/c/FFFFFF?viewbox=auto`,
    fallbackText: 'C',
    fallbackClassName: 'text-white',
  },
  {
    key: 'javascript',
    label: 'JavaScript',
    matches: ['javascript', 'js'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/javascript/FFFFFF?viewbox=auto`,
    fallbackText: 'JS',
    fallbackClassName: 'text-white',
  },
  {
    key: 'python',
    label: 'Python',
    matches: ['python'],
    iconUrl: `${SIMPLE_ICONS_CDN_BASE_URL}/python/FFFFFF?viewbox=auto`,
    fallbackText: 'Py',
    fallbackClassName: 'text-white',
  },
]

const normalizeToken = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

const getLanguageDefinition = (token) => {
  const normalized = normalizeToken(token)
  return LANGUAGE_DEFINITIONS.find((definition) =>
    definition.matches.some((match) => {
      if (match === 'c') return normalized === 'c'
      return normalized.includes(match)
    })
  )
}

function LanguageBadge({ language }) {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <span
      className="relative inline-flex h-8 w-8 items-center justify-center"
      title={language.label}
      aria-label={language.label}
    >
      {!showFallback && (
        <img
          src={language.iconUrl}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setShowFallback(true)}
          className="relative z-10 h-full w-full object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]"
        />
      )}
      {showFallback && (
        <span
          className={`relative z-10 inline-flex h-full w-full items-center justify-center text-[11px] font-semibold drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)] ${language.fallbackClassName}`}
          aria-hidden
        >
          {language.fallbackText}
        </span>
      )}
    </span>
  )
}

export function extractProjectLanguages({ stackGroups, stack, tags }) {
  const candidates = []

  if (Array.isArray(stackGroups)) {
    stackGroups.forEach((group) => {
      if (Array.isArray(group?.items)) {
        group.items.forEach((item) => candidates.push(item))
      }
    })
  }

  if (Array.isArray(stack)) candidates.push(...stack)
  if (Array.isArray(tags)) candidates.push(...tags)

  const uniqueLanguages = []

  candidates.forEach((candidate) => {
    const definition = getLanguageDefinition(candidate)
    if (!definition) return
    if (uniqueLanguages.some((item) => item.key === definition.key)) return
    uniqueLanguages.push(definition)
  })

  return uniqueLanguages
}

export default function ProjectLanguageBadges({ languages = [], className = '' }) {
  if (!Array.isArray(languages) || languages.length === 0) return null

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`.trim()} aria-label="Project languages">
      {languages.map((language) => (
        <li key={language.key}>
          <LanguageBadge language={language} />
        </li>
      ))}
    </ul>
  )
}
