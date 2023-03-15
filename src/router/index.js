import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "overview",
        component: () => import("@/layout/over-view.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: "主页",
                },
            },
        ],
    },
    {
        path: "/background",
        name: "background",
        component: () => import("@/layout/back-ground.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//导出路由
export default router;
