<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-13 20:02:50
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-14 10:51:04
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\item-card.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="item-card">
        <div class="item-top">
            <span v-if="title">{{ title }}</span>
            <!-- 目前未使用到，使用时自行配置 -->
            <div class="item-t-r">
                <slot name="top-r"></slot>
            </div>
        </div>
        <!-- 内容区 -->
        <div :style="{ height: contentHeight + 'px' }">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    contentHeight: {
        type: String || Number,
        default: '231',
    },
});
</script>
<style lang="scss" scoped>
.item-card {
    .item-top {
        position: relative;
        background: url('@/assets/img/data-screen/card-top-bg.png') no-repeat;
        background-size: 100% 100%;

        width: 406px;
        height: 50px;

        padding-left: 38px;
        line-height: 53px;

        span {
            font-size: 20px;
            font-family: PangMenZhengDao-Regular, PangMenZhengDao;
            font-weight: 400;
            color: #ffffff;
            line-height: 30px;
            text-shadow: 0px 0px 9px #158eff;
            -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
        }

        .item-t-r {
            position: absolute;
            // 目前没有使用到，有用到在修改 right、top的值
            right: 0;
            top: 0;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
}
</style>
