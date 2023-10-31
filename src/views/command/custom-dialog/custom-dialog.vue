<template>
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
        <span>{{ options }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// import { ElDialog } from 'element-plus';

const props = defineProps<{
    visible: boolean;
    title?: string;
    options?: [];
    onSubmit: Function;
    onCancel: Function;
}>();

const emits = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
    (event: 'close'): void;
}>();

const dialogVisible = computed<boolean>({
    get() {
        return props.visible;
    },
    set(visible) {
        emits('update:visible', visible);
        if (!visible) {
            emits('close');
        }
    },
});

function confirm() {
    props.onSubmit()
}
</script>