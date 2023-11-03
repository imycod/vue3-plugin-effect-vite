/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-16 14:27:23
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-16 14:33:51
 * @FilePath: \talent-platform-portal\src\hooks\useDraw.ts
 * @Description: 大屏适配方案：根据设计稿尺寸，计算缩放比例，保持比例缩放
 */
import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
// * 默认缩放值
const scale = {
    width: '1',
    height: '1',
};

const useDraw = (baseWidth = 1440, baseHeight = 960) => {
    // * 设计稿尺寸（px）
    // const baseWidth = 1920;
    // const baseHeight = 1080;

    // * 需保持的比例（默认1.77778）
    const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
    const drawTiming: Ref<NodeJS.Timeout | null> = ref(null);

    onMounted(() => {
        calcRate();
        window.addEventListener('resize', resize);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', resize);
    });
    function calcRate() {
        const appRef = document.getElementById('appRef');
        if (!appRef) return;
        // 当前宽高比
        const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5));
        if (appRef) {
            if (currentRate > baseProportion) {
                // 表示更宽
                scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5);
                scale.height = (window.innerHeight / baseHeight).toFixed(5);
                appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
            } else {
                // 表示更高
                scale.height = (window.innerWidth / baseProportion / baseHeight).toFixed(5);
                scale.width = (window.innerWidth / baseWidth).toFixed(5);
                appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
            }
        }
    }

    const resize = () => {
        drawTiming.value && clearTimeout(drawTiming.value);
        drawTiming.value = setTimeout(() => {
            calcRate();
        }, 200);
    };
};

export default useDraw;
