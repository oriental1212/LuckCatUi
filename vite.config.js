import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslint({
            include: ["src/**/*.{vue,js}"],
        }),
    ],
    server: {
        host: "127.0.0.1", //ip地址
        port: 1216, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
