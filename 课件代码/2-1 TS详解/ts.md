## TypeScript 详解
### 一、TS基础概念
#### 1. TS的本质？
a. 对比原理
* 他是Javascript的一个超集，在原有的语法基础上，添加了可选的静态类型和基于类的面向对象编程
> 类型检测：
  JS：弱类型，无静态类型选项
  TS：弱类型，支持了对于动态和静态类型的检测和拦截

> 自主检测：
  JS：runtime 报错
  TS：编译期间，主动发现并且报出错误

> 运行流程：
  JS：直接在浏览器中运行
  TS：依赖编译，依赖工程化体系

> 面向项目：
  JS：脚本化语言，面向单一简单场景
  TS：面向解决大型复杂应用，有利于代码设计以及维护

> 复杂特性：
  TS：模块化、接口、泛型

b. 安装运行
```js
    npm install -g typescript
    tsc -v

    tsc test.ts // => test.js => 浏览器的执行环境中

    // 面试点：TS所有的类型检测、语法检测的阶段 => 编译时
```

#### 2. TS基础类型与写法
* boolean string number array null undfined
```ts
    // es
    let isEnable = true;
    let class = 'zhaowa';
    let classNum = 2;
    let u = undefined;
    let n = null;
    let classArr = ['basic', 'execute'];

    // TS
    let isEnable: boolean = true;
    let class: string = 'zhaowa';
    let classNum: number = 2;
    let u: undefined = undefined;
    let n: null = null;
    let classArr: string[] = ['basic', 'execute'];
    let classArr: Array<string> = ['basic', 'execute'];
```

* tuple - 元组
```ts
    let tupleType: [string, boolean];
    tupleType = ['zhaowa', true];
```

* enum - 枚举
```ts
    // 数字类枚举 - 默认从零开始，从上往下依次递增
    enum Score {
        BAD,
        NG,
        GOOD,
        PERFECT,
    }

    let score: Score = Score.BAD;

    // 字符串类型枚举
    enum Score {
        BAD = 'BAD',
        NG = 'NG',
        GOOD = 'GOOD',
        PERFECT = 'PERFECT',
    }

    // 反向映射
    let score = Score.BAD;
    let scoreName = Score[0];  // BAD
    let scoreName = Score['BAD'];  // 0

    // 异构枚举 - 梳理字符串 => 数字
    enum Enum {
        A,
        B,
        C = 'C',
        D = 'D',
        E = 6,
        F,
    }
    // 面试题：指出异构的枚举值，并手写转化JS实现
    let Enum;
    (function(Enum) {
        // 正向
        Enum['A'] = 0;
        Enum['B'] = 1;
        Enum['C'] = 'C';
        Enum['D'] = 'D';
        Enum['E'] = 6;
        Enum['F'] = 7;

        // 反向
        Enum[0] = "A";
        Enum[1] = "B";
        Enum[6] = "E";
        Enum[7] = "F";
    })(Enum || (Enum = {}))
```

* any unknown void
```ts
    // any - 绕过所有的类型检查 => 类型检测和编译筛查都全部失效
    let anyValue: any = 123;

    anyValue = 'anyValue';
    anyValue = false;

    let value1: boolean = anyValue;

    // unknown - 绕过的是赋值检查 => 禁止更改传递
    let unknownValue: unknown;

    unknownValue = true;
    unknownValue = 123;
    unknownValue = 'unknownValue';

    let value1: unknown = unknownValue; // OK
    let value1: any = unknownValue; // OK
    let value1: boolean = unknownValue; // NOK

    // void - 声明函数无返回值
    function voidFunction(): void {
        console.log('void function');
    }

    // never - 函数永不返回
    function error(msg: string): never {
        throw new Error(msg);
    }

    function longlongloop(): never {
        while(true) {
            // 业务逻辑
        }
    }
```

* Object | object | {} - 对象
```ts
    // Object - 所有Object类的实例类型
    // 1. 有值
    // 2. toString
    // 3. 值对象属性与Object接口中属性冲突的时候，TSC会提示错误的
    function func1(x: Object) {
        // ...
    }

    func1({
        name: 'zhaowa'
    })

    const obj1: Object = {
        toString() {
            return 'zhaowa'
        }
    }

    // object - 表示非原始类型
    // 1. 没有值
    // 2. 不具备hasOwnProperty
    // 3. 如果值对象属性与Object接口中属性冲突，TSC不会提示错误

    // 空对象 {} - 描述一个没有任何成员的对象
    // 在赋予属性前，任何访问该对象的任意属性的操作，都会被TSC抛出编译错误
    const obj = {};

    obj.name = 'zhaowa'; // prop does not exist on type {}
```

### 二、接口 - interface
* 对行为的一种抽象，具体的行为由类实现

```ts
    interface Class {
        name: string;
        time: number;
    }

    let zhaowa: Class = {
        name: 'ts',
        time: 2
    }

    // 只读 & 任意
    interface Class {
        readonly name: string;
        time: number;
    }

    // 面试题 - 只读和ES的引用是不同的 < = > const => 执行阶段
    let arr: number[] = [1, 2, 3, 4];
    let ro: ReadOnlyArray<number> = arr;

    ro[0] = 12;
    ro.push(5);
    ro.length = 100;
    ro = arr;
    // ERROR

    interface Class {
        readonly name: string;
        time: number;
        [propName: string]: string | number;
    }
    const c1: Class = {name: 'JS', time: 1}
    const c2: Class = {name: 'browser', time: 1}
    const c1: Class = {name: 'ts', time: 2, level: 2}
```

### 三、交叉类型  - &
```ts
    interface A { x: D }
    interface B { x: E }
    interface C { x: F }

    interface D { d: boolean }
    interface E { e: string }
    interface F { f: number }

    type ABC = A & B & C

    let abc: ABC = {
        x: {
            d: false,
            e: 'zhaowa',
            f: 5
        }
    }

    // 合并冲突
    interface A {
        c: string,
        d: string
    }
    interface B {
        c: number,
        e: string
    }
    type AB = A & B; 
    // {c: never, d: string, e: string} {c: string | number, d: string, e: string} 
    let ab: AB = {
        d: 'class',
        e: 'zhaowa'
    }
     // => 且关系 => c: never
```

#### 四、断言 - 类型的声明、转换（开发者和编译器的告知交流）
* 编译状态产生的声明作用
```ts
    let anyValue: any = 'hi zhaowa';
    let anyLength: number = (<string>anyValue).length;
    let anyLength: number = (anyValue as string).length;

    type ClassTime = () => number;

    // 优化 完整写法
    const start = (classTime: ClassTime | undefined) => {
        let num = classTime!() // 具体类型待定，但是确认是非空
    }
```

#### 五、类型守卫 - 保障在语法规定的范围内，额外的确认
```ts
    interface Teacher {
        name: string,
        courses: string[],
        score: number
    }
    interface Student {
        name: string,
        startTime: number,
        score: string
    }

    type Class = Teacher | Student

    // in - 是否包含某种属性
    function startCourse(cls: Class) {
        if('courses' in cls) {
            // 老师
        }
        if('startTime' in cls) {
            // 学生
        }
    }

    // typeof / instanceof
    function startCourse(cls: Class) {
        if(typeof cls.score === 'number') {
            // 老师
        }
        if(typeof cls.score === 'string') {
            // 学生
        }
    }

    // 优化
    class Teacher {}
    class Student {}
    function startCourse(cls: Class) {
        if(cls instanceof Teacher) {
            // 老师
        }
        if(cls instanceof Student) {
            // 学生
        }
    }
```

#### 六、TS进阶方案
#### 1. 函数重载
```ts
    class Class {
        start(name: number, score: number): number;
        start(name: string, score: string): string;
        start(name: string, score: number): number;
        start(name: Combinable, score: Combinable) {
            if (typeof name === 'number' && typeof score === 'number') {
                // 处理
            }
            if (typeof name === 'number' && typeof score === 'string') {
                // 处理
            }
            if (typeof name === 'string' && typeof score === 'number') {
                // 处理
            }
        }
    }
```

#### 2. 泛型 - 重用
```ts
    function startClass <T, U>(name: T, score: U): T {
        // 逻辑
    }
    function startClass <T, U>(name: T, score: U): string {
        // 逻辑
    }
```

#### 3. 装饰器 - decorator
```ts
    function Zhaowa (target: Function): void {
        target.prototype.startClass = function(): void {
            // 逻辑
        }
    }

    @Zhaowa
    class Course {
        constructor() {
            // 业务逻辑
        }
    }

    // #########################
    function nameWrapper(target: string | number, key: string): void {
        Object.defineProperty(target, key, {})
    }
    class Course {
        constructor() {
            // 业务逻辑
        }

        @nameWrapper
        public name: string;
    }
```

eventEmit
metadata

```ts
// 补充
// readonly ｜ partial | required | omit | pick
// partial - 可选属性，但不允许添加interface中不存在的属性
interface Class {
    name: string,
    time: number,
    department: string,
}

type zhaowa = Partial<Class>
// type zhaowa = Required<Class>

// type zhaowa = {
//     name?: string | undefined,
//     time?: number | undefined,
//     department?: string | undefined,
// }

// omit
interface Student {
    name: string,
    age: number,
    score: number
}

type PickStudent = Pick<Student, 'name' | 'score'>;
type OmitStudent = Omit<Student, 'age'>;
```