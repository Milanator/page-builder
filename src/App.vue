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
    width: '768',
    height: '1366'
  }
}

const mode = ref<Mode>('editor')
const settings = {
  "name": "setting",
  "type": "setting",
  "title": "Nastavenia",
  "options": {
    "backgroundImage": "https:\/\/media.licdn.com\/dms\/image\/v2\/D4D22AQEXTykr8vMGVA\/feedshare-shrink_800\/B4DZvrGmgAJgAg-\/0\/1769175935289?e=2147483647&v=beta&t=ei2Fozj1HcLaPgg5TVo_CcznbvlVEEb_ReWEZwXSMqY",
    "backgroundColor": "#ffffffc7"
  }
} as SettingBlock;
const renderList: Block[] = []

const onSave = ({ renderList, settings }: SavePayload) => {
  console.log(JSON.stringify(renderList), settings)
}

const onBack = () => { }

const onPreview = () => { }
</script>
<template>
  <PageBuilder :config="config" :render-list="renderList" :mode="mode" :settings="settings" @onSave="onSave"
    @onPreview="onPreview" @onBack="onBack" />
</template>
