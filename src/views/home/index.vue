<template>
  <div>
    <el-button type="primary" @click="crudTable.add">添加</el-button>
  </div>
  <FormTable
    v-loading="crudTable.state.loading"
    :modelValue="crudTable.state.dataList"
    :columns="crudTable.state.columns"
    :hideAdd="true"
    :hideIndex="true"
  >
    <template #action="scope">
      <el-button
        text
        type="primary"
        icon="el-icon-edit"
        @click="crudTable.edit(scope.row)"
        >编辑</el-button
      >
      <el-button
        text
        type="primary"
        icon="el-icon-edit"
        @click="crudTable.view(scope.row)"
        >查看</el-button
      >
      <el-button text type="danger" icon="el-icon-delete" @click="crudTable.del(scope.id)"
        >删除</el-button
      >
    </template>
  </FormTable>
  <!-- 脚本服务配置 -->
  <el-dialog
    v-model="scriptDialog.state.visible"
    :title="scriptDialog.state.title"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-form
      :ref="scriptDialog.scripFormRef"
      :model="scriptDialog.state.form"
      :rules="rules"
      class="form"
      label-width="100px"
    >
      <el-form-item label="id" prop="id">
        <el-input
          v-model="scriptDialog.state.form.id"
          placeholder="请输入id"
          :disabled="scriptDialog.state.isView"
          maxlength="80"
        />
      </el-form-item>
      <el-form-item label="title" prop="title">
        <el-input
          v-model="scriptDialog.state.form.title"
          placeholder="请输入title"
          :disabled="scriptDialog.state.isView"
        />
      </el-form-item>
      <el-form-item label="body" prop="body">
        <el-input
          v-model="scriptDialog.state.form.body"
          :disabled="scriptDialog.state.isView"
          placeholder="请输入body"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          :loading="scriptDialog.state.submitLoading"
          type="primary"
          @click="scriptDialog.submit"
          v-if="!scriptDialog.state.isView"
          >提交</el-button
        >
        <el-button @click="scriptDialog.close">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import FormTable from "@/components/FormTable/index.vue";
import { CrudTable, ScriptDialog, createRules } from "./index.js";
const crudTable = new CrudTable();
const scriptDialog = crudTable.scriptDialog;
const rules = createRules();
// const dialog = new Dialog()
// const scriptDialog = new ScriptDialog();
// const scriptState = reactive(scriptDialog.state);
</script>
