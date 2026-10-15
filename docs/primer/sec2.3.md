# 认识皮肤包

资源包可以改变实体的外观，那么玩家在更衣室中选择的皮肤，是不是也只需要放进资源包的实体纹理文件夹呢？在本节中，我们认识另一种用途明确的包——**皮肤包**（**Skin Pack**）。

皮肤包将若干玩家皮肤及其名称组织在一起，供支持相应导入方式的客户端选择。它与普通世界资源包的区别在于使用场景和清单类型，不能把`textures/entity`中的任意图片自动当作更衣室中的一款皮肤。

## 准备最小的皮肤包

我们在工作目录中新建`Tutorial_Skins`，准备以下文件：

| 相对路径 | 用途 |
| --- | --- |
| `manifest.json` | 声明这是一个皮肤包 |
| `skins.json` | 列出每款皮肤的模型类型、图片与名称键 |
| `student.png` | 我们制作的皮肤图片 |
| `texts/en_US.lang` | 英文名称 |
| `texts/zh_CN.lang` | 简体中文名称 |
| `texts/languages.json` | 语言列表 |

先准备一张符合标准玩家皮肤布局的64×64 PNG图片，命名为`student.png`。可以在皮肤编辑器中从标准模型开始绘制；仓库的`examples/foundations`还提供了用于检查流程的简单测试皮肤。这张图中的不同区域对应头、身体和四肢，并不是把一张普通头像缩小为64×64就能得到正确的皮肤。

为了便于观察，我们使用普通宽手臂模型，并给正面和背面设置不同的颜色。这样在预览中旋转角色时，便能检查图片是否放错了区域。需要透明区域时也应遵守皮肤格式的限制，不能以为将身体全部擦除便可以得到任意隐形角色。

## 声明皮肤与名称

在`manifest.json`中写入：

```json
{
    "format_version": 1,
    "header": {
        "name": "pack.name",
        "uuid": "72c228b0-9536-4e10-9f82-39982e458634",
        "version": [1, 0, 0]
    },
    "modules": [
        {
            "type": "skin_pack",
            "uuid": "c764dc72-8ba4-4920-9252-f7ddf9b0ec6b",
            "version": [1, 0, 0]
        }
    ]
}
```

这里的格式版本为`1`，模块类型为`skin_pack`。不要把资源包清单中的`2`和`resources`机械地复制过来。也不要因为皮肤包使用格式1，就把已经完成的行为包和资源包一起降为格式1：它们是不同类型的清单。

接下来编写`skins.json`：

```json
{
    "serialize_name": "tutorial_students",
    "localization_name": "tutorial_students",
    "skins": [
        {
            "localization_name": "student",
            "geometry": "geometry.humanoid.custom",
            "texture": "student.png",
            "type": "free"
        }
    ]
}
```

`geometry.humanoid.custom`表示普通宽手臂模型，细手臂模型则使用`geometry.humanoid.customSlim`。选择模型时需要与皮肤实际采用的布局相符，否则手臂周围容易出现错位。这里的`texture`相对于皮肤包根目录，所以我们的图片直接放在根目录。

`localization_name`并不是最终显示给玩家的完整文本，而是用于查找名称的一部分。我们在`texts/en_US.lang`中写入：

```text
pack.name=Tutorial Skins
skinpack.tutorial_students=Tutorial Skins
skin.tutorial_students.student=Student
```

再在`texts/zh_CN.lang`中写入：

```text
pack.name=教程皮肤包
skinpack.tutorial_students=教程皮肤包
skin.tutorial_students.student=学员
```

最后创建`texts/languages.json`：

```json
["en_US", "zh_CN"]
```

我们可以看到，名称键由皮肤包的`localization_name`和单款皮肤的`localization_name`共同组成。只修改显示文本，不会改变图片路径；只修改`skins.json`中的名称键，却没有同步语言文件，则可能让界面显示未解析的名称。

## 导入并检查

按照第一章的方法，将`Tutorial_Skins`内部的文件和目录压缩为ZIP，改名为`.mcpack`，在支持本地皮肤包导入的客户端中打开。随后进入更衣室或经典皮肤相关页面，找到包名和“学员”皮肤，检查正反面、手臂宽度与语言切换效果。

如果包名出现但皮肤不可用，优先检查`skins.json`、图片文件名的大小写和模型选择。若界面直接显示`skin.tutorial_students.student`之类的键，则检查`texts`目录、语言文件名与键是否一致。若设备根本没有提供这种导入入口，属于平台能力和分发方式的问题，不能靠修改UUID解决。

本节介绍的是标准皮肤包JSON流程。它不意味着可以通过这一格式任意加入自定义玩家模型，也不意味着本地导入的皮肤一定能在所有平台、账户设置与多人环境中通用。后面的皮肤专题将进一步说明皮肤布局和相关限制。

::: tip 版本与参考

皮肤包沿用官方文档中的格式1与`skin_pack`模块；该规则与普通资源包不同。参考：[皮肤包打包教程](https://learn.microsoft.com/en-us/minecraft/creator/documents/packagingaskinpack?view=minecraft-bedrock-stable)、[皮肤包入门](https://learn.microsoft.com/en-us/minecraft/creator/documents/skinpack?view=minecraft-bedrock-stable)。导入支持以实际客户端平台为准。核对日期：2026年10月15日。

:::
