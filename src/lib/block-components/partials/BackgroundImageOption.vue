<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import ColorPicker from "@/lib/block-components/partials/ColorPicker.vue";

interface Emit {
    (event: 'update:modelValue', value: unknown): void
}

const emit = defineEmits<Emit>()
const model = defineModel()
const { t } = useTranslator();
</script>
<template>
    <!-- Background image -->
    <option-widget :title="t('background_image')" align="vertical">
        <input type="url" class="bg-page-builder-input" v-model="model.backgroundImage"
            :placeholder="t('apply_image_url')" @input="emit('update:modelValue', model)" />
    </option-widget>

    <!-- Background color -->
    <option-widget :title="t('background_color')">
        <ColorPicker v-model="model.backgroundColor" @update:modelValue="emit('update:modelValue', model)" />
    </option-widget>
</template>