<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-15 15:35:25
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 16:14:45
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\supply.vue
 * @Description: 数据大屏-右侧人才供应
-->
<template>
    <div class="supply-box">
        <div v-for="(item, index) in data" :key="index" class="data-item">
            <span class="post-name overflow">{{ item.postName }}</span>
            <span class="name overflow">{{ item.name }}</span>
            <span class="value-box value overflow">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
const data = [
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 12139,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
    {
        postName: '售前/产品/项目',
        name: '产品经理',
        value: 1239,
        unit: '人',
    },
];
</script>
<style lang="scss" scoped>
.supply-box {
    width: 455px;
    height: 98%;
    overflow: auto;
    padding: 8px 0;
    box-sizing: border-box;

    .data-item {
        display: flex;
        align-items: center;

        margin-bottom: 5px;
        padding: 0 16px;
        width: 444px;
        height: 32px;
        background: url('@/assets/img/data-screen/supply-item-box.png') no-repeat center/cover;
        background-size: 100% 100%;
        box-sizing: border-box;

        font-family: PangMenZhengDao-Regular, PangMenZhengDao;
        font-weight: 400;

        span {
            display: inline-block;
            height: 100%;
            line-height: 32px;
        }

        .post-name {
            width: 130px;
            margin-right: 49px;
        }

        .name {
            width: 108px;
            margin-right: 35px;
        }

        .post-name,
        .name {
            font-size: 16px;
            color: #f2f6fa;
        }

        .value-box {
            flex: 1;
            font-size: 20px;
            color: #ffd15c;

            .value {
                display: inline-block;
                width: 60px;
            }
        }

        .unit {
            font-size: 18px;
            color: #7cbfff;

            display: inline-block;
            margin-left: 10px;
        }

        // 溢出省略号
        .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    // 滚动条样式
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background-color: rgba(217, 217, 217, 0.4);
    }

    // 滚动条滑块
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #15b1ff;
    }
}
</style>
