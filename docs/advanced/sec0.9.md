# 了解作用域

假设两个不同的挑战都需要一个名为`score`的变量。如果所有名字都挤在同一个位置，它们便很容易互相覆盖。**作用域**（**Scope**）用于规定一个绑定能够在哪里被访问，也决定了遇到同名标识符时，程序究竟读取哪一个值。

## 从内外两个名字开始

```js
"use strict";

const score = 5;
function showRound() {
    const score = 9;
    if (score > 0) {
        const message = "本轮分数";
        console.log(message, score);
    }
    console.log(score);
}

showRound();
console.log(score);
```

输出依次为`本轮分数 9`、`9`和`5`。函数内部的`score`与外部的`score`是两个不同绑定；在内部查找时，较近的同名绑定会遮住较远的绑定，这称为**遮蔽**（**Shadowing**）。离开函数以后，外部的值仍然是5，并没有因为内部声明同名变量而被改写。

`message`使用`const`声明在`if`的花括号内部，只能在相应的**块作用域**（**Block Scope**）及其内部作用域中访问。若把打印`message`的语句搬到`if`之外，会出现`ReferenceError`。这里不是变量里的字符串消失了，而是那个位置无法通过该名字找到这个绑定。

## 词法作用域取决于写在哪里

JavaScript主要采用**词法作用域**（**Lexical Scope**）：函数能够访问哪些外部绑定，取决于函数定义所在的位置，而不是将来从哪里调用它。

```js
"use strict";

const label = "大厅";
function showLabel() {
    console.log(label);
}
function enterRoom() {
    const label = "密室";
    showLabel();
}

enterRoom();
```

结果是`大厅`。`showLabel`定义在外层，因此它沿着自己的词法环境查找`label`，不会因为`enterRoom`调用了它，就转而读取调用者的局部变量。理解这点以后，后面的闭包便不再像一种例外，而是词法作用域在函数离开原位置以后继续发挥作用。

查找标识符时，程序先考虑当前位置的环境，找不到再逐级向外，直到全局环境。这个过程有方向：内部通常可以读取外部允许访问的名字，外部却不能直接走进任意函数读取其局部变量。若需要把内部计算交出去，应使用返回值、对象属性或明确设计的函数接口。

## let、const与var的差别

`let`和`const`受到块作用域约束，`var`通常受到函数作用域约束，不会因为普通`if`块就创建独立绑定。下面故意使用`var`来展示旧代码中的行为：

```js
"use strict";

function inspect() {
    if (true) {
        var oldStyle = 3;
        let blockOnly = 4;
        console.log(blockOnly);
    }
    console.log(oldStyle);
}

inspect();
```

结果为`4`与`3`。`oldStyle`可以在块外但函数内读取，而`blockOnly`不可以。这个差异也是我们在新代码中优先使用`let`和`const`的原因之一：名字的可见范围能更直接地通过代码块看出来。

另一处差异与初始化时机有关。执行到`var`声明之前，相应函数内的绑定通常已经初始化为`undefined`；`let`和`const`则在声明执行前处于**暂时性死区**（**Temporal Dead Zone**，**TDZ**）。这期间即使名字已经被该作用域占用，读取它仍然会报错。

```js
"use strict";

try {
    console.log(value);
    let value = 3;
} catch (error) {
    console.log(error.name);
}
```

输出为`ReferenceError`。`try...catch`在这里捕获运行时抛出的异常，使我们能观察错误类别；它不是建议我们在正常流程中先读一个未初始化变量。所谓**提升**（**Hoisting**）只是解释声明处理的一种说法，不能理解成JavaScript真的把源文件里的某一行剪切粘贴到了最前面。尤其不能把“名字提前被处理”与“值已经可读”混为一谈。

## 模块边界与全局对象

本章使用`.mjs`作为独立实验文件，它按**模块**（**Module**）执行。模块顶层声明属于模块自己的作用域，不会自动把所有变量变成`globalThis`的属性；不同模块之间通过`export`和`import`明确共享绑定。传统浏览器脚本、Node.js的CommonJS文件与ECMAScript模块在顶层行为上存在差异，因此不要用一个环境的偶然结果判断所有JavaScript程序。

Minecraft脚本也使用模块组织代码。我们会从`@minecraft/server`等模块导入游戏提供的接口，并用相对路径导入自己的模块。`import`语法属于语言，而某个模块名能否被解析、可用版本是什么，则由宿主环境和行为包依赖决定。本章不通过创建全局变量来替代模块之间的明确依赖。

变量可见范围与数据存活时间也并非同一件事。函数返回之后，若某个内部函数仍然引用了外部绑定，相关环境就可能继续被保留。反过来，一个对象虽然暂时还存在，也不意味着任何位置都能凭原来的局部名字访问它。这两种问题将在闭包一节汇合。

请在第二个示例中，仅将`showLabel`定义整体移到`enterRoom`内部、局部`label`声明之后，再预测输出。结果会变为`密室`，因为定义位置发生了变化。接着仅把调用搬来搬去，验证调用位置本身并不改变词法查找规则。

参考：[MDN：let与暂时性死区](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)、[MDN：语法与类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)、[ECMAScript：环境记录](https://tc39.es/ecma262/#sec-environment-records)。

相关内容：[上一节：了解位运算](./sec0.8.md) · [下一节：了解this关键字](./sec0.10.md)
