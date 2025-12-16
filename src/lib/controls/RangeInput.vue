<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  min: number,
  max: number,
  step: number
}

defineProps<Props>()

const defaultValue = ref<string|undefined>('1')

const model = defineModel({ type: String })

defaultValue.value = model.value

const onReset=()=>{
  model.value = defaultValue.value
}
</script>
<template>
  <div class="bcpb:inline-flex bcpb:items-center">
     <button 
      @click="onReset"
      class="bcpb:flex-shrink-0 bcpb:w-8 bcpb:h-8 bcpb:flex bcpb:items-center bcpb:justify-center bcpb:text-gray-500 hover:bcpb:text-gray-700 hover:bcpb:bg-gray-200 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200 bcpb:text-sm bcpb:font-medium"
      title="Reset Color"
    >
      ↺
    </button>
      <input type="range" value="50" class="bcpb:w-full h-2 bg-neutral-quaternary rounded-full appearance-none cursor-pointer" :min="min" :max="max" :step="step" v-model="model">
  </div>
</template>