<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 11:39:07
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-14 11:59:51
 * @FilePath: \talent-platform-portal\src\components\ShowNum\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="show-num">
        <span class="num">
            {{ num }}
            <span class="unit">人</span>
        </span>
        <span class="instructions">{{ typeName }}</span>
        <img src="@/assets/img/data-screen/item-num-bg.png" alt="" />
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    typeName: {
        type: String,
        default: '',
    },

    num: {
        type: [String, Number],
        default: 0,
    },
});
</script>
<style lang="scss" scoped>
.show-num {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
        display: inline-block;
    }

    .num {
        font-size: 26px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        line-height: 26px;
        background: linear-gradient(180deg, #d2faff 0%, #50e1ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        margin-bottom: 3px;
    }

    .unit {
        font-size: 10px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 14px;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .instructions {
        font-size: 14px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        line-height: 16px;
        -webkit-background-clip: text;
        opacity: 0.8;
        // -webkit-text-fill-color: transparent;
    }

    img {
        width: 90px;
        height: 38px;
    }
}
</style>
