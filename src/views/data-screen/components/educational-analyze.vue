<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-07 17:51:09
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-16 11:45:47
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\educational-analyze.vue
 * @Description: 人才供应链数据大屏-左侧人才学历分析图表
-->
<template>
    <div class="educational-box">
        <div id="educational-analyze"></div>
        <div class="base-plate"></div>
    </div>
</template>
<script setup lang="ts">
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import Exporting from 'highcharts/modules/exporting';
import { onMounted } from 'vue';
import { educationalOption } from '../options/educational';

Exporting(Highcharts);
highcharts3d(Highcharts);

const data = [
    {
        name: '其他学历',
        y: 12342,
        // sliced: true,
        // selected: true,
    },
    ['大专', 12342],
    ['本科', 22342],
    ['硕士', 5234],
    ['博士', 2321],
];

onMounted(() => {
    educationalOption.series[0].data = data;
    Highcharts.chart('educational-analyze', educationalOption);
});
</script>
<style lang="scss" scoped>
.educational-box {
    position: relative;

    .base-plate {
        position: absolute;
        top: 52px;
        left: 96px;
        z-index: 0;
        background: url('@/assets/img/data-screen/pie-base-plate.png') center/cover;
        background-size: 100% 100%;

        width: 253px;
        height: 138px;
    }

    #educational-analyze {
        position: absolute;
        z-index: 4;
        width: 444px;
        height: 231px;
    }
}
</style>
