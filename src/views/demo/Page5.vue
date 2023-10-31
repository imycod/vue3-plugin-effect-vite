<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-14 17:39:25
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-13 17:04:17
 * @FilePath: \pms-pcd:\studio\vue-project\vue3-plugin-effect-vite\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { exportRecruitment } from "./api/index"
import { ref, reactive, nextTick } from "vue"
import Luckysheet from 'luckyexcel'

import S_XLSX from "https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs"

console.log(S_XLSX);

const jsonData = ref({})

const list = [
    {
        id: '1701523839387824129',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    }
]
const show = ref(false)

function getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1)
}

function isFunction(val) {
    return getType(val) === 'Function'
}


const getLoadFile = async (row) => {
    const { id } = row
    const res = await exportRecruitment(id)
    const blobData = await res.blob()
    const file = new File([blobData], 'test.xlsx', { type: 'application/vnd.openxmlformats-office.spreadsheetml.sheet' })
    loadExcel(file)
}
const loadExcel = (files) => {
    if (files == null || files.length == 0) {
        alert('No files wait for import')
        return
    }

    let name = files.name
    let suffixArr = name.split('.'),
        suffix = suffixArr[suffixArr.length - 1]
    if (suffix != 'xlsx') {
        alert('Currently only supports the import of xlsx files')
        return
    }
    Luckysheet.transformExcelToLucky(files, function (exportJson, luckysheetfile) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            alert('Failed to read the content of the excel file, currently does not support xls files!')
            return
        }
        console.log('exportJson', exportJson)
        jsonData.value = exportJson

        isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

        luckysheet.create({
            container: 'luckysheet', //luckysheet is the container id
            showinfobar: false,
            data: exportJson.sheets,
            title: exportJson.info.name,
            userInfo: exportJson.info.name.creator,
        })
    })
}

async function open() {
    show.value = true
}
async function check(row) {
    open()
    getLoadFile(row)
}

function beforeClose() {
    isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()
}

function downloadFile() {
    // 第一步: 获取到要下载的数据
    let allSheetData = luckysheet.getluckysheetfile();
    let sheet1 = allSheetData[0];
    let downOriginData = sheet1.data;
    // 该方法会返回一个数组结构，其中包含了我们所创建的所有的sheet数据
    // allSheetData = [{sheet1},{sheet2},{sheet3}]
    console.log(downOriginData);


    let arr = [];  // 所有的单元格数据组成的二维数组
    let bgConfig = {};
    let percentageReg = /%$/;
    let cellValue = null;

    //列下标 数字转字母
    function chatatABC(n) {
        var orda = 'a'.charCodeAt(0);
        var ordz = 'z'.charCodeAt(0);
        var len = ordz - orda + 1;
        var s = "";
        while (n >= 0) {
            s = String.fromCharCode(n % len + orda) + s;
            n = Math.floor(n / len) - 1;
        }
        return s.toUpperCase();
    };
    // 获取单元格的背景色
    function setBackground(row, col, bg) {
        var colA = chatatABC(col);
        var key = colA + (row + 1);
        bgConfig[key] = bg.replace(/\#?/, '');
    }


    // 判断值类型是否为百分比 %
    function isPercentage(value) {
        return percentageReg.test(value.m) && value.ct && value.ct.t === 'n'
    }

    // 获取二维数组
    for (let row = 0; row < downOriginData.length; row++) {
        let arrRow = [];
        for (let col = 0; col < downOriginData[row].length; col++) {
            if (cellValue = downOriginData[row][col]) {
                // 处理单元格的背景颜色
                if (cellValue.bg) {
                    setBackground(row, col, cellValue.bg)
                }
                if (cellValue.ct != null && cellValue.ct.t == 'd') {
                    //  d为时间格式  2019-01-01   或者2019-01-01 10:10:10
                    arrRow.push(new Date(cellValue.m.replace(/\-/g, '/'))) //兼容IE
                } else if (cellValue.m && isPercentage(cellValue)) {
                    //百分比问题
                    arrRow.push(cellValue.m)
                } else {
                    arrRow.push(cellValue.v)
                }
            }
        }
        arr.push(arrRow)
    }
    // 第二步：通过SheetJs将数据转化为excel格式数据
    let opts = {
        dateNF: 'm/d/yy h:mm',
        cellDates: true,
        cellStyles: true
    }
    let ws = S_XLSX.utils.aoa_to_sheet(arr, opts)
    // 第三步：设置单元格的类型以及单元格样式
    let reg = /[\u4e00-\u9fa5]/g;
    for (let key in ws) {
        let item = ws[key]
        if (item.t === 'd') {
            if (item.w) {
                //时间格式的设置
                let arr = item.w.split(' ')
                if (arr[1] && arr[1] == '0:00') {
                    ws[key].z = 'm/d/yy'
                } else {
                    item.z = 'yyyy/m/d h:mm:ss'
                }
            }
        } else if (item.t === 's') {
            //百分比设置格式
            if (item.v && !item.v.match(reg) && item.v.indexOf('%') > -1) {
                item.t = 'n'
                item.z = '0.00%'
                item.v = Number.parseFloat(item.v) / 100
            }
            else if (item.v && item.v.match(reg)) {
                //含有中文的设置居中样式
                item['s'] = {
                    alignment: { vertical: 'center', horizontal: 'center' }
                }
            }
        }
        // 设置单元格样式
        if (bgConfig[key]) {
            ws[key]['s'] = {
                alignment: { vertical: 'center', horizontal: 'center' },
                fill: { bgColor: { indexed: 32 }, fgColor: { rgb: bgConfig[key] } },
                border: {
                    top: { style: 'thin', color: { rgb: '999999' } },
                    bottom: { style: 'thin', color: { rgb: '999999' } },
                    left: { style: 'thin', color: { rgb: '999999' } },
                    right: { style: 'thin', color: { rgb: '999999' } }
                }
            }
        }
    }
    // 第四步：组装下载数据格式
    let name = 'sheet1';
    let tmpWB = {
        SheetNames: [name], //保存的表标题
        Sheets: {
            [name]: Object.assign({}, ws)//内容 
        }
    }
    // 第五步：合并单元格配置
    let mergeConfig = sheet1.config.merge
    let mergeArr = [];
    if (JSON.stringify(mergeConfig) !== '{}') {
        mergeArr = handleMergeData(mergeConfig)
        tmpWB.Sheets[name]['!merges'] = mergeArr
    }
    //处理合并单元格config数据
    function handleMergeData(origin) {

        let result = []
        if (origin instanceof Object) {
            var r = "r",
                c = "c",
                cs = "cs",
                rs = "rs";
            for (var key in origin) {
                var startR = origin[key][r];
                var endR = origin[key][r];
                var startC = origin[key][c];
                var endC = origin[key][c];

                // 如果只占一行 为1 如果占两行 为2
                if (origin[key][cs] > 0) {
                    endC = startC + (origin[key][cs] - 1);
                }
                if (origin[key][rs] > 0) {
                    endR = startR + (origin[key][rs] - 1);
                }
                // s为合并单元格的开始坐标  e为结束坐标
                var obj = { s: { "r": startR, "c": startC }, e: { "r": endR, "c": endC } }
                result.push(obj)
            }
        }
        return result
    }
    // // 第六步：写入文件
    // let fileName = 'test';
    // // sheetjs js-xlsx 的方法 ，不能设置单元格格式
    // S_XLSX.writeFile(tmpWB, fileName + ".xlsx");


    function s2ab(s) {
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            var buf = new Array(s.length);
            for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    }
    function saveAs(obj, fileName) {
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "download";
        tmpa.href = URL.createObjectURL(obj);
        tmpa.click();
        setTimeout(function () {
            URL.revokeObjectURL(obj);
        }, 100);
    }

    ws = new Blob(
        [
            s2ab(
                XLSX.write(tmpWB, { bookType: 'xlsx', bookSST: false, type: 'binary' })//这里的数据是用来定义导出的格式类型
            )
        ]
    )
    saveAs(ws, 'test' + '.xlsx')
}


</script>

<template>
    <el-table :data="list">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <!-- 查看 -->
        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button type="primary" @click="check(scope.row)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-drawer v-model="show" @open="beforeOpen" @close="beforeClose" custom-class="drawer-wrapper" :size="1000"
        direction="rtl">
        <template #header>
            <el-button type="primary" @click="downloadFile">下载</el-button>
        </template>
        <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 50px;">
        </div>
    </el-drawer>
</template>

<style scoped></style>