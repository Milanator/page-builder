import { Block, BlockType } from "@/lib/utils/types"
import { registerBlock } from "@/lib/utils/registry.ts";
import { FONTS, TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { ColumnBlock, ColumnChildren, ColumnOptions } from "@/lib/utils/blocks/layouts/ColumnBlock.ts";
import HeaderImage from '@/assets/img/header.png'

export class HeaderBlock extends ColumnBlock implements Block {
    name: string = 'header';
    options: ColumnOptions = {
        columns: 2,
        switchCols: false,
        backgroundColor: '#404143',
        verticalAlign: 'center',
        columnStyles: {
            1: {
                styleClass: 'col',
                marginLeft: 5,
            },
            2: {
                styleClass: 'col',
                marginRight: 5,
            },
        },
    }
    children: ColumnChildren = {
        1: [
            new TextBlock({
                text: '<strong>SÍDLISKO ŤAHANOVCE</strong>',
                fontSize: 1.2,
                cssClasses: '',
                lineHeight: 1,
                letterSpacing: 0,
                textColor: '#fff',
                fontFamily: FONTS[0]
            }),
            new TextBlock({
                text: 'Čínska ulica',
                fontSize: 1,
                cssClasses: '',
                lineHeight: 1,
                letterSpacing: 0,
                textColor: '#fff',
                fontFamily: FONTS[0]
            }),
        ],
        2: [
            new TextBlock({
                text: '<strong>VCHOD Č.2</strong>',
                fontSize: 1.6,
                textColor: '#fff',
                cssClasses: '',
                lineHeight: 1.4,
                letterSpacing: 0,
                textAlign: 'right',
                fontFamily: FONTS[0]
            }),

        ],
    };
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"/></svg>';
    title: string = 'Hlavička';
    type: BlockType = 'ui-component';
    exampleImage?: string = HeaderImage;

}

registerBlock(new HeaderBlock());