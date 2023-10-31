<template>
    <div>
        <button @click="del">删除</button>
        <button @click="add">添加</button>
    </div>
</template>

<script lang="jsx" setup>
    import showMsg from '@/utils/showMsg.jsx'
    import CustomDialog from "./custom-dialog/custom-dialog.vue"
    import useCommandComponent from "@/hooks/useCommandComponents"
    const myDialog = useCommandComponent(CustomDialog);

    function del() {
        showMsg('确定删除吗？', (close) => {
            console.log('删除成功')

            close()
        })
    }

    function add() {
        myDialog({
            title: '父组件弹窗111',
            options: [
                {
                    prop: 'name',
                    label: '姓名',
                    type: 'input'
                }
            ],
            // visible: true,
            // eventCustom: {
            //     'onClose': () => {

            //     },
            //     'onConfirm': () => {
            //         alert(333)
            //         myDialog.close()
            //     }
            // }
            // onClose:()=>{
            //     alert(111)
            // },
            onSubmit: () => {
                alert(333)
            },
            // onCancel: () => myDialog.close(),
        })
    }
</script>