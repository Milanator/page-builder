<script setup lang="ts">
import { ButtonBlock } from "../../utils/blocks/ButtonBlock.ts";
import OptionWidget from "../../widgets/OptionWidget.vue";
import BaseOption from "../BaseOption.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import SliderToggle from '@/lib/controls/SliderToggle.vue';
import ColorInput from "@/lib/controls/ColorInput.vue";
import { useTranslator } from '@/lib/Translator';
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";

interface Props {
  blockInfo: ButtonBlock
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
  <BaseOption :title="t('Button')">
    <!-- Basic Settings -->
    <div class="bcpb:space-y-1">
      <option-widget :title="t('has_container')">
        <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
      </option-widget>

      <option-widget :title="t('background_color')">
        <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
      </option-widget>

      <MarginOption :options="blockInfo.options" />

      <option-widget :title="t('background_image')" align="vertical">
        <input type="url" v-model="blockInfo.options.backgroundImage" :placeholder="t('apply_image_url')"
          class="bg-page-builder-input">
      </option-widget>

      <option-widget :title="t('alignment')">
        <div class="bcpb:flex bcpb:rounded-lg bcpb:border bcpb:border-gray-300 bcpb:overflow-hidden">
          <button @click="blockInfo.options.buttonAlign = 'left'"
            class="bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.buttonAlign === 'left',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.buttonAlign !== 'left'
            }" :title="t('align_left')">
            <img src="@/assets/icons/align-left.svg" alt="Align left" class="bcpb:w- bcpb:h-4 bcpb:cursor-pointer">
          </button>
          <button @click="blockInfo.options.buttonAlign = 'center'"
            class="bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center bcpb:border-x bcpb:border-gray-300"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.buttonAlign === 'center',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.buttonAlign !== 'center'
            }" :title="t('align_center')">
            <img src="@/assets/icons/align-center.svg" alt="Align center" class="bcpb:w- bcpb:h-4 bcpb:cursor-pointer">
          </button>
          <button @click="blockInfo.options.buttonAlign = 'right'"
            class="bcpb:flex-1 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:transition-colors bcpb:duration-200 bcpb:flex bcpb:items-center bcpb:justify-center"
            :class="{
              'bcpb:bg-blue-600 bcpb:text-white': blockInfo.options.buttonAlign === 'right',
              'bcpb:bg-white bcpb:text-gray-700 hover:bcpb:bg-gray-50': blockInfo.options.buttonAlign !== 'right'
            }" :title="t('align_right')">
            <img src="@/assets/icons/align-right.svg" alt="Align right" class="bcpb:w- bcpb:h-4 bcpb:cursor-pointer">
          </button>
        </div>
      </option-widget>
    </div>

    <!-- Button Content & Actions -->
    <div class="bcpb:mt-6 bcpb:border-t bcpb:border-gray-100 bcpb:pt-4">
      <div class="bcpb:space-y-1">
        <option-widget :title="t('button_text')">
          <input type="text" v-model="blockInfo.options.text" :placeholder="t('enter_button_text')"
            class="bg-page-builder-input">
        </option-widget>

        <option-widget :title="t('click_action')" align="vertical">
          <div class="bcpb:space-y-3">
            <div class="bcpb:relative">
              <select v-model="blockInfo.options.buttonAction.type"
                class="bg-page-builder-input bg-page-builder-select">
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

            <input v-if="blockInfo.options.buttonAction.type" type="url" v-model="blockInfo.options.buttonAction.url"
              :placeholder="t('enter_url')" class="bg-page-builder-input">
          </div>
        </option-widget>

        <option-widget :title="t('css_classes')" align="vertical">
          <textarea v-model="blockInfo.options.styleClass" rows="3" :placeholder="t('enter_css_classes')"
            class="bg-page-builder-input bg-page-builder-textarea"></textarea>
        </option-widget>

        <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
          <CodeMirrorEditor v-model="blockInfo.options.styles" language="text/css"></CodeMirrorEditor>
        </option-widget>
      </div>
    </div>
  </BaseOption>
</template>