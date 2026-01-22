<script setup lang="ts">
import { Config } from "@/lib/utils/types.ts";
import { PageBuilder, SavePayload } from "@/lib";

const config: Config = {
  language: 'sk',
  uploader: {
    headers: {},
    url: ''
  }
}

const onSave = ({ renderList, settings }: SavePayload) => {
  console.log(renderList, settings)
}
</script>
<template>
  <PageBuilder :config="config" @onSave="onSave" />
</template>
