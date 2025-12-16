import sk from './../lang/sk.json'
import en from './../lang/en.json'
import { Language } from './utils/types'

interface MessageSet {
    [key: string]: string;
}


const messages: Record<Language, MessageSet> = { sk, en }

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
