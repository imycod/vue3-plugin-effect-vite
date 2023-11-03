import { yStyle, xStyle, itemStyleBar, yLineStyle } from '../optionStyle';
import type { dataType } from '../optionStyle';

export const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
        formatter: (params: any) => {
            let res = '';
            params.forEach((data: any) => {
                const { name, value } = data;
                res += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0f72dd;"></span>${name}：${value} 家<br/>`;
            });
            return res;
        },
    },
    grid: {
        top: '10%',
        left: '10%',
        right: '5%',
        bottom: '10%',
    },
    yAxis: {
        type: 'category',
        data: [] as string[],
        axisLabel: {
            show: true,
            textStyle: yStyle,
        },
        splitLine: {
            show: false,
        },
    },
    xAxis: {
        type: 'value',
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: true,
            textStyle: xStyle,
        },
        splitLine: {
            show: true,
            lineStyle: yLineStyle,
        },
    },
    series: [],
};

interface dataItemType {
    name: string;
    majors: dataType[];
}
export const setSeries = (data: dataItemType[], option: any) => {
    const arr = [] as number[];
    // 获取data中majors的最大长度
    data.forEach((item: any) => {
        arr.push(item.majors.length);
    });
    const max = Math.max(...arr);

    // 获取正常顺序的majors数组
    const dataArr = [] as dataType[][];
    data.forEach((item) => {
        for (let i = 0; i < max; i++) {
            if (!Array.isArray(dataArr[i])) {
                dataArr[i] = [];
            }
            if (item.majors[i]) {
                dataArr[i].push({ name: item.majors[i].name, value: item.majors[i].value });
            }
        }
    });

    for (let i = 0; i < max; i++) {
        const seriesItem = {
            type: 'bar',
            data: dataArr[i],
            itemStyle: itemStyleBar(0, 0, 1, 0),
            barWidth: 8,
            barGap: 1,
        };
        option.series.push(seriesItem);
    }
};
