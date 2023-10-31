<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-01 11:57:57
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-01 12:00:03
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite\src\components\QrCode\QrCode1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <vue-qrcode value="Hello, World!" :options="{ width: 200 }"></vue-qrcode>
    </div>
</template>

<script setup>
import VueQrcode from '@chenfengyuan/vue-qrcode';

</script>