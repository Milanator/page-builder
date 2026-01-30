import { Block, BlockType, BorderRadiusOptions, MarginOptions, VueComponent } from "../types.ts";
import { markRaw } from "vue";
import ColumnComponent from "../../block-components/columns/ColumnComponent.vue";
import { registerBlock } from "@/lib/utils/registry.ts";
import ColumnOptionComponent from "../../block-components/columns/ColumnOptionComponent.vue";

type ColumnStyle = {
    styleClass?: string
    backgroundImage?: string
    backgroundColor?: string
    styles?: string
}

type ColumnOptions = ColumnStyle & MarginOptions & BorderRadiusOptions

export const DEFAULT_STYLES: ColumnOptions = {
    styleClass: 'col',
    backgroundImage: '',
    backgroundColor: '',
    styles: 'padding: 10px',
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
}

export class ColumnBlock implements Block {
    name: string = 'columns';
    component: VueComponent = markRaw(ColumnComponent);
    optionComponent: VueComponent = markRaw(ColumnOptionComponent);
    options: Record<string, any> = {
        columns: 3,
        switchCols: false,
        hasContainer: false,
        backgroundColor: "",
        backgroundImage: '',
        styleClass: '',
        styles: '',
        columnStyles: {
            1: DEFAULT_STYLES,
            2: DEFAULT_STYLES,
            3: DEFAULT_STYLES
        }
    }
    children: { [key: string | number]: Block[] } = {};
    icon: string = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#4f39f6"><path d="M120-120q-33 0-56.5-23.5T40-200v-80q0-33 23.5-56.5T120-360h240q33 0 56.5 23.5T440-280v80q0 33-23.5 56.5T360-120H120Zm480 0q-33 0-56.5-23.5T520-200v-560q0-33 23.5-56.5T600-840h240q33 0 56.5 23.5T920-760v560q0 33-23.5 56.5T840-120H600Zm-480-80h240v-80H120v80Zm480 0h240v-560H600v560Zm120-40q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240ZM120-440q-33 0-56.5-23.5T40-520v-240q0-33 23.5-56.5T120-840h240q33 0 56.5 23.5T440-760v240q0 33-23.5 56.5T360-440H120Zm160-200q17 0 28.5-11.5T320-680q0-17-11.5-28.5T280-720q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640ZM120-533l80-107 90 120h70v-240H120v227Zm120 293Zm480-240ZM240-640Z"/></svg>
    `;
    title: string = 'Columns';
    type: BlockType = 'layout';

    constructor(options?: Record<string, any>, children?: { [key: string | number]: Block[] }) {
        if (options) {
            this.options = {
                ...this.options,
                ...options,
            };
        }

        if (children) {
            this.children = {
                ...this.children,
                ...children,
            };
        }
    }

}

registerBlock(new ColumnBlock());