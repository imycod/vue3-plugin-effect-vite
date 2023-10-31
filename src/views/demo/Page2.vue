
<script setup>
import JsxIndex1 from "./components/jsx/Index.vue"

import showMsg from "./components/jsx/ShowMsg.vue"
function show() {
  showMsg('xxx',(close)=>{
    close()
  })  
}
</script>

<template>
  <JsxIndex1></JsxIndex1>
  <button @click="show">show</button>
</template>

<style scoped></style>
