// 通过给类、方法等定义元数据

// 设置
console.log('################################')
console.log('元数据的手动挂载')

import 'reflect-metadata'

class Test {
    public static clsMethod() {}
    public instMethod() {}
}

let obj = new Test();

Reflect.defineMetadata('meta', 'class', Test);
Reflect.defineMetadata('meta', 'class method', Test, 'clsMethod');
Reflect.defineMetadata('meta', 'instance', obj);
Reflect.defineMetadata('meta', 'instance method', obj, 'instMethod');

console.log(Reflect.getMetadata('meta', Test));
console.log(Reflect.getMetadata('meta', Test, 'clsMethod'));
console.log(Reflect.getMetadata('meta', obj));
console.log(Reflect.getMetadata('meta', obj, 'instMethod'));

console.log('################################')
console.log('装饰器挂载元数据')
function classDecorator(): ClassDecorator {
    return target => {
        // 动态配置metadata
        Reflect.defineMetadata('meta', 'class', target);
    }
}

function methodDecorator(): MethodDecorator {
    return (target, key) => {
        // 动态配置metadata
        Reflect.defineMetadata('meta', 'instance method', target, key);
    }
}

function staticMethodDecorator(): MethodDecorator {
    return (target, key) => {
        // 动态配置metadata
        Reflect.defineMetadata('meta', 'class method', target, key);
    }
}

@classDecorator()
class Test2 {
    @staticMethodDecorator()
    public static clsMethod() {
        console.log(1, 'clsMethod');
    }
    @methodDecorator()
    public instMethod() {
        console.log(2, 'instMethod');
    }
}