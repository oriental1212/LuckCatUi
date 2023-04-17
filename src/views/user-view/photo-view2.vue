<template>
    <router-view>
        <div class="photo-view-parent">
            <div class="photo-view-son">
                <!-- 选择器 -->
                <div class="select">
                    <el-row :gutter="15" justify="space-around">
                        <el-col :span="5">
                            <el-select v-model="select.photoInfo.photoTag" placeholder="标签" size="large" clearable>
                                <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-date-picker v-model="select.photoInfo.photoCreatTime" type="time" size="large" value-format="YYYY-MM-DD"
                                placeholder="请选择日期" :shortcuts="shortcuts" @blur="reset()" clearable/>
                        </el-col>
                        <el-col :span="5">
                            <el-select v-model="select.photoInfo.photoType" placeholder="图片类型" size="large" clearable>
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <!-- 图片展示 -->
                <div class="box">
                    <figure v-for="(photoInfo, index) in filterPhotoInfos" :key="index">
                        <el-image :src="photoInfo.photoUrl" :preview-src-list="urls" :initial-index="index"
                            hide-on-click-modal="true" preview-teleported="true" fit="contain" lazy />
                        <figcaption>
                            <p>
                                <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
                                    <el-icon @click="downLoad(photoInfo.photoUrl)">
                                        <download />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                                    <el-icon v-if="photoTag != 'love'" @click="star(photoInfo.photoUrl)">
                                        <Star />
                                    </el-icon>
                                    <el-icon v-else @click="star(photoInfo.photoUrl)">
                                        <StarFilled />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                                    <el-icon @click="share(photoInfo.photoUrl)">
                                        <Share />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="标签" placement="bottom">
                                    <el-icon @click="tag">
                                        <price-tag />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </el-tooltip>
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <!-- 分页功能 -->
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="photoPage.page" :page-sizes="[3, 6, 30]" :page-size="photoPage.size"
                        background="false" small="false" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>

        </div>
    </router-view>
</template>

<script setup>
import { ElMessage } from "element-plus";
import request from "../../utils/axios"
import useClipboard from 'vue-clipboard3'
import { computed, onBeforeMount, reactive, ref } from "vue";

const { toClipboard } = useClipboard()
const select = reactive({//条件选择
    photoInfo: {
        photoTag: "",
        photoType: "",
        photoCreatTime: ""
    }
})
const photoInfos = ref([])
const photoPage = reactive({
    size: 9,
    page: 1
})
const total = ref()//图片总数
// 条件选择下拉框
const tagOptions = reactive([
    { value: "love",label:"收藏" },
])
const typeOptions = reactive([
    { value: "jpeg" },
    { value: "jpg" },
    { value: "png" },
    { value: "gif" },
])
//快捷日期选择
const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '一周前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]
//图片预览的url数组
const urls = computed(() => filterPhotoInfos.value.map(function (item) {
    return item.photoUrl
}))
//图片条件查询
const filterPhotoInfos = computed(() =>
    photoInfos.value.filter(
        (data) =>
            data.photoTag.match(new RegExp(select.photoInfo.photoTag))
            && data.photoType.match(new RegExp(select.photoInfo.photoType))
            && data.photoCreatTime.match(new RegExp(select.photoInfo.photoCreatTime))
    )
)
//清空日期选择后重置日期,结局日期选择器清空后值为null图片不显示的问题
const reset=()=>{
    console.log(select.photoInfo.photoCreatTime);
    select.photoInfo.photoCreatTime!=null?select.photoInfo.photoCreatTime:""
}
onBeforeMount(() => {
    getUserPhoto()
})
// 下载
const downLoad = (url) => {
    request.get("/photo/download/" + url.photoName).then((res) => {
        if (res == 200) {
            ElMessage.success("开始下载了^-^ 喝杯茶休息休息吧~")
        } else {
            ElMessage.error("出了点小状况，重新试试吧")
        }
    })
}
//收藏
// const star = (url) => {
//     if (photoInfo.photoTag == "love") {
//         ElMessage.error("该图片已经收藏了哟")
//     } else {
//         request.get("/photo/photoLove", photoInfo).then((res) => {
//             if (res.code == 200) {
//                 ElMessage.success(res.data)
//                 url.photoTag = "love"
//             } else {
//                 ElMessage.error(res.msg)
//             }
//         })
//     }
// }
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
    request.post("/photo/queryByUsername", photoPage).then((res) => {
        if (res.code == 200) {
            photoInfos.value = res.data.records
            total.value = res.data.total
        } else {
            ElMessage.error(res.msg)
        }
    })
}

const handleSizeChange = (val) => {
    photoPage.size = val
    getUserPhoto()
};
const handleCurrentChange = (val) => {
    photoPage.page = val
    getUserPhoto()
}

/* const urls = [
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
] */
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
    height: 80vh;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y: auto;
}

/* 分页组件样式-居中 */
.pagination {
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
}

.select {
    width: 100%;
}
</style>