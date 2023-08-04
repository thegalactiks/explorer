import { existsSync, readFileSync } from 'fs'
import { z } from 'zod'

import deepmerge from './utils/deepmerge.mjs'
import { readWebManifestFromPath, type WebManifest } from './webmanifest.config.mjs'
import { join } from 'path'

const moonsConfigFileSchema = z.object({
  name: z.string().optional(),
  template: z.string(),
})

const defaultConfigFileName = 'moons.config.json'

type ContentConfig = {
  root: string
  generated: string
}
export type MoonsConfig = {
  name?: string
  template: string
  content: ContentConfig
  webManifest: WebManifest
}

let _config: MoonsConfig

const readConfigFile = (path: string): MoonsConfig => {
  const configPath = join(path, defaultConfigFileName)
  if (!existsSync(configPath)) {
    throw new Error(`The moons config file "${configPath}" does not exist.`)
  }

  const configFileContent = readFileSync(configPath, 'utf8')
  const configFile = moonsConfigFileSchema.parse(JSON.parse(configFileContent))

  const config: MoonsConfig = {
    name: configFile.name,
    template: configFile.template,
    content: {
      root: path,
      generated: join(path, '.contentlayer/generated/index.mjs'),
    },
    webManifest: readWebManifestFromPath(path),
  }

  return config
}

export function getConfig(path?: string): MoonsConfig {
  if (_config) {
    return _config
  }

  if (!path && process.env.CONTENT_PATH) {
    path = process.env.CONTENT_PATH
  } else if (!path) {
    path = process.cwd()
  }
  _config = readConfigFile(path)

  return _config
}
