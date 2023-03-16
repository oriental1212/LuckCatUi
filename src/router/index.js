import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
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
        children: [
            {
                path: "/background/backgroundview",
                name: "backgroundview",
                component: () => import("@/views/console/back-ground-view.vue"),
                meta: {
                    title: "总览",
                }
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/authen/user-login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/authen/user-register.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//导出路由
export default router;
