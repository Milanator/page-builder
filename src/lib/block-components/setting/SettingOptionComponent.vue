<script setup lang="ts">
import BaseOption from "../BaseOption.vue";
import OptionWidget from "../../widgets/OptionWidget.vue";
import { SettingBlock } from "../../utils/blocks/SettingBlock.ts";
import ColorInput from "@/lib/controls/ColorInput.vue";
import { useTranslator } from '@/lib/Translator';

interface Props {
    blockInfo: SettingBlock
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
    <BaseOption :title="t('settings')">
        <!-- Main Column Settings -->
        <div class="bcpb:space-y-1">
            <option-widget :title="t('background_color')">
                <ColorInput v-model="blockInfo.options.backgroundColor"></ColorInput>
            </option-widget>
        </div>
    </BaseOption>
</template>