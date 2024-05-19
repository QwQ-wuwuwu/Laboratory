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