<script setup lang="ts">
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { onMounted, onUnmounted, ref } from "vue";

import '@cyhnkckali/vue3-color-picker/dist/style.css'

interface Props {
    color?: string | undefined;
}

interface Emits {
    (event: 'onChange', value: string): any,
}

const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
    color: '#000'
});
const open = ref<boolean>(false)
const pickerEl = ref<HTMLElement>();

const closePicker = () => {
    open.value = false
}

const onClickOutside = (event: Event) => {
    if (pickerEl.value && !pickerEl.value.contains(event.target as HTMLElement)) {
        closePicker();
    }
}

const onSave = (color: string | undefined) => {
    if (!color) {
        return;
    }

    emit('onChange', color)
    closePicker()
}

const onOpen = () => {
    open.value = true
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
            <slot :onClick="onOpen" />
            <div ref="pickerEl" class="bcpb:absolute bcpb:right-0 bcpb:left-auto! bcpb:z-30">
                <Vue3ColorPicker v-if="open" mode="solid" :showColorList="false" :showPickerMode="false"
                    :showButtons="true" @onCancel="closePicker" @onSave="onSave" />
            </div>
        </div>
    </div>
</template>