# 了解不同的数据类型

在上一节中，同样使用加号，`3 + 2`得到5，而`"3" + 2`却得到`"32"`。这说明，判断程序行为时只看字符长得像什么还不够，我们还必须知道一个值属于哪种**数据类型**（**Data Type**）。本节先认识常见类型，再说明它们在赋值和比较时的差异。

## 观察值的类型

我们先将下面的代码作为独立模块运行。`typeof`是一个运算符，它为操作数给出一个表示类型类别的字符串。

```js
"use strict";

console.log(typeof 12);
console.log(typeof "12");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof function () {});
```

输出依次为`number`、`string`、`boolean`、`undefined`、`object`、`object`、`object`、`function`。其中有两个位置尤其值得注意：`typeof null`由于历史原因得到`"object"`，但`null`并不是对象；数组则确实是一种对象，因此不能通过`typeof value === "array"`判断数组，应该使用`Array.isArray(value)`。

JavaScript的语言类型包含七种**原始类型**（**Primitive Type**）：`Undefined`、`Null`、`Boolean`、`Number`、`BigInt`、`String`、`Symbol`，以及`Object`对象类型。函数属于对象，不过`typeof`针对可调用对象另外返回`"function"`。由此可见，`typeof`的结果是方便使用的分类标签，不能不加区分地当作规范中的类型清单。

## 数值、字符串与布尔值

**数值**（**Number**）既可表示整数，也可表示小数，还包含`Infinity`、`-Infinity`和`NaN`这样的特殊值。`NaN`表示非数值的数值结果，比较特别的是，它与自身进行严格相等比较也得到`false`，因此我们应使用`Number.isNaN`判断。数值计算还受到浮点精度限制，不能把所有数学整数与实数都视作可以精确存储。

**大整数**（**BigInt**）用于任意精度整数，字面量可写成`12n`。它不能直接与普通数值混合做算术，例如`12n + 1`会报错，必须有意识地选择相同类型。游戏接口是否接受BigInt则完全取决于接口约定，不能因为语言支持它，就把要求Number的坐标或数量改成BigInt。**符号**（**Symbol**）则可以产生独一无二的标识值，常用于对象属性键；当前阶段知道它存在即可。

**字符串**（**String**）表示文本，可用单引号或双引号包围。引号属于语法边界，不属于字符串本身；若文本包含同种引号，需要转义或改用另一种引号。字符串不可原地修改某个位置的字符，诸如`replace`这样的操作会产生新字符串。它的`length`计算UTF-16码元数，因此部分表情符号的长度是2，不能始终当作屏幕上看到的字符数量。

**布尔值**（**Boolean**）只有`true`和`false`，用于表示判断结果。字符串`"false"`仍然是一段非空文本，在条件判断中反而会转换为真；如果某份输入规范使用文字表示开关，就应明确解释允许的文字值，而不是直接使用`Boolean(input)`。

## 空值与未定义值

`undefined`常见于声明后未赋值的变量、不存在的对象属性，以及没有明确返回值的函数；`null`则常用于主动表达“这里没有对象”或“目前没有选择”。它们的业务含义需要由我们自己的约定或接口文档说明，不能见到任何空缺都随意替换。

```js
"use strict";

const record = { target: null, score: 0, title: "" };
console.log(record.target === null);
console.log(record.missing === undefined);
console.log(record.score === 0);
console.log(record.title === "");
console.log(Array.isArray([]));
console.log(Number.isNaN(Number("stone")));
```

六行输出均为`true`。其中0表示已知的零分，空字符串表示长度为零的文本，`null`表示我们主动记录的空目标，而不存在的`missing`属性读取后得到`undefined`。四种值虽然可能在条件中表现为假，但承载的信息并不相同。

## 赋值时到底复制了什么

原始值按值使用；对象值则标识一个对象。我们将一个对象值赋给另一个变量时，两个名字会指向同一个对象，而不会自动复制出一个外观相同的新对象：

```js
"use strict";

let oldScore = 3;
let newScore = oldScore;
newScore += 2;

const first = { score: 3 };
const second = first;
second.score += 2;

console.log(oldScore, newScore);
console.log(first.score, second.score);
console.log(first === second);
console.log({ score: 5 } === { score: 5 });
```

输出为`3 5`、`5 5`、`true`、`false`。前两个数值互不影响，后两个名字访问的是同一个对象。最后一行则创建了两个独立对象，尽管属性内容相同，它们的身份依旧不同。这也是严格相等不能直接承担“深度比较两个数据结构是否完全一致”这项任务的原因。

这里常被描述为“复制引用”，但不要进一步误解为JavaScript函数采用按引用传参。函数调用仍然传递值，只是这个值本身可能标识一个对象；函数内重新给参数赋另一个对象，不会自动让调用方的变量改指新对象。

请尝试预测`typeof NaN`、`Array.isArray({})`和`null === undefined`，再运行验证，结果分别为`"number"`、`false`和`false`。如果得到这些结果的理由也能解释清楚，便可以继续学习如何把计算封装到函数中。

参考：[MDN：数据类型与数据结构](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)、[ECMAScript：语言类型](https://tc39.es/ecma262/#sec-ecmascript-language-types)。

相关内容：[上一节：声明、赋值与算术](./sec0.2.md) · [下一节：JS中的函数](./sec0.4.md)
