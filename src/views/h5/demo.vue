<template>
    <span class="font">测试</span>
    <div class="demo-container ig-demo-container">
        <span class="font">测试</span>
    </div>
    <input class="test-input" type="text" placeholder="测试">

    <!-- <div class="h5-demo-container">
        <div class="layout ig-layout">
            <span class="font">111</span>
        </div>
    </div> -->
</template>

<style lang="scss" scoped>
// .h5-demo-container {
//     .layout {
//         width: 350px;
//         height: 200px;
//         background-color: red;

//         .font {
//             font-size: 18px;
//         }
//     }

//     .ig-layout {
//         @include transformMedia('pad') {
//             width: 350px;
//             height: 200px;
//             background-color: red;

//             .font {
//                 font-size: 18px;
//             }
//         }
//     }
// }


// input::placeholder {
//     color: red;
// }

// .font {
//     font-size: 30px;
// }

@mixin common-demo-style {
    width: 750px;
    height: 200px;
    margin: 0 auto;
    /* transform: rotate(45deg); */
    background-color: red;
}

// @media only screen and (max-width:1023px) {
.ig-demo-container,
.demo-container {
    @include common-demo-style;

    &::-webkit-scrollbar {
        display: none;
    }

    &::-webkit-scrollbar {
        width: 5px;
        height: 8px;
        background-color: #aaa;
    }

    &::-webkit-scrollbar-thumb {
        background: #000;
    }
}

// }

// @media only screen and (min-width:1024px) {
//     .ig-demo-container {
//         @include common-demo-style;

//         .font {
//             font-size: 30px;
//         }

//     }
// }
</style>

<script lang="ts" setup>
import 'amfe-flexible/index.js' 
</script>