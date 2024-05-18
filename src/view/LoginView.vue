<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';

let flag = ref(false)
</script>

<template>
    <div class="loginCard" style="width: 70vw; height: 70vh">
        <div style="padding: 5px">
            <img src="../assets/login-logo.png" alt="error" style="height: auto; width: 100%; border-radius: 5px;">
        </div>
        <div>
            <h2 style="text-align: center; margin-top: 80px;">实验室预约</h2>
            <p style="text-align: center; font-size: small;">教师灵活预约课程实验时间</p>
            <div class="inputs" style="margin-top: 50px">
                <el-input :prefix-icon="User" placeholder="用户名"></el-input>
                <el-input :prefix-icon="Lock" placeholder="密码"></el-input>
                <el-input v-show="flag" :prefix-icon="Lock" placeholder="确认密码"></el-input>
                <a href="" @click.prevent="flag = !flag" style="font-size: xx-small; text-align: center;">
                    <span v-if="!flag" style="color: blue; font-weight: 500;">没有账号？注册</span>
                    <span v-if="flag" style="color: blue; font-weight: 500;">已有账号，登录</span>
                </a>
                <el-button type="primary">
                    <span v-if="!flag">登录</span>
                    <span v-if="flag">注册</span>
                </el-button>
            </div>
            <div class="footer">
                <p style="font-size: xx-small">V1.0.0</p>
                <a href="https://github.com/QwQ-wuwuwu?tab=repositories" target="_blank">
                    <img style="height: 50%; width: auto;" src="../assets/GitHub.svg" alt="error">
                </a>
                <a href="https://github.com/bwhyman/vite-vue3-examples/blob/master/project.md#%E6%89%93%E5%8C%85%E9%83%A8%E7%BD%B2" target="_blank">
                    <img style="height: 50%; width: auto;" src="../assets/book.svg" alt="error">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loginCard {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    box-shadow: 10px 10px 10px rgb(178, 175, 175);
    display: grid;
    grid-template-columns: 1fr 1fr;
    .inputs {
        display: grid;
        justify-content: center;
        grid-template-rows: 1fr 1fr 1fr;
        row-gap: 30px;
    }
    .footer {
        position: absolute;
        bottom: 3%;
        right: 3%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}
img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>