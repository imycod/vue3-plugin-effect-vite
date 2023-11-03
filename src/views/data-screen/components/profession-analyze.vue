<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 16:37:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 10:19:35
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\profession-distribution.vue
 * @Description: 数据大屏-右侧行业分析
-->
<template>
    <div id="wordcloudChart" ref="professionAnalyzeRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import option from '../options/triangleBar';
import { onMounted, ref } from 'vue';

onMounted(() => {
    init();
});

let chart = null;
const professionAnalyzeRef = ref(null);
const init = () => {
    if (!professionAnalyzeRef.value) return;
    chart = echarts.init(professionAnalyzeRef.value);
    option.series[0].data = [120, 200, 150, 80, 70, 110];
    option.xAxis.data = ['制造业', '金融', '新闻传播', '互联网软件', '电商', '食品饮料'];
    chart.setOption(option);
};
</script>

<style lang="scss" scoped>
#wordcloudChart {
    width: 444px;
    height: 231px;
}
</style>
