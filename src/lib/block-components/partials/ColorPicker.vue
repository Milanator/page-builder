<script setup lang="ts">
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { onMounted, onUnmounted, ref, watch } from "vue";

import '@cyhnkckali/vue3-color-picker/dist/style.css'

interface Props {
    color?: string | undefined;
}

interface Emits {
    (event: 'onChange', value: string): any,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>();
const color = ref<string>(props.color || '#000')
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

const onOpen = () => {
    open.value = true
}

watch(() => color.value, (value) => {
    emit('onChange', value)
})

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
            <!-- Preview -->
            <div class="bcpb:h-8 bcpb:w-8 bcpb:rounded-md bcpb:cursor-pointer bcpb:hover:opacity-90 bcpb:transition-colors"
                :style="{ backgroundColor: color }" @click="onOpen" />
            <!-- Picker -->
            <div ref="pickerEl" class="bcpb:absolute bcpb:right-0 bcpb:left-auto! bcpb:z-30">
                <Vue3ColorPicker v-if="open" mode="solid" :showColorList="false" :showPickerMode="false"
                    v-model="color" />
            </div>
        </div>
    </div>
</template>