<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";
import { useTranslator } from '@/lib/Translator';
import BackgroundImageOption from "@/lib/block-components/partials/BackgroundImageOption.vue";
import BackgroundColorOption from "@/lib/block-components/partials/BackgroundColorOption.vue";
import { debounce } from "@/lib/utils/helper";
import { ChangeOptionEmit } from "@/lib/utils/types";

interface Props {
    blockInfo: SettingBlock
}

defineProps<Props>()

const emit = defineEmits<ChangeOptionEmit>()
const { t } = useTranslator();

const onChangeOption = debounce(() => emit('onChangeOption'))
</script>
<template>
    <BaseOption :title="t('settings')" :can-delete="false">
        <BackgroundImageOption v-model="blockInfo.options.backgroundImage" @update:model-value="onChangeOption" />
        <BackgroundColorOption v-model="blockInfo.options.backgroundColor" @update:model-value="onChangeOption" />
    </BaseOption>
</template>