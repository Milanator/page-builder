import { toRaw } from "vue"
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";
import { Block } from "@/lib/utils/types"

export const sanitizeSettings = (settings: SettingBlock) => sanitizeSetting(settings)

export const sanitizeRenderList = (renderList: Block[]) => renderList.map((item) => sanitizeBlock(item))

const sanitizeBlock = (block: Block) => {
    return {
        id: block.id,
        name: block.name,
        type: block.type,
        title: block.title,
        options: getOptions(block),
        children: block.children
            ? Object.fromEntries(
                Object.entries(block.children).map(([key, children]) => [
                    key,
                    children.map(sanitizeBlock)
                ])
            )
            : undefined
    }
}

const sanitizeSetting = (block: SettingBlock) => {
    return {
        id: block.id,
        name: block.name,
        type: block.type,
        title: block.title,
        options: getOptions(block)
    };
}

const getOptions = (block: Block | SettingBlock) => Array.isArray(block.options) && block.options.length === 0 ? {} : deepClone(block.options ?? {})

export const deepClone = (obj: any) => JSON.parse(JSON.stringify(toRaw(obj)))