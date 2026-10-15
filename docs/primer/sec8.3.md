# 结构与地物的配合

如果希望在白石平原中增加一座由石头和荧石组成的小路标，逐个方块编写地物会显得繁琐。我们可以先在游戏中搭建路标，把它保存成**结构模板**（**Structure Template**），再让地物调用这个模板。本节一起完成从搭建到自然生成的流程。

## 保存一个可以移动的路标

我们先在独立的创造模式测试世界中选择一块空旷区域。以下命令会修改给出的坐标，请确保那里没有需要保留的建筑，并且区块处于加载状态：

```mcfunction
/fill 0 100 0 2 100 2 minecraft:stone
/setblock 1 101 1 minecraft:glowstone
/structure save tutorial:waymarker 0 100 0 2 101 2 false disk true
/structure load tutorial:waymarker 6 100 0
```

前两条命令制作一个3×3的石头底座，并在中心放置一块荧石。第三条命令保存从`[0, 100, 0]`到`[2, 101, 2]`的区域，包含两端，因此模板尺寸为3×2×3；`false`表示不保存实体，`disk`表示持久保存到这个世界中，最后的`true`表示保存方块。第四条命令将其复制到旁边，以便检查尺寸是否正确。

这里有一个容易忽略的区别：保存到世界数据库，并不等于已经在行为包目录中获得了`.mcstructure`文件。要让其他世界使用这个路标，我们还需要导出结构。

在支持结构导出的Windows客户端中，可以用`/give @s minecraft:structure_block`获得结构方块。将其放在模板外，设置为保存模式，名称填`tutorial:waymarker`，并让边界框恰好覆盖前面的3×2×3区域。例如，将结构方块放在`[5, 100, 0]`，相对偏移设为`[-5, 0, 0]`，尺寸设为`[3, 2, 3]`。关闭实体保存，再使用导出按钮取得文件。

将导出的文件命名为`waymarker.mcstructure`，放入行为包的`structures/tutorial/`目录。这样，对应的结构标识符就是`tutorial:waymarker`。`.mcstructure`是二进制数据文件，不应在文本编辑器中手写成JSON。没有导入、导出按钮的平台，可以加载已经包含结构文件的行为包；本练习的模板需要先在支持导出的环境中通过上述步骤产生。结构方块的“3D导出”模式产生的是另一种模型文件，不能替代这里的结构模板。

## 使用结构模板地物

创建`features/waymarker_feature.json`：

```json
{
  "format_version": "1.13.0",
  "minecraft:structure_template_feature": {
    "description": {
      "identifier": "tutorial:waymarker_feature"
    },
    "structure_name": "tutorial:waymarker",
    "adjustment_radius": 4,
    "facing_direction": "random",
    "constraints": {
      "grounded": {},
      "unburied": {},
      "block_intersection": {
        "block_allowlist": ["minecraft:air"]
      }
    }
  }
}
```

`structure_name`引用结构标识符，不包含`.mcstructure`扩展名。`adjustment_radius`允许放置器在候选位置附近寻找满足约束的位置；这里最多调整4格，并不表示路标本身的大小。`facing_direction: "random"`允许随机选择朝向，本例左右对称，旋转效果并不明显，大家可以在一侧再加一块不同颜色的方块观察朝向。

三个约束分别要求结构落地、上方不被埋住，以及只与允许的方块相交。我们暂时只允许空气，因此路标不能随意穿进山坡或树干。这里的放置失败是正常结果之一：地物不会为了满足尝试次数而无条件清理地形。

## 将路标放入白石平原

创建`feature_rules/waymarker_rule.json`：

```json
{
  "format_version": "1.13.0",
  "minecraft:feature_rules": {
    "description": {
      "identifier": "tutorial:waymarker_rule",
      "places_feature": "tutorial:waymarker_feature"
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
      "iterations": 1,
      "scatter_chance": {
        "numerator": 1,
        "denominator": 4
      },
      "coordinate_eval_order": "xzy",
      "x": {"distribution": "uniform", "extent": [0, 16]},
      "z": {"distribution": "uniform", "extent": [0, 16]},
      "y": "query.heightmap(variable.worldx, variable.worldz)"
    }
  }
}
```

它与上一节的南瓜规则使用相同的群系标签与高度查询，但增加了`scatter_chance`。这让一部分候选尝试被跳过，避免路标过于密集。通过概率筛选之后，结构仍然要满足自身的放置约束，所以它不等于“严格每4个区块生成一个”。

先在另一个启用了行为包的新世界中执行`/structure load tutorial:waymarker ~2 ~ ~2`，确认包内文件能够独立加载，再观察新生成的白石平原。使用新的世界很重要：制作世界中保存的同名结构可能让我们误以为包内文件已经放置正确。

## 分开检查模板和生成规则

如果命令也不能加载路标，应先检查导出文件、目录层级和命名空间。若命令可以加载，但自然生成始终没有出现，则继续检查地物引用、群系过滤、生成区域和约束。可以在测试副本中暂时将概率改成1/1，提高观察机会；确认后再恢复合适的密度。

导出范围中的空气也属于模板内容，因此边界框不宜无谓地包住大块空白区域。模板尺寸过大，或地面起伏超过可满足约束的范围，都可能降低成功率。结构模板地物适合本节这种整体放置的小物件；由许多可拼接房间组成的建筑，应进一步研究拼图结构系统，而不是无限扩大这个模板。

## 参考资料

- [结构命令与保存模式](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/structure?view=minecraft-bedrock-stable)。
- [结构方块介绍](https://learn.microsoft.com/en-us/minecraft/creator/documents/structures/introductiontostructureblocks?view=minecraft-bedrock-stable)。
- [结构模板地物及放置约束](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/featuresreference/examples/features/minecraftstructure_template_feature?view=minecraft-bedrock-stable)。

本节于2026-10-15依据稳定版文档核对。模板导出、自然生成与地形适配均需在目标游戏环境中实际验收。
