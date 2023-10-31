
<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-14 17:39:25
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-23 21:43:13
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import QrCode1 from './components/QrCode/QrCode.vue';
import QrCode2 from './components/QrCode/QrCode1.vue';
import QuillTable from "./components/fileEditer/QuillTable.vue";
import { ref, onMounted } from "vue"

const title = ref('')
onMounted(() => setTimeout(() => title.value = '标题', 5000))

const msg = ref('')
onMounted(() => setTimeout(() => msg.value = 'You did it!', 5000))


import { str_ensure_prefix,addMethod } from '@imycode/helper';

const slectValue = ref(1)

const stats = {
  '1': [1, 2, 3],
  '2': [21, 22, 23]
}
// function lookup(state) {
//   // 根据不同的状态查看不同的数据,但调用的都是这一个函数
//   if (state===1) {
//     alert('1的状态')
//     // 1的状态去打开模态框
//   }
//   if (state===2) {
//     alert('2的状态')
//     // 2的状态去打开侧边栏
//   }
//   if (state===3) {
//     alert('3的状态')
//     // 3的状态切换路由
//   }

//   // ....很多种查看状态的情况,这时我们需要函数重载
// }

// const addMethod = function (object, name, fn) {
//   const old = object[name];

//   object[name] = function (...args) {
//     if (fn.length === args.length) {
//       return fn.apply(this, args);
//     } else if (typeof old === 'function') {
//       return old.apply(this, args);
//     }
//   };
// };

// function overload(...args) {
//   const $ = {}

//   return (...args) => {
//     // addMethod($, fn,)
//   }
// }

// const lookup = overload(1, 2)
// const lookup = overload(1)

const lookup = {}
addMethod(lookup, 'go', function (state) {
  alert('1的状态')
  // 1的状态去打开模态框
});
addMethod(lookup, 'go', function (state, state1) {
  alert('2的状态')
  // 1的状态去打开模态框
});

// lookup.go(1)
// lookup.go(1,2)

function confirm() {
  console.log(slectValue);
}
</script>

<template>
  <select v-model="slectValue" name="" id="">
    <option value="1">已填报</option>
    <option value="2">已审核</option>
  </select>

  <ul>
    <li v-for="i in stats[slectValue]">
      <span>{{ i }}</span>
      <button @click="lookup.go(i)">查看</button>
    </li>
  </ul>

  <button @click="confirm">确认</button>
  <!-- <QrCode1></QrCode1> -->
  <!-- <QrCode2></QrCode2> -->
  <!-- <header>
    <img alt="Vue logo" v-sk class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper" v-sk.deep="['1 100% 50']" v-slide-in>
      <HelloWorld :msg="msg" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->

  <!-- <QuillTable></QuillTable>  -->
  <!-- <div class="title" v-sk>{{ title }}</div> -->
  <!-- <br> -->
  <!-- <div class="title" v-sk="['1 100']">{{ title }}</div> -->
  <!-- <div class="title bd" v-sk="['2 50']">{{ title }}</div> -->
  <!-- <br> -->
  <!-- <div class="title bd" v-sk="['2 50 red']">{{ title }}</div> -->
  <!-- <div class="title" v-sk="['1 100', '+1 50 - 120 green']">{{ title }}</div> -->
  <!-- <div class="title" v-sk="['1 100', '+1 50 - -0 yellow']">{{ title }}</div> -->
  <!-- <div class="title" v-sk="['1 100', '+1 50 - 50% #000000']">{{ title }}</div> -->
  <!-- <img class="pic" src="" v-sk />
  <img class="pic pic-2" src="" v-sk /> -->
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
