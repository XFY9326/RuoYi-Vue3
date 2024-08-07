<template>
    <div class="app-container home">
        <el-row :gutter="20">
            <el-col :lg="12" :sm="24" style="padding-left: 20px">
                <h2>{{ page_title }}</h2>
                <p>
                    <b>当前版本:</b> <span>v{{ version }}</span>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script name="Index" setup>
const version = import.meta.env.VITE_APP_VERSION;
const page_title = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss" scoped>
.home {
    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    color: #676a6c;
    overflow-x: hidden;

    h2 {
        margin-top: 10px;
        font-size: 26px;
        font-weight: 100;
    }

    p {
        margin-top: 10px;

        b {
            font-weight: 700;
        }
    }
}
</style>
