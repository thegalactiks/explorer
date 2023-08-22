import type { AstroIntegration } from 'astro'
import partytown from '@astrojs/partytown'
import prefetch from '@astrojs/prefetch'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import critters from 'astro-critters'
import compress from 'astro-compress'

export const integrationsPreset = (): AstroIntegration[] => ([
  react(),
  partytown(),
  prefetch(),
  sitemap(),
  critters(),
  compress(),
])
