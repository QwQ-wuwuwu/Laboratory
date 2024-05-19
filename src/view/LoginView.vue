<script lang="ts" setup>
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { saveAdmin, loginServer } from "../server";
import { useRouter } from "vue-router";
import { ResultVO, User } from "../types";
import { createAlert } from "../components";

const router = useRouter();
onMounted(async () => {
  await saveAdmin();
});

const flag = ref(false);
const user = ref<User>({
  name: "",
  password: "",
});
const confirmP = ref("");

const login = async () => {
  const resultVo:ResultVO<User> = await loginServer(user.value)
  if(resultVo.code === 200) {
    router.push("/main");
    createAlert('Success Alert', 'success', resultVo.message as string)
  } else {
    createAlert('Error Alert', 'error', resultVo.message as string)
    user.value.password = ''
  }
};
const register = () => {
  flag.value = !flag.value;
};
</script>

<template>
  <div class="loginCard" style="width: 70vw; height: 70vh">
    <div style="padding: 5px">
      <img
        src="../assets/login-logo.png"
        alt="error"
        style="height: auto; width: 100%; border-radius: 5px"
      />
    </div>
    <div>
      <h2 style="text-align: center; margin-top: 70px">实验室预约</h2>
      <p style="text-align: center; font-size: small">
        教师灵活预约课程实验时间
      </p>
      <div class="inputs" style="margin-top: 50px">
        <div>
          <el-input
            type="text"
            size="large"
            :prefix-icon="UserFilled"
            placeholder="用户名"
            v-model="user.name"
          ></el-input>
          <p
            v-if="user.name === null"
            style="font-size: xx-small; color: red; margin: 0"
          >
            用户名不能为空
          </p>
        </div>
        <div>
          <el-input
            type="password"
            size="large"
            :prefix-icon="Lock"
            placeholder="密码"
            :show-password="true"
            v-model.trim="user.password"
          ></el-input>
          <p
            v-if="user.password === null"
            style="font-size: xx-small; color: red; margin: 0"
          >
            密码不能为空
          </p>
        </div>
        <div v-show="flag">
          <el-input
            type="password"
            size="large"
            :prefix-icon="Lock"
            placeholder="确认密码"
            :show-password="true"
            v-model.trim="confirmP"
          ></el-input>
          <p
            v-if="user.password === ' '"
            style="font-size: xx-small; color: red; margin: 0"
          >
            两次输入密码不一致
          </p>
        </div>
        <a
          href=""
          @click.prevent="flag = !flag"
          style="font-size: xx-small; text-align: center; margin-bottom: 15px"
        >
          <span v-if="!flag" style="color: blue; font-weight: 500"
            >没有账号？注册</span
          >
          <span v-if="flag" style="color: blue; font-weight: 500"
            >已有账号，登录</span
          >
        </a>
        <el-button type="primary" v-if="!flag" size="large" @click="login"
          >登录</el-button
        >
        <el-button type="primary" v-if="flag" size="large" @click="register"
          >注册</el-button
        >
      </div>
      <div class="footer">
        <p style="font-size: xx-small">V1.0.0</p>
        <a href="https://github.com/QwQ-wuwuwu/Laboratory" target="_blank">
          <img
            style="height: 50%; width: auto"
            src="../assets/GitHub.svg"
            alt="error"
          />
        </a>
        <a
          href="https://github.com/bwhyman/vite-vue3-examples/blob/master/project.md#%E6%89%93%E5%8C%85%E9%83%A8%E7%BD%B2"
          target="_blank"
        >
          <img
            style="height: 50%; width: auto"
            src="../assets/book.svg"
            alt="error"
          />
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
    grid-template-rows: 60px 60px 60px;
    grid-template-columns: 18vw;
  }
  .footer {
    position: absolute;
    bottom: 2%;
    right: 1%;
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
