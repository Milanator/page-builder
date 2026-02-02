<script setup lang="ts">
import { useTranslator } from '@/lib/Translator';

interface Props {
  options: any
}

defineProps<Props>()

const { t } = useTranslator();
</script>
<template>
  <option-widget :title="t('has_container')">
    <SliderToggle v-model="options.hasContainer"></SliderToggle>
  </option-widget>
</template>