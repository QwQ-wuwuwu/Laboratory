<template>
  <div style="height: 100%; width: 100%;">
    <div class="card">
        <div>
            <el-button type="danger" size="large" @click="clearAll">清除所有预约</el-button>
            <!-- <sub>待实现</sub> -->
        </div>
        <div>
            <el-button type="danger" size="large" @click="clearCourse">清除所有课程</el-button>
            <!-- <sub>待实现</sub> -->
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { clearAll, clearCourse } from '../server';
</script>

<style scoped>
.card {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50% -50%);
    display: grid;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
    justify-content: center;
    align-items: center;
}
</style>
