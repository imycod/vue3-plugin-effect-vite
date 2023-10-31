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

import {
    fetchList,
    addOrEdit,
    getDetail,
    demoDelete,
} from "/@/api/businesses/configManage/case/index";
import { useTable } from "/@/hooks/web/useTable";
import request from "/@/utils/request";
import { useUserInfo } from "/@/stores/userInfo";
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

// const { proxy } = getCurrentInstance();
// const stores = useUserInfo();
// const { access_token } = storeToRefs(stores);

class Dialog {
   
    constructor() {
        this.ruleFormRef = ref()
        this.editorRef = ref()
        this.state = reactive({
            title: '',
            visible: false,
            isView: false,
            subclassification: '',
            locale: zhCn,
            form: {
                operationManual: null,
                scheme: null,
                demoVideo: null,
                subclassification: null,
                display: 1,
                systemIntroduction: "",
                systemDetails: null,
            }
        })
    }

    static createConfig() {
        const editorConfig = {
            MENU_CONF: {
                fontFamily: {
                    fontFamilyList: [
                        // 元素支持两种形式
                        //   1. 字符串；
                        //   2. { name: 'xxx', value: 'xxx' }
                        '黑体',
                        '楷体',
                        '仿宋',
                        '宋体',
                    ],
                },
                uploadImage: {
                    async customUpload(file, insertFn) {
                        let formData = new FormData();
                        formData.append('file', file);
                        const { proxy } = getCurrentInstance();
                        const stores = useUserInfo()
                        const { access_token } = storeToRefs(stores);
                        request({
                            url: `/demonstration/sys-file/upload`,
                            headers: { Authorization: 'Bearer ' + access_token, userType: '2' },
                            method: 'post',
                            data: formData,
                        }).then((res) => {
                            if (res.code === 0) {
                                // 上传成功
                                const url = `${proxy.baseURL}${res.data.url}`;
                                const alt = `${res.data.originalFileName}`;
                                insertFn(url, alt, url);
                            } else {
                                ElMessage.error(res.msg || '上传失败');
                            }
                        });
                    },
                },
            },
        };

        const toolbarConfig = {
            toolbarKeys: [
                'headerSelect',
                'bold',
                'underline',
                'italic',
                'color',
                'bgColor',
                'fontSize',
                'fontFamily',
                'deleteImage',
                'editImage',
                'uploadImage',
                'justifyLeft',
                'justifyRight',
                'justifyCenter',
                'justifyJustify',
                'indent',
                'delIndent',
                'insertLink',
                'undo',
                'redo',
            ],
        };

        return {
            editorConfig,
            toolbarConfig,
        }
    }

    static disabledDate(time) {
        return time.getTime() > Date.now();
    }

    open(form = {}) {
        this.state.visible = true
        this.state.form = form
        this.state.form.operationManual = this.state.form.operationManual ? JSON.parse(this.state.form.operationManual) : null;
        this.state.form.scheme = this.state.form.scheme ? JSON.parse(this.state.form.scheme) : null;
        this.state.form.demoVideo = this.state.form.demoVideo ? JSON.parse(this.state.form.demoVideo) : null;
        this.state.form.systemDetails = this.state.form.systemDetails.replaceAll(
            "http://gok-business-gateway.prod.goktech.cn",
            "/gok"
        );
    }


    reset() {
        this.state.form.operationManual = null
        this.state.form.scheme = null
        this.state.form.demoVideo = null
        this.state.form.subclassification = null
        this.state.form.display = 1
        this.state.form.systemIntroduction = ""
        this.state.form.systemDetails = null
        this.state.subclassification = "";
        if (this.ruleFormRef.value) {
            this.ruleFormRef.value.resetFields();
        }
    }

    close() {
        this.state.visible = false
    }

    async submit() {
        if (!this.ruleFormRef.value) return;
        await this.ruleFormRef.value.validate((valid, fields) => {
            if (valid) {
                let obj = {
                    demoVideo:
                        this.state.form.demoVideo && this.state.form.demoVideo.length > 0 ? JSON.stringify(this.state.form.demoVideo) : '',
                    operationManual:
                        this.state.form.operationManual && this.state.form.operationManual.length > 0
                            ? JSON.stringify(this.state.form.operationManual)
                            : '',
                    scheme: this.state.form.scheme && this.state.form.scheme.length > 0 ? JSON.stringify(this.state.form.scheme) : '',
                };
                this.state.form.subclassification = this.state.subclassification;
                addOrEdit({ ...this.state.form, ...obj }, 'post')
                    .then((res) => {
                        this.close();
                        this.state.submitLoading = false;
                        ElMessage.success(res.msg);
                    })
                    .catch(() => {
                        this.state.submitLoading = false;
                    });
            }
        });
    }

    treeCurrentChange(val) {
        this.state.subclassification = val.resourcesName;
    }

    createEditorRef(editor) {
        this.editorRef = editor
    }
}

class CrudTable {
    constructor() {
        this.dialog = new Dialog()
        this.scriptDialog = new ScriptDialog()
        this.queryRef = ref()
        this.state = reactive({
            queryForm: {},
            pageList: fetchList,
        })

        const { getDataList, currentChangeHandle, sizeChangeHandle } = useTable(this.state)

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

    query(){
        this.getDataList();
    }

    reset(refresh = false) {
        this.queryRef.value.resetFields();
        this.getDataList(refresh);
    }

    add() {
        this.dialog.state.title = '添加';
        this.dialog.reset()
        this.dialog.open()
    }

    async view(id) {
        this.dialog.title = '详情';
        this.dialog.state.isView = true;
        this.dialog.state.visible = true;
        nextTick(() => {
            this.dialog.editorRef.value.disable();
        });
        const res = await getDetail(id);
        const data = res.data
        this.dialog.open(data)
    }

    scriptSet(row) {
        this.scriptDialog.open(row)
    }

    async edit(item) {
        this.dialog.state.title = '编辑';
        const res = await getDetail(id);
        const item = res.data
        this.dialog.open(item)
    }

    del(id) {
        ElMessageBox.confirm('是否确认删除该系统案例', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(async () => {
            await demoDelete(id);
            ElMessage.success('删除成功');
        });
    }

    updown(row) {
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
            submitLoading: false,
            form: {},
        })
    }

    open(item = {}) {
        this.state.form = item;
    }

    async submit() {
        if (!this.scripFormRef.value) return;
        await this.scripFormRef.value.validate((valid, fields) => {
            if (valid) {
                this.state.submitLoading = true;
                addOrEdit(this.state.form, 'post')
                    .then((res) => {
                        this.state.submitLoading = false;
                        this.close();
                        ElMessage.success(res.msg);
                    })
                    .catch(() => {
                        this.state.submitLoading = false;
                    });
            }
        });
    }

    close() {
        if (this.scripFormRef.value) {
            this.scripFormRef.value.resetFields();
        }
        this.state.visible = false
    }
}

function createRules() {
    return {
        clusterName: [{ required: true, message: "请输入集群名称", trigger: "blur" }],
        namespace: [{ required: true, message: "请输入空间名称", trigger: "blur" }],
        serviceList: [{ required: true, message: "请输入服务列表", trigger: "blur" }],
        systemName: [{ required: true, message: "请输入系统名称", trigger: "blur" }],
        subclassificationId: [{ required: true, message: "请选择", trigger: "blur" }],
        industry: [{ required: false, message: "请输入所属行业", trigger: "blur" }],
        updateTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
        cover: [{ required: true, message: "请选择封面图", trigger: "blur" }],
        systemIntroduction: [{ required: true, message: "请输入系统简介", trigger: "blur" }],
        systemDetails: [{ required: true, message: "请输入系统介绍", trigger: "blur" }],
        demoPassword: [
            { required: false, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 20, message: "密码长度最少为6位,最大为20位", trigger: "blur" },
        ],
    }
}

export default {
    CrudTable,
    Dialog,
    ScriptDialog,
    createRules,
}