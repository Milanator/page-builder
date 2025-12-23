<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import CodeMirrorEditor from "../../editors/CodeMirrorEditor.vue";
import { HtmlBlock } from "@/lib/utils/blocks/HtmlBlock.ts";
import { useTranslator } from '@/lib/Translator.ts';

interface Props {
  blockInfo: HtmlBlock
}

defineProps<Props>()

const { t } = useTranslator();
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