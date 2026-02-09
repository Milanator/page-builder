<script setup lang="ts">
import BaseOption from '@/lib/block-components/BaseOption.vue';
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { ColumnBlock, VerticalAlign } from "@/lib/utils/blocks/ColumnBlock.ts";
import { nextTick, ref, watch } from "vue";
import SliderToggle from '@/lib/controls/SliderToggle.vue';
import { useTranslator } from '@/lib/Translator';
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";
import BackgroundImageOption from "@/lib/block-components/partials/BackgroundImageOption.vue";
import BackgroundColorOption from "@/lib/block-components/partials/BackgroundColorOption.vue";
import StyleOption from "@/lib/block-components/partials/StyleOption.vue";
import StyleClassOption from "@/lib/block-components/partials/StyleClassOption.vue";
import BorderRadiusOption from "@/lib/block-components/partials/BorderRadiusOption.vue";
import { debounce } from "@/lib/utils/helper.ts";
import { ChangeOptionEmit } from "@/lib/utils/types.ts";
import PaddingOption from '@/lib/block-components/partials/PaddingOption.vue';

interface Props {
  blockInfo: ColumnBlock
}

const emit = defineEmits<ChangeOptionEmit>()
const props = defineProps<Props>()
const selectedColumn = ref<number>(1);
const { t } = useTranslator();

const onSelectColumn = (columnIndex: number) => {
  selectedColumn.value = columnIndex
}

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
            backgroundColor: 'transparent',
            backgroundImage: undefined,
            styles: 'padding: 10px',
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

const onChangeOption = debounce(() => emit('onChangeOption'))

const onChangeAlign = (align: VerticalAlign) => {
  props.blockInfo.options.verticalAlign = align
  onChangeOption()
}

const onChangeColumns = async (columnIndex: number) => {
  props.blockInfo.options.columns = columnIndex
  await nextTick()
  for (const key in props.blockInfo.options.columnStyles) {
    props.blockInfo.options.columnStyles[key].width = 100 / columnIndex
  }

  onChangeOption()
}

const onChangeWidthOption = () => {
  // recalculate next/previous column on recalculcation specified column
  if (Object.values(props.blockInfo.options.columnStyles).length > 1) {
    let widthSum = 0
    for (const key in props.blockInfo.options.columnStyles) {
      widthSum += Number(props.blockInfo.options.columnStyles[key].width) ?? 0
    }

    // recalculate next or previous col
    const toRecalculateColumn = props.blockInfo.options.columnStyles[selectedColumn.value + 1] ?? props.blockInfo.options.columnStyles[selectedColumn.value - 1]
    toRecalculateColumn.width = Number(toRecalculateColumn.width) + (100 - widthSum)
  }

  onChangeOption()
}
</script>
<template>
  <BaseOption :title="t('Columns')">
    <!-- Main Column Settings -->
    <div class="bcpb:space-y-1">
      <!-- Switch -->
      <OptionWidget :title="t('switch_columns')">
        <SliderToggle v-model="blockInfo.options.switchCols" @update:model-value="onChangeOption" />
      </OptionWidget>
      <!-- Alignment -->
      <option-widget :title="t('alignment')">
        <div class="bcpb:flex bcpb:rounded-lg bcpb:border bcpb:border-gray-300 bcpb:overflow-hidden">
          <button @click="onChangeAlign('start')"
            class="bcpb:cursor-pointer bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.verticalAlign === 'start',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.verticalAlign !== 'start'
            }" :title="t('align_left')">
            <img src="@/assets/icons/v-align-top.svg" alt="Align start" class="bcpb:w- bcpb:h-4">
          </button>
          <button @click="onChangeAlign('center')"
            class="bcpb:cursor-pointer bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center bcpb:border-x bcpb:border-gray-300"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.verticalAlign === 'center',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.verticalAlign !== 'center'
            }" :title="t('align_center')">
            <img src="@/assets/icons/v-align-center.svg" alt="Align center" class="bcpb:w- bcpb:h-4">
          </button>
          <button @click="onChangeAlign('end')"
            class="bcpb:cursor-pointer bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.verticalAlign === 'end',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.verticalAlign !== 'end'
            }" :title="t('align_end')">
            <img src="@/assets/icons/v-align-bottom.svg" alt="Align end" class="bcpb:w- bcpb:h-4">
          </button>
        </div>
      </option-widget>
      <!-- Padding -->
      <PaddingOption v-model="blockInfo.options" @update:model-value="onChangeOption" />
      <!-- Border radius -->
      <BorderRadiusOption v-model="blockInfo.options" @update:model-value="onChangeOption" />
      <!-- Background -->
      <BackgroundImageOption v-model="blockInfo.options.backgroundImage" @update:model-value="onChangeOption" />
      <BackgroundColorOption v-model="blockInfo.options.backgroundColor" @update:model-value="onChangeOption" />
      <!-- Columns -->
      <option-widget :title="t('column_count')" align="vertical">
        <div class="bcpb:grid bcpb:gap-2 bcpb:grid-cols-6">
          <button v-for="colNum in 6" :key="colNum" @click="onChangeColumns(colNum)"
            class="bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:rounded-md bcpb:border bcpb:transition-colors bcpb:duration-200 bcpb:cursor-pointer"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white bcpb:border-blue-600': blockInfo.options.columns === colNum,
              'bcpb:bg-white bcpb:text-gray-700 bcpb:border-gray-300 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400': blockInfo.options.columns !== colNum
            }">
            {{ colNum }}
          </button>
        </div>
      </option-widget>
      <!-- Styles -->
      <StyleOption v-model="blockInfo.options.styles" @update:model-value="onChangeOption" />
    </div>
    <!-- Column Tabs -->
    <div class="bcpb:mt-6 bcpb:border-t bcpb:border-gray-100 bcpb:pt-4">
      <div class="bcpb:flex bcpb:overflow-x-auto scrollbar-hide bcpb:border-b bcpb:border-gray-200">
        <button v-for="column of blockInfo.options.columns" :key="column" @click="onSelectColumn(column)"
          class="bcpb:shrink-0 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:border-b-2 bcpb:whitespace-nowrap"
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
      <!-- Font size -->
      <option-widget :title="t('width_percent')">
        <input type="number" min="0" step="1" max="100" class="bg-page-builder-input bcpb:w-24!"
          v-model.number="blockInfo.options.columnStyles[selectedColumn].width"
          @update:model-value="onChangeWidthOption" />
      </option-widget>
      <!-- Margin -->
      <MarginOption v-model="blockInfo.options.columnStyles[selectedColumn]" @update:model-value="onChangeOption" />
      <!-- Background -->
      <BackgroundImageOption v-model="blockInfo.options.columnStyles[selectedColumn].backgroundImage"
        @update:model-value="onChangeOption" />
      <BackgroundColorOption v-model="blockInfo.options.columnStyles[selectedColumn].backgroundColor"
        @update:model-value="onChangeOption" />
      <!-- Radius -->
      <BorderRadiusOption v-model="blockInfo.options.columnStyles[selectedColumn]"
        @update:model-value="onChangeOption" />
      <!-- Classes -->
      <StyleClassOption v-model="blockInfo.options.columnStyles[selectedColumn].styleClass"
        @update:model-value="onChangeOption" />
      <!-- Styles -->
      <StyleOption v-model="blockInfo.options.columnStyles[selectedColumn].styles"
        @update:model-value="onChangeOption" />
    </div>
  </BaseOption>
</template>
<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>