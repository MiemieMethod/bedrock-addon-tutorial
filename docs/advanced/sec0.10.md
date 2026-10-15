# 了解this关键字

在对象一节中，`counter.increase(2)`通过`this.value`修改了计数。现在，我们进一步观察：如果把同一个函数交给另一个对象，或者把它单独取出来调用，`this`是否还是原来的计数器？这个问题的答案与调用方式直接相关。

本节所有例子均按严格模式运行，可分别保存为`.mjs`文件执行。我们先讨论普通函数，下一节再介绍箭头函数的特殊规则。这里的JavaScript `this`也不要与Molang里同名的关键字混淆，它们属于不同语言，具有不同语义。

## 同一个函数，不同的调用者

```js
"use strict";

function readName() {
    return this.name;
}

const first = { name: "小明", readName };
const second = { name: "小红", readName };

console.log(first.readName());
console.log(second.readName());
console.log(first.readName === second.readName);
```

输出依次为`小明`、`小红`、`true`。两个属性保存的是同一个函数值，但在`first.readName()`中，调用表达式提供的接收者是`first`；在`second.readName()`中，接收者则是`second`。函数并没有因为最初写在什么文件中，便永久归属于某个对象。

我们可以把`this`理解为普通函数调用中提供的一个特殊上下文值。对于这里的属性访问调用，点号左侧的对象就是接收者。即使写为`first["readName"]()`，仍然保留相同关系；括号或方括号的外观并不是决定因素，重要的是实际调用表达式如何取得函数并提供接收者。

## 取出方法之后发生了什么

```js
"use strict";

const counter = {
    value: 7,
    inspect() {
        return this;
    }
};

const inspect = counter.inspect;
console.log(counter.inspect() === counter);
console.log(inspect() === undefined);
```

输出为`true`与`true`。赋值只复制了函数值，没有把“从哪个对象取出来”这一调用关系一起打包。严格模式下，普通函数直接调用`inspect()`得到的`this`是`undefined`。如果该函数随后访问`this.value`，便会因为尝试读取`undefined`的属性而抛出错误。

非严格模式中的普通函数调用存在全局对象替换等规则，但本教程不依赖这种行为。ECMAScript模块默认严格；模块顶层的`this`也是`undefined`。浏览器普通脚本顶层、浏览器控制台和Node.js的CommonJS顶层可能表现不同，因此“我在控制台看到`this`是某个对象”不足以推断游戏脚本里的结果。

## 显式指定与固定接收者

普通函数具有`call`、`apply`与`bind`等方法。`call`立即调用函数，第一个参数指定`this`，后续参数逐个传入；`apply`也立即调用，但把后续参数作为数组或类数组提供。`bind`则创建一个新的绑定函数，留待以后调用。

```js
"use strict";

function add(amount) {
    this.value += amount;
    return this.value;
}

const counter = { value: 1 };
console.log(add.call(counter, 2));
console.log(add.apply(counter, [3]));

const boundAdd = add.bind(counter);
const other = { value: 100, boundAdd };
console.log(other.boundAdd(4));
console.log(counter.value, other.value);
```

输出为`3`、`6`、`10`、`10 100`。最后一次虽然写成`other.boundAdd(4)`，绑定函数仍然把普通调用的`this`固定为原来的`counter`。再次使用`call`也不能重新指定这个已绑定的接收者。另一方面，能够作为构造函数的绑定函数若通过`new`调用，会采用构造调用的规则；此时不能把“永远固定”作为不加前提的结论。

## 回调中的this

向另一个函数或游戏事件订阅传递方法时，最容易丢失接收者。例如传入`counter.increase`，通常只是把函数值交出去，不能假设将来仍会以`counter.increase(...)`的形式调用。回调中的`this`究竟是什么，要看调用方是否显式指定，以及对应API如何约定。

如果我们确实需要原对象，可以预先保存`const callback = counter.increase.bind(counter);`，订阅时交出`callback`。以后取消订阅也应使用同一个函数对象。每次调用`bind`都会创建新函数，因此“订阅时绑定一次，取消时再绑定一次”虽然文字相同，函数身份却不同，可能无法取消原来的监听。

另一种方式是使用包装函数，明确调用`counter.increase(...)`；下一节学习箭头函数后，这种写法会更加简洁。对只需要数据的处理，也可以直接把对象当作普通参数传入，减少对隐式上下文的依赖。

## 与构造调用的关系

当普通构造函数通过`new`调用时，语言会创建并准备一个新对象，把它作为函数执行中的`this`，再根据返回规则给出实例。类的构造函数沿用相应的构造机制，细节将在[类与构造函数](./sec0.13.md)中展开。我们现在只需建立一个判断顺序：先识别它是不是箭头函数或绑定函数，再观察是否为构造调用，最后分析普通调用提供的接收者。

请给第一个示例增加第三个对象，并把`first.readName`赋给它。预测以第三个对象调用时会显示哪个名字。再把方法存入独立变量，通过`call(first)`调用，验证恢复接收者后可以重新得到`小明`。通过这些最小实验，我们便能把`this`的含义落实到调用表达式，而不是凭函数“属于谁”的直觉猜测。

参考：[MDN：this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)、[ECMAScript：普通调用的this绑定](https://tc39.es/ecma262/#sec-ordinarycallbindthis)、[ECMAScript：绑定函数对象](https://tc39.es/ecma262/#sec-bound-function-exotic-objects)。

相关内容：[上一节：了解作用域](./sec0.9.md) · [下一节：了解箭头函数](./sec0.11.md)
