<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import ColorInput from "@/lib/controls/ColorInput.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    options: any
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('background_image')" align="vertical">
        <input type="url" class="bg-page-builder-input" v-model="options.backgroundImage"
            :placeholder="t('apply_image_url')">
    </option-widget>

    <option-widget :title="t('background_color')">
        <ColorInput v-model="options.backgroundColor"></ColorInput>
    </option-widget>
</template>