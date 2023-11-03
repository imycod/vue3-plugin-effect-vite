/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 18:10:34
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-16 17:33:07
 * @FilePath: \talent-platform-portal\src\views\data-screen\options\triangleBar.ts
 * @Description: 行业分布-三角柱图
 */
import { yStyle, xStyle, unitStyle, yLineStyle, itemStyleBar } from '../optionStyle';
const triangleBarOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    xAxis: {
        type: 'category',
        data: [] as string[],
        axisLabel: {
            show: true,
            textStyle: xStyle,
            interval: 0,
        },
    },
    yAxis: {
        type: 'value',
        name: '单位：家',
        // 单位样式
        nameTextStyle: unitStyle,
        show: true,
        axisLabel: {
            show: true,
            textStyle: yStyle,
        },
        splitLine: {
            show: true,
            lineStyle: yLineStyle,
        },
    },
    grid: {
        right: '20px',
        bottom: '30px',
    },
    series: [
        {
            data: [] as number[] | string[],
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            type: 'pictorialBar',
            itemStyle: {
                ...itemStyleBar(0, 0, 1, 0),
                // 边框颜色
                borderColor: '#13a5f4',
                // 边框宽度
                borderWidth: 3,
            },
            emphasis: {
                itemStyle: {
                    opacity: 1,
                },
            },
        },
    ],
};

export default triangleBarOption;
