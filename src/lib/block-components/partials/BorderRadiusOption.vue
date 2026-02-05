<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import { BorderRadiusOptions } from "@/lib/utils/types";

type BorderRadiusType = { attr: keyof BorderRadiusOptions; key: string }[];

const model = defineModel<BorderRadiusOptions>({ required: true })
const { t } = useTranslator();
const BORDER_RADIUS: BorderRadiusType = [
    { attr: 'borderBottomLeftRadius', key: 'left' },
    { attr: 'borderBottomRightRadius', key: 'right' },
    { attr: 'borderTopRightRadius', key: 'top' },
    { attr: 'borderTopLeftRadius', key: 'bottom' },
]
</script>
<template>
    <option-widget :title="t('border_radius')" align="vertical">
        <div class="bcpb:grid-cols-4 grid bcpb:gap-2">
            <div v-for="radius in BORDER_RADIUS">
                <input type="number" step="1" class="bg-page-builder-input bcpb:w-8" v-model="model[radius.attr]" />
                <p class="bcpb:text-[0.7rem] bcpb:pl-2 bcpb:pt-1 bcpb:text-slate-400">{{ t(radius.key) }}</p>
            </div>
        </div>
    </option-widget>
</template>