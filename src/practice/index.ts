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
import { useTable } from "/@/hooks/table";
import request from "/@/utils/request";
import { useUserInfo } from "/@/stores/userInfo";
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { ElMessageBox } from "element-plus"

// const { proxy } = getCurrentInstance();
// const stores = useUserInfo();
// const { access_token } = storeToRefs(stores);

class Table {
    constructor() {

    }

    getDataList() { }
}


export class CrudTable extends Table {
    constructor() {
        super()

        this.mainDialog = reactive(new MainDialog())
        this.scriptDialog = reactive(new ScriptDialog())
        this.queryRef = ref()

        this.state = reactive({
            queryForm: {},
            pageList: fetchList,
        })

        const { getDataList, currentChangeHandle, sizeChangeHandle } = useTable(this.state)
        // 将方法绑定到类的实例上
        Table.prototype.getDataList = getDataList
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

    refresh = (refresh = false) => {
        this.queryRef.value.resetFields();
        this.getDataList(refresh);
    }

    add = () => {
        this.mainDialog.title.value = '添加';
        this.mainDialog.reset()
        this.mainDialog.open()
    }

    view = async (id) => {
        this.mainDialog.title.value = '详情';
        this.mainDialog.isView.value = true;
        this.mainDialog.visible.value = true;
        nextTick(() => {
            this.mainDialog.editorRef.value.disable();
        });
        const res = await getDetail(id);
        const data = res.data
        this.mainDialog.open(data)
    }

    scriptSet = (row) => {
        this.scriptDialog.open(row)
    }


    del = (id) => {
        ElMessageBox.confirm('是否确认删除该系统案例', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(async () => {
            await demoDelete(id);
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

export class MainDialog extends Table {
    constructor() {
        super()

        this.ruleFormRef = ref()
        this.editorRef = ref()

        this.title = ref()
        this.visible = ref(true)
        this.isView = ref(false)
        this.subclassification = ref('')
        this.locale = zhCn
        this.submitLoading = ref(false)
        this.measure= "319px*183px"
        this.elTreeOption = {
            children: "navigationTreeVOList",
            value: "resourcesId",
            label: "resourcesName",
            disabled: "disabled",
        }
        this.form = reactive({
            pcUrl:'',
            cover:'',
            operationManual: null,
            scheme: null,
            demoVideo: null,
            subclassification: null,
            display: 1,
            systemIntroduction: "",
            systemDetails: null,
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

    selectIfication = (val: any) => {
        this.subclassification = val.resourcesName;
    };

    reset = () => {
        this.form = {
            operationManual: null,
            scheme: null,
            demoVideo: null,
            subclassification: null,
            display: 1,
            systemIntroduction: "",
            systemDetails: null,
        }
        if (this.ruleFormRef.value) {
            this.ruleFormRef.value.resetFields();
        }
    }

    open = (form = {}) => {
        this.visible.value = true
        this.form = {
            ...form
        }
        this.form.operationManual = this.form.operationManual ? JSON.parse(this.form.operationManual) : null;
        this.form.scheme = this.form.scheme ? JSON.parse(this.form.scheme) : null;
        this.form.demoVideo = this.form.demoVideo ? JSON.parse(this.form.demoVideo) : null;
        this.form.systemDetails = this.form.systemDetails?.replaceAll(
            "http://gok-business-gateway.prod.goktech.cn",
            "/gok"
        );
    }

    close = () => {
        this.visible = false
    }

    submit = async () => {
        if (!this.ruleFormRef.value) return;
        await this.ruleFormRef.value.validate((valid, fields) => {
            if (valid) {
                let obj = {
                    demoVideo:
                        this.form.demoVideo && this.form.demoVideo.length > 0 ? JSON.stringify(this.form.demoVideo) : '',
                    operationManual:
                        this.form.operationManual && this.form.operationManual.length > 0
                            ? JSON.stringify(this.form.operationManual)
                            : '',
                    scheme: this.form.scheme && this.form.scheme.length > 0 ? JSON.stringify(this.form.scheme) : '',
                };
                this.form.subclassification = this.subclassification;
                addOrEdit({ ...this.form, ...obj }, 'post')
                    .then((res) => {
                        this.close();
                        this.getDataList()
                        this.submitLoading = false;
                        ElMessage.success(res.msg);
                    })
                    .catch(() => {
                        this.submitLoading = false;
                    });
            }
        });
    }

    treeCurrentChange = (val) => {
        this.subclassification = val.resourcesName;
    }

    createEditorRef = (editor) => {
        this.editorRef = editor
    }

}

class ScriptDialog extends Table {
    constructor() {
        super()

        this.scripFormRef = ref(null);

        this.visible = ref(false);
        this.submitLoading = ref(false);
        this.form = reactive({})
    }


    open = (item = {}) => {


        this.form = {
            ...item
        };
        this.visible.value = true

    }

    submit = async () => {
        console.log(this);

        console.log(this.scripFormRef.value);

        if (!this.scripFormRef.value) return;
        await this.scripFormRef.value.validate((valid, fields) => {
            if (valid) {
                this.submitLoading = true;
                addOrEdit(this.form, 'post')
                    .then((res) => {
                        this.submitLoading = false;
                        this.close();
                        this.getDataList()
                        ElMessage.success(res.msg);
                    })
                    .catch(() => {
                        this.submitLoading = false;
                    });
            }
        });
    }

    close = () => {
        console.log(this.scripFormRef);

        if (this.scripFormRef.value) {
            this.scripFormRef.value.resetFields();
        }
        this.visible.value = false
    }
}


export function createRules() {
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