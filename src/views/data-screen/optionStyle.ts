/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 18:10:34
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-16 11:06:14
 * @FilePath: \talent-platform-portal\src\views\data-screen\optionStyle.ts
 * @Description: 图表基本公共样式（统一维护）
 */
// 颜色组
const colorList = [
    '#e8965b',
    '#4DFFDF',
    '#A6E474',
    '#1AE3FF',
    '#FFFFFF',
    '#00B252',
    '#2ED99B',
    '#3CFAD8',
    '#A6E474',
    '#0AD3E0',
    '#ffd15c',
];
// x轴样式
const xStyle = {
    fontSize: '12px',
    fontFamily: 'Source Han Sans CN-Regular, Source Han Sans CN',
    fontWeight: 400,
    color: '#B4C0CC',
};

// y轴网格线样式
const yLineStyle = {
    color: '#35414D',
    width: 1,
    type: 'dashed',
};

// y轴样式
const yStyle = {
    fontSize: '14px',
    fontFamily: 'DIN-Regular, DIN',
    fontWeight: 400,
    color: '#B4C0CC',
};

// 单位样式
const unitStyle = {
    fontSize: '14px',
    fontFamily: 'DIN-Regular, DIN',
    fontWeight: 400,
    color: '#B4C0CC',
    padding: [0, 0, 0, -20],
};

// lable样式
const lableStyle = xStyle;

// 基础样式
const baseStyle = {};

// 图例样式
const legendStyle = {
    fontSize: '14px',
    fontFamily: 'Source Han Sans CN-Regular, Source Han Sans CN',
    fontWeight: 400,
    color: '#C6D1DB',
};

// 标题样式
const titleStyle = {
    ...yStyle,
};

// 柱形图渐变色
const itemStyleBar = (x = 0, y = 0, x2 = 0, y2 = 1) => {
    return {
        opacity: 1,
        color: {
            type: 'linear',
            x,
            y,
            x2,
            y2,
            colorStops: [
                {
                    offset: 0,
                    color: '#083f85', // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: '#158eff', // 100% 处的颜色
                },
            ],
            global: false, // 缺省为 false
        },
    };
};

// 提示框样式
const tooltipStyle = {};

interface dataType {
    name: string;
    value: number | string;
}

export {
    xStyle,
    yStyle,
    baseStyle,
    legendStyle,
    titleStyle,
    tooltipStyle,
    colorList,
    unitStyle,
    yLineStyle,
    lableStyle,
    itemStyleBar,
    dataType,
};
