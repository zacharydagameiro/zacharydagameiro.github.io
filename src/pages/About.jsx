import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import aboutData from '../data/about.json'
import aboutMarkdown from '../content/about.md?raw'
import Modal from '../components/Modal.jsx'
import MarkdownContent from '../components/MarkdownContent.jsx'
import ExperienceTimelineList from '../components/ExperienceTimelineList.jsx'
import SidebarCard from '../components/sidebar/SidebarCard'
import ProfileSidebarCore from '../components/sidebar/ProfileSidebarCore'
import { ABOUT_LAST_UPDATED } from '../data/siteMeta'
import { resolveAssetUrl } from '../utils/assetUrl'
import { getResumes } from '../utils/resumes'
import { normalizeSidebarData } from '../utils/sidebarData'

const education = aboutData.education || []
const experience = aboutData.experience || []

export default function About() {
  useEffect(() => {
    document.title = 'About | Zachary Gameiro'
  }, [])

  const [selectedEducation, setSelectedEducation] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)

  const handleEducationClick = (item) => setSelectedEducation(item)
  const closeEducationModal = () => setSelectedEducation(null)

  const handleExperienceClick = (item) => setSelectedExperience(item)
  const closeExperienceModal = () => setSelectedExperience(null)

  // Sidebar info (safe defaults so it never breaks if fields are missing)
  const contact = aboutData.contact || {}
  const sidebarData = useMemo(() => {
    const normalized = normalizeSidebarData(aboutData)
    return {
      ...normalized,
      taglineSecondary: education?.[0]?.degree || 'Bachelor of Science',
    }
  }, [])

  const resumes = useMemo(() => {
    return getResumes()
  }, [])

  const quickFacts = useMemo(() => {
    // Optional fields you can add to about.json:
    // aboutData.quickFacts = [{ label, value }, ...]
    // aboutData.focusAreas = ["Systems", "Applied ML", ...]
    const facts = []

    if (Array.isArray(aboutData.quickFacts)) {
      aboutData.quickFacts.forEach((f) => {
        if (f?.label && f?.value) facts.push({ label: f.label, value: f.value })
      })
    }

    if (Array.isArray(aboutData.focusAreas) && aboutData.focusAreas.length) {
      facts.push({ label: 'Focus', value: aboutData.focusAreas.join(', ') })
    }

    // fallback: show degree/school if present in top education item
    const topEdu = education?.[0]
    if (!facts.length && topEdu?.school) {
      facts.push({ label: 'School', value: topEdu.school })
      if (topEdu?.year) facts.push({ label: 'Grad', value: topEdu.year })
    }

    return facts
  }, [])

  return (
    <div>
      {/* Page header (matches the home page “left column” vibe) */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">About</h1>
        {aboutData.tagline && <p className="mt-2 text-slate-600">{aboutData.tagline}</p>}
        <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
          Last updated: {ABOUT_LAST_UPDATED}
        </p>
      </section>

      {/* Two-column layout like Home */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_288px]">
        {/* Main column */}
        <main className="space-y-10">
          {/* Bio */}
          {aboutMarkdown.trim().length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <MarkdownContent markdown={aboutMarkdown} />
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  🎓
                </span>
                <h2 className="text-base font-semibold text-slate-900">Education</h2>
              </div>

              <ul className="relative mt-5 space-y-4 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-slate-200">
                {education.map((item, i) => (
                  <li key={i} className="relative pl-12">
                    <span
                      className="absolute left-[13px] top-5 z-10 h-4 w-4 rounded-full border-4 border-white bg-slate-400 shadow-sm"
                      aria-hidden
                    />
                    <button
                      type="button"
                      onClick={() => handleEducationClick(item)}
                      className="group w-full text-left rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                    >
                      <div className="flex items-start gap-3">
                        {item.logoUrl && (
                          <img
                            src={resolveAssetUrl(item.logoUrl)}
                            alt={`${item.school} logo`}
                            className="h-10 w-10 shrink-0 rounded-md border border-slate-200 bg-white object-contain p-1"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            <span className="truncate">{item.school}</span>
                          </p>
                          <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">
                            {item.degree}
                            {item.year ? ` · ${item.year}` : ''}
                          </p>
                          {(item.summary || item.details) && (
                            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed line-clamp-2">
                              {item.summary || item.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section id="experience" className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  💼
                </span>
                <h2 className="text-base font-semibold text-slate-900">Experience</h2>
              </div>

              <ExperienceTimelineList items={experience} onItemClick={handleExperienceClick} />
            </section>
          )}

          {/* Get in touch (kept, but styled like a real section) */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-semibold text-slate-900">Get in touch</h2>
            <p className="mt-3 text-sm text-slate-600">
              {contact?.email ? (
                <>
                  Email me at{' '}
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                    {contact.email}
                  </a>
                  .
                </>
              ) : (
                <>
                  See contact info on the{' '}
                  <Link to="/" className="text-blue-600 hover:underline">
                    homepage
                  </Link>
                  .
                </>
              )}
            </p>

          </section>
        </main>

        {/* Sidebar (non-sticky, standardized with Home core sidebar) */}
        <aside className="space-y-6">
          <ProfileSidebarCore
            about={sidebarData}
            sections={{
              profile: true,
              contact: true,
              links: true,
              location: true,
              languages: true,
              resumes: false,
              skills: false,
            }}
            extraSections={
              <>
                {quickFacts.length > 0 && (
                  <SidebarCard>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick facts</h3>
                    <dl className="mt-2 space-y-1.5 text-sm text-slate-600">
                      {quickFacts.map((fact) => (
                        <div key={fact.label} className="flex items-start justify-between gap-3">
                          <dt className="shrink-0 text-slate-500">{fact.label}</dt>
                          <dd className="text-right font-medium text-slate-900">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </SidebarCard>
                )}

                {resumes.length > 0 && (
                  <SidebarCard>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        📄
                      </span>
                      <h3 className="text-base font-semibold text-slate-900">Resumes</h3>
                    </div>

                    <p className="mt-3 text-sm text-slate-600">Pick the version that fits the role you're targeting.</p>

                    <ul className="mt-4 space-y-3">
                      {resumes.map((resume) => (
                        <li key={resume.name}>
                          <a
                            href={resume.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <span className="truncate font-medium">{resume.title}</span>
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                                PDF
                              </span>
                            </span>
                            <span className="ml-2 text-slate-400" aria-hidden>
                              ↗
                            </span>
                          </a>
                          {resume.description && <p className="mt-1 text-xs text-slate-500">{resume.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </SidebarCard>
                )}
              </>
            }
          />
        </aside>
      </div>

      {/* Modals (unchanged behavior) */}
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
            {selectedExperience.dates && <p className="text-sm font-medium text-slate-600">{selectedExperience.dates}</p>}
            {selectedExperience.description && (
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{selectedExperience.description}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
