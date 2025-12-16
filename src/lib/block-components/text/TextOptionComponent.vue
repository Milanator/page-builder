<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import {TextBlock} from "../../utils/blocks/TextBlock.ts";
import SliderToggle from "../../controls/SliderToggle.vue";
import ColorInput from "../../controls/ColorInput.vue";
import { setLocale, t } from "../../translations.ts";
import { onMounted } from "vue";

interface Props {
  blockInfo: TextBlock
}

defineProps<Props>()

onMounted(()=>{
  setLocale()
})
</script>
<template>
  <BaseOption title="Text">

    <option-widget :title="t('has_container')">
      <SliderToggle v-model="blockInfo.options.hasContainer"></SliderToggle>
    </option-widget>

    <option-widget :title="t('background_color')">
      <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
    </option-widget>

    <option-widget :title="t('background_image')" align="vertical">
      <input type="url" class="bg-page-builder-input" v-model="blockInfo.options.backgroundImage"
             :placeholder="t('apply_image_url')">
    </option-widget>

    <option-widget :title="t('css_classes')" align="vertical" :is-expandable="true">
      <textarea class="bg-page-builder-input" v-model="blockInfo.options.cssClasses"></textarea>
    </option-widget>

    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.styles"></CodeMirrorEditor>
    </option-widget>
  </BaseOption>
</template>