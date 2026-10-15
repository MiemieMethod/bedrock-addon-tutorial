# 自定义客户端实体

在本节中，我们一起来建立一个石头外观的教学向导。它有一个身体和一个头部，能够使用上一节的Molang动画左右观察。我们先完成外观，再在下一节赋予它服务端行为。

**客户端实体定义**（**Client Entity Definition**）位于资源包中，主要把模型、材质、纹理和动画组织起来。它不会独自注册一个可被`/summon`创建的生物；完整实体还需要同标识符的服务端定义。

## 建立模型

在资源包创建`models/entity/guide.geo.json`。下面使用两个长方体，让文件关系和骨骼层级保持清楚：

```json
{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.tutorial.guide",
        "texture_width": 64,
        "texture_height": 64,
        "visible_bounds_width": 2,
        "visible_bounds_height": 2.5,
        "visible_bounds_offset": [0, 0.75, 0]
      },
      "bones": [
        {
          "name": "body",
          "pivot": [0, 0, 0],
          "cubes": [
            {"origin": [-4, 0, -4], "size": [8, 12, 8], "uv": [0, 0]}
          ]
        },
        {
          "name": "head",
          "parent": "body",
          "pivot": [0, 12, 0],
          "cubes": [
            {"origin": [-4, 12, -4], "size": [8, 8, 8], "uv": [0, 24]}
          ]
        }
      ]
    }
  ]
}
```

`head`通过`parent`成为`body`的子骨骼，但长方体坐标仍按该模型格式的坐标规则编写，不能额外把身体高度再加一次。头部的轴心位于`[0,12,0]`，因此旋转头部时，它会绕颈部位置转动。

本例暂时直接引用原版石头图片，并用64×64的UV画布解释它，图片会按照归一化纹理坐标参与采样。石纹可以帮助我们确认模型已经可见；需要精确绘制眼睛等细节时，应另存自己的64×64实体纹理，并依照这份UV布局绘制。

## 连接三种渲染资源

在资源包创建`entity/guide.entity.json`：

```json
{
  "format_version": "1.10.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "tutorial:guide",
      "materials": {"default": "entity_alphatest"},
      "textures": {"default": "textures/blocks/stone"},
      "geometry": {"default": "geometry.tutorial.guide"},
      "animations": {"look": "animation.tutorial.guide.look"},
      "scripts": {"animate": ["look"]},
      "render_controllers": ["controller.render.tutorial.guide"],
      "spawn_egg": {
        "base_color": "#777777",
        "overlay_color": "#e4ca79"
      }
    }
  }
}
```

这里出现了三个`default`，但它们分别属于材质、纹理与几何的短名称集合，并不会相互覆盖。材质决定基本渲染方式，纹理提供表面像素，几何决定形状。我们需要用**渲染控制器**（**Render Controller**）将它们结合起来。

创建`render_controllers/guide.render_controllers.json`：

```json
{
  "format_version": "1.8.0",
  "render_controllers": {
    "controller.render.tutorial.guide": {
      "geometry": "Geometry.default",
      "materials": [{"*": "Material.default"}],
      "textures": ["Texture.default"]
    }
  }
}
```

`Geometry.default`指向客户端定义中的几何短名称；`Material.default`与`Texture.default`同理。这里不是把文件路径重复写一遍，而是通过短名称选择已经登记的资源。这样，之后增加另一张纹理或另一个模型时，控制器便可以按条件选择它们。

## 挂接动画与名称

将上一节完整的`guide.animation.json`保留在`animations`目录。客户端定义中的`animations.look`为完整动画标识符取了一个短名称，`scripts.animate`中的`"look"`则让它持续参与播放。这里的骨骼名`head`与模型一致，所以头部可以接收旋转结果。

在资源包`texts/zh_CN.lang`中加入：

```text
entity.tutorial:guide.name=教学向导
item.spawn_egg.entity.tutorial:guide.name=教学向导刷怪蛋
```

再为英文语言文件提供对应条目，并保留前面建立的语言列表。刷怪蛋的颜色来自`spawn_egg`，但刷怪蛋能否作为该实体的生成入口，还要与服务端`is_spawnable`等设置共同判断。

在保存时还要区分编辑器工程与游戏资源。模型文件必须真正以`.json`结尾，不能是系统隐藏扩展名后得到的`.json.txt`。将工程文件改名为`.json`也不会把它转换为基岩版几何；应检查文件内部是否具有这里展示的`minecraft:geometry`结构。类似地，动画文件即使保存在正确目录，也仍需通过标识符建立引用。

## 分层检查客户端

完成本节时，如果服务端文件尚不存在，`/summon tutorial:guide`失败是预期的。我们将在下一节创建服务端文件后，一次检查完整结果：实体应呈现两个石质长方体，头部每4秒完成一次左右摆动。

如果命令成功却看不见实体，先检查客户端与服务端标识符是否一致；若只有模型可见但没有石纹，检查纹理路径与材质；若模型和纹理都正确但头部不动，检查动画完整标识符、短名称、播放列表与骨骼名。这四层应逐层排查，不必一次重写所有文件。

## 参考资料与版本

- [Mojang稳定版客户端猪定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/resource_pack/entity/pig.entity.json)：客户端资源、短名称与动画挂接结构。
- [官方自定义物品教程中的几何示例](https://learn.microsoft.com/en-us/minecraft/creator/documents/addcustomitems?view=minecraft-bedrock-stable)：骨骼、长方体与UV组织方式。

资料核查日期：2026-10-15。使用稳定的客户端实体1.10.0、几何1.12.0及渲染控制器1.8.0格式。引用原版资源便于教学，发布自己的作品时宜提供自己的纹理并检查资源覆盖冲突。
