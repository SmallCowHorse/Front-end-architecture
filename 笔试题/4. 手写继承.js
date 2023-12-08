// 原型继承
function Parent(name) {
  this.name = name;
  this.c = "parent";
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

// new Child()

// 1. child 不能传参
// 2. 如果 Parent 有属性是引用类型，一旦修改了，所有都受影响。
function Parent(name) {
  this.name = name;
  this.c = "parent";
  this.namelist = ["lu", "yi"];
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(sex) {
  this.sex = sex;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const c1 = new Child();
const c2 = new Child();

c1.namelist.pop();

console.log(c2.namelist);

// ----------------------------------------------------------------------------

// 构造函数继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name) {
  Parent.call(this, name);
}

// ----------------------------------------------------------------------------

// 组合继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name) {
  Parent.call(this, name);
}

// 问题：我只想构建一个 原型链的关系。
Child.prototype = new Parent();

Child.prototype.constructor = Child;

// ----------------------------------------------------------------------------

// 寄生组合式继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name) {
  Parent.call(this, name);
}

// 问题：我只想构建一个 原型链的关系。
// Child.prototype = Object.create(Parent.prototype);
Child.prototype = inherit(Parent.prototype);
Child.prototype.constructor = Child;
