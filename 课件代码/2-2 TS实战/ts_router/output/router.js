"use strict";
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
var methods_1 = require("./decorators/methods");
var path_1 = require("./decorators/path");
var User = (function () {
    function User() {
    }
    User.prototype.info = function () {
        return '用户yy';
    };
    User.prototype.login = function () {
    };
    User.prototype.exit = function () {
    };
    __decorate([
        methods_1.httpGet,
        path_1.path('/user/info'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "info", null);
    __decorate([
        methods_1.httpPost,
        path_1.path('/user/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "login", null);
    __decorate([
        methods_1.httpGet,
        path_1.path('/user/exit'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "exit", null);
    return User;
}());
exports.default = (function (app) {
    var user = new User();
    for (var methodName in user) {
        var method = user[methodName];
        if (typeof method !== 'function')
            break;
        var httpMethod = Reflect.getMetadata(methods_1.httpMethodKey, user, methodName);
        var path_2 = Reflect.getMetadata(path_1.pathKey, user, methodName);
        app[httpMethod](path_2, method);
    }
});
//# sourceMappingURL=router.js.map