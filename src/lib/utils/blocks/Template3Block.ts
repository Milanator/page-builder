import { Block, BlockType } from "../types.ts";
import { registerBlock } from "@/lib/utils/registry.ts";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { ColumnBlock, ColumnChildren, ColumnOptions } from "@/lib/utils/blocks/ColumnBlock.ts";
import { ImageBlock } from "./ImageBlock.ts";

const DEFAULT_COLUMN = new ColumnBlock(
    {
        columns: 1,
        switchCols: false,
        paddingLeft: 5,
        paddingRight: 5,
        columnStyles: {
            1: {
                marginBottom: 4
            },
        },
    }, {
    1: [
        new ColumnBlock(
            {
                columns: 2,
                switchCols: false,
                verticalAlign: 'top',
                backgroundColor: '#00000036',
                paddingLeft: 0.5,
                paddingRight: 0.5,
                paddingTop: 0.5,
                paddingBottom: 0.5,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                columnStyles: {
                    1: {
                        marginLeft: 2,
                        width: 38
                    },
                    2: {
                        marginLeft: 2,
                        marginRight: 2,
                        width: 62
                    },
                },
            },
            {
                1: [
                    new ImageBlock({
                        stretched: true,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                    })
                ],
                2: [
                    new TextBlock({
                        text: 'BIELA NOC',
                        fontSize: 2,
                        textColor: '#fff',
                        cssClasses: '',
                    }),
                    new TextBlock({
                        text: '10.-12.10.2025 | KOŠICE',
                        fontSize: 1.5,
                        textColor: '#fff',
                        cssClasses: '',
                        marginBottom: 1,
                        marginTop: 1
                    }),
                    new TextBlock({
                        text: 'Biela Noc 2025 je 16. ročník medzinárodného festivalu súčasného umenia v Košiciach, ktorý sa bude konať 10. – 12. októbra, každý deň od 19:00 do polnoci.',
                        fontSize: 1.2,
                        textColor: '#fff',
                        cssClasses: '',
                    }),
                ]
            }
        ),
    ]
})

export class Template3Block extends ColumnBlock implements Block {
    name: string = 'template_3';
    options: ColumnOptions = {
        columns: 1,
        switchCols: false,
        verticalAlign: 'start',
        columnStyles: {
            1: {
                styleClass: 'col',
            },
        },
    }
    children: ColumnChildren = {
        1: [
            new TextBlock({
                text: 'Podujatia',
                fontSize: 4.5,
                textColor: '#000',
                cssClasses: 'bcpb:text-center',
                marginBottom: 10,
                marginTop: 10,
                lineHeight: 1,
                letterSpacing: 0,
            }),
            DEFAULT_COLUMN,
            DEFAULT_COLUMN,
            DEFAULT_COLUMN,
        ],
    };
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"/></svg>';
    title: string = 'Podujatia';
    type: BlockType = 'layout';

}

registerBlock(new Template3Block());