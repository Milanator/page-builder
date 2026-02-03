<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { useTranslator } from '@/lib/Translator';
import RangeInput from "@/lib/controls/RangeInput.vue";
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";
import StyleOption from "@/lib/block-components/partials/StyleOption.vue";
import { ChangeOptionEmit } from "@/lib/utils/types.ts";
import { debounce } from "@/lib/utils/helper.ts";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

const emit = defineEmits<ChangeOptionEmit>()
const { t } = useTranslator();

const onChangeOption = debounce(() => emit('onChangeOption'))
</script>
<template>
  <BaseOption title="Text">
    <!-- Font size -->
    <option-widget :title="t('font_size')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.fontSize" @update:model-value="onChangeOption" min="0" max="8"
            step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.fontSize }}</small>
        </div>
      </div>
    </option-widget>
    <!-- Line height -->
    <option-widget :title="t('line_height')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.lineHeight" @update:model-value="onChangeOption" min="1" max="5"
            step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.lineHeight }}</small>
        </div>
      </div>
    </option-widget>
    <!-- Letter spacing -->
    <option-widget :title="t('letter_spacing')">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
        <div
          class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:p-2 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200">
          <RangeInput v-model="blockInfo.options.letterSpacing" @update:model-value="onChangeOption" min="1" max="15"
            step="0.1" />
          <small class="text-muted text-xs bcpb:w-12">{{ blockInfo.options.letterSpacing }}</small>
        </div>
      </div>
    </option-widget>
    <!-- Margin -->
    <MarginOption v-model="blockInfo.options" @update:model-value="onChangeOption" />
    <!-- Classes -->
    <option-widget :title="t('css_classes')" align="vertical" :is-expandable="true">
      <textarea class="bg-page-builder-input" v-model="blockInfo.options.cssClasses" @input="onChangeOption"></textarea>
    </option-widget>
    <!-- Styles -->
    <StyleOption v-model="blockInfo.options.styles" @update:model-value="onChangeOption" />
  </BaseOption>
</template>