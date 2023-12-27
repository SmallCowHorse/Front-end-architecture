import { Router } from "express"
import { httpGet, httpPost } from "./decorators/methods"
import { path } from "./decorators/path"


// 模块的抽象 - 用户对象
class User {
    // 用户信息返回
    @httpGet
    @path('/user/info')
    info() {
        // 接口逻辑
        return '用户zhaowa'
    }

    // 用户登录
    @httpPost
    @path('/user/login')
    login() {
        // 接口逻辑
    }
}

export default (app: Router) => {
    let user = new User()

    for (let methodName in user) {
        let method = user[methodName]

        if (typeof method !== 'function') break

        let httpMethod = Reflect.getMetadata(httpMethodKey, user, methodName)
        let path = Reflect.getMetadata(pathKey, user, methodName)

        app[httpMethod](path, method)
        // app.get(path, user.info)
    }
}