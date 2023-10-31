<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-14 17:39:25
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-19 11:44:35
 * @FilePath: \pms-pcd:\studio\vue-project\vue3-plugin-effect-vite\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { exportRecruitment } from "./api/index";
import { defineComponent, ref, reactive, nextTick, onMounted } from "vue";

import HelloWorld from "@/components/HelloWorld.vue";

import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const count = ref(0);

const hot = ref(null);
const data = new Array(100)
  .fill()
  .map((_, row) => new Array(18).fill().map((_, column) => `${row}, ${column}`));

onMounted(() => {
  const container = document.querySelector("#example1");
  hot.value = new Handsontable(container, {
    data,
    height: 600,
    colWidths: 47,
    rowHeaders: false,
    colHeaders: false,
    contextMenu: true,
    className: "htCenter",
    mergeCells: [
      // 从第几行第几列开始合并几行几列
      // { row: 0, col: 0, rowspan: 4, colspan: 5 },
    ],
    // cell: [
    //     { row: 0, col: 0, className: 'htRight' },
    //     { row: 1, col: 1, className: 'htLeft htMiddle' },
    //     { row: 3, col: 4, className: 'htLeft htBottom' }
    // ],
    licenseKey: "non-commercial-and-evaluation",
  });
});
</script>

<template>
{{count}}
  <!-- <div id="example1"></div> -->
  <HelloWorld :count="count"> </HelloWorld>
  <button @click="count-=1">-1</button>
  <button @click="count+=1">+1</button>
</template>

<style scoped></style>
