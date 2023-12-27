"use strict";
// 通过给类、方法等定义元数据
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// 设置
console.log('################################');
console.log('元数据的手动挂载');
require("reflect-metadata");
class Test {
    static clsMethod() { }
    instMethod() { }
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
console.log('################################');
console.log('装饰器挂载元数据');
function classDecorator() {
    return target => {
        // 动态配置metadata
        Reflect.defineMetadata('meta', 'class', target);
    };
}
function methodDecorator() {
    return (target, key) => {
        // 动态配置metadata
        Reflect.defineMetadata('meta', 'instance method', target, key);
    };
}
function staticMethodDecorator() {
    return (target, key) => {
        // 动态配置metadata
        Reflect.defineMetadata('meta', 'class method', target, key);
    };
}
let Test2 = class Test2 {
    static clsMethod() {
        console.log(1, 'clsMethod');
    }
    instMethod() {
        console.log(2, 'instMethod');
    }
};
__decorate([
    methodDecorator(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Test2.prototype, "instMethod", null);
__decorate([
    staticMethodDecorator(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Test2, "clsMethod", null);
Test2 = __decorate([
    classDecorator()
], Test2);
