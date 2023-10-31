/*
 * @Description:
 * @Author: fjw
 * @Date: 2022-06-02 14:20:08
 * @LastEditors: fjw
 * @LastEditTime: 2022-06-23 11:38:19
 */
import { FilterMethods, TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults';
export interface TableHeader {
  prop: string;
  label: string;
  type?: 'slot' | 'selection' | 'index';
  headerSlotName?: string; //自定义表头
  fixed?: boolean | 'left' | 'right'; // 是否固定列
  sortable?: boolean | 'custom'; //是否可排序
  headerAlign?: 'left' | 'center' | 'right'; //表头对齐方式， 若不设置该项，则使用表格的对齐方式
  align?: 'left' | 'center' | 'right'; //列内容对齐方式
  overflowTooltip?: boolean; //超出是否隐藏
  minWidth?: number;
  width?: number | string | undefined;
  headerClass?: string; //表头样式
  filters?: any[]; //排序表头
  filterMethod?: FilterMethods<any>;
  data?: TextType;
  hidden?: boolean; //是否不显示此列,用于用户手动开关显示和隐藏, true:隐藏,false:显示
  disabled?: boolean; //在选择列时该字段不可编辑
  formatter?: (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => any; //格式化函数
  category?: string; //在选择列时所属的分类
}
interface TextType {
  line?: number; // 最多显示行数
  develop?: boolean[];
  customFilterFun?: (row: any, index?: number) => string | number;
}

//多级表头
export interface TableColumn {
  prop: string;
  label: string;
  type?: 'slot' | 'selection' | 'index';
  headerSlotName?: string; //自定义表头
  fixed?: boolean | 'left' | 'right'; // 是否固定列
  sortable?: boolean | 'custom'; //是否可排序
  headerAlign?: 'left' | 'center' | 'right'; //表头对齐方式， 若不设置该项，则使用表格的对齐方式
  align?: 'left' | 'center' | 'right'; //列内容对齐方式
  overflowTooltip?: boolean; //超出是否隐藏
  minWidth?: number;
  width?: number | string | undefined;
  headerClass?: string; //表头样式
  filters?: any[]; //排序表头
  filterMethod?: FilterMethods<any>;
  data?: TextType;
  hidden?: boolean; //是否不显示此列,用于用户手动开关显示和隐藏, true:隐藏,false:显示
  disabled?: boolean; //在选择列时该字段不可编辑
  formatter?: (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => any; //格式化函数
  category?: string; //在选择列时所属的分类
  children?: any[];
  customType?: string; //自定义表头类型
  edit?: boolean; //是否可编辑
}
