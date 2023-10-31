<script setup>
import { ref, defineProps, computed,toRef } from "vue";
// const num = ref(0);
// import useCounter from "@/hooks/useCounter";
// const [count, setCount] = useCounter(num.value);

const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
});
const counter=ref(props.count.value)
function getDoubleCount(props,key) {
  const _count= props[key]
  return computed(()=>_count * 1);
}
const doubleCount = getDoubleCount(props,'count');
</script>

<template>
{{counter}}
{{doubleCount}}
  <!-- <hr />
  {{ count }}
  <button @click="setCount('-1')">-1</button> -->
</template>

<style scoped></style>
