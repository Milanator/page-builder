import sk from '../lang/sk.json'
import en from '../lang/en.json'
import { Language } from './utils/types'
import { useConfig } from '@/store/Config.ts';

interface MessageSet {
    [key: string]: string;
}

const messages: Record<Language, MessageSet> = { sk, en }

export const useTranslator = (language?: Language) => {
    language = language ?? useConfig().language

    const t = (key: string) => {
        return messages[language]?.[key] ?? key
    }

    return { t }
}