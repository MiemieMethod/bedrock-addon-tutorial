# 学习使用哑实体

在一些地图玩法中，我们需要记住一个位置：它可能是一条赛道的起点，也可能是一个区域提示的中心。我们当然可以把坐标直接写进命令，但是每次移动位置都要修改命令。如果把这个位置交给一个不会移动、不会参与战斗的实体来表示，就可以通过移动实体来调整玩法。

这种主要充当位置、状态或命令执行载体的实体，通常被开发者称为**哑实体**（**Dummy Entity**）。它是开发中的设计方式，并不是一个名为`minecraft:dummy`的原版实体，也不是一个能够让所有逻辑自动停止的特殊组件。

## 从盔甲架想到自定义实体

我们可以先召唤一个盔甲架，为它添加标签，然后以它的位置执行命令。这已经能够说明“让实体充当锚点”的基本思路。然而，原版盔甲架仍然具有碰撞、生命值、装备交互和外观等机制。隐身效果只影响表现，也不会自动去掉这些机制。

因此，对于长期使用的地图系统，我们可以创建一个用途明确的自定义实体。本节实体标识符为`tutorial:anchor`，只承担位置锚点的作用，不添加寻路和攻击行为。完整定义及配套资源包位于`examples/advanced/checkpoint_race`，后面的计时赛实例将继续使用它。

## 定义服务端行为

在行为包中新建`entities/anchor.json`：

```json
{
  "format_version": "1.21.0",
  "minecraft:entity": {
    "description": {
      "identifier": "tutorial:anchor",
      "is_spawnable": false,
      "is_summonable": true,
      "is_experimental": false
    },
    "component_groups": {
      "tutorial:remove": {
        "minecraft:instant_despawn": {}
      }
    },
    "components": {
      "minecraft:type_family": {"family": ["tutorial_anchor"]},
      "minecraft:collision_box": {"width": 0.1, "height": 0.1},
      "minecraft:physics": {"has_gravity": false, "has_collision": false},
      "minecraft:pushable": {"is_pushable": false, "is_pushable_by_piston": false},
      "minecraft:health": {"value": 1, "max": 1},
      "minecraft:damage_sensor": {"triggers": [{"deals_damage": false}]},
      "minecraft:persistent": {}
    },
    "events": {
      "tutorial:remove": {
        "add": {"component_groups": ["tutorial:remove"]}
      }
    }
  }
}
```

我们可以看到，这里没有任何移动与攻击AI。`physics`关闭重力和物理碰撞，`pushable`关闭通常的推挤，`persistent`则用于避免普通的距离消失机制。伤害感应器拒绝通常伤害，减少锚点意外死亡的可能。

这些设置各自解决不同的问题。没有重力不等于没有碰撞，没有模型不等于不会受到伤害，具有持久组件也不等于所在区块永远保持加载。设计辅助实体时，应分别考虑这些边界，不能期望一个“隐形”设置完成全部工作。

## 为看不见的实体提供完整资源定义

我们仍然为实体提供客户端定义，而不是依赖缺少资源时的异常表现。在资源包的`entity/anchor.entity.json`中声明`tutorial:anchor`，指定本例的空几何体与渲染控制器。几何体`models/entity/anchor.geo.json`仅包含一个没有立方体的根骨骼：

```json
{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.tutorial.anchor",
        "texture_width": 64,
        "texture_height": 64,
        "visible_bounds_width": 1,
        "visible_bounds_height": 1,
        "visible_bounds_offset": [0, 0, 0]
      },
      "bones": [{"name": "root", "pivot": [0, 0, 0]}]
    }
  ]
}
```

配套示例已经包含客户端实体和渲染控制器的完整文件。由于根骨骼没有任何立方体，这个实体没有可见模型；纹理引用也不会产生可见表面。开发时可以临时为根骨骼添加一个小立方体，观察实际位置，再移除调试模型。

这里没有为实体添加名字显示或可交互界面。若希望玩家能看见传送点、告示牌或起跑线，应另外制作相应方块或装饰，把“内部锚点”与“给玩家看的标记”分开。

## 召唤、选择和清理锚点

在空旷测试区域启用两个包，以管理员身份执行：

```mcfunction
/summon tutorial:anchor ~ ~ ~
/tag @e[type=tutorial:anchor,r=2,c=1] add tutorial:start
```

第二条命令选择附近一个锚点并添加起点标签。执行前应确保附近没有其他锚点；如果已经存在多个候选，先定位并清理或分别命名，不能将`c=1`理解为“刚刚召唤的那个实体”。选择器描述的是查询条件，不会记忆上一条命令的返回结果。

我们随后可以在该锚点位置查询附近玩家：

```mcfunction
/execute at @e[type=tutorial:anchor,tag=tutorial:start] run tellraw @a[r=2] {"rawtext":[{"text":"你在起点附近。"}]}
```

不再需要锚点时，通过自己定义的事件移除：

```mcfunction
/event entity @e[type=tutorial:anchor,tag=tutorial:start] tutorial:remove
```

这个命令会移除当前选择器范围内所有匹配锚点，所以在正式地图中应进一步限定维度、位置或区域标签。我们使用明确的清理事件，便不必依赖辅助实体是否能被通常伤害击杀。

## 区块加载与实体数量

锚点在未加载区块中不会像加载区域中的实体那样被查询和更新。不要在每刻查询不到锚点时就无限召唤替代品，否则区块重新加载后可能出现大量重复实体。初始化应由受控的地图布置流程完成，而不是把“暂时查询不到”当作“不存在”。

大量锚点也会增加实体维护和选择器查询的负担。如果只需记住一个不变坐标，直接使用坐标可能更简单；如果需要一张包含大量地点的数据表，脚本中的结构化数据可能更合适。哑实体适合的是确实需要实体选择器、相对位置或实体状态的场景。

下一节中，我们将为这些锚点安排周期性检查，并说明命令主循环怎样避免每刻重复初始化。

## 参考资料与验证范围

- [原版盔甲架行为定义](https://github.com/Mojang/bedrock-samples/blob/main/behavior_pack/entities/armor_stand.json)：用于比较真实实体包含的机制。
- [physics组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_physics?view=minecraft-bedrock-stable)、[damage_sensor组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_damage_sensor?view=minecraft-bedrock-stable)、[instant_despawn组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/entityreference/examples/entitycomponents/minecraftcomponent_instant_despawn?view=minecraft-bedrock-stable)。
- 本例按所列数据格式编写，仍需在目标客户端中检查召唤、可见性、选择器与区块重载行为。
