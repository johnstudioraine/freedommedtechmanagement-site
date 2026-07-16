import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SITE_URL = 'https://freedommedtechmanagement.com'

export default defineConfig({
  name: 'default',
  title: 'Freedom MedTech Management',
  projectId: 'd6g29ei2',
  dataset: 'production',
  plugins: [
    presentationTool({
      title: 'Edit the site',
      previewUrl: {origin: SITE_URL, preview: '/'},
    }),
    structureTool({
      title: 'All content',
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Copy')
              .id('siteCopy')
              .child(S.document().schemaType('siteCopy').documentId('siteCopy')),
          ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: () => [],
  },
})
