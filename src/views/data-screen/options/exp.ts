/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-15 14:05:36
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 15:21:01
 * @FilePath: \talent-platform-portal\src\views\data-screen\options\exp.ts
 * @Description: 人才工作经验分布图
 */
import { colorList, xStyle } from '../optionStyle';
import type { dataType } from '../optionStyle';

const getExpOption = (data: dataType[]) => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>  {c} ({d}%)',
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'right',
        //     data: data.map((item) => item.name),
        //     // 自定义图例文本内容和样式 展示name和value， 并设置颜色， name为红色 value为蓝色
        //     formatter: function (name: string) {
        //         const value = data.find((item) => item.name === name)?.value;
        //         return `{a|${name}}{b|${value}}`;
        //     }
        // },
        color: colorList,
        series: [
            {
                name: '排名',
                type: 'pie',
                radius: [0, 80],
                center: ['35%', '50%'],
                roseType: 'area',
                data,
                label: {
                    show: true,
                    formatter: function (params: any) {
                        // 设置标签文本样式和颜色
                        return `{a|${params.name}}`;
                    },
                    rich: {
                        // 设置 label 样式
                        a: xStyle,
                    },
                },
            },
        ],
    };
};
export { getExpOption };
