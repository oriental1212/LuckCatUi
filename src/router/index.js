import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    // 用户界面布局router
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
    // 管理界面布局router
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
            },
            {
                path: "/background/photo-classify",
                name: "photo-classify",
                component: () => import("@/views/console/photo/photo-classify.vue"),
                meta: {
                    title: "图片分类",
                }
            },
            {
                path: "/background/photo-view",
                name: "photo-view",
                component: () => import("@/views/console/photo/photo-view.vue"),
                meta: {
                    title: "我的图库",
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
