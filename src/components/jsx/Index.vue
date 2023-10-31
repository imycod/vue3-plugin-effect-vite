<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-14 17:39:25
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-24 11:09:54
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plusd:\studio\vue-project\vue3-plugin-effect-vite\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="jsx" setup>
import HeadSearch from "./HeadSearch.vue";

import showMsg from "../../utils/showMsg.jsx"

// import MessageBox from '../MessageBox/MessageBox.vue';
// import { ref } from "vue"
// const showMsg = ref(false)
// function clickMessage() {
//   showMsg.value = !showMsg.value
// }
function showMessageBox() {
  showMsg('提示消息', (close) => {
    console.log('xxxx');
    close()
  })
  // showMsg.value = true
}

function renderFn() {
  return (
    <div>JSX content</div>
  );
}
</script>

<template>
  <HeadSearch :render="renderFn" tag="h1"></HeadSearch>
  <!-- <MessageBox msg="哈哈哈" v-if="showMsg" @click="clickMessage" /> -->
  <button @click="showMessageBox">打开弹窗</button>
</template>

<style scoped></style>
