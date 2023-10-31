<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-09-25 09:41:32
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-27 15:07:48
 * @Description: vw 100 = 750; 1px = 100/750 = 0.1333vw  设root size 0.13333vw，设计稿像素/100; 列如: 某元素750px = 7.5rem
-->
<template>
  <div class="ignore-apply-job-container apply-job-container">
    <div class="h5-login-container">
      <div class="login-parent-container">
        <div class="icon-group icon-tap">
          <img src="@/assets/apply-job/tap.png" alt="" />
        </div>
        <div class="icon-group icon-eye">
          <img src="@/assets/apply-job/eye.png" alt="" />
        </div>
        <div class="parent-container">
          <div class="form-container bd">
            <el-form ref="formItem" :model="user.form" :rules="rules">
              <el-form-item label="" prop="username">
                <el-input placeholder="姓名" v-model="user.form.username" />
              </el-form-item>
              <el-form-item class="phone" label="" prop="phone">
                <el-input placeholder="手机号" v-model="user.form.phone" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  document.documentElement.style.fontSize = "13.33333vw";
});
onBeforeUnmount(() => {
  document.documentElement.style.fontSize = "";
});

const rules = {
  username: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur",
    },
    {
      pattern: /^1[3-9]\d{9}$/, // 匹配中国大陆手机号的正则表达式
      message: "手机号格式不正确",
      trigger: "change",
    },
  ],
};

const user = reactive({
  form: {},
});
</script>

<style lang="scss" scoped>
.bd {
  border: 1px solid black;
}

//平板设备及以上 全用固定像素
// @media (min-width: 768px) {
//   /* 在这里编写应用于平板设备及以上的样式 */
//   .ignore-apply-job-container {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(180deg, #fbfdff 0%, #dcebff 100%);
//     position: relative;

//     .h5-login-container {
//       position: absolute;
//       left: 50%;
//       bottom: 0px;
//       transform: translateX(-50%);
//       width: 750px;
//       height: 500px;
//       background: #ffffff;
//       border-radius: 20px 20px 0px 0px;
//       opacity: 1;

//       .login-parent-container {
//         .icon-group {
//           position: absolute;
//           z-index: 2;
//         }

//         .icon-tap {
//           width: 115px;
//           height: 194px;
//           top: -130px;
//           left: 38px;
//           z-index: 4;

//           img {
//             width: 100%;
//           }
//         }

//         .icon-eye {
//           // child
//           top: -160px;
//           right: 51px;
//           width: 185px;
//           height: 213px;

//           img {
//             width: 100%;
//           }
//         }

//         .parent-container {

//           .form-container {
//             padding-top: 10%;
//             padding-left: 78px;
//             padding-right: 68px;

//             :deep(.el-form-item) {
//               width: 604px !important;
//             }

//             :deep(.el-input__wrapper) {
//               background: #f4f5f5;
//               border-radius: 6px 6px 6px 6px;
//             }

//             .phone :deep(.el-input__wrapper) {
//               margin-top: 30px;
//             }
//           }
//         }
//       }
//     }
//   }
// }

@media (max-width: 768px) {
  .apply-job-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #fbfdff 0%, #dcebff 100%);
    position: relative;

    .h5-login-container {
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      width: 7.5rem;
      height: 9.87rem;

      .login-parent-container {
        position: relative;
        bottom: 0px;
        height: calc(9.87rem + 2.31rem);

        .parent-container {
          position: absolute;
          left: 0;
          right: 0;
          height: 9.87rem;
          z-index: 3;
          background: #ffffff;
          border-radius: .2rem .2rem 0px 0px;
          .form-container {
            margin-top: 1.56rem;
            padding-left: .78rem;
            padding-right: .68rem;

            :deep(.el-form-item) {
              width: 6.04rem !important;
            }

            :deep(.el-input__wrapper) {
              background: #f4f5f5;
              border-radius: .06rem;
            }

            :deep(.el-input__wrapper) {
              height: .8rem;
              font-size: .24rem;
            }
            .phone :deep(.el-input__wrapper) {
              margin-top: .3rem;
            }
            :deep(.el-form-item__error) {
              font-size: .22rem;
              padding-top: .08rem;
            }
          }
        }

        .icon-group {
          position: absolute;
          z-index: 2;
        }

        .icon-tap {
          width: 1.15rem;
          height: 1.94rem;
          top: -1.3rem;
          left: .38rem;
          z-index: 4;

          img {
            width: 100%;
          }
        }

        .icon-eye {
          // child
          top: -1.7rem;
          right: .51rem;
          width: 1.85rem;
          height: 2.13rem;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
