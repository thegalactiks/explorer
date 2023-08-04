import type { AstroIntegration } from 'astro'
import { getConfig } from '@withmoons/config'

export { integrationsPreset } from './preset'

type MoonsOptions = {
  content?: {
    path?: string
  }
}

export default function createPlugin(options: MoonsOptions): AstroIntegration {
  const moonsConfig = getConfig(options?.content?.path)

  return {
    name: '@withmoons/astro-integration',
    hooks: {
      'astro:config:setup': ({ command, updateConfig, addWatchFile }) => {
        updateConfig({
          site: moonsConfig.webManifest.start_url,
        })

        if (command === 'dev') {
          addWatchFile(moonsConfig.content.generated)
        }
      }
    },
  }
}
