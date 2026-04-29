import type { LangCode } from '@/lang/types'

const normalizeUrl = (value?: string) => {
  const fallback = 'https://diwansuite.com'
  const raw = (value?.trim() || fallback).replace(/\/+$/, '')

  try {
    const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw.replace(/^\/+/, '')}`)
    parsed.protocol = 'https:'
    if (parsed.hostname.toLowerCase() === 'www.diwansuite.com') parsed.hostname = 'diwansuite.com'
    if (parsed.hostname.toLowerCase() === 'diwansuite.com') parsed.host = 'diwansuite.com'
    return parsed.toString().replace(/\/+$/, '')
  } catch {
    return fallback
  }
}

const normalizeEmail = (value: string | undefined, fallback: string) => {
  const normalized = (value?.trim() || fallback).replace(/@{2,}/g, '@').toLowerCase()
  return normalized || fallback
}

const toTitleCase = (value?: string, fallback = '') => {
  const raw = value?.trim() || fallback
  if (!raw) return fallback
  return raw
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

const siteUrl = normalizeUrl(import.meta.env.VITE_SITE_URL)
const phone = import.meta.env.VITE_SITE_PHONE?.trim() || '+966560000934'

export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME?.trim() || 'Diwan Suite',
  arabicName: import.meta.env.VITE_SITE_NAME_AR?.trim() || 'ديوان سويت',
  operatorName: import.meta.env.VITE_OPERATOR_NAME?.trim() || 'Fekra Software Information Technology Establishment',
  tagline: 'Board Governance',
  taglineAr: 'حوكمة مجالس الإدارة',
  url: siteUrl,
  email: normalizeEmail(import.meta.env.VITE_SITE_EMAIL, 'info@diwansuite.com'),
  privacyEmail: normalizeEmail(import.meta.env.VITE_PRIVACY_EMAIL, 'privacy@diwansuite.com'),
  supportEmail: normalizeEmail(import.meta.env.VITE_SUPPORT_EMAIL, 'support@diwansuite.com'),
  legalEmail: normalizeEmail(import.meta.env.VITE_LEGAL_EMAIL, 'legal@diwansuite.com'),
  phone,
  phoneHref: `tel:${phone.replace(/\s+/g, '')}`,
  whatsappUrl: import.meta.env.VITE_WHATSAPP_URL?.trim() || '',
  region: toTitleCase(import.meta.env.VITE_SITE_REGION, 'Riyadh'),
  analytics: {
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || '',
    gtmId: import.meta.env.VITE_GTM_ID?.trim() || '',
    webVitalsEndpoint: import.meta.env.VITE_WEB_VITALS_ENDPOINT?.trim() || '',
    errorReportingEndpoint: import.meta.env.VITE_ERROR_REPORTING_ENDPOINT?.trim() || '',
  },
  address: {
    city: toTitleCase(import.meta.env.VITE_SITE_CITY, 'Riyadh'),
    region: toTitleCase(import.meta.env.VITE_SITE_REGION, 'Riyadh'),
    country: toTitleCase(import.meta.env.VITE_SITE_COUNTRY, 'Saudi Arabia'),
    countryCode: import.meta.env.VITE_SITE_COUNTRY_CODE?.trim().toUpperCase() || 'SA',
  },
  judicialCity: {
    ar: import.meta.env.VITE_JUDICIAL_CITY_AR?.trim() || 'المدينة المنورة',
    en: import.meta.env.VITE_JUDICIAL_CITY_EN?.trim() || 'Al Madinah',
  },
  areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
  ogImageAlt: {
    home: 'Diwan Suite board governance dashboard overview',
    about: 'Diwan Suite executive governance workspace',
    privacy: 'Diwan Suite secure data governance interface',
    terms: 'Diwan Suite governance workflow and controls interface',
  },
  localeCountry: {
    ar: 'SA',
    en: 'US',
    hi: 'IN',
    ur: 'PK',
  } satisfies Partial<Record<LangCode, string>>,
} as const
