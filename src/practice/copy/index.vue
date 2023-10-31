<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view overflow-auto">
      <el-row>
        <el-form ref="queryRef" :inline="true" :model="table.state.query">
          <el-form-item label="系统名称: " class="ml2" prop="systemName">
            <el-input
              placeholder="请输入 系统名称"
              style="max-width: 180px"
              v-model="table.state.query.systemName"
            />
          </el-form-item>
          <el-form-item label="所属分类: " class="ml2" prop="subclassificationId">
            <el-tree-select
              :data="table.state.caseTreeData"
              check-strictly
              :props="caseOption.column[1].props"
              class="w100"
              clearable
              placeholder="请选择 所属分类"
              v-model="table.state.query.subclassificationId"
            >
            </el-tree-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="search" type="primary" @click="table.query">
              搜索
            </el-button>
            <el-button icon="Refresh" @click="table.reset">清空</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-button icon="el-icon-plus" type="primary" @click="table.add">
          新增
        </el-button>
      </el-row>
      <br />
      <FormTable
      v-if="false"
        v-loading="data.loading"
        :modelValue="data.tableData"
        :columns="caseOption.column"
        :hideAdd="true"
        :hideIndex="true"
      >
        <template #display="scope">
          <el-tag :type="proccessTag(scope.row).type" disable-transitions>{{
            proccessTag(scope.row).text
          }}</el-tag>
        </template>
        <template #action="scope">
          <el-button
            v-if="scope"
            text
            type="primary"
            icon="el-icon-edit"
            @click="handleSet(scope.row)"
            >脚本服务设置
          </el-button>
          <el-button
            v-if="scope"
            text
            type="primary"
            icon="el-icon-edit"
            @click="handleAdd('edit', scope.row.id)"
            >编辑
          </el-button>
          <el-button
            v-if="scope"
            text
            type="primary"
            icon="el-icon-edit"
            @click="handleDisplay(scope.row)"
            >{{ scope.row.display === 1 ? "下架" : "上架" }}
          </el-button>
          <el-button
            text
            type="danger"
            icon="el-icon-delete"
            @click="handleDel(scope.row.id)"
            >删除
          </el-button>
          <el-button
            text
            type="primary"
            icon="el-icon-eye"
            @click="handleview(scope.row.id)"
            >详情
          </el-button>
        </template>
      </FormTable>
      <pagination
        v-bind="data.page"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></pagination>
    </div>

    <!-- 脚本服务配置 -->
    <el-dialog
      v-if="false"
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
    <!-- 新增 编辑 弹窗 -->
    <el-dialog
      v-if="false"
      v-model="data.dialogVisible"
      :title="data.title"
      width="70%"
      custom-class="el-dialog-custom"
      :before-close="addOrEditClose"
      :close-on-click-modal="false"
    >
      <el-form
        ref="ruleFormRef"
        :model="data.form"
        :rules="rules"
        class="el-form"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="系统名称" prop="systemName">
              <el-input
                v-model="data.form.systemName"
                placeholder="请输入系统名称"
                :disabled="data.isView"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属分类" prop="subclassificationId">
              <el-tree-select
                v-model="data.form.subclassificationId"
                :data="data.caseTreeData"
                check-strictly
                :render-after-expand="false"
                :disabled="data.isView"
                :props="data.elTreeOption"
                @current-change="selectIfication"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新时间" prop="demoUpdateTime">
              <el-config-provider :locale="data.locale">
                <el-date-picker
                  v-model="data.form.demoUpdateTime"
                  type="date"
                  placeholder="请选择日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :locale="data.locale"
                  :disabled="data.isView"
                  :disabled-date="disabledDate"
                />
              </el-config-provider>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业" prop="industry">
              <el-input
                v-model="data.form.industry"
                placeholder="请输入所属行业"
                :disabled="data.isView"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="data.title !== '编辑' ? 12 : 24">
            <el-form-item label="封面图" prop="cover">
              <image-upload
                v-if="data.dialogVisible"
                v-model="data.form.cover"
                :fileType="['png', 'jpg', 'bmp']"
                :disabled="data.isView"
                :fileMeasure="data.measure"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="data.title !== '编辑'" :span="12">
            <el-form-item label="是否显示" prop="display">
              <el-radio-group
                v-model="data.form.display"
                class="ml-4"
                :disabled="data.isView"
              >
                <el-radio :label="1" size="large">是</el-radio>
                <el-radio :label="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="priority">
              <el-input
                v-model="data.form.priority"
                type="number"
                placeholder="请输入排序"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大屏链接" prop="largeScreen">
              <el-input
                v-model="data.form.largeScreen"
                :placeholder="data.isView ? '' : '请输入大屏链接'"
                :disabled="data.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理后台链接" prop="pcUrl">
              <el-input
                v-model="data.form.pcUrl"
                :placeholder="data.isView ? '' : '请输入管理后台链接'"
                :disabled="data.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系统简介" prop="systemIntroduction">
              <el-input
                v-model="data.form.systemIntroduction"
                :class="data.form.systemIntroduction.length === 300 ? 'red' : ''"
                placeholder="请输入系统简介"
                type="textarea"
                maxlength="300"
                show-word-limit
                :rows="3"
                :disabled="data.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系统介绍" prop="systemDetails">
              <div style="border: 1px solid #ccc">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  v-model="data.form.systemDetails"
                  style="height: 500px; overflow-y: scroll; width: calc(70vw - 148px)"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @on-created="handleCreated"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="演示视频">
              <vedio-upload
                v-if="data.dialogVisible"
                v-model="data.form.demoVideo"
                :fileType="['avi', 'mp4', 'mov', 'wmv']"
                :fileSize="500"
                :disabled="data.isView"
                fileNames="视频"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="方案">
              <vedio-upload
                v-if="data.dialogVisible"
                v-model="data.form.scheme"
                :fileType="['pdf', 'doc', 'docx', 'zip', 'rar']"
                :fileSize="50"
                :limit="5"
                :disabled="data.isView"
                fileNames="方案"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作手册">
              <vedio-upload
                v-if="data.dialogVisible"
                v-model="data.form.operationManual"
                :fileType="['pdf', 'doc', 'docx', 'zip', 'rar']"
                :fileSize="50"
                :limit="5"
                :disabled="data.isView"
                fileNames="操作手册"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="演示账号" prop="demoAccount">
              <el-input
                v-model="data.form.demoAccount"
                :placeholder="data.isView ? '' : '请输入账号'"
                :disabled="data.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="demoPassword">
              <el-input
                v-model="data.form.demoPassword"
                :placeholder="data.isView ? '' : '请输入密码'"
                :disabled="data.isView"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span v-if="!data.isView" class="dialog-footer">
          <el-button :loading="data.submitLoading" type="primary" @click="addOrEditSave"
            >提交</el-button
          >
          <el-button @click="addOrEditClose">取消</el-button>
        </span>
        <span v-else class="dialog-footer">
          <el-button type="primary" @click="addOrEditClose">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { IToolbarConfig, DomEditor, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import ImageUpload from "/@/componentBusinesses/ImageUpload/index.vue";
import VedioUpload from "/@/componentBusinesses/vedioUpload/index.vue";

import { CrudTable, Dialog, ScriptDialog, createRules } from "./index.js";

const table = new CrudTable();
</script>
<style lang="scss" scoped>
::v-deep .el-popper {
  max-width: 400px;
}
::v-deep.red .el-input__count {
  color: red;
}
.el-dialog-custom {
  .el-form {
    :deep(.el-form-item:last-of-type) {
      display: flex;
      --font-size: 14px;
      margin-bottom: 18px !important;
    }
  }
}
</style>
