<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    options: any
}

defineProps<Props>()

const { t } = useTranslator();

const BORDER_RADIUS = [
    { attr: 'borderBottomLeftRadius', key: 'left' },
    { attr: 'borderBottomRightRadius', key: 'right' },
    { attr: 'borderTopRightRadius', key: 'top' },
    { attr: 'borderTopLeftRadius', key: 'bottom' },
]
</script>
<template>
    <option-widget :title="t('border_radius')">
        <div class="bcpb:grid-cols-2 grid bcpb:gap-1">
            <div v-for="radius in BORDER_RADIUS">
                <input type="number" step="1" class="bg-page-builder-input bcpb:w-8" v-model="options[radius.attr]" />
                <p class="bcpb:text-[0.7rem] bcpb:pl-2 bcpb:pt-1 bcpb:text-slate-400">{{ t(radius.key) }}</p>
            </div>
        </div>
    </option-widget>
</template>