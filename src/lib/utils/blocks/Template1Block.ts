import { Block, BlockType } from "../types.ts";
import { registerBlock } from "@/lib/utils/registry.ts";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { ColumnBlock } from "@/lib/utils/blocks/ColumnBlock.ts";
import { ImageBlock } from "@/lib/utils/blocks/ImageBlock.ts";

export class Template1 extends ColumnBlock implements Block {
    name: string = 'template_1';
    options: Record<string, any> = {
        columns: 2,
        switchCols: false,
        backgroundColor: '',
        columnStyles: {
            1: {
                styleClass: 'col',
                backgroundImage: '',
            },
            2: {
                styleClass: 'col z-300',
                backgroundImage: '',
                isImage: true,
            },
        },
    }
    children: { [key: string | number]: Block[] } = {
        1: [
            new ImageBlock({
                cssClasses: 'px-4',
                stretched: false,
            })
        ],
        2: [
            new TextBlock({
                text: 'Title',
                fontSize: 2,
                textColor: '#000',
                cssClasses: 'bcpb:pb-4 bcpb:px-4',
                styles: '',
                lineHeight: 1,
                letterSpacing: 0,
            }),
            new TextBlock({
                text: 'Text',
                fontSize: 1,
                textColor: '#000',
                cssClasses: 'bcpb:pb-4 bcpb:px-4',
                styles: '',
                lineHeight: 1,
                letterSpacing: 0,
            }),
        ],
    };
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"/></svg>';
    title: string = 'Text a obrázok';
    type: BlockType = 'layout';

}

registerBlock(new Template1());