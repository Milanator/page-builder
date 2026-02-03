<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import { MarginOptions } from "@/lib/utils/types";
import { reactive, watch } from "vue";

interface Emit {
    (event: 'update:modelValue', value: unknown): void
}

interface Props {
    modelValue: MarginOptions
}

interface ModelType extends MarginOptions {
    [key: string]: string | number | undefined
}

const MARGINS = [
    { attr: 'marginLeft', key: 'left' },
    { attr: 'marginRight', key: 'right' },
    { attr: 'marginTop', key: 'top' },
    { attr: 'marginBottom', key: 'bottom' },
]

const emit = defineEmits<Emit>()
const props = defineProps<Props>()
const model = reactive<ModelType>({ ...props.modelValue })
const { t } = useTranslator();

watch(model, (val) => emit('update:modelValue', val), { deep: true })
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