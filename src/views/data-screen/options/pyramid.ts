import big from '@/assets/img/data-screen/big-pyramid.png';
import center from '@/assets/img/data-screen/center-pyramid.png';
import min from '@/assets/img/data-screen/min-pyramid.png';

let loadingFunnel = {
    title: '' as any,
    arrDataX: [] as string[],
    arrDataY: [] as number[] | string[],
};

const getPyramidOption = (arrDataX: string[], arrDataY: number[] | string[]) => {
    loadingFunnel.arrDataX = arrDataX;
    loadingFunnel.arrDataY = arrDataY;
    // title标示文字,标示线
    loadingFunnel.title = (
        text: any,
        top: any,
        left: any,
        color: any,
        fontStyle: any,
        fontFamily: any,
        fontSize: any,
        // eslint-disable-next-line max-params
    ) => {
        return {
            text: text,
            top: top,
            left: left,
            textStyle: {
                color: color,
                fontStyle: fontStyle,
                fontFamily: fontFamily,
                fontSize: fontSize,
            },
        };
    };
    const titleValue = (name: number | string) => {
        return `${name}人`;
    };
    const pyramidOption = {
        title: [
            loadingFunnel.title(loadingFunnel.arrDataX[0], '13%', '62%', '#12e7e8', 'normal', 'sans-serif', '16'),
            loadingFunnel.title(
                titleValue(loadingFunnel.arrDataY[0]),
                '13%',
                '75%',
                '#ffffff',
                'normal',
                'sans-serif',
                '16',
            ),

            loadingFunnel.title(loadingFunnel.arrDataX[1], '37%', '62%', '#4dc6ff', 'normal', 'sans-serif', '16'),
            loadingFunnel.title(
                titleValue(loadingFunnel.arrDataY[1]),
                '37%',
                '75%',
                '#ffffff',
                'normal',
                'sans-serif',
                '16',
            ),

            loadingFunnel.title(loadingFunnel.arrDataX[2], '63%', '62%', '#eaad38', 'normal', 'sans-serif', '16'),
            loadingFunnel.title(
                titleValue(loadingFunnel.arrDataY[2]),
                '63%',
                '75%',
                '#ffffff',
                'normal',
                'sans-serif',
                '16',
            ),
        ],
        tooltip: {
            show: true,
            formatter: function (params: any) {
                console.log(params);
                return params.marker + params.name + ':' + params.data.number + '万';
            },
        },
        grid: {
            // containLabel: true,
            left: '10%',
            top: '19%',
            bottom: '0%',
        },
        xAxis: {
            show: false,
            data: ['', '', '', ''],
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#5EA2ED',
                interval: 0,
            },
            axisLine: {
                lineStyle: {
                    color: '#1B5BBA',
                },
            },
        },
        yAxis: {
            show: false,
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#1B5BBA',
                },
            },
            axisLabel: {
                color: '#5EA2ED',
                interval: 0,
            },
        },
        series: [
            {
                type: 'pictorialBar',
                //  labelLine:{
                // 	 show:true,
                // 	 length2:20,
                // 	  lineStyle:{
                // 		  color:'red',
                // 		  width:5
                // 	  }

                //  },
                //  label: {
                //          show: true,
                //          position: 'right',
                //          formatter: '{b}{c} 万头',
                //          fontSize: 16,
                //          color: '#e54035',
                // 		 verticalAlign:'top'
                // },
                data: [
                    {
                        name: loadingFunnel.arrDataX[2],
                        // z: 80,
                        value: 60,
                        number: loadingFunnel.arrDataY[2],
                        symbolSize: ['300%', '55%'],
                        symbolPosition: 'center',
                        symbolOffset: ['19%', '10%'],
                        symbol: 'image://' + big,
                    },
                    {
                        name: loadingFunnel.arrDataX[1],
                        // z: 90,
                        value: 40,
                        number: loadingFunnel.arrDataY[1],
                        symbolSize: ['170%', '50%'],
                        symbolPosition: 'center',
                        symbolOffset: ['-53%', '-120%'],
                        symbol: 'image://' + center,
                    },
                    {
                        name: loadingFunnel.arrDataX[0],
                        // z: 100,
                        value: 20,
                        number: loadingFunnel.arrDataY[0],
                        symbolSize: ['105%', '90%'],
                        symbolPosition: 'center',
                        symbolOffset: ['-220%', '-272%'],
                        symbol: 'image://' + min,
                    },
                ],
            },
        ],
    };
    return pyramidOption;
};

export default getPyramidOption;
