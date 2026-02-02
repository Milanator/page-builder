<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";
import { useTranslator } from '@/lib/Translator';
import BackgroundImageOption from "@/lib/block-components/partials/BackgroundImageOption.vue";

interface Props {
    blockInfo: SettingBlock
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
    <BaseOption :title="t('settings')" :can-delete="false">
        <BackgroundImageOption :options="blockInfo.options" />
    </BaseOption>
</template>