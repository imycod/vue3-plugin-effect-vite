<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 16:37:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 11:50:52
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\profession-distribution.vue
 * @Description: 数据大屏-人才专业分布
-->
<template>
    <div>
        <div id="profession-chart" ref="professionRef"></div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import getOption from '../options/profession';
import { onMounted, ref } from 'vue';

onMounted(() => {
    init();
});

let chart = null;
const professionRef = ref(null);
const data = [
    { value: '50', name: 'iPhone 13' },
    { value: '30', name: 'VIVO' },
    { value: '29', name: 'OPPO' },
    { value: '28', name: 'HONOR' },
    { value: '27', name: 'iPhone 12 pro max' },
    { value: '26', name: 'iPhone 12 pro max' },
    { value: '25', name: 'HUAWEI MATE 10' },
    { value: '24', name: 'ONEPLUS' },
    { value: '23', name: 'Lenova T470' },
    { value: '22', name: 'MacBook Air ' },
    { value: '21', name: 'SAMSUNG' },
    { value: '20', name: 'iPad mini' },
    { value: '16', name: 'BLACKBERRY' },
    { value: '14', name: 'OPPO' },
    { value: '13', name: 'SAMSUNG' },
    { value: '12', name: '361' },
    { value: '10', name: 'Lenova' },
];
const init = () => {
    if (!professionRef.value) return;
    chart = echarts.init(professionRef.value);
    const wordcloudOption = getOption(data);
    chart.setOption(wordcloudOption);
};
</script>

<style lang="scss" scoped>
#profession-chart {
    width: 400px;
    height: 267px;
}
</style>
