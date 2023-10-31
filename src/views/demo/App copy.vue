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
import { exportExcel } from "./utils/export"
import getExcelValue from "./utils/excelValue"

import Luckysheet from 'luckyexcel'

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
    // 下载方法，需要导入标准模板，该下载方法暂不支持导出xlsx宽高
    exportExcel(luckysheet.getAllSheets(), '下载')
}

function save() {
    const value= getValue()
}

function getValue(){
    const excelValue= getExcelValue(luckysheet.getAllSheets())
    return {

    }
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
            <el-button type="primary" @click="save">保存</el-button>
        </template>
        <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 50px;">
        </div>
    </el-drawer>
</template>

<style scoped></style>