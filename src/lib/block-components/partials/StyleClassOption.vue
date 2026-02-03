<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
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
    <option-widget :title="t('css_classes')" align="vertical">
        <textarea v-model="model" rows="2" class="bg-page-builder-input bg-page-builder-textarea"></textarea>
    </option-widget>
</template>