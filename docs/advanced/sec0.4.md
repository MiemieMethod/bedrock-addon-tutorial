# JS中的函数

假设我们需要反复计算挑战奖励：每轮挑战值3分，额外奖励再加2分。如果在十个位置都抄写同一段计算，后来调整规则时便需要逐一寻找。我们更希望为这段计算起一个名字，在需要时提供参数，再取回结果。这种组织程序的方式便涉及**函数**（**Function**）。

## 定义和调用是两个过程

我们先观察一个完整的例子：

```js
"use strict";

function calculateReward(rounds, bonus = 2) {
    const rewardPerRound = 3;
    return rounds * rewardPerRound + bonus;
}

console.log(calculateReward(4));
console.log(calculateReward(4, 0));
console.log(calculateReward(2, 5));
```

输出依次为`14`、`12`和`11`。`function`开始函数声明，紧随其后的是函数名，再后面的圆括号描述参数，花括号中的内容是**函数体**（**Function Body**）。声明函数只是准备好这段可执行过程，并不会在此时自动计算奖励；直到写出`calculateReward(...)`，才发生一次**调用**（**Call**）。

定义处的`rounds`与`bonus`称为**形参**（**Parameter**），调用处的`4`、`0`等具体值称为**实参**（**Argument**）。一次调用会为形参提供本次使用的值。我们可以把函数看作一个按规则计算的柜台：规则相同，每次交入的单据不同，取回的结果也便不同。但这个比喻不能代替代码本身，因为函数也可能改变外部状态、抛出异常，或者根本不提供有意义的返回值。

`bonus = 2`指定默认参数。只有未传入实参或实参为`undefined`时，才使用这个默认值；显式传入0并不会被替换成2，因此第二次调用得到12。这个区别在可选数量、距离等参数中十分重要，因为0经常是一个合法且有意填写的值。

## 返回值与提前结束

**返回**（**Return**）由`return`语句完成。它先计算右侧表达式，再结束当前函数调用，并把结果交给调用位置。`console.log`负责输出，而`return`负责提供结果，两者并不是同一个操作。如果函数只是打印了14而没有返回14，调用方便不能依靠它继续做数值计算。

```js
"use strict";

function describeAmount(amount) {
    if (!Number.isInteger(amount) || amount < 0) {
        return "数量无效";
    }
    return "数量为" + amount;
}

function showMessage() {
    console.log("开始检查");
}

console.log(describeAmount(-1));
console.log(describeAmount(4));
console.log(showMessage());
```

输出依次为`数量无效`、`数量为4`、`开始检查`、`undefined`。第三次调用先执行`showMessage`中的打印，然后外层`console.log`再打印它的返回值。没有执行带表达式的`return`而正常结束的函数，结果就是`undefined`。条件语句下一节会继续学习，此处先把第一个分支理解为“遇到无效输入便提前退出”。

`return`与表达式之间不要换行。若写成独立一行`return`，下一行才写计算，自动分号插入可能使函数提前返回`undefined`。保持`return result;`这样的形式，可以让视觉上的意图与实际语法一致。

## 函数也是一个值

除了函数声明，我们也可以使用**函数表达式**（**Function Expression**）建立函数，再赋给一个绑定。下面的`operation`接收的是函数值，执行时才通过圆括号调用它。

```js
"use strict";

const double = function (value) {
    return value * 2;
};

function applyToScore(score, operation) {
    return operation(score);
}

console.log(applyToScore(6, double));
```

输出为`12`。注意传入的是`double`，不是`double()`；前者交出函数本身，后者会立即调用并交出调用结果。将函数交给另一段代码，由后者在适当时候调用，这种函数通常称为**回调函数**（**Callback Function**）。Minecraft事件订阅便大量使用回调，不过**回调并不天然表示异步**：上面的`operation`就在当前调用中立即执行。

函数声明与函数表达式的可用时机也不同。普通函数声明在所属作用域建立时便完成相应绑定初始化，而赋给`const`的函数表达式需要等执行到初始化之后才能使用。本教程通常把定义写在调用之前，不依靠这种区别组织代码，等到作用域一节再解释原因。

## 参数、对象与职责

函数参数得到的是实参值。如果传入对象，函数可以通过这个对象值修改对象的属性；但只是在函数内把参数重新赋成另一个对象，不会改变调用方变量本身。我们应当在函数名称与说明中明确是否会修改传入的数据，否则一次看似普通的“计算”也可能悄悄改变后面的行为。

初学时，建议先把纯粹的计算与游戏接口调用分开。计算函数只接收数字、字符串或普通对象，并返回结果；外层代码负责读取玩家状态、调用计算函数，再把结果写回世界。这样即使没有启动Minecraft，我们也可以验证奖励公式是否正确。能够在Node.js执行计算函数，并不证明外层的游戏接口已经在游戏中通过测试。

请编写`remainingItems(total, used)`，使合法输入返回剩余数量，若`used`大于`total`则返回0。先测试`remainingItems(10, 3)`应为7，再测试`remainingItems(2, 5)`应为0，最后说明负数是否允许，以及为什么应在真正使用前明确这项约定。

参考：[MDN：函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)、[ECMAScript：函数定义](https://tc39.es/ecma262/#sec-function-definitions)。

相关内容：[上一节：了解不同的数据类型](./sec0.3.md) · [下一节：JS中的对象](./sec0.5.md)
