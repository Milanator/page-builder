<script setup lang="ts">
import { Block, Config } from "@/lib/utils/types.ts";
import { PageBuilder, SavePayload, Mode, SettingBlock } from "@/lib";
import { ref } from "vue";

const config: Config = {
  language: 'sk',
  uploader: {
    headers: {},
    url: ''
  },
  showDeviceBar: false,
  device: 'custom',
  // affect only if device = custom
  resolution: {
    width: '1000',
    height: '1300'
  }
}

const renderList: Block[] = []

const mode = ref<Mode>('editor')

const settings = new SettingBlock

const onSave = ({ renderList, settings }: SavePayload) => {
  console.log(JSON.stringify(renderList), settings)
}

const onBack = () => { }

const onPreview = () => {
}
</script>
<template>
  <PageBuilder :config="config" :render-list="renderList" :mode="mode" :settings="settings" @onSave="onSave"
    @onPreview="onPreview" @onBack="onBack" />
</template>
