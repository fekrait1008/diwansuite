/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_NAME?: string
  readonly VITE_SITE_NAME_AR?: string
  readonly VITE_OPERATOR_NAME?: string
  readonly VITE_SITE_EMAIL?: string
  readonly VITE_SUPPORT_EMAIL?: string
  readonly VITE_PRIVACY_EMAIL?: string
  readonly VITE_LEGAL_EMAIL?: string
  readonly VITE_SITE_PHONE?: string
  readonly VITE_SITE_CITY?: string
  readonly VITE_SITE_REGION?: string
  readonly VITE_SITE_COUNTRY?: string
  readonly VITE_SITE_COUNTRY_CODE?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_GTM_ID?: string
  readonly VITE_WEB_VITALS_ENDPOINT?: string
  readonly VITE_ERROR_REPORTING_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


declare global {
  interface Window {
    __DIWAN_PAGE__?: import('./lib/app-state').InitialPageData
  }
}



declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  }
}

export {}
