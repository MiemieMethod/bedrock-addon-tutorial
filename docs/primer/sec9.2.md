# 函数与函数滴答

如果每次开始测试都要输入几条相同的命令，我们便可以把它们保存成**函数**（**Function**）。函数文件是一份按顺序执行的命令列表，属于行为包。本节先制作一个手动调用的函数，再让游戏周期性调用另一个函数。

## 创建第一个函数

在已经具有有效清单的行为包中创建`functions/tutorial/welcome.mcfunction`：

```mcfunction
# 这个函数由玩家手动调用
tellraw @s {"rawtext":[{"text":"欢迎进入附加包测试世界。"}]}
give @s minecraft:apple 1
```

每条命令单独占一行，不写聊天栏使用的`/`前缀。以`#`开头的行是注释，不参与执行。保存后，在启用了行为包、允许命令的世界中输入：

```mcfunction
/function tutorial/welcome
```

预期自己收到一条消息和一个苹果。`tutorial/welcome`对应`functions`目录下的相对路径，不带`.mcfunction`后缀。函数路径使用斜杠，不要因为实体标识符使用冒号，就将它写成`tutorial:welcome`。

修改函数后，可以执行`/reload`重新加载，再次调用。函数成功执行只说明本次调用完成了相应命令，不表示它会自动定时重复。同样，连续写两条命令也不会自动等待两秒，它们通常在同一次函数调用内顺序执行。

## 让函数跟随游戏刻运行

**游戏刻**（**Game Tick**）是游戏逻辑推进的单位。正常速度下，每秒20个游戏刻；如果服务器运行缓慢，实际经过的现实时间可能更长。函数滴答使用游戏刻，不是每秒10次的红石刻。

行为包根目录下的`functions/tick.json`用于列出每个游戏刻调用的函数。我们先创建它：

```json
{
  "values": [
    "tutorial/tick"
  ]
}
```

再创建`functions/tutorial/tick.mcfunction`：

```mcfunction
execute if entity @a[tag=tutorial_clock_ready] run function tutorial/clock
```

这里暂时只做一次条件检查。没有加入测试的玩家时，不继续运行计时逻辑。我们通过标签控制启停，也避免世界刚开始加载、玩家尚未准备好时就直接操作玩家。

## 使用记分板计时

新建`functions/tutorial/clock_setup.mcfunction`：

```mcfunction
scoreboard objectives add tut_clock dummy
scoreboard players set clock tut_clock 0
tag @s add tutorial_clock_ready
tellraw @s {"rawtext":[{"text":"计时练习已启动。"}]}
```

`tut_clock`是一个**记分项**（**Objective**），`dummy`表示分数由我们的命令管理。名为`clock`的记分对象不需要对应真实玩家，用来保存整个练习共用的计数。

新建`functions/tutorial/clock.mcfunction`：

```mcfunction
scoreboard players add clock tut_clock 1
execute if score clock tut_clock matches 20.. run function tutorial/second
execute if score clock tut_clock matches 20.. run scoreboard players set clock tut_clock 0
```

最后创建`functions/tutorial/second.mcfunction`：

```mcfunction
title @a[tag=tutorial_clock_ready] actionbar 又经过了20个游戏刻。
```

准备好这些文件后，重新加载函数，在聊天栏执行：

```mcfunction
/function tutorial/clock_setup
```

预期动作栏约每秒更新一次提示。每次滴答给`clock`加1，到达20时执行`second`，然后归零。顺序不能随意交换：如果先归零，再检查是否达到20，提示便不会出现。

`clock_setup`是显式初始化入口，不应放进`tick.json`。再次手动执行它时，已经存在的记分项可能给出提示，而后续归零操作仍会重置这个练习的计时。真实项目中应当把首次创建、玩家加入和重置进度分开管理。

## 停止、恢复与多人测试

执行以下命令即可让自己退出练习：

```mcfunction
/tag @s remove tutorial_clock_ready
```

所有在线玩家都没有这个标签时，条件不成立，计数暂停。保留其他参与者时，计数仍然推进，并只向参与者显示提示。再次添加标签即可恢复；这时不需要重新创建记分项，也不会因新玩家加入而把现有计数清零。

如果提示出现得过快，应检查是否有两个滴答入口都调用了`clock`。不同启用的行为包中的`tick.json`会共同运行，不能假设只有某一个文件生效。若完全没有提示，先确认自己的标签，再用`/scoreboard players list clock`观察数值，最后检查`tick.json`路径与`values`内容。

逐刻执行适合少量必要检查，不适合把大范围扫描、结构放置或成千上万条命令全塞进去。我们已经可以通过计数降低某些任务的执行频率，也可以把任务分配到不同阶段。下一节将进一步用标签记录状态变化，使效果只在玩家进入区域时触发。

## 参考资料

- [函数文件与调用路径](https://learn.microsoft.com/en-us/minecraft/creator/documents/functionsintroduction?view=minecraft-bedrock-stable)。
- [`tick.json`与加载时机](https://learn.microsoft.com/en-us/minecraft/creator/documents/tickjsonintroduction?view=minecraft-bedrock-stable)。
- [记分板命令](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/scoreboard?view=minecraft-bedrock-stable)。

本节于2026-10-15核对稳定版语法；逐刻运行、暂停恢复和多人效果需要在目标世界中验收。
