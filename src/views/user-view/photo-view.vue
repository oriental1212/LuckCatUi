<template>
    <router-view>
        <div class="photo-view-parent">
            <div class="photo-view-son">
                <el-row :gutter="15" justify="space-between">
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="标签" size="large">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="时间" size="large">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="Select" size="large">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="Select" size="large">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-col>
                </el-row>
            </div>
        </div>
    </router-view>
</template>

<script setup>
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
</script>

<style>
/* 背景虚拟化 */
.photo-view-parent{
    background: url("@/public/no01.jpg");
    width: 100%;
    height: 947px;
    position: fixed;
    background-size: cover;
    background-attachment: fixed;
}
.photo-view-son{
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 20px;
    width: cale(100%-100px);
    height: 947px;
    color: white;
    background-attachment: fixed;
    backdrop-filter: blur(12px);
    background-color: rgba(13,12,34, 0.331);
}
</style>