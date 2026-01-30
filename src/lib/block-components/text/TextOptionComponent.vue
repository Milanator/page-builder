<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { TextBlock } from "../../utils/blocks/TextBlock.ts";
import { useTranslator } from '@/lib/Translator';
import RangeInput from "@/lib/controls/RangeInput.vue";
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";
import StyleOption from "@/lib/block-components/partials/StyleOption.vue";
import ContainerOptionComponent from "@/lib/block-components/partials/ContainerOptionComponent.vue";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
  <BaseOption title="Text">

    <ContainerOptionComponent :options="blockInfo.options" />

    <option-widget :title="t('font_size')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.fontSize" min="0" max="8" step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.fontSize }}</small>
        </div>
      </div>
    </option-widget>

    <option-widget :title="t('line_height')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.lineHeight" min="1" max="5" step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.lineHeight }}</small>
        </div>
      </div>
    </option-widget>

    <option-widget :title="t('letter_spacing')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.letterSpacing" min="1" max="15" step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.letterSpacing }}</small>
        </div>
      </div>
    </option-widget>

    <MarginOption :options="blockInfo.options" />

    <option-widget :title="t('css_classes')" align="vertical" :is-expandable="true">
      <textarea class="bg-page-builder-input" v-model="blockInfo.options.cssClasses"></textarea>
    </option-widget>

    <StyleOption :options="blockInfo.options" />
  </BaseOption>
</template>