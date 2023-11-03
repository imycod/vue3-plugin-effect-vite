import { yStyle, xStyle, unitStyle, yLineStyle, itemStyleBar } from '../optionStyle';
import type { dataType } from '../optionStyle';

const getOption = (data: dataType[]) => {
    const names = data.map((item) => item.name);
    const postAnalyzeOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: (params: any) => {
                console.log(params);
                const data = params.find((item: any) => item.seriesIndex === 0);
                const { name, value } = data;
                const dot = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0f72dd;"></span>`;
                return `${name}<br/>${dot}${value}家`;
            },
        },
        xAxis: [
            {
                type: 'category',
                data: names,
                axisLabel: {
                    show: true,
                    textStyle: xStyle,
                    interval: 0,
                },
            },
            // 隐藏一个不显示的横坐标，用作横线的位置
            {
                type: 'category',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                axisPointer: {
                    type: 'none',
                },
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                data: names,
            },
        ],
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
                data,
                type: 'bar',
                barWidth: '16px',
                itemStyle: itemStyleBar(),
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                    },
                },
            },
            {
                // 这个bar是撑起横线的高度，并设置透明
                name: '盈亏平衡点',
                stack: 'breakevenEleGroup', // 盈亏点数据组，需要设置才能将两个bar堆积在一起,
                type: 'bar',
                xAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)', // 设置bar为隐藏，撑起下面横线,
                    },
                },
                data,
            },
            {
                // 这个bar是横线的显示
                name: '盈亏平衡点',
                stack: 'breakevenEleGroup', // 盈亏点数据组，需要设置才能将两个bar堆积在一起,
                type: 'bar',
                barWidth: '16px',
                xAxisIndex: 1,
                barGap: '0',
                itemStyle: {
                    normal: {
                        color: '#15b1ff',
                    },
                },
                data: new Array(data.length).fill(5),
            },
        ],
    };
    return postAnalyzeOption;
};
export default getOption;
