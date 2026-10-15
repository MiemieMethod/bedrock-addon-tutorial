# 了解位运算

在前面的小节中，数字主要用于计数与计算。本节换一个角度：我们也可以观察整数的二进制表示，把不同位置上的0或1看作不同开关。直接针对这些二进制位进行操作的运算称为**位运算**（**Bitwise Operation**）。它适合表示少量彼此独立的状态，但并不意味着所有布尔值都应该被压缩成数字。

## 先观察二进制

十进制中的每一位分别表示个、十、百，二进制中的各位则依次表示1、2、4、8等2的幂。JavaScript允许使用`0b`前缀书写二进制整数字面量。下面的代码仍然属于普通JavaScript，不依赖游戏环境。

```js
"use strict";

const first = 0b0101;
const second = 0b0011;
console.log(first, second);
console.log(first & second);
console.log(first | second);
console.log(first ^ second);
```

输出依次为`5 3`、`1`、`7`、`6`。**按位与**（**Bitwise AND**）`&`只保留两边都为1的位，所以`0101 & 0011`得到`0001`；**按位或**（**Bitwise OR**）`|`保留至少一边为1的位，得到`0111`；**按位异或**（**Bitwise XOR**）`^`则保留两边不同的位，得到`0110`。

我们这里书写四位只是为了容易对齐观察，并不表示Number位运算仅处理四位。对于普通数值，除无符号右移的相应处理外，位运算通常按32位有符号整数解释操作数和结果。转换时会截去小数部分，并只保留相应的低32位；因此它并不等价于对任意大小数学整数直接进行运算。

## 用掩码描述独立开关

假设我们自己的数据需要记录三个权限：查看、编辑和管理。我们分别为它们选择不同的二进制位。这种用于选中某些位的数值称为**位掩码**（**Bitmask**）。

```js
"use strict";

const CAN_VIEW = 1 << 0;
const CAN_EDIT = 1 << 1;
const CAN_MANAGE = 1 << 2;

let permissions = CAN_VIEW | CAN_EDIT;
console.log((permissions & CAN_EDIT) !== 0);
console.log((permissions & CAN_MANAGE) !== 0);

permissions |= CAN_MANAGE;
permissions &= ~CAN_EDIT;
console.log(permissions);
console.log((permissions & (CAN_VIEW | CAN_MANAGE)) ===
    (CAN_VIEW | CAN_MANAGE));
```

输出为`true`、`false`、`5`、`true`。开始时查看与编辑两位都被置为1；随后使用按位或添加管理位，再用`& ~CAN_EDIT`清除编辑位。最后剩下查看与管理，数值便为1加4，也就是5。

`~`是**按位非**（**Bitwise NOT**），会反转参与运算范围中的每一位。因为普通数值采用32位有符号表示，`~2`的结果不是一个只看两三位便能得到的小正数，而是`-3`。不过当它与已有权限按位与时，仍然能清除指定位置，同时保留其他位置。

检查“至少有一种权限”使用`(value & mask) !== 0`，检查“具有全部这些权限”则使用`(value & mask) === mask`。当掩码只包含一位时两者看起来相同，包含多位时却不同。掩码为0时，全部检查恒成立，也需要结合实际业务判断这种输入是否允许。

这些比较中的圆括号不要省略，因为相等比较与按位运算具有不同优先级。`value & mask === mask`会先比较右侧两个掩码，再拿比较结果参与按位与，并不等价于先取出指定位置再判断。我们可以坚持为每个完整位运算加括号，让代码的分组直接反映我们真正想检查的内容。

## 移位与32位边界

`<<`将二进制位向左移动，右侧补0；`>>`进行保留符号的右移；`>>>`进行无符号右移，左侧补0。对于Number，移位数量只使用低5位，也就是实际按0至31解释，因此`1 << 32`会与`1 << 0`相同。

```js
"use strict";

console.log(1 << 3);
console.log(8 >> 2);
console.log(-1 >> 1);
console.log(-1 >>> 1);
console.log(1 << 31);
console.log(1 << 32);
```

输出依次为`8`、`2`、`-1`、`2147483647`、`-2147483648`、`1`。这些结果说明，“左移一位相当于乘2”只是在不溢出等前提下的便利理解，不能直接用来代替任意范围的乘法。也不要为了取整到处使用`value | 0`，因为较大数值会被截到32位范围，其行为和普通的取整函数不同。

BigInt也支持多数位运算，且没有Number的32位截断规则，但不支持无符号右移`>>>`，也不能与Number操作数混用。选择BigInt前仍然要检查存储格式与接口是否接受它，特别是JSON默认不能直接序列化BigInt。

## 与布尔运算区分

`&`和`&&`、`|`和`||`虽然长得相似，含义却不相同。位运算会计算两侧操作数，并处理它们的数值位；逻辑运算具有短路行为，主要用于控制条件。判断玩家在线且分数达标，应写逻辑与，而不是为了“简短”写一个按位与。

本节的权限位只是我们自己定义的数据，并非某个Minecraft接口规定的权限格式。只有接口文档明确要求位掩码时，才可以按其定义组装；不能把自创数值传给另一个看起来也叫`flags`的字段。

请给例子添加第四种权限，使用`1 << 3`表示它；再检查同时具有查看和编辑时的条件。随后尝试使用`permissions ^= CAN_EDIT`两次，观察第一次切换该位，第二次又切回原状。异或适合“切换”，按位或适合“确保开启”，理解这一点便能避免重复事件导致状态反复翻转。

参考：[MDN：按位与](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)、[MDN：表达式与运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)、[ECMAScript：位运算](https://tc39.es/ecma262/#sec-binary-bitwise-operators)。

相关内容：[上一节：循环语句与跳转语句](./sec0.7.md) · [下一节：了解作用域](./sec0.9.md)
