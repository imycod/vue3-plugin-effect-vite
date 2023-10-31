<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-31 09:47:44
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-01 11:57:06
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite\src\components\QrCode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE


 暂时不支持用ts的项目，原因未知
-->
<template>
    <QRCode :width="200" :height="200" value="Simple QR code" :cornersSquareOptions="cornersSquareOptions"
        :imageOptions="imageOptions" :qrOptions="qrOptions" :dotsOptions="dotsOptions"
        :cornersDotOptions="cornersDotOptions" />

    <!--配置二维码Style： https://qr-code-styling.com/  Github：https://www.npmjs.com/package/qrcode-vue3 -->
</template>


<script>
import { defineComponent, onMounted } from "vue";
import QRCode from "qrcode-vue3";
export default defineComponent({
    components: {
        QRCode
    },
    setup() {
        onMounted(() => {

        })
        return {
            qrOptions: { typeNumber: 8, mode: 'Byte', errorCorrectionLevel: 'M' },
            imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
            cornersSquareOptions: { type: 'square', color: '#000' },
            dotsOptions: {
                type: 'square',
                color: '#000',
            },
            cornersDotOptions: { type: 'square', color: '#000' },
        }
    }
})


</script>
