<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 16:37:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 15:27:35
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\professional-exp.vue
 * @Description: 数据大屏-右侧岗位分析
-->
<template>
    <div class="professional-box">
        <div id="professional-exp" ref="professionalExpRef"></div>
        <div class="legend">
            <span v-for="(item, index) in data" :key="index" class="name">
                {{ item.name }}
                <span class="value">{{ item.value }}</span>
                人
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { getExpOption } from '../options/exp';
import { onMounted, ref } from 'vue';

onMounted(() => {
    init();
});

let chart = null;
const professionalExpRef = ref(null);
const data = [
    { value: 70, name: 'NO.4' },
    { value: 90, name: 'NO.3' },
    { value: 110, name: 'NO.2' },
    { value: 150, name: 'NO.1' },
    { value: 40, name: 'NO.5' },
];
const init = () => {
    if (!professionalExpRef.value) return;
    chart = echarts.init(professionalExpRef.value);
    const expOption = getExpOption(data);
    chart.setOption(expOption);
};
</script>

<style lang="scss" scoped>
.professional-box {
    position: relative;

    .legend {
        position: absolute;
        right: 35px;
        top: 35px;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .name {
            font-size: 12px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #b4c0cc;

            display: inline-block;
            margin-bottom: 8px;
        }

        .value {
            font-size: 20px;
            font-family: DIN-Bold, DIN;
            font-weight: bold;
            color: #ffd15c;
        }
    }

    #professional-exp {
        width: 444px;
        height: 231px;
    }
}
</style>
