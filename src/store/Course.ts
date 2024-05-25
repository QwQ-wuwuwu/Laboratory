import { defineStore } from "pinia";
import { ref } from "vue";
import { Course } from "../types";

const courseStore = defineStore('courseStore', () => {
    const course = ref<Course>({})
    return { course }
})

export default courseStore