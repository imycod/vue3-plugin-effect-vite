/*
 * @Description:
 * @Author: fjw
 * @Date: 2022-06-02 14:20:08
 * @LastEditors: fjw
 * @LastEditTime: 2022-07-06 15:58:52
 */
import { IDatePickerType } from 'element-plus/lib/components/date-picker/src/date-picker.type';
export interface FormSourceType {
  label?: string;
  prop: string;
  type:
    | 'input'
    | 'number'
    | 'password'
    | 'textarea'
    | 'select'
    | 'date'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'text'
    | 'slot'
    | 'cascader'
    | 'inputnumber'
    | IDatePickerType;
  rows?: number;
  format?: string;
  hidden?: boolean;
  placeholder?: string;
  disabled?: boolean;
  showPassword?: boolean;
  maxlength?: number;
  options?: any[];
  labelKey?: string;
  valueKey?: string;
  multiple?: boolean;
  filterable?: boolean;
  onChange?: Function;
  startPlaceholder?: string;
  endPlaceholder?: string;
  width?: string;
  rules?: any[];
  /** 单独字段设置labelWidth */
  labelWidth?: string | number;
  /** 是否必填,也可以通过rules设置 */
  required?: boolean;
  /** 错误信息 */
  error?: string;
  class?: string; //自定义class
  min?: number;
  max?: number;
}
