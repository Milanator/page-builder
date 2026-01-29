<script setup lang="ts">
import OptionWidget from "@/lib/widgets/OptionWidget.vue";
import { useTranslator } from '@/lib/Translator';
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { ref } from "vue";

import '@cyhnkckali/vue3-color-picker/dist/style.css'

interface Props {
    options: any
}

defineProps<Props>()

const open = ref<boolean>()

const { t } = useTranslator();
</script>
<template>
    <option-widget :title="t('background_image')" align="vertical">
        <input type="url" class="bg-page-builder-input" v-model="options.backgroundImage"
            :placeholder="t('apply_image_url')">
    </option-widget>

    <option-widget :title="t('background_color')">
        <div>
            <div class="relative">
                <button type="button"
                    class="bcpb:cursor-pointer bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:bg-blue-600 bcpb:text-white bcpb:rounded-lg hover:bcpb:bg-blue-700 focus:bcpb:ring-2 focus:bcpb:ring-blue-500/20 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm"
                    @click="open = true">
                    {{ t('menu') }}
                </button>
                <Vue3ColorPicker v-if="open" v-model="options.backgroundColor" mode="solid"
                    class="bcpb:absolute bcpb:right-0 bcpb:left-auto! bcpb:z-30" @onCancel="open = false" />
            </div>
        </div>
    </option-widget>
</template>