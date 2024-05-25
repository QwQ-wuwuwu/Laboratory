<template>
  <div class="reservation" style="height: 100%; width: 100%;">
    <div class="pagination">
      <el-select v-model="laboraotry" placeholder="请选择实验室后预约" style="width: 240px; margin-right: 100px" size="large">
        <el-option v-for="l of LaBoratories" :key="l.id" :label="l.name" :value="l.id" />
      </el-select>
      <el-pagination background layout="prev, pager, next" :total="180" @current-change="setPage" />
    </div>
    <div class="timeTable">
      <div class="header">
        <div class="empty" style="border-bottom: 1px solid skyblue; border-right: 1px solid skyblue;"></div>
        <div class="table-header">周一</div>
        <div class="table-header">周二</div>
        <div class="table-header">周三</div>
        <div class="table-header">周四</div>
        <div class="table-header">周五</div>
        <div class="table-header">周六</div>
        <div class="table-header">周日</div>
      </div>
      <div class="body">
        <div class="item" v-for="r of week?.weekCourse" :key="r.id">
          <div class="empty">
            {{ r.tx }} <br> {{ r.time }}
          </div>
          <div class="onetwo" data-hover-text="预约" v-for="(c, index) of r.courses" :id="`${r.id}-${c.wid}`"
            @click="(e) => reservation(e)" :key="index">
            <span>{{ c.class }} <br> {{ c.teacher }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { createDialog } from '../components';
import { LaBoratories, createAll } from '../server/data';
import { useRouter } from 'vue-router';
import { findCourse, getCourse, saveReser } from '../server';
import { Course, User } from '../types';

const router = useRouter()
const currentPage = ref(1)
const laboraotry = ref(1)
const course = ref<Course>()
const user:User = JSON.parse(sessionStorage.getItem('user') as string)
const all = ref(createAll(4))
const laboraotryWeek = computed(() => {
  return all.value.find((a:any) => a.id === laboraotry.value)
})
const week = computed(() => {
  return laboraotryWeek.value.weeks.find((w:any) => w.id === currentPage.value)
})

onMounted(async () => {
  course.value = (await getCourse()).data
})
const setPage = (page:number) => {
  currentPage.value = page
}
const reservation = (event:any) => {
  if(!course.value) {
    createDialog('未录入实验课信息，请先录入')
    router.push('/main/course')
    return
  }
  const rid = event.target.id.split('-')[0]
  const wid = event.target.id.split('-')[1]
  const c = findCourse(rid, wid, week.value?.weekCourse as any)
  if(c.class != '' && c.tid !== user.id) {
    createDialog('预约实验室冲突，请选择其他时段')
    return
  } else if(c.tid === user.id) {
    createDialog('删除本次预约？')
    return 
  }
  if(!laboraotry.value) {
    createDialog('请先选择实验室后再预约')
    return
  }
  let newCourse:any = {wid}
  newCourse.class = course.value.name
  newCourse.addr = laboraotry.value
  newCourse.teacher = course.value.teacherName
  newCourse.tid = user.id
  all.value = saveReser(newCourse, laboraotry.value, currentPage.value, rid, wid)
  ElMessage({showClose: true, message: '预约实验室成功', type: 'success'})
}
</script>

<style scoped>
.reservation {
  display: grid;
  grid-template-rows: 20% 80%;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
.timeTable {
  display: grid;
  grid-template-rows: 10% 90%;
}
.header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  .table-header {
    text-align: center;
    border-bottom: 1px solid skyblue;
    color: rgb(178, 175, 175);
    display: inline-block;
  }
}
.body {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  .item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    span {
      color: gray;
      font-size: small;
      font-weight: 900;
    }
    .onetwo {
      display: flex;
      justify-content: center;
      align-items: center;
      /* border: 0.1px solid skyblue; */
    }
    .onetwo::after {
      content: attr(data-hover-text);
      display: none;
      color: white;
      pointer-events: none;
      font-size: larger;
      font-weight: 900;
    }
    .onetwo:hover::after {
      display: block;
      z-index: 1000;
    }
    .onetwo:hover {
      span {
        display: none;
      }
      background-color: skyblue;
      border: 1px solid skyblue;
      border-radius: 10px;
    }
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid skyblue;
      color: rgb(178, 175, 175);
    }
  }
}
</style>
