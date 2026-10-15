# 了解箭头函数

上一节中，我们知道了普通函数的`this`取决于调用方式，也发现把方法当作回调传出时可能丢失接收者。JavaScript还提供了一种常用于回调的函数写法，称为**箭头函数**（**Arrow Function**）。它使用`=>`连接参数和函数体，不过它的意义不仅是让代码变短，还包括不同的`this`处理方式。

## 从普通函数改写

```js
"use strict";

const double = (value) => value * 2;
const add = (first, second) => {
    const result = first + second;
    return result;
};
const makeRecord = (name) => ({ name, score: 0 });

console.log(double(6));
console.log(add(2, 3));
console.log(makeRecord("小明").name);
```

输出依次为`12`、`5`和`小明`。箭头左侧是参数表，右侧可以是一个表达式，也可以是由花括号包围的函数体。若右侧是表达式，表达式的值会自动作为返回值；若使用花括号写语句块，则需要显式使用`return`，否则正常执行到末尾仍然返回`undefined`。

这里的`makeRecord`尤其需要留意。若希望直接返回对象字面量，通常应使用圆括号把对象包起来，即`({ name, score: 0 })`。否则紧跟箭头的花括号会被解析成函数体，而不是我们期望返回的对象。类似的标点在不同语法位置具有不同含义，不能只凭“它看起来像一个对象”判断。

只有一个简单参数时，可以省略参数表的圆括号，比如`value => value * 2`；零个参数、多个参数或带默认值、解构的参数都需要圆括号。本教程通常保留圆括号，使函数的参数边界更加一致。参数表与`=>`之间也不能随意插入换行。

## 数组中的回调

箭头函数很适合描述短小的数据变换。下面的`filter`筛选合格分数，`map`根据每个合格分数计算奖励，最后的`join`把数组显示为一段容易核对的文本。

```js
"use strict";

const scores = [2, 6, 10];
const rewards = scores
    .filter((score) => score >= 5)
    .map((score) => score * 2);

console.log(rewards.join(", "));
console.log(scores.join(", "));
```

输出为`12, 20`与`2, 6, 10`。`filter`和`map`在此创建新数组，没有直接改变原数组的元素。但如果元素本身是对象，而回调修改了对象属性，原数组所引用的对象仍然会一起变化，所以“返回新数组”不等于“递归复制所有内容”。

数组回调通常不只收到元素，还会收到索引与数组等参数。我们应写一个参数含义明确的包装函数，而不是因为某个工具函数名字合适，便随意把它直接交给`map`。例如数字解析函数可能把第二个参数解释为进制，数组却会把索引传到同一位置，最终造成意料之外的结果。

## 词法this

箭头函数不建立自己的`this`绑定，而是沿词法环境使用外层的`this`。我们可以在一个普通方法内部创建箭头函数，让它记住所需的接收者。

```js
"use strict";

const counter = {
    value: 4,
    makeReader() {
        return () => this.value;
    }
};

const read = counter.makeReader();
const another = { value: 100, read };
console.log(read());
console.log(another.read());
console.log(read.call({ value: 200 }));
counter.value = 8;
console.log(read());
```

输出为`4`、`4`、`4`和`8`。调用`counter.makeReader()`时，普通方法的`this`是`counter`，内部箭头函数以后也使用这一词法`this`。把箭头函数放进另一个对象，或使用`call`，都不会为它重新指定`this`。最后读取到8还说明：这里保留的是访问同一个对象的方式，不是把创建时的数值4复制成永久不变的快照。

相应地，不要把对象里所有普通方法直接替换为箭头函数。如果在模块顶层写`const object = { read: () => this.value };`，箭头函数使用的是对象字面量外侧环境的`this`，而对象字面量本身不会建立`this`绑定。在模块环境中这通常导致访问`undefined`的属性。

## 参数与构造能力

箭头函数没有自己的`arguments`对象。如果需要接受数量不确定的参数，使用**剩余参数**（**Rest Parameter**）通常更明确：

```js
"use strict";

const sum = (...values) => {
    let total = 0;
    for (const value of values) {
        total += value;
    }
    return total;
};

console.log(sum(2, 3, 4));
console.log(sum());
```

结果为`9`和`0`。`values`在每次调用中是一个数组，包含交给剩余参数的实参。剩余参数必须位于参数列表末尾，不要与对象或数组字面量中的展开语法混淆，虽然它们都写成三个点。

箭头函数也不能作为构造函数使用，`new`一个箭头函数会抛出`TypeError`。因此，普通函数、箭头函数和类各自适合不同任务：需要调用方提供`this`时考虑普通函数，需要继承外层上下文的短回调时考虑箭头函数，需要明确描述实例的结构时再考虑类。

每次执行箭头函数表达式都会得到新的函数对象。若某个接口要求以后使用同一函数取消监听，我们应该先将箭头函数保存到变量，再分别交给订阅与取消订阅操作。两处文字完全一样的箭头函数表达式，并不表示它们产生的函数身份相同。

请把`makeReader`的返回值改为普通函数，并在其中继续读取`this.value`。这里需要格外注意：直接执行`read()`时，严格模式下的`this`是`undefined`，读取其属性会抛出`TypeError`，因而同一段代码中后续未受保护的调用不会继续执行。为了完整观察三种调用方式，我们用`try...catch`捕获这一次预期异常：

```js
"use strict";

const counter = {
    value: 4,
    makeReader() {
        return function () {
            return this.value;
        };
    }
};
const read = counter.makeReader();
const another = { value: 100, read };

try {
    console.log(read());
} catch (error) {
    console.log(error.name);
}
console.log(another.read());
console.log(read.call({ value: 200 }));
```

输出依次为`TypeError`、`100`和`200`，说明普通函数确实根据这三次调用分别取得了不同的`this`。也可以把三次调用拆成独立实验运行，但不能忽略首次异常对后续执行的影响。再把前面数组筛选的阈值改为6，确认分数恰好为6时是否留下。通过这些实验，我们便能同时检查函数语法、参数流向与上下文规则。

参考：[MDN：箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)、[ECMAScript：箭头函数定义](https://tc39.es/ecma262/#sec-arrow-function-definitions)。

相关内容：[上一节：了解this关键字](./sec0.10.md) · [下一节：了解字符串模板](./sec0.12.md)
