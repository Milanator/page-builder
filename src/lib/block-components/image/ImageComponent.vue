<script setup lang="ts">
import BasePreview from '@/lib/block-components/BasePreview.vue';
import { ImageBlock } from '@/lib/utils/blocks/ImageBlock';
import { borderRadiusStyles, marginStyles } from '@/lib/utils/style';
import { watchEffect } from 'vue';

interface Props {
    blockInfo: ImageBlock;
    inEditor?: boolean;
}

const props = defineProps<Props>();

watchEffect(() => {
    props.blockInfo.options.mediaUrl = props.blockInfo.options.mediaUrl || 'https://placehold.co/200x200/EEE/31343C'
})
</script>
<template>
    <BasePreview :in-editor="inEditor">
        <div class="image-container bcpb:overflow-hidden" :class="blockInfo.options.cssClasses"
            :style="marginStyles(blockInfo.options)">
            <img :src="props.blockInfo.options.mediaUrl" class="bcpb:object-cover"
                :class="{ 'bcpb:w-full': blockInfo.options.stretched }" :style="borderRadiusStyles(blockInfo.options)"
                alt="Image url">
        </div>
    </BasePreview>
</template>
