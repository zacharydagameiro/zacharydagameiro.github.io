import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import aboutData from '../data/about.json'
import projectsData from '../data/projects'
import Footer from './Footer'
import { resolveAssetUrl } from '../utils/assetUrl'

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileNavMounted, setMobileNavMounted] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const projectCount = projectsData.length
  const desktopNavRef = useRef(null)
  const desktopLinkRefs = useRef([])
  const [desktopIndicatorStyle, setDesktopIndicatorStyle] = useState(null)
  const desktopNavItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: `Projects (${projectCount})`, to: '/projects' },
    { label: 'Resumes', to: '/resumes' },
  ]
  const activeDesktopIndex = desktopNavItems.findIndex((item) => {
    if (item.to === '/') return location.pathname === '/'
    return location.pathname.startsWith(item.to)
  })
  const desktopNavClass = ({ isActive }) =>
    [
      'relative z-10 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-out',
      'active:scale-95',
      isActive
        ? 'text-white hover:text-white hover:scale-[1.03]'
        : 'text-slate-600 hover:-translate-y-0.5 hover:bg-white/70 hover:text-slate-900',
    ].join(' ')
  const mobileNavClass = ({ isActive }) =>
    `transition ${isActive ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'}`
  const { name, profileImageUrl } = aboutData
  const resolvedProfileImageUrl = resolveAssetUrl(profileImageUrl)

  const updateDesktopIndicator = () => {
    if (activeDesktopIndex < 0) return
    const nav = desktopNavRef.current
    const activeLink = desktopLinkRefs.current[activeDesktopIndex]
    if (!nav || !activeLink) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    setDesktopIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    })
  }

  const openMobileNav = () => {
    setMobileNavMounted(true)
    requestAnimationFrame(() => setMobileNavOpen(true))
  }

  const closeMobileNav = () => setMobileNavOpen(false)

  const navigateToProjectsTarget = (event, shouldCloseMobile = false) => {
    event.preventDefault()
    navigate('/projects')
    if (shouldCloseMobile) closeMobileNav()
  }

  useEffect(() => {
    if (!mobileNavMounted || mobileNavOpen) return
    const timeoutId = window.setTimeout(() => setMobileNavMounted(false), 220)
    return () => window.clearTimeout(timeoutId)
  }, [mobileNavMounted, mobileNavOpen])

  useLayoutEffect(() => {
    updateDesktopIndicator()
  }, [activeDesktopIndex, location.pathname])

  useEffect(() => {
    const handleResize = () => updateDesktopIndicator()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeDesktopIndex, location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold text-slate-800 transition hover:text-slate-600"
          >
            {resolvedProfileImageUrl && (
              <img
                src={resolvedProfileImageUrl}
                alt=""
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              />
            )}
            <span>{name || 'Zachary Gameiro'}</span>
          </Link>

          <div
            ref={desktopNavRef}
            className="relative hidden items-center rounded-full border border-slate-200 bg-slate-100/85 p-1 shadow-sm md:flex"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-slate-900 shadow-sm transition-all duration-300 ease-out"
              style={
                desktopIndicatorStyle
                  ? {
                      width: `${desktopIndicatorStyle.width}px`,
                      transform: `translateX(${desktopIndicatorStyle.left}px)`,
                    }
                  : { opacity: 0 }
              }
            />
            {desktopNavItems.map((item, index) => (
              <NavLink
                key={item.to}
                ref={(node) => {
                  desktopLinkRefs.current[index] = node
                }}
                to={item.to}
                end={item.to === '/'}
                className={desktopNavClass}
                onClick={item.to === '/projects' ? (event) => navigateToProjectsTarget(event) : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-transform duration-150 hover:bg-slate-50 active:scale-95 md:hidden"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
          >
            <span className="sr-only">Open navigation menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </nav>
      </header>

      {mobileNavMounted && (
        <div className="fixed inset-0 z-30 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] transition-opacity duration-200 ${
              mobileNavOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
          />
          <div
            className={`absolute right-0 top-0 flex h-full w-64 max-w-[80%] flex-col bg-white shadow-xl transition-transform duration-200 ease-out ${
              mobileNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="text-sm font-semibold text-slate-800">Menu</span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-1.5 text-slate-700 transition-transform duration-150 hover:bg-slate-50 hover:rotate-90 active:scale-90"
                onClick={closeMobileNav}
                aria-label="Close navigation menu"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-4 text-sm">
              <NavLink
                to="/"
                end
                className={mobileNavClass}
                onClick={closeMobileNav}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={mobileNavClass}
                onClick={closeMobileNav}
              >
                About
              </NavLink>
              <NavLink
                to="/projects"
                className={mobileNavClass}
                onClick={(event) => navigateToProjectsTarget(event, true)}
              >
                {`Projects (${projectCount})`}
              </NavLink>
              <div className="mt-auto border-t border-slate-200 pt-4">
                <Link
                  to="/resumes"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-transform duration-150 hover:bg-slate-800 active:scale-[0.98]"
                  onClick={closeMobileNav}
                >
                  Resumes
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
