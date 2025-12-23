import { inject, type InjectionKey } from 'vue'
import { Config } from '@/lib/utils/types.ts'

// used instead of store

export const ConfigKey: InjectionKey<Config> =
    Symbol('Config')

export function useConfig() {
    const config = inject(ConfigKey)

    if (!config) {
        throw new Error('Missing Config provider')
    }

    return config
}