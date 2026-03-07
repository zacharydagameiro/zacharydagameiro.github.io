import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import projectsData from '../data/projects'
import aboutData from '../data/about.json'
import HomeSidebar from '../components/HomeSidebar'
import ExperienceTimelineList from '../components/ExperienceTimelineList.jsx'
import ProjectCard from '../components/ProjectCard'
import Modal from '../components/Modal.jsx'
import { resolveAssetUrl } from '../utils/assetUrl'

function SectionIcon({ type, className = 'h-5 w-5' }) {
  const c = className
  if (type === 'education') {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-3.75 11.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      </svg>
    )
  }
  if (type === 'experience') {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    )
  }
  if (type === 'featured') {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
      </svg>
    )
  }
  return null
}

const featured = projectsData.filter((p) => p.featured)
const education = aboutData.education || []
const experience = aboutData.experience || []

const DEFAULT_TITLE = 'Zachary Gameiro — CS Portfolio'

export default function Home() {
  useEffect(() => {
    document.title = DEFAULT_TITLE
  }, [])

  const [selectedEducation, setSelectedEducation] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)

  const handleEducationClick = (item) => {
    setSelectedExperience(null)
    setSelectedEducation(item)
  }

  const closeEducationModal = () => {
    setSelectedEducation(null)
  }

  const handleExperienceClick = (item) => {
    setSelectedEducation(null)
    setSelectedExperience(item)
  }

  const closeExperienceModal = () => {
    setSelectedExperience(null)
  }
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/35 via-sky-100/20 to-transparent blur-3xl" />
        <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-full bg-gradient-to-bl from-cyan-200/25 via-emerald-100/15 to-transparent blur-3xl" />

        <svg
          className="absolute -right-6 top-24 hidden h-[30rem] w-[16rem] text-emerald-500/15 lg:block"
          viewBox="0 0 260 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80 20C170 80 170 140 80 200C-10 260 -10 320 80 380C170 440 170 500 80 500"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M180 20C90 80 90 140 180 200C270 260 270 320 180 380C90 440 90 500 180 500"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M104 56H156M92 112H168M86 168H174M92 224H168M106 280H154M94 336H166M88 392H172M96 448H164"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_288px]">
      <div className="space-y-16 min-w-0">
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hi, I'm {aboutData.name || 'Zachary Gameiro'}
          </h1>
          {aboutData.tagline && (
            <p className="mt-2 text-lg text-slate-600 max-w-2xl">
              {aboutData.tagline}
            </p>
          )}
          <p className="mt-4 text-slate-600 max-w-2xl">
            Here you'll find a selection of projects — coursework, side projects, and experiments.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              View all projects
            </Link>
            {aboutData.contact?.github && (
              <a
                href={aboutData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5a12 12 0 0 0-3.79 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.24 1.86 1.24 1.08 1.85 2.84 1.31 3.54 1 .11-.79.43-1.31.78-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.37 1.24-3.2-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.31 1.22a11.6 11.6 0 0 1 6.02 0c2.3-1.54 3.31-1.22 3.31-1.22.66 1.64.24 2.86.12 3.16.77.83 1.24 1.89 1.24 3.2 0 4.61-2.81 5.62-5.49 5.92.44.38.82 1.11.82 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="border-l-0 pl-0 sm:border-l-4 sm:border-l-blue-600 sm:pl-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <SectionIcon type="featured" className="h-5 w-5 text-blue-600" />
              Featured projects
            </h2>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2">
              {featured.map((project) => (
                <li key={project.slug} className="min-w-0">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
            <Link
              to="/projects"
              className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              View all projects →
            </Link>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <SectionIcon type="experience" className="h-5 w-5 text-emerald-600" />
              Experience
            </h2>
            <ExperienceTimelineList items={experience.slice(0, 2)} onItemClick={handleExperienceClick} />
            <Link
              to="/about#experience"
              className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              View all experience →
            </Link>
          </section>
        )}
      </div>

      <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <HomeSidebar about={aboutData} />
        {education.length > 0 && (
          <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
              <SectionIcon type="education" className="h-4 w-4 text-slate-500" />
              Education
            </h2>
            <ul className="mt-4 space-y-4">
              {education.map((item, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleEducationClick(item)}
                    className="group w-full text-left border-l-2 border-l-blue-500 pl-3 transition hover:border-l-blue-600 hover:bg-slate-50 rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <div className="flex items-start gap-2.5">
                      {item.logoUrl && (
                        <img
                          src={resolveAssetUrl(item.logoUrl)}
                          alt={`${item.school} logo`}
                          className="mt-0.5 h-8 w-8 shrink-0 rounded-md border border-slate-200 bg-white object-contain p-1"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="flex items-center justify-between gap-2 font-semibold text-slate-900 text-sm">
                          <span className="truncate">{item.school}</span>
                          <span
                            aria-hidden
                            className="shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-600"
                          >
                            →
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600">
                          {item.degree}
                          {item.year ? ` · ${item.year}` : ''}
                        </p>
                        {(item.summary || item.details) && (
                          <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                            {item.summary ||
                              (item.details &&
                                item.details.slice(0, 80) + (item.details.length > 80 ? '…' : ''))}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-3 inline-block text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Full education on About →
            </Link>
          </aside>
        )}
      </div>
      </div>
      <Modal
        isOpen={!!selectedEducation}
        onClose={closeEducationModal}
        title={selectedEducation?.school}
        maxWidthClass="max-w-2xl"
      >
        {selectedEducation && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {selectedEducation.logoUrl && (
                <img
                  src={resolveAssetUrl(selectedEducation.logoUrl)}
                  alt={`${selectedEducation.school} logo`}
                  className="h-12 w-12 shrink-0 rounded-md border border-slate-200 bg-white object-contain p-1"
                />
              )}
              <p className="pt-1 text-sm font-medium text-slate-900">{selectedEducation.degree}</p>
            </div>

            {(selectedEducation.dates || selectedEducation.year || selectedEducation.location || selectedEducation.program) && (
              <dl className="grid gap-3 sm:grid-cols-2">
                {(selectedEducation.dates || selectedEducation.year) && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
                    <dt className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-slate-500">Timeline</dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-slate-800">{selectedEducation.dates || selectedEducation.year}</dd>
                  </div>
                )}
                {selectedEducation.location && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
                    <dt className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-slate-500">Location</dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-slate-800">{selectedEducation.location}</dd>
                  </div>
                )}
                {selectedEducation.program && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 sm:col-span-2">
                    <dt className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-slate-500">Program</dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-slate-800">{selectedEducation.program}</dd>
                  </div>
                )}
              </dl>
            )}

            {selectedEducation.details && (
              <p className="border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {selectedEducation.details}
              </p>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedExperience}
        onClose={closeExperienceModal}
        title={selectedExperience ? `${selectedExperience.title} · ${selectedExperience.company}` : undefined}
      >
        {selectedExperience && (
          <div className="space-y-3">
            {selectedExperience.logoUrl && (
              <img
                src={resolveAssetUrl(selectedExperience.logoUrl)}
                alt={`${selectedExperience.company} logo`}
                className="h-12 w-12 rounded-md border border-slate-200 bg-white object-contain p-1"
              />
            )}
            {selectedExperience.dates && (
              <p className="text-sm font-medium text-slate-600">{selectedExperience.dates}</p>
            )}
            {selectedExperience.description && (
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {selectedExperience.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
