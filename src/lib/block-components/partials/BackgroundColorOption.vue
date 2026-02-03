<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import ColorPicker from "@/lib/block-components/partials/ColorPicker.vue";
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
    <option-widget :title="t('background_color')">
        <ColorPicker v-model="model" />
    </option-widget>
</template>