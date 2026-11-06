<script setup lang="ts">
import dayjs from 'dayjs'
const now = dayjs('2026-01-01').format('YYYY-MM-DD')
</script>

<template>
  <div>{{ now }}</div>
</template>
