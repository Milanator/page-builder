<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import CodeMirrorEditor from "@/lib/editors/CodeMirrorEditor.vue";
import { useTranslator } from '@/lib/Translator';

const model = defineModel<string | undefined>()
const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="model" />
    </option-widget>
</template>