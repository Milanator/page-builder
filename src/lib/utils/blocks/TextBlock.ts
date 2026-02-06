import { Block, BlockType, MarginOptions, VueComponent } from "../types.ts";
import { markRaw } from "vue";
import { registerBlock } from "@/lib/utils/registry.ts";
import TextComponent from "@/lib/block-components/text/TextComponent.vue";
import TextOptionComponent from "@/lib/block-components/text/TextOptionComponent.vue";

type BaseOptions = {
    text: string;
    fontSize: number;
    textColor: string;
    cssClasses: string;
    lineHeight?: number
    letterSpacing?: number
    styles?: string;
};

type TextOptions = BaseOptions & MarginOptions

export class TextBlock implements Block {
    name: string = 'text';
    component: VueComponent = markRaw(TextComponent);
    optionComponent: VueComponent = markRaw(TextOptionComponent);
    options: TextOptions = {
        text: "",
        cssClasses: "",
        styles: "",
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