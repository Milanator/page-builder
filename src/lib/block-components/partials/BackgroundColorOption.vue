<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import ColorPicker from "@/lib/block-components/partials/ColorPicker.vue";

const model = defineModel<string | undefined>()
const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('background_color')">
        <ColorPicker v-model="model" />
    </option-widget>
</template>