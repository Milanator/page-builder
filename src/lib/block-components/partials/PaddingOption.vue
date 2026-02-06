<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import { PaddingOptions } from "@/lib/utils/types";

type PaddingType = { attr: keyof PaddingOptions; key: string }[];

const model = defineModel<PaddingOptions>({ required: true })
const { t } = useTranslator();
const PADDINGS: PaddingType = [
    { attr: 'paddingLeft', key: 'left' },
    { attr: 'paddingRight', key: 'right' },
    { attr: 'paddingTop', key: 'top' },
    { attr: 'paddingBottom', key: 'bottom' },
]
</script>
<template>
    <option-widget :title="t('indent')" align="vertical">
        <div class="bcpb:grid-cols-4 grid bcpb:gap-2">
            <div v-for="padding in PADDINGS">
                <input type="number" step="1" class="bg-page-builder-input bcpb:w-8" v-model="model[padding.attr]" />
                <p class="bcpb:text-[0.7rem] bcpb:pl-2 bcpb:pt-1 bcpb:text-slate-400">{{ t(padding.key) }}</p>
            </div>
        </div>
    </option-widget>
</template>