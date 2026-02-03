<script setup lang="ts">
import { ButtonBlock } from "@/lib/utils/blocks/ButtonBlock.ts";
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import BaseOption from "../BaseOption.vue";
import { useTranslator } from '@/lib/Translator';
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";
import BackgroundImageOption from "@/lib/block-components/partials/BackgroundImageOption.vue";
import StyleOption from "@/lib/block-components/partials/StyleOption.vue";
import StyleClassOption from "@/lib/block-components/partials/StyleClassOption.vue";
import { ChangeOptionEmit } from "@/lib/utils/types.ts";
import { debounce } from "@/lib/utils/helper.ts";

type Direction = 'left' | 'center' | 'right'

interface Props {
  blockInfo: ButtonBlock
}

const props = defineProps<Props>()
const emit = defineEmits<ChangeOptionEmit>()
const { t } = useTranslator();

const onChangeAlign = (direction: Direction) => {
  props.blockInfo.options.buttonAlign = direction
  onChangeOption()
}

const onChangeOption = debounce(() => emit('onChangeOption'))
</script>
<template>
  <BaseOption :title="t('Button')">
    <!-- Basic Settings -->
    <div class="bcpb:space-y-1">
      <!-- Margin -->
      <MarginOption v-model="blockInfo.options" @update:model-value="onChangeOption" />
      <!-- Background -->
      <BackgroundImageOption v-model="blockInfo.options" @update:model-value="onChangeOption" />
      <!-- Alignment -->
      <option-widget :title="t('alignment')">
        <div class="bcpb:flex bcpb:rounded-lg bcpb:border bcpb:border-gray-300 bcpb:overflow-hidden">
          <button @click="onChangeAlign('left')"
            class="bcpb:cursor-pointer bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.buttonAlign === 'left',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.buttonAlign !== 'left'
            }" :title="t('align_left')">
            <img src="@/assets/icons/align-left.svg" alt="Align left" class="bcpb:w- bcpb:h-4">
          </button>
          <button @click="onChangeAlign('center')"
            class="bcpb:cursor-pointer bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center bcpb:border-x bcpb:border-gray-300"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.buttonAlign === 'center',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.buttonAlign !== 'center'
            }" :title="t('align_center')">
            <img src="@/assets/icons/align-center.svg" alt="Align center" class="bcpb:w- bcpb:h-4">
          </button>
          <button @click="onChangeAlign('right')"
            class="bcpb:cursor-pointer bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.buttonAlign === 'right',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.buttonAlign !== 'right'
            }" :title="t('align_right')">
            <img src="@/assets/icons/align-right.svg" alt="Align right" class="bcpb:w- bcpb:h-4">
          </button>
        </div>
      </option-widget>
    </div>
    <div>
      <div class="bcpb:space-y-1">
        <!-- Button text -->
        <option-widget :title="t('button_text')">
          <input type="text" v-model="blockInfo.options.text" :placeholder="t('enter_button_text')"
            class="bg-page-builder-input" @input="onChangeOption">
        </option-widget>
        <option-widget :title="t('click_action')">
          <div class="bcpb:space-y-3">
            <div class="bcpb:relative">
              <!-- Action type -->
              <select v-model="blockInfo.options.buttonAction.type" class="bg-page-builder-input bg-page-builder-select"
                @change="onChangeOption">
                <option :value="null">{{ t('select_action') }}</option>
                <option value="external_link">{{ t('visit_external_link') }}</option>
                <option value="internal_link">{{ t('visit_internal_link') }}</option>
              </select>
              <div
                class="bcpb:absolute bcpb:inset-y-0 bcpb:right-0 bcpb:flex bcpb:items-center bcpb:pr-3 bcpb:pointer-events-none">
                <svg class="bcpb:w-4 bcpb:h-4 bcpb:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <!-- Action link -->
            <input v-if="blockInfo.options.buttonAction.type" type="url" v-model="blockInfo.options.buttonAction.url"
              :placeholder="t('enter_url')" class="bg-page-builder-input" @input="onChangeOption">
          </div>
        </option-widget>
        <!-- Classes -->
        <StyleClassOption v-model="blockInfo.options.styleClass" @update:model-value="onChangeOption" />
        <!-- Styles -->
        <StyleOption v-model="blockInfo.options.styles" @update:model-value="onChangeOption" />
      </div>
    </div>
  </BaseOption>
</template>