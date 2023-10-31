<!--
 * @Description: 
 * @Author: wxs
 * @Date: 2022-09-23 17:24:45
 * @LastEditors: wxs
 * @LastEditTime: 2023-09-27 11:18:51
-->
<template>
  <div v-loading="loading" class="tree-data">
    <el-input v-model="filterText" placeholder="请输入搜索内容" v-if="props.isSearch" />
    <el-checkbox v-model="checkAll" @change="handleCheckAllChange" v-if="!filterText && isCheckAll">全选</el-checkbox>
    <el-tree :data="data" ref="treeRef" :props="props.propsConfig" :show-checkbox="props.showCheckbox"
      :node-key="props.nodeKey" :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys"
      @check-change="handleCheckChange" :filter-node-method="filterNode" @node-click="handleNodeClick">
      <template #default="scope">
        <slot name="custom" :node="scope.node">
          <div class="custom-node">
            <i class="el-icon-user" v-if="scope.data.leaf"></i>
            <span>{{ scope.node.label }}</span>
          </div>
        </slot>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
const treeRef: any = ref(null);
interface Tree {
  name: string;
}
const props = defineProps({
  //配置选项
  propsConfig: {
    type: Object,
    default: {
      label: "name",
      children: "children",
      isLeaf: "leaf",
    },
  },
  isCheckAll: {
    type: Boolean,
    default: false,
  },
  //显示可选框
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  //树节点唯一标识
  nodeKey: {
    type: String,
    default: "id",
  },
  //传给后端的标识
  dataKey: {
    type: String,
    default: "id",
  },
  //默认选中节点
  defaultCheckedKeys: {
    type: Array,
    default: () => [],
  },
  //是否开启搜索
  isSearch: {
    type: Boolean,
    default: true,
  },
  //接口参数
  params: {
    type: Object,
    default: {},
  },
  api: {
    type: Function,
    default: "",
    required: false,
  },
  treeData: {
    type: Array,
    default: [],
    required: false,
  },
});

const data = ref([]);
//loading加载
const loading = ref(false);
//全选反选控制
const checkAll = ref(false);
//选中的key值
const checkKeys = ref([]);
//选中的节点详细数据
const checkInfo = ref([]);
//默认选中节点
const defaultCheckedKeys = ref([]);
//默认展开的节点
const defaultExpandedKeys = ref([]);
//过滤搜索内容
const filterText = ref("");
watch(filterText, (val) => {
  treeRef.value!.filter(val);
});
const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data[props.propsConfig.label].includes(value);
};

// function setAddIdToTree(node, userId) {
//   node.userId = userId;
//   if (Array.isArray(node.children)) {
//     node.children.forEach(child => {
//       setAddIdToTree(child, child.uid);
//     })
//   }
// }

// function handleTree(tree) {
//   tree.forEach(item => setAddIdToTree(item, item.uid))
// }

const getTreeData = async () => {
  loading.value = true;
  let apiName = props.api;
  const res = await apiName().catch(() => {
    loading.value = false;
  });
  loading.value = false;
  if (res.code !== 0) return;
  // handleTreeDataBefore(res.data)
  data.value = res.data;
};
//获取所有选中的节点
const handleCheckChange = (data: Tree, checked: boolean, indeterminate: boolean) => {
  let res = treeRef.value.getCheckedNodes();
  let arr: any = [];
  let arrInfo: any = [];
  res.forEach((item: any) => {
    if (item[props.dataKey] && !item.isDept) {
      arr.push(item[props.dataKey]);
      arrInfo.push(item);
    }
  });
  //去重
  arr = [...new Set(arr)];
  arrInfo = [...new Set(arrInfo)];
  checkKeys.value = arr;
  checkInfo.value = arrInfo;
};
//全选反选
const handleCheckAllChange = () => {
  if (checkAll.value) {
    console.log(data.value);
    treeRef.value.setCheckedNodes(data.value);
  } else {
    treeRef.value.setCheckedKeys([]);
  }
};
const closeTree = () => {
  //清空选中的节点
  treeRef.value.setCheckedKeys([]);
  //清空搜索内容
  filterText.value = "";
  // 收起树节点
  recursion(treeRef.value.root.childNodes);
};
//递归收起所有节点
const recursion = (arr: any) => {
  arr.forEach((ele: any) => {
    ele.expanded = false;
    if (ele.childNodes && ele.childNodes.length) {
      recursion(ele.childNodes);
    }
  });
};

watch(
  () => props.treeData,
  (n) => {
    data.value = n;
  },
  { deep: true }
);

onMounted(() => {
  if (typeof props.api !== "string") {
    getTreeData();
  }
});

const emit = defineEmits(["node-click"]);
function handleNodeClick(a, b) {
  emit("node-click", a, b);
}

defineExpose({
  checkKeys,
  checkInfo,
  getTreeData,
  closeTree,
  defaultCheckedKeys,
});
</script>

<style lang="scss" scoped>
.el-icon-user {
  margin-right: 5px;
}

.el-tree {
  min-height: 400px;
}
</style>
<style>
.el-message-box {
  word-break: break-all;
}
</style>
