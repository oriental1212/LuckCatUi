import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

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
                path: "/user/photo-view2",
                name: "photo-view2",
                component: () => import("@/views/user-view/photo-view2.vue"),
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
            {
                path: "/background/systemsetting",
                name: "system-setting",
                component: () => import("@/views/admin-view/system-setting.vue"),
                meta: {
                    title: "图库设置",
                }
            },
        ]
    },
    {
        path: "/authen",
        name: "user-authen",
        component: () => import("@/authen/user-authen.vue"),
    },
    {
        path: "/findpassword",
        name: "user-find-password",
        component: () => import("@/authen/user-find-password.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

let EXPIRESTIME = 604800000
const store = useStore()

router.beforeEach((to, from, next) => {
    if (to.path === "/authen") return next();
    if (to.path === "/findpassword") return next();
    //获取token
    const Lucktoken = localStorage.LuckCat
    if (!Lucktoken){
        return next("/authen")
    }else{
        let date = new Date().getTime();
        if(date - localStorage.startTime > EXPIRESTIME){
            localStorage.removeItem("LuckCat")
            localStorage.removeItem("personInfo")
            store.commit("changeloginflage")
            return next("/authen")
        }else{
            next()
        }
    }
    next()
})

//导出路由
export default router;
