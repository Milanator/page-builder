import sk from './../lang/sk.json'
import { Language } from './utils/types'

const messages = { sk }

let locale: Language

export function t(key: string) {
    return messages[locale]?.[key] ?? key
}

export const initLocale = (lang: Language = 'sk') => {
    document.documentElement.setAttribute('lang', lang)

    locale = lang
}

export const setLocale = () => {
    locale = document.documentElement.getAttribute('lang') as Language
}
