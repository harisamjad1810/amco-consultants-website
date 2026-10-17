import en, { type Dictionary } from './dictionaries/en'
import ur from './dictionaries/ur'
import type { Locale } from './config'

const dictionaries: Record<Locale, Dictionary> = { en, ur }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]

export type { Dictionary }
