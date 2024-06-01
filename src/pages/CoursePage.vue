<template>
  <div class="main" style="width: 100%; height: 100%;">
    <div class="left">
        <h2 style="color: rgb(141, 137, 137);">已录入的课程</h2>
        <el-table :data="tableCourses" stripe style="width: 100%">
            <el-table-column type="index" label="#" />
            <el-table-column prop="name" label="课程" />
            <el-table-column prop="teacherName" label="老师" />
            <el-table-column prop="studyTime" label="学时" style="margin-right: 0;" />
        </el-table>
    </div>
    <div class="add-card">
        <div class="header">
            <span style="font-size: larger; margin-left: 30px; color: skyblue;">录入</span>
            <el-icon @click="pageto" color="rgb(178, 175, 175)" style="margin-right: 30px;"><CloseBold /></el-icon>
        </div>
        <div class="body">
            <div class="item">
                <span>课程</span>
                <el-input size="large" type="text" placeholder="输入课程名称" v-model="course.name"></el-input>
            </div>
            <div class="item">
                <span>授课老师</span>
                <el-input size="large" type="text" placeholder="输入授课老师姓名" v-model="course.teacherName"></el-input>
            </div>
            <div class="item">
                <span>班级</span>
                <el-input placeholder="授课班级" size="large" v-model="course.class"></el-input>
            </div>
            <div class="item">
                <span style="color: blue;">教案选择</span>
            </div>
            <div class="item">
                <span>学时</span>
                <el-input-number size="large" placeholder="非负整数" v-model="course.studyTime"></el-input-number>
            </div>
            <div>
                <div><span>上课周次</span></div>
                <span style="font-size: medium;">开始：</span>
                <el-select size="large" placeholder="开始周次" style="width: 240px;" v-model="course.start">
                    <el-option  v-for="(c, index) of 18" :key="index" :label="'第' + c + '周'" :value="c"/>
                </el-select>
                <span style="font-size: medium;">结束：</span>
                <el-select size="large" placeholder="结束周次" style="width: 240px;" v-model="course.end">
                    <el-option  v-for="(c, index) of 18" :key="index" :label="`第${c}周`" :value="c"/>
                </el-select>
            </div>
        </div>
        <div class="footer">
            <div style="margin-right: 30px;">
                <el-button size="large" @click="pageto">取消</el-button>
                <el-button size="large" type="primary" @click="save" 
                :disabled="!course.name || !course.studyTime">确认</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CloseBold } from "@element-plus/icons-vue"
import { ref, onMounted, watch } from "vue";
import { Course, ResultVO } from "../types";
import { getUserCourses, saveCourse } from "../server";
// import { useRouter } from "vue-router";

const course = ref<Course>({})
// const router = useRouter()
const tableCourses = ref([])

watch(course.value, () => {
    if(course.value.studyTime && course.value.studyTime <= 0) {
        ElMessage({showClose: true, message: '输入有误', type: 'error'})
        //@ts-ignore
        course.value.studyTime = null
    }
})

onMounted(() => {
    tableCourses.value = getUserCourses()
})

const save = async () => {
    const resultVo:ResultVO<Course> = await saveCourse(course.value)
    course.value = resultVo.data as Course
    ElMessage({showClose: true, message: resultVo.message, type: 'success'})
    tableCourses.value = getUserCourses()
}
const pageto = () => {
    // router.push('/main/reservation')
}
</script>

<style scoped>
.el-input {
    width: 300px;
}
.main {
    display: flex;
    justify-content: space-evenly;
}
.left {
    margin-top: 80px;
    width: 40%;
}
.add-card {
    height: 80%;
    margin-top: 80px;
    width: 40%;
    background-color: whitesmoke;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.5px solid rgb(178, 175, 175);
    }
    .body {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        span {
            margin-left: 20px;
            color: rgb(141, 137, 137);
            font-size: large;
        }
        .item {
            display: grid;
            grid-template-columns: 30% 70%;
            align-items: center;
        }
    }
    .footer {
        display: flex;
        justify-content: end;
        align-items: center;
        border-top: 0.5px solid rgb(178, 175, 175);
    }
}
</style>