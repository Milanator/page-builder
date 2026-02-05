import PageBuilder from "./PageBuilder.vue";
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import RichTextEditor from "@/lib/editors/TextEditor/RichTextEditor.vue";
import CodeMirrorEditor from "@/lib/editors/CodeMirrorEditor.vue";
import SliderToggle from "./controls/SliderToggle.vue";
import PagePreview from "./PagePreview.vue";
import BasePreview from "./block-components/BasePreview.vue";
import BaseOption from '@/lib/block-components/BaseOption.vue';
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";

export * from "./utils/types";
export * from "./utils/registry";

export {
    PageBuilder,
    PagePreview,
    OptionWidget,
    RichTextEditor,
    CodeMirrorEditor,
    BasePreview,
    BaseOption,
    SliderToggle,
    SettingBlock,
}