import { getJobList, getJobTree, deleteJob } from "@/apis/staff"
import { useMessageBox } from "@/hooks/message"

export function useTable() {
    const querySource = [
        {
            prop: 'name',
            type: 'select',
            placeholder: '请选择类别',
            options: []
        },
        {
            prop: 'name',
            type: 'select',
            placeholder: '请选择职务',
            options: []
        },
        {
            prop: 'name',
            type: 'select',
            placeholder: '请选择岗位',
            options: []
        },
    ]
    const state = reactive({
        query: {},
        columns: Object.freeze([
            {
                prop: 'name',
                label: '岗位简称',
            },
            {
                prop: 'fullname',
                label: '岗位全称',
            },
            {
                prop: 'scopePosition',
                label: '所属职务',
            },
            {
                prop: 'scopeType',
                label: '所属类别',
            },
            {
                prop: 'no',
                label: '编号',
            },
            {
                prop: 'action',
                label: '操作',
                type: 'slot',
                width: 250,
                fixed: 'right',
            },
        ]),
        loading: false,
        list: [],
        page: { pageSize: 10, pageNumber: 1, total: 0 },
    })
    // 获取职位管理table
    const getList = async (type = 'search') => {
        if (type == 'reset') {
            state.page.pageNumber = 1
            state.page.pageSize = 10
            state.page.total = 0
        }
        const res = await getJobList({
            ...state.page,
            ...state.query,
        })
        state.list = res.data.records
        state.page.total = Number(res.data.total);
    }


    function addItem() {

    }
    function editItem(row) {

    }
    async function deleteItem(id) {
        await useMessageBox().confirm('确定删除吗？')
        alert(id)
        deleteJob(id)
        getList()
    }
    function viewItem(row) {

    }

    const tableHeight = ref()
    onMounted(() => {
        getList()
        nextTick(() => {
            // state.tableHeight = tableHeight.value?.$el.clientHeight;
        });
    })


    return {
        state,
        querySource,
        getList,
        addItem,
        editItem,
        deleteItem,
        viewItem,
        tableHeight,
    }
}

const modelsOptions = {
    typeOption: [
        {
            prop: 'name',
            label: '类别名称',
            type: 'input',
            labelWidth:'100px',
            rules: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
        }
    ],
    positionOption: [
        {
            prop: 'name',
            label: '职务名称',
            type: 'input',
            labelWidth:'100px',
            rules: [{ required: true, message: '请输入职务名称', trigger: 'blur' }],
        },
        {
            prop: 'type',
            label: '所属类别',
            type: 'select',
            labelWidth:'100px',
            rules: [{ required: true, message: '选择所属类别', trigger: 'change' }],
        }
    ],
    postOption: [
        {
            prop: 'name',
            label: '岗位名称',
            type: 'input',
            labelWidth:'100px',
            rules: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
        },
        {
            prop: 'no',
            label: '岗位编号',
            type: 'input',
            labelWidth:'100px',
        },
        {
            prop: 'ss',
            label: '所属职务',
            type: 'select',
            labelWidth:'100px',
            options: [],
            rules: [{ required: true, message: '请选择所属职务', trigger: 'blur' }],
        },
        {
            label: '岗位职责',
            prop: 'duty',
            labelWidth:'100px',
            type: 'textarea',
        }
    ]
}

export function useDialog() {
    const formRef = ref()

    const dialogType = {
        post: {
            title: '新增岗位',
            options: modelsOptions.postOption,
        },
        position: {
            title: '新增职务',
            options: modelsOptions.positionOption
        },
        type: {
            title: '新增类别',
            options: modelsOptions.typeOption
        },
    }

    const dialog = reactive({
        visible: false,
        isView: false,
        title: '',
        form: {},
        options: []
    })

    function open(type, eventType, data) {
        const dialogObj = dialogType[type]
        dialog.title = dialogObj.title
        dialog.isView = false
        dialog.options = dialogObj.options
        dialog.form = data || {}

        // 岗位信息查看 编辑 新增
        if (type === 'post') {
            if (eventType === 'view') {
                dialog.isView = true
                dialog.options = dialogObj.options.map(item => {
                    return { ...item, disabled: true }
                })
                dialog.title = '岗位详情'
            }
            if (eventType === 'edit') {
                dialog.options = dialogObj.options.map(item => {
                    return { ...item, disabled: false }
                })
                dialog.title = '编辑岗位'
            }
        }

        dialog.visible = true
    }
    function close() {
        formRef.value.reset();
        formRef.value.clearValidate()
        dialog.visible = false
    }
    async function submit() {
        const valid = await formRef.value.getFormValidate()

        if (valid) {
            console.log(dialog.form);
            formRef.value.reset();
            dialog.visible = false
        }
    }
    return {
        dialog,
        dialogType,
        close,
        open,
        submit,
        formRef,
    }
}

export function useLayout() {
    const layoutView = {
        table: defineAsyncComponent(() => import("../manage-post/manage-post-table.vue")),
        view: defineAsyncComponent(() => import("../manage-post/manage-post-view.vue")),
    }
    const layoutModels = reactive({
        label: '',
        slabel: '',
        nodeKey:'',
        form: {},
        formOptions: [],
        tableList: [],
        tableOptions: []
    })
    const modelsMap = {
        '1': {
            label: '类别信息',
            slabel: '下级职务',
            options: modelsOptions.typeOption,
            tableOptions: [
                {
                    prop: 'index',
                    label: '序号',
                },
                {
                    prop: 'name',
                    label: '职务名称',
                },
            ],
        },
        '2': {
            label: '职务信息',
            slabel: '下级岗位',
            options: modelsOptions.positionOption,
            tableOptions: [
                {
                    prop: 'name',
                    label: '岗位简称',
                },
                {
                    prop: 'fullname',
                    label: '岗位全程',
                },
                {
                    prop: 'scopePosition',
                    label: '所属职务',
                },
                {
                    prop: 'type',
                    label: '所属类别',
                },
                {
                    prop: 'no',
                    label: '编号',
                },
            ],
        },
        '3': {
            label: '类别信息111',
            slabel: '',
            options: modelsOptions.postOption,
            tableOptions: [],
        }
    }
    function initLayoutModels(node) {
        // layoutModels modelsMap(level) 这两个对象合并
        const models = modelsMap[node.level]
        layoutModels.label = models.label
        layoutModels.slabel = models.slabel
        layoutModels.formOptions = models.options
        layoutModels.tableOptions = models.tableOptions
        layoutModels.nodeKey = node.id
    }


    const componentName = ref<any>(undefined);
    componentName.value = layoutView.table

    return {
        componentName,
        layoutView,
        layoutModels,
        initLayoutModels,
    }
}

export function useTree() {
    // 或许tree数据
    const treeData = ref([])

    // 获取职位管理tree
    const getTree = async () => {
        const res = await getJobTree()

        setLvtreeData(res.data)

        treeData.value = res.data
    }
    // 视图方法
    function setLvtreeData(data, level = 1) {
        // 数组是3级的，我需要为每一级标识一个级数, 数菜单点击不同的level切换的视图不一样
        data.forEach(item => {
            item.level = level;
            if (item.children && item.children.length > 0) {
                setLvtreeData(item.children, level + 1);
            }
        });
    }

    onMounted(() => {
        getTree()
    })
    return {
        treeData
    }
}

