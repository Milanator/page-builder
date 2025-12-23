import { Block, BlockType, VueComponent } from "../types.ts";
import { registerBlock } from "../registry.ts";
import { markRaw } from "vue";
import ImageOptionComponent from "@/lib/block-components/image/ImageOptionComponent.vue";
import ImageComponent from "@/lib/block-components/image/ImageComponent.vue";

type ImageOptions = {
    hasContainer: boolean;
    cssClasses: string;
    imageUrl?: string;
};

export class ImageBlock implements Block {
    name: string = 'image';
    component: VueComponent = markRaw(ImageComponent);
    optionComponent: VueComponent = markRaw(ImageOptionComponent);
    options: ImageOptions = {
        hasContainer: true,
        cssClasses: '',
    };
    description: string = 'Element obrázok';
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>';
    title: string = 'Obrázok';
    type: BlockType = 'element';

    constructor(options?: ImageOptions) {
        if (options) {
            this.options = {
                ...this.options,
                ...options,
            };
        }
    }
}

registerBlock(new ImageBlock());