import { ref } from "vue"
import { SettingBlock } from "./utils/blocks/SettingBlock"
import { Block } from "./utils/types"
import { deepClone } from "./utils/formatter"

export type EditorState = {
    renderList: Block[]
    settings: SettingBlock
}

const past = ref<EditorState[]>([])
const present = ref<EditorState>()
const future = ref<EditorState[]>([])

export const useHistory = () => {
    const MAX_HISTORY = 15

    const init = (state: EditorState) => {
        present.value = deepClone(state)
    }

    const commit = (nextState: EditorState) => {
        if (present.value) {
            past.value.push(deepClone(present.value as EditorState))
        }

        if (past.value.length > MAX_HISTORY) {
            past.value.shift()
        }

        present.value = deepClone(nextState)
        future.value = []
    }

    const undo = (): EditorState | void => {
        console.log('undo')
        if (!past.value.length) return

        future.value.unshift(deepClone(present.value as EditorState))
        present.value = past.value.pop()!

        return present.value
    }

    const redo = (): EditorState | void => {
        console.log('redo')
        if (!future.value.length) return

        past.value.push(deepClone(present.value as EditorState))
        present.value = future.value.shift()!

        return present.value
    }

    return {
        init,
        state: present,
        commit,
        undo,
        redo,
        canUndo: () => past.value.length > 0,
        canRedo: () => future.value.length > 0
    }
}