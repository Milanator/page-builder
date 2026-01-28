<script setup lang="ts">
import OptionWidget from "../../widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    options: unknown
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('background_image')" align="vertical">
        <input type="url" v-model="options.backgroundImage" :placeholder="t('apply_image_url')"
            class="bg-page-builder-input">
    </option-widget>
</template>