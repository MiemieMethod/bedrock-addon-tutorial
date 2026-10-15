# 将函数应用到附加包的方方面面

函数可以调用其他函数，也可以与我们已经制作的物品、实体、粒子和结构配合。不过，真正开始编排玩法时，难点往往不在于“怎样再执行一条命令”，而在于“这条命令应该由谁、在什么位置、执行几次”。本节一起制作一个进入平台时给予反馈的小练习。

## 明确这个玩法的状态

我们希望玩家站到金块上时，收到一条消息并看到火星；继续停留时不重复触发；离开后再次回来时，可以再触发一次。这里至少有两种状态：尚未站上平台，以及已经站在平台上。

我们用`ta_on_pad`标签记录后一种状态。只有“当前脚下是金块，而且没有标签”的玩家才进入平台；“当前脚下不是金块”的玩家则清除标签。这样，逐刻检查的是状态，而视觉效果只在状态发生变化时执行。

本节依赖第七章的`tutorial:spark`粒子资源包，以及包含函数的行为包。测试世界应允许命令。为避免与上一节练习混淆，我们使用独立的`functions/tutorial/pad/`目录和`tut_visits`记分项。

## 准备平台和初始化入口

先在空旷的测试场地放置一小块金块平台。也可以在确认脚下区域可以修改后执行：

```mcfunction
/fill ~-1 ~-1 ~-1 ~1 ~-1 ~1 minecraft:gold_block
```

创建`functions/tutorial/pad/setup.mcfunction`：

```mcfunction
scoreboard objectives add tut_visits dummy
scoreboard players set @s tut_visits 0
tag @s remove ta_on_pad
tag @s add ta_pad_player
tellraw @s {"rawtext":[{"text":"平台练习已准备好，请走上金块。"}]}
```

`ta_pad_player`指定参与练习的玩家。初始化入口由玩家在聊天栏手动执行，因而`@s`对应这个玩家。重复执行会把自己的进入次数归零，也会清除当前平台状态；不要把初始化函数作为每刻调用的入口。

## 将每个玩家作为独立的执行者

创建`functions/tutorial/pad/tick.mcfunction`：

```mcfunction
execute as @a[tag=ta_pad_player] at @s run function tutorial/pad/player_tick
```

然后创建`functions/tutorial/pad/player_tick.mcfunction`：

```mcfunction
execute if block ~ ~-1 ~ minecraft:gold_block unless entity @s[tag=ta_on_pad] run function tutorial/pad/enter
execute unless block ~ ~-1 ~ minecraft:gold_block run tag @s remove ta_on_pad
```

第一层函数选择参与者，第二层函数始终围绕单个参与者工作。`as`使`@s`指向当前玩家，`at @s`使脚下方块检查发生在该玩家的位置。这也让多人同时进入平台时，每个人拥有自己的状态，不会因为某一个玩家已经进入，就阻止其他玩家触发。

再创建`functions/tutorial/pad/enter.mcfunction`：

```mcfunction
tag @s add ta_on_pad
scoreboard players add @s tut_visits 1
tellraw @s {"rawtext":[{"text":"这是你第"},{"score":{"name":"@s","objective":"tut_visits"}},{"text":"次进入平台。"}]}
particle tutorial:spark ~ ~1 ~
```

我们先添加标签，再执行提示和粒子，让后续滴答能够识别玩家已经处于平台状态。次数存放在玩家自己的记分对象上，通过原始文本中的`score`内容显示，不需要手动把分数拼成字符串。

## 注册并观察完整流程

如果行为包已有上一节的`functions/tick.json`，将新入口追加到`values`中，得到：

```json
{
  "values": [
    "tutorial/tick",
    "tutorial/pad/tick"
  ]
}
```

如果没有保留上一节的练习，则只留下`"tutorial/pad/tick"`。不要引用实际不存在的函数。

重新加载后执行：

```mcfunction
/function tutorial/pad/setup
```

先走离金块，再走上平台，预期显示进入次数并出现火星；停留几秒，不应重复提示；走开再回来，次数应增加。由于当前条件只检查脚下方块类型，任何位置的金块都能触发，而且从一块金块连续走到相邻金块不会算作重新进入。

如果希望平台只有一个固定位置，可以进一步增加区域限制或在入口先指定维度。不要直接以每个玩家的相对位置生成一个新平台，否则“检查平台”和“创建平台”会互相影响。本例也没有把客户端粒子当作判定依据：即使玩家关闭了某些视觉效果，进入状态仍由服务端命令判断。

## 将相同组织方式用于其他内容

这个流程可以扩展到很多场景。比如，将`enter`中的粒子替换为`give`，就可以制作进入提示与物品反馈；调用一个明确的实体事件，可以让自定义实体切换状态；调用`structure load`，可以在指定位置展示已经导出的结构。

扩展时要先决定重复执行的后果。一个每刻发出提示的错误可能只会刷屏，而每刻给予物品或放置结构，会持续改变存档。如果奖励只允许领取一次，应使用独立的领取记录，而不是离开平台就删除的`ta_on_pad`。如果结构只需要初始化一次，也应把它放入初始化函数，而非玩家的逐刻检查中。

结束练习时执行`/tag @s remove ta_pad_player`，并用`/tag @s remove ta_on_pad`清除自己的平台状态。多人测试应分别检查两名玩家同时进入、单独退出、重新加入和切换维度的情况。脚下检测对跳跃也会产生离开判定；如果实际玩法不允许跳跃后重新触发，需要改成区域进入检测，或另加冷却计数。

没有反馈时，先确认参与标签，再确认逐刻入口，最后分别测试`tutorial/pad/enter`中的命令。反馈重复时，则重点检查状态标签是否被其他函数清除，以及玩家是否因跳跃、边缘移动而短暂离开检测条件。把“选择目标”“判断状态”和“执行效果”分开后，我们便能更清楚地定位问题。

## 参考资料

- [函数文件与组织方式](https://learn.microsoft.com/en-us/minecraft/creator/documents/functionsintroduction?view=minecraft-bedrock-stable)。
- [`execute`条件与上下文](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/execute?view=minecraft-bedrock-stable)。
- [`tellraw`命令](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/tellraw?view=minecraft-bedrock-stable)。
- [BDS稳定分支命令签名](https://github.com/bedrock-apis/bds-docs/blob/stable/metadata/command_modules/mojang-commands.json)。

本节于2026-10-15核对稳定版语法。示例表达的是平台状态机，尚需在目标客户端与多人环境中完成行为验收。
