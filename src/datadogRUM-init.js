import { datadogRum } from '@datadog/browser-rum'
import { reactPlugin } from '@datadog/browser-rum-react'

let hasInitialized = false

export const initDatadogRum = () => {
  if (hasInitialized) return

  datadogRum.init({
    applicationId: '99251484-6ef4-47bb-b465-a61c76ac9f68',
    clientToken: 'pub12d617e722c71f58c95ed33806fed5b3',
    site: 'ap1.datadoghq.com',
    service: 'igai',
    env: 'prod',
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    plugins: [reactPlugin({ router: false })],
  })

  hasInitialized = true
}
