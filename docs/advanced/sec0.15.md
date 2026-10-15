# 了解异步与承诺

假设我们向玩家展示一个选择界面，希望等玩家选择之后再执行奖励逻辑。我们不能写一个循环不断等待，因为当前执行不结束，游戏和后续回调都可能受到影响。对于这种结果要在以后才能得出的操作，我们需要使用**异步**（**Asynchronous**）的组织方式。本节学习JavaScript如何表达这种流程，至于具体界面与调度接口，则在后面的脚本章节中实践。

## 同步开始，稍后继续

**承诺**（**Promise**）对象代表某项操作将来的完成结果。它有三种状态：待定`pending`、已兑现`fulfilled`和已拒绝`rejected`；后两种合称已敲定`settled`。已敲定后，状态及对应结果不会再被后来的兑现或拒绝改写。

我们先使用一个完全不依赖计时器的独立示例：

```js
"use strict";

console.log("甲：开始");
const result = new Promise((resolve) => {
    console.log("乙：执行器运行");
    resolve(3);
});
result.then((value) => {
    console.log("丁：取得结果", value);
});
console.log("丙：当前代码结束");
```

在Node.js模块中，输出依次为甲、乙、丙、丁，最后一行带有结果3。传给`new Promise`的**执行器**（**Executor**）立即同步执行，`then`注册的回调则不会插进当前同步代码中，而是在相应承诺反应作业得到调度时运行。因而“使用Promise”不等于“其中所有代码都被放到后台”。

`resolve`也不总意味着立刻兑现：若传入的是另一个Promise，外层会跟随它的结果，可能继续处于待定状态。因此，日常所说“解决了一个Promise”与“它已兑现”不能在所有情况下混用。初学时可以先记住：普通值成为成功结果，承诺或可调用`then`的对象则可能触发进一步的接纳过程。

## 链式处理与错误传播

`then`会返回一个新的Promise。回调返回普通值时，新Promise采用该结果；返回另一个Promise时，后续等待其结果；抛出异常时，则转为拒绝。这使多个步骤可以连成清晰的链。

```js
"use strict";

Promise.resolve(3)
    .then((rounds) => rounds * 2)
    .then((reward) => {
        console.log("奖励", reward);
        throw new Error("示例校验失败");
    })
    .catch((error) => {
        console.log(error.message);
        return 0;
    })
    .then((reward) => {
        console.log("最终结果", reward);
    });
```

输出为`奖励 6`、`示例校验失败`与`最终结果 0`。`catch`在这里处理拒绝，并返回0让后续继续成功执行；如果只记录错误却不重新抛出，也会被视为已处理，这可能无意间吞掉失败。因此，只有确实存在合理替代结果时，才应像示例这样恢复流程。

若回调启动另一个异步操作，却既不返回它，也不等待它，外层链便不知道还有工作未完成。后续步骤可能过早开始，里面的拒绝也未必能被外层`catch`接住。`finally`适合清理工作，它通常保留原结果，但如果自身抛错或返回拒绝的Promise，也会改变后续结果，因而不宜在里面随意返回业务结果。

## async与await

`async`声明**异步函数**（**Async Function**），其调用总是返回Promise。`await`允许我们在函数内等待一个值所对应的Promise结果，然后继续后面的代码。它暂停的是当前异步流程，不是让整个JavaScript线程停在原地等。

```js
"use strict";

async function calculateReward(rounds) {
    if (!Number.isInteger(rounds) || rounds < 0) {
        throw new Error("轮数必须是非负整数");
    }
    const multiplier = await Promise.resolve(3);
    return rounds * multiplier;
}

async function main() {
    try {
        console.log(await calculateReward(2));
        console.log(await calculateReward(-1));
    } catch (error) {
        console.log(error.message);
    }
}

main().catch((error) => console.error(error));
```

输出为`6`和`轮数必须是非负整数`。异步函数内部抛出的异常表现为返回Promise的拒绝；`await`遇到拒绝会在当前位置抛出，因此可以用`try...catch`处理。如果省略`await`，只是把Promise交给`console.log`，并不能取得其中的数值。

异步函数在遇到第一次`await`之前仍同步执行，长时间计算并不会因为前面加了`async`便自动进入另一条线程。即使等待的是已经兑现的Promise，后续部分也按异步继续的规则安排；不过不能因此推断它一定在“下一游戏刻”执行，游戏宿主如何处理作业与刻之间的关系，需要以脚本运行时文档为准。

## 顺序与并发

若第二项操作依赖第一项的结果，应顺序`await`。若两项彼此独立，并且接口允许同时进行，可以先发起它们，再用`Promise.all`等待全部成功。

```js
"use strict";

async function main() {
    const first = Promise.resolve(4);
    const second = Promise.resolve(7);
    const values = await Promise.all([first, second]);
    console.log(values.join(", "));
}

main().catch((error) => console.error(error));
```

输出为`4, 7`。`Promise.all`的结果顺序与输入顺序一致，不由完成先后决定；任一成员拒绝时，组合Promise会拒绝，但它不会自动取消其他已开始操作。需要收集每一项成功或失败时，可考虑`Promise.allSettled`。无论使用哪一种，都需要限制并发规模，不能把上千次游戏操作一次性发出。

对数组逐项异步处理时，不要误以为`forEach(async (...) => ...)`会替我们等待所有回调。需要顺序时使用`for...of`并在循环内`await`；需要并发时用`map`生成Promise数组，再等待适当的组合结果。`new Promise(async (...) => ...)`也应避免：异步执行器自身返回的Promise不会被构造器当作执行结果接纳，错误处理容易因此脱节。

## 回到Minecraft环境

本节示例仅验证语言流程，没有访问世界。Minecraft中的延迟应使用当前`@minecraft/server`版本提供的`system.run`、`system.runTimeout`、`system.runInterval`等接口，而不是假定存在浏览器的`setTimeout`。这些接口通常返回任务标识而非Promise，因此直接`await system.runTimeout(...)`并不会自动等待计时结束；需要按接口语义设计适当包装，并处理取消与错误。

同样，等待玩家界面返回之后，玩家可能已经离开，实体可能已失效，先前读取的分数也可能变化。恢复执行时应重新检查必要前提。某个API能否在只读事件上下文中调用，也不能仅凭加上`await`保证；涉及世界修改应遵守该API和调度文档的约束。

请先预测第一个示例四行输出的顺序，再验证。随后让奖励链的第一个回调返回`Promise.resolve(rounds * 2)`，确认后续仍得到6；最后故意遗漏一次`return`，观察下游为何收到`undefined`。能解释这些结果之后，我们便具备了开始阅读真正游戏事件、调度与界面代码所需的语言基础。

参考：[MDN：使用Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)、[ECMAScript：Promise对象](https://tc39.es/ecma262/#sec-promise-objects)、[Minecraft：调度运行指南](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/system-run-guide?view=minecraft-bedrock-stable)、[Minecraft：脚本v2运行机制](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/v2-overview?view=minecraft-bedrock-stable)。

相关内容：[上一节：了解自调用函数与闭包](./sec0.14.md) · [下一章：初识脚本API](./sec1.1.md)
