import { getConfig } from '@withmoons/config'
import { join } from 'path'

import { getDocumentBySlug } from './repository'
import type { Content, } from './types'

const _getPathFromEntry = (entry: Content): string => {
  if (entry.identifier) {
    return entry.identifier === 'index' ? '/' : entry.identifier
  }

  return entry.slug
}

export const getPathFromEntry = async (entry: Content): Promise<string> => {
  // TODO: take language into account with a path pattern in the moons config
  // if (entry.inLanguage) {
  // }

  const path = _getPathFromEntry(entry);
  if (!entry.isPartOf) {
    return path;
  }

  const parent = await getDocumentBySlug(entry.isPartOf)
  const base = parent ? (await getPathFromEntry(parent)) : entry.isPartOf
  return join(base, path)
}

export const getUrlFromEntry = (entry: Content): string => {
  if (entry.url) {
    return entry.url
  }

  const { webManifest: { start_url: url = '/' } } = getConfig()

  return new URL(entry.slug, url).toString()
}
