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
                                placeholder="请选择日期" :shortcuts="shortcuts" @change="reset()" clearable/>
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
                                    <el-icon @click="downLoad(photoInfo.photoName,photoInfo.photoType)">
                                        <download />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                                    <el-icon v-if="photoInfo.photoTag != 'love'" @click="star(photoInfo)">
                                        <Star />
                                    </el-icon>
                                    <el-icon v-else @click="star(photoInfo)">
                                        <StarFilled />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                                    <el-icon @click="share(photoInfo.photoUrl)">
                                        <Share />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="标签" placement="bottom">
                                    <el-icon @click="tag(photoInfo)">
                                        <price-tag />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                    <el-icon @click="deletePhoto(photoInfo)">
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
//提交标签修改对象
const photoFont = reactive({})
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
    console.log(select.photoInfo.photoCreatTime)
    if(select.photoInfo.photoCreatTime == null){
        select.photoInfo.photoCreatTime = ''
    }
}
onBeforeMount(() => {
    getUserPhoto()
})
// 下载
const downLoad = (photoName,photoType) => {
    request.get("/photo/download/"+photoName,{responseType: "blob"}).then((res) => {
        ElMessage.success("图片正在下载,稍等一下")
        let blob = new Blob([res])
        let _url = URL.createObjectURL(blob)  
        let a = document.createElement("a")
        let name=Date.now()+"."+photoType
        a.setAttribute("download",name)
        a.setAttribute("href", _url)
        a.click()
        a.remove()
    }).catch(() => {
        ElMessage.error("出了点小状况，重新试试吧")
    })
}
//收藏
const star = (photoInfo) => {
    photoFont.photoName = photoInfo.photoName
    photoFont.photoTag = photoInfo.photoTag
    photoFont.photoUrl = photoInfo.photoUrl
    photoFont.photoCreatTime = photoInfo.photoCreatTime
    request.post("/photo/photoLove",photoFont).then((res) => {
        if (res.code == "200") {
            if(photoInfo.photoTag == "love"){
                photoInfo.photoTag = "default"
            }else if(photoInfo.photoTag == "default"){
                photoInfo.photoTag = "love"
            }
            ElMessage.success(res.data)
        } else {
            ElMessage.error(res.msg)
        }
    })
}
//分享
const share = async (url) => {
    try {
        await toClipboard(url)
        ElMessage.success({
            message: "复制成功^-^,图片地址为：" + url,
            duration: 2000
        })
    } catch (e) {
        console.error(e)
    }
}
//更改标签
const tag = (photoInfo) => {
    photoFont.photoName = photoInfo.photoName
    photoFont.photoTag = photoInfo.photoTag
    photoFont.photoUrl = photoInfo.photoUrl
    photoFont.photoCreatTime = photoInfo.photoCreatTime
    request.get("/photo/modifyLabel", photoFont).then((res) => {
        if (res.code == 200) {
            ElMessage.success(res.data)
            getUserPhoto()
        } else {
            ElMessage.error(res.msg)
        }
    })
}
//删除
const deletePhoto = (photoInfo) => {
    photoFont.photoName = photoInfo.photoName
    photoFont.photoTag = photoInfo.photoTag
    photoFont.photoUrl = photoInfo.photoUrl
    photoFont.photoCreatTime = photoInfo.photoCreatTime
    request.post("/photo/deletePhoto", photoFont).then((res) => {
        if(res.code == 200){
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