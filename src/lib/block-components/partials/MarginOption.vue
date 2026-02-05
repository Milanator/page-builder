<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import { MarginOptions } from "@/lib/utils/types";

const MARGINS: { attr: keyof MarginOptions; key: string }[] = [
    { attr: 'marginLeft', key: 'left' },
    { attr: 'marginRight', key: 'right' },
    { attr: 'marginTop', key: 'top' },
    { attr: 'marginBottom', key: 'bottom' },
]
const model = defineModel<MarginOptions>({ required: true })
const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('indent')" align="vertical">
        <div class="bcpb:grid-cols-4 grid bcpb:gap-2">
            <div v-for="margin in MARGINS">
                <input type="number" step="1" class="bg-page-builder-input bcpb:w-8" v-model="model[margin.attr]" />
                <p class="bcpb:text-[0.7rem] bcpb:pl-2 bcpb:pt-1 bcpb:text-slate-400">{{ t(margin.key) }}</p>
            </div>
        </div>
    </option-widget>
</template>