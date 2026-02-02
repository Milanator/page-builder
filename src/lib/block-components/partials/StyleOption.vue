<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import CodeMirrorEditor from "@/lib/editors/CodeMirrorEditor.vue";
import { useTranslator } from '@/lib/Translator';

interface Emit {
    (event: 'update:modelValue', value: unknown): void
}

const emit = defineEmits<Emit>()
const model = defineModel<unknown>()
const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="model.styles" @update:model-value="emit('update:modelValue', model)" />
    </option-widget>
</template>