<script setup lang="ts">
import BasePreview from '@/lib/block-components/BasePreview.vue';
import { ImageBlock } from '@/lib/utils/blocks/ImageBlock';
import { borderRadiusStyles, marginStyles } from '@/lib/utils/style';
import { watchEffect } from 'vue';

const props = defineProps<{
    blockInfo: ImageBlock;
    inEditor?: boolean;
}>();

watchEffect(() => {
    props.blockInfo.options.mediaUrl = props.blockInfo.options.mediaUrl || 'https://placehold.co/200x200/EEE/31343C'
})
</script>
<template>
    <BasePreview :in-editor="inEditor" :has-container="blockInfo.options.hasContainer">
        <div class="image-container bcpb:overflow-hidden" :class="blockInfo.options.cssClasses" :style="[
            marginStyles(blockInfo.options),
            borderRadiusStyles(blockInfo.options),
        ]">
            <img :src="props.blockInfo.options.mediaUrl" class="bcpb:object-cover"
                :class="{ 'bcpb:w-full': blockInfo.options.stretched }" alt="Image url">
        </div>
    </BasePreview>
</template>
<style scoped></style>
