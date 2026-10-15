# 声明、赋值与算术

上一节中，我们用`score`记录分数，又通过`score = score + 2`改变分数。我们已经观察到了结果，但如果希望把这种写法可靠地应用到附加包中，还需要回答两个问题：这个名字是在什么时候产生的？以后又能否让它表示另一个值？

## 声明与初始化

为后续代码引入一个名字的过程称为**声明**（**Declaration**），第一次为这个绑定提供值的过程称为**初始化**（**Initialization**）。下面这段完整代码可以独立运行：

```js
"use strict";

const rewardPerRound = 3;
let completedRounds = 2;
let totalReward;

completedRounds = completedRounds + 1;
totalReward = completedRounds * rewardPerRound;

console.log(completedRounds);
console.log(totalReward);
```

两行输出依次为`3`与`9`。`const rewardPerRound = 3`创建了一个绑定并立即初始化为3；`let totalReward`也创建了绑定，执行到该声明之后，它的值为`undefined`，直到后续赋值才变为9。这里不要把“未提供初始化表达式”误解为“自动得到0”，否则在进行算术时很容易得到意料之外的结果。

`let`声明的绑定允许重新赋值，而`const`声明的绑定不能重新赋值，而且必须在声明处初始化。实际编写时，我们优先使用`const`；只有确定需要让同一个名字保存后来的新值时，再使用`let`。这不是为了让代码显得复杂，而是为了让读者一看到声明，便能判断这个名字在后文是否可能改变。

需要注意，`const`限制的是**绑定的重新赋值**，并不自动使对象内容成为只读。若`const bag = { count: 2 };`，随后执行`bag.count = 3;`是允许的，而执行`bag = { count: 3 };`则会报错。我们将在对象一节中通过实际例子解释两者的区别。

旧代码中还经常出现`var`。它与`let`在作用域和声明处理上存在差异，不能只是因为拼写短便随意替换；本教程的新代码不依赖这些旧式行为，相关区别留到作用域一节统一观察。另外，不论使用哪一种声明方式，都不要遗漏声明关键字，指望赋值操作替我们自动建立可靠的变量。

## 从赋值到复合赋值

**赋值**（**Assignment**）使用`=`把右侧的值保存到左侧所表示的位置。因此，`completedRounds = completedRounds + 1`会先读取旧值2，计算2加1，再保存新值3。同类操作可以简写为`completedRounds += 1`。类似地，`-=`、`*=`和`/=`分别把减法、乘法与除法和赋值组合起来。

自增运算符`++`也会增加1，但它出现在名字前后时，整个表达式提供的值不同：

```js
"use strict";

let first = 4;
const before = first++;
let second = 4;
const after = ++second;

console.log(before, first);
console.log(after, second);
```

输出依次为`4 5`和`5 5`。两次运算都更新了对应变量，但后置自增先提供旧值，前置自增提供新值。若我们只是希望分数增加1，单独写`score += 1;`通常更加直接，没有必要把许多自增操作挤进同一表达式让读者猜测执行顺序。

## 算术运算

常用算术符号有加`+`、减`-`、乘`*`、除`/`、求余`%`和乘方`**`。乘除先于加减，圆括号可以显式指定分组；乘方又有自己的结合规则，初学时遇到复合乘方便使用括号表明意图。

```js
"use strict";

const blocks = 70;
const stackSize = 64;
console.log(Math.floor(blocks / stackSize));
console.log(blocks % stackSize);
console.log((2 + 3) * 4);
console.log(2 ** 3);
console.log(-5 % 3);
```

输出依次为`1`、`6`、`20`、`8`、`-2`。我们用`Math.floor`向下取整，因而70个方块可以装成1组完整的64个，并余下6个。注意，`/`本身不会自动做整数除法；`%`表示求余，负数结果也可能为负。如果需要把任意整数归一化到0至`m - 1`之间，应在正整数`m`的前提下使用`((n % m) + m) % m`，而非直接把求余当作数学上选取非负代表元的取模。

JavaScript的普通数值使用二进制浮点表示，因而十进制中的简单小数也可能无法精确表示。`0.1 + 0.2`通常显示为`0.30000000000000004`，并非加法规则出了错误。游戏中的整数计数若处在安全整数范围内可以精确计算；涉及距离等近似测量时，则需要按实际误差要求比较，不能机械地要求每次浮点计算都恰好相等。

## 转换之后再计算

`+`同时能够连接字符串，所以`"3" + 2`得到的是字符串`"32"`。如果从文本输入得到数字，我们应明确转换并验证，而不是依赖碰巧适用的隐式转换：

```js
"use strict";

const input = "12";
const amount = Number(input);
console.log(amount + 3);
console.log(Number.isFinite(amount));
console.log(Number.isFinite(Number("十二")));
```

输出为`15`、`true`、`false`。`Number.isFinite`只检查是否为有限数值；数量若还必须是整数、非负或不超过某个上限，便需要继续验证这些条件。尤其是空字符串转换后得到0，不一定符合“用户确实填写了数量”的业务要求，因此输入是否为空也应单独考虑。

请用29个物品、每组8个重做完整组数和余数的计算，结果应为3组与5个。再把输入改为`"29"`，先观察不转换的加法结果，再显式转换。这样便能将“原始输入”“数值计算”和“结果解释”分成清楚的步骤。

参考：[MDN：声明](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)、[MDN：表达式与运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)、[ECMAScript：数值类型](https://tc39.es/ecma262/#sec-numeric-types)。

相关内容：[上一节：认识JS的语法](./sec0.1.md) · [下一节：了解不同的数据类型](./sec0.3.md)
