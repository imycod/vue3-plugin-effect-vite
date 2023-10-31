<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn'
import en from 'element-plus/dist/locale/en'

import { useI18n } from 'vue-i18n';
const { messages, locale } = useI18n();
const localeI18 = computed(() =>messages.value[locale.value])
</script>

<template>
  <el-config-provider :locale="localeI18">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
