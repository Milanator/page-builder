<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import { ColorPicker } from "vue3-colorpicker";

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
        <ColorPicker v-model:pureColor="options.backgroundColor" />
    </option-widget>
</template>