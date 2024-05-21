<template>
  <div class="container">
    <div class="header">
      <div class="left" style="height: 100%; width: 15vw;">
        <img src="../assets/logo.png" alt="error" style="height: auto; width: 90px;">
      </div>
      <div class="center">
        <div :class="['center-nav', {active: activeNav === 1}]" style="text-align: center; height: 100%; width: 100%; display: flex; 
        justify-content: center;" @click="setActiveNav(1)">
          <div style="display: flex; justify-content: center; align-items: center">
            <el-icon color="red"><ChatLineRound /></el-icon>
            <span style="font-size: large; font-weight: 700; color: gray;">上传实验课信息</span>
          </div>
        </div>
        <div :class="['center-nav', {active: activeNav === 2}]" style="text-align: center; height: 100%; width: 100%; display: flex; 
        justify-content: center;" @click="setActiveNav(2)">
          <div style="display: flex; justify-content: center; align-items: center;">
            <el-icon color="red"><Select /></el-icon>
            <span style="font-size: large; font-weight: 700; color: gray;">预约实验室</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="user">
          <img src="../assets/user.svg" alt="error" style="height: auto; width: 50px;">
        </div>
        <div class="logout">
          <el-button type="danger" size="large">退出</el-button>
        </div>
      </div>
    </div> 
    <div class="main">

    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChatLineRound, Select } from "@element-plus/icons-vue"
import { ref } from "vue";

const activeNav = ref(2)
const setActiveNav = (num:number) => {
  activeNav.value = num
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 10vh 85vh 5vh;
  background-color: white;
  .header {
    background-color: whitesmoke;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 15vw 70vw 15vw;
    .left {
     display: flex;
     justify-content: center;
     align-items: center;
     img {
      margin-left: -30px;
      border-radius: 5px;
      box-shadow: 8px 8px 10px rgb(178, 175, 175);
     }
    }
    .center {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      align-items: center;
      .center-nav:hover {
        border-radius: 10px;
        background-color: white;
      }
    }
    .right {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .user {
        display: flex;
        justify-content: center;
        align-items: center;
        img:hover {
          transform: scale(1.1);
        }
      }
      .logout {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .footer {
    background-color: whitesmoke;
    border-radius: 5px;
  }
}
.active {
  border-radius: 10px;
  background-color: white;
  border-bottom: 2px solid skyblue;
}
</style>
