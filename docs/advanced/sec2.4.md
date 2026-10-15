# 实例：用哑实体与命令制作计时赛

前面几节中，我们已经分别认识了位置锚点、命令主循环和信息显示。现在，我们把它们组合起来，制作一个简单的计时赛：玩家走进起点附近时开始计时，到达终点附近时停止，并在聊天栏中得到本轮成绩。

这次我们不使用JavaScript。完整示例位于`examples/advanced/checkpoint_race`，其中`BP`提供哑实体和命令函数，`RP`提供哑实体的客户端定义。请一起启用两个包，并在独立测试世界中完成地图布置。所有记分板目标、标签和函数均使用本教程自己的名称。

## 先明确比赛状态

如果每刻检测到起点玩家就把时间清零，玩家站在起点时永远无法正常计时；如果每刻检测到终点就输出成绩，聊天栏会被重复消息填满。因此，我们需要为玩家记录一个**状态**（**State**）。

| `tutorial.state`的值 | 含义 | 允许发生的下一步 |
| --- | --- | --- |
| `0` | 等待开始 | 进入起点后变为1 |
| `1` | 正在计时 | 到达终点后变为2 |
| `2` | 本轮完成 | 主动重置后回到0 |

时间由`tutorial.time`保存，单位是游戏刻。这里把“开始当刻”计为第1刻，终点检查在该刻累加之后进行。这种约定容易实现，也便于我们解释边界；正常速度下20刻约为1秒，但成绩不承诺等于现实时间。

## 安装并放置起终点

进入世界后，先执行一次安装函数：

```mcfunction
/function tutorial/race/setup
```

它创建两个`dummy`类型的记分板目标。接着在起点附近召唤上一节定义的`tutorial:anchor`，并添加标签：

```mcfunction
/summon tutorial:anchor ~ ~ ~
/tag @e[type=tutorial:anchor,r=2,c=1] add tutorial:start
```

然后移动到距离起点至少十格的终点位置，确保附近没有别的锚点，再执行：

```mcfunction
/summon tutorial:anchor ~ ~ ~
/tag @e[type=tutorial:anchor,r=2,c=1] add tutorial:finish
```

两处检测半径均为2格，所以起终点不应重叠。我们还可以使用不同颜色的方块标记场地，方便玩家辨认。锚点本身不显示模型，不能承担面向玩家的地图说明。

本例不自动强制加载远方区块。玩家接近起终点时，相应区块需要处于正常加载状态；如果把整个比赛设计成跨维度或远距离瞬移玩法，应另外检查目标维度与加载条件。

## 编写主循环

`functions/tick.json`调用`tutorial/race/tick`。主循环完整内容如下：

```mcfunction
scoreboard players add @a tutorial.state 0
scoreboard players add @a tutorial.time 0
execute as @a[scores={tutorial.state=0}] at @s if entity @e[type=tutorial:anchor,tag=tutorial:start,r=2] run function tutorial/race/start
scoreboard players add @a[scores={tutorial.state=1}] tutorial.time 1
execute as @a[scores={tutorial.state=1}] at @s if entity @e[type=tutorial:anchor,tag=tutorial:finish,r=2] run function tutorial/race/finish
execute as @a[scores={tutorial.state=1}] run titleraw @s actionbar {"rawtext":[{"text":"计时："},{"score":{"name":"@s","objective":"tutorial.time"}},{"text":" 刻"}]}
```

前两行补齐新玩家的分数记录。第三行只让等待中的玩家开始比赛，所以已经开始的玩家停在起点不会被重置。第四行累加当前仍在比赛中的玩家时间。第五行在终点结束比赛。最后一行为仍在计时的玩家更新动作栏文字。

我们使用`as ... at @s`进行起终点查询，让每位玩家分别以自己的位置和维度寻找附近锚点。动作栏只向当前`@s`显示，所以不同玩家可以看到各自的成绩，不会把玩家甲的计时广播给所有人。

## 开始、结束与重置函数

`functions/tutorial/race/start.mcfunction`负责开始一轮比赛：

```mcfunction
scoreboard players set @s tutorial.time 0
scoreboard players set @s tutorial.state 1
tellraw @s {"rawtext":[{"text":"计时开始，请前往终点！"}]}
```

`functions/tutorial/race/finish.mcfunction`负责结束：

```mcfunction
scoreboard players set @s tutorial.state 2
titleraw @s actionbar {"rawtext":[{"text":"本轮已经完成"}]}
tellraw @s {"rawtext":[{"text":"本轮成绩："},{"score":{"name":"@s","objective":"tutorial.time"}},{"text":" 刻。离开起点后可重置下一轮。"}]}
```

最后是`functions/tutorial/race/reset.mcfunction`：

```mcfunction
scoreboard players set @s tutorial.state 0
scoreboard players set @s tutorial.time 0
titleraw @s actionbar {"rawtext":[{"text":"已准备好下一轮"}]}
tellraw @s {"rawtext":[{"text":"比赛状态已重置，走进起点即可开始。"}]}
```

测试者可以在聊天栏执行`/function tutorial/race/reset`重置自己。管理员若要重置指定玩家，应使用`execute as <玩家> run function tutorial/race/reset`。这些子函数需要玩家执行者，不能直接从没有玩家上下文的主循环顶层调用。

重置后若仍站在起点检测范围内，下一刻就会再次开始，这正是状态0与起点条件共同作用的结果。因此，我们在重开一轮前先离开起点，然后重置，再重新进入。

## 验证多人和重复触发

我们先独自走完整条路线，检查开始信息只出现一次、时间持续增加、终点信息只出现一次。完成后在终点停留片刻，确认时间不再变化。再回到起点，确认状态2不会自动开始，执行重置后才可以开始下一轮。

接下来邀请第二位测试玩家。两人先后进入起点，应当拥有不同时间；一人结束后，另一人的计时应继续。还可以让一人在比赛中暂时退出再进入。本例保留其记分板状态，并只在在线且参加比赛时累加，所以离线期间不计时。若比赛要求禁止离线，则需要设计额外规则，而不是把现有行为误认为自动具备反作弊能力。

最后检查异常布置：移走终点时比赛不会凭空结束；把起终点重叠时会出现几乎立即完成；同时启用其他动作栏系统时，两者可能相互覆盖。这些结果都应在地图正式发布前被发现并处理。

## 把系统继续扩展

这套结构可以继续加入检查点、最快成绩或圈数，但每加一个目标，都应先确定它属于哪个状态转换。例如，最快成绩只应在“正在计时变为完成”时比较和更新，而不应在玩家停留终点的每一刻重写。

我们也可以把动作栏替换成合适的显示方式，但界面始终只负责呈现结果。决定比赛是否开始、结束以及成绩多少的逻辑，仍然由服务端的状态与命令控制。

本例刻意只实现开始、计时和结束三个环节。玩家死亡重生后，标签和分数仍可能保留；创造模式、旁观模式及传送也没有被本例自动排除。如果我们准备将它用于正式竞赛，便应当先确定这些情况下比赛是继续、取消还是重新开始，再补上相应的检测和清理逻辑。

## 参考资料

- [tick.json](https://learn.microsoft.com/en-us/minecraft/creator/documents/tickjsonintroduction?view=minecraft-bedrock-stable)。
- [execute命令](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/commandsreference/examples/commands/execute?view=minecraft-bedrock-stable)与[scoreboard命令](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/commandsreference/examples/commands/scoreboard?view=minecraft-bedrock-stable)。
- [原版实体样例](https://github.com/Mojang/bedrock-samples/tree/main/behavior_pack/entities)。示例完成静态核对后仍需在目标世界按上述步骤验收。
