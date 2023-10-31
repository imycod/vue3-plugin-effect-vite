<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-02 10:30:55
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-08-02 11:56:57
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite\src\components\fileEditer\Quill.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="toolbar"></div>
    <div id="editor"></div>
</template>

<script setup>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'


import { defineComponent, onMounted, ref, toRefs, h } from 'vue'

onMounted(() => {
    let quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: {},
            table_handler: {}
        },
    });


    // TableHandler module
    let TableHandler = quill.getModule('table_handler');

    // Adding random IDs for clipboard table - is parsing always sequential?
    let table_id = TableHandler.randomId();
    let row_id = TableHandler.randomId();
    quill.clipboard.addMatcher('TABLE', function (node, delta) {
        console.log(node)
        table_id = TableHandler.randomId();
        return delta;
    });
    quill.clipboard.addMatcher('TR', function (node, delta) {
        console.log(node)
        row_id = TableHandler.randomId();
        return delta;
    });
    quill.clipboard.addMatcher('TD', function (node, delta) {
        console.log(node)
        let cell_id = TableHandler.randomId();
        return delta.compose(new Delta().retain(delta.length(), { td: table_id + '|' + row_id + '|' + cell_id }));
    });

    let delta = {
        "ops": [
            { "insert": "tables:\n" },
            { "insert": "000" }, { "insert": "\n", "attributes": { "td": "t0|r0|c0|background:yellow" } },
            { "insert": "000 twice" }, { "insert": "\n", "attributes": { "td": "t0|r0|c0" } },

            { "insert": "100" }, { "insert": "\n", "attributes": { "td": "t1|r0|c0" } },
            { "insert": "110" }, { "insert": "\n", "attributes": { "td": "t1|r1|c0" } },
            { "insert": "111" }, { "insert": "\n", "attributes": { "td": "t1|r1|c1" } },
            { "insert": "111" }, { "insert": "\n", "attributes": { "td": "t1|r1|c1" } },
        ]
    }

    quill.setContents(delta);

})


</script>  
