<script setup lang="ts">
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';

import '@cyhnkckali/vue3-color-picker/dist/style.css'

interface Props {
    color?: string | undefined;
}

interface Emits {
    (event: 'onChange', value: string): any,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const color = ref(props.color || '#000')
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

watch(() => color.value, (value) => emit('onChange', value))

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
        <div ref="previewEl"
            class="bcpb:h-8 bcpb:w-8 bcpb:rounded-md bcpb:cursor-pointer bcpb:hover:opacity-90 bcpb:transition-colors"
            :style="{ backgroundColor: color }" @click="onOpen" />

        <Teleport to="body">
            <div v-if="open" ref="pickerEl" class="bcpb:absolute bcpb:z-9999">
                <Vue3ColorPicker mode="solid" :showColorList="false" :showPickerMode="false" v-model="color" />
            </div>
        </Teleport>
    </div>
</template>
