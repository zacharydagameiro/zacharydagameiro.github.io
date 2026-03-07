import { useMemo } from 'react'

const renderInlineMarkdown = (text, keyPrefix) => {
  if (typeof text !== 'string' || text.length === 0) return null

  const tokens = []
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let match = null
  let lastIndex = 0
  let tokenIndex = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(<span key={`${keyPrefix}-text-${tokenIndex}`}>{text.slice(lastIndex, match.index)}</span>)
      tokenIndex += 1
    }

    if (match[1]) {
      tokens.push(<strong key={`${keyPrefix}-strong-${tokenIndex}`}>{match[1]}</strong>)
    } else if (match[2]) {
      tokens.push(
        <code
          key={`${keyPrefix}-code-${tokenIndex}`}
          className="rounded bg-slate-100 px-1 py-0.5 text-[0.92em] text-slate-700"
        >
          {match[2]}
        </code>
      )
    } else if (match[3] && match[4]) {
      tokens.push(
        <a
          key={`${keyPrefix}-link-${tokenIndex}`}
          href={match[4]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline"
        >
          {match[3]}
        </a>
      )
    }

    tokenIndex += 1
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    tokens.push(<span key={`${keyPrefix}-tail-${tokenIndex}`}>{text.slice(lastIndex)}</span>)
  }

  return tokens
}

const parseMarkdownBlocks = (markdown) => {
  if (typeof markdown !== 'string' || markdown.trim().length === 0) return []

  const blocks = []
  const lines = markdown.split(/\r?\n/)
  let index = 0

  while (index < lines.length) {
    const trimmed = lines[index].trim()
    if (!trimmed) {
      index += 1
      continue
    }

    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3).trim() })
      index += 1
      continue
    }

    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4).trim() })
      index += 1
      continue
    }

    if (trimmed.startsWith('> ')) {
      const quoteLines = []
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quoteLines.push(lines[index].trim().slice(2).trim())
        index += 1
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join(' ') })
      continue
    }

    if (trimmed.startsWith('- ')) {
      const items = []
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2).trim())
        index += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    const paragraphLines = []
    while (index < lines.length) {
      const paragraphCandidate = lines[index].trim()
      if (!paragraphCandidate) {
        index += 1
        break
      }
      if (
        paragraphCandidate.startsWith('## ') ||
        paragraphCandidate.startsWith('### ') ||
        paragraphCandidate.startsWith('> ') ||
        paragraphCandidate.startsWith('- ')
      ) {
        break
      }
      paragraphLines.push(paragraphCandidate)
      index += 1
    }

    if (paragraphLines.length > 0) {
      blocks.push({ type: 'p', text: paragraphLines.join(' ') })
    }
  }

  return blocks
}

export default function MarkdownContent({ markdown, className = 'space-y-4' }) {
  const blocks = useMemo(() => parseMarkdownBlocks(markdown), [markdown])

  if (blocks.length === 0) return null

  return (
    <div className={className}>
      {blocks.map((block, blockIndex) => {
        if (block.type === 'h2') {
          return (
            <h2 key={`block-${blockIndex}`} className="text-base font-semibold text-slate-900">
              {renderInlineMarkdown(block.text, `block-${blockIndex}`)}
            </h2>
          )
        }

        if (block.type === 'h3') {
          return (
            <h3 key={`block-${blockIndex}`} className="text-sm font-semibold text-slate-900">
              {renderInlineMarkdown(block.text, `block-${blockIndex}`)}
            </h3>
          )
        }

        if (block.type === 'ul') {
          return (
            <ul key={`block-${blockIndex}`} className="space-y-1.5 text-sm text-slate-600">
              {block.items.map((item, itemIndex) => (
                <li key={`block-${blockIndex}-item-${itemIndex}`} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{renderInlineMarkdown(item, `block-${blockIndex}-item-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={`block-${blockIndex}`}
              className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-950 shadow-sm"
            >
              {renderInlineMarkdown(block.text, `block-${blockIndex}`)}
            </blockquote>
          )
        }

        return (
          <p key={`block-${blockIndex}`} className="text-sm leading-relaxed text-slate-600">
            {renderInlineMarkdown(block.text, `block-${blockIndex}`)}
          </p>
        )
      })}
    </div>
  )
}
