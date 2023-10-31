
import { reactive, ref } from "Vue"

export function useHeader() {
    const header = reactive({

    })
    function query() {

    }
    function reset() {

    }
    return {
        query,
        reset,
        header,
    }
}
export function useTab() {
    const tab = reactive({
        activeName: 0
    })

    return {
        tab,
    }
}
export function useTable() {
    const table = reactive({
        list: [],
        columns: [],
        page: {

        },
        loading: false
    })

    return {
        table,
    }
}

