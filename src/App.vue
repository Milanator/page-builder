<script setup lang="ts">
import { Config } from "@/lib/utils/types.ts";
import { PageBuilder } from "@/lib";

const config: Config = {
  language: 'sk',
  uploader: {
    headers: { a: 'b' },
    url: 'AZBCD'
  }
}

const onSave = (value: any) => { }
</script>
<template>
  <PageBuilder :config="config" @onSave="onSave" />
</template>
