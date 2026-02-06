import { Block, BlockType } from "../types.ts";
import { registerBlock } from "@/lib/utils/registry.ts";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { ColumnBlock, ColumnChildren, ColumnOptions } from "@/lib/utils/blocks/ColumnBlock.ts";

const DEFAULT_COLUMN = new ColumnBlock(
    {
        columns: 1,
        switchCols: false,
        backgroundColor: '',
        backgroundImage: '',
        styleClass: '',
        styles: '',
        columnStyles: {
            1: {
                styleClass: 'col',
                backgroundColor: '#0a0a0a69',
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 2,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
            },
        },
    }, {
    1: [
        new TextBlock({
            text: 'SCHÔDZA VLASTNÍKOV BYTOV',
            fontSize: 2.4,
            textColor: '#fff',
            cssClasses: 'bcpb:text-center',
            marginBottom: 6,
            marginTop: 6,
            marginLeft: 8,
            marginRight: 8,
            lineHeight: 1,
            letterSpacing: 0,
        }),
        new TextBlock({
            text: 'Údržba spoločných priestorov,<br>rozpočet domu, opravy strechy,<br>výmena výťahu a správa fondu opráv.',
            fontSize: 1.8,
            textColor: '#fff',
            cssClasses: 'bcpb:text-center',
            marginLeft: 8,
            marginRight: 8,
            lineHeight: 1.4,
            letterSpacing: 1.5,
        }),
        new TextBlock({
            text: '17. 9. 2025 o 18:00',
            fontSize: 2,
            textColor: '#fff',
            cssClasses: 'bcpb:text-center bcpb:font-bold',
            marginTop: 6,
            marginBottom: 6,
            marginLeft: 8,
            marginRight: 8,
            lineHeight: 1,
            letterSpacing: 0,
        }),
    ]
})

export class Template2 extends ColumnBlock implements Block {
    name: string = 'template_2';
    options: ColumnOptions = {
        columns: 1,
        switchCols: false,
        backgroundColor: '',
        backgroundImage: '',
        styleClass: '',
        styles: '',
        columnStyles: {
            1: {
                styleClass: 'col',
            },
        },
    }
    children: ColumnChildren = {
        1: [
            new TextBlock({
                text: 'Oznamy',
                fontSize: 4.5,
                textColor: '#000',
                cssClasses: 'bcpb:text-center',
                marginBottom: 10,
                marginTop: 10,
                lineHeight: 1,
                letterSpacing: 0,
            }),
            DEFAULT_COLUMN,
            DEFAULT_COLUMN
        ],
    };
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"/></svg>';
    title: string = 'Oznam';
    type: BlockType = 'layout';

}

registerBlock(new Template2());