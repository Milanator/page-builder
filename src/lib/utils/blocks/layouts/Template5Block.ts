import { Block, BlockType } from "@/lib/utils/types"
import { registerBlock } from "@/lib/utils/registry.ts";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { ColumnBlock, ColumnChildren, ColumnOptions } from "@/lib/utils/blocks/layouts/ColumnBlock.ts";
import Template5Image from '@/assets/img/template_5.png'

export class Template5Block extends ColumnBlock implements Block {
    name: string = 'template_5';
    options: ColumnOptions = {
        columns: 1,
        switchCols: false,
        columnStyles: {
            1: {
                styleClass: 'col',
            },
        },
    }
    children: ColumnChildren = {
        1: [
            new ColumnBlock(
                {
                    columns: 1,
                    switchCols: false,
                    paddingTop: 6,
                    paddingBottom: 6,
                    columnStyles: {
                        1: {
                            styleClass: 'col',
                            backgroundColor: '#ff000099',
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
                        text: 'ODSTÁVKA PITNEJ VODY',
                        fontSize: 2,
                        textColor: '#fff',
                        cssClasses: 'bcpb:text-center',
                        marginBottom: 3,
                        marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        lineHeight: 1,
                        letterSpacing: 0,
                    }),
                    new TextBlock({
                        text: 'Vážení obyvatelia,<br><br>oznamujeme vám, že z dôvodu plánovaných údržbových prác na vodovodnom potrubí bude dňa 10. 10. 2025 v čase od 10:00 do 16:00 prerušená dodávka pitnej vody pre celý obytný blok.<br><br>Prosíme obyvateľov, aby si vopred zabezpečili potrebnú zásobu vody na osobnú potrebu počas odstávky.<br><br>Počas prerušenia dodávky bude k dispozícii náhradný zdroj pitnej vody – cisterna, ktorá bude pristavená na parkovisko pri vchode č. 5.<br><br>Ďakujeme za pochopenie a spoluprácu.',
                        fontSize: 1.4,
                        textColor: '#fff',
                        cssClasses: 'bcpb:text-center',
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 12,
                        lineHeight: 1.4,
                        letterSpacing: 1.5,
                    }),
                ]
            })
        ],
    };
    icon: string = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4f39f6"><path d="M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"/></svg>';
    title: string = 'Malý oznam 1';
    type: BlockType = 'layout';
    exampleImage?: string = Template5Image;
}

registerBlock(new Template5Block());