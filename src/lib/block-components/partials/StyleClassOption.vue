<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';

interface Emit {
    (event: 'update:modelValue', value: unknown): void
}

const emit = defineEmits<Emit>()
const model = defineModel()
const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('css_classes')" align="vertical">
        <textarea v-model="model.styleClass" @input="emit('update:modelValue', model)" rows="2"
            class="bg-page-builder-input bg-page-builder-textarea"></textarea>
    </option-widget>
</template>