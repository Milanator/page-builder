import { ref, Ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { ButtonBlock } from "@/lib/utils/blocks/ButtonBlock.ts";
import { ColumnBlock } from "@/lib/utils/blocks/ColumnBlock.ts";
import { Block } from "@/lib/utils/types"
import { HtmlBlock } from "@/lib/utils/blocks/HtmlBlock.ts";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { Template1 } from "@/lib/utils/blocks/Template1Block.ts";
import { ImageBlock } from "@/lib/utils/blocks/ImageBlock.ts";
import { Template2 } from "@/lib/utils/blocks/Template2Block.ts";
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";
import { Template3Block } from "@/lib/utils/blocks/Template3Block";
import { Template4Block } from "./utils/blocks/Template4Block";

const draggedItem: Ref<Block | null> = ref(null)
const dragOverIndex: Ref<number | null> = ref(null)
const dragOverDropZone: Ref<boolean> = ref(false)
const innerDragElement: Ref<Block | null> = ref(null)
const innerDragElementIndex: Ref<number | null> = ref(null)
const selectedOptionComponent: Ref<Block | null> = ref(null)
const dragOverChildElement: Ref<boolean> = ref(false)

const blocks: Ref<Array<Block>> = ref([
    new ButtonBlock(),
    new TextBlock(),
    new Template2(),
    new Template4Block(),
    new Template1(),
    new Template3Block(),
    new ColumnBlock(),
    new SettingBlock(),
    new HtmlBlock(),
    new ImageBlock()
])

export function usePageBuilder() {
    const renderList: Ref<Array<Block>> = ref([])

    const startDrag = ($event: DragEvent, item: Block) => {
        $event.dataTransfer?.setData('text/plain', JSON.stringify(item));
    }

    const onDrop = (event: DragEvent) => {
        console.log('onDrop')
        event.preventDefault();
        dragOverDropZone.value = false;

        if (innerDragElement.value) {
            if (innerDragElementIndex.value !== null) {
                renderList.value.splice(innerDragElementIndex.value, 1)
            }

            innerDragElement.value.id = uuidv4();

            if (dragOverIndex.value === null) {
                renderList.value.push(innerDragElement.value)
            } else {
                renderList.value.splice(dragOverIndex.value, 0, innerDragElement.value);
            }

            innerDragElement.value = null;
            dragOverIndex.value = null;
        } else {
            const droppedItem = event.dataTransfer?.getData('text/plain');

            if (droppedItem) {
                const _droppedItem = JSON.parse(droppedItem);

                assignBlockId(_droppedItem);

                if (dragOverIndex.value === null) {
                    renderList.value.push(_droppedItem)
                } else {
                    renderList.value.splice(dragOverIndex.value, 0, _droppedItem);
                }
            }

            draggedItem.value = null;
            dragOverIndex.value = null;
        }
    };

    const assignBlockId = (block: Block) => {
        block.id = uuidv4();

        if (!block.children) return;

        if (Array.isArray(block.children)) {
            block.children.forEach(assignBlockId);
        } else {
            for (const key in block.children) {
                block.children[key].forEach(assignBlockId);
            }
        }
    };

    const onDropChildElement = (oldBlockId: string) => {
        console.log('onDropChildElement')
        if (innerDragElementIndex.value != null) {
            renderList.value.splice(innerDragElementIndex.value, 1)
        }

        if (oldBlockId) {
            deleteBlock(renderList.value, oldBlockId)
        }

        draggedItem.value = null;
        dragOverIndex.value = null;
        innerDragElement.value = null;
        dragOverDropZone.value = false;
        dragOverChildElement.value = true;
        innerDragElementIndex.value = null;
    }

    const onDragLeave = () => {
        dragOverDropZone.value = false;
        dragOverIndex.value = null;
    }

    const startDragItem = ($event: DragEvent, item: Block, index: number) => {
        innerDragElement.value = item
        innerDragElementIndex.value = index
        $event.dataTransfer?.setData('text/plain', JSON.stringify(item));
    }

    const onDragOverItem = ($event: DragEvent, index: number) => {
        $event.preventDefault();
        $event.stopPropagation();
        dragOverIndex.value = index;
    }

    const onDragOver = ($event: DragEvent) => {
        dragOverIndex.value = null;
        dragOverDropZone.value = true;
        $event.stopPropagation();
    }

    const onDragOverChildElement = (value: boolean) => {
        dragOverChildElement.value = value
    }

    const onItemSelect = (block: Block) => {
        console.log('onItemSelect', block)
        selectedOptionComponent.value = block
    }

    const onSelectFormChildElement = (block: Block) => {
        if (block) {
            selectedOptionComponent.value = block
        }
    }

    const onDelete = ($event: boolean) => {
        console.log('onDelete')
        if (!selectedOptionComponent.value?.id || !$event) return;

        deleteBlock(renderList.value, selectedOptionComponent.value.id);
    };

    const deleteBlock = (blocks: Block[], blockId: string): boolean => {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];

            if (block.id === blockId) {
                blocks.splice(i, 1);
                selectedOptionComponent.value = null;
                return true;
            }

            // recursive finding
            if (block.children) {
                if (Array.isArray(block.children)) {
                    if (deleteBlock(block.children, blockId)) return true;
                } else if (typeof block.children === 'object') {
                    for (const key in block.children) {
                        if (Array.isArray(block.children[key])) {
                            if (deleteBlock(block.children[key], blockId)) return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    const findBlockById = (blocks: Block[], findId: string): Block | null => {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i]

            if (block.id === findId) {
                return block
            }

            if (block.children) {
                if (Array.isArray(block.children)) {
                    const found = findBlockById(block.children, findId)
                    if (found) {
                        return found
                    }
                }

                else {
                    for (const key in block.children) {
                        const found = findBlockById(block.children[key], findId)
                        if (found) {
                            return found
                        }
                    }
                }
            }
        }

        return null
    }

    return {
        blocks,
        renderList,
        draggedItem,
        dragOverIndex,
        dragOverDropZone,
        selectedOptionComponent,
        dragOverChildElement,
        startDrag,
        onDrop,
        onDropChildElement,
        startDragItem,
        onDragOverItem,
        onDragOverChildElement,
        onDragOver,
        onDragLeave,
        onItemSelect,
        onSelectFormChildElement,
        onDelete,
        findBlockById,
    }
}