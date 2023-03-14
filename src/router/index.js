import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: 'overview',
        component: () => import('@/components/layout/OverView.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/components/view/home.vue'),
                meta: {
                    title: '主页'
                }
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出路由
export default router