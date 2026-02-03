<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import CodeMirrorEditor from "@/lib/editors/CodeMirrorEditor.vue";
import { useTranslator } from '@/lib/Translator';
import { watch } from "vue";

interface Emit {
    (event: 'update:modelValue', value: unknown): void
}

const emit = defineEmits<Emit>()
const model = defineModel<string | undefined>()
const { t } = useTranslator();

watch(() => model.value, () => emit('update:modelValue', model.value))
</script>
<template>
    <option-widget :title="t('custom_styles')" align="vertical" :is-expandable="true">
        <CodeMirrorEditor v-model="model" />
    </option-widget>
</template>