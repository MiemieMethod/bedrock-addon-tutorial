# 自定义实验性格式实体

在前两节中，我们分别建立了教学向导的外观与行为。本节进一步研究实体如何保存自己的状态，以及客户端如何根据服务端状态改变表现。

标题中的“实验性格式”沿用早期目录名称。下面介绍的**实体属性**（**Entity Property**）、组件组与事件具有稳定版用法，并不是把`is_experimental`改为`true`就会得到的另一种万能实体格式。真正的预览功能应按具体字段核查，本节以稳定接口完成“工作—休息”两个状态。

## 为向导增加工作状态

我们希望向导工作时能够闲逛，休息时停止主动闲逛，并用头部的轻微缩放表现工作状态。将行为包`entities/guide.json`替换为下面的完整内容：

```json
{
  "format_version": "1.21.80",
  "minecraft:entity": {
    "description": {
      "identifier": "tutorial:guide",
      "is_spawnable": true,
      "is_summonable": true,
      "properties": {
        "tutorial:working": {
          "type": "bool",
          "default": true,
          "client_sync": true
        }
      }
    },
    "component_groups": {
      "tutorial:working": {
        "minecraft:movement": {"value": 0.2},
        "minecraft:behavior.random_stroll": {
          "priority": 6,
          "speed_multiplier": 1.0
        }
      },
      "tutorial:resting": {
        "minecraft:movement": {"value": 0}
      }
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
      "minecraft:movement.basic": {},
      "minecraft:navigation.walk": {
        "avoid_water": true,
        "avoid_damage_blocks": true
      },
      "minecraft:jump.static": {},
      "minecraft:behavior.float": {"priority": 0}
    },
    "events": {
      "minecraft:entity_spawned": {
        "add": {"component_groups": ["tutorial:working"]},
        "set_property": {"tutorial:working": true}
      },
      "tutorial:work": {
        "remove": {"component_groups": ["tutorial:resting"]},
        "add": {"component_groups": ["tutorial:working"]},
        "set_property": {"tutorial:working": true}
      },
      "tutorial:rest": {
        "remove": {"component_groups": ["tutorial:working"]},
        "add": {"component_groups": ["tutorial:resting"]},
        "set_property": {"tutorial:working": false}
      }
    }
  }
}
```

`properties`声明属性的名称、类型及默认值。每一个向导实例都有自己的`tutorial:working`，因此一个休息不会自动让另一个也休息。`client_sync`使客户端能够读取此属性；属性本身由服务端保存，不等同于客户端动画里的临时变量。

**组件组**（**Component Group**）则是等待激活的一组组件。写在`component_groups`中的内容不会仅凭存在就生效，事件通过`add`和`remove`改变活动组件。我们明确移除旧状态的组，再添加新状态的组，避免同一实体同时保留互相矛盾的移动定义。

休息组的移动速度为0，但实体仍保留物理和可推动组件，所以仍可能被水流、碰撞或重力移动。“停止主动闲逛”与“固定在世界坐标上”并不是同一件事。

## 让客户端读取属性

在资源包`animations/guide.animation.json`的`animations`对象中，保留原来的摇头动画，再加入：

```json
{
  "animation.tutorial.guide.pulse": {
    "loop": true,
    "bones": {
      "head": {
        "scale": "query.property('tutorial:working') ? 1.0 + 0.08 * math.sin(query.life_time * 180) : 1.0"
      }
    }
  }
}
```

上面是需要合并进`animations`的条目集合，不应额外嵌套一层`animations`。在`entity/guide.entity.json`的`description`中，将对应部分改为：

```json
{
  "animations": {
    "look": "animation.tutorial.guide.look",
    "pulse": "animation.tutorial.guide.pulse"
  },
  "scripts": {
    "animate": ["look", "pulse"]
  }
}
```

现在摇头动画修改旋转通道，工作动画修改缩放通道。工作时头部尺寸在0.92倍至1.08倍之间变化，周期为2秒；休息时缩放回到1倍。两个通道的作用彼此清楚，便于检查。

实体属性也适合表达颜色种类、设备档位等有限状态，但不应把每个临时动画计算都同步到服务端。比如，头部当前缩放倍数可以由客户端根据时间自行计算，我们只同步“是否工作”这一真正影响玩法的状态。这样，属性表达含义，动画负责表现，后续修改动画频率也无需修改服务端状态定义。

另外，已经保存到世界中的属性值会随实体保存和读取，修改定义中的默认值并不会可靠地把所有已有实例重置到新状态。调试新默认值时，重新生成一个向导更容易得到可解释的结果。

## 触发事件并验证

重新进入世界并生成一个新向导，站在它的旁边，先为本次测试选定对象：

```mcfunction
/tag @e[type=tutorial:guide,tag=tutorial_state_test] remove tutorial_state_test
/tag @e[type=tutorial:guide,c=1] add tutorial_state_test
```

第一条命令清除旧的测试标签，第二条只为当前最近的一个向导添加标签。这样，即使其他向导在观察期间走到我们身边，后面的两次事件也会作用于同一个对象。再依次执行：

```mcfunction
/event entity @e[type=tutorial:guide,tag=tutorial_state_test] tutorial:rest
/event entity @e[type=tutorial:guide,tag=tutorial_state_test] tutorial:work
```

每条命令之间留出观察时间。休息后，向导应停止主动闲逛，头部缩放停止；工作后，闲逛和缩放重新开始。摇头是上一节独立的教学动画，会继续播放。

事件的属性更新与组件更新按实体刻处理，不应假设同一刻内连续触发的第二个事件一定立即读到第一个事件的新值。本例直接设置明确的布尔值，避免依赖这种时序。

如果服务端行为变化而客户端没有变化，优先检查`client_sync`与属性名称；如果两边都没有变化，检查选择器是否选中目标、事件名及内容日志。使用已生成的旧实体排查时，还应考虑初始化事件没有重新执行，先生成新实例可以减少这类干扰。

## 参考资料与版本

- [官方实体属性说明](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties?view=minecraft-bedrock-stable)及其[源码](https://github.com/MicrosoftDocs/minecraft-creator/blob/main/creator/Documents/IntroductionToEntityProperties.md)：属性持久化、同步与更新时序。
- [Mojang猪实体](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/entities/pig.json)：属性、组件组与事件的实际组合。

资料核查日期：2026-10-15。示例使用1.21.80格式与稳定属性功能；实验文档中的独立新增特性不自动包含在本例中。
