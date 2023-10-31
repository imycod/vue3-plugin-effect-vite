<script lang="jsx" setup>
import { createApp, defineComponent, h, onMounted } from "vue"

const Heading = {
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    setup(props, { slots }) {
        return () => (
            <div>{h('h' + props.level, {}, slots.default())}</div>
        )
    }
}

const props = defineProps({
    render: {
        type: Function,
        default: () => { }
    },
})
const IconComp = {
    setup() {
        return () => (
            props.render()
        )
    }
}
onMounted(() => {
    const iconDom = document.getElementById('icon')
    const app= createApp(IconComp)
    app.mount(iconDom)
})
</script>

<template>
    <div>
        head-search
        <div id="icon"></div>
        <Heading :level="2">222</Heading>
    </div>
</template>

<style scoped>
#icon {
    color: red;
}
</style>