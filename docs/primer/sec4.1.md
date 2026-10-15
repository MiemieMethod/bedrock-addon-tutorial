# 自定义旧版格式物品

在本节中，我们一起来阅读旧版物品定义，并将其中仍然需要的功能迁移到当前格式。之所以保留这一节，是因为我们在学习已有作品时，经常会遇到`1.10`、`1.16.100`等不同的物品格式。只有了解这些文件当时分别承担什么职责，才能判断应该保留哪些设计，又应该替换哪些实现。

> 本节的旧格式代码用于阅读与迁移，不作为当前新项目的起点。当前示例以基岩版稳定通道1.26.50为资料核查基线；文件中填写的格式版本可以早于游戏版本。本节不使用中国版专有的`netease_items_beh`、`netease_items_res`目录。

## 阅读成对的物品定义

我们先设想一个只有图标和堆叠数量的“教学代币”。在采用旧式客户端、服务端分离定义的作品中，可能会看到下面两份文件。行为包中的`items/token.json`描述其游戏属性：

```json
{
  "format_version": "1.10",
  "minecraft:item": {
    "description": {
      "identifier": "tutorial:token"
    },
    "components": {
      "minecraft:max_stack_size": 16
    }
  }
}
```

资源包中的`items/token.json`则提供图标：

```json
{
  "format_version": "1.10",
  "minecraft:item": {
    "description": {
      "identifier": "tutorial:token"
    },
    "components": {
      "minecraft:icon": "tutorial:token"
    }
  }
}
```

我们可以看到，两份文件的模式标识符都是`minecraft:item`，物品标识符也相同，但组件并不相同。旧文件所在的包决定了它被用于哪一侧。这里的“成对”说的是同一种物品的两类定义，不能据此认为所有版本的物品都必须拥有两份JSON文件。

图标中的`"tutorial:token"`还不是图片路径，而是**纹理短名称**。它需要在资源包的`textures/item_texture.json`中解析。例如，下面的映射让代币暂时使用原版绿宝石的图标：

```json
{
  "resource_pack_name": "tutorial",
  "texture_name": "atlas.items",
  "texture_data": {
    "tutorial:token": {
      "textures": "textures/items/emerald"
    }
  }
}
```

这个路径引用下层原版资源，便于我们先研究文件关系。以后制作自己的图标时，将图片放到资源包的`textures/items/tutorial/token.png`，再把映射改为`textures/items/tutorial/token`即可。路径不包含`.png`，但实际图片必须具有扩展名。

## 将代币迁移到当前定义

我们现在保留代币的标识符、堆叠数量和纹理短名称，将行为包的`items/token.json`整体替换为：

```json
{
  "format_version": "1.21.80",
  "minecraft:item": {
    "description": {
      "identifier": "tutorial:token",
      "menu_category": {
        "category": "items"
      }
    },
    "components": {
      "minecraft:display_name": {
        "value": "教学代币"
      },
      "minecraft:max_stack_size": 16,
      "minecraft:icon": {
        "textures": {
          "default": "tutorial:token"
        }
      }
    }
  }
}
```

此时，旧资源包中的`items/token.json`应从测试包移除，图集定义则保留。当前写法将物品组件集中到行为包中，实际纹理资源仍由资源包提供。我们并没有把图片“搬到服务端”，只是改变了引用图片的定义所在的位置。

`menu_category.category`负责创造物品栏分类；`minecraft:display_name.value`负责显示名称；`minecraft:icon.textures.default`负责默认图标。三者分别解决“在哪里找”“显示什么名字”和“长什么样”的问题。正式支持多语言时，应把显示名称改为语言键，并在语言文件中定义翻译。

如果原作品来自中国版，还可能出现`custom_item_type`、`register_to_create_menu`等字段。这些字段不能直接作为国际版物品功能的依据。迁移一个武器时，应重新列出伤害、耐久、附魔及外观需求，再分别查找对应组件；仅仅把目录改名，不会自动转换网易扩展功能。

同样，修改`format_version`并不是一个自动升级操作。历史示例中的`minecraft:foil`、`minecraft:use_duration`及物品JSON事件，也需要分别核查当前组件和脚本实现。我们应先迁移这个最小代币，确认基础链路成立，再逐个恢复复杂功能。

## 验证迁移结果

为两个包保留各自有效的清单文件，将`min_engine_version`设置为至少`[1, 21, 80]`，在测试世界中同时启用它们。重新进入世界后执行：

```mcfunction
/give @s tutorial:token 20
```

预期得到总计20个代币，单个堆叠最多16个，并且显示绿宝石图标与“教学代币”的名称。这里借用图标并不会让代币成为原版绿宝石；村民也不会因此接受它作为绿宝石。

如果命令报告不存在该物品，优先检查行为包是否启用、标识符及内容日志；如果能获得物品却没有图标，检查资源包、图集键与路径；如果图标和名称都正确，旧物品的基础迁移便完成了。下一节我们将在同一套文件关系上，为物品增加可食用的功能。

## 参考资料与版本

- [官方自定义物品教程](https://learn.microsoft.com/en-us/minecraft/creator/documents/addcustomitems?view=minecraft-bedrock-stable)：用于核查包结构；其中不同年代示例的字段仍需结合组件文档阅读。
- [稳定版物品组件列表](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/itemreference/examples/itemcomponentlist?view=minecraft-bedrock-stable)：用于区分当前、废弃与内部组件。
- [BDS导出的图标模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/server/item/1.26.30/minecraft_icon_v1.21.80.json)：核查当前图标对象结构。

资料核查日期：2026-10-15。旧格式部分属于历史阅读，迁移后的代码属于稳定通道示例；本文未声称已完成客户端实测。
