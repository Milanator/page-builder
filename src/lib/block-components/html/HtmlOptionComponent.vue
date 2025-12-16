<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import {HtmlBlock} from "../../utils/blocks/HtmlBlock.ts";
import { setLocale, t } from "../../translations.ts";
import { onMounted } from "vue";

interface Props {
  blockInfo: HtmlBlock
}

defineProps<Props>()

onMounted(()=>{
  setLocale()
})
</script>
<template>
  <BaseOption title="HTML">
    <option-widget title="HTML" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.html" language="text/html"></CodeMirrorEditor>
    </option-widget>

    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.css"></CodeMirrorEditor>
    </option-widget>
  </BaseOption>
</template>