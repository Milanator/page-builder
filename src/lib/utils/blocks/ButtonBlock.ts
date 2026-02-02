import { Block, BlockType, MarginOptions, VueComponent } from "../types.ts";
import { markRaw } from "vue";
import ButtonComponent from "../../block-components/button/ButtonComponent.vue";
import { registerBlock } from "@/lib/utils/registry.ts";
import ButtonOptionComponent from "../../block-components/button/ButtonOptionComponent.vue";

type ButtonAlign = "left" | "center" | "right";

type ButtonActionType = "external_link" | "internal_link" | null;

interface ButtonAction {
    type: ButtonActionType;
    url: string;
}

interface BaseOptions {
    style: string;
    text: string;

    backgroundColor: string;
    backgroundImage: string;

    styleClass: string;
    styles: string; // CSS string (supports &:hover, &:active, ...)

    buttonAlign: ButtonAlign;
    buttonAction: ButtonAction;
}

type ButtonOptions = BaseOptions & MarginOptions

export class ButtonBlock implements Block {
    name: string = 'button';
    component: VueComponent = markRaw(ButtonComponent);
    optionComponent: VueComponent = markRaw(ButtonOptionComponent);
    options: ButtonOptions = {
        style: "",
        text: "Button",
        backgroundColor: "#ffffff",
        backgroundImage: "",
        styleClass: "btn btn-primary",
        styles: `
font-size: 16px;
font-weight: 600;
border: none;
border-radius: 8px;
padding: 12px 24px;
cursor: pointer;
transition: all 0.2s ease;
color: white;
text-decoration: none;
display: inline-block;
text-align: center;
line-height: 1.5;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          
&:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

/* Active state */
&:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

/* Focus state for accessibility */
&:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
}
        `,
        buttonAlign: "left",
        buttonAction: {
            type: null,
            url: ""
        },
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    }
    icon: string = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#4f39f6"><path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z"/></svg>
    `;
    title: string = 'Button';
    type: BlockType = 'element';
}

registerBlock(new ButtonBlock());