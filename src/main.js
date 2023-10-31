/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-14 17:39:25
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-19 11:27:37
 * @FilePath: \front-end-business-integrationd:\studio\vue-project\vue3-plugin-effect-vite\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import './assets/index.scss'

import { createApp } from 'vue'
import { router } from "@/routers/index";
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// 骨架屏
import vsk from 'v-sk'
import { i18n } from '@/i18n';

// import Handsontable from 'handsontable/base';
// import 'handsontable/dist/handsontable.full.css';
// import {
//   registerCellType,
//   NumericCellType,
// } from 'handsontable/cellTypes';
// import {
//     registerPlugin,
//     UndoRedo,
// } from 'handsontable/plugins';
// registerCellType(NumericCellType);
// registerPlugin(UndoRedo);

import App from './App.vue'
const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
app.use(vsk)
app.use(i18n)
app.mount('#app')

