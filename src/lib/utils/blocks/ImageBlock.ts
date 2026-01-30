import { Block, BlockType, BorderRadiusOptions, MarginOptions, VueComponent } from "../types.ts";
import { registerBlock } from "@/lib/utils/registry.ts";
import { markRaw } from "vue";
import ImageOptionComponent from "@/lib/block-components/image/ImageOptionComponent.vue";
import ImageComponent from "@/lib/block-components/image/ImageComponent.vue";

type BaseOptions = {
    hasContainer: boolean;
    cssClasses: string;
    stretched: boolean;
    mediaUrl?: string;
};

type ImageOptions = BaseOptions & MarginOptions & BorderRadiusOptions

export class ImageBlock implements Block {
    name: string = 'image';
    component: VueComponent = markRaw(ImageComponent);
    optionComponent: VueComponent = markRaw(ImageOptionComponent);
    options: ImageOptions = {
        hasContainer: false,
        cssClasses: '',
        stretched: false,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    };
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