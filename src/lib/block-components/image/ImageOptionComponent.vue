<script setup lang="ts">
import BaseOption from '@/lib/block-components/BaseOption.vue';
import OptionWidget from '@/lib/widgets/OptionWidget.vue';
import { ImageBlock } from '@/lib/utils/blocks/ImageBlock.ts';

defineProps<{
    blockInfo: ImageBlock;
    inEditor?: boolean;
}>();
</script>
<template>
    <BaseOption title="Obrázok">
        <OptionWidget title="Nahrať obrázok" align="vertical">
            <!-- Uploader -->
            <slot />
        </OptionWidget>
    </BaseOption>
</template>
<style scoped></style>
