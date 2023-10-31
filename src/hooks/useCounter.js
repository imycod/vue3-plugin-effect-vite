import {isRef,ref} from "vue"
export default function useCounter(count) {
    const _count = ref(count)
    if (!isRef(count)) {
        count= _count
    }
    function setCount(str){
        if (str.includes('-')) {
            const num = Number(str.split('')[1]) 
            count.value -= num
        }
        if (str.includes('+')) {
            const num = Number(str.split('')[1])
            count.value += num
        }
    }
    return [count,setCount]
}