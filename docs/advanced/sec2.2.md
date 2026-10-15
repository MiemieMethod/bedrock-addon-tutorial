# 学习命令主循环系统

上一节中，我们使用哑实体表示了地图中的一个位置。不过，一次执行命令只能检查一次附近玩家。如果希望玩家走到起点时自动触发逻辑，就需要周期性地进行检查。我们可以通过行为包的`tick.json`建立一个**主循环**（**Main Loop**）。

本节使用当前的`execute ... run ...`命令形式，不使用早期的`execute <目标> <坐标> <命令>`语法。示例无需脚本模块，完整命令结构可以在`examples/advanced/checkpoint_race/BP/functions`中看到。

## 从tick.json进入函数

首先在行为包的`functions`目录下建立`tick.json`：

```json
{
  "values": ["tutorial/race/tick"]
}
```

它会使游戏在相应的游戏刻处理过程中调用`functions/tutorial/race/tick.mcfunction`。这里的字符串相对于`functions`目录，不写`.mcfunction`扩展名。`tick.json`本身也应直接位于`functions`目录中。

我们在函数文件中每行写一条命令，行首不带聊天栏使用的`/`。空行和以`#`开头的注释可用于组织文件。应先将关键命令放入聊天栏或一次性函数中单独验证，再加入主循环，避免一个错误在每刻重复刷出大量日志。

## 初始化不能无限重复

假设我们希望统计玩家参加计时赛经过的游戏刻。我们可以建立一个名为`tutorial.time`的记分板目标。但是，创建目标的命令只应在安装时运行，而不应每刻重新创建。

我们把安装工作放入`functions/tutorial/race/setup.mcfunction`：

```mcfunction
scoreboard objectives add tutorial.state dummy
scoreboard objectives add tutorial.time dummy
```

由管理员在测试世界中执行一次`/function tutorial/race/setup`。如果重复执行，已存在的目标会报告创建失败，这是需要明确知道的安装状态，不应该通过每刻调用来“碰运气”。后面的实例会给出单独的玩家重置函数，重开一轮比赛无需删除并重建目标。

对于尚未拥有分数的新玩家，我们可以在每刻使用“加零”建立初始记录：

```mcfunction
scoreboard players add @a tutorial.state 0
scoreboard players add @a tutorial.time 0
```

这与每刻执行`set ... 0`不同。加零不会清空已有比赛进度，而直接赋零会使计时永远无法累积。我们一旦区分清楚“创建记录”与“重置记录”，很多循环中的错误就容易发现了。

## 为每位玩家保持自己的执行上下文

我们先看一条基础计时命令：

```mcfunction
scoreboard players add @a[scores={tutorial.state=1}] tutorial.time 1
```

它只为状态为1的玩家增加计时。选择器中的条件属于每位玩家自己的分数，因此玩家甲开始比赛不会使玩家乙自动开始计时。

当我们需要判断玩家附近是否有锚点时，还应同时切换执行者和执行位置：

```mcfunction
execute as @a[scores={tutorial.state=1}] at @s if entity @e[type=tutorial:anchor,tag=tutorial:finish,r=2] run function tutorial/race/finish
```

`as`将执行者切换为每位符合条件的玩家，使后面的`@s`指向该玩家；`at @s`将位置和维度等执行上下文切换到该玩家所在处；最后，`r=2`才表示以该玩家为中心的两格范围。只有`as`而没有`at`时，不应把相对坐标和半径都误认为已经移动到玩家身边。

这条命令使用`if entity`检查是否至少存在一个终点锚点。因此附近有两个错误重复放置的终点时，当前条件仍只分流一次；但这并不代表可以放任重复锚点存在。干净的数据布置仍然有助于性能和排错。

## 控制执行频率

并非所有逻辑都需要每刻检查。比赛计时需要细粒度更新，但欢迎文字、统计面板等可以较慢更新。我们可以使用一个全局记分项作为分频计数器：

```mcfunction
# setup中另行创建目标tutorial.clock，并给$global赋0。
scoreboard players add $global tutorial.clock 1
execute if score $global tutorial.clock matches 20.. run function tutorial/once_per_second
execute if score $global tutorial.clock matches 20.. run scoreboard players set $global tutorial.clock 0
```

这段内容是独立分频示例，不属于后面计时赛包的必需文件。`$global`只是我们选取的假玩家名称，并没有特殊魔法。对应目标仍需先用`scoreboard objectives add tutorial.clock dummy`创建。

正常速度下20游戏刻约为1秒。它统计的是游戏运行经过的刻数，并非严格的现实时间。如果服务器掉速，用这类计数器测出的“秒数”也会与现实时间产生差异。对竞赛公平性有要求时，应在玩法说明中明确采用哪一种时间定义。

## 函数顺序也是逻辑的一部分

主循环中的命令按书写顺序处理。先增加时间再判断终点，与先判断终点再增加时间，在终点触发当刻可能得到相差1刻的结果。这里没有可以脱离设计目标的唯一正确顺序，关键是保持一致，并把计时边界说明清楚。

多份行为包也可能各自提供周期函数。不要依赖“我的包一定先于另一包执行”实现跨包协议。如果一组操作需要确定的先后关系，就由自己的入口函数按顺序调用子函数，并为每个子函数规定清晰的输入状态和输出状态。

另外，`tick.json`执行的全局函数不具有一个天然的玩家执行者。任何依赖`@s`是玩家的子函数，都必须由`execute as <玩家>`进入；不能直接从主循环顶层调用后，再猜测`@s`会指向最近的玩家。

## 检查循环是否可控

进入游戏后，我们应检查：目标是否已创建；新玩家是否能获得初始记录；已有分数是否被意外清零；玩家离开终点后是否仍在反复收到消息；没有玩家或相关区块未加载时，查询是否能够安静地停止。

命令主循环提供了周期执行能力，但我们仍需使用状态控制“一次性发生”的事情。下一节先认识界面数据如何显示；随后，我们将用状态、锚点和周期函数完成一个可以开始、结束并重置的计时赛。

## 参考资料

- [官方tick.json说明](https://learn.microsoft.com/en-us/minecraft/creator/documents/tickjsonintroduction?view=minecraft-bedrock-stable)。
- [execute命令](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/commandsreference/examples/commands/execute?view=minecraft-bedrock-stable)与[scoreboard命令](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/commandsreference/examples/commands/scoreboard?view=minecraft-bedrock-stable)。
