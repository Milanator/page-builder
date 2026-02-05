<script setup lang="ts">
import BaseOption from '@/lib/block-components/BaseOption.vue';
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { useTranslator } from '@/lib/Translator';
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
      <input type="number" min="0" step="0.1" class="bg-page-builder-input bcpb:w-24!"
        v-model.number="blockInfo.options.fontSize" @update:model-value="onChangeOption" />
    </option-widget>
    <!-- Line height -->
    <option-widget :title="t('line_height')">
      <input type="number" max="5" step="0.1" class="bg-page-builder-input bcpb:w-24!"
        v-model.number="blockInfo.options.lineHeight" @update:model-value="onChangeOption" />
    </option-widget>
    <!-- Letter spacing -->
    <option-widget :title="t('letter_spacing')">
      <input type="number" max="15" step="0.1" class="bg-page-builder-input bcpb:w-24!"
        v-model.number="blockInfo.options.letterSpacing" @update:model-value="onChangeOption" />
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