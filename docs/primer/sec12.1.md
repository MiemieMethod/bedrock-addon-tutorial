# 自定义皮肤包

前面的资源包主要改变世界中的内容，而**皮肤包**（**Skin Pack**）用于组织玩家可以选择的经典皮肤。在本节中，我们将一起制作一个只包含一款皮肤的小包，并通过它认识皮肤图片、模型类型和本地化名称之间的关系。

## 先准备一张皮肤图片

我们先在支持Minecraft皮肤布局的编辑器中，绘制一张64×64像素的PNG皮肤。第一次制作时，可以使用标准宽手臂的人形模板，给头部、身体和四肢涂上容易区分的颜色。这样，在导入后可以迅速发现某个面画反或某个部位错位。

皮肤图片不是角色正面的截图。它是一张按照既定UV布局展开的纹理，多个区域分别对应模型的不同表面。绘制时应保留PNG透明通道，并根据基础层与外层的用途处理透明区域。把整幅角色立绘缩小成64×64，并不会自动成为可用皮肤。

将这张图片保存为`researcher.png`。本节的示例文本位于`examples/presentation/skin_pack_template/`，图片需要使用我们自己绘制或已经取得相应权利的作品补入，避免把别人的皮肤误当成可以重新发布的素材。

## 编写清单与皮肤列表

在皮肤包根目录创建`manifest.json`：

```json
{
  "format_version": 1,
  "header": {
    "name": "pack.name",
    "uuid": "b4f971d2-52d5-4d6e-b352-8d4e3b30e97c",
    "version": [1, 0, 0]
  },
  "modules": [
    {
      "type": "skin_pack",
      "uuid": "483d163c-e2cd-4578-a251-20d9e03d008f",
      "version": [1, 0, 0]
    }
  ]
}
```

这里沿用官方皮肤包指南的清单格式。`skin_pack`用于区分资源包与行为包，两个UUID必须不同。为自己的新包生成UUID之后，应在后续版本中保留其身份，而不是每次修改一张图片就换一组UUID。

接下来，在相同目录创建`skins.json`：

```json
{
  "serialize_name": "tutorial_researchers",
  "localization_name": "tutorial_researchers",
  "skins": [
    {
      "localization_name": "researcher",
      "geometry": "geometry.humanoid.custom",
      "texture": "researcher.png",
      "type": "free"
    }
  ]
}
```

`texture`指向根目录中的皮肤图片。标准宽手臂使用`geometry.humanoid.custom`，细手臂则使用`geometry.humanoid.customSlim`。我们应根据图片采用的模板选择模型，不应靠修改这一个字符串来掩盖错误的UV绘制。

本例设置为`free`。字段中的`paid`并不会替我们创建支付功能、商店商品或授权校验；商业分发属于相应平台的发布流程。

## 为玩家显示名称

创建`texts/languages.json`：

```json
["en_US", "zh_CN"]
```

再创建`texts/en_US.lang`：

```text
pack.name=Tutorial Researchers
skinpack.tutorial_researchers=Tutorial Researchers
skin.tutorial_researchers.researcher=Researcher
```

以及`texts/zh_CN.lang`：

```text
pack.name=教程研究员
skinpack.tutorial_researchers=教程研究员
skin.tutorial_researchers.researcher=研究员
```

请注意，这几处名称之间并非随意对应。皮肤包名称使用`skinpack.`加上包的本地化名，单款皮肤名称则使用`skin.`、包本地化名和皮肤本地化名共同组成键。若游戏显示出一长串键名，而不是“研究员”，首先检查这些字符串是否逐字一致。

`.lang`使用`键=值`的形式，不是JSON；不要在整行两侧加引号，也不要在行尾添加JSON逗号。我们同时提供英文条目，避免在另一种语言环境下只剩下无法理解的键。

## 打包与导入

此时，皮肤包根目录应直接包含`manifest.json`、`skins.json`、`researcher.png`和`texts`目录。选择这些内容压缩为ZIP，再将扩展名改为`.mcpack`。打开压缩包时，第一层就应看到清单文件，不能额外套一层同名目录。

在支持侧载皮肤包的平台上导入后，到更衣室的经典皮肤相关入口检查皮肤。入口的名称和位置会随客户端调整，因此我们关注的是“已拥有或已导入的经典皮肤”，而不是固定某张旧截图中的按钮坐标。

依次观察正面、背面、四肢侧面和外层。然后切换中英文，检查包名与皮肤名；再在测试联机环境中检查其他玩家看到的效果。平台、账户设置和服务器策略都可能影响自定义皮肤的可见性，导入成功并不能替代这些验证。

## 常见问题

如果导入失败，先检查ZIP结构、JSON语法和UUID冲突。如果列表中有包却没有正确图片，检查图片大小、PNG格式、路径大小写及`texture`拼写。如果手臂边缘错位，检查宽手臂与细手臂模板是否一致。

本节不通过皮肤包注册任意自定义玩家模型。官方皮肤包指南明确说明，普通皮肤包JSON能力不能据此加入自定义模型。需要角色部件或世界内装备外观时，应继续阅读下一节，选择对应的实现途径。

## 适用范围与参考

本节面向支持用户导入内容的国际版客户端。主机等平台的侧载入口可能受限，不应把Windows上的操作写成全部平台的共同能力。皮肤包也不等于更衣室中的Persona部件。

- [官方：打包皮肤包](https://learn.microsoft.com/en-us/minecraft/creator/documents/packagingaskinpack?view=minecraft-bedrock-stable)
- [官方：皮肤包JSON与本地化参考](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/skinpacksreference/skinpackjsonreference?view=minecraft-bedrock-stable)
- [本教程的资料版本与验证边界](../misc/source_guide.md)
