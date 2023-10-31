<template>
    <div class="layout-padding h-auto">
        <div class="layout-padding-auto layout-padding-view">
            <el-row :span="24">
                <el-col :xs="24" :sm="24" :md="5" class="user__tree">
                    <tree :treeData="treeData" node-key="id" @node-click="handleNodeClick" :propsConfig="{ label: 'label' }"
                        :showCheckbox="false">
                        <template #custom="{ node }">
                            <span>{{ node.label }} <i class="el-icon-lock"></i></span>
                        </template>
                    </tree>
                </el-col>
                <el-col :xs="24" :sm="24" :md="18" class="user__main">
                    <component ref="componentRef" :is="componentName" @handle="handle" :models="layoutModels">
                    </component>

                    <div id="teleport-layout-view-button"></div>
                </el-col>
            </el-row>
        </div>

        <el-dialog :close-on-click-modal="false" v-model="dialog.visible" v-if="dialog.visible" :title="dialog.title">
            <data-form :form-source="dialog.options" ref="formRef" :form="dialog.form" @submit="handleSave" @cancel="close"
                label-width="120px" :hiddenBtns="dialog.isView"></data-form>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import tree from "@/components/Tree/index.vue";
import DataForm from "@/components/DataForm/DataForm.vue"
import { useDialog, useLayout, useTable, useTree } from "./composable/manage-post";

const { treeData } = useTree()

// 对话框事件
const { dialog, submit, close, open, formRef } = useDialog()

function handleSave() {
    const { getList } = useTable()
    submit()
    getList()
    close()
}

// tree点击切换视图方法
const { componentName, layoutView, layoutModels, initLayoutModels } = useLayout()

const componentRef=ref()
function handleNodeClick(node) {
    initLayoutModels(node)
    componentRef.value.initTab && componentRef.value.initTab()
    componentName.value = layoutView.view
}

async function handle(eventType: string, params?: { dataType: string, data?: any }) {
    const dataType = params?.dataType
    const data = params?.data
    // tree 点击事件和返回事件
    if (!eventType && !dataType && !data) {
        componentName.value = layoutView.table
    }
    // 删除操作
    if (eventType === 'delete') {
        const { deleteItem } = useTable()
        deleteItem(data.id)
    }

    // 新增、编辑、查看操作
    if (eventType && dataType) {
        open(dataType, eventType, data)
    }
}

</script>

<style lang="scss" scoped>
:deep(.header-search) {
    flex: 1;
}

:deep(.data-table) {
    height: calc(100vh - 250px);
}

.user__main {
    margin-left: 15px;
}

#teleport-layout-view-button {
    position: absolute;
    bottom: 0px;
    right: 0px;
}

:deep(.el-tree) {
    height: calc(100vh - 200px);
    overflow: auto;
}
</style>