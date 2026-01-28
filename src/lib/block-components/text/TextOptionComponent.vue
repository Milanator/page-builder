<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import { TextBlock } from "../../utils/blocks/TextBlock.ts";
import SliderToggle from '@/lib/controls/SliderToggle.vue';
import { useTranslator } from '@/lib/Translator';
import RangeInput from "@/lib/controls/RangeInput.vue";
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";
import BackgroundImageOption from "@/lib/block-components/partials/BackgroundImageOption.vue";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
  <BaseOption title="Text">

    <option-widget :title="t('has_container')">
      <SliderToggle v-model="blockInfo.options.hasContainer" />
    </option-widget>

    <option-widget :title="t('font_size')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.fontSize" min="1" max="10" step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.fontSize }}rem</small>
        </div>
      </div>
    </option-widget>

    <MarginOption :options="blockInfo.options" />

    <BackgroundImageOption :block-info="blockInfo" />

    <option-widget :title="t('css_classes')" align="vertical" :is-expandable="true">
      <textarea class="bg-page-builder-input" v-model="blockInfo.options.cssClasses"></textarea>
    </option-widget>

    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.styles"></CodeMirrorEditor>
    </option-widget>
  </BaseOption>
</template>