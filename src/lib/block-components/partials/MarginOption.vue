<script setup lang="ts">
import OptionWidget from "../../widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    options: any
}

defineProps<Props>()

const { t } = useTranslator();

const MARGINS = [
    { attr: 'marginLeft', key: 'left' },
    { attr: 'marginRight', key: 'right' },
    { attr: 'marginTop', key: 'top' },
    { attr: 'marginBottom', key: 'bottom' },
]
</script>
<template>
    <option-widget :title="t('indent')">
        <div class="bcpb:grid-cols-2 grid bcpb:gap-1">
            <div v-for="margin in MARGINS">
                <input type="number" step="1" class="bg-page-builder-input bcpb:w-8" v-model="options[margin.attr]" />
                <p class="bcpb:text-[0.7rem] bcpb:pl-2 bcpb:pt-1 bcpb:text-slate-400">{{ t(margin.key) }}</p>
            </div>
        </div>
    </option-widget>
</template>