# 认识Molang

在前面的方块示例中，我们已经使用过`query.block_state('tutorial:lit')`。这句话看起来既不像一个普通数字，也不像一个JSON对象，却能够决定教学灯是否发光。在本节中，我们一起来认识它所使用的表达式语言——**Molang**。

Molang经常嵌入JSON字符串，为动画、渲染控制器、粒子和部分行为提供计算结果。JSON负责组织文件，Molang负责在游戏运行时计算。两者各有语法，外层JSON正确，并不意味着字符串里面的表达式也正确。

## 从固定值到变化的值

假设一个模型的头部绕竖直方向旋转20度，我们可以在动画中把旋转通道写成`[0, 20, 0]`。如果希望它随着时间左右摇摆，就可以把第二个数改为表达式：

```json
[0, "math.sin(query.life_time * 90) * 20", 0]
```

`query.life_time`读取实体已经存在的时间，单位为秒；`math.sin`计算正弦，角度按度数解释。这里每秒推进90度，因此4秒完成一次完整摆动，旋转值在-20度到20度之间变化。

我们不妨分别代入0、1、2、3、4秒：结果依次为0、20、0、-20、0。将这样的结果逐帧用于模型旋转，就可以看到连续的摇摆。表达式本身并没有移动实体的世界坐标，它改变的是动画中某个骨骼的旋转通道。

## 查询、变量与临时值

Molang中的前缀可以帮助我们判断一个名称的用途：

| 写法 | 常见用途 |
| --- | --- |
| `query.*`或`q.*` | 查询当前上下文提供的游戏信息 |
| `variable.*`或`v.*` | 保存当前对象上下文中的变量 |
| `temp.*`或`t.*` | 保存一次表达式求值过程中的临时数据 |
| `math.*` | 调用数学函数 |
| `context.*`或`c.*` | 读取调用位置额外提供的上下文数据 |

这些前缀不是任意的JavaScript对象。我们不能因此写出`query.health = 20`来修改生命值，也不能在其中直接调用脚本API。

更需要注意的是**上下文**（**Context**）。实体动画能够读取的查询，不一定适用于方块条件；客户端存在的变量，也不会因为名称相同就自动同步到服务端。遇到查询报错时，先确认表达式放置位置是否支持它，再检查拼写。

## 简单表达式与复合表达式

只有一个计算结果时，可以写成简单表达式：

```text
math.clamp(query.modified_move_speed, 0, 1)
```

需要多个步骤时，可以用分号分隔，并明确返回结果：

```text
temp.speed = math.clamp(query.modified_move_speed, 0, 1); return temp.speed * 20;
```

这里先将速度限制在0到1之间，再放大为0到20的数值。`return`表示整个复合表达式的返回值。不要把“最后一行看起来像一个数”当作一定能够正确返回的保证。

条件选择可以写成`条件 ? 真时的结果 : 假时的结果`。例如：

```text
query.is_baby ? 0.5 : 1.0
```

当实体为幼体时返回0.5，否则返回1.0。查询常用0表示假、非0表示真，因而它可以直接作为条件。如果需要多层判断，我们应主动加上括号，使条件的范围明确，而不是依靠读者猜测运算优先级。

## 放入一个实际动画

在资源包创建`animations/guide.animation.json`：

```json
{
  "format_version": "1.8.0",
  "animations": {
    "animation.tutorial.guide.look": {
      "loop": true,
      "bones": {
        "head": {
          "rotation": [0, "math.sin(query.life_time * 90) * 20", 0]
        }
      }
    }
  }
}
```

这份文件暂时只定义动画，没有把它挂接到实体。下一节我们将建立具有`head`骨骼的模型，并通过客户端实体的`animations`登记短名称，再通过`scripts.animate`播放。完成挂接后，才能在游戏中看到头部摆动。

这种分工很重要：定义一个动画，给动画起一个短名称，以及实际播放动画，是三件不同的事。单独建立上述文件，并不会让所有名为`head`的骨骼都开始摇摆。

## 检查计算与版本

如果模型完全不动，我们可以先把表达式换成固定值20。固定值也不生效，优先检查动画是否挂接、骨骼名称是否一致；固定值生效而表达式不生效，再检查查询上下文、引号与内容日志。

如果周期与预期不同，则分别核对查询的单位和数学函数的单位。来自其他语言的`sin`经常使用弧度，Molang在这里使用角度。我们可以先代入几个简单时刻，得到明确的预期结果，再进入游戏观察。

Molang的一些语义变更还受所在包清单的`min_engine_version`控制。例如旧的`query.block_property`已由`query.block_state`取代。不要只升级动画文件版本，却忽略包清单中的版本信息。

## 参考资料与版本

- [官方Molang语法指南](https://learn.microsoft.com/en-us/minecraft/creator/documents/molang/syntax-guide?view=minecraft-bedrock-stable)：变量、复合表达式与按版本变化的语义。
- [官方Molang数学函数](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/molangreference/examples/molangconcepts/mathfunctions?view=minecraft-bedrock-stable)：核查正弦函数的角度单位。
- [Mojang客户端猪定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/resource_pack/entity/pig.entity.json)：动画短名称、播放列表与Molang查询的实际组合。

资料核查日期：2026-10-15。示例使用稳定通道基础Molang功能；清单建议保持本教程的至少1.21.80要求。动画文件的1.8.0是文件格式号，不代表要求运行旧游戏。
