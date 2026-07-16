/**
 * Build: bake published Sanity copy into the static HTML.
 *
 * Fallback law: the copy already in index.html is the complete default.
 * Every field is merged per-field — a missing, empty, or non-string CMS
 * value keeps the baked text. If the fetch fails entirely, the site ships
 * exactly as authored. A half-filled CMS can never break the page.
 */
import {readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync} from 'node:fs'

const PROJECT_ID = 'd6g29ei2'
const DATASET = 'production'
const API = `https://${PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_id=="siteCopy"][0]')}`

// re-applies the red bold phrase in the "What We Do" intro after a CMS edit
const STRONG_WORDS = ['Strategic &amp; Executive Management Services']
const STRONG_FIELDS = new Set(['whatWeDoIntro'])
const STRONG_ATTR = ' style="color:var(--red)"'

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const ASSETS = [
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-192x192.png',
  'favicon-512.png',
  'favicon.ico',
  'favicon.svg',
  'freedomlogo-dark.svg',
  'freedomlogo.svg',
  'newlogo.svg',
  'og-image.png',
  'robots.txt',
  'sitemap.xml',
  'preview.js',
]

let copy = {}
try {
  const res = await fetch(API)
  if (res.ok) copy = (await res.json()).result ?? {}
  else console.warn(`sanity fetch ${res.status} — building with baked defaults`)
} catch (e) {
  console.warn(`sanity unreachable (${e.message}) — building with baked defaults`)
}

let html = readFileSync('index.html', 'utf8')
let applied = 0
let kept = 0

html = html.replace(
  /(<([a-z0-9]+)\b[^>]*data-copy="([a-zA-Z0-9]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
  (whole, open, tag, field, inner, close) => {
    const val = copy[field]
    if (typeof val !== 'string' || val.trim() === '') { kept++; return whole }
    let out = esc(val)
    if (STRONG_FIELDS.has(field)) {
      for (const w of STRONG_WORDS) out = out.replace(w, `<strong${STRONG_ATTR}>${w}</strong>`)
    }
    applied++
    return open + out + close
  },
)

// mailto target follows the contact email field
if (typeof copy.contactEmail === 'string' && copy.contactEmail.includes('@')) {
  html = html.replace(
    /(<a\b[^>]*data-copy-mailto[^>]*href=")mailto:[^"]*(")/g,
    `$1mailto:${esc(copy.contactEmail)}$2`,
  )
  html = html.replace(
    /(<a\b[^>]*href=")mailto:[^"]*("[^>]*data-copy-mailto)/g,
    `$1mailto:${esc(copy.contactEmail)}$2`,
  )
}

rmSync('dist', {recursive: true, force: true})
mkdirSync('dist')
writeFileSync('dist/index.html', html)
for (const f of ASSETS) {
  if (existsSync(f)) cpSync(f, `dist/${f}`)
}

console.log(`built dist/ — ${applied} fields from Sanity, ${kept} kept baked defaults`)
