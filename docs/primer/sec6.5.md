# 自定义实体生成规则

现在我们已经能够通过命令创建教学向导。不过，命令成功只说明实体已经注册，并不能证明它能够自然出现。在本节中，我们一起来为它添加**生成规则**（**Spawn Rule**），让它有机会在符合条件的地表环境中生成。

生成规则位于行为包的`spawn_rules`目录。它与`entities`目录中的服务端定义相互配合：前者决定在哪里、在什么条件下考虑生成，后者决定生成出来的实体具有什么性质。

## 编写地表生成规则

创建`spawn_rules/guide.json`：

```json
{
  "format_version": "1.8.0",
  "minecraft:spawn_rules": {
    "description": {
      "identifier": "tutorial:guide",
      "population_control": "animal"
    },
    "conditions": [
      {
        "minecraft:spawns_on_surface": {},
        "minecraft:spawns_on_block_filter": "minecraft:grass_block",
        "minecraft:brightness_filter": {
          "min": 9,
          "max": 15,
          "adjust_for_weather": false
        },
        "minecraft:biome_filter": {
          "test": "has_biome_tag",
          "operator": "==",
          "value": "animal"
        },
        "minecraft:weight": {"default": 8},
        "minecraft:herd": {
          "min_size": 1,
          "max_size": 2
        },
        "minecraft:density_limit": {
          "surface": 2,
          "underground": 0
        }
      }
    ]
  }
}
```

文件名不必与实体文件名相同，但`description.identifier`必须与实体标识符一致。`population_control`选择参与的种群控制类别；这里让向导与动物类生成共同受到相应限制。它不是给实体添加一条`animal`家族标签，也不会自动赋予动物AI。

一个条件对象内的限制共同约束候选位置。这里要求地表生成、脚下是草方块、亮度在9至15之间，并且生物群系具有`animal`标签。最外层`conditions`可以容纳多套生成条件，但增加一套条件通常是在增加另一种可行生成方案，不能简单当作给前一套条件补充限制。

## 权重不是百分比

`minecraft:weight.default`写成8，并不代表每8秒生成一次，也不代表生成概率固定为8%。它是生成候选之间的相对权重。其他候选实体、位置是否可用、种群数量和生成周期都会影响我们最终观察到的结果。

`minecraft:herd`允许一次尝试形成1至2个向导的群组，实际结果仍可能受位置和数量限制。`minecraft:density_limit`则进一步限制附近相应类型的数量。把群组上限设得很大，并不能保证一次出现那么多个实体。

我们采用较低的密度，是因为向导只用于教学。正式玩法中应结合实体AI开销、玩家活动范围和世界整体生态调整，而不是只为了尽快看到结果而无限提高生成数量。

## 正确区分两种验证

第一步依旧使用：

```mcfunction
/summon tutorial:guide ~2 ~ ~
```

它验证实体本身可创建、可见并能运行行为。召唤命令不受这套自然生成条件的同样限制，因此在石头上召唤成功，并不会推翻“自然生成脚下需要草方块”的规则。

第二步才是自然生成验证。使用单独的测试世界，确认生物生成规则开启，前往有草方块、光照充足的合适生物群系，在正常模拟范围内移动并观察。如果附近已有很多动物，种群限制可能让向导暂时没有生成机会。

测试世界可以执行：

```mcfunction
/gamerule doMobSpawning true
/time set day
```

这两条命令为测试提供基本环境，但并不能强制下一次生成一定选择向导。我们应同时记录生物群系、模拟距离、附近动物数量和观察区域，避免把一次没有出现直接判断为JSON失效。

## 逐项收窄问题

如果`/summon`失败，先返回实体定义排查；如果召唤成功但自然生成长期没有结果，先检查`spawn_rules`目录和标识符，再核对光照、地表方块与群系标签。

为了定位条件，可以在测试副本中临时移除生物群系筛选，保持其余条件不变，然后观察。若结果发生变化，再核对目标生物群系的实际标签。不要同时删除光照、地表、密度等全部条件，否则即使出现实体，也无法确定原来是哪一项限制起了作用。

生成与消失还属于两套逻辑。本例没有主动加入距离消失组件，所以不要把“生成规则中的密度上限”理解为“超过上限后自动删除已有实体”。若作品需要实体离开玩家后消失，应另外研究实体的`minecraft:despawn`等行为。

## 参考资料与版本

- [Mojang牛生成规则](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/spawn_rules/cow.json)：地表、草方块、光照及群系标签组合。
- [官方实体生成讲解](https://learn.microsoft.com/en-us/minecraft/creator/documents/spawning/entityspawningdeepdive?view=minecraft-bedrock-stable)。
- [BDS稳定版生成规则模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/spawn/1.21.50/Spawn_Rules.json)与[预览版密度字段](https://github.com/bedrock-apis/bds-docs/blob/43e5ef4a981d4dc6698911a9f7e86bf95c5895a6/metadata/json_schemas/server/spawn/1.21.50/Spawn_DensityLimit.json)。

资料核查日期：2026-10-15。沿用稳定样例中的生成规则1.8.0格式；稳定数据基线1.26.50，预览数据基线1.26.70.20，仅交叉核对字段，不混用新特性。
