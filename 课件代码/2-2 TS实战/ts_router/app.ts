import 'reflect-metadata'
import * as express from 'express'
import router from './router'

// 初始化服务
const app = express()
app.use(express.json())

// 接口逻辑
app.get('/user/info', (req, res) => {
    res.status(200).json({
        message: '这里是用户信息'
    })
})

app.post('/user/login', (req, res) => {
    // 登录逻辑
})

// 整合router
router(app)

app.listen(3000, () => {
    console.log('start listening')
})