export type User = {
    id?: string,
    name: string,
    password: string,
    role?: number // 0代表普通用户，1代表管理员
}

export type ResultVO<T> = {
    code?: number,
    message?: string,
    data?: T
}

export type Course = {
    tid?:string
    name?:string
    teacherName?:string
    studyTime?:number
    start?:number
    end?:number
    class?:string
}

export type Week = {
    id:number
    weekCourse: any[]
}