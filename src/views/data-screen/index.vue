<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-07 17:51:09
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-11-03 07:52:57
 * @FilePath: \talent-platform-portal\src\views\data-screen\index.vue
 * @Description: 人才供应链数据大屏
-->
<template>
    <div class="data-box-big">
        <div id="appRef">
            <top-bar />
            <div class="data-box">
                <div class="data-box-l">
                    <ItemCard title="人才学历分析">
                        <EducationalAnalyze></EducationalAnalyze>
                    </ItemCard>
                    <ItemCard title="人才工作经验分布">
                        <ProfessionalExp></ProfessionalExp>
                    </ItemCard>
                    <ItemCard title="人才专业分布" content-height="267">
                        <ProfessionDistribution></ProfessionDistribution>
                    </ItemCard>
                </div>
                <div class="data-box-c">
                    <!-- 人才资源池统计 -->
                    <TalentPoolStatistics></TalentPoolStatistics>
                    <!-- 3d金字塔 -->
                    <TalentPyramid></TalentPyramid>
                    <ItemCard title="人才结构分布" content-height="267">
                        <StructureDistribution></StructureDistribution>
                    </ItemCard>
                </div>
                <div class="data-box-r">
                    <ItemCard title="行业分析">
                        <ProfessionAnalyze></ProfessionAnalyze>
                    </ItemCard>
                    <ItemCard title="岗位分析">
                        <PostAnalyze></PostAnalyze>
                    </ItemCard>
                    <ItemCard title="人才供应" content-height="267">
                        <supply></supply>
                    </ItemCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TopBar from './components/top-bar.vue'; // 顶部背景
import ItemCard from './components/ItemCard/index.vue'; // 卡片组件
import EducationalAnalyze from './components/educational-analyze.vue'; // 人才学历分析
import ProfessionDistribution from './components/profession-distribution.vue'; // 人才专业分布
import ProfessionAnalyze from './components/profession-analyze.vue'; // 行业分析
import PostAnalyze from './components/post-analyze.vue'; // 岗位分析
import StructureDistribution from './components/structure-distribution.vue'; // 人才结构分布
import ProfessionalExp from './components/professional-exp.vue'; // 人才工作经验分布
import Supply from './components/supply.vue'; // 人才供应
import TalentPoolStatistics from './components/talent-pool-statistics.vue'; // 人才资源池统计
import TalentPyramid from './components/talent-pyramid.vue'; // 3d金字塔

import useDraw from '@/hooks/useDraw';

useDraw();
</script>

<style lang="scss" scoped>
.data-box-big {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #052241;
    overflow: hidden;
}

#appRef {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    background: url('@/assets/img/data-screen/main-bg.png') no-repeat;
    background-size: 100% 100%;
    width: 1440px;
    height: 960px;

    .data-box {
        display: flex;
        justify-content: space-between;

        width: 100%;
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
}
</style>
