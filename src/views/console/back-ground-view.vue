<template>
    <router-view>
        <!-- 数据总览 -->
        <el-row :gutter="10" justify="space-between" style="margin: 0;">
                <el-col :span="8">
                    <el-card class="box-card" shadow="always" >
                        <template #header>
                            <div class="card-header">
                                <el-icon>
                                    <Picture />
                                </el-icon>
                                <span style="color:#67C23A">
                                    图片总数
                                </span>
                            </div>
                        </template>
                        <div class="card-body">{{ state.total_photo }}</div>
                    </el-card>
                </el-col>
                <el-col :span="8" >
                    <el-card class="box-card" shadow="always">
                        <template #header>
                            <div class="card-header">
                                <el-icon>
                                    <User />
                                </el-icon>
                                <span style="color:#E6A23C">用户总数</span>
                            </div>
                        </template>
                        <div class="card-body">{{ state.total_user }}</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="always">
                        <template #header>
                            <div class="card-header">
                                <el-icon>
                                    <PictureFilled />
                                </el-icon>
                                <span style="color:#fd0221">剩余容量</span>
                            </div>
                        </template>
                        <div class="card-body">{{ state.total_space }}</div>
                    </el-card>
                </el-col>
            
        </el-row>
        <!-- 可视化图表 -->
        <el-row :gutter="20" justify="space-between" style="padding-top: 20px;">
            <el-col>
                <el-card class="chart">
                    <v-chart class="chart" :option="option" />
                </el-card>
            </el-col>
        </el-row>
    </router-view>
</template>

<script setup>
import { ref, provide, reactive } from "vue";
// 引入图表vue-echarts
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
//应用主题，dark为暗色主题
provide(THEME_KEY, "");

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
//echarts配置
const option = ref({
    title: {
        text: "Traffic Sources",
        left: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "left",
        data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
    },
    series: [
        {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
                { value: 335, name: "Direct" },
                { value: 310, name: "Email" },
                { value: 234, name: "Ad Networks" },
                { value: 135, name: "Video Ads" },
                { value: 1548, name: "Search Engines" }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        }
    ]
});

const state = reactive({
    total_user: "total_user",
    total_photo: "total_photo",
    total_space: "total_space",
    personal_photo: "personal_photo",
    personal_space: "personal_space",
})
</script>

<style>
.el-card {
    height: 160px;
}

.card-header {
    vertical-align: middle;
    /* 图标和文字对齐*/
    display: flex;
    align-items: center;
}

.card-header span {
    margin-left: 10px;
    font-weight: bold
}

.card-body {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.chart {
    height: 400px;
}

</style>