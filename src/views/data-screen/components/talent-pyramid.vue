<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-07 17:51:09
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-16 15:00:54
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\top-bar.vue
 * @Description: 人才供应链数据大屏 3d金字塔
-->
<template>
    <div class="talent-box">
        <div id="pyramidChart"></div>
        <div class="line-t dis-end">
            <img class="circle-img" src="@/assets/img/data-screen/circle-top.png" alt="" />
        </div>
        <div class="line-c dis-end">
            <img class="circle-img" src="@/assets/img/data-screen/circle-center.png" alt="" />
        </div>
        <div class="line-b dis-end">
            <img class="circle-img" src="@/assets/img/data-screen/circle-bottom.png" alt="" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import getPyramidOption from '../options/pyramid';
import * as echarts from 'echarts';

let myChart: any = null;
onMounted(() => {
    myChart = echarts.init(document.getElementById('pyramidChart') as HTMLElement);
    init();
});

const init = () => {
    let arrDataX = ['茶叶', '青椒', '大蒜'];
    let arrDataY = [123, 254, 325];
    const option = getPyramidOption(arrDataX, arrDataY);
    myChart.setOption(option);
};
</script>
<style lang="scss" scoped>
.talent-box {
    position: relative;
    transform: translate(0, 15px);

    .dis-end {
        position: absolute;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px dashed #ffffff;
    }

    .line-t {
        top: 35px;
        left: 140px;
        width: 110px;
    }

    .line-c {
        top: 105px;
        left: 140px;
        width: 110px;
    }

    .line-b {
        top: 175px;
        left: 140px;
        width: 110px;
    }

    .circle-img {
        width: 12px;
        height: 12px;
        transform: translate(10px, 7px);
    }
}

#pyramidChart {
    width: 444px;
    height: 280px;
}
</style>
