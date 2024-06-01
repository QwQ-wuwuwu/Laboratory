import { defineStore } from "pinia";
import { ref } from "vue";
import { Course } from "../types";

const courseStore = defineStore('courseStore', () => {
    const courses = ref<Course[]>([])
    return { courses }
})

export default courseStore