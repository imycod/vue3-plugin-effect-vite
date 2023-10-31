<template>
  <div class="data-table">
    <el-table
      @row-dblclick="dbclick"
      :cell-style="{ textAlign: 'center' }" :header-cell-style="{
      textAlign: 'center',
      background: 'var(--el-table-row-hover-bg-color)',
      color: 'var(--el-text-color-primary)',
    }" stripe border
      :cell-class-name="tableCellClassName"
      v-loading="loading"
      :data="list"
      ref="multipleTable"
      element-loading-text="加载中..."
      :border="border"
      fit
      :height="tableHeight"
      row-key="id"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @row-click="rowClick"
      style="width: 100%"
      :span-method="SpanMethod"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :sum-text="sumText"
      :show-header="showHeader"
    >
      <el-table-column
        v-if="isSelect"
        type="selection"
        :selectable="selectable"
        width="45"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :fixed="item.fixed || false"
        :type="item.type || undefined"
        :sortable="item.sortable || false"
        :header-align="item.headerAlign || 'center'"
        :align="item.align || 'center'"
        :show-overflow-tooltip="item.overflowTooltip === false ? false : true"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth || 140"
        :width="item.width"
        :class-name="item.headerClass || 'center'"
        :filters="item.filters"
        :filter-method="(item.filters && (item.filterMethod || filterMethod)) || undefined"
      >
        <!-- 自定义表头 -->
        <template #header v-if="item.headerSlotName">
          <slot :name="item.headerSlotName" :item="item" :index="index"></slot>
        </template>

        <template v-if="item.type === 'slot'" #default="scope">
          <!-- 插槽 -->
          <slot
            v-if="item.type == 'slot'"
            :name="item.prop || 'default'"
            :row="scope.row"
            :column="scope.column"
            :index="scope.$index"
          ></slot>
        </template>

        <template v-else-if="!item.type" #default="scope">
          <!-- 正常 超出折叠不跨行-->
          <!-- 主体内容 -->
          <!-- <div
            :style="{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }"
            >{{
              item.formatter
                ? item.formatter(scope.row, scope.column, scope.row[item.prop], scope.$index)
                : scope.row[item.prop]
            }}</div
          > -->
          {{
            item.formatter
              ? item.formatter(scope.row, scope.column, scope.row[item.prop], scope.$index)
              : scope.row[item.prop]
          }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页操作 -->
    <div
      class="pagination"
      v-if="isPagination && page"
      :style="{ justifyContent: { left: 'flex-start', right: 'flex-end', center: 'center' }[pagePosition] }"
    >
      <el-pagination
        @size-change="handleChange($event, 'pageSize')"
        @current-change="handleChange($event, 'currentPage')"
        :current-page="page.pageNumber"
        :page-sizes="pageSizes"
        :page-size="page.pageSize"
        :layout="layout"
        :total="page.total || 0"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, computed } from 'vue';
import { ElTable } from 'element-plus';
import { TableHeader } from './types';
import { ComponentSize } from 'element-plus/lib/utils/types';
import { PageType } from '@/model';
//组件props类型
interface PropsType {
  // 默认height可传可不传,导致不传高度总为400
  height?: number;
  // 有个需求是,高度随着内容变化,所以要再添一个条件,以保持和以前兼容
  heights?: string;
  // 组件大小
  size?: ComponentSize;
  // 当前数据
  list: any[];
  //table 唯一key值, 一般以table主键,默认为‘id’
  uniqueKey?: string;
  // 所有选中
  selectData?: any[];
  //是否为选择table
  isSelect?: boolean;
  //表格列定义
  columns: TableHeader[];
  //页码格式定义
  layout?: string;
  pageSizes?: number[];
  //是否展示页码
  isPagination?: boolean;
  // 分页数据
  page?: PageType;
  pagePosition?: 'left' | 'right' | 'center';
  // 加载动画
  loading?: boolean;
  dblClick?: boolean;
  SpanMethod?: any;
  //禁止选择的key
  disabledSelectKey?: string;
  //禁止选择的value
  disabledSelectValue?: [];
  border?: boolean;
  showSummary?: boolean;
  summaryMethod?: any;
  sumText?: string;
  showHeader?:boolean;
}

const props = withDefaults(defineProps<PropsType>(), {
  size: 'mini',
  uniqueKey: 'id',
  isSelect: false,
  layout: 'total, prev, pager, next, sizes, jumper',
  list: () => [],
  selectData: () => [],
  pageSizes: () => [10, 20, 30, 50],
  isPagination: true,
  page: () => ({ pageNumber: 1, pageSize: 10, total: 0 }),
  pagePosition: 'right',
  loading: false,
  dblClick: false,
  SpanMethod: () => {},
  border: true,
  heights: 'default',
  showSummary: false,
  summaryMethod: () => {},
  sumText:'',
  showHeader:true,
});
//当想要动态设置table height 传另外的值
const tableHeight = computed(() => {
  if (props.heights === 'none') {
    return null;
  } else {
    return props.height ? props.height - 58 : 400;
  }
});
const emits = defineEmits([
  'update:page',
  'update:page',
  'sortCustom',
  'pageChange',
  'row-click',
  'selection-change',
  'dbl-click'
]);
const columns = computed(() => {
  return props.columns.filter(item => item.hidden !== true);
});
// 当前页选中
const selectRow = ref<any[]>([]);
/* ----- 组件实例 ----- */
const multipleTable = ref(ElTable);

/* ------ 排序方法 ------ */
const sortChange = (obj: any) => {
  if (obj.column) {
    if (obj.column.sortable == 'custom') {
      emits('sortCustom', obj);
    }
  }
};
const selectable = (row: any) => {
  if (!props.disabledSelectKey) return true;
  // 判断row[props.disabledSelectKey]是否为boolean类型
  if (typeof row[props.disabledSelectKey] === 'boolean') {
    return row[props.disabledSelectKey];
  }
  return props.disabledSelectValue.includes(row[props.disabledSelectKey]);
};
// 行点击方法
const rowClick = (...arg: any) => {
  emits('row-click', { ...arg });
};
/* ------ 添加选中 ------ */
const handleSelectionChange = (e: any[]) => {
  // console.log('选中', e)
  selectRow.value = e;
  emits('selection-change', selectRow.value);
};
/* ------ 条数或页数切换 ------ */
const handleChange = (e: number, type: 'pageSize' | 'currentPage') => {
  console.log(e, type, props.page);
  if (type === 'pageSize') {
    let max = Math.ceil(props.page.total / e);
    if (props.page.pageNumber > max) {
      emits('update:page', {
        total: props.page.total,
        pageNumber: max,
        pageSize: e
      });
    } else {
      emits('update:page', {
        total: props.page.total,
        pageNumber: props.page.pageNumber,
        pageSize: e
      });
    }
  } else {
    emits('update:page', {
      total: props.page.total,
      pageNumber: Math.floor(e),
      pageSize: props.page.pageSize
    });
  }
  emits('pageChange',type);
};

// 默认的筛选方法,不传入则使用默认/
const filterMethod = (value: any, row: { [x: string]: any }, column: { [x: string]: any }) => {
  const property = column['property'];
  return row[property] === value;
};

//导出方法:多选选中
const toggleSelection = (rows: any[]) => {
  multipleTable.value.clearSelection();
  rows.forEach(row => {
    multipleTable.value!.toggleRowSelection(row, undefined);
  });
};
/* 表格 */
let currentCell: any = ref(null || '');
// 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
const tableCellClassName = ({ row, column, rowIndex, columnIndex }: any) => {
  if (props.dblClick) {
    row.index = rowIndex;
    column.index = columnIndex;
  }
};
// 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
// 拼接后类似这样："1,0","1,1",
const dbclick = (row: any, column: any, event: any) => {
  if (props.dblClick) {
    currentCell.value = row.index + ',' + column.index;
    emits('dbl-click', currentCell.value);
  }
};
const clearSelection = () => {
  multipleTable.value.clearSelection();
};

/** 导出方法 */
defineExpose({
  toggleSelection,
  clearSelection
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'DataTable'
});
</script>

<style scoped>
:deep(.el-table__empty-block){
  width:100% !important;
}
.data-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.el-table {
  --el-table-header-background-color: #f2f6fc;
  --el-table-header-font-color: #101010;
  flex: 1;
}
/* 树表格时icon和文字居中 */
:deep(.cell) {
  display: flex;
  align-items: center;
  /* width: 100%; */
  /* display: inline-block;/ */
}
:deep(.verticalTop) {
  vertical-align: top !important;
}
:deep(.center .cell) {
  justify-content: center;
}
:deep(.right .cell) {
  justify-content: flex-end;
}
.content {
  position: relative;
  padding-bottom: 23px;
}
.content > .develop {
  text-align: center;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 10px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5));
}
.content > .develop span {
  /* position: absolute; */
  bottom: 0;
  font-size: 12px;
}
.develop {
  width: 100%;
}
:deep(.btnType) {
  flex-wrap: wrap;
}
:deep(.btnType .btnEach) {
  margin-bottom: 5px;
  margin-top: 5px;
}
:deep(.btnType .notSpan span) {
  display: none;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.left {
  justify-content: flex-start;
}
.el-pagination {
  width: auto;
}
:deep.el-table .el-table__body-wrapper {
  z-index: 2;
}
</style>
