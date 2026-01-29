<script setup lang="ts">
import OptionWidget from "../../widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    options: any
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('css_classes')" align="vertical">
        <textarea v-model="options.styleClass" rows="2"
            class="bg-page-builder-input bg-page-builder-textarea"></textarea>
    </option-widget>
</template>