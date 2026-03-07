import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import projectsData from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { useSearchParams } from 'react-router-dom'
import { PROJECTS_LAST_UPDATED } from '../data/siteMeta'

const BASE_TABS = [
  { id: 'featured', label: 'Featured' },
  { id: 'web', label: 'Mobile & Web' },
  { id: 'ml-ai', label: 'ML / AI' },
  { id: 'school', label: 'School' },
  { id: 'bio', label: 'Bio' },
  { id: 'all', label: 'All' },
]

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured first' },
  { id: 'newest', label: 'Newest' },
  { id: 'alpha', label: 'A–Z' },
]

const projectInCategory = (project, categoryId) => {
  if (categoryId === 'web') {
    const tags = Array.isArray(project.tags) ? project.tags : []
    return (
      project.category === 'web' ||
      (Array.isArray(project.categories) && project.categories.includes('web')) ||
      tags.includes('Mobile') ||
      tags.includes('React Native')
    )
  }

  return project.category === categoryId || (Array.isArray(project.categories) && project.categories.includes(categoryId))
}

const TAB_ACTIVE_BG_CLASS = {
  featured: 'bg-rose-600',
  'ml-ai': 'bg-violet-600',
  bio: 'bg-emerald-600',
  school: 'bg-amber-500',
  web: 'bg-sky-600',
  all: 'bg-cyan-700',
}

export default function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabScrollRef = useRef(null)
  const tabListRef = useRef(null)
  const tabButtonRefs = useRef({})
  const projectItemRefs = useRef({})
  const previousProjectRectsRef = useRef(new Map())
  const [tabOverflowState, setTabOverflowState] = useState({ showLeft: false, showRight: false })
  const [activePillStyle, setActivePillStyle] = useState({ left: 0, width: 0, ready: false })
  const tabParam = searchParams.get('tab')
  const sortParam = searchParams.get('sort')
  const validTabIds = BASE_TABS.map((tab) => tab.id)
  const validSortIds = SORT_OPTIONS.map((option) => option.id)
  const activeTab = validTabIds.includes(tabParam) ? tabParam : 'featured'
  const sortBy = validSortIds.includes(sortParam) ? sortParam : 'featured'
  const listSearch = searchParams.toString() ? `?${searchParams.toString()}` : ''

  const projects = useMemo(
    () =>
      [...projectsData].map((p) => ({
        ...p,
        yearValue: Number.parseInt(p.year || '0', 10),
      })),
    []
  )

  const counts = useMemo(() => {
    const featured = projects.filter((p) => p.featured).length
    const all = projects.length
    const ml = projects.filter((p) => projectInCategory(p, 'ml-ai')).length
    const bio = projects.filter((p) => projectInCategory(p, 'bio')).length
    const school = projects.filter((p) => projectInCategory(p, 'school')).length
    const web = projects.filter((p) => projectInCategory(p, 'web')).length
    return { featured, all, ml, bio, school, web }
  }, [projects])

  const tabs = useMemo(
    () =>
      BASE_TABS.map((tab) => {
        if (tab.id === 'featured') return { ...tab, label: `Featured (${counts.featured})` }
        if (tab.id === 'all') return { ...tab, label: `All (${counts.all})` }
        if (tab.id === 'ml-ai') return { ...tab, label: `ML / AI (${counts.ml})` }
        if (tab.id === 'bio') return { ...tab, label: `Bio (${counts.bio})` }
        if (tab.id === 'school') return { ...tab, label: `School (${counts.school})` }
        if (tab.id === 'web') return { ...tab, label: `Mobile & Web (${counts.web})` }
        return tab
      }),
    [counts]
  )

  const filteredAndSorted = useMemo(() => {
    let filtered =
      activeTab === 'featured'
        ? projects.filter((p) => p.featured)
        : activeTab === 'all'
        ? projects
        : projects.filter((p) => projectInCategory(p, activeTab))

    if (sortBy === 'featured') {
      filtered = [...filtered].sort((a, b) => {
        if (a.featured === b.featured) {
          return (b.yearValue || 0) - (a.yearValue || 0)
        }
        return a.featured ? -1 : 1
      })
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => (b.yearValue || 0) - (a.yearValue || 0))
    } else if (sortBy === 'alpha') {
      filtered = [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    }

    return filtered
  }, [activeTab, projects, sortBy])

  useEffect(() => {
    document.title = 'Projects | Zachary Gameiro'
  }, [])

  const setTabButtonRef = useCallback((tabId, node) => {
    if (node) {
      tabButtonRefs.current[tabId] = node
      return
    }
    delete tabButtonRefs.current[tabId]
  }, [])

  const updateActivePill = useCallback(() => {
    const activeButton = tabButtonRefs.current[activeTab]
    const tabListEl = tabListRef.current
    if (!activeButton || !tabListEl) return

    setActivePillStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
      ready: true
    })
  }, [activeTab])

  const updateTabOverflowIndicators = useCallback(() => {
    const el = tabScrollRef.current
    if (!el) return

    const maxScrollLeft = Math.max(el.scrollWidth - el.clientWidth, 0)
    const hasOverflow = maxScrollLeft > 1
    setTabOverflowState({
      showLeft: hasOverflow && el.scrollLeft > 2,
      showRight: hasOverflow && el.scrollLeft < maxScrollLeft - 2
    })
  }, [])

  useEffect(() => {
    updateTabOverflowIndicators()
    const el = tabScrollRef.current
    if (!el) return

    const handleScrollOrResize = () => updateTabOverflowIndicators()
    el.addEventListener('scroll', handleScrollOrResize, { passive: true })
    window.addEventListener('resize', handleScrollOrResize)

    return () => {
      el.removeEventListener('scroll', handleScrollOrResize)
      window.removeEventListener('resize', handleScrollOrResize)
    }
  }, [tabs.length, updateTabOverflowIndicators])

  useEffect(() => {
    updateActivePill()
    window.addEventListener('resize', updateActivePill)
    return () => window.removeEventListener('resize', updateActivePill)
  }, [tabs, activeTab, updateActivePill])

  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const nextRects = new Map()
    filteredAndSorted.forEach((project) => {
      const el = projectItemRefs.current[project.slug]
      if (!el) return
      nextRects.set(project.slug, el.getBoundingClientRect())
    })

    if (!prefersReducedMotion) {
      filteredAndSorted.forEach((project, index) => {
        const el = projectItemRefs.current[project.slug]
        const nextRect = nextRects.get(project.slug)
        if (!el || !nextRect) return

        const prevRect = previousProjectRectsRef.current.get(project.slug)
        const isExistingProject = Boolean(prevRect)
        const deltaX = isExistingProject ? prevRect.left - nextRect.left : 0
        const deltaY = isExistingProject ? prevRect.top - nextRect.top : 0

        if (isExistingProject && (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5)) {
          el.animate(
            [
              {
                transform: `translate(${deltaX}px, ${deltaY}px) scale(0.985)`,
                opacity: 0.92,
              },
              {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1,
              },
            ],
            {
              duration: 360,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
            }
          )
          return
        }

        if (!isExistingProject) {
          el.animate(
            [
              { transform: 'translateY(10px) scale(0.98)', opacity: 0 },
              { transform: 'translateY(0) scale(1)', opacity: 1 },
            ],
            {
              duration: 260 + Math.min(index, 6) * 20,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
            }
          )
        }
      })
    }

    previousProjectRectsRef.current = nextRects
  }, [filteredAndSorted])

  const setProjectItemRef = useCallback((slug, node) => {
    if (node) {
      projectItemRefs.current[slug] = node
      return
    }
    delete projectItemRefs.current[slug]
  }, [])

  const handleTabChange = (tabId) => {
    const nextParams = new URLSearchParams(searchParams)
    if (tabId === 'featured') {
      nextParams.delete('tab')
    } else {
      nextParams.set('tab', tabId)
    }
    setSearchParams(nextParams)
  }

  const handleSortChange = (sortId) => {
    const nextParams = new URLSearchParams(searchParams)
    if (sortId === 'featured') {
      nextParams.delete('sort')
    } else {
      nextParams.set('sort', sortId)
    }
    setSearchParams(nextParams)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
      <p className="mt-2 text-slate-600">
        Selected work. Full stack, ML, and embedded.
      </p>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        Last updated: {PROJECTS_LAST_UPDATED}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="w-full sm:w-auto">
          <div className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:w-auto">
            <div
              ref={tabScrollRef}
              className="overflow-x-auto p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible"
            >
              <div
                ref={tabListRef}
                className="relative inline-flex min-w-max gap-1"
                role="tablist"
                aria-label="Filter projects"
              >
                <div
                  className={`pointer-events-none absolute top-0 z-0 h-full rounded-md shadow-sm transition-[transform,width,background-color,opacity] duration-300 ease-out ${TAB_ACTIVE_BG_CLASS[activeTab] || 'bg-slate-900'} ${
                    activePillStyle.ready ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    width: `${activePillStyle.width}px`,
                    transform: `translateX(${activePillStyle.left}px)`
                  }}
                  aria-hidden
                />
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    ref={(node) => setTabButtonRef(tab.id, node)}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls="projects-grid"
                    id={`tab-${tab.id}`}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative z-10 shrink-0 rounded-md px-3 py-1.5 text-xs font-medium will-change-transform transition-[transform,color,background-color] duration-150 [transition-timing-function:cubic-bezier(0.22,1.4,0.36,1)] active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100 ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-white/95 via-white/70 to-transparent backdrop-blur-[1px] transition-opacity duration-200 sm:hidden ${
                tabOverflowState.showLeft ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-white/95 via-white/70 to-transparent backdrop-blur-[1px] transition-opacity duration-200 sm:hidden ${
                tabOverflowState.showRight ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute left-1.5 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/70 bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur-sm transition-opacity duration-200 sm:hidden ${
                tabOverflowState.showLeft ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            >
              ←
            </div>
            <div
              className={`pointer-events-none absolute right-1.5 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/70 bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur-sm transition-opacity duration-200 sm:hidden ${
                tabOverflowState.showRight ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            >
              →
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-projects" className="text-xs font-medium text-slate-500">
            Sort
          </label>
          <select
            id="sort-projects"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-300"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul
        id="projects-grid"
        className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-3"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {filteredAndSorted.map((project) => (
          <li
            key={project.slug}
            ref={(node) => setProjectItemRef(project.slug, node)}
            className="will-change-transform"
          >
            <ProjectCard project={project} listSearch={listSearch} />
          </li>
        ))}
      </ul>

      {filteredAndSorted.length === 0 && (
        <p className="mt-8 text-slate-500">No projects in this category yet.</p>
      )}
    </div>
  )
}
