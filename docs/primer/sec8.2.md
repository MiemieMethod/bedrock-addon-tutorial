# 自定义地物

上一节中，我们已经为白石平原指定了地表材料。现在我们希望在这片平原上偶尔看到南瓜。南瓜既不是整个群系的地表，也不是由实体生成规则产生的生物，因此我们需要使用地物系统。

## 区分地物和地物规则

**地物**（**Feature**）描述一次放置尝试具体做什么，例如放置一个南瓜、生成一簇矿石，或者调用另一个地物。**地物规则**（**Feature Rule**）则将地物接入世界生成，描述它在哪些群系、哪个阶段，以及按照怎样的分布进行尝试。

这两类文件都放在行为包中，分别使用`features`和`feature_rules`目录。仅仅定义地物不会让它自动出现在世界里；仅仅定义规则，却引用了不存在的地物，也无法得到结果。接下来我们便把两端一起完成。

## 定义单方块地物

新建`features/chalk_pumpkin_feature.json`：

```json
{
  "format_version": "1.21.40",
  "minecraft:single_block_feature": {
    "description": {
      "identifier": "tutorial:chalk_pumpkin_feature"
    },
    "places_block": "minecraft:pumpkin",
    "enforce_placement_rules": true,
    "enforce_survivability_rules": true,
    "may_attach_to": {
      "bottom": ["minecraft:calcite"]
    },
    "may_replace": ["minecraft:air"]
  }
}
```

我们使用了**单方块地物**（**Single Block Feature**）。它在输入位置尝试放置一个南瓜，要求下方为方解石，并且当前位置只能是空气。因此，即使规则给出的坐标恰好被树干占据，也不会直接把树干替换成南瓜。

`enforce_placement_rules`与`enforce_survivability_rules`分别要求遵守方块本身的放置和存活限制。某些植物对下方方块有特殊要求，不能只修改`may_attach_to`，就以为它们可以在任意材料上正常生长。此处选择原版南瓜，正是为了先减少自定义方块行为带来的额外变量。

文件名的主体与标识符冒号后的名称一致。我们采用这个规则组织文件，也便于在内容日志报告某个地物名称时迅速找到对应定义。

## 接入群系生成

接下来新建`feature_rules/chalk_pumpkin_rule.json`：

```json
{
  "format_version": "1.21.40",
  "minecraft:feature_rules": {
    "description": {
      "identifier": "tutorial:chalk_pumpkin_rule",
      "places_feature": "tutorial:chalk_pumpkin_feature"
    },
    "conditions": {
      "placement_pass": "after_surface_pass",
      "minecraft:biome_filter": [
        {
          "test": "has_biome_tag",
          "operator": "==",
          "value": "tutorial_chalk"
        }
      ]
    },
    "distribution": {
      "iterations": 4,
      "coordinate_eval_order": "xzy",
      "x": {
        "distribution": "uniform",
        "extent": [0, 16]
      },
      "z": {
        "distribution": "uniform",
        "extent": [0, 16]
      },
      "y": "query.heightmap(variable.worldx, variable.worldz)"
    }
  }
}
```

我们可以看到，规则通过`places_feature`引用了刚才的地物。`has_biome_tag`筛选上一节设置的`tutorial_chalk`，所以无需在每条地物规则中重复书写群系替换条件。

**放置阶段**（**Placement Pass**）设置为`after_surface_pass`，使尝试发生在地表处理之后。`x`和`z`在区块范围内取值，`y`通过高度图查询得到。由于高度查询需要使用已经求出的水平坐标，我们明确设置`coordinate_eval_order`为`xzy`，让Y最后求值。

`iterations: 4`代表进行4次尝试，不保证最终一定能看到4个南瓜。重复位置、非空气位置、下方材料不符合要求等情况都会影响结果。这个区别在矿石和树木生成中也很重要：配置中的尝试次数，不能直接当作玩家最终能采集到的数量。

## 观察结果并调整分布

将两个文件连同上一节的群系文件放入同一个行为包，在新建普通世界中测试。用`/locate biome tutorial:chalk_plains`找到目标区域后，预期能看到部分方解石表面出现南瓜。

我们先保持群系替换比例为1，方便查找。确认生成链路工作后，再分别调整群系替换比例与地物尝试次数。如果想验证地物而暂时不制作自定义群系，也可以把过滤标签改为`plains`，并将地物的下方允许材料改成`minecraft:grass_block`；这两个位置必须配套修改。

完全找不到南瓜时，按照“规则是否加载—过滤器是否命中—引用的地物是否存在—位置是否满足约束”的顺序排查。不要一开始就删除所有约束：那样即使看见了南瓜，也可能只是把它生成在空中或嵌进了地表。修改定义后仍需前往新生成区域，或使用同一种子新建世界。

## 将简单地物组合起来

当一个南瓜能够正确生成后，我们还可以使用`minecraft:scatter_feature`在一次调用内再次分散位置，使用`minecraft:aggregate_feature`尝试放置多个子地物，或使用`minecraft:weighted_random_feature`从不同装饰中按权重选择一种。

这些组合地物引用的是地物标识符，组成的关系不应形成无限循环。例如，A引用B而B又无条件引用A，并不能表达“多种装饰交替生成”。在扩展之前，先把每一种叶子地物单独验证清楚，再增加组合层次，排错会容易得多。

## 参考资料

- [单方块地物](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/featuresreference/examples/features/minecraftsingle_block_feature?view=minecraft-bedrock-stable)。
- [地物与地物规则介绍](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/featuresreference/examples/featuresintroduction?view=minecraft-bedrock-stable)。
- [世界生成流程及地物规则示例](https://learn.microsoft.com/en-us/minecraft/creator/documents/world-generation?view=minecraft-bedrock-stable)。

本节于2026-10-15核对稳定版文档，沿用上一节的1.26.50系列游戏测试环境。示例未经过实际世界生成运行，南瓜的最终密度还需按上述步骤验收。
