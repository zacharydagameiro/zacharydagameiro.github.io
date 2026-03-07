import projectOrder from './projectOrder.json'

const metadataModules = import.meta.glob('../content/projects/*/metadata.json', {
  eager: true,
  import: 'default',
})

const contentModules = import.meta.glob('../content/projects/*/content.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})
 
const getSlugFromPath = (path) => {
  const match = path.match(/\/projects\/([^/]+)\/[^/]+$/)
  return match ? match[1] : null
}

const metadataBySlug = Object.fromEntries(
  Object.entries(metadataModules)
    .map(([path, metadata]) => [getSlugFromPath(path), metadata])
    .filter(([slug]) => Boolean(slug))
)

const contentBySlug = Object.fromEntries(
  Object.entries(contentModules)
    .map(([path, content]) => [getSlugFromPath(path), content])
    .filter(([slug]) => Boolean(slug))
)

const projects = projectOrder.map((slug) => {
  const metadata = metadataBySlug[slug]

  if (!metadata) {
    throw new Error(`Missing metadata for project slug "${slug}"`)
  }

  return {
    slug,
    ...metadata,
    content: typeof contentBySlug[slug] === 'string' ? contentBySlug[slug] : '',
  }
})

export default projects
