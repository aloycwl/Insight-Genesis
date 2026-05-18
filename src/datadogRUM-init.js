import { datadogRum } from '@datadog/browser-rum'
import { reactPlugin } from '@datadog/browser-rum-react'

let hasInitialized = false

const DATADOG_CONFIG = {
  applicationId: import.meta.env.VITE_DATADOG_APPLICATION_ID || '99251484-6ef4-47bb-b465-a61c76ac9f68',
  clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN || 'pub12d617e722c71f58c95ed33806fed5b3',
  site: import.meta.env.VITE_DATADOG_SITE || 'ap1.datadoghq.com',
  service: import.meta.env.VITE_DATADOG_SERVICE || 'igai',
  env: import.meta.env.VITE_DATADOG_ENV || 'prod',
  version: import.meta.env.VITE_DATADOG_VERSION || '1.0.0',
}

export const initDatadogRum = () => {
  if (hasInitialized) return

  if (!DATADOG_CONFIG.applicationId || !DATADOG_CONFIG.clientToken) {
    console.warn('Datadog RUM disabled: missing applicationId or clientToken')
    return
  }

  datadogRum.init({
    ...DATADOG_CONFIG,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    plugins: [reactPlugin({ router: false })],
  })

  hasInitialized = true
}
