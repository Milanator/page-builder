import { Block, BlockType, MarginOptions, VueComponent } from "@/lib/utils/types"
import { markRaw } from "vue";
import { registerBlock } from "@/lib/utils/registry.ts";
import TextComponent from "@/lib/block-components/text/TextComponent.vue";
import TextOptionComponent from "@/lib/block-components/text/TextOptionComponent.vue";

export type FONT_TYPE = {
    value: string
    label: string
}

export const FONTS: FONT_TYPE[] = [
    {
        label: 'Montserrat',
        value: "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    },
    {
        label: 'Poppins',
        value: 'Poppins, system-ui, sans-serif',
    },
    {
        label: 'JetBrains Mono',
        value: '"JetBrains Mono"'
    },
    {
        label: 'Pacifico',
        value: 'Pacifico, cursive'
    },
    {
        label: 'Playfair',
        value: '"Playfair Display", Georgia, serif'
    },
    {
        label: 'Roboto Slab',
        value: '"Roboto Slab", serif'
    },
    {
        label: 'Default',
        value: '',
    },
]

export type EditorOptions = {
    textColor: string;
    // textAlign?: TextAlign
    fontSize: number;
    lineHeight?: number
    letterSpacing?: number
    fontFamily?: FONT_TYPE
}

type BaseOptions = {
    text: string;
    cssClasses: string;
    styles?: string;
};

export type TextOptions = BaseOptions & MarginOptions & EditorOptions

export class TextBlock implements Block {
    name: string = 'text';
    component: VueComponent = markRaw(TextComponent);
    optionComponent: VueComponent = markRaw(TextOptionComponent);
    options: TextOptions = {
        text: "",
        cssClasses: "",
        styles: "",
        // textAlign: 'left',
        lineHeight: 1.4,
        letterSpacing: 0,
        fontSize: 1, //rem
        textColor: '#000',
    }
    icon: string = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#4f39f6"><path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z"/></svg>
    `;
    title: string = 'Text';
    type: BlockType = 'element';

    constructor(options?: TextOptions) {
        if (options) {
            this.options = { ...this.options, ...options };
        }
    }
}

registerBlock(new TextBlock());