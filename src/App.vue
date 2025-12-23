<script setup lang="ts">
import { PageBuilder } from "./lib";

const onSave = (value: any) => {
  console.log(value)
}
</script>
<template>
  <PageBuilder language="sk" @onSave="onSave"></PageBuilder>
</template>
