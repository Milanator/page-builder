import { Block, BlockType } from "../types.ts";
import { registerBlock } from "../registry.ts";
import { TextBlock } from "./TextBlock.ts";
import { ColumnBlock, ColumnOptions } from "./ColumnBlock.ts";

export class Template2 extends ColumnBlock implements Block {
    name: string = 'template_2';
    options: ColumnOptions = {
        columns: 1,
        switchCols: false,
        hasContainer: true,
        backgroundColor: 'transparent',
        backgroundImage: '',
        styleClass: '',
        styles: '',
        columnStyles: {
            1: {
                styleClass: 'col',
                backgroundImage: '',
            },
        },
    }
    children: { [key: string | number]: Block[] } = {
        1: [
            new TextBlock({
                fontSize: 2,
                hasContainer: true,
                cssClasses: 'bcpb:text-center',
                backgroundImage: '',
                styles: '',
                marginBottom: 5,
                marginTop: 5,
                text: 'Oznam'
            }),
            new ColumnBlock(
                {
                    columns: 1,
                    switchCols: false,
                    hasContainer: true,
                    backgroundColor: '',
                    backgroundImage: '',
                    styleClass: '',
                    styles: '',
                    columnStyles: {
                        1: {
                            styleClass: 'col',
                            backgroundImage: '',
                            backgroundColor: '#0a0a0a69',
                            marginLeft: 10,
                            marginRight: 10,
                        },
                    },
                }, {
                1: [
                    new TextBlock({
                        text: 'NADPIS',
                        fontSize: 2,
                        hasContainer: true,
                        cssClasses: 'bcpb:text-center bcpb:text-white',
                        backgroundImage: '',
                        styles: '',
                        marginBottom: 7,
                        marginTop: 7,
                        marginLeft: 8,
                        marginRight: 8
                    }),
                    new TextBlock({
                        text: 'text',
                        fontSize: 1.5,
                        hasContainer: true,
                        cssClasses: 'bcpb:text-center bcpb:text-white',
                        backgroundImage: '',
                        styles: '',
                        marginLeft: 8,
                        marginRight: 8
                    }),
                    new TextBlock({
                        text: 'text',
                        fontSize: 1.5,
                        hasContainer: true,
                        cssClasses: 'bcpb:text-center bcpb:text-white bcpb:font-bold',
                        backgroundImage: '',
                        styles: '',
                        marginTop: 7,
                        marginBottom: 7,
                        marginLeft: 8,
                        marginRight: 8
                    }),
                ]
            }),
        ],
    };
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"/></svg>';
    title: string = 'Oznam';
    type: BlockType = 'layout';

}

registerBlock(new Template2());