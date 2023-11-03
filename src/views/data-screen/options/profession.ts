/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-14 16:38:54
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-15 14:13:43
 * @FilePath: \talent-platform-portal\src\views\data-screen\options\profession.ts
 * @Description: 专业分布-词云图
 */
import { colorList } from '../optionStyle';
import type { dataType } from '../optionStyle';

const getProfessionOption = (data: dataType[]) => {
    const wordcloudOption = {
        // backgroundColor: '#fff', // canvas背景颜色
        // canvas标题配置项
        // title: {
        //     text: '我是标题',
        //     top: '0%',
        //     left: '-1%',
        //     textStyle: {
        //         fontSize: 14,
        //         color: '#3B3E41',
        //         fontWeight: 'normal',
        //     },
        // },
        // 移入tooltip配置项
        tooltip: {
            show: true,
            // formatter: function (item) {
            //   return item.data[0] + '：' + item.data[1]
            // }
        },
        series: [
            {
                type: 'wordCloud',
                left: '0%', // X轴偏移量
                top: '5%', // Y轴偏移量
                width: '100%', // canvas宽度大小
                height: '100%', // canvas高度大小
                sizeRange: [9, 40], //  词典字体大小范围配置
                rotationRange: [0, 0], // 词典字体旋转角度配置，默认不旋转
                gridSize: 25, // 词典字体间距配置
                layoutAnimation: true, // 为false词典过度会阻塞
                // 渲染词典数据
                data: data.map((item) => ({
                    name: item.name,
                    value: item.value,
                    textStyle: {
                        color: colorList[Math.floor(Math.random() * colorList.length)],
                    },
                })),
            },
        ],
    };
    return wordcloudOption;
};

export default getProfessionOption;
