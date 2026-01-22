import { Block, BlockType, VueComponent } from "../types.ts";
import { registerBlock } from "../registry.ts";
import { markRaw } from "vue";
import SettingOptionComponent from "@/lib/block-components/setting/SettingOptionComponent.vue";

type SettingOptions = {
    backgroundColor: string
};

export class SettingBlock implements Block {
    name: string = 'setting';
    component: undefined;
    optionComponent: VueComponent = markRaw(SettingOptionComponent);
    options: SettingOptions = {
        backgroundColor: '#fff'
    };
    icon: string = '';
    title: string = 'Nastavenia';
    type: BlockType = 'setting';
}

registerBlock(new SettingBlock());