<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface Props {
    text: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    offset?: number
}

const props = withDefaults(defineProps<Props>(), {
    placement: 'top',
    offset: 8
})

const triggerEl = ref<HTMLElement | null>(null)
const tooltipEl = ref<HTMLElement | null>(null)
const visible = ref<boolean>(false)

const style = ref<Record<string, string>>({})

const setTooltipPosition = async () => {
    await nextTick()

    if (!triggerEl.value || !tooltipEl.value) return

    const trigger = triggerEl.value.getBoundingClientRect()
    const tooltip = tooltipEl.value.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    let placement = props.placement
    let top = 0
    let left = 0

    const fitsTop = trigger.top >= tooltip.height + props.offset
    const fitsBottom = vh - trigger.bottom >= tooltip.height + props.offset
    const fitsLeft = trigger.left >= tooltip.width + props.offset
    const fitsRight = vw - trigger.right >= tooltip.width + props.offset

    if (placement === 'top' && !fitsTop && fitsBottom) placement = 'bottom'
    if (placement === 'bottom' && !fitsBottom && fitsTop) placement = 'top'
    if (placement === 'left' && !fitsLeft && fitsRight) placement = 'right'
    if (placement === 'right' && !fitsRight && fitsLeft) placement = 'left'

    switch (placement) {
        case 'top':
            top = trigger.top - tooltip.height - props.offset
            left = trigger.left + trigger.width / 2 - tooltip.width / 2
            break
        case 'bottom':
            top = trigger.bottom + props.offset
            left = trigger.left + trigger.width / 2 - tooltip.width / 2
            break
        case 'left':
            top = trigger.top + trigger.height / 2 - tooltip.height / 2
            left = trigger.left - tooltip.width - props.offset
            break
        case 'right':
            top = trigger.top + trigger.height / 2 - tooltip.height / 2
            left = trigger.right + props.offset
            break
    }

    style.value = {
        top: `${Math.max(8, top)}px`,
        left: `${Math.max(8, left)}px`
    }
}

const show = async () => {
    visible.value = true
    await setTooltipPosition()
}

const hide = () => {
    visible.value = false
}

onMounted(() => {
    window.addEventListener('scroll', setTooltipPosition, true)
    window.addEventListener('resize', setTooltipPosition)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', setTooltipPosition, true)
    window.removeEventListener('resize', setTooltipPosition)
})
</script>
<template>
    <span ref="triggerEl" class="bcpb:m-0" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
        <slot />
    </span>

    <Teleport to="body">
        <div v-if="visible" ref="tooltipEl"
            class="tooltip bcpb:px-3 bcpb:py-2 bcpb:rounded-md bcpb:shadow-lg bcpb:bg-gray-700" :style="style"
            role="tooltip">
            <span class="bcpb:text-sm bcpb:whitespace-nowrap bcpb:text-white">
                {{ text }}
            </span>
        </div>
    </Teleport>
</template>
<style scoped>
.tooltip {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    line-height: 1;
}
</style>
