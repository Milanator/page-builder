<script setup lang="ts">
import { useTranslator } from '@/lib/Translator';
import { PropType } from 'vue';
import { Device } from "@/lib/utils/types.ts";

defineProps({
  showDeviceToolbar: {
    type: Boolean,
    default: true,
  },
  device: {
    type: String as PropType<Device>,
    default: 'desktop',
  }
})

interface Emits {
  (event: 'onPreview', value: boolean): void,
  (event: 'onSave', value: Event): void,
  (event: 'onBack'): void,
  (event: 'onSettings', value: boolean): void,
  (event: 'onDevice', value: Device): void,
  (event: 'onUndo'): void,
  (event: 'onRedo'): void,
}

const emit = defineEmits<Emits>()

const { t } = useTranslator();
</script>
<template>
  <!-- Toolbar -->
  <div
    class="bcpb:bg-white bcpb:border-b bcpb:border-gray-100 bcpb:px-8 bcpb:py-4 bcpb:flex bcpb:items-center bcpb:justify-between bcpb:h-20">
    <div class="bcpb:flex bcpb:items-center bcpb:space-x-6">
      <button type="button" @click="emit('onBack')"
        class="bcpb:cursor-pointer bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-gray-50 bcpb:rounded-lg bcpb:transition-colors bcpb:duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4a5565"
          class="bcpb:w-5 bcpb:h-5 bcpb:cursor-pointer bcpb:mr-1">
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
        {{ t('back') }}
      </button>

      <!-- Device Selector -->
      <div v-if="showDeviceToolbar"
        class="bcpb:flex bcpb:items-center bcpb:bg-gray-50 bcpb:rounded-lg bcpb:p-1 bcpb:border bcpb:border-gray-200">
        <button type="button" @click="emit('onDevice', 'desktop')"
          :class="{ 'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'desktop' }"
          class="bcpb:cursor-pointer bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ t('desktop') }}
          </span>
        </button>
        <button type="button" @click="emit('onDevice', 'tab')"
          :class="{ 'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'tab' }"
          class="bcpb:cursor-pointer bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
            </svg>
            {{ t('tablet') }}
          </span>
        </button>
        <button type="button" @click="emit('onDevice', 'mobile')"
          :class="{ 'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'mobile' }"
          class="bcpb:cursor-pointer bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {{ t('mobile') }}
          </span>
        </button>
        <button type="button" @click="emit('onDevice', 'custom')"
          :class="{ 'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm bcpb:ring-1 bcpb:ring-gray-200': device === 'custom' }"
          class="bcpb:cursor-pointer bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-600 hover:bcpb:text-gray-900 hover:bcpb:bg-white bcpb:rounded-md bcpb:transition-all bcpb:duration-200">
          <span class="bcpb:flex bcpb:items-center bcpb:gap-2">
            <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {{ t('custom') }}
          </span>
        </button>
      </div>

      <!-- Settings Button -->
      <button type="button" @click="emit('onSettings', true)"
        class="bcpb:mr-0 flex bcpb:items-center bcpb:gap-2 bcpb:hover:bg-slate-50 bcpb:px-4 bcpb:py-2 bcpb:rounded-md bcpb:transition-all bcpb:duration-200 bcpb:text-gray-600 hover:bcpb:text-gray-900 bcpb:text-sm bcpb:font-medium bcpb:cursor-pointer">
        <svg class="bcpb:w-4 bcpb:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#354253">
          <path
            d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
        </svg>
        {{ t('settings') }}
      </button>

      <!-- Undo/redo -->
      <button type="button"
        class="bcpb:mr-0 flex bcpb:items-center bcpb:gap-2 bcpb:hover:bg-slate-50 bcpb:px-4 bcpb:py-2 bcpb:rounded-md bcpb:transition-all bcpb:duration-200 bcpb:text-gray-600 hover:bcpb:text-gray-900 bcpb:text-sm bcpb:font-medium bcpb:cursor-pointer"
        @click="emit('onUndo')">
        <img src="@/assets/icons/undo.svg" alt="Undo" class="bcpb:w-5 bcpb:h-5 bcpb:cursor-pointer bcpb:mr-1">
      </button>
      <button type="button"
        class="bcpb:mr-0 flex bcpb:items-center bcpb:gap-2 bcpb:hover:bg-slate-50 bcpb:px-4 bcpb:py-2 bcpb:rounded-md bcpb:transition-all bcpb:duration-200 bcpb:text-gray-600 hover:bcpb:text-gray-900 bcpb:text-sm bcpb:font-medium bcpb:cursor-pointer"
        @click="emit('onRedo')">
        <img src="@/assets/icons/redo.svg" alt="Redo" class="bcpb:w-5 bcpb:h-5 bcpb:cursor-pointer bcpb:mr-1">
      </button>
    </div>

    <div class="bcpb:flex bcpb:items-center bcpb:space-x-3">
      <!-- Preview Button -->
      <button type="button" @click="emit('onPreview', true)"
        class="bcpb:cursor-pointer bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:bg-white bcpb:border bcpb:border-gray-300 bcpb:rounded-lg hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm">
        <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {{ t('preview_mode') }}
      </button>

      <!-- Publish Button -->
      <button type="button" @click="emit('onSave', $event)"
        class="bcpb:cursor-pointer bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:bg-blue-600 bcpb:text-white bcpb:rounded-lg hover:bcpb:bg-blue-700 focus:bcpb:ring-2 focus:bcpb:ring-blue-500/20 bcpb:transition-all bcpb:duration-200 bcpb:shadow-sm">
        <svg class="bcpb:w-4 bcpb:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        {{ t('save') }}
      </button>
    </div>
  </div>
</template>