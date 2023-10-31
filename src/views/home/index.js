import {
    reactive,
    ref,
    onMounted,
    nextTick,
    onBeforeUnmount,
    shallowRef,
    toRefs,
    getCurrentInstance,
} from "vue";

// import {
//     fetchList,
//     addOrEdit,
//     getDetail,
//     demoDelete,
// } from "/@/apis/businesses/configManage/case/index";
import { getTableList, putTableList, postTableList, deleteTableList } from "/@/apis/home.js"
import { ElMessageBox } from "element-plus"
import useTable from "/@/hooks/useTable";
import request from "/@/utils/request";
// import { useUserInfo } from "/@/stores/userInfo";
// import zhCn from 'element-plus/lib/locale/lang/zh-cn';

// const { proxy } = getCurrentInstance();
// const stores = useUserInfo();
// const { access_token } = storeToRefs(stores);

let tableInstance = null
class CrudTable {

    constructor() {
        tableInstance = this
        this.scriptDialog = new ScriptDialog()
        this.queryRef = ref()
        this.state = reactive({
            queryForm: {},
            columns: [
                {
                    label: "id",
                    prop: "id",
                },
                {
                    label: "用户id",
                    prop: "userId",
                },
                {
                    label: "名称",
                    prop: "title",
                },
                {
                    label: "内容",
                    prop: "body",
                },
                {
                    label: '操作',
                    type: 'slot',
                    prop: 'action'
                }
            ],
            dataList: [],
            pageList: getTableList,
        })

        const { getDataList, currentChangeHandle, sizeChangeHandle } = useTable(this.state, {
            pageList: {
                dataKey: null
            }
        })

        // 将方法绑定到类的实例上
        this.getDataList = getDataList
        this.currentChangeHandle = currentChangeHandle
        this.sizeChangeHandle = sizeChangeHandle
    }

    static createTagWithDisplay({ display }) {
        return display === 1
            ? { text: "显示", type: "success" }
            : { text: "隐藏", type: "error" };
    }

    query = () => {
        this.getDataList();
    }

    reset = (refresh = false) => {
        this.queryRef.value.resetFields();
        this.getDataList(refresh);
    }

    add = () => {
        this.scriptDialog.state.title = '添加';
        this.scriptDialog.state.isView = false
        this.scriptDialog.reset()
        this.scriptDialog.open()
    }

    view = async (row) => {
        this.scriptDialog.title = '详情';
        this.scriptDialog.state.isView = true;
        this.scriptDialog.state.visible = true;
        this.scriptDialog.open(row)
    }

    edit = async (row) => {
        this.scriptDialog.state.title = '编辑';
        this.scriptDialog.state.isView = false;
        this.scriptDialog.open(row)
    }

    del = (id) => {
        ElMessageBox.confirm('是否确认删除该系统案例', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(async () => {
            await deleteTableList(id);
            this.getDataList();
            ElMessage.success('删除成功');
        });
    }

    updown = (row) => {
        ElMessageBox.confirm('是否确认修改该系统案例状态', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(async () => {
            const form = { ...row };
            form.display === 1 ? (form.display = 0) : (form.display = 1);
            const res = await addOrEdit(form, 'post');
            if (res.code === 0) {
                ElMessage.success('修改成功');
            } else {
                ElMessage.error(res.msg || '修改失败');
            }
        });
    }
}


class ScriptDialog {
    constructor() {
        this.scripFormRef = ref();
        this.state = reactive({
            visible: false,
            isView: false,
            submitLoading: false,
            form: {
                userId: '',
                body: '',
                title: ""
            },
        })
    }
    reset = () => {
        this.state.form = {}
    }

    open = (item = {}) => {
        this.state.visible = true
        this.state.form = {
            ...item
        }
    }

    submit = async () => {
        if (!this.scripFormRef.value) return;
        await this.scripFormRef.value.validate((valid, fields) => {
            if (valid) {
                this.state.submitLoading = true;
                let ApiFn = this.state.title == '添加' ? postTableList : putTableList;
                ApiFn(this.state.form)
                    .then((res) => {
                        this.state.submitLoading = false;
                        tableInstance.getDataList()
                        this.close();
                        ElMessage.success(res.msg);
                    })
                    .catch(() => {
                        this.state.submitLoading = false;
                    });
            }
        });
    }

    close = () => {
        if (this.scripFormRef.value) {
            this.scripFormRef.value.resetFields();
        }
        this.state.visible = false
    }
}

function createRules() {
    return {
        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        body: [{ required: true, message: "请输入body", trigger: "blur" }],
        title: [{ required: true, message: "请输入title", trigger: "blur" }],
    }
}

export {
    CrudTable,
    ScriptDialog,
    createRules,
}

