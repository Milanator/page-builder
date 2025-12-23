<script setup lang="ts">
import BasePreview from '@/lib/block-components/BasePreview.vue';
import { TextBlock } from '@/lib/utils/blocks/TextBlock';

defineProps<{
    blockInfo: TextBlock;
    inEditor?: boolean;
}>();
</script>
<template>
    <BasePreview :in-editor="inEditor" :has-container="blockInfo.options.hasContainer">
        <div class="image-container" :class="blockInfo.options.cssClasses">
            <img v-if="blockInfo.options.imageUrl" :src="blockInfo.options.imageUrl" alt="Image url">
            <img v-else src="https://placehold.co/600x400/EEE/31343C" alt="Placeholder">
        </div>
    </BasePreview>
</template>
<style scoped></style>
