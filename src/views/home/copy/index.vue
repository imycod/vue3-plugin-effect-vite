<template>
  <div>
    <el-button type="primary" @click="handleAdd">添加</el-button>
  </div>
  {{table.column}}
  <!-- <FormTable
    v-loading="table.loading"
    :modelValue="table.dataList"
    :columns="table.column"
    :hideAdd="true"
    :hideIndex="true"
  >
    <template #action="scope">
      <el-button text type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"
        >编辑</el-button
      >
      <el-button text type="danger" icon="el-icon-delete" @click="handleDel(scope.row)"
        >删除</el-button
      >
    </template>
  </FormTable> -->

<!-- 脚本服务配置 -->
    <el-dialog
      v-model="data.scriptVisible"
      title="服务脚本设置"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="scriptForm"
        :model="data.scriptForm"
        :rules="rules"
        class="form"
        label-width="100px"
      >
        <el-form-item label="集群名称" prop="clusterName">
          <el-input
            v-model="data.scriptForm.clusterName"
            placeholder="请输入集群名称"
            maxlength="80"
          />
        </el-form-item>
        <el-form-item label="命名空间" prop="namespace">
          <el-input v-model="data.scriptForm.namespace" placeholder="请输入命名空间" />
        </el-form-item>
        <el-form-item label="服务列表" prop="serviceList">
          <el-input v-model="data.scriptForm.serviceList" placeholder="请输入服务列表" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button :loading="submitLoading" type="primary" @click="handleSave"
            >提交</el-button
          >
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup>
import { reactive } from "vue";
import FormTable from "@/components/FormTable/index.vue"
import { useCrudTable, useDialog } from "@/composables/home.js";
const { table, handleEdit, handleAdd, handleDel } = reactive(useCrudTable());
</script>
