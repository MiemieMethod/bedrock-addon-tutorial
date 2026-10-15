# 了解类与构造函数

前面我们创建过一个计数器对象，其中既有当前数值，也有增加数值的方法。如果每位玩家都需要一个相互独立的计数器，当然可以反复写对象字面量，但更方便的做法是集中描述这类对象如何产生、具有哪些共同操作。JavaScript中的**类**（**Class**）与**构造函数**（**Constructor**）便用于组织这样的逻辑。

## 先创建两个独立实例

```js
"use strict";

class Counter {
    constructor(name, initialValue = 0) {
        this.name = name;
        this.value = initialValue;
    }

    increase(amount = 1) {
        this.value += amount;
        return this.value;
    }
}

const first = new Counter("小明", 2);
const second = new Counter("小红");
first.increase(3);

console.log(first.name, first.value);
console.log(second.name, second.value);
console.log(first.increase === second.increase);
```

输出为`小明 5`、`小红 0`和`true`。`class Counter`声明类，`constructor`描述新对象初始化时的操作，`new Counter(...)`创建一个**实例**（**Instance**）。两次构造调用得到两个对象，因此修改第一个实例的`value`不会改变第二个实例的数值。

最后一个结果可能令人意外：两个实例的方法为什么严格相等？因为这里的`increase`不是在每次构造时单独创建，而是放在共同的原型对象上，由实例通过属性查找获得。数据可以各自独立，方法却可以共享，二者并不矛盾。

## 原型链上的属性查找

**原型**（**Prototype**）可以理解为一个对象在自身找不到属性时继续查找的另一个对象。连续的这种联系构成**原型链**（**Prototype Chain**）。对普通的`Counter`实例而言，其直接原型通常是`Counter.prototype`；该原型上保存了前面定义的实例方法。

```js
"use strict";

class Counter {
    constructor() {
        this.value = 0;
    }
    increase() {
        this.value += 1;
    }
}

const counter = new Counter();
console.log(Object.getPrototypeOf(counter) === Counter.prototype);
console.log(Object.hasOwn(counter, "value"));
console.log(Object.hasOwn(counter, "increase"));
console.log("increase" in counter);
```

四行结果依次为`true`、`true`、`false`、`true`。`Object.hasOwn`只检查对象自己的属性，而`in`还会考虑原型链。我们借此便能分清：一个属性能够访问，并不意味着它直接存放在当前对象上。如果目标旧环境尚不支持`Object.hasOwn`，可采用`Object.prototype.hasOwnProperty.call(counter, "value")`的等价自有属性检查。

普通属性读取沿链查找，给实例的普通可写数据属性赋值通常则会更新或创建实例自身的属性，不会简单地把原型对象一起改写。涉及访问器、只读描述符等情况时还存在其他规则，因此不应把原型概括成“把父对象复制一份”。尤其要避免在共享原型上放一个会被所有实例共同修改的数组，却误以为每个实例有独立数组。

## 普通构造函数的写法

在类语法出现之前，人们常使用普通函数配合`prototype`实现相似的结构：

```js
"use strict";

function Counter(initialValue) {
    this.value = initialValue;
}
Counter.prototype.increase = function (amount) {
    this.value += amount;
    return this.value;
};

const counter = new Counter(2);
console.log(counter.increase(3));
console.log(counter instanceof Counter);
```

输出为`5`与`true`。普通情况下，`new`会创建一个对象，设置其原型，再以该对象作为`this`执行构造函数，最后返回实例。如果构造函数显式返回了另一个对象，返回结果可以被那个对象替代；初学阶段的构造函数通常不需要这样设计。

类构造函数必须通过`new`调用，普通函数则可能被误当作普通调用，所以新代码使用类语法往往更能表达意图。类内部自动采用严格模式，类方法通常不可枚举，类声明也不能在初始化前使用。因此类虽然建立在原型机制之上，却不是在所有细节上都能机械替换成几行旧式函数代码。

## 继承与静态方法

```js
"use strict";

class Counter {
    constructor(name) {
        this.name = name;
        this.value = 0;
    }
    increase(amount) {
        this.value += amount;
        return this.value;
    }
}

class BonusCounter extends Counter {
    constructor(name, multiplier) {
        super(name);
        this.multiplier = multiplier;
    }
    increase(amount) {
        return super.increase(amount * this.multiplier);
    }
    static describe() {
        return "带倍率的计数器";
    }
}

const counter = new BonusCounter("小明", 2);
console.log(counter.increase(3));
console.log(counter instanceof Counter);
console.log(BonusCounter.describe());
```

输出为`6`、`true`和`带倍率的计数器`。`extends`建立继承关系，派生类构造函数中的`super(name)`调用父类构造过程，之后才能使用`this`。`super.increase(...)`复用父类的方法逻辑，同时仍以当前实例为接收者。`static`方法属于类本身，所以这里使用`BonusCounter.describe()`调用，而不是从实例调用。

继承适合表达确实存在的“是一种”关系，但不必为了共享几行代码就建立多层继承。有时让对象保存另一个对象，再委托它完成工作，会更简单。类也不是访问控制的万能机制：以下划线开头的属性仍然是普通属性；语言提供`#value`这样的私有字段时，才具有对应的私有访问规则，并需确认目标引擎支持。

最后要注意，类实例方法依旧受上一节的`this`调用规则约束，传出方法时并不会自动绑定。Minecraft提供的类还可能由引擎创建，构造函数是否公开、是否允许继承，都应以API文档为准，不能看到类型名称便自行`new`一个实体。

请给计数器加入`reset()`，只重置当前实例，再创建两个实例验证彼此独立。随后增加`history`数组，并把它初始化在构造函数中，比较与放在原型上的区别。这个练习可以同时检查实例数据、共享方法和共享可变对象之间的边界。

参考：[MDN：使用类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes)、[ECMAScript：类定义](https://tc39.es/ecma262/#sec-class-definitions)、[ECMAScript：普通对象内部方法](https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots)。

相关内容：[上一节：了解字符串模板](./sec0.12.md) · [下一节：了解自调用函数与闭包](./sec0.14.md)
