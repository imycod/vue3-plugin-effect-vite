<script lang="jsx">
import { defineComponent, h } from "vue"

const Heading = {
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    setup(props, { slots }) {
        // return () => (
        //     <div>{h('h' + props.level,{},slots.default())}</div>
        // )
        return () => (
            <div>{h('h' + props.level,{},slots.default())}</div>
        )
    }
}

export default defineComponent({
    name: 'HeadSearch',
    components: {
        Heading
    },
    props: {
        render: {
            type: Function,
            default: () => { }
        },
    },
    setup(props, context) {
        return () => (
            <div>
                head-search
                <div id="icon">{props.render()}</div>
                <Heading level={2}>222</Heading>
            </div>
        )
    },
})
</script>

<style scoped>
#icon {
    color: red;
}
</style>