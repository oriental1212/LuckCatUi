import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/user/user-home",
    },
    {
        path: "/user/background",
        redirect: "/background/backgroundview"
    },
    // 用户界面布局router
    {
        path: "/user",
        name: "useroverview",
        component: () => import("@/layout/user-over-view.vue"),
        children: [
            {
                path: "/user/user-home",
                name: "user-home",
                component: () => import("@/views/user-view/user-home.vue"),
                meta: {
                    title: "主页",
                },
            },
            {
                path: "/user/photo-view",
                name: "photo-view",
                component: () => import("@/views/user-view/photo-view.vue"),
                meta: {
                    title: "图库",
                },
            },
        ],
    },
    // 管理界面布局router
    {
        path: "/background",
        name: "adminoverview",
        component: () => import("@/layout/admin-over-view.vue"),
        children: [
            {
                path: "/background/backgroundview",
                name: "background-view",
                component: () => import("@/views/admin-view/back-ground-view.vue"),
                meta: {
                    title: "总览",
                }
            },
            {
                path: "/background/usercontroller",
                name: "user-controller",
                component: () => import("@/views/admin-view/user-controller.vue"),
                meta: {
                    title: "用户管理",
                }
            },
            {
                path: "/background/objectstorage",
                name: "object-storage",
                component: () => import("@/views/admin-view/object-storage.vue"),
                meta: {
                    title: "SSO管理",
                }
            },
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
    {
        path: "/authen",
        name: "authen",
        component: () => import("@/authen/user-authen.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//导出路由
export default router;
