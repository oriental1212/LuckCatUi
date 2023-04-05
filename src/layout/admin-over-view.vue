<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边菜单 -->
            <el-aside width="180px">
                <el-menu
                    default-active="backgroundview"
                    :unique-opened="true"
                    class="el-menu-vertical-demo"
                    :router="true"
                >
                    <el-menu-item index="backgroundview">
                        <el-icon><location /></el-icon>
                        <span>总览</span>
                    </el-menu-item>
                    <el-menu-item index="usercontroller">
                        <el-icon><document /></el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="objectstorage">
                        <el-icon><setting /></el-icon>
                        <span>OSS管理</span>
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
                    <el-row justify="end" align="middle" :gutter=25 style="margin: 0px;">
                        <el-col :span="2.25" style="padding-left: 0px">
                            <el-button link @click="comeback" style="font-size: larger;">LuckCat图床</el-button>
                        </el-col>
                        <el-col :span="18"></el-col>
                        <el-col :span="1.5">
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
import { Document, Location, Setting, ArrowDown} from '@element-plus/icons-vue'
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
//返回主页
const comeback = () => {
    router.push({name: "user-home"})
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
    background-color: #EBEEF5;
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
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