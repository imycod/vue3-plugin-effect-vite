<template>
    <div class="data-box-big">
        <div id="appRef">
            <div class="data-box">
                <div class="data-box-l">
                    <div class="left-top">
                        <div class="bd left-top-card">left-top-card</div>
                    </div>
                    <div class="left-bottom">
                        <div class="bd left-bottom-card">left-top-card</div>
                    </div>
                </div>
                <div class="data-box-c">
                    <div class="bd center">center</div>
                </div>
                <div class="data-box-r">
                    <div class="bd right-top">right-top</div>
                    <div class="bd right-bottom">right-bottom</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .bd {
        border: 1px solid #000;
    }

    .data-box-big {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #052241;
        overflow: hidden;
    }

    #appRef {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: left top;
        /* background: url('@/assets/img/data-screen/main-bg.png') no-repeat; */
        background-size: 100% 100%;
        width: 1440px;
        height: 960px;

        .data-box {
            display: flex;
            justify-content: space-between;

            width: 100%;
            height: 100%;
            padding: 0 20px;
            box-sizing: border-box;



            .left-top {
                position: relative;

                .left-top-card {
                    position: absolute;
                    top: 52px;
                    left: 96px;
                    z-index: 0;
                    /* background: url('@/assets/img/data-screen/pie-base-plate.png') center/cover; */
                    background-size: 100% 100%;

                    width: 253px;
                    height: 138px;
                }

            }

            .left-bottom {
                position: relative;

                .left-bottom-card {
                    /* width: 400px;
                    height: 267px; */
                }
            }

        }
    }
</style>