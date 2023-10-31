<script setup>
import { ref, reactive, nextTick, createApp, onMounted } from "vue"
const list = [
    {
        id: '1701523839387824129',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    }
]


function handleClick(action,scope) {
    console.log({action,scope});
}

</script>

<template>
    <el-table :data="list">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <!-- 查看 -->
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" @click="handleClick('check', scope)">查看</el-button>
                <el-button type="primary" @click="handleClick('delete', scope)">删除</el-button>
                <el-button type="primary" @click="handleClick('edit', scope)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped></style>
