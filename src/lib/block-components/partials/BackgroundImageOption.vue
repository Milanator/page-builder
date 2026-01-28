<script setup lang="ts">
import OptionWidget from "../../widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    blockInfo: any
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('background_image')" align="vertical">
        <input type="url" class="bg-page-builder-input" v-model="blockInfo.options.backgroundImage"
            :placeholder="t('apply_image_url')">
    </option-widget>
</template>