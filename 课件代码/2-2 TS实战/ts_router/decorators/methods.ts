export const symbolHttpMethodKey = Symbol('app:httpMethod')

export const httpGet = function(target: any, propertyKey: string) {
    Reflect.defineMetadata(symbolHttpMethodKey, 'get', target, propertyKey)
}

export const httpPost = function(target: any, propertyKey: string) {
    Reflect.defineMetadata(symbolHttpMethodKey, 'post', target, propertyKey)
}