<template>
    <router-view>
        <div class="background">
            <div class="word">
                <el-row
                    justify="center"
                    align="middle"
                    style="margin-bottom: 20px"
                >
                    <div class="titler">开始上传你的图片吧</div>
                    <div class="adverbs">你真以为你能忘了，说不定某一照片某一话语某一物什某一刹那，花开成海，思念成灾</div>
                </el-row>
            </div>
        </div>
    </router-view>
</template>

<script setup>
</script>

<style>
.background {
    background: url("@/public/no01.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
.word {
    font-size: 3em;
    color: #ffffff;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.titler{
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 10px;
}
.adverbs{
    font-size: 22px;
    font-weight: 790px;
    margin-top: 10px;
    text-align: center;
}
</style>
