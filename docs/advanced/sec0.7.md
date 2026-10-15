# 循环语句与跳转语句

如果需要为三位玩家计算分数，我们可以写三次相似的代码。但当人数变为三十，或者人数只有运行时才能确定，继续复制便不可行了。**循环**（**Loop**）让我们按照指定规则反复执行一段语句，而**跳转语句**则允许我们提前结束循环或跳过某一次处理。

## 用for循环观察执行次序

```js
"use strict";

let total = 0;
for (let round = 1; round <= 3; round += 1) {
    total += round * 2;
    console.log(round, total);
}
console.log("总计", total);
```

输出依次为`1 2`、`2 6`、`3 12`与`总计 12`。`for`括号中三个部分分别负责初始化、继续条件和每轮结束后的更新。执行过程是：先把`round`初始化为1，检查它是否不超过3，执行循环体，再增加1，随后回到条件检查。初始化只执行一次，而条件检查会反复发生。

注意最后一次循环体执行时`round`等于3，更新后才变为4；此时条件为假，循环结束。初学时可以像上面这样打印每轮的变量，亲自核对这个顺序。循环边界如果写成`round < 3`，便只会执行前两轮，这种只差一次的错误在数组索引与区域遍历中尤为常见。

## 遍历数组中的值

若我们关心的是数组中的每个元素，可以使用`for...of`，而无需自己维护索引。

```js
"use strict";

const amounts = [2, 0, 5, 3];
let total = 0;
for (const amount of amounts) {
    total += amount;
}
console.log(total);
```

结果为`10`。这里的`const amount`并不妨碍处理不同元素，因为每轮都有该轮的绑定，而不是反复给同一个`const`重新赋值。数组、字符串等可迭代值可以用于`for...of`；一个普通对象并不会仅凭具有几个属性，就自动支持相同的遍历协议。

容易混淆的`for...in`遍历的是可枚举字符串属性键，并可能包含继承而来的属性。对数组求和时，我们通常需要元素值，因而优先使用`for...of`。若要遍历普通对象自己的键值，可以使用`Object.entries(record)`产生键值对，再对这些键值对使用`for...of`。需要索引时，则可以用普通`for`或数组的`entries()`。

## 跳过本轮与结束整个循环

```js
"use strict";

const amounts = [2, -1, 4, 9];
let total = 0;
for (const amount of amounts) {
    if (amount < 0) {
        continue;
    }
    if (total + amount > 6) {
        break;
    }
    total += amount;
    console.log("累计", total);
}
console.log("结束", total);
```

输出为`累计 2`、`累计 6`、`结束 6`。`continue`让负数对应的这一轮直接结束，后面的4仍然会被处理；`break`则在准备加入9时结束整个循环，之后不再取下一项。若写的是普通`for`，`continue`之后仍会进入该循环的更新部分，再进行下一次条件检查。

不带标签的`break`结束最近一层包围它的循环或`switch`，不代表退出整个函数；`return`才会结束当前函数调用。嵌套循环有时需要标签配合`break`，但也可以把查找逻辑封装为函数，找到目标时直接返回，通常更容易阅读。数组的`forEach`是方法调用，不能把它的回调当作普通循环体使用`break`或`continue`。

## while与do...while

`while`在每次执行循环体之前检查条件，适合次数尚不明确、但可以明确描述继续条件的情况。`do...while`先执行一次循环体，再检查条件，所以至少执行一次。两者都要求我们认真检查状态是否会逐步走向结束。

```js
"use strict";

let remaining = 5;
let batches = 0;
while (remaining > 0) {
    const current = Math.min(remaining, 2);
    remaining -= current;
    batches += 1;
}
console.log(batches, remaining);
```

输出为`3 0`，对应每次处理2、2、1个。若遗漏`remaining -= current`，继续条件便可能永远为真。某些情况下，即使我们写了更新，`continue`也可能跳过它，因此检查循环时要逐条考虑每个分支，而不是只看循环体末尾有没有一条减法。

## 循环不是等待工具

在游戏脚本中，不要使用一个空转循环等待玩家移动、某个事件触发或一段时间过去。当前JavaScript执行一直不让出时，期望中的回调可能根本没有机会执行，还会阻塞游戏并触发脚本监控限制。延迟与跨刻处理应使用游戏的调度接口，后面的脚本章节会专门讨论。

同样地，一次遍历巨大区域即使最后能够结束，也可能在单次执行中耗时过长。合理做法是限制数据规模、把任务分成批次，并记录进度。语言层面的“循环正确”只说明步骤与结果正确，还不等于它适合在每个游戏刻执行。

请将第三个示例的上限6改为5，运行前预测为何最后总计为2，而不是5：程序只是尝试加入完整的下一项，不会自动把4切成剩下能容纳的3。再把`break`改成`continue`，讨论在后面还有较小元素时，两种策略会产生什么差异。这个练习提醒我们，循环控制表达的其实也是玩法规则。

参考：[MDN：循环与迭代](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)、[ECMAScript：迭代语句](https://tc39.es/ecma262/#sec-iteration-statements)、[Minecraft：调度运行指南](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/system-run-guide?view=minecraft-bedrock-stable)。

相关内容：[上一节：布尔运算与条件语句](./sec0.6.md) · [下一节：了解位运算](./sec0.8.md)
