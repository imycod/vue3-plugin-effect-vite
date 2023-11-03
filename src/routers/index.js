/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-10-23 23:32:50
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-11-03 07:47:42
 * @FilePath: \react-all-in-oned:\studio\vue-project\vue3-plugin-effect-vite\src\routers\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router';

const staticRoutes = [
    {
        path: '/home',
        name: 'staticRoutes.home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            isAuth: false,
        },
    },
    {
        path: '/h5',
        name: 'staticRoutes.h5',
        component: () => import('@/views/h5/demo.vue'),
        meta: {
            isAuth: false,
        },
    },
    {
        path: '/bigScreen',
        name: 'staticRoutes.bigScreen',
        component: () => import('@/views/bigScreen/index.vue'),
        meta: {
            isAuth: false,
        },
    },
    {
        path: '/data-screen',
        name: 'staticRoutes.dataScreen',
        component: () => import('@/views/data-screen/index.vue'),
        meta: {
            isAuth: false,
        },
    },
    {
        path: '/command',
        name: 'staticRoutes.command',
        component: () => import('@/views/command/index.vue'),
        meta: {
            isAuth: false,
        },
    },
    {
        path: '/composable/manage-job',
        name: 'staticRoutes.composable',
        component: () => import('@/views/composable/manage-job/manage-post.vue'),
        meta: {
            isAuth: false,
        },
    }
]

const baseRoutes = [
    {
        path: '/',
        redirect: '/home',
        name: 'staticRoutes.home',
        children: [
            ...staticRoutes,
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: [...baseRoutes],
});

export default function setupRouter(app) {
    app.use(router)
}