# 自定义实验性格式方块

在本节中，我们一起来制作一个可以处于“熄灭”或“点亮”状态的教学灯方块。我们先通过命令设置状态，观察方块的光照发生变化，再解释状态与组件之间的联系。

虽然标题保留了“实验性格式”的历史名称，下面使用的基本组件、方块状态及条件变体均按稳定版接口编写。我们无需因为标题含有“实验性”，就启用所有实验开关。确实需要实验的新增字段，应另外建立测试包并明确对应版本。

## 编写灯方块

在行为包创建`blocks/teaching_lamp.json`：

```json
{
  "format_version": "1.21.80",
  "minecraft:block": {
    "description": {
      "identifier": "tutorial:teaching_lamp",
      "menu_category": {"category": "construction"},
      "states": {
        "tutorial:lit": [false, true]
      }
    },
    "components": {
      "minecraft:geometry": "minecraft:geometry.full_block",
      "minecraft:material_instances": {
        "*": {
          "texture": "tutorial:teaching_lamp",
          "render_method": "opaque"
        }
      },
      "minecraft:destructible_by_mining": {"seconds_to_destroy": 0.8},
      "minecraft:destructible_by_explosion": {"explosion_resistance": 2},
      "minecraft:light_emission": 0,
      "minecraft:map_color": "#e3c169"
    },
    "permutations": [
      {
        "condition": "query.block_state('tutorial:lit')",
        "components": {
          "minecraft:light_emission": 15
        }
      }
    ]
  }
}
```

资源包的`textures/terrain_texture.json`中登记纹理。以下为只含本例的完整文件，已有其他方块时请合并`texture_data`：

```json
{
  "resource_pack_name": "tutorial",
  "texture_name": "atlas.terrain",
  "padding": 8,
  "num_mip_levels": 4,
  "texture_data": {
    "tutorial:teaching_lamp": {
      "textures": "textures/blocks/glowstone"
    }
  }
}
```

我们借用原版荧石纹理，便于将注意力放在状态逻辑上。在资源包`texts/zh_CN.lang`中加入：

```text
tile.tutorial:teaching_lamp.name=教学灯
```

同时在`texts/en_US.lang`中加入英文名称，并确保这两种语言列在`texts/languages.json`中。如果希望使用玻璃类的交互声音，还可以在资源包根目录`blocks.json`中添加`"tutorial:teaching_lamp":{"sound":"glass"}`条目。

## 状态如何改变组件

**方块状态**（**Block State**）是方块实例所携带的一个取值。例如，两盏教学灯拥有同一个方块标识符，却可以分别令`tutorial:lit`为`false`和`true`。状态取值不同，不必注册两个完全独立的方块。

这里用数组列出了允许的两个值，第一个值是默认值。因此，普通放置的教学灯默认熄灭。状态名称带有我们自己的命名空间，方便与其他状态区分。

`permutations`定义**条件变体**（**Permutation**）。其条件是一段Molang表达式，`query.block_state('tutorial:lit')`读取当前方块的状态。当它为真时，变体中的发光组件覆盖基础发光组件，从0变为15；其他基础组件仍然保留。

这是一种“根据状态选择组件”的关系。条件变体本身并不会每隔一秒把状态改一次，也不会自动响应玩家右键。要让交互改变状态，需要进一步使用对应的交互或脚本接口。本例先使用命令明确输入状态，避免同时引入尚未学习的交互机制。

## 放置两种状态

在测试世界中先执行：

```mcfunction
/setblock ~2 ~ ~ tutorial:teaching_lamp ["tutorial:lit"=false]
/setblock ~4 ~ ~ tutorial:teaching_lamp ["tutorial:lit"=true]
```

到夜间或遮光环境观察，第二盏灯应照亮附近空间，第一盏灯不应发光。它们仍使用相同的荧石纹理。因此，单看方块表面的颜色并不能判断世界光照是否发生改变；我们要观察邻近方块的受光情况。

接下来，对同一个位置分别设置两个状态。若光照随之改变，便验证了“状态—条件—组件”的联系。这里的状态布尔值不能写成字符串`"true"`，因为我们在`states`中声明的是布尔值。

## 排查与扩展

如果日志提示找不到状态，检查命令与定义中的`tutorial:lit`是否完全一致，以及状态是否写在`description.states`下。若方块正常但始终不发光，检查`permutations`是否与`components`并列，并核对Molang字符串中的引号。如果方块缺少纹理，回到图集与材质组件检查，不必首先怀疑状态逻辑。

当我们添加第二个状态时，还要注意组合数量。两个分别具有2和4个取值的状态，可能形成8种组合。状态数量逐渐增加时，应确认每种组合都有明确意义，避免仅为存储任意计数而制造大量方块变体。

这个例子已经包含一个现代自定义方块的基本结构。在下一节中，我们将保留材质映射方式，把完整立方体改成自己的模型。

## 参考资料与版本

- [官方高级方块教程](https://learn.microsoft.com/en-us/minecraft/creator/documents/advancedcustomblocks?view=minecraft-bedrock-stable)。
- [方块几何组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable)。
- [BDS稳定版方块模式目录](https://github.com/bedrock-apis/bds-docs/tree/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/block/1.26.20)。

资料核查日期：2026-10-15。示例使用1.21.80格式，面向稳定通道；不依赖已撤除的Holiday Creator Features实验开关。
