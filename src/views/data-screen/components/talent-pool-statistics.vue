<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-07 17:51:09
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-11-03 07:49:52
 * @FilePath: \talent-platform-portal\src\views\data-screen\components\top-bar.vue
 * @Description: 人才供应链数据大屏-中间 人才池数
-->
<template>
    <div class="talent-box">
        <div class="num-bg">
            <!-- 圆圈虚线 -->
            <div class="dotted-line center"></div>
            <div class="num-total center">
                <span>37829</span>
                <span>人才池总人数</span>
            </div>
        </div>

        <div class="item-num">
            <div class="item-t">
                <ShowNum type-name="近30天新增" num="39"></ShowNum>
                <ShowNum type-name="近7天新增" num="39"></ShowNum>
            </div>
            <div class="item-b">
                <ShowNum type-name="昨日新增" num="1"></ShowNum>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ShowNum from './ShowNum/index.vue';
</script>
<style lang="scss" scoped>
.talent-box {
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
    padding-bottom: 42px;

    .num-bg {
        position: relative;
        width: 166px;
        height: 166px;
        border: 7px solid #00a1fcff;
        border-radius: 50%;
        margin-top: 10px;

        .dotted-line {
            width: 90%;
            height: 90%;
            background: url('@/assets/img/data-screen/pie-bg-dot.png') center/cover;
            background-size: 100% 100%;
        }

        .center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .num-total {
            background: url('@/assets/img/data-screen/pie-bg.png') center/cover;
            background-size: 100% 100%;
            width: 120px;
            height: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            span {
                &:first-child {
                    font-size: 36px;
                    font-family: DIN Black-Regular, DIN Black;
                    font-weight: 400;
                    line-height: 38px;
                    background: linear-gradient(180deg, #d2faff 0%, #50e1ff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;

                    transform: translateY(-12px);
                }

                &:last-child {
                    font-size: 14px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 12px;
                    -webkit-background-clip: text;
                    // -webkit-text-fill-color: transparent;
                }
            }
        }
    }

    .item-num {
        flex: 1;
        padding-left: 40px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .item-t {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
