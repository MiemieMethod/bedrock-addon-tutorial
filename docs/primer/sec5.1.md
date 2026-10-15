# 自定义旧版格式方块

在学习当前方块定义之前，我们先一起阅读一份旧式方块。这样，当我们在历史作品中看到`minecraft:destroy_time`或`blocks.json`时，便能够区分它们各自负责的内容，也能够判断哪些字段需要迁移。

> 本节旧格式示例只用于历史阅读。新作品请使用下一节的当前格式。中国版的`netease:block_geometry`、`netease:aabb`、`base_block`等扩展不属于这里的国际版格式，不能直接复制到国际版包中。

## 从一个石质方块开始

设想我们希望制作一块教学用石材。在旧作品的行为包`blocks/teaching_stone.json`中，可能会看到下面这样的定义：

```json
{
  "format_version": "1.10.0",
  "minecraft:block": {
    "description": {
      "identifier": "tutorial:teaching_stone"
    },
    "components": {
      "minecraft:destroy_time": 1.5,
      "minecraft:explosion_resistance": 6.0,
      "minecraft:friction": 0.6,
      "minecraft:map_color": "#888888"
    }
  }
}
```

这份定义给出了方块的身份及部分物理属性，却没有给出纹理图片。旧式完整立方体通常还会在资源包根目录的`blocks.json`中登记外观：

```json
{
  "format_version": [1, 1, 0],
  "tutorial:teaching_stone": {
    "textures": "tutorial:teaching_stone",
    "sound": "stone"
  }
}
```

我们可以看到，`blocks.json`的键是方块标识符，而`textures`中的字符串是纹理短名称。二者恰好相同只是命名上的选择，实际上属于两套索引。我们还需要在资源包的`textures/terrain_texture.json`中建立纹理映射：

```json
{
  "resource_pack_name": "tutorial",
  "texture_name": "atlas.terrain",
  "padding": 8,
  "num_mip_levels": 4,
  "texture_data": {
    "tutorial:teaching_stone": {
      "textures": "textures/blocks/stone"
    }
  }
}
```

这里借用原版石头的纹理。**地形图集**（**Terrain Atlas**）将方块纹理组织为渲染所用的图集，`texture_data`则为我们提供访问这些纹理的短名称。物品图集使用`atlas.items`，这里使用`atlas.terrain`，不能互相替换。

## 区分三种版本信息

刚才三份文件并没有写成同一个格式版本：方块定义是字符串`"1.10.0"`，资源索引是数组`[1, 1, 0]`，图集示例没有同样的格式字段。这并不矛盾，因为它们是三种不同的文件格式。

我们在清单中填写的`min_engine_version`又是另外一回事。它说明包所要求的引擎下限，不能代替各个内容文件的`format_version`。将所有数字机械地统一成游戏版本，反而可能让某类文件无法解析。

同样，旧教程所说的“新版方块需要实验”具有时间条件。当前自定义几何、材质和基本方块组件已经有稳定版接口；不能把旧文中对1.16.100的判断延伸到所有后续版本。

## 按功能迁移组件

现在我们准备保留教学石材的设计，并改用当前接口。迁移前可以先列出对应关系：

| 旧定义中的意图 | 当前编写方式 |
| --- | --- |
| 破坏所需的基础时间 | `minecraft:destructible_by_mining.seconds_to_destroy` |
| 爆炸抗性 | `minecraft:destructible_by_explosion.explosion_resistance` |
| 方块发光程度 | `minecraft:light_emission`，按0至15的整数亮度填写 |
| 光经过方块时的衰减 | `minecraft:light_dampening` |
| 模型和纹理的组合 | `minecraft:geometry`与`minecraft:material_instances` |
| 创造物品栏分类 | `description.menu_category` |

我们先只替换教学石材的行为包文件：

```json
{
  "format_version": "1.21.80",
  "minecraft:block": {
    "description": {
      "identifier": "tutorial:teaching_stone",
      "menu_category": {"category": "construction"}
    },
    "components": {
      "minecraft:geometry": "minecraft:geometry.full_block",
      "minecraft:material_instances": {
        "*": {
          "texture": "tutorial:teaching_stone",
          "render_method": "opaque"
        }
      },
      "minecraft:destructible_by_mining": {"seconds_to_destroy": 1.5},
      "minecraft:destructible_by_explosion": {"explosion_resistance": 6.0},
      "minecraft:friction": 0.6,
      "minecraft:map_color": "#888888"
    }
  }
}
```

资源包中保留图集映射，并将`blocks.json`中这个方块的条目改成只含`"sound":"stone"`。这样，外观由显式的几何和材质组件负责，声音仍使用这个资源索引。不要在两套位置同时保留相互冲突的外观设置。

基础破坏时间不是所有工具、效果和玩家状态下的固定秒数。实际挖掘还会受到工具与游戏规则的影响。我们迁移的是同一种参数意图，仍应在目标客户端中重新观察实际手感。

## 验证迁移

启用两个包，重新进入世界后执行：

```mcfunction
/give @s tutorial:teaching_stone
/setblock ~2 ~ ~ tutorial:teaching_stone
```

预期能取得方块物品，并在身边放置石头外观的完整立方体。接着在生存模式下破坏它，检查挖掘行为。掉落内容应另行通过战利品表设计，不能用“能挖掉”替代“掉落正确”的验证。

如果能放置却出现缺失纹理，顺着材质中的短名称查到图集，再查图片路径；如果日志仍提示旧组件，则检查是否有另一份同标识符文件或没有更新的包副本。完成这个最小迁移后，我们便可以在下一节中添加状态与条件变体。

## 参考资料与版本

- [官方方块组件列表](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/blockcomponentslist?view=minecraft-bedrock-stable)：明确标注旧组件的格式范围。
- [几何组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable)：核查几何与材质的配套要求。
- [BDS稳定版方块组件模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/block/1.26.20/Components.json)。

资料核查日期：2026-10-15。历史示例与当前迁移示例应分别阅读；迁移目标使用1.21.80格式，以稳定版1.26.50资料核查。
