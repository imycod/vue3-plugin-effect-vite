<template>
    <div>
        <el-row>
            <header-search :query-source="querySource" v-model:query="state.query" :label-width="'100px'"
                @search="getList('search')" @reset="getList('reset')">
            </header-search>
        </el-row>
        <el-row>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('post')">
                新增岗位
            </el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('position')">
                新增职位
            </el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd('type')">
                新增类别
            </el-button>
        </el-row>
        <br />
        <DataTable ref="tableHeight" :loading="state.loading" :columns="state.columns" :list="state.list"
            v-model:page="state.page" @page-change="getList" heights="none">
            <template #action="scope">
                <el-button @click="handleView(scope.row)">详情</el-button>
                <el-button @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
            </template>
        </DataTable>
    </div>
</template>


<script lang="ts" setup>
import DataTable from "@/components/DataTable/DataTable.vue"
import { useTable } from "../composable/manage-post";

const {
    getList,
    querySource,
    state,
    tableHeight,
    addItem,
    editItem,
    deleteItem,
    viewItem,
} = useTable()


const emit = defineEmits('handle')
// 页面方法
function handleAdd(type = "") {
    emit('handle', 'add', {
        dataType: type,
    })
}
function handleView(row) {
    emit('handle', 'view', {
        dataType: 'post',
        data: row
    })
}
function handleEdit(row) {
    emit('handle', 'edit', {
        dataType: 'post',
        data: row
    })
}
function handleDel(row) {
    emit('handle', 'delete', {
        data: row
    })
}
</script>