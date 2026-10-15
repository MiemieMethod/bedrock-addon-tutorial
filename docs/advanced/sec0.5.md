# JS中的对象

我们在JSON教程中已经使用对象描述过一个人的名字、身高和体重。来到JavaScript中，仍然可以用相似的结构把彼此相关的数据放在一起。不过，这次对象不只用于保存静态数据，我们还可以修改属性，把函数放入属性，并在执行过程中构造新的对象。

## 从一份挑战记录开始

```js
"use strict";

const record = {
    playerName: "小明",
    completed: 2,
    "reward-name": "绿宝石"
};

record.completed += 1;
const key = "reward-name";
console.log(record.playerName);
console.log(record.completed);
console.log(record[key]);
console.log(record.missing);
```

输出依次为`小明`、`3`、`绿宝石`和`undefined`。最外层花括号构成一个**对象字面量**（**Object Literal**），其中的每一对名称与值描述一个**属性**（**Property**）。在JavaScript中，普通对象的属性键是字符串或符号；当键符合标识符形式时，可以像`playerName`这样省略引号，但`"reward-name"`中的连字符具有其他语法含义，所以这里需要引号。

点号写法`record.playerName`适合属性名已经确定且能直接书写的情况。方括号写法`record[key]`则会先计算`key`，再使用它的结果寻找属性。若错误地写成`record.key`，读取的便是名字真的叫`key`的属性，而不是`key`变量中保存的`"reward-name"`。动态构造属性名时，务必区分这两种情况。

读取不存在的普通属性通常得到`undefined`；但对`null`或`undefined`继续读取属性会报错。在目标可能为空时，可以使用**可选链**（**Optional Chaining**）`target?.name`，使目标为空时得到`undefined`。它只处理空值访问，不会吞掉任意异常，也不验证目标是否具有我们所期待的业务结构。

## 属性与方法

属性的值可以是函数。通过对象来调用的函数通常称为这个对象的**方法**（**Method**）。下面采用方法的简写形式：

```js
"use strict";

const counter = {
    value: 0,
    increase(amount) {
        this.value += amount;
        return this.value;
    }
};

console.log(counter.increase(2));
console.log(counter.increase(3));
```

输出为`2`与`5`。这里两次都使用`counter.increase(...)`调用，因此方法中的`this`对应`counter`。这只是`this`的一种具体情况，并不是说函数一旦写在对象里，`this`便永久固定为该对象；把方法取出后单独调用，结果可能不同。我们将在[this关键字](./sec0.10.md)一节专门验证这个边界。

`const counter`仍允许修改`counter.value`，因为绑定始终保存同一个对象值，只是对象内容发生了变化。若想限制对象属性改动，`Object.freeze`可以冻结对象自身的属性，但它是浅层冻结，不会自动递归冻结里面的其他对象；游戏引擎返回的特殊对象也不能简单照搬普通对象的处理方法。

## 复制对象与共享内部数据

我们经常希望在原有记录基础上产生一份修改过的记录。**展开语法**（**Spread Syntax**）可以复制可枚举自有属性，但这种复制是浅层的：

```js
"use strict";

const original = {
    score: 2,
    position: { x: 1, y: 64, z: 3 }
};
const copy = { ...original, score: 5 };
copy.position.x = 9;

console.log(original.score, copy.score);
console.log(original.position.x, copy.position.x);
console.log(original === copy);
console.log(original.position === copy.position);
```

输出为`2 5`、`9 9`、`false`、`true`。外层对象确实变成两个，但`position`属性仍然保存同一个内部对象值。若这里也需要独立的位置，应显式复制为`position: { ...original.position }`。对于具有类、函数、循环引用或引擎内部状态的对象，不能把`JSON.parse(JSON.stringify(value))`当作万能复制工具，它既可能丢数据，也可能根本不能执行。

从对象中提取几个属性，可以使用**解构赋值**（**Destructuring Assignment**）的相关语法，例如`const { x, y } = position;`会声明两个绑定。这里提取的是当时的属性值，不是为这些普通变量建立以后永远同步的通道；若属性值本身是对象，则又回到了共享对象值的问题。

## 数组也是对象

**数组**（**Array**）适合表示有顺序的多个值。索引从0开始，`length`表示数组长度，`push`在末尾加入元素，`pop`移除并返回末尾元素。若要删除中间某个元素并让后面的元素前移，可以使用`splice`；直接`delete array[1]`只会删除该属性，留下空位，不会把数组长度减1。

对象和JSON也需要再次区分：`{ name: "小明" }`是JavaScript对象字面量，而`'{"name":"小明"}'`是包含JSON文本的字符串。`JSON.parse`把合法JSON文本解析为JavaScript值，`JSON.stringify`进行相反方向的序列化。JSON不能表示函数或`undefined`等全部JavaScript值，因而序列化前需要确认数据范围。

如果我们希望按玩家ID维护一份经常增删的对应表，还可以选择`Map`。它通过`set`保存、`get`读取、`has`判断是否存在、`delete`删除，与普通对象的属性访问是不同接口。对象适合描述固定结构，Map适合表达键到值的集合；选择时先考虑数据的用途，不必把所有东西都强行放进同一种结构。

请建立包含三个奖励名称的数组，打印第一个名称，再移除最后一个并打印长度，结果应分别为第一个名称和2。随后给挑战记录增加一个`rewards`数组，用展开语法复制记录，再修改数组，观察原记录是否一起变化。这个实验可以帮助我们发现：复制层数不是排版问题，而是数据是否独立的问题。

参考：[MDN：使用对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)、[MDN：数组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)、[ECMAScript：对象类型](https://tc39.es/ecma262/#sec-object-type)。

相关内容：[上一节：JS中的函数](./sec0.4.md) · [下一节：布尔运算与条件语句](./sec0.6.md)
