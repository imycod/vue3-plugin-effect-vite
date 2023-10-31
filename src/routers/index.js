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