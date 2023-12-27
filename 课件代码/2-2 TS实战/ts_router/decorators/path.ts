import { Request, Response } from "express";

export const symbolPathKey = Symbol.for('app:path')

export let path = (path: string): Function => {
    return function(target, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Reflect.defineMetadata(symbolPathKey, path, target, propertyKey)
        if (!descriptor.value) return;

        // 替换封装
        let oldMethod = descriptor.value;
        descriptor.value = function(req: Request, res: Response) {
            const params = Object.assign({}, req.body, req.query)
            let methodResult = oldMethod.call(this, params)

            // 返回新结果
            res.send(methodResult)
        }
    }
}