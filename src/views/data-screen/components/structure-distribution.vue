<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 16:37:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 11:44:25
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\structure-distribution.vue
 * @Description: 数据大屏-中间人才结构分布
-->
<template>
    <div id="structure-distribution" ref="structureDistributionRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { option, setSeries } from '../options/structure';
import { onMounted, ref } from 'vue';

onMounted(() => {
    init();
});

let chart = null;
const structureDistributionRef = ref(null);
const data = [
    {
        name: '学校A',
        majors: [
            {
                name: '专业A',
                value: 120,
            },
            {
                name: '专业B',
                value: 200,
            },
            {
                name: '专业C',
                value: 150,
            },
        ],
    },
    {
        name: '学校B',
        majors: [
            {
                name: '专业D',
                value: 80,
            },
            {
                name: '专业E',
                value: 70,
            },
        ],
    },
    {
        name: '学校C',
        majors: [
            {
                name: '专业F',
                value: 110,
            },
            {
                name: '专业G',
                value: 110,
            },
        ],
    },
];

const init = () => {
    if (!structureDistributionRef.value) return;
    chart = echarts.init(structureDistributionRef.value);
    option.yAxis.data = data.map((item) => item.name);
    setSeries(data, option);
    chart.setOption(option);
};
</script>

<style lang="scss" scoped>
#structure-distribution {
    width: 444px;
    height: 267px;
}
</style>
