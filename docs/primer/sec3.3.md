# 修改原版翻译

同一个物品，在简体中文界面和英文界面中会显示不同的名称，但它在命令中使用的标识符并不会因此改变。接下来，我们通过修改泥土的名称，认识**本地化**（**Localization**）文本与游戏内容之间的联系。

## 从名称找到语言键

我们打开与目标版本对应的原版资源包，在`texts/en_US.lang`和`texts/zh_CN.lang`中查找泥土的名称。可以看到类似下面的条目：

```text
tile.dirt.name=Dirt
tile.dirt.default.name=Dirt
```

等号左侧是用于查找文本的**语言键**（**Localization Key**），右侧是对应语言中实际显示的内容。不同的物品或历史变体可能使用相近的多个键，所以查找时不能只看到一个包含`dirt`的条目，就将所有相关行一概替换。例如，砂土和缠根泥土也有自己的名称。

`.lang`是文本格式，不是JSON。每个条目独占一行，不需要为键和值加引号，不需要在末尾添加逗号，也不需要在最外面加花括号。

## 为资源包添加两种语言

在`Tutorial_RP`中新建`texts`目录，并创建`zh_CN.lang`：

```text
tile.dirt.name=教学泥土
tile.dirt.default.name=教学泥土
tutorial.message.ready=教程资源包已经准备好了。
tutorial.message.collected=我们已经收集了 %s 块圆石。
```

再创建`en_US.lang`：

```text
tile.dirt.name=Tutorial Dirt
tile.dirt.default.name=Tutorial Dirt
tutorial.message.ready=The tutorial resource pack is ready.
tutorial.message.collected=We have collected %s cobblestone blocks.
```

最后创建`languages.json`：

```json
["en_US", "zh_CN"]
```

所有文本以UTF-8保存。前两个键用来覆盖原版名称，后两个是我们新建的消息键。新增键采用`tutorial.`前缀，是为了让它们与原版和其他作品的文本区分开。与实体标识符不同，语言键并不要求一律采用`命名空间:名称`的结构；它的具体拼写必须与调用方保持一致。

我们只写入需要修改或新增的条目，不需要把原版语言文件全部复制过来。复制整份文件虽然看似方便，却会同时固定大量与本作品无关的翻译，今后原版新增或修订文本时，更容易产生维护问题。

## 检查显示与身份是否分离

保存文件，重新加载资源包，在简体中文界面中查看物品栏里的泥土。名称应当显示为“教学泥土”。然后切换为英文，按需重新加载资源，检查名称是否变为“Tutorial Dirt”。同时观察砂土和其他未修改的方块，确认它们没有被误改。

接下来，在允许命令的测试世界中运行：

```mcfunction
/give @s minecraft:dirt 1
```

获得的仍然是同一种泥土，只是显示名称由资源包提供。将命令中的`minecraft:dirt`替换为“教学泥土”并不会因此得到有效的物品标识符。这与第一节的纹理实验相呼应：外观、显示名称和内容身份之间存在联系，但不是同一个东西。

如果需要单独验证某个语言键，可以通过原始消息命令显示它：

```mcfunction
/tellraw @s {"rawtext":[{"translate":"tile.dirt.name"}]}
```

这有助于区分“语言文件没有加载”和“物品当前使用的是另一个语言键”。前者会影响直接查找，后者则需要继续检查该版本的实际调用关系。

## 在自己的消息中使用语言键

语言文件中出现了一个新键，不会自动让游戏找到合适时机显示它。我们需要从命令、脚本或其他支持本地化的定义中引用它。例如：

```mcfunction
/tellraw @s {"rawtext":[{"translate":"tutorial.message.ready"}]}
```

简体中文客户端应当显示“教程资源包已经准备好了。”。其中`translate`要求游戏查找语言键；如果写成`text`，则会直接显示后面的字符串，而不进行同样的语言查找。

另一条消息包含`%s`，它是用于接收参数的占位符。我们通过`with`传入对应的内容：

```mcfunction
/tellraw @s {"rawtext":[{"translate":"tutorial.message.collected","with":["8"]}]}
```

按照本例，消息应当显示为“我们已经收集了 8 块圆石。”。这里的8只是我们为演示传入的文本，命令本身不会检查玩家物品栏，也不会真的收集圆石。以后与脚本结合时，才可以把实际计算得到的数量传入消息。

修改原版带参数的翻译时，应该保留所需的占位符及其含义。若原句接收两个参数，却在翻译中丢掉一个，可能导致姓名、数量等信息缺失。也不要直接将Java版的JSON语言文件格式放入本教程的`.lang`文件中。

## 常见问题与维护

如果出现乱码，检查UTF-8编码；如果显示语言键，检查键名、资源包是否加载，以及文件是否位于`texts`；如果中文正确而英文不正确，分别检查两份语言文件，不能仅凭一种语言通过就认定所有语言都有效。资源包优先级也可能让另一个包覆盖同名语言键。

当原版升级时，应当重新核对我们覆盖的那些键，而不是机械地给包提高版本号。键名、调用方式或原版术语发生变化后，旧的覆盖文件可能不再作用于预期位置。保持改动范围小、保留一份需要覆盖的键清单，会使这一过程更加容易。

现在，我们已经分别修改了原版纹理、声音和显示名称。下一章将从修改已有内容走向添加新的物品，并把这里学到的资源路径、语言键和命名空间继续组合起来使用。

::: tip 版本与参考

本节使用稳定的`.lang`与原始消息格式。原版语言键来自核对时的[Mojang英文语言文件](https://github.com/Mojang/bedrock-samples/blob/main/resource_pack/texts/en_US.lang)和[简体中文语言文件](https://github.com/Mojang/bedrock-samples/blob/main/resource_pack/texts/zh_CN.lang)；调用方式参考[官方原始消息文档](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/rawmessagejson?view=minecraft-bedrock-stable)。核对日期：2026年10月15日。

:::
