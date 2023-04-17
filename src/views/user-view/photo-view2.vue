<template>
    <router-view>
        <div class="photo-view-parent">
            <div class="photo-view-son">
                <!-- 选择器 -->
                <div class="select">
                    <el-row :gutter="15" justify="space-evenly">
                        <el-col :span="4">
                            <el-select v-model="value" placeholder="标签" size="large">
                                <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="value" placeholder="时间" size="large">
                                <el-option v-for="item in timeOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="value" placeholder="图片类型" size="large">
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select> 
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="value" placeholder="明明爱你呀" size="large">
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
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
                        <el-image :src="url" :preview-src-list="urls" :initial-index="index" hide-on-click-modal="true"
                            preview-teleported="true" fit="contain" />
                        <figcaption>
                            <p>
                                <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
                                    <el-icon @click="downLoad(url)">
                                        <download />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                                    <el-icon v-if="url.photoTag != 'love'" @click="star(url)">
                                        <Star />
                                    </el-icon>
                                    <el-icon v-else @click="star(url)">
                                        <StarFilled />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                                    <el-icon @click="share(url)">
                                        <Share />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="标签" placement="bottom">
                                    <el-icon @click="tag">
                                        <price-tag />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                     <el-icon><Delete /></el-icon>
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
import { onBeforeMount, reactive } from "vue";

const { toClipboard } = useClipboard()
const photoInfo = reactive([{
    photoName: "",
    photoTag: "",
    photoUrl: "",
    photoCreatTime: ""
}])
const photoPage = reactive({
    size: "",
    page: ""
})
onBeforeMount(() => {
    getUserPhoto()
    console.log(photoInfo)
})
// 下载
const downLoad = (url) => {
    console.log(url);
    request.get("/photo/download/" + url.photoName).then((res) => {
        if (res == 200) {
            ElMessage.success("开始下载了^-^ 喝杯茶休息休息吧~")
        } else {
            ElMessage.error("出了点小状况，重新试试吧")
        }
    })
}
//收藏
const star = (url) => {
    if (photoInfo.photoTag == "love") {
        ElMessage.error("该图片已经收藏了哟")
    } else {
        request.get("/photo/photoLove", photoInfo).then((res) => {
            if (res.code == 200) {
                ElMessage.success(res.data)
                url.photoTag = "love"
            } else {
                ElMessage.error(res.msg)
            }
        })
    }
}
//分享
const share = async (url) => {
    try {
        await toClipboard(url.photoUrl)
        ElMessage.success({
            message: "复制成功^-^,图片地址为：" + url.photoUrl,
            duration: 2000
        })
    } catch (e) {
        console.error(e)
    }
}
//更改标签
const tag = (url) => {
    request.get("/photo/modifyLabel", url).then((res) => {
        if (res.code == 200) {
            ElMessage.success(res.data)
            getUserPhoto()
        } else {
            ElMessage.error(res.msg)
        }
    })
}

//请求获取用户所有图片函数
const getUserPhoto = () => {
    request.get("/photo/queryByUsername", photoPage).then((res) => {
        if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
                photoInfo[i].photoName = res.data[i].photoName
                photoInfo[i].photoTag = res.data[i].photoTag
                photoInfo[i].photoUrl = res.data[i].photoUrl
                photoInfo[i].photoCreatTime = res.data[i].photoCreatTime
            }
        } else {
            ElMessage.error(res.msg)
        }
    })
}

const tagOptions = reactive([
    {value: "love"},
    {value: "a"},
    {value: "b"},
])
const timeOptions = reactive([])
const typeOptions = reactive([])

const urls = [
    'http://82.157.162.80:9000/photo/2023/4/12/2023-04-12-1677554117163?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230412%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230412T100127Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=b1996854cd92bf7b0f3e2be49fe98c311c84c10ea422379b12b1c2b68a78ec44',
    'http://82.157.162.80:9000/photo/2023/4/12/2023-04-12-1677554173142?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230412%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230412T101053Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=418dac75f7528869d35823e062a6d32f0c3ff801509ee3fad15ea602e64a027a',
    'http://82.157.162.80:9000/photo/2023/4/12/2023-04-12-a26f66658e014e06aa70e2753742bef3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230412%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230412T101108Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=992b383c72c3b9c38ce93dccfec2a9dded95814ad73f47ba1913f039922be10a',
    'http://82.157.162.80:9000/photo/2023/4/12/2023-04-12-7f9a58e2582bb4a1e70f87f4c22b554_edited?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230412%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230412T133430Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3f1a0c320f826bc11b0109f6e8c664c655ac6875b62e49c4c90ed231c47a5783',
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