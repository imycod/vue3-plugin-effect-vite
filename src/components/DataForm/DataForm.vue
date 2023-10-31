<template>
  <el-form ref="dataForm" :class="resetStyle ? 'reset' : null" :model="form" :rules="rules" :inline="inline"
    :label-width="labelWidth" :label-position="labelPosition">
    <el-form-item v-for="item in formSource" :key="item.prop" :label="item.label" :prop="item.prop" class="form-item"
      :class="item.class ? item.class : ''" :style="{ width: item.width || props.width }" v-show="!item.hidden"
      :label-width="item.labelWidth" :required="item.required" :error="item.error">
      <el-input v-if="['input', 'password', 'textarea', 'number'].includes(item.type)" v-model="form[item.prop]"
        :placeholder="item.placeholder || '请输入'" :type="item.type" :rows="item.rows" :disabled="item.disabled"
        :show-password="item.showPassword" :clearable="item.clearable || false" :maxlength="item.maxlength || 50"
        :show-word-limit="item.showWordLimit || false" @input="v => item.onInput && item.onInput(v, this)" />
      <el-input-number v-else-if="item.type === 'inputnumber'" v-model="form[item.prop]" :min="item.min || -Infinity"
        :max="item.max || Infinity" :clearable="item.clearable || false"
        @change="v => item.onChange && item.onChange(v, this)" />
      <div style="width:100%" v-else-if="item.type === 'select'" :title="item.tooltip">
        <el-select v-model="form[item.prop]" :multiple="item.multiple" :placeholder="item.placeholder || '请选择'"
          :filterable="item.filterable" :disabled="item.disabled" :clearable="item.clearable || false"
          :collapse-tags="item.collapseTags || false" :collapse-tags-tooltip="item.collapseTagsTooltip || false"
          @change="v => item.onChange && item.onChange(v, this)">
          <el-option v-for="(_item, _index) in item.options" :key="_index" :value="_item[item.valueKey || 'value']"
            :label="_item[item.labelKey || 'label']" :disabled="_item.disabled || false" />
        </el-select>
      </div>
      <div style="width: 100%;" v-else-if="item.type === 'cascader'" :title="item.tooltip">
        <el-cascader v-model="form[item.prop]" :options="item.options" :clearable="item.clearable || false"
          :filterable="item.filterable || false" :props="item.props || null" :collapse-tags="item.collapseTags || false"
          :disabled="item.disabled || false"
          @change="v => item.onChange && item.onChange(v, this)" @blur="v => item.onBlur && item.onBlur(v, this)"></el-cascader>
      </div>
      <el-switch v-else-if="item.type === 'switch'" v-model="form[item.prop]" />
      <el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.prop]" :clearable="item.clearable || false"
        @change="v => item.onChange && item.onChange(v)">
        <el-radio v-for="(_item, _index) in item.options" :key="_index" :label="_item[item.valueKey || 'value']">{{
          _item[item.labelKey || 'label']
        }}</el-radio>
      </el-radio-group>
      <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="form[item.prop]"
        :clearable="item.clearable || false">
        <el-checkbox v-for="(_item, _index) in item.options" :key="_index" :label="_item[item.valueKey || 'value']">{{
          _item[item.labelKey || 'label']
        }}</el-checkbox>
      </el-checkbox-group>
      <label v-else-if="item.type === 'text'">{{ form[item.prop] || item.placeholder }}</label>
      <template v-else-if="item.type === 'slot'">
        <slot :name="item.prop" :row="item"></slot>
      </template>
      <el-date-picker v-else v-model="form[item.prop]" :type="item.type" :disabled="item.disabled"
        :value-format="item.format || 'YYYY-MM-DD'" :placeholder="item.placeholder || '请选择'"
        :start-placeholder="item.startPlaceholder || '开始日期'" :end-placeholder="item.endPlaceholder || '结束日期'"
        :clearable="item.clearable || false" @change="v => item.onChange && item.onChange(v)" />
    </el-form-item>
    <slot name="btnGroup"></slot>
    <div class="form-item-btn" :style="{ textAlign: align }" v-if="!hiddenBtns">
      <el-button @click="handleCancelClick">取消</el-button>
      <el-button type="primary" @click="submitForm" :loading="submitLoading"
        :style="{ width: btnBlock ? '100%' : 'auto' }">{{ submitLabel }}</el-button>
      <slot></slot>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ElForm, ElMessage } from 'element-plus';
import { ref, defineComponent, computed, toRefs } from 'vue';
import { FormSourceType } from './index';
import { debounce } from "@/utils/index"

interface PropsType {
  /** 绑定的form值*/
  form: Record<string, any>;
  /** //传入显示的form字段 */
  formSource: FormSourceType[];
  /** //内联form */
  inline?: boolean;
  /** //提交按钮位置 */
  align?: 'left' | 'center' | 'right';
  /** //提交按钮显示的文本*/
  submitLabel?: string;
  /** //是否展示整行按钮*/
  btnBlock?: boolean;
  /** label宽度*/
  labelWidth?: number | string;
  /** label所处的位置*/
  labelPosition?: string;
  width?: string | number;
  /** 是否隐藏提交按钮 */
  hiddenBtns?: boolean;
  resetStyle?: boolean;
}
const props = withDefaults(defineProps<PropsType>(), {
  form: () => ({}),
  formSource: () => [],
  inline: false,
  align: 'right',
  submitLabel: '保存',
  btnBlock: false,
  labelWidth: undefined,
  labelPosition: 'right',
  resetStyle: false,
});

const dataForm = ref(ElForm);
const submitLoading = ref(false);
const { form } = toRefs(props);

const rules = computed(() => {
  let _rules = {};
  props.formSource.forEach(item => {
    if (item.rules) {
      _rules[item.prop] = item.rules;
    }
  });
  return _rules;
});
// const rules=ref([])
// watchEffect(()=>{
//   props.formSource.forEach(item => {
//     if (item.rules) {
//       rules.value[item.prop] = item.rules;
//     }
//   });
// })
// onUnmounted(()=>{
//   rules.value=[]
// })

const emits = defineEmits(['submit', 'update:form', 'cancel']);
const submitForm = () => {
  debounce(() => {
    submitLoading.value=true
    dataForm.value.validate((valid: boolean) => {
      if (valid) {
        emits('update:form', form.value);
        emits('submit', form.value);
        submitLoading.value=false
      } else {
        ElMessage.error('表单字段不完整');
        submitLoading.value=false
        return false;
      }
      submitLoading.value=false
    })
  }, 1000)

};
const handleCancelClick = () => {
  emits('cancel');
};
const clearValidate = () => {
  dataForm.value.clearValidate();
};
const reset = () => {
  dataForm.value.resetFields();
};

const getFormValue = () => {
  return new Promise((rs, rj) => {
    dataForm.value.validate((valid: any) => {
      if (valid) {
        rs(form.value);
      } else {
        rj(form.value);
      }
    });
  });
};

const getFormValidate = () => {
  return new Promise((rs, rj) => {
    dataForm.value.validate((valid: any) => {
      if (valid) {
        console.log(valid);
        rs(valid);
      } else {
        rj(valid);
      }
    });
  });
};

function getRef() {
  return dataForm.value
}

defineExpose({
  clearValidate,
  getFormValue,
  getFormValidate,
  reset,
  submitLoading,
  getRef,
});
</script>
<script lang="ts">
export default defineComponent({
  name: 'DataForm'
});
</script>

<style lang="scss" scoped>
.form-item {
  margin-right: 20px;
}

.form-item-btn {
  width: 100%;
  padding: 0 24px;
}

.el-form--inline .el-form-item {
  width: 220px;
  margin-right: 18px;
}

:deep(.el-form-item__label) {
  /* padding: 0; */
  color: #101010;
}

:deep(.el-select),
:deep(.el-cascader),
:deep(.el-date-editor.el-input) {
  width: 100%;
}

.reset {
  :deep(.el-input.is-disabled .el-input__inner) {
    background-color: #FFFFFF !important;
    border-color: #FFFFFF !important;
    color: #4E5969 !important;
    cursor: not-allowed;
    font-size: 16px !important;
    font-weight: 500;
  }

  :deep(.el-form-item--small.el-form-item) {
    margin-bottom: 15px !important;
  }

  :deep(.el-input__prefix) {
    //display: none !important;
    //opacity: 0 !important;
    //visibility: hidden !important;
  }
}
</style>
