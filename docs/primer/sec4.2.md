# 自定义实验性格式物品

上一节中，我们已经将旧式教学代币整理成当前的物品定义。在本节中，我们继续制作一个可以食用的物品，观察几个组件如何共同完成一个功能。

本节标题保留了目录建立时的名称。当时较新的物品格式与实验性玩法密切相关，但“新格式”与“实验性”并不是永远等价的概念。下面使用的显示名称、图标、食物和使用修饰组件已有稳定版文档，示例不要求开启旧教程中的Holiday Creator Features。是否需要实验，必须逐个组件、逐个格式版本判断。

## 创建一份旅行口粮

我们希望旅行口粮能够恢复6点饥饿值，食用需要1.6秒，每组最多16个。首先在行为包中创建`items/travel_ration.json`：

```json
{
  "format_version": "1.21.80",
  "minecraft:item": {
    "description": {
      "identifier": "tutorial:travel_ration",
      "menu_category": {
        "category": "items"
      }
    },
    "components": {
      "minecraft:display_name": {
        "value": "item.tutorial:travel_ration.name"
      },
      "minecraft:icon": {
        "textures": {
          "default": "tutorial:travel_ration"
        }
      },
      "minecraft:max_stack_size": 16,
      "minecraft:food": {
        "nutrition": 6,
        "saturation_modifier": 0.6,
        "can_always_eat": false
      },
      "minecraft:use_animation": "eat",
      "minecraft:use_modifiers": {
        "use_duration": 1.6,
        "movement_modifier": 0.35
      }
    }
  }
}
```

我们可以看到，`minecraft:food`没有单独承担整个食用过程。它描述食用结果，`minecraft:use_modifiers`提供使用时长和移动倍率，`minecraft:use_animation`决定表现出来的使用动画。修改`eat`为`drink`会改变使用动画，但不会自动让物品具备药水效果。

**饥饿值**与**饱和度**也需要区分。`nutrition`填写6，表示恢复6个饥饿值点，即界面上3个完整的饥饿图标。饱和度增量的基础计算为`nutrition × saturation_modifier × 2`，这里为7.2，最终还受到玩家当前饥饿状态及游戏上限的约束。`can_always_eat`为`false`，意味着满饥饿值时不能按普通食物的方式继续食用它。

使用时长以秒为单位。我们不能把旧示例里某个字段的数值原样搬过来，就认定时长没有改变；迁移时应同时核查字段名称和单位。

## 配置图标与名称

打开资源包的`textures/item_texture.json`，在现有`texture_data`中加入下面的条目。若之前没有图集文件，可以使用完整内容：

```json
{
  "resource_pack_name": "tutorial",
  "texture_name": "atlas.items",
  "texture_data": {
    "tutorial:travel_ration": {
      "textures": "textures/items/bread"
    }
  }
}
```

这里先借用原版面包图标。当我们已经有上一节的代币条目时，应将两个条目合并到同一个`texture_data`对象中，不能用这份仅含口粮的示例覆盖掉代币。图集是资源的索引，一个文件可以服务多个物品。

接下来创建或补充`texts/zh_CN.lang`：

```text
item.tutorial:travel_ration.name=旅行口粮
```

并在`texts/en_US.lang`中提供英文文本：

```text
item.tutorial:travel_ration.name=Travel Ration
```

资源包的`texts/languages.json`列出语言：

```json
["en_US", "zh_CN"]
```

语言键本身只是我们约定的索引。组件中的键与语言文件中的键必须完全一致。`.lang`使用`键=值`格式，不应在行末添加JSON逗号，也不需要给中文名称加双引号。

## 在游戏中观察组件的配合

确保清单的最低引擎版本不低于`[1, 21, 80]`，在一个启用两个包的测试世界中执行：

```mcfunction
/give @s tutorial:travel_ration 4
/gamemode survival
/effect @s hunger 15 10 true
```

等待饥饿值降低后，清除效果，再尝试食用：

```mcfunction
/effect @s clear
```

预期能够看到进食动画，持续使用约1.6秒后消耗一个口粮并恢复饥饿值。再在满饥饿值时使用，便可以检验`can_always_eat`的限制。不要通过创造模式下物品是否减少来判断消耗逻辑是否正常。

如果有图标但无法食用，我们应检查`minecraft:food`与`minecraft:use_modifiers`是否同时存在，以及玩家是否已经吃饱。如果显示语言键而非中文，检查当前游戏语言及对应`.lang`文件。如果修改后仍是旧效果，退出并重新进入世界，再检查内容日志中的实际加载版本。

现在我们已经拥有一种真正的新食物。下一节将为它添加合成途径。至于食用后触发复杂逻辑，应进一步学习脚本自定义组件；不要继续向当前定义中粘贴旧物品`events`和已经废弃的`on_consume`写法。

## 参考资料与版本

- [Mojang稳定版苹果定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/items/apple.json)及[预览版对应文件](https://github.com/Mojang/bedrock-samples/blob/602eee34b6f4540ea8569a92736920aa8e897a2e/behavior_pack/items/apple.json)：用于核对食物、图标与使用组件的组合。
- [食物组件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponents/minecraft_food?view=minecraft-bedrock-stable)与[组件状态列表](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponentlist?view=minecraft-bedrock-stable)。
- [BDS稳定版物品组件模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/item/1.26.30/Item_Components.json)。

资料核查日期：2026-10-15。教学文件格式为1.21.80，资料基线为稳定版1.26.50；预览样例仅用于对照，不引入其中未核实的新增字段。
