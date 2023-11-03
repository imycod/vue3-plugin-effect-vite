/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-16 09:20:42
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-16 14:09:55
 * @FilePath: \talent-platform-portal\src\views\data-screen\options\educational.ts
 * @Description: 3d饼图
 */
import { lableStyle, legendStyle, colorList } from '../optionStyle';
const educationalOption = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 65,
            beta: 0,
        },
        backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
        text: '',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    // 隐藏下拉
    exporting: {
        enabled: false,
    },
    // 隐藏版权信息
    credits: {
        enabled: false,
    },
    legend: {
        enabled: true,
        itemMarginTop: 10,
        itemMarginBottom: 0,
        itemStyle: legendStyle,
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 20,
            // innerSize: '60%',
            // 饼图大小
            size: '155%',
            center: ['50%', '65%'],

            dataLabels: {
                enabled: true,
                style: lableStyle,
                connectorShape: 'crookedLine',
                connectorWidth: 1,
                // 标签内容
                format: '{point.name}<br>{point.y}人',
            },
            showInLegend: true,
        },
    },
    colors: colorList,
    series: [
        {
            type: 'pie',
            name: '浏览器占比',
            data: [] as any,
        },
    ],
};

export { educationalOption };
