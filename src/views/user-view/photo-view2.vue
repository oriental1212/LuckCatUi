<template>
    <router-view>
        <div class="photo-view-parent">
            <div class="photo-view-son">
                <!-- 选择器 -->
                <div class="select">
                    <el-row :gutter="15" justify="space-evenly">
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="标签" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="时间" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="图片类型" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="明明爱你呀" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                </el-row>
                </div>
                <!-- 图片展示 -->
                <div class="box">
                    <figure v-for="(url, index) in urls" :key="url">
                        <!-- 
                            initial-index 初始化预览图片组第一张为选中图片
                            hide-on-click-modal 点击遮罩层关闭预览
                            preview-teleported 是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 true
                         -->
                        <el-image :src="url" :preview-src-list="urls" 
                        :initial-index="index"
                        hide-on-click-modal="true"
                        preview-teleported="true" 
                        />
                        <figcaption>
                            <p>
                                <el-tooltip class="item" effect="dark" content="下载" placement="right">
                                    <el-icon @click="downLoad(url)">
                                        <download/>
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="收藏" placement="right">
                                    <el-icon @click="star">
                                        <Star/>
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="分享" placement="right">
                                    <el-icon @click="share(url)">
                                        <Share/>
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="标签" placement="right">
                                    <el-icon @click="tag">
                                        <price-tag/>
                                    </el-icon>
                                </el-tooltip>

                            </p>
                        </figcaption>
                    </figure>
                </div>

            </div>
        </div>
    </router-view>
</template>

<script setup>
import { ElMessage } from "element-plus";
import request from "../../utils/axios"
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()
// 下载
const downLoad = (url) => {
    request.get("/photo/download/" + url.fliename).then((res) => {
        if(res == 200){
            ElMessage.success("开始下载了^-^ 喝杯茶休息休息吧~")
        }else{
            ElMessage.error("出了点小状况，重新试试吧")
        }
    })
}
//收藏
const star = () => {
    request.get().then(() => {

    })
}
//分享
const share = async (url) => {
    try {
        await toClipboard(url)
        ElMessage.success("复制成功^-^,图片地址为：" + url)
    } catch (e) {
        console.error(e)
    }
}
const tag = () => {
    request.get().then(() => {
        
    })
}

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
]

const urls = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
</script>
<style scoped>
/* 引入图片预览效果的css */
@import '../../assets/css/imagePreview.css';

/* 背景虚拟化 */
.photo-view-parent {
    background: url("@/public/no01.jpg");
    width: 100%;
    /* height: 947px; */
    min-height: 100vh;
    /* position: fixed; */
    background-size: cover;
    background-attachment: fixed;
}

.photo-view-son {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 20px;
    width: cale(100%-100px);
    max-height: 100vh;
    color: white;
    background-attachment: fixed;
    backdrop-filter: blur(15px);
    background-color: rgba(13, 12, 34, 0.331);
    overflow: hidden;
}

.box {
    height: 90vh;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y: auto;
}
</style>