import { BackgroundOptions, Block, BlockType, VueComponent } from "@/lib/utils/types"
import { registerBlock } from "@/lib/utils/registry.ts";
import { markRaw } from "vue";
import SettingOptionComponent from "@/lib/block-components/setting/SettingOptionComponent.vue";

type SettingOptions = BackgroundOptions;

export class SettingBlock implements Block {
    name: string = 'setting';
    component: undefined;
    optionComponent: VueComponent = markRaw(SettingOptionComponent);
    options: SettingOptions = {};
    icon: string = '';
    title: string = 'Nastavenia';
    type: BlockType = 'setting';
}

registerBlock(new SettingBlock());