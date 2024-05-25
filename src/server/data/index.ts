import { Week } from "../../types";

export const LaBoratories = [
  { id: 1, name: "丹青902实验室" },
  { id: 2, name: "丹青904实验室" },
  { id: 3, name: "丹青906实验室" },
  { id: 4, name: "丹青908实验室" },
];

const createCourses = (len: number) => {
  let courses = [];
  for (let i = 1; i <= len; i++) {
    const course = {
      wid: i + "",
      class: "",
      addr: "",
      teacher: "",
      tid: "",
    };
    courses.push(course);
  }
  return courses;
};

export const createWeeks = (len: number) => {
  let weeks = [];
  let wc = [
    {
      id: "12",
      tx: "1 - 2节",
      time: "08:00 - 09:35",
      courses: createCourses(7),
    },
    {
      id: "34",
      tx: "3 - 4节",
      time: "10:05 - 11:40",
      courses: createCourses(7),
    },
    {
      id: "56",
      tx: "5 - 6节",
      time: "13:40 - 15:15",
      courses: createCourses(7),
    },
    {
      id: "78",
      tx: "7 - 8节",
      time: "15:35 - 17:10",
      courses: createCourses(7),
    },
    {
      id: "910",
      tx: "9 - 10节",
      time: "18:00 - 19:35",
      courses: createCourses(7),
    },
    {
      id: "1112",
      tx: "11 - 12节",
      time: "19:40 - 21:15",
      courses: createCourses(7),
    },
  ];
  for (let i = 1; i <= len; i++) {
    const week: Week = {
      id: i,
      weekCourse: wc,
    };
    weeks.push(week);
  }
  return weeks;
};

export const createAll = (len: number) => {
  let all = []
  if (!localStorage.getItem("all")) {
    const weeks = createWeeks(18);
    for (let i = 1; i <= len; i++) {
      const obj = {
        id: i,
        name: "",
        weeks,
      };
      all.push(obj);
    }
  } else {
    all = JSON.parse(localStorage.getItem('all') as string)
  }
  localStorage.setItem('all', JSON.stringify(all))
  return all
};
