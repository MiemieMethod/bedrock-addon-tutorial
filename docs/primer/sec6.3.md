# 自定义服务端实体

上一节已经为教学向导准备了外观。现在我们一起创建它的**服务端实体定义**（**Server Entity Definition**），让游戏真正注册这个实体，并赋予它生命值、碰撞和移动能力。

这里的“服务端”是一种职责划分，即使在单人世界中，游戏也需要运行负责世界规则的一侧。我们不需要先架设独立服务器，便能够学习行为包中的实体定义。

## 创建向导的行为文件

在行为包创建`entities/guide.json`：

```json
{
  "format_version": "1.21.80",
  "minecraft:entity": {
    "description": {
      "identifier": "tutorial:guide",
      "is_spawnable": true,
      "is_summonable": true
    },
    "components": {
      "minecraft:type_family": {"family": ["tutorial_guide", "mob"]},
      "minecraft:health": {"value": 20, "max": 20},
      "minecraft:collision_box": {"width": 0.5, "height": 1.25},
      "minecraft:physics": {},
      "minecraft:pushable": {
        "is_pushable": true,
        "is_pushable_by_piston": true
      },
      "minecraft:nameable": {},
      "minecraft:movement": {"value": 0.2},
      "minecraft:movement.basic": {},
      "minecraft:navigation.walk": {
        "avoid_water": true,
        "avoid_damage_blocks": true
      },
      "minecraft:jump.static": {},
      "minecraft:behavior.float": {"priority": 0},
      "minecraft:behavior.random_stroll": {
        "priority": 6,
        "speed_multiplier": 1.0
      },
      "minecraft:behavior.look_at_player": {
        "priority": 7,
        "look_distance": 6,
        "probability": 0.02
      },
      "minecraft:behavior.random_look_around": {"priority": 8}
    }
  }
}
```

注意行为包目录是复数`entities`，资源包客户端定义目录是单数`entity`。文件名不必相同，但两份定义的`identifier`必须一致。

`is_summonable`允许使用召唤命令，`is_spawnable`与刷怪蛋等生成入口有关。它们不会自动让教学向导在平原上自然生成；自然生成还有独立的规则文件，后面的章节将会介绍。

## 组件如何配合

我们首先观察`minecraft:collision_box`。它的宽度和高度按世界格数填写，而模型使用一格16单位。因此，宽8模型单位对应0.5格，高20模型单位对应1.25格。这正好与上一节两个长方体的总体尺寸相符。服务端碰撞体不会逐个跟随头部动画改变。

再来看移动。`minecraft:movement`提供基础移动参数，`minecraft:movement.basic`提供移动控制方式，`minecraft:navigation.walk`负责步行寻路，`minecraft:behavior.random_stroll`则提出随机闲逛的行为目标。这几个组件共同构成了“想去哪里、如何找到路、怎样移动过去”的过程。

**AI意向**（**AI Goal**）通常以`minecraft:behavior.`开头。`priority`数值越小，通常代表调度优先级越高，但这不是简单的“整份文件永远只执行一个组件”。不同目标是否能够同时运行，还取决于它们占用的行为控制及运行条件。

本例让漂浮意向优先于闲逛，以便向导落水时能够作出对应行为。`look_at_player`的存在也不保证模型头部一定正确看向玩家，因为模型的可见朝向还需要相应客户端动画。上一节为了学习Molang，故意使用了固定周期摇头动画；不要把它的摆动误认为服务端寻路目标的直接可视化。

## 放入世界进行观察

在同时启用行为包和资源包的测试世界中，找一片平整地面执行：

```mcfunction
/summon tutorial:guide ~2 ~ ~
```

预期出现石头外观的教学向导。观察一段时间，它会尝试闲逛，头部则按客户端动画左右摆动。使用命名牌还可以检查`minecraft:nameable`是否生效。

接下来，我们可以暂时将`minecraft:movement.value`从0.2改为0.1，重新进入世界并召唤一个新的向导，比较移动效果。每次只修改一个关键参数，比同时添加十几个组件更容易理解组件的作用。

本节没有给向导配置完整的动物生存规则，例如呼吸、繁殖、食物诱惑及战利品都不是当前目标。一个拥有20点生命值的实体，也不会自动拥有原版猪的全部行为。`type_family`是分类标签，不是继承某个原版实体的快捷方式。

## 排查服务端问题

如果召唤命令提示未知实体，检查包是否加载、路径是否正确、`is_summonable`以及JSON语法。如果能够召唤却不移动，检查移动、导航与AI意向三组组件，并确认周围确实存在可到达的位置。如果实体只显示碰撞或阴影而无模型，则回到客户端定义排查。

我们没有设置`runtime_identifier`，因为本例的目标可以通过显式组件实现。借用某个原版运行时身份可能引入额外的硬编码行为，不能把它当作通用修复开关。需要这一能力时，应针对具体实体及目标版本另外验证。

## 参考资料与版本

- [Mojang稳定版猪的服务端定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/entities/pig.json)：移动、导航、AI意向与事件结构。
- [Mojang流浪商人定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/entities/wandering_trader.json)：基础物理与行为组件组合。

资料核查日期：2026-10-15。示例以1.21.80实体格式和稳定通道编写，资料基线为1.26.50。这里列出的是待执行的客户端验证步骤，不代表已在游戏中实测。
