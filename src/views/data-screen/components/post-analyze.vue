<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 16:37:39
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 10:19:18
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\post-analyze.vue
 * @Description: 数据大屏-右侧岗位分析
-->
<template>
    <div id="post-analyze" ref="postAnalyzeRef"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import getOption from '../options/post-analyze';
import { onMounted, ref } from 'vue';

onMounted(() => {
    init();
});

let chart = null;
const postAnalyzeRef = ref(null);
const data = [
    {
        name: '制造业',
        value: 120,
    },
    {
        name: '金融',
        value: 200,
    },
    {
        name: '新闻传播',
        value: 150,
    },
    {
        name: '互联网软件',
        value: 80,
    },
    {
        name: '电商',
        value: 70,
    },
    {
        name: '食品饮料',
        value: 110,
    },
];
const init = () => {
    if (!postAnalyzeRef.value) return;
    chart = echarts.init(postAnalyzeRef.value);
    const option = getOption(data);
    chart.setOption(option);
};
</script>

<style lang="scss" scoped>
#post-analyze {
    width: 444px;
    height: 231px;
}
</style>
