# 认识命令

在前面的章节中，我们已经多次通过`/give`、`/summon`和`/particle`检查自己的附加包。现在我们从这些熟悉的操作出发，更系统地认识**命令**（**Command**），为下一节编写函数做准备。

命令可以改变世界中的状态，也可以查询状态、选择实体或输出文本。为了完成本章练习，请在独立测试世界中开启作弊，并确认操作者拥有相应权限。创造模式便于调试，但多人世界中的权限仍由世界或服务器配置决定，不能仅凭游戏模式推断。

## 从一条给予命令开始

在聊天栏中输入：

```mcfunction
/give @s minecraft:apple 3
```

预期自己的物品栏中增加3个苹果。我们将这条命令分开观察：`give`是命令名，`@s`指定目标，`minecraft:apple`指定物品，`3`指定数量。参数之间用空格隔开。在聊天栏中，最前面的`/`让游戏知道这段内容应当作为命令执行。

如果输入`/help give`，或者观察输入过程中的补全信息，便能看到该命令支持的参数。文档中的尖括号表示必需参数，方括号表示可选参数；它们用来说明语法，不需要连同参数一起输入。例如，数量可选并不意味着应输入`[3]`。

命令的标点应使用英文半角字符。中文输入法产生的全角冒号、逗号或引号，看起来相近，却可能无法被解析。

## 使用目标选择器

**目标选择器**（**Target Selector**）让我们不必预先知道玩家的名字，也能选出所需目标。以下是本章经常使用的选择器：

| 选择器 | 本章中的用途 |
| --- | --- |
| `@s` | 当前执行实体。 |
| `@p` | 距离执行位置最近的玩家。 |
| `@a` | 所有符合条件的玩家。 |
| `@e` | 所有符合条件的实体。 |

选择器后面的方括号则是真实语法，用于添加筛选条件。例如：

```mcfunction
/tag @s add tutorial_test
/give @a[tag=tutorial_test] minecraft:apple 1
/tag @s remove tutorial_test
```

第一条命令给自己添加标签，第二条只给具有该标签的玩家苹果，第三条移除标签。这些标签存在于实体身上，不是附加包物品标签，也不是群系标签。名称可以相同，但所处系统不同，不能相互替代。

如果只想选附近一个掉落物实体，可以使用`@e[type=minecraft:item,r=4,c=1]`。这里的`r=4`是距离限制，`c=1`是数量限制。越早明确范围，越容易避免命令影响无关对象，也能减少每刻执行时的工作量。

## 认识坐标和执行上下文

世界坐标使用X、Y、Z三个分量：X正方向为东，Y正方向向上，Z正方向为南。绝对坐标`10 80 20`指定固定位置；相对坐标`~ ~1 ~2`表示相对于当前执行位置向上1格、向南2格。

**局部坐标**（**Local Coordinate**）使用`^`，三个分量依次表示左、上、前方向。它们随执行旋转改变。例如，以下命令在视线前方2格产生我们已经制作的粒子：

```mcfunction
/execute anchored eyes run particle tutorial:spark ^ ^ ^2
```

三个坐标分量采用同一套局部坐标语法，不应混写成`^ ~ ^2`。该命令依赖第七章的资源包；粒子未定义时，不能靠命令本身补出视觉效果。

一条命令除了文字内容，还携带执行实体、位置、旋转和维度等**执行上下文**（**Execution Context**）。`execute`可以有选择地改变这些信息。我们来看：

```mcfunction
/execute as @a[tag=tutorial_test] at @s run particle tutorial:spark ~ ~1 ~
```

`as`让每个被选中的玩家成为对应分支的执行实体；`at @s`再把执行位置、旋转和维度移动到该玩家处；`run`之后才是真正要执行的命令。仅写`as`不会自动把位置一起移过去，因此这两个步骤经常配合使用。

条件也可以接在`execute`中：

```mcfunction
/execute as @a at @s if block ~ ~-1 ~ minecraft:gold_block run tellraw @s {"rawtext":[{"text":"你正站在金块上。"}]}
```

它针对每个玩家，检查脚下是否为金块，只向条件成立的玩家显示消息。`unless`表示条件不成立时才继续。这样的条件执行是函数编排玩法时的重要工具。本教程使用当前的`as`、`at`、`if`与`run`语法，不使用旧版`execute <目标> <坐标> <命令>`写法。

## 先让命令可以观察

不确定选择器选中了谁时，可以先执行`/testfor @a[tag=tutorial_test]`，或用`/tellraw`输出说明，再换成实际操作。语法错误、没有匹配目标和条件不成立，是三种不同的情况：前者应检查命令格式，后两者应检查世界状态与上下文。

从聊天栏改到命令方块或函数之后，`@s`也不再天然代表操作界面的玩家。我们应明确用`execute as`指定执行实体，而不是依赖恰好站在旁边的某个人。接下来，我们便将这些已经逐条验证的命令放到函数文件中。

## 参考资料

- [命令概述](https://learn.microsoft.com/en-us/minecraft/creator/documents/commandsintroduction?view=minecraft-bedrock-stable)。
- [`execute`命令参考](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/execute?view=minecraft-bedrock-stable)。
- [BDS稳定分支导出的命令元数据](https://github.com/bedrock-apis/bds-docs/blob/stable/metadata/command_modules/mojang-commands.json)。

本节语法于2026-10-15与稳定版参考及BDS导出结果核对；命令执行结果仍需在具备对应资源与权限的世界中验证。
