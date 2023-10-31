import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref, Ref, nextTick, getCurrentInstance } from 'vue';
import { getTreeData } from '/@/api/businesses/configManage/menu/index';

import {
    fetchList,
    addOrEdit,
    getDetail,
    demoDelete,
} from "/@/api/businesses/configManage/case/index";
import request from "/@/utils/request";
import { useUserInfo } from '/@/stores/userInfo';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default class CaseMainTenance {

    tree: Ref<any> = ref(null)
    rules: null | undefined

    constructor() {
        this._initState()
    }
    async _initState() {
        this._initRules()
    }

    _initRules() {
        this.rules = {
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

    scriptDialog() {
        const scripFormRef = ref()
        const scrip = reactive({
            visible: false,
            submitLoading: false,
            form: {},
        })

        // 脚本设置关闭弹窗
        const handleClose = () => {
            scrip.visible = false;
            if (scripFormRef.value) {
                scripFormRef.value.resetFields();
            }
        };
        // 脚本设置保存
        const handleSave = async () => {
            if (!scripFormRef.value) return;
            const { getDataList } = this.crudTable()
            await scripFormRef.value.validate((valid, fields) => {
                if (valid) {
                    scrip.submitLoading = true;
                    addOrEdit(scrip.form, 'post')
                        .then((res) => {
                            handleClose();
                            scrip.submitLoading = false;
                            getDataList();
                            ElMessage.success(res.msg);
                        })
                        .catch(() => {
                            scrip.submitLoading = false;
                        });
                }
            });
        };

        return {
            scripFormRef,
            scrip,

            handleClose,
            handleSave,
        }
    }

    // 销毁
    destroyed() {
        const { editorRef } = this.dialog()
        const editor = editorRef.value;
        if (editor === null) return;
        editor.destroy();
    }


    dialog() {
        const editorRef = ref()
        const ruleFormRef = ref()
        const subclassification = ref() // 当前选中的树节点
        const mode = 'default'
        const dialog = reactive({
            visible: false,
            isView: false,
            title: '新增',
            submitLoading: false,
            locale: zhCn,
            form: {
                operationManual: null,
                scheme: null,
                demoVideo: null,
                subclassification: null,
                display: 1,
                systemIntroduction: '',
                systemDetails: null,
            }
        })

        const disabledDate = (time: any) => {
            return time.getTime() > Date.now();
        };


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
                    // server: proxy.baseUrl + '/demonstration/sys-file/upload',
                    // timeout: 5 * 1000, // 5s
                    // // fieldName: 'custom-fileName',
                    // metaWithUrl: false, // join params to url
                    // headers: { Authorization: 'Bearer ' + user.access_token, userType: '2' },
                    // maxFileSize: 10 * 1024 * 1024, // 10M
                    // base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
                    // withCredentials: true,
                    // 自定义上传

                    async customUpload(file: File, insertFn: InsertFnType) {
                        let formData = new FormData();
                        formData.append('file', file);
                        const { proxy } = getCurrentInstance() as any;
                        const stores = useUserInfo()
                        const { access_token } = storeToRefs(stores);
                        request({
                            url: `/demonstration/sys-file/upload`,
                            headers: { Authorization: 'Bearer ' + access_token, userType: '2' },
                            method: 'post',
                            data: formData,
                        }).then((res: any) => {
                            if (res.data.code === 0) {
                                // 上传成功
                                const url = `${proxy.baseUrl}${res.data.data.url}`;
                                const alt = `${res.data.data.originalFileName}`;
                                insertFn(url, alt, url);
                            } else {
                                ElMessage.error(res.data.msg || '上传失败');
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


        const addOrEditSave = async () => {
            if (!ruleFormRef.value) return;
            await ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    let obj = {
                        demoVideo:
                            dialog.form.demoVideo && dialog.form.demoVideo.length > 0 ? JSON.stringify(dialog.form.demoVideo) : '',
                        operationManual:
                            dialog.form.operationManual && dialog.form.operationManual.length > 0
                                ? JSON.stringify(dialog.form.operationManual)
                                : '',
                        scheme: dialog.form.scheme && dialog.form.scheme.length > 0 ? JSON.stringify(dialog.form.scheme) : '',
                    };
                    dialog.form.subclassification = subclassification;
                    const { getDataList } = this.crudTable()
                    addOrEdit({ ...dialog.form, ...obj }, 'post')
                        .then((res) => {
                            addOrEditClose();
                            dialog.submitLoading = false;
                            getDataList();
                            ElMessage.success(res.data.msg);
                        })
                        .catch(() => {
                            dialog.submitLoading = false;
                        });
                }
            });
        };

        const addOrEditClose = () => {
            dialog.visible = false;
            dialog.form = {
                operationManual: null,
                scheme: null,
                demoVideo: null,
                subclassification: null,
                display: 1,
                systemIntroduction: '',
                systemDetails: null,
            };
            subclassification.value = '';
            if (ruleFormRef.value) {
                ruleFormRef.value.resetFields();
            }
        };

        // 选中树结构时
        const selectIfication = (val: any) => {
            subclassification.value = val.resourcesName;
        };

        const handleCreated = (editor: any) => {
            editorRef.value = editor; // 记录 editor 实例，重要！
            // nextTick(() => {
            //     const editor = editorRef.value;
            //     const toolbar = DomEditor.getToolbar(editor);
            // });
        };

        return {
            dialog,
            editorRef,
            ruleFormRef,
            subclassification,
            editorConfig,
            toolbarConfig,
            mode,
            disabledDate,
            addOrEditSave,
            selectIfication,
            handleCreated,
        }
    }

    crudTable() {
        const table = reactive({
            queryForm: {},
            pageList: fetchList,
        })

        // 表格标签
        function displayTag({ display }) {
            return display === 1
                ? { text: "显示", type: "success" }
                : { text: "隐藏", type: "error" };
        }

        // 清空搜索条件
        const queryRef = ref();
        const { getDataList, currentChangeHandle, sizeChangeHandle } = useTable(table)
        const resetQuery = () => {
            queryRef.value.resetFields();
            getDataList();
        };

        function handleRefreshChange() {
            getDataList();
        }

        // 删除
        async function handleDel(id: any) {
            ElMessageBox.confirm('是否确认删除该系统案例', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                await demoDelete(id);
                getDataList();
                ElMessage.success('删除成功');
            });
        };

        // 查看详情
        const handleview = async (id: any) => {
            const { dialog, editorRef } = this.dialog()
            dialog.visible = true;
            dialog.isView = true;
            dialog.title = '详情';
            nextTick(() => {
                editorRef.value.disable();
            });
            const res = await getDetail(id);
            dialog.form = { ...res.data.data };
            dialog.form.operationManual = dialog.form.operationManual ? JSON.parse(dialog.form.operationManual) : null;
            dialog.form.scheme = dialog.form.scheme ? JSON.parse(dialog.form.scheme) : null;
            dialog.form.demoVideo = dialog.form.demoVideo ? JSON.parse(dialog.form.demoVideo) : null;
        };


        const handleAdd = async (type: any, id: any) => {
            const { dialog, editorRef, subclassification } = reactive(this.dialog())
            console.log(dialog);
            dialog.visible = true;
            dialog.isView = false;
            if (type === 'add') {
                dialog.title = '新增';
            } else {
                dialog.title = '编辑';
                const res = await getDetail(id);
                console.log('res.data.data', res.data.data);
                dialog.form = { ...res.data.data };
                console.log('dialog.form', dialog.form);
                dialog.form.operationManual = dialog.form.operationManual ? JSON.parse(dialog.form.operationManual) : null;
                dialog.form.scheme = dialog.form.scheme ? JSON.parse(dialog.form.scheme) : null;
                dialog.form.demoVideo = dialog.form.demoVideo ? JSON.parse(dialog.form.demoVideo) : null;
                subclassification.value = dialog.form.subclassification;
                dialog.form.systemDetails = dialog.form.systemDetails.replaceAll(
                    'http://gok-business-gateway.prod.goktech.cn',
                    '/gok',
                );
            }
            // nextTick(() => {
            //     editorRef.value.enable();
            // });
        };

        // 脚本服务设置
        const handleSet = (row: any) => {
            console.log(row);
            
            const { scrip } = this.scriptDialog()
            console.log(scrip);
            scrip.visible = true;
            scrip.form = { ...row };
        };

        // 上架下架
        const handleDisplay = (row: any) => {
            ElMessageBox.confirm('是否确认修改该系统案例状态', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                const form = { ...row };
                form.display === 1 ? (form.display = 0) : (form.display = 1);
                const res = await addOrEdit(form, 'post');
                if (res.data.code === 0) {
                    ElMessage.success('修改成功');
                    getDataList();
                } else {
                    ElMessage.error(res.data.msg || '修改失败');
                }
            });
        };
        return {
            table,
            queryRef,
            displayTag,

            getDataList,
            currentChangeHandle,
            sizeChangeHandle,

            resetQuery,
            handleDel,
            handleview,
            handleAdd,
            handleSet,
            handleDisplay,
            handleRefreshChange,
        }
    }
}