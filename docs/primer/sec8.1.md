# 自定义生物群系

如果我们希望一片平原铺满白色的方解石，单独添加一个方块还不够。我们还需要告诉世界生成器，在什么区域使用这种地表。本节便从这个目标出发，一起来制作一个具有独立标识符的白石平原。

## 先确定我们要改变什么

**生物群系**（**Biome**）描述某个区域采用的气候、地表材料、标签及相关设置。树木、矿石等内容则通常由**地物**（**Feature**，也译作**特征**）放置。我们看到的完整景观，是这些系统共同工作的结果。

本节采用当前稳定版的部分群系替换机制。`minecraft:replace_biomes`自1.21.110起无需实验性开关，而下面使用的`minecraft:surface_builder`按当前组件文档要求采用至少`1.26.30`的格式版本。请使用1.26.50系列稳定版或更新的兼容版本练习，并让行为包的`min_engine_version`至少为`[1, 26, 30]`。旧教程中“必须开启自定义生物群系实验”的说法，不应直接套用到本例。

为了观察世界生成变化，我们新建一个普通类型的创造模式测试世界，并在首次生成前启用行为包。已经保存的旧区块不会因为修改JSON就全部重新生成；超平坦世界也不适合用来验证本节的自然群系替换。

## 创建白石平原

在行为包中创建`biomes/chalk_plains.biome.json`：

```json
{
  "format_version": "1.26.30",
  "minecraft:biome": {
    "description": {
      "identifier": "tutorial:chalk_plains"
    },
    "components": {
      "minecraft:climate": {
        "temperature": 0.8,
        "downfall": 0.4,
        "snow_accumulation": [0.0, 0.125]
      },
      "minecraft:surface_builder": {
        "builder": {
          "type": "minecraft:overworld",
          "top_material": "minecraft:calcite",
          "mid_material": "minecraft:calcite",
          "foundation_material": "minecraft:stone",
          "sea_material": "minecraft:water",
          "sea_floor_material": "minecraft:gravel",
          "sea_floor_depth": 7
        }
      },
      "minecraft:tags": {
        "tags": ["overworld", "animal", "monster", "tutorial_chalk"]
      },
      "minecraft:replace_biomes": {
        "replacements": [
          {
            "dimension": "minecraft:overworld",
            "targets": ["plains"],
            "amount": 1.0,
            "noise_frequency_scale": 25
          }
        ]
      }
    }
  }
}
```

我们先看`surface_builder`。这里使用主世界的地表构建方式，将表层和表层下方的材料设置为方解石，其余部分仍使用石头、水和砂砾。这样，我们能通过明显的地表颜色识别测试区域。它并没有要求生成器把整座山改成方解石，也没有重新设计主世界的基础地形噪声。

然后是`replace_biomes`。当生成流程原本为某个位置选中了平原，替换规则便有机会将其改为我们的白石平原。`targets`在这个组件中必须使用不带命名空间的原版群系名称，所以这里写`plains`，不是`minecraft:plains`。而我们自己定义的群系标识符仍然应为`tutorial:chalk_plains`。

为了便于观察，我们暂时将`amount`设为1。完成基础测试后，可以改成0.35，观察部分平原被替换后的区域边界。这个值参与噪声判定，不是“每个区块独立掷一次35%的骰子”，也不表示整个世界有35%的面积会变成白石平原。

`noise_frequency_scale`影响替换噪声的变化频率。较小的值通常产生更连片、出现得更疏的区域，较大的值通常产生更零碎的区域。它的有效范围是大于0且不超过100。我们先保持25，避免同时调整两个变量后无法判断各自的作用。

## 使用标签连接后续内容

`tutorial_chalk`是我们添加的群系标签。它和群系标识符不是同一种名称，也不需要加冒号。下一节可以通过这个标签，将自定义地物限定到白石平原中。

`animal`、`monster`等已有标签可能参与原版生成或生物生成规则的筛选。添加标签不会复制某个原版群系的全部定义。因此，即使想让白石平原“类似平原”，也应逐项决定需要哪些规则，而不是认为写下`plains`标签就继承了一切。

客户端的天空、雾、水色和声音可以通过资源包中的客户端群系文件进一步设置；仅仅新增一个客户端群系定义，不会使服务端世界生成器凭空产生新的群系。本例先验证行为包的地表与替换效果，不添加额外的视觉配置。

## 找到并验证新群系

在允许命令的测试世界中执行：

```mcfunction
/locate biome tutorial:chalk_plains
```

根据返回的坐标前往对应区域，观察方解石地表。若找不到群系，先检查内容日志和行为包的加载状态，再确认世界在安装此定义之后才生成对应区域。替换目标是平原，因此身处海洋或沙漠时，脚下地形不会立即改变。

修改定义后，建议使用相同种子新建另一个测试世界比较；记录游戏版本、种子和启用的包。多个包都替换同一个群系时会竞争，不能仅凭加载顺序推断最后一定采用哪一个定义。也不要在已经长期游玩的世界里反复移除、改名群系来调试边界。

## 参考资料

- [群系替换组件及稳定化版本](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/biomesreference/examples/components/minecraftbiomes_replace_biomes?view=minecraft-bedrock-stable)。
- [地表构建器与最低格式版本](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/biomesreference/examples/components/minecraftbiomes_surface_builder?view=minecraft-bedrock-stable)。
- [当前原版平原定义](https://github.com/Mojang/bedrock-samples/blob/main/behavior_pack/biomes/plains.biome.json)及[预览版定义](https://github.com/Mojang/bedrock-samples/blob/preview/behavior_pack/biomes/plains.biome.json)。

核对日期为2026-10-15。原版内部文件的格式版本与公开组件页可能存在差异；本例采用公开文档更严格的版本要求。参见[资料来源与版本说明](../misc/source_guide.md)。
