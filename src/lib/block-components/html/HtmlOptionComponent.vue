<script setup lang="ts">
import BaseOption from '@/lib/block-components/BaseOption.vue';
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import CodeMirrorEditor from "@/lib/editors/CodeMirrorEditor.vue";
import { HtmlBlock } from "@/lib/utils/blocks/HtmlBlock.ts";
import { useTranslator } from '@/lib/Translator.ts';
import { ChangeOptionEmit } from "@/lib/utils/types";
import { debounce } from "@/lib/utils/helper";

interface Props {
  blockInfo: HtmlBlock
}

defineProps<Props>()

const { t } = useTranslator();
const emit = defineEmits<ChangeOptionEmit>()

const onChangeOption = debounce(() => emit('onChangeOption'))
</script>
<template>
  <BaseOption title="HTML">
    <option-widget title="HTML" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.html" language="text/html" @update:model-value="onChangeOption" />
    </option-widget>

    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
      <CodeMirrorEditor v-model="blockInfo.options.css" @update:model-value="onChangeOption" />
    </option-widget>
  </BaseOption>
</template>