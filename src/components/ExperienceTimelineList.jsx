import { resolveAssetUrl } from '../utils/assetUrl'

const todayLabel = new Intl.DateTimeFormat('en-CA', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}).format(new Date())

function getStartYear(dates = '') {
  const match = dates.match(/\b(19|20)\d{2}\b/)
  return match ? Number(match[0]) : null
}

export default function ExperienceTimelineList({ items = [], onItemClick, className = '' }) {
  if (!Array.isArray(items) || items.length === 0) return null

  const groupedItems = items
    .map((item, index) => ({
      item,
      index,
      startYear: getStartYear(item.dates),
    }))
    .sort((a, b) => {
      const aYear = a.startYear ?? -Infinity
      const bYear = b.startYear ?? -Infinity
      if (bYear !== aYear) return bYear - aYear
      return a.index - b.index
    })
    .reduce((groups, entry) => {
      const label = entry.startYear ? String(entry.startYear) : 'Earlier'
      const currentGroup = groups[groups.length - 1]

      if (!currentGroup || currentGroup.label !== label) {
        groups.push({ label, items: [entry.item] })
      } else {
        currentGroup.items.push(entry.item)
      }

      return groups
    }, [])

  return (
    <ul
      className={`relative mt-5 space-y-4 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-slate-200 ${className}`.trim()}
    >
      <li className="relative pl-12">
        <span
          className="absolute left-[13px] top-1 z-10 h-4 w-4 rounded-full border-4 border-white bg-slate-900 shadow-sm"
          aria-hidden
        />
        <p className="pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {todayLabel}
        </p>
      </li>
      {groupedItems.map((group) => (
        <li key={group.label} className="space-y-4">
          <ul className="space-y-4">
            {group.items.map((item, index) => (
              <li key={`${item.company}-${item.title}-${group.label}-${index}`} className="relative pl-12">
                <span
                  className="absolute left-[13px] top-5 z-10 h-4 w-4 rounded-full border-4 border-white bg-slate-400 shadow-sm"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => onItemClick?.(item)}
                  className="w-full text-left rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                >
                  <div className="flex items-start gap-3">
                    {item.logoUrl && (
                      <img
                        src={resolveAssetUrl(item.logoUrl)}
                        alt={`${item.company} logo`}
                        className="h-10 w-10 shrink-0 rounded-md border border-slate-200 bg-white object-contain p-1"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {item.title} · {item.company}
                      </p>
                      {item.dates && <p className="mt-0.5 text-sm text-slate-500">{item.dates}</p>}
                      {item.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <p className="pl-12 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {group.label}
          </p>
        </li>
      ))}
    </ul>
  )
}
