<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边菜单 -->
            <el-aside width="200px">
                <el-menu
                    default-active="2"
                    unique-opened="true"
                    class="el-menu-vertical-demo"
                >
                    <el-menu-item index="1">
                        <el-icon><location /></el-icon>
                        <span>总览</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>个人中心</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon><document /></el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon><setting /></el-icon>
                        <span>个性化</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <el-icon><setting /></el-icon>
                        <span>设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <!-- 头部菜单 -->
                <el-header>
                    
                </el-header>
                <!-- 主内容 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting} from '@element-plus/icons-vue'
</script>

<style>
.common-layout{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.el-container{
    height: 100%;
}
.el-menu-vertical-demo{
    height: 100%;
}
</style>