import { ResultVO, User } from "../types"

export const saveAdmin = async () => {
    const admin:User = {
        id: '0000000000',
        name: 'admin',
        password: 'admin',
        role: 1
    }
    const users:User[] = []
    users.push(admin)
    const res = await new Promise<User>((resolve) => {
        setTimeout(() => {
            localStorage.setItem('users',JSON.stringify(users))
            resolve(admin)
        }, 500);
    })
    return res
}

export const loginServer = async (user:User) => {
    const resultVo:ResultVO<User> = { message: '' }
    const res = await new Promise<ResultVO<User>>(resolve => {
        const str = localStorage.getItem('users')
        const userList:User[] = str && JSON.parse(str)
        const tu = userList.find((u) => u.name === user.name && u.password === user.password)
        if(tu) {
            resultVo.code = 200
            resultVo.message = '登录成功'
            resultVo.data = tu
            resolve(resultVo)
        } else {
            resultVo.code = 401
            resultVo.message = '账号密码错误'
            resolve(resultVo)
        }
    })
    return res
}