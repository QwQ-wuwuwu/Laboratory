<script lang="ts" setup>
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import { saveAdmin, loginServer, registerServer } from "../server";
import { useRouter } from "vue-router";
import { ResultVO, User } from "../types";
import { createDialog, createId } from "../components";

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
let userName = ref(false);
let userPassword = ref(false);
let confirmPassword = ref(false);

createDialog('管理员账号：admin' + '  ' + '默认密码：admin' + '\n')
const judge = () => {
  userName = computed(() => {
    if (user.value.name.length === 0) {
      return true
    } else {
      return false
    }
  });
  userPassword = computed(() => {
    if (user.value.password.length === 0) {
      return true
    } else {
      return false
    }
  })
  confirmPassword = computed(() => {
    if (user.value.password !== confirmP.value) {
      return true
    } else {
      return false
    }
  })
};
const login = async () => {
  const resultVo: ResultVO<User> = await loginServer(user.value);
  if (resultVo.code === 200) {
    router.push("/main");
    ElMessage({showClose: true, message: resultVo.message, type: 'success'})
  } else {
    ElMessage({showClose: true, message: resultVo.message, type: 'error'})
    user.value.password = "";
  }
};
const register = async() => {
  const id = createId()
  user.value.id = id
  user.value.role = 0 
  const resultVo:ResultVO<User> = await registerServer(user.value)
  if(resultVo.code == 401) {
    createDialog(resultVo.message as string)
    user.value.name = ''
    user.value.password = ''
    confirmP.value = ''
    return
  }
  ElMessage({showClose: true, message: resultVo.message, type: 'success'})
  user.value.password = ''
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
      <h1 style="text-align: center; margin-top: 80px">实验室预约</h1>
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
            @focus="judge"
            v-model="user.name"
          ></el-input>
          <p v-if="userName" style="font-size: xx-small; color: red; margin: 0">
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
            @focus="judge"
            v-model.trim="user.password"
          ></el-input>
          <p
            v-if="userPassword"
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
            v-if="confirmPassword"
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
          <span v-if="!flag" style="color: blue; font-size: medium;"
            >没有账号？注册</span
          >
          <span v-if="flag" style="color: blue; font-size: medium;"
            >已有账号，登录</span
          >
        </a>
        <el-button
          type="primary"
          v-if="!flag"
          size="large"
          @click="login"
          :disabled="user.name == '' || user.password == ''"
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
.el-input__wrapper {
  background-color: whitesmoke !important;
}
.el-input {
  height: 100%;
}
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
    row-gap: 20px;
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
