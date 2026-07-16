/**
 * Visual editing runtime — only activates inside Sanity's Presentation tool
 * (or with ?sanity-preview for manual testing). Production visitors never
 * execute anything past the first line.
 *
 * Draft content streams from the Studio itself via @sanity/core-loader's
 * live mode (no tokens in the browser); @sanity/visual-editing draws the
 * click-to-edit overlays from stega-encoded strings.
 */
const inPresentation = window.self !== window.top || new URLSearchParams(location.search).has('sanity-preview')
if (inPresentation) {
  const PROJECT_ID = 'd6g29ei2'
  const DATASET = 'production'
  const STUDIO_URL = 'https://freedommedtechmanagement.sanity.studio'
  const QUERY = '*[_id=="siteCopy"][0]'

  const STRONG_WORDS = ['Strategic &amp; Executive Management Services']
  const STRONG_FIELDS = new Set(['whatWeDoIntro'])
  const STRONG_ATTR = ' style="color:var(--red)"'

  Promise.all([
    import('https://esm.sh/@sanity/client@7?bundle'),
    import('https://esm.sh/@sanity/core-loader@1?bundle'),
    import('https://esm.sh/@sanity/visual-editing@3?bundle'),
  ]).then(([{createClient}, {createQueryStore}, {enableVisualEditing}]) => {
    const client = createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: '2025-01-01',
      useCdn: false,
      perspective: 'published',
      stega: {enabled: true, studioUrl: STUDIO_URL},
    })

    const store = createQueryStore({client})
    store.enableLiveMode({client})

    const apply = (copy) => {
      if (!copy) return
      document.querySelectorAll('[data-copy]').forEach((el) => {
        const field = el.getAttribute('data-copy')
        const val = copy[field]
        if (typeof val !== 'string' || val.trim() === '') return
        if (STRONG_FIELDS.has(field)) {
          let html = val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          for (const w of STRONG_WORDS) html = html.replace(w, `<strong${STRONG_ATTR}>${w}</strong>`)
          el.innerHTML = html
        } else {
          el.textContent = val
        }
      })
      if (typeof copy.contactEmail === 'string' && copy.contactEmail.includes('@')) {
        document.querySelectorAll('a[data-copy-mailto]').forEach((a) => {
          a.href = `mailto:${copy.contactEmail}`
        })
      }
    }

    const {subscribe} = store.createFetcherStore(QUERY, {})
    subscribe((snapshot) => {
      if (snapshot?.data) apply(snapshot.data)
    })

    enableVisualEditing()
  }).catch((err) => console.warn('[preview] visual editing failed to load:', err))
}
