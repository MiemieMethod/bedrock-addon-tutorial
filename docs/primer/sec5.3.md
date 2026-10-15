# 自定义方块模型

上一节中，我们的教学灯使用了完整立方体。现在，我们一起来制作一块较矮的石台，观察**模型几何**（**Geometry**）、**材质实例**（**Material Instance**）和**碰撞箱**（**Collision Box**）分别解决什么问题。

为了便于核对坐标，本节直接给出一个只含长方体的模型。大家也可以在Blockbench中建立基岩版方块项目后输入相同的尺寸，但最终供游戏读取的应是导出的几何JSON文件，而不是编辑器工程`.bbmodel`。

## 创建石台模型

在资源包创建`models/blocks/stone_platform.geo.json`：

```json
{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.tutorial.stone_platform",
        "texture_width": 16,
        "texture_height": 16,
        "visible_bounds_width": 2,
        "visible_bounds_height": 2,
        "visible_bounds_offset": [0, 0.5, 0]
      },
      "bones": [
        {
          "name": "base",
          "pivot": [0, 0, 0],
          "cubes": [
            {
              "origin": [-6, 0, -6],
              "size": [12, 4, 12],
              "uv": {
                "north": {"uv": [0, 0], "uv_size": [16, 16]},
                "south": {"uv": [0, 0], "uv_size": [16, 16]},
                "east": {"uv": [0, 0], "uv_size": [16, 16]},
                "west": {"uv": [0, 0], "uv_size": [16, 16]},
                "up": {"uv": [0, 0], "uv_size": [16, 16]},
                "down": {"uv": [0, 0], "uv_size": [16, 16]}
              }
            }
          ]
        }
      ]
    }
  ]
}
```

模型中16个单位对应世界中的一格。这个长方体的底面从`(-6, 0, -6)`延伸到`(6, 0, 6)`，高度为4个单位，即四分之一格。模型原点位于方块底面中心，而不是底面某个角点。

`bones`中定义了名为`base`的**骨骼**（**Bone**），`cubes`则定义骨骼承载的长方体。我们为六个面分别给出UV区域，使每一面都采样整张16×16纹理。侧面几何高度只有4，但UV高度为16，因此纹理会压缩显示；如果希望保持像素比例，应为侧面单独设计对应尺寸的UV区域。

`visible_bounds`是帮助渲染器判断可见范围的信息，不是实体碰撞范围。即使把它写得很大，也不会让石台获得更大的碰撞箱。

## 连接方块与模型

在行为包创建`blocks/stone_platform.json`：

```json
{
  "format_version": "1.21.80",
  "minecraft:block": {
    "description": {
      "identifier": "tutorial:stone_platform",
      "menu_category": {"category": "construction"}
    },
    "components": {
      "minecraft:geometry": "geometry.tutorial.stone_platform",
      "minecraft:material_instances": {
        "*": {
          "texture": "tutorial:teaching_stone",
          "render_method": "opaque"
        }
      },
      "minecraft:collision_box": {
        "origin": [-6, 0, -6],
        "size": [12, 4, 12]
      },
      "minecraft:selection_box": {
        "origin": [-6, 0, -6],
        "size": [12, 4, 12]
      },
      "minecraft:light_dampening": 0,
      "minecraft:destructible_by_mining": {"seconds_to_destroy": 1.5}
    }
  }
}
```

我们沿用上一节之前已经登记的`tutorial:teaching_stone`纹理短名称。独立制作本例时，在`textures/terrain_texture.json`的`texture_data`下补入`"tutorial:teaching_stone":{"textures":"textures/blocks/stone"}`即可。

几何组件的字符串必须与模型内部`description.identifier`一致。这里填写的是模型标识符，不是`models/blocks/stone_platform.geo.json`路径。材质中的`*`则为未单独分配材质的模型表面提供统一设置。

## 外观、碰撞与选取

我们让`collision_box`与`selection_box`采用相同坐标，是因为这个简单模型只有一个长方体。碰撞箱决定玩家能否穿过某片空间，选取箱决定光标能否选中方块，两者也不等于模型本身。

假如我们只缩小模型，却保留默认完整方块的碰撞箱，就会看到一块矮石台，但玩家可能站在它上方的空气中。相反，如果把碰撞关闭，石台仍然可见，玩家却可以穿过它。这些现象并不一定是模型损坏，而可能是三个定义没有按设计配合。

当前较新版本已经扩展了碰撞箱能力。本例刻意使用一个位于单格内部的普通箱体，避免依赖多碰撞箱和跨格高度的新规则。学习复杂模型时，再根据目标游戏版本查阅对应限制。

我们还可以做一个小实验：只把`selection_box.size`的高度从4改为8，再观察光标的选取范围。模型依旧只有四分之一格高，玩家的落脚高度也不变，但可选中的区域变高了。完成观察后再改回4，便能直接理解这三个系统相互独立。正式作品中应让它们按玩法需求协调，不能仅凭一张截图判断碰撞已经正确。

## 观察结果

在资源包语言文件中加入`tile.tutorial:stone_platform.name=石台`，重新进入测试世界并执行：

```mcfunction
/give @s tutorial:stone_platform
```

将它放在平整地面上，分别从上方和侧面观察纹理，再走到石台上，确认落脚高度与模型一致。最后将光标指向模型外、方块格内的空白部分，观察选取框是否符合预期。

若完全不可见，先查几何标识符和模型路径；若呈现缺失纹理，查图集短名称；若外观正确但站立高度错误，查碰撞箱，不要用移动整个模型的方法掩盖碰撞问题。这样的逐层检查可以帮助我们把“看起来不对”转化成一个具体的文件问题。

## 参考资料与版本

- [官方高级方块模型教程](https://learn.microsoft.com/en-us/minecraft/creator/documents/advancedcustomblocks?view=minecraft-bedrock-stable)。
- [几何组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_geometry?view=minecraft-bedrock-stable)及[碰撞箱组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/minecraftblock_collision_box?view=minecraft-bedrock-stable)。
- [BDS几何模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/block/1.26.20/Geometry.json)。

资料核查日期：2026-10-15。方块定义使用1.21.80格式，模型使用1.12.0几何格式；二者不必相同。未引入实验性剔除图层等字段。
