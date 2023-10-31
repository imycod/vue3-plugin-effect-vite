<template>
    <el-tabs v-model="tab">
        <el-tab-pane :label="models.label" name="0">
            <data-form ref="formRef" :form-source="models.formOptions" :hiddenBtns="true" v-model:query="models.form"
                :key="models.nodeKey"></data-form>
        </el-tab-pane>
        <el-tab-pane :label="models.slabel" name="1">
            <DataTable :page="false" :height="500" ref="tableHeight" :columns="models.tableOptions"
                :list="models.tableList">
            </DataTable>
        </el-tab-pane>
    </el-tabs>

    <Teleport to="#teleport-layout-view-button">
        <el-button @click="emit('handle')">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
    </Teleport>
</template>

<script lang="ts" setup>

const props = defineProps({
    models: {
        type: Object,
        default: ''
    }
})

const emit = defineEmits('handle')

const tab = ref('0')

function initTab() {
    tab.value = '0'
}
defineExpose({
    initTab
})

const tableHeight = ref()

const formRef = ref()

function confirm() {
    emit('handle')
}
</script>  