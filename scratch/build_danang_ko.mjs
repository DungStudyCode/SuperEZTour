import fs from 'fs';
import { DA_NANG_CONFIG } from '../src/features/destinations/data/da-nang.config.js';

// We want ko.json to contain exactly the user-facing text of DA_NANG_CONFIG
const ko = {
  name: DA_NANG_CONFIG.name,
  nameKr: DA_NANG_CONFIG.nameKr,
  country: DA_NANG_CONFIG.country,
  countryKr: DA_NANG_CONFIG.countryKr,
  region: DA_NANG_CONFIG.region,
  regionKr: DA_NANG_CONFIG.regionKr,
  tagline: DA_NANG_CONFIG.tagline,
  subTagline: DA_NANG_CONFIG.subTagline,
  description: DA_NANG_CONFIG.description,
  hero: {
    badge: DA_NANG_CONFIG.hero.badge,
    badgeSecondary: DA_NANG_CONFIG.hero.badgeSecondary,
    title: DA_NANG_CONFIG.hero.title,
    subtitle: DA_NANG_CONFIG.hero.subtitle,
    headline: DA_NANG_CONFIG.hero.headline,
    description: DA_NANG_CONFIG.hero.description,
    ctaPrimary: DA_NANG_CONFIG.hero.ctaPrimary,
    ctaGhost: DA_NANG_CONFIG.hero.ctaGhost,
    quickStats: DA_NANG_CONFIG.hero.quickStats.map(s => ({
      label: s.label,
      value: s.value
    })),
    scrollPrompt: {
      title: DA_NANG_CONFIG.hero.scrollPrompt.title,
      action: DA_NANG_CONFIG.hero.scrollPrompt.action
    }
  },
  intro: {
    kicker: DA_NANG_CONFIG.intro.kicker,
    title: DA_NANG_CONFIG.intro.title,
    lead: DA_NANG_CONFIG.intro.lead,
    paragraphs: DA_NANG_CONFIG.intro.paragraphs,
    features: DA_NANG_CONFIG.intro.features,
    hudBadge: DA_NANG_CONFIG.intro.hudBadge,
    hudTitle: DA_NANG_CONFIG.intro.hudTitle,
    hudCaption: DA_NANG_CONFIG.intro.hudCaption,
    hudAltitudeLabel: DA_NANG_CONFIG.intro.hudAltitudeLabel,
    hudLengthLabel: DA_NANG_CONFIG.intro.hudLengthLabel,
    hudArchLabel: DA_NANG_CONFIG.intro.hudArchLabel
  },
  ecosystem: {
    services: DA_NANG_CONFIG.ecosystem.services.map(s => ({
      id: s.id,
      number: s.number,
      title: s.title,
      titleEn: s.titleEn,
      desc: s.desc
    })),
    scrollHint: DA_NANG_CONFIG.ecosystem.scrollHint,
    ctaDetail: DA_NANG_CONFIG.ecosystem.ctaDetail
  },
  accommodation: {
    title: DA_NANG_CONFIG.accommodation.title,
    description: DA_NANG_CONFIG.accommodation.description,
    allLabel: DA_NANG_CONFIG.accommodation.allLabel,
    btnChosen: DA_NANG_CONFIG.accommodation.btnChosen,
    btnSelect: DA_NANG_CONFIG.accommodation.btnSelect,
    categories: DA_NANG_CONFIG.accommodation.categories,
    items: DA_NANG_CONFIG.accommodation.items.map(item => ({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      location: item.location,
      badge: item.badge,
      perks: item.perks,
      description: item.description
    }))
  },
  localGuide: {
    badgeExpert: DA_NANG_CONFIG.localGuide.badgeExpert,
    badgeCommitment: DA_NANG_CONFIG.localGuide.badgeCommitment,
    lead: DA_NANG_CONFIG.localGuide.lead,
    quote: DA_NANG_CONFIG.localGuide.quote,
    ctaRequest: DA_NANG_CONFIG.localGuide.ctaRequest,
    pillars: DA_NANG_CONFIG.localGuide.pillars.map(p => ({
      title: p.title,
      desc: p.desc
    }))
  },
  flights: {
    hubName: DA_NANG_CONFIG.flights.hubName,
    subtitle: DA_NANG_CONFIG.flights.subtitle,
    directBadge: DA_NANG_CONFIG.flights.directBadge,
    domesticTag: DA_NANG_CONFIG.flights.domesticTag,
    domesticTitle: DA_NANG_CONFIG.flights.domesticTitle,
    intlTag: DA_NANG_CONFIG.flights.intlTag,
    intlTitle: DA_NANG_CONFIG.flights.intlTitle,
    ctaConsult: DA_NANG_CONFIG.flights.ctaConsult,
    perkBar: DA_NANG_CONFIG.flights.perkBar,
    domesticRoutes: DA_NANG_CONFIG.flights.domesticRoutes.map(r => ({
      from: r.from,
      to: r.to,
      time: r.time,
      frequency: r.frequency
    })),
    intlRoutes: DA_NANG_CONFIG.flights.intlRoutes.map(r => ({
      from: r.from,
      to: r.to,
      time: r.time,
      direct: r.direct
    }))
  },
  transportation: {
    badgeMaintenance: DA_NANG_CONFIG.transportation.badgeMaintenance,
    modelCodeLabel: DA_NANG_CONFIG.transportation.modelCodeLabel,
    seatsLabel: DA_NANG_CONFIG.transportation.seatsLabel,
    luggageLabel: DA_NANG_CONFIG.transportation.luggageLabel,
    featuresHeading: DA_NANG_CONFIG.transportation.featuresHeading,
    idealBadge: DA_NANG_CONFIG.transportation.idealBadge,
    btnSelected: DA_NANG_CONFIG.transportation.btnSelected,
    btnSelect: DA_NANG_CONFIG.transportation.btnSelect,
    vehicles: DA_NANG_CONFIG.transportation.vehicles.map(v => ({
      id: v.id,
      name: v.name,
      subtitle: v.subtitle,
      tag: v.tag,
      description: v.description,
      features: v.features,
      idealFor: v.idealFor
    }))
  },
  attractions: {
    kicker: DA_NANG_CONFIG.attractions.kicker,
    title: DA_NANG_CONFIG.attractions.title,
    atlasName: DA_NANG_CONFIG.attractions.atlasName,
    cartPrefix: DA_NANG_CONFIG.attractions.cartPrefix,
    cartSuffix: DA_NANG_CONFIG.attractions.cartSuffix,
    resetViewText: DA_NANG_CONFIG.attractions.resetViewText,
    btnInCart: DA_NANG_CONFIG.attractions.btnInCart,
    btnAdd: DA_NANG_CONFIG.attractions.btnAdd,
    disclaimer: DA_NANG_CONFIG.attractions.disclaimer,
    items: DA_NANG_CONFIG.attractions.items.map(item => ({
      id: item.id,
      name: item.name,
      categoryName: item.categoryName,
      badge: item.badge,
      desc: item.desc,
      tags: item.tags
    }))
  },
  culinary: {
    kicker: DA_NANG_CONFIG.culinary.kicker,
    title: DA_NANG_CONFIG.culinary.title,
    badgeText: DA_NANG_CONFIG.culinary.badgeText,
    highlightsLabel: DA_NANG_CONFIG.culinary.highlightsLabel,
    btnChosen: DA_NANG_CONFIG.culinary.btnChosen,
    btnAdd: DA_NANG_CONFIG.culinary.btnAdd,
    items: DA_NANG_CONFIG.culinary.items.map(item => ({
      id: item.id,
      title: item.title,
      origin: item.origin,
      badge: item.badge,
      desc: item.desc,
      highlights: item.highlights
    }))
  },
  privateValues: {
    kicker: DA_NANG_CONFIG.privateValues.kicker,
    title: DA_NANG_CONFIG.privateValues.title,
    subtitle: DA_NANG_CONFIG.privateValues.subtitle,
    items: DA_NANG_CONFIG.privateValues.items.map(pv => ({
      number: pv.number,
      title: pv.title,
      desc: pv.desc
    }))
  },
  itineraries: DA_NANG_CONFIG.itineraries.map(it => ({
    id: it.id,
    label: it.label,
    daysCount: it.daysCount,
    title: it.title,
    overview: it.overview,
    days: it.days.map(d => ({
      day: d.day,
      title: d.title,
      locationTag: d.locationTag,
      highlights: d.highlights
    }))
  })),
  customerStoriesTitle: DA_NANG_CONFIG.customerStoriesTitle,
  customerStoriesSub: DA_NANG_CONFIG.customerStoriesSub,
  customerStories: DA_NANG_CONFIG.customerStories.map(cs => ({
    id: cs.id,
    author: cs.author,
    origin: cs.origin,
    groupStyle: cs.groupStyle,
    tripDate: cs.tripDate,
    quote: cs.quote
  })),
  finalCta: {
    kicker: DA_NANG_CONFIG.finalCta.kicker,
    title: DA_NANG_CONFIG.finalCta.title,
    subtitle: DA_NANG_CONFIG.finalCta.subtitle,
    description: DA_NANG_CONFIG.finalCta.description,
    ctaText: DA_NANG_CONFIG.finalCta.ctaText,
    ctaSecondaryText: DA_NANG_CONFIG.finalCta.ctaSecondaryText
  }
};

fs.writeFileSync('src/locales/destinations/da-nang/ko.json', JSON.stringify(ko, null, 2), 'utf8');
console.log('Regenerated src/locales/destinations/da-nang/ko.json with exact schema match!');
