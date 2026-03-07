import { useMemo } from 'react'
import ProfileSidebarCore from './sidebar/ProfileSidebarCore'
import { normalizeSidebarData } from '../utils/sidebarData'

export default function HomeSidebar({ about }) {
  const sidebarData = useMemo(() => normalizeSidebarData(about), [about])

  return (
    <ProfileSidebarCore
      about={sidebarData}
      sections={{
        profile: true,
        contact: true,
        links: true,
        location: true,
        languages: false,
        resumes: true,
        skills: false,
      }}
    />
  )
}
