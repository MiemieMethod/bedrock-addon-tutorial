# 了解自调用函数与闭包

在作用域一节中，我们知道了内部函数可以访问外层绑定。接下来考虑一个更具体的问题：外层函数已经执行完毕，内部函数却被返回给其他代码，那么内部函数还能否继续访问这些绑定？答案是可以。这种行为构成了JavaScript中非常重要的**闭包**（**Closure**）机制。

## 一个会记住数值的函数

```js
"use strict";

function createCounter(initialValue) {
    let value = initialValue;
    return function (amount = 1) {
        value += amount;
        return value;
    };
}

const first = createCounter(0);
const second = createCounter(10);
console.log(first());
console.log(first(2));
console.log(second());
console.log(first());
```

输出依次为`1`、`3`、`11`和`4`。`createCounter`每次调用都建立自己的局部环境，其中包含一个`value`绑定。返回的函数保留了访问这次调用环境的能力，因此外层调用结束之后，下一次执行内部函数仍然能够读取并修改相同的`value`。

第一与第二个计数器来自两次不同的外层调用，所以各自拥有独立状态。我们不必为了保存这个状态，把`value`放到模块顶层，更不需要创建一个所有玩家都共用的全局变量。函数连同它所关联的词法环境，便形成了我们这里讨论的闭包。

闭包并非只有“返回一个函数”时才产生。函数建立时便会关联相应的词法环境，返回只是让这种关系特别容易观察。事件回调、箭头函数、数组回调都可能访问外部绑定，只是有些访问发生得很快，有些要等到很久以后。

## 捕获的是绑定，不是固定快照

```js
"use strict";

let score = 2;
const read = () => score;
const snapshot = score;
score = 8;

console.log(read());
console.log(snapshot);
```

输出为`8`和`2`。`read`以后读取的是同一个`score`绑定的当前值，而`snapshot`在赋值时保存了当时的数值。若我们需要保留“事件发生那一刻”的值，就应在当时明确复制所需数据，而不能以为把读取放进回调便已经完成拍照。

对于对象，还需多考虑一层：把对象值保存到新绑定只会保留同一个对象的身份，内部属性仍可能改变。需要坐标快照时，可以复制`x`、`y`、`z`等必要数值；需要稍后操作实体时，则应按API规则重新检查实体是否仍然有效。闭包能够保留JavaScript引用，并不保证游戏中的实体永远存在。

## 循环中的独立绑定

```js
"use strict";

const readers = [];
for (let index = 0; index < 3; index += 1) {
    readers.push(() => index);
}
console.log(readers.map((read) => read()).join(", "));

const oldReaders = [];
for (var oldIndex = 0; oldIndex < 3; oldIndex += 1) {
    oldReaders.push(() => oldIndex);
}
console.log(oldReaders.map((read) => read()).join(", "));
```

输出为`0, 1, 2`和`3, 3, 3`。普通`for`初始化中的`let`会为迭代提供相应的独立绑定，因此每个回调保留了自己那一轮的`index`；`var`只有那个共享绑定，等循环结束后再调用，大家读取到的便都是3。这不是箭头函数忽然改变了规则，而是两个循环提供的词法环境不同。

实际开发中，给一批按钮或一批玩家创建回调时，就可能遇到这种现象。使用`let`、`const`配合合适的循环，或者通过函数参数建立明确的独立环境，通常比事后修补索引更可靠。

## 立即执行函数表达式

本节标题中的“自调用函数”通常指**立即执行函数表达式**（**Immediately Invoked Function Expression**，**IIFE**）。严格地说，它不是函数自己在内部调用自己，而是定义表达式之后立即调用；后者也不同于函数递归调用。

```js
"use strict";

const counter = (() => {
    let value = 0;
    return {
        increase() {
            value += 1;
            return value;
        },
        read() {
            return value;
        }
    };
})();

console.log(counter.increase());
console.log(counter.read());
console.log(counter.value);
```

输出为`1`、`1`与`undefined`。外层圆括号把函数作为表达式，最后的`()`立即调用它。返回的对象暴露两个方法，两个方法共享内部的`value`绑定；对象本身并没有`value`属性，所以直接读取该属性得不到内部数值。

IIFE可以限制临时名字的作用域，在传统脚本中尤其常见。现代代码已有块作用域和模块作用域，因此不必给每个文件机械地再套一层IIFE。它依然适合某些一次性初始化，但是否使用应取决于代码结构，而不是把它当作闭包生效的必要开关。

## 生命周期与清理

只要回调仍可被访问，它所需要的外部状态就可能继续存在。事件订阅系统保存了回调，就可能间接保留回调引用的缓存、玩家数据或较大的数组。因此，活动结束时取消监听、任务结束时清除定时任务，不只是“形式完整”，也会影响数据是否能够被回收。

这并不意味着闭包天然造成内存泄漏。正常保存必要状态本来就是它的用途；问题在于状态已经不再需要，仍然存在无意的访问链。一个按玩家ID保存闭包的`Map`，如果玩家离开后从不删除对应项，便可能持续积累数据。清理策略应与创建策略一起设计。

请把第一个计数器扩展为返回`increase`与`reset`两个方法的对象，让它们共享同一个私有数值。创建两个计数器，只重置其中一个，验证另一个不受影响。再解释为什么同一个计数器的两个方法必须共享环境，而两个计数器之间又需要独立环境。

参考：[MDN：闭包](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)、[ECMAScript：函数对象创建](https://tc39.es/ecma262/#sec-ordinaryfunctioncreate)、[ECMAScript：词法环境](https://tc39.es/ecma262/#sec-environment-records)。

相关内容：[上一节：了解类与构造函数](./sec0.13.md) · [下一节：了解异步与承诺](./sec0.15.md)
