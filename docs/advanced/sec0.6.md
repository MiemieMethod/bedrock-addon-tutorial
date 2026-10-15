# 布尔运算与条件语句

我们已经能够记录分数，也能够把奖励计算写成函数。不过，游戏逻辑通常还包含选择：分数足够时给予奖励，否则提醒继续挑战；玩家已经领取时，不再重复发放。描述这些选择需要使用**条件语句**（**Conditional Statement**），而条件本身往往由比较和布尔运算组成。

## 根据条件选择路径

先观察下面这个独立示例：

```js
"use strict";

const score = 12;
const alreadyClaimed = false;

if (alreadyClaimed) {
    console.log("已经领取");
} else if (score >= 10) {
    console.log("可以领取");
} else {
    console.log("继续挑战");
}
```

结果只有一行`可以领取`。程序先检查`alreadyClaimed`，发现它为假，再检查`score >= 10`。第二个条件为真，于是执行对应语句块，其后的`else`不再执行。我们可以把这一串结构理解为按顺序排好的分流路口：在同一条`if...else if...else`链中，只会进入第一个满足条件的分支。

如果把两个条件改写为两个独立的`if`，它们就会分别判断，可能都执行。因此，分支结构不仅影响排版，还表达条件之间是否互斥。本教程即使某个分支只有一条语句，也保留花括号，以便以后增加日志或其他操作时，不至于误以为后续语句也在分支内部。

## 比较与布尔运算

`>`、`>=`、`<`、`<=`分别比较大小。相等判断优先使用`===`，不等判断使用`!==`，它们不会先把不同类型的操作数转换为同一类型。因此`10 === "10"`是`false`。`==`与`!=`具有另外的类型转换规则，只有明确需要并理解这些规则时才使用；不要把比较运算写成赋值用的`=`。

多个条件可以通过**逻辑与**（**Logical AND**）`&&`、**逻辑或**（**Logical OR**）`||`和**逻辑非**（**Logical NOT**）`!`组合。例如，允许领取的条件可以写为`score >= 10 && !alreadyClaimed`，其含义是两个要求同时满足。注意，数学中的连续比较不能直接照搬：`0 <= score <= 10`会先得到一个布尔值，再拿它与10比较。正确写法是`score >= 0 && score <= 10`。

```js
"use strict";

const score = 12;
const alreadyClaimed = false;
console.log(score >= 10 && !alreadyClaimed);
console.log(score < 0 || score > 100);
console.log(10 === "10");
console.log(!(score >= 10));
```

输出依次为`true`、`false`、`false`、`false`。复杂条件可以使用圆括号明确分组，例如`(isMember || isGuest) && hasTicket`。不要为了少写括号而让读者反复查运算符优先级。

## 真值、假值与短路

`if`会把条件结果按规则解释为真或假。`false`、`0`、`-0`、`0n`、`""`、`null`、`undefined`和`NaN`属于常见**假值**（**Falsy Value**）；普通对象、空对象、空数组和非空字符串则是真值。浏览器有极少数历史兼容特例，本教程的游戏数据无需依赖它们。

因此，检查数组是否有元素应该写`items.length > 0`，而不是`if (items)`。同样地，数量0可能是合法值，不能简单因为它是假值便当作“用户没有填写”。

`&&`和`||`还具有**短路求值**（**Short-circuit Evaluation**）行为：左侧已经足以决定返回哪个操作数时，右侧不会执行。它们返回的是操作数的值，并不保证返回布尔值。请观察：

```js
"use strict";

function announce() {
    console.log("执行了右侧");
    return "完成";
}

console.log(false && announce());
console.log("已有结果" || announce());
console.log(0 || 5);
console.log(0 ?? 5);
```

输出为`false`、`已有结果`、`5`、`0`，不会出现`执行了右侧`。**空值合并运算符**（**Nullish Coalescing Operator**）`??`只在左侧为`null`或`undefined`时使用右侧，适合保留0、空字符串和`false`的场景。它与`&&`或`||`直接混写时需要相应括号；更好的做法通常是把不同判断拆开，先说明每个值代表什么。

## 选择值与多种分支

若只是根据条件选择两个值，可以使用**条件运算符**（**Conditional Operator**）`condition ? first : second`，例如`const label = score >= 10 ? "达标" : "未达标";`。它是表达式，能够产生一个值；而`if`适合承载较长的执行过程。多个三元表达式嵌套往往难读，不要把完整流程挤成一行。

对于固定的一组状态，还可以使用`switch`，其中`case`按严格相等规则匹配。每个分支通常用`break`结束，避免继续执行后续分支，称为**贯穿**（**Fall-through**）的行为。若确实要让多个状态共用逻辑，可以连续列出它们的`case`，并明确说明意图。分支内声明局部`let`或`const`时，可用额外花括号建立各自作用域。

## 检查边界

请把开头例子的分数分别改为9、10、11，并把领取状态分别改为真和假。分数为10且未领取时，应允许领取；已经领取时，无论分数多少，都应显示`已经领取`。我们特意测试阈值两侧与阈值本身，因为`>`和`>=`之间的一点差异，经常就是实际玩法中的错误来源。

再用`Number.isFinite(score)`和`score >= 0`为分数增加有效性检查。若希望只接受整数，还应加入`Number.isInteger(score)`。先判断输入是否合法，再判断奖励条件，能够避免异常数据进入原本正确的分支流程。

参考：[MDN：控制流与错误处理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)、[MDN：表达式与运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)、[ECMAScript：if语句](https://tc39.es/ecma262/#sec-if-statement)。

相关内容：[上一节：JS中的对象](./sec0.5.md) · [下一节：循环语句与跳转语句](./sec0.7.md)
