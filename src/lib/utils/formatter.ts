import { toRaw } from "vue"
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";
import { Block } from "@/lib/utils/types"

export const sanitizeSettings = (settings: SettingBlock) => ((({ optionComponent, component, icon, ...rest }: SettingBlock) => rest)(settings))

export const sanitizeRenderList = (renderList: Block[]) => renderList.map((item) => sanitizeBlock(item))

const sanitizeBlock = (block: Block) => ({
    id: block.id,
    name: block.name,
    type: block.type,
    title: block.title,
    options: deepClone(block.options),
    children: block.children
        ? Object.fromEntries(
            Object.entries(block.children).map(([key, children]) => [
                key,
                children.map(sanitizeBlock)
            ])
        )
        : undefined
})

export const deepClone = (obj: any) => JSON.parse(JSON.stringify(toRaw(obj)))