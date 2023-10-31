<script lang="jsx">
import { defineComponent, createApp, onMounted } from 'vue';
import { styled } from "@styils/vue"

const DivModal = styled('div', {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '999',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

const MessageBox = defineComponent({
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    setup($props, context) {
        const {  $emit } = context

        return () => (
            <DivModal>
                <DivBox>
                    <DivText>{$props.msg}</DivText>
                    <DivButton click="{$emit('onClick')}">关闭</DivButton>
                </DivBox>
            </DivModal>
        )
    }
})

export default function showMsg(text, callback) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp(MessageBox, {
        msg: text,
        onClick() {
            callback & callback(() => {
                app.unmount(div)
                document.body.removeChild(div)
            })
        }
    })
    app.mount(div)
}
</script>
