<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边菜单 -->
            <el-aside width="200px">
                <el-menu
                    default-active="background/backgroundview"
                    :unique-opened="true"
                    class="el-menu-vertical-demo"
                    :router="true"
                >
                    <el-menu-item index="background/backgroundview">
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
                    <el-row justify="end" align="middle" :gutter=10 style="margin: 0px;">
                        <el-col :span="1">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                        </el-col>
                        <el-col :span="1.5">
                            <el-dropdown @command="handleCommand" placement="bottom-end">
                                <span class="el-dropdown-link">
                                    用户管理<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="personal">个人资料</el-dropdown-item>
                                        <el-dropdown-item command="logout">登出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </el-row>
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
import { Document, Menu as IconMenu, Location, Setting, ArrowDown} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../router';

const handleCommand = ( command ) => {
    if(command == "personal") {
        router.push("")
    }else if(command == "logout"){
        ElMessageBox.confirm(
            '确定登出系统吗',
            {
                cancelButtonText: '手滑了',
                confirmButtonText: '确定',
                center: true,
            }
        )
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '登出成功',
                })
            })
    }
}
</script>

<style scoped>
.common-layout {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.el-header {
    background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
}

.el-menu {
    background-color: #F0F2F5;
}
.el-container {
    height: 100%;
}
.el-menu-vertical-demo{
    height: 100%;
}
.el-row {
    height: 100%;
    width: 100%;
    margin: 0px;
}
</style>