<script setup lang="ts">
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { ref, nextTick, onMounted, onUnmounted } from 'vue';

import '@cyhnkckali/vue3-color-picker/dist/style.css'

interface Emits {
    (event: 'update:modelValue', value: unknown): void
}

defineEmits<Emits>()
const model = defineModel<string | undefined>()
const open = ref(false)
const previewEl = ref<HTMLElement>()
const pickerEl = ref<HTMLElement>()

const closePicker = () => open.value = false

const onClickOutside = (event: Event) => {
    if (
        pickerEl.value && !pickerEl.value.contains(event.target as HTMLElement) &&
        previewEl.value && !previewEl.value.contains(event.target as HTMLElement)
    ) {
        closePicker()
    }
}

const setPickerPosition = () => {
    if (!pickerEl.value || !previewEl.value) {
        return
    }

    const rect = previewEl.value.getBoundingClientRect()
    const pickerRect = pickerEl.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    let top = rect.bottom
    let left = rect.left
    // verical
    if (rect.bottom + pickerRect.height > viewportHeight) {
        top = rect.top - pickerRect.height
    }
    // horizontal
    if (rect.left + pickerRect.width > viewportWidth) {
        left = viewportWidth - pickerRect.width - 8 // margin
    }

    pickerEl.value.style.top = `${top + window.scrollY}px`
    pickerEl.value.style.left = `${left + window.scrollX}px`
}

const onOpen = () => {
    open.value = true
    nextTick(() => setPickerPosition())
}

onMounted(() => {
    document.addEventListener('mousedown', onClickOutside)
    window.addEventListener('resize', setPickerPosition)
})

onUnmounted(() => {
    document.removeEventListener('mousedown', onClickOutside)
    window.removeEventListener('resize', setPickerPosition)
})
</script>
<template>
    <div>
        <!-- trigger -->
        <div ref="previewEl"
            class="bcpb:h-8 bcpb:w-8 bcpb:rounded-md bcpb:cursor-pointer bcpb:hover:opacity-90 bcpb:transition-colors bcpb:border bcpb:border-gray-300"
            :style="{ backgroundColor: model }" @click="onOpen" />
        <!-- picker -->
        <Teleport to="body">
            <div v-if="open" ref="pickerEl" class="bcpb:absolute bcpb:z-9999">
                <Vue3ColorPicker mode="solid" :showColorList="false" :showPickerMode="false" v-model="model" />
            </div>
        </Teleport>
    </div>
</template>
