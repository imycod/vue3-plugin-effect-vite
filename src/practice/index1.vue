<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view overflow-auto">
      <el-row>
        <el-form :ref="crud.queryRef" :inline="true" :model="crud.state.queryForm">
          <el-form-item label="系统名称: " class="ml2" prop="systemName">
            <el-input
              placeholder="请输入 系统名称"
              style="max-width: 180px"
              v-model="crud.state.queryForm.systemName"
            />
          </el-form-item>
          <el-form-item label="所属分类: " class="ml2" prop="subclassificationId">
            <el-tree-select
              :data="caseTreeData"
              check-strictly
              :props="caseOption.column[1].props"
              class="w100"
              clearable
              placeholder="请选择 所属分类"
              v-model="crud.state.queryForm.subclassificationId"
            >
            </el-tree-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="search" type="primary" @click="crud.query"> 搜索 </el-button>
            <el-button icon="Refresh" @click="crud.refresh">清空</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-button icon="el-icon-plus" type="primary" @click="crud.add"> 新增 </el-button>
      </el-row>
      <br />
      <FormTable
        v-loading="crud.state.loading"
        :modelValue="crud.state.dataList"
        :columns="caseOption.column"
        :hideAdd="true"
        :hideIndex="true"
      >
        <template #display="scope">
          <el-tag
            :type="CrudTable.createTagWithDisplay(scope.row).type"
            disable-transitions
            >{{ CrudTable.createTagWithDisplay(scope.row).text }}</el-tag
          >
        </template>
        <template #action="scope">
          <el-button
            v-if="scope"
            text
            type="primary"
            icon="el-icon-edit"
            @click="crud.scriptSet(scope.row)"
            >脚本服务设置
          </el-button>
          <!-- <el-button
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
          </el-button> -->
        </template>
      </FormTable>
      <pagination
        v-bind="crud.state.pagination"
        @current-change="crud.currentChangeHandle"
        @size-change="crud.sizeChangeHandle"
      ></pagination>
    </div>

    <!-- 脚本服务配置 -->
    <el-dialog
      v-model="scrip.visible"
      title="服务脚本设置"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        :ref="scrip.scripFormRef"
        :model="scrip.form"
        :rules="rules"
        class="form"
        label-width="100px"
      >
        <el-form-item label="集群名称" prop="clusterName">
          <el-input
            v-model="scrip.form.clusterName"
            placeholder="请输入集群名称"
            maxlength="80"
          />
        </el-form-item>
        <el-form-item label="命名空间" prop="namespace">
          <el-input v-model="scrip.form.namespace" placeholder="请输入命名空间" />
        </el-form-item>
        <el-form-item label="服务列表" prop="serviceList">
          <el-input v-model="scrip.form.serviceList" placeholder="请输入服务列表" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button :loading="scrip.submitLoading" type="primary" @click="scrip.submit"
            >提交</el-button
          >
          <el-button @click="scrip.close">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增 编辑 弹窗 -->
    <el-dialog
    v-if="false"
      v-model="dialog.visible"
      :title="dialog.title"
      width="70%"
      custom-class="el-dialog-custom"
      :before-close="dialog.close"
      :close-on-click-modal="false"
    >
      <el-form
        :ref="dialog.ruleFormRef"
        :model="dialog.form"
        :rules="rules"
        class="el-form"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="系统名称" prop="systemName">
              <el-input
                v-model="dialog.form.systemName"
                placeholder="请输入系统名称"
                :disabled="dialog.isView"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属分类" prop="subclassificationId">
              <el-tree-select
                v-model="dialog.form.subclassificationId"
                :data="caseTreeData"
                check-strictly
                :render-after-expand="false"
                :disabled="dialog.isView"
                :props="dialog.elTreeOption"
                @current-change="dialog.selectIfication"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新时间" prop="demoUpdateTime">
              <el-config-provider :locale="dialog.locale">
                <el-date-picker
                  v-model="dialog.form.demoUpdateTime"
                  type="date"
                  placeholder="请选择日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :locale="dialog.locale"
                  :disabled="dialog.isView"
                  :disabled-date="MainDialog.disabledDate"
                />
              </el-config-provider>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业" prop="industry">
              <el-input
                v-model="dialog.form.industry"
                placeholder="请输入所属行业"
                :disabled="dialog.isView"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="dialog.title !== '编辑' ? 12 : 24">
            <el-form-item label="封面图" prop="cover">
              <image-upload
                v-if="dialog.visible"
                v-model="dialog.form.cover"
                :fileType="['png', 'jpg', 'bmp']"
                :disabled="dialog.isView"
                :fileMeasure="dialog.measure"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="data.title !== '编辑'" :span="12">
            <el-form-item label="是否显示" prop="display">
              <el-radio-group
                v-model="dialog.form.display"
                class="ml-4"
                :disabled="dialog.isView"
              >
                <el-radio :label="1" size="large">是</el-radio>
                <el-radio :label="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="priority">
              <el-input
                v-model="dialog.form.priority"
                type="number"
                placeholder="请输入排序"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大屏链接" prop="largeScreen">
              <el-input
                v-model="dialog.form.largeScreen"
                :placeholder="dialog.isView ? '' : '请输入大屏链接'"
                :disabled="dialog.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理后台链接" prop="pcUrl">
              <el-input
                v-model="dialog.form.pcUrl"
                :placeholder="dialog.isView ? '' : '请输入管理后台链接'"
                :disabled="dialog.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系统简介" prop="systemIntroduction">
              <el-input
                v-model="dialog.form.systemIntroduction"
                :class="dialog.form.systemIntroduction.length === 300 ? 'red' : ''"
                placeholder="请输入系统简介"
                type="textarea"
                maxlength="300"
                show-word-limit
                :rows="3"
                :disabled="dialog.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系统介绍" prop="systemDetails">
              <div style="border: 1px solid #ccc">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="dialog.editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  v-model="dialog.form.systemDetails"
                  style="height: 500px; overflow-y: scroll; width: calc(70vw - 148px)"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @on-created="dialog.createEditorRef"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="演示视频">
              <vedio-upload
                v-if="dialog.dialogVisible"
                v-model="dialog.form.demoVideo"
                :fileType="['avi', 'mp4', 'mov', 'wmv']"
                :fileSize="500"
                :disabled="dialog.isView"
                fileNames="视频"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="方案">
              <vedio-upload
                v-if="dialog.dialogVisible"
                v-model="dialog.form.scheme"
                :fileType="['pdf', 'doc', 'docx', 'zip', 'rar']"
                :fileSize="50"
                :limit="5"
                :disabled="dialog.isView"
                fileNames="方案"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作手册">
              <vedio-upload
                v-if="dialog.dialogVisible"
                v-model="dialog.form.operationManual"
                :fileType="['pdf', 'doc', 'docx', 'zip', 'rar']"
                :fileSize="50"
                :limit="5"
                :disabled="dialog.isView"
                fileNames="操作手册"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="演示账号" prop="demoAccount">
              <el-input
                v-model="dialog.form.demoAccount"
                :placeholder="dialog.isView ? '' : '请输入账号'"
                :disabled="dialog.isView"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="demoPassword">
              <el-input
                v-model="dialog.form.demoPassword"
                :placeholder="dialog.isView ? '' : '请输入密码'"
                :disabled="dialog.isView"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span v-if="!dialog.isView" class="dialog-footer">
          <el-button :loading="dialog.submitLoading" type="primary" @click="dialog.submit"
            >提交</el-button
          >
          <el-button @click="dialog.close">取消</el-button>
        </span>
        <span v-else class="dialog-footer">
          <el-button type="primary" @click="dialog.close">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { CrudTable, MainDialog, createRules } from "./index";
import { caseOption } from "/@/const/crud/configManage/caseMaintenance";
import { IToolbarConfig, DomEditor, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import ImageUpload from "/@/componentBusinesses/ImageUpload/index.vue";
import VedioUpload from "/@/componentBusinesses/vedioUpload/index.vue";
import { getTreeData } from "/@/api/businesses/configManage/menu/index";

const mode = "default";

const crud = new CrudTable();
const scrip = crud.scriptDialog;
const dialog = crud.mainDialog;
const rules = createRules();
const { editorConfig, toolbarConfig } = MainDialog.createConfig();
// 组件销毁时，也及时销毁编辑器
// onBeforeUnmount(() => {
//   const editor = editorRef.value;
//   editor && editor.destroy();
// });
onMounted(() => {
  getTreeDataFn();
});

const caseTreeData = ref([]);
async function getTreeDataFn() {
  let res = await getTreeData();
  caseTreeData.value = res.data;
  caseTreeData.value[0].disabled = true;
}
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
