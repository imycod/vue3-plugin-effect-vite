const pos = {
    job: {
        r: 1,
        c: 0,
        v: 'r'
    },
    date: {
        r: 1,
        c: 0,
        v: 'r',
    },
    // 2 - 3 - 4
    name: {
        r: 2,
        c: 1,
        v: 'v',
    },
    sex: {
        r: 2,
        c: 8,
        v: 'v',
    },
    bri: {
        r: 2,
        c: 15,
        v: 'v',
    },
    // 3
    nation: {
        r: 3,
        c: 1,
        v: 'v',
    },
    jiguan: {
        r: 3,
        c: 8,
        v: 'v',
    },
    zzmm: {
        r: 3,
        c: 15,
        v: 'v',
    },
    // 4
    marr: {
        r: 4,
        c: 1,
        v: 'v',
    },
    heal: {
        r: 4,
        c: 8,
        v: 'v',
    },
    height: {
        r: 4,
        c: 15,
        v: 'v',
    },
    idCard: {
        r: 5,
        c: 1,
        v: 'v',
    },
    weight: {
        r: 5,
        c: 15,
        v: 'v',
    },
    hjdz: {
        r: 6,
        c: 1,
        v: 'v',
    },
    hjxz: {
        r: 6,
        c: 21,
        v: 'ct'
    },
    xjdz: {
        r: 7,
        c: 1,
        v: 'v',
    },
    phone: {
        r: 8,
        c: 1,
        v: 'v'
    },
    wetchat: {
        r: 8,
        c: 21,
        v: 'v'
    },
    yx: { //月薪
        r: 9,
        c: 1,
        v: 'v'
    },
    ksgzsj: {
        r: 9,
        c: 10,
        v: 'v'
    },
    email: {
        r: 10,
        c: 1,
        v: 'v'
    },
    // 外语等级
    lavel: {
        r: 11,
        c: 1,
        v: 'v'
    },
    pof: {
        r: 11,
        c: 10,
        v: 'v'
    },
    compu: {
        r: 11,
        c: 21,
        v: 'v'
    },
    iconta: {
        r: 12,
        c: 1,
        v: 'v'
    },
    cphone: {
        r: 12,
        c: 10,
        v: 'v'
    },
    real: {
        r: 12,
        c: 21,
        v: 'v'
    },
    zwpj: {
        r: 13,
        c: 1,
        v: 'v'
    },
    edu: [
        {
            r: 16,
            c: 0,
        }
    ]
}
export default function getExcelValue(luckysheet) {
    const { celldata } = luckysheet[0]


    celldata.forEach(cell => {
        const { r, c, v } = cell;

        const key = Object.keys(pos).find(key => pos[key].r === r && pos[key].c === c);
        if (key === 'edu') {
            
            return
        }
        if (key && pos[key].v !== 'r') {
            const value = v[pos[key].v];

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                const v = value.s[0].v
                if (key == 'hjxz') {
                    const str = v.includes('☑城镇') ? '城镇' : '农村';
                    console.log(`Key: ${key}, Value: ${str}`);
                } else {
                    console.log(`Key: ${key}, Value: ${v}`);
                }
            }else{
                console.log(`Key: ${key}, Value: ${value}`);
            }
        }
        if (key && pos[key].v == 'r') {
            // 独占一行单独处理
            const value = v['v'];
            const newRow1 = value.replace(/应聘岗位：|填表日期：/g, '').trim();
            const newRow1Arr = newRow1.split(/\s+/);

            const str1 = newRow1Arr[0]
            const str2 = newRow1Arr.slice(1).join('')
            console.log(`Key: ${key}, Value: ${str1}`);
            console.log(`Key: date, Value: ${str2}`);
        }
    });
}



// A B C D E F G H I J K L M    N O P    Q  R  S  T  U  V
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21
// c: 1
// c: 8
// c: 10
// c: 15
// c: 21
