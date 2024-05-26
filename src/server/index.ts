import courseStore from "../store/Course";
import { Course, ResultVO, User } from "../types";
import { LaBoratories } from "./data";

const useCourse = courseStore();

export const saveAdmin = async () => {
  const admin: User = {
    id: "0000000000",
    name: "admin",
    password: "admin",
    role: 1,
  };
  const users: User[] = [];
  users.push(admin);
  const res = await new Promise<User>((resolve) => {
    setTimeout(() => {
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
      }
      resolve(admin);
    }, 500);
  });
  return res;
};

export const loginServer = async (user: User) => {
  const resultVo: ResultVO<User> = { message: "" };
  const res = await new Promise<ResultVO<User>>((resolve) => {
    const str = localStorage.getItem("users");
    const userList: User[] = str && JSON.parse(str);
    const tu = userList.find(
      (u) => u.name === user.name && u.password === user.password
    );
    if (tu) {
      resultVo.code = 200;
      resultVo.message = "登录成功，欢迎用户";
      resultVo.data = tu;
      sessionStorage.setItem("user", JSON.stringify(tu));
      resolve(resultVo);
    } else {
      resultVo.code = 401;
      resultVo.message = "账号密码错误，请重试";
      resolve(resultVo);
    }
  });
  return res;
};

export const registerServer = async (user: User) => {
  const resultVo: ResultVO<User> = { message: "" };
  const res = await new Promise<ResultVO<User>>((resolve) => {
    const str = localStorage.getItem("users");
    const userList: User[] = str && JSON.parse(str);
    const tu = userList.find(
      (u) => u.name === user.name && u.password === user.password
    );
    if (tu) {
      resultVo.code = 401;
      resultVo.message = "您的账号和密码与他人重复！";
      resolve(resultVo);
    } else {
      userList.push(user);
      localStorage.setItem("users", JSON.stringify(userList));
      resultVo.code = 200;
      resultVo.message = "注册成功，返回登陆";
      resultVo.data = user;
      resolve(resultVo);
    }
  });
  return res;
};

export const saveCourse = async (course: Course) => {
  const resultVo: ResultVO<Course> = { message: "" };
  const user: User = JSON.parse(sessionStorage.getItem("user") as string);
  course.tid = user.id;
  if (!localStorage.getItem("courses")) {
    let arr: Course[] = [];
    localStorage.setItem("courses", JSON.stringify(arr));
  }
  const courses: Course[] = JSON.parse(
    localStorage.getItem("courses") as string
  );
  const res = await new Promise<ResultVO<Course>>((resolve) => {
    let index = courses.findIndex((c) => c.tid === user.id);
    if (index !== -1) {
      courses[index] = course;
    } else {
      courses.push(course);
    }
    localStorage.setItem("courses", JSON.stringify(courses));
    resultVo.code = 200;
    resultVo.message = "课程成功录入系统";
    resultVo.data = course;
    resolve(resultVo);
  });
  return res;
};

export const getCourse = async () => {
  const resultVo: ResultVO<Course> = { code: 200, message: "" };
  let courseS = useCourse.course;
  return await new Promise<ResultVO<Course>>((resolve) => {
    if (courseS.name) {
      resultVo.message = "获取课程信息成功";
      resultVo.data = courseS;
      resolve(resultVo);
    } else {
      const user: User = JSON.parse(sessionStorage.getItem("user") as string);
      const courses: Course[] = JSON.parse(
        localStorage.getItem("courses") as string
      );
      const course = courses.find((c) => c.tid === user.id);
      useCourse.course = course as Course;
      resultVo.data = course;
      resolve(resultVo);
    }
  });
};

export const findCourse = (rid: string, wid: string, weekCourse: any[]) => {
  const cs = weekCourse.filter((wc) => wc.id === rid)[0];
  const course = cs.courses.find((c: any) => c.wid === wid);
  return course;
};

export const deleteReser = (lid:number, id:number, rid:string, wid:string) => {
    const all = JSON.parse(localStorage.getItem("all") as string);
    const lws = all.find((a: any) => a.id === lid);
    let weekIndex = lws.weeks.findIndex((w: any) => w.id === id);
    if (weekIndex !== -1) {
        const week = lws.weeks[weekIndex];
        let wci = week.weekCourse.findIndex((wc: any) => wc.id === rid);
        if (wci !== -1) {
        const weekCourse = week.weekCourse[wci];
        let ci = weekCourse.courses.findIndex((c: any) => c.wid === wid);
        if (ci !== -1) {
            weekCourse.courses[ci].class = ''
            weekCourse.courses[ci].addr = ''
            weekCourse.courses[ci].teacher = ''
            weekCourse.courses[ci].tid = ''
            ElMessage({showClose: true, message: '已删除此次预约', type: 'success'})
            }
        }
    }
    localStorage.setItem("all", JSON.stringify(all));
    return all
}

export const saveReser = (
  newC: any,
  lid: number,
  id: number,
  rid: string,
  wid: string
):ResultVO<any> => {
    const resultVo:ResultVO<any> = {message: ''}
  const user: User = JSON.parse(sessionStorage.getItem("user") as string);
  const courses = JSON.parse(localStorage.getItem("courses") as string);
  const course = courses.find((c: any) => c.tid === user.id);

  // 统计时长判断是否阈值
  let sumC = 0;
  const all = JSON.parse(localStorage.getItem("all") as string);
  all.forEach((a: any) => {
    a.weeks.forEach((w: any) => {
      w.weekCourse.forEach((wc: any) => {
        wc.courses.forEach((c: any) => {
          if (c.tid === user.id) sumC++
        })
      })
    })
  })
  if(sumC * 2 >= course.studyTime) {
    ElMessage({showClose: true, message: '预约实验室的总时长已超过预定学时，无法继续预约', type: 'error'})
    resultVo.code = 401
    resultVo.data = all
    return resultVo
  }

  // 保存预约数据
  const lws = all.find((a: any) => a.id === lid);
  let weekIndex = lws.weeks.findIndex((w: any) => w.id === id);
  if (weekIndex !== -1) {
    const week = lws.weeks[weekIndex];
    let wci = week.weekCourse.findIndex((wc: any) => wc.id === rid);
    if (wci !== -1) {
      const weekCourse = week.weekCourse[wci];
      let ci = weekCourse.courses.findIndex((c: any) => c.wid === wid);
      if (ci !== -1) {
        weekCourse.courses[ci] = newC;
      }
    }
  }
  localStorage.setItem("all", JSON.stringify(all));
  resultVo.code = 200
    resultVo.data = all
    return resultVo
};

export const getLaboratory = (id: number) => {
  return LaBoratories.find((l) => l.id === id);
};

export const clearAll = () => {
    localStorage.setItem('all', '')
}

export const clearCourse = () => {
    localStorage.setItem('courses', '')
}
