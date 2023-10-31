<template>
  <div class="ignore-apply-job-container apply-job-container">
    <div class="hello-container">
      <span class="hello">HI，你好哇~ </span>
      <span class="remark">有幸遇见，国科期待你的加入~</span>
    </div>
    <div class="h5-login-container">
      <div class="login-parent-container">
        <div class="icon-group icon-tap">
          <img src="@/assets/apply-job/tap.png" alt="" />
        </div>
        <div class="icon-group icon-eye">
          <img src="@/assets/apply-job/eye.png" alt="" />
        </div>
        <div class="parent-container">
          <div class="form-container">
            <el-form ref="formRef" :model="data.form" :rules="rules">
              <el-form-item label="" prop="username">
                <el-input placeholder="姓名" v-model="data.form.username" />
              </el-form-item>
              <el-form-item class="phone" label="" prop="phone">
                <el-input placeholder="手机号" v-model="data.form.phone" />
              </el-form-item>
              <el-form-item>
                <el-button class="nextstep" @click="nextstep">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="remark">
            <span>
              请输入简历上的姓名和手机号进行应聘登记 国科承诺登记信息仅用于招聘
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const formRef = ref();
const data = reactive({
  form: {},
  submitLoading: false,
});

async function nextstep() {
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      data.submitLoading = true;
    }
  });
}
</script>

<style lang="scss" scoped>
.bd {
  border: 1px solid black;
}
.hello-container {
  display: none;
}
// 手机设备
@media only screen and (max-width: 767px) {
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
      width: 375px;
      height: 493.5px;

      .login-parent-container {
        position: relative;
        bottom: 0px;
        height: calc(493.5px + 106.89px);

        .parent-container {
          position: absolute;
          left: 0;
          right: 0;
          height: 493.5px;
          z-index: 3;
          background: #ffffff;
          border-radius: 10px 10px 0px 0px;
          .form-container {
            margin-top: 78px;
            padding-left: 39px;
            padding-right: 34px;

            :deep(.el-form-item) {
              width: 100%;
            }

            :deep(.el-input__wrapper) {
              background-color: #f4f5f5;
              border-radius: 3px;
            }

            :deep(.el-input__wrapper) {
              height: 40px;
              font-size: 12px;
            }
            .phone :deep(.el-input__wrapper) {
              margin-top: 15px;
            }
            :deep(.el-form-item__error) {
              font-size: 12px;
            }

            .nextstep {
              width: 100%;
              // width: 300px;
              font-size: 16px;
              font-family: PingFang SC-Semibold, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              height: 50px;
              background: #333333;
              margin-top: 35.5px;
              border-radius: 50px;
            }
          }
          .remark {
            position: absolute;
            padding-left: 71px;
            padding-right: 64px;
            bottom: 35px;
            text-align: center;
            span {
              font-size: 10px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #a1a5ab;
            }
          }
        }

        .icon-group {
          position: absolute;
          z-index: 2;
        }

        .icon-tap {
          width: 57.79px;
          height: 97.02px;
          top: -65px;
          left: 19px;
          z-index: 4;

          img {
            width: 100%;
          }
        }

        .icon-eye {
          // child
          top: -85px;
          right: 21.5px;
          width: 92.5px;
          height: 106.89px;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}

// 平板设备及以上 全用固定像素
@media only screen and (min-width: 768px) {
  /* 在这里编写应用于平板设备及以上的样式 */
  .ignore-apply-job-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #fbfdff 0%, #dcebff 100%);
    position: relative;

    .h5-login-container {
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translateX(-50%);
      width: 750px;
      height: 500px;

      .login-parent-container {
        position: relative;
        bottom: 0px;
        height: calc(493.5px + 106.89px);
        .icon-group {
          position: absolute;
          z-index: 2;
        }

        .icon-tap {
          width: 115px;
          height: 194px;
          top: -130px;
          left: 38px;
          z-index: 4;

          img {
            width: 100%;
          }
        }

        .icon-eye {
          top: -160px;
          right: 51px;
          width: 185px;
          height: 213px;

          img {
            width: 100%;
          }
        }

        .parent-container {
          position: absolute;
          left: 0;
          right: 0;
          z-index: 3;
          height: 100%;
          background: #ffffff;
          border-radius: 20px 20px 0px 0px;
          .form-container {
            padding-top: 10%;
            padding-left: 78px;
            padding-right: 68px;

            :deep(.el-form-item) {
              width: 604px !important;
            }

            :deep(.el-input__wrapper) {
              background-color: #f4f5f5;
              border-radius: 6px 6px 6px 6px;
            }

            .nextstep {
              width: 100%;
              font-size: 16px;
              font-family: PingFang SC-Semibold, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              height: 50px;
              background: #333333;
              border-radius: 50px;
            }
          }
          .remark {
            position: absolute;
            width: 100%;
            bottom: 200px;
            text-align: center;
            span {
              font-size: 10px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #a1a5ab;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 992px) {
  .ignore-apply-job-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .hello-container {
      display: block;
      // width: 600px;
      .hello {
        font-size: 28px;
        display: block;
        margin-bottom: 10px;
        background-image: linear-gradient(180deg, #b6b1f8 0%, #0f76ff 100%);
        border-radius: 0px 0px 0px 0px;
        font-weight: 800;
        -webkit-background-clip: text;
        color: transparent;
      }
      .remark {
        width: 189px;
        height: 64px;
        font-size: 18px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 500;
        line-height: 29px;
      }
    }
    // position: relative;
    .h5-login-container {
      position: initial !important;
      // top: 50% !important;
      // transform: translate(-20%, -50%) !important;
      transform: translateX(0%) !important;
      height: 320px !important;
      width: 500px;
      .login-parent-container {
        position: initial !important;
        height: 100% !important;
        width: 100%;
        .parent-container {
          border-radius: 20px !important;
          height: 100% !important;
          .form-container {
            :deep(.el-form-item) {
              width: 100% !important;
            }
          }

          .remark {
            position: initial !important;
            margin-top: 40px;
          }
        }
      }
    }
  }
}
</style>
