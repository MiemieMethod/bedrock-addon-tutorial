# 自定义配方

在上一节中，我们通过命令获得了旅行口粮。不过，在真正的生存玩法中，玩家通常需要通过收集材料制作物品。在本节中，我们一起来为口粮设计配方，并借此区分不同配方对材料排列的要求。

配方定义位于行为包的`recipes`目录。它描述输入如何得到输出，本身不会注册一个新物品。因此，我们应先确认`/give @s tutorial:travel_ration`能够成功，再开始检查配方。否则，配方与物品同时报错，便很难确定问题的来源。

## 有序合成配方

我们先规定：用两份小麦夹住一个苹果，制作两份旅行口粮。在`recipes/travel_ration.json`中写入：

```json
{
  "format_version": "1.20.10",
  "minecraft:recipe_shaped": {
    "description": {
      "identifier": "tutorial:travel_ration_from_apple"
    },
    "tags": ["crafting_table"],
    "pattern": ["WAW"],
    "key": {
      "W": {"item": "minecraft:wheat"},
      "A": {"item": "minecraft:apple"}
    },
    "unlock": [
      {"item": "minecraft:apple"}
    ],
    "result": {
      "item": "tutorial:travel_ration",
      "count": 2
    }
  }
}
```

**有序合成配方**（**Shaped Recipe**）使用`pattern`描述材料的位置。数组中的每个字符串是一行，每个字符是一个格子，因此`["WAW"]`表示一行三个格子。字符`W`和`A`并没有预设含义，它们通过`key`与物品标识符建立联系。若要留空格，应在字符串中使用空格字符，并且不要为这个空格定义材料。

`description.identifier`是配方的标识符，`result.item`是结果物品的标识符，两者无需相同。一个口粮可以拥有多种配方，每种配方仍应使用自己的标识符，避免文件之间互相覆盖。

这里的`tags`选择能够使用此配方的工作台环境。因为配方占三个横向格子，玩家需要工作台的3×3合成区域，无法将它放入物品栏的2×2区域。`unlock`则关系到配方解锁与配方书展示；它不应被误认为创造一个物品的必需步骤。测试时，取得苹果后再观察配方书，并同时测试手动摆放材料的结果。

## 无序合成配方

我们还希望玩家能用一个面包和一个苹果制作两份口粮，不必考虑排列。为此创建第二份文件`recipes/travel_ration_shapeless.json`：

```json
{
  "format_version": "1.20.10",
  "minecraft:recipe_shapeless": {
    "description": {
      "identifier": "tutorial:travel_ration_from_bread"
    },
    "tags": ["crafting_table"],
    "ingredients": [
      {"item": "minecraft:bread"},
      {"item": "minecraft:apple"}
    ],
    "unlock": [{"item": "minecraft:bread"}],
    "result": {
      "item": "tutorial:travel_ration",
      "count": 2
    }
  }
}
```

**无序合成配方**（**Shapeless Recipe**）使用`ingredients`列出材料。我们把面包放在左上、苹果放在右下，或交换位置，都应得到同样的结果。材料数量不能通过把物品堆叠到一个格子来代替；如果配方需要两份同一种材料，应在材料列表中写出相应数量的材料项，并分别占用需要的格子。

如果希望一组材料中的任一种都能参与配方，可以使用已定义的物品标签。原版火把配方以`{"tag":"minecraft:coals"}`接受属于该标签的材料。这里的材料标签与外层`tags`不同：前者筛选物品，后者选择制作环境，不能因为名称相近便相互替换。

## 熔炉配方

接下来，我们额外设计一个练习：将腐肉烧制成皮革。在`recipes/leather_from_rotten_flesh.json`中写入：

```json
{
  "format_version": "1.20.10",
  "minecraft:recipe_furnace": {
    "description": {
      "identifier": "tutorial:leather_from_rotten_flesh"
    },
    "tags": ["furnace"],
    "input": "minecraft:rotten_flesh",
    "output": "minecraft:leather"
  }
}
```

这份配方只有一个输入与一个输出，没有`pattern`和`key`。它改变了我们作品中的获取规则，并不表示原版游戏本来就能烧制腐肉。这里仅指定普通熔炉；若希望使用烟熏炉或高炉，应有意识地选择对应制作环境，再分别验证，而不是把所有标签都加进去。

## 验证与排查

重新进入测试世界，准备小麦、苹果、面包和工作台。先测试有序配方，再交换苹果与小麦的位置，确认错误排列不能制作。随后测试无序配方的不同排列，最后把腐肉放入熔炉，并添加燃料。

如果配方完全没有输出，先查看内容日志是否报告无效结果物品，再检查文件是否位于行为包`recipes`目录。如果只有配方书不显示，而手动摆放能够制作，应继续核查解锁条件及配方书筛选。两个文件若误用了同一个配方标识符，也可能出现加载顺序相关的覆盖问题。

我们还应测试一次完整闭环：收集材料、合成口粮、在饥饿时食用。这样验证的是玩家真正经历的玩法过程，而不仅是某个JSON文件没有语法错误。下一章我们将从可携带的物品转向世界中可以放置的方块。

## 参考资料与版本

- [Mojang火把配方](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/recipes/torch.json)：有序配方、材料标签及解锁字段。
- [官方无序配方参考](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_shapeless?view=minecraft-bedrock-stable)与[熔炉配方参考](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/recipereference/examples/recipedefinitions/minecraftrecipe_furnace?view=minecraft-bedrock-stable)。

资料核查日期：2026-10-15。示例使用配方格式1.20.10，并面向稳定通道；配方格式号与物品格式号不要求相同。
