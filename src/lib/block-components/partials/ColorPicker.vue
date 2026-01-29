<script setup lang="ts">
import { useTranslator } from '@/lib/Translator';
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { onMounted, onUnmounted, ref } from "vue";

import '@cyhnkckali/vue3-color-picker/dist/style.css'

const model = defineModel<string | undefined>()

const open = ref<boolean>()

const { t } = useTranslator();

const pickerEl = ref<HTMLElement>();

const closePicker = () => {
    open.value = false
}

const onClickOutside = (event: Event) => {
    if (pickerEl.value && !pickerEl.value.contains(event.target as HTMLElement)) {
        closePicker();
    }
}

onMounted(() => {
    document.addEventListener("mousedown", onClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("mousedown", onClickOutside);
});
</script>
<template>
    <div>
        <div class="relative">
            <button type="button"
                class="bcpb:cursor-pointer bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:bg-blue-600 bcpb:text-white bcpb:rounded-lg hover:bcpb:bg-blue-700 focus:bcpb:ring-2 focus:bcpb:ring-blue-500/20 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm"
                @click="open = true">
                {{ t('select') }}
            </button>
            <div ref="pickerEl" class="bcpb:absolute bcpb:right-0 bcpb:left-auto! bcpb:z-30">
                <Vue3ColorPicker v-if="open" v-model="model" mode="solid" :showColorList="false" :showPickerMode="false"
                    @onCancel="closePicker" />
            </div>
        </div>
    </div>
</template>