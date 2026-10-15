# 自定义战利品表

前面我们已经让教学向导能够交易。本节再来学习另一类物品来源：实体死亡或方块被破坏时产生的**战利品**（**Loot**）。为了观察机制，我们将先给向导配置一个简单掉落，再把同样的文件结构用于方块。

**战利品表**（**Loot Table**）位于行为包的`loot_tables`目录。它描述如何从若干候选中抽取物品，以及如何修改抽取到的结果。交易表明确交换双方的物品，战利品表则关注一次触发过程中生成什么奖励。

## 创建向导的掉落

创建`loot_tables/entities/guide.json`：

```json
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:cobblestone",
          "weight": 1,
          "functions": [
            {
              "function": "set_count",
              "count": {"min": 1, "max": 3}
            }
          ]
        }
      ]
    },
    {
      "rolls": 1,
      "conditions": [
        {"condition": "killed_by_player"},
        {"condition": "random_chance", "chance": 0.25}
      ],
      "entries": [
        {"type": "item", "name": "tutorial:token", "weight": 3},
        {"type": "item", "name": "tutorial:travel_ration", "weight": 1}
      ]
    }
  ]
}
```

第一层`pools`包含两个**战利品池**（**Loot Pool**）。第一个池抽取一次，只有圆石一个候选，再由`set_count`将数量设为1至3。第二个池要求玩家击杀，并额外通过25%的随机条件，然后在代币与口粮之间抽取一项。

我们可以由此分清三个容易混淆的量：`rolls`是抽取次数，`weight`是候选的相对权重，`set_count`修改的是已选中物品的数量。把`rolls`设为3，意味着进行三次抽取，不一定等价于获得三个相同物品。

对于本例，在玩家击杀且第二池条件成立后，代币被选中的概率为3/4，口粮为1/4。结合25%的池条件，单次符合玩家击杀条件的死亡事件中，额外得到代币的理论概率为18.75%，口粮为6.25%。这不是“击杀四次必定触发一次”，而是独立随机试验的概率描述。

## 将表连接到实体

在`entities/guide.json`的基础`components`中加入：

```json
{
  "minecraft:loot": {
    "table": "loot_tables/entities/guide.json"
  }
}
```

这里仍然是需要合并的组件片段。文件名中的`entities`只是我们组织目录的方式，真正建立联系的是组件中的路径。没有这条引用，战利品表即使语法完全正确，也不会自动分配给同名实体。

重新进入测试世界后，生成一个新的向导，使用生存模式亲自击杀它。预期每次产生1至3个圆石，偶尔额外产生一份代币或口粮。请同时确认测试世界允许生物掉落：

```mcfunction
/gamerule doMobLoot true
```

用命令移除实体、由环境造成死亡和玩家亲自击杀可能提供不同的战利品上下文。检查`killed_by_player`时，应使用真正的玩家击杀过程，不能把任意`/kill`结果当作等价证据。

## 为方块设置固定掉落

我们再给前面制作的石台设置“破坏后掉落自身”。创建`loot_tables/blocks/stone_platform.json`：

```json
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {"type": "item", "name": "tutorial:stone_platform", "weight": 1}
      ]
    }
  ]
}
```

在石台方块定义的`components`中加入：

```json
{
  "minecraft:loot": "loot_tables/blocks/stone_platform.json"
}
```

注意实体的`minecraft:loot`使用带`table`字段的对象，方块的同名组件在本例使用路径字符串。组件名称相同，并不意味着在所有类型的定义文件中都采用相同结构。

现在用生存模式破坏石台，应获得一个石台物品；创造模式直接破坏方块通常不按这个测试目标掉落物品。若需要精准采集、时运或工具类型限制，则应继续加入相应条件和函数，而不是仅修改掉落物品的名字。

## 把随机性与错误分开

排查时，先检查无条件圆石池。如果它也没有掉落，优先检查组件引用、文件路径、游戏规则及内容日志。若圆石稳定出现但奖励暂时不出现，应先确认玩家击杀条件，再考虑25%的随机性。

为了验证奖励池，可以在测试副本中暂时把`chance`改为1，使每次玩家击杀都进入该池。确认物品均能生成后，再恢复0.25。这是一种去除随机干扰的调试方法，并不意味着最终作品应该保持100%的奖励概率。

至此，我们已经将物品、方块与实体连接成一组可体验的内容。下一章将继续学习粒子，让这些内容拥有更加丰富的表现。

本章所用的当前格式文件已经合并在[完整教学示例](https://github.com/MiemieMethod/bedrock-addon-tutorial/tree/main/examples/entities)中。它包含对应行为包与资源包，方便我们核对逐节合并后的结果；历史格式仅在正文中用于阅读。

## 参考资料与版本

- [Mojang牛战利品表](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/loot_tables/entities/cow.json)：池、数量函数与条件函数组合。
- [官方战利品与交易表入门](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoloottables?view=minecraft-bedrock-stable)。
- [官方战利品条件](https://learn.microsoft.com/en-us/minecraft/creator/documents/loottableconditions?view=minecraft-bedrock-stable)。
- [BDS方块组件模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/block/1.26.20/Components.json)。

资料核查日期：2026-10-15。示例面向稳定通道，概率为表结构推导，未声称通过游戏中的大样本统计验证。
