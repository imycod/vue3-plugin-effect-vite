<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-23 21:46:48
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-24 11:11:08
 * @FilePath: \vue3-plugin-effect-vite-admin-element-plusd:\studio\vue-project\vue3-plugin-effect-vite\src\components\MessageBox\MessageBox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="model">
        <div class="box">
            <div class="text">{{ msg }}</div>
            <button @click="emit('click')">关闭</button>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['click'])
defineProps({
    msg: {
        type: String,
        required: true
    }
})
</script>
<style scoped>
.model {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.box {
    width: 300px;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.text {
    font-size: 20px;
    margin-bottom: 20px;
}
button {
    width: 100px;
    height: 40px;
    background-color: #409eff;
    color: #fff;
    border-radius: 5px;
    border: none;
    outline: none;
}
button:hover {
    cursor: pointer;
}
/* 关闭按钮 */
button:active {
    background-color: #66b1ff;
}
</style>