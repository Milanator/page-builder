<script setup lang="ts">
import { Config } from "@/lib/utils/types.ts";
import { PageBuilder } from "@/lib";

// just a tmp comment, remove anytime

const config: Config = {
  language: 'sk',
  uploader: {
    headers: {},
    url: ''
  }
}

const onSave = () => { }
</script>
<template>
  <PageBuilder :config="config" @onSave="onSave" />
</template>
