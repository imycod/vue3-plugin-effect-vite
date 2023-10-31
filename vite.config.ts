import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from '@vant/auto-import-resolver';

const postcsspresetenv = require("postcss-preset-env")
const postcsspxtorem = require("postcss-pxtorem")
const postcsstoviewport = require('postcss-px-to-viewport')
const postcssmediaquerygenerator = require('./src/plugins/postcss-media-query-generator.js')

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir);
};
const alias = {
  '@': pathResolve('./src/'),
  '/@': pathResolve('./src/'),
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      VueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'], // 自动导入的依赖库数组
				dts: './auto-imports.d.ts', // 自动导入类型定义文件路径
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [VantResolver(), ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: alias,
    },
    css: {
      postcss: {
        plugins: [
          postcssmediaquerygenerator({
            // exclude: [/^((?!\/src\/views\/h5\/).)*$/, /node_modules/],
          }),
          postcsstoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["!font*", "!line-height", "!letter-spacing", '*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ig-', 'el-', 'van-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/^((?!\/src\/views\/h5\/).)*$/, /node_modules/],
            landscape: false // 是否处理横屏情况
          }),
          postcsstoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 1440, // UI设计稿的宽度
            viewportHeight: 960, // 视窗的高度，对应我们设计稿的高度，可以不配置
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ig-', 'el-', 'van-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/^((?!\/src\/views\/bigScreen\/).)*$/, /node_modules/],
            landscape: false // 是否处理横屏情况
          }),
          // postcsspxtorem({  // 设计稿 / 100
          //   rootValue({ file }) {
          //     return file.indexOf('vant') !== -1 ? 37.5 : 75;
          //   },
          //   unitPrecision: 5,
          //   propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
          //   selectorBlackList: ['ig-', 'el-', 'van-'],
          //   replace: true,
          //   mediaQuery: false,
          //   minPixelValue: 0,
          //   // exclude: /node_modules/i,
          //   exclude(file) {
          //     // 排除node_modules目录
          //     if (file.indexOf('node_modules') !== -1) {
          //       return true;
          //     }
          //     // 包含包含'h5'的文件
          //     if (file.indexOf('h5') !== -1) {
          //       return false;
          //     }
          //     // 其他情况返回true
          //     return true;
          //   },
          // }),
          postcsspresetenv({
            "browsers": [
              "> 0.2% and not dead"
              // 'last 2 version',
              // '> 1%',
            ],
            features: {
              'nesting-rules': {
                noIsPseudoSelector: false,
              },
            },
          }),
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/index.scss";`,
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_PROXY_COMPANY]: {
          target: env.vITE_PROXY_COMPANY_BASE_URL,
          ws: true, // 是否启用 WebSocket
          changeOrigin: true, // 是否修改请求头中的 Origin 字段
          rewrite: (path) => path.replace(env.VITE_PROXY_COMPANY, '')
        },
        '/mockapi': {
          // target: 'https://jsonplaceholder.typicode.com',
          target: 'https://6537c864a543859d1bb0d3b5.mockapi.io',
          ws: true, // 是否启用 WebSocket
          changeOrigin: true, // 是否修改请求头中的 Origin 字段
          rewrite: (path) => path.replace(/^\/mockapi/, '')
        },
        '/mock': {
					target: ' http://localhost:7300/mock/653f49b549f9bc5bd4f7fd79', // 目标服务器地址
					ws: true, // 是否启用 WebSocket
					changeOrigin: true, // 是否修改请求头中的 Origin 字段
					rewrite: (path) => path.replace(/^\/mock/, ''),
				},
      }
    }
  }

})
