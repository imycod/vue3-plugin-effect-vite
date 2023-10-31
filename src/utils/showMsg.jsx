
/**
 * 高内聚，低耦合
 */
// import MessageBox from "../components/MessageBox/MessageBox.vue"
import { createApp } from "vue"
import { styled } from "@styils/vue"
// 高内聚-打开弹层只用一个文件没必要分散到2个文件
const DivModal = styled('div', {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '999',
    width: '100%',
    height: '100%',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})
const DivBox = styled('div', {
    width: '400px',
    height: '200px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
})
const DivText = styled('div', {
    fontSize: '20px',
    marginBottom: '20px',
})
const DivButton = styled('button', {
    width: '100px',
    height: '40px',
    backgroundColor: '#409eff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
})
const MessageBox = {
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    render(ctx) {
        const { $props, $emit } = ctx
        return (
            <DivModal>
                <DivBox>
                    <DivText>{$props.msg}</DivText>
                    <DivButton click="{$emit('onClick')}">关闭</DivButton>
                </DivBox>
            </DivModal>
        )
    }
}

function showMsg(msg, clickHandler) {
    const div = document.createElement("div")
    document.body.appendChild(div)
    // 渲染一个MessageBox组件
    const box = createApp(MessageBox, {
        msg,
        onClick() {
            clickHandler & clickHandler(() => {
                box.unmount(div)
                div.remove()
            })
        }
    })
    box.mount(div)
}

export default showMsg