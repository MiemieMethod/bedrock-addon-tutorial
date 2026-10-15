# 认识世界模板

如果我们不仅制作了一组配方和纹理，还在世界中建造了出生大厅、布置了教学场景，并且调整好了世界设置，那么怎样让玩家从同一个起点开始自己的体验呢？这时可以使用**世界模板**（**World Template**）。

世界模板保存一个用于创建世界的起始状态。玩家每次通过模板新建世界，得到的都是独立的世界副本。例如，第一位玩家拆掉了出生大厅中的箱子，不应该导致第二位玩家从同一个模板创建的世界中也缺少这个箱子。

## 世界导出与模板的区别

普通`.mcworld`主要用于导入一份世界；`.mctemplate`则把世界注册为可重复创建新世界的模板。两者都可能携带世界数据与所用的包，但导入后的用途不同。资源包和行为包描述资源与规则，模板还需要包含或指向组成起始场景的世界内容。

因此，我们不能简单地把只有`manifest.json`和配方的行为包改名为`.mctemplate`。缺少世界数据的模板并不会自动拥有我们想象中的出生大厅。

## 从测试世界开始

我们先在游戏里建立一个新的测试世界，在出生点附近放置一个容易辨认的标志，例如一个石砖平台和写有“教程起点”的告示牌。若希望模板携带第一章的配方，先在世界设置中激活对应行为包，并在世界中验证它。

随后通过世界设置中的导出功能导出`.mcworld`。具体入口因平台而异；本节适用于可以导出世界并处理本地归档的环境。我们保留原始导出文件，再复制一份用于制作模板。将副本按ZIP格式解压后，通常会看到`level.dat`、`levelname.txt`和`db`等内容。它们属于世界数据，不应当为了让目录“看起来整齐”而删掉。

如果导出世界带有附加包，还可能有以下内容：

| 路径或文件 | 作用 |
| --- | --- |
| `behavior_packs`、`resource_packs` | 世界携带的包 |
| `world_behavior_packs.json` | 世界激活的行为包UUID与版本 |
| `world_resource_packs.json` | 世界激活的资源包UUID与版本 |
| `world_icon.jpeg` | 世界列表中的预览图 |

我们先让游戏生成这些关联，不手工猜写一整套UUID。世界能成功导出，也仍然需要检查它是否真正携带了测试时依赖的包。

## 为模板添加清单

在解压目录的根目录，也就是与`level.dat`相同的位置，新建`manifest.json`：

```json
{
    "format_version": 2,
    "header": {
        "name": "pack.name",
        "description": "pack.description",
        "uuid": "47cc5e0c-502a-4d24-8548-305414d5806f",
        "version": [1, 0, 0],
        "lock_template_options": false
    },
    "modules": [
        {
            "type": "world_template",
            "uuid": "ef8594b8-adc6-4f98-8b8e-174a15002b35",
            "version": [1, 0, 0]
        }
    ]
}
```

这里最关键的模块类型为`world_template`。`lock_template_options`用于控制模板相关设置的锁定，本例明确设为`false`，便于学习时调整选项。模板的UUID是模板自己的身份，不能与其中行为包或资源包的UUID混用。

在根目录下创建`texts`，并创建`texts/en_US.lang`：

```text
pack.name=Tutorial Starting World
pack.description=A fresh world for the add-on tutorial.
```

再创建`texts/zh_CN.lang`：

```text
pack.name=教程起始世界
pack.description=从同一个起点开始附加包练习。
```

最后创建`texts/languages.json`：

```json
["en_US", "zh_CN"]
```

清单中的`pack.name`和`pack.description`由这两份语言文件提供显示文本。这里是模板根目录自己的`texts`，与模板内部某个资源包的`texts`不是同一个位置。

## 打包与验证副本

选中解压目录内部的全部内容，压缩为ZIP，再改为`.mctemplate`。归档根目录应同时包含`manifest.json`、`level.dat`和`db`，不要在外面多套一层工作文件夹。打开文件导入后，从模板入口新建第一个世界，确认出生标志和配方存在。

然后在第一个世界中拆掉标志、保存退出，再从同一个模板创建第二个世界。第二个世界中的标志应当仍然完整。这项验证比只检查“成功导入”更接近模板真正承担的工作。

如果新世界只有普通地形，检查是否误删了`db`或装入了错误的世界副本；如果大厅存在但配方失效，检查携带的行为包及其世界关联；如果模板名称显示为`pack.name`，检查语言文件。为照顾某些平台的路径长度限制，官方还建议世界模板内的资源包和行为包文件夹名称不超过10个字符。

随机种子模板、基础游戏版本锁定与完整的发布流程有额外要求，不能通过随意删除世界文件来试出结果。本节先保留已有世界数据，完成最容易观察的固定起点模板。后面的[世界打包专题](./sec13.3.md)会继续讨论这些细节。

::: tip 版本与参考

本例使用稳定的世界模板清单格式2；世界文件由实际客户端导出，不能用文本示例代替`level.dat`或数据库。参考：[从导出世界创建模板](https://learn.microsoft.com/en-us/minecraft/creator/documents/createaworldtemplate?view=minecraft-bedrock-stable)、[清单字段参考](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonmanifest?view=minecraft-bedrock-stable)。核对日期：2026年10月15日。

:::
