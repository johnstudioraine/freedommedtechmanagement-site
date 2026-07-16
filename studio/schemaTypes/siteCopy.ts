import {defineField, defineType} from 'sanity'

const line = (name: string, title: string, group: string) =>
  defineField({name, title, type: 'string', group, validation: (r) => r.required()})

const text = (name: string, title: string, group: string, rows = 3) =>
  defineField({name, title, type: 'text', rows, group, validation: (r) => r.required()})

export const siteCopy = defineType({
  name: 'siteCopy',
  title: 'Site Copy',
  type: 'document',
  groups: [
    {name: 'nav', title: 'Nav', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'whoWeAre', title: 'Who We Are'},
    {name: 'whatWeDo', title: 'What We Do'},
    {name: 'ourRole', title: 'Our Role'},
    {name: 'commitment', title: 'Our Commitment'},
    {name: 'contact', title: 'Contact'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    line('navCtaText', 'Nav button label', 'nav'),

    line('heroHeadline', 'Headline', 'hero'),
    text('heroDescription', 'Subheadline', 'hero', 3),
    line('heroCtaText', 'Button label', 'hero'),

    line('whoWeAreLabel', 'Section label', 'whoWeAre'),
    line('whoWeAreHeadingPart1', 'Heading — line 1', 'whoWeAre'),
    line('whoWeAreHeadingPart2', 'Heading — line 2', 'whoWeAre'),
    text('whoWeAreIntro', 'Intro paragraph', 'whoWeAre', 5),
    line('whoWeAreHighlightTitle', 'Highlight — title', 'whoWeAre'),
    text('whoWeAreHighlightBody', 'Highlight — body', 'whoWeAre', 4),

    line('whatWeDoLabel', 'Section label', 'whatWeDo'),
    line('whatWeDoHeadingPart1', 'Heading — line 1', 'whatWeDo'),
    line('whatWeDoHeadingPart2', 'Heading — line 2', 'whatWeDo'),
    text('whatWeDoIntro', 'Intro paragraph (bolded phrase re-applied automatically)', 'whatWeDo', 4),

    line('serviceCard1Title', 'Card 1 — title', 'whatWeDo'),
    text('serviceCard1Body', 'Card 1 — body', 'whatWeDo', 3),
    line('serviceCard2Title', 'Card 2 — title', 'whatWeDo'),
    text('serviceCard2Body', 'Card 2 — body', 'whatWeDo', 3),
    line('serviceCard3Title', 'Card 3 — title', 'whatWeDo'),
    text('serviceCard3Body', 'Card 3 — body', 'whatWeDo', 3),
    line('serviceCard4Title', 'Card 4 — title', 'whatWeDo'),
    text('serviceCard4Body', 'Card 4 — body', 'whatWeDo', 3),
    line('serviceCard5Title', 'Card 5 — title', 'whatWeDo'),
    text('serviceCard5Body', 'Card 5 — body', 'whatWeDo', 3),
    line('serviceCard6Title', 'Card 6 — title', 'whatWeDo'),
    text('serviceCard6Body', 'Card 6 — body', 'whatWeDo', 3),
    line('serviceCard7Title', 'Card 7 — title', 'whatWeDo'),
    text('serviceCard7Body', 'Card 7 — body', 'whatWeDo', 3),
    line('serviceCard8Title', 'Card 8 — title', 'whatWeDo'),
    text('serviceCard8Body', 'Card 8 — body', 'whatWeDo', 3),

    line('ourRoleLabel', 'Section label', 'ourRole'),
    line('ourRoleHeadingPart1', 'Heading — line 1', 'ourRole'),
    line('ourRoleHeadingPart2', 'Heading — line 2', 'ourRole'),
    text('ourRoleIntro', 'Intro paragraph', 'ourRole', 5),
    line('rolePillar1Title', 'Pillar 1 — title', 'ourRole'),
    text('rolePillar1Body', 'Pillar 1 — body', 'ourRole', 2),
    line('rolePillar2Title', 'Pillar 2 — title', 'ourRole'),
    text('rolePillar2Body', 'Pillar 2 — body', 'ourRole', 2),
    line('rolePillar3Title', 'Pillar 3 — title', 'ourRole'),
    text('rolePillar3Body', 'Pillar 3 — body', 'ourRole', 2),
    text('ourRoleClosing', 'Closing paragraph', 'ourRole', 4),

    line('commitmentLabel', 'Section label', 'commitment'),
    line('commitmentHeading', 'Heading', 'commitment'),
    text('commitmentIntro', 'Intro paragraph', 'commitment', 3),
    text('commitmentBody', 'Body paragraph', 'commitment', 5),
    line('principle1Title', 'Principle 1 — title', 'commitment'),
    text('principle1Body', 'Principle 1 — body', 'commitment', 2),
    line('principle2Title', 'Principle 2 — title', 'commitment'),
    text('principle2Body', 'Principle 2 — body', 'commitment', 2),
    line('principle3Title', 'Principle 3 — title', 'commitment'),
    text('principle3Body', 'Principle 3 — body', 'commitment', 2),

    line('contactLabel', 'Section label', 'contact'),
    line('contactHeadingPart1', 'Heading — line 1', 'contact'),
    line('contactHeadingPart2', 'Heading — line 2', 'contact'),
    line('contactOrgName', 'Org name', 'contact'),
    line('contactCity', 'City', 'contact'),
    defineField({
      name: 'contactEmail',
      title: 'Email address',
      type: 'string',
      group: 'contact',
      validation: (r) => r.required().email(),
    }),

    line('footerTagline', 'Tagline', 'footer'),
    line('footerCopyrightLine', 'Copyright line', 'footer'),
    line('footerCopyrightLocation', 'Location line', 'footer'),
  ],
  preview: {prepare: () => ({title: 'Site Copy'})},
})
