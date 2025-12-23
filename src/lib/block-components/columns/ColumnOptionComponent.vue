<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import { ColumnBlock } from "../../utils/blocks/ColumnBlock.ts";
import { onMounted, ref, watch } from "vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import SliderToggle from "../../controls/SliderToggle.vue";
import ColorInput from "../../controls/ColorInput.vue";
import { setLocale, t } from "../../translations.ts";

interface Props {
  blockInfo: ColumnBlock
}

const props = defineProps<Props>()

const selectedColumn = ref(1);

const onSelectColumn = (columnIndex: number) => {
  selectedColumn.value = columnIndex
}

onMounted(() => {
  setLocale()
})

watch(
  () => props.blockInfo.options.columns,
  (newColumnNumber, oldColumnNumber) => {
    if (newColumnNumber === oldColumnNumber) return;

    const columnStyles = props.blockInfo.options.columnStyles;

    if (newColumnNumber > oldColumnNumber) {
      for (let i = oldColumnNumber + 1; i <= newColumnNumber; i++) {
        if (!columnStyles[i]) {
          columnStyles[i] = {
            styleClass: 'bc-page-builder-col',
            backgroundColor: '#ffffff',
            backgroundImage: '',
            styles: 'padding: 10px'
          };
        }
      }
    }

    // Remove extra columns
    if (newColumnNumber < oldColumnNumber) {
      for (let i = oldColumnNumber; i > newColumnNumber; i--) {
        delete columnStyles[i];
      }
    }
  }
);
</script>

<template>
  <BaseOption :title="t('Columns')">
    <!-- Main Column Settings -->
    <div class="bcpb:space-y-1">
      <OptionWidget :title="t('switch_columns')">
        <SliderToggle v-model="blockInfo.options.switchCols" />
      </OptionWidget>

      <option-widget :title="t('has_container')">
        <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
      </option-widget>

      <option-widget :title="t('background_color')">
        <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
      </option-widget>

      <option-widget :title="t('background_image')" align="vertical">
        <input type="url" :placeholder="t('apply_image_url')" v-model="blockInfo.options.backgroundImage"
          class="bg-page-builder-input">
      </option-widget>

      <option-widget :title="t('columns')">
        <div class="bcpb:flex bcpb:flex-wrap bcpb:gap-2">
          <button v-for="colNum in 6" :key="colNum" @click="blockInfo.options.columns = colNum"
            class="bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:rounded-md bcpb:border bcpb:transition-colors bcpb:duration-200 bcpb:min-w-[60px]"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white bcpb:border-blue-600': blockInfo.options.columns === colNum,
              'bcpb:bg-white bcpb:text-gray-700 bcpb:border-gray-300 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400': blockInfo.options.columns !== colNum
            }">
            {{ colNum }} {{ t('columns') }}
          </button>
        </div>
      </option-widget>

      <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.styles"></CodeMirrorEditor>
      </option-widget>
    </div>

    <!-- Column Tabs -->
    <div class="bcpb:mt-6 bcpb:border-t bcpb:border-gray-100 bcpb:pt-4">
      <div class="bcpb:flex bcpb:overflow-x-auto scrollbar-hide bcpb:border-b bcpb:border-gray-200">
        <button v-for="column of blockInfo.options.columns" :key="column" @click="onSelectColumn(column)"
          class="bcpb:flex-shrink-0 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:border-b-2 bcpb:whitespace-nowrap"
          :class="{
            'bcpb:text-blue-600 bcpb:border-blue-600 bcpb:bg-blue-50': selectedColumn === column,
            'bcpb:text-gray-500 bcpb:border-transparent hover:bcpb:text-gray-700 hover:bcpb:border-gray-300': selectedColumn !== column
          }">
          {{ t('column') }} {{ column }}
        </button>
      </div>
    </div>

    <!-- Individual Column Settings -->
    <div class="bcpb:mt-4 bcpb:space-y-1">
      <option-widget :title="t('css_classes')" align="vertical">
        <textarea v-model="blockInfo.options.columnStyles[selectedColumn].styleClass" rows="2"
          class="bg-page-builder-input bg-page-builder-textarea"></textarea>
      </option-widget>

      <option-widget :title="t('background_color')">
        <ColorInput v-model="blockInfo.options.columnStyles[selectedColumn].backgroundColor"></ColorInput>
      </option-widget>

      <option-widget :title="t('background_image')" align="vertical">
        <input type="url" :placeholder="t('apply_image_url')"
          v-model="blockInfo.options.columnStyles[selectedColumn].backgroundImage" class="bg-page-builder-input">
      </option-widget>

      <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="blockInfo.options.columnStyles[selectedColumn].styles"></CodeMirrorEditor>
      </option-widget>
    </div>
  </BaseOption>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>