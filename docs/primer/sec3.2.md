# 修改原版声音

上一节中，我们通过在相同路径放置图片替换了泥土纹理。声音也可以采用类似的办法，不过在进一步定制声音之前，我们需要先分清“音频文件”和“让声音播放的定义”。

## 从打开箱子的声音开始

当玩家打开一个箱子时，游戏会触发相应的声音事件，然后根据声音定义选择需要播放的音频。我们可以把其中的关系分为三层：

| 所处层次 | 本节中的例子 | 描述的内容 |
| --- | --- | --- |
| 游戏动作与声音的关联 | 箱子打开的`chest.open`事件 | 什么时候播放哪个声音标识符 |
| 声音定义 | `random.chestopen` | 选择哪些音频以及采用什么参数 |
| 音频文件 | `sounds/random/chestopen`对应的音频 | 实际听到的波形 |

最简单的修改只涉及第三层：准备一段新音频，放到原版定义已经引用的路径。这样便可以暂时沿用游戏已有的事件关联与声音定义。

我们使用音频编辑器录制一小段清晰的提示音，裁去开头过长的静音，导出为Ogg Vorbis格式的`chestopen.ogg`。为了使第一次测试容易判断，建议使用很短的单声道音效，先以舒适的音量试听，避免将过大音量误认为“效果明显”。

在资源包中新建`sounds/random`目录，把文件放入其中。现在其路径为`Tutorial_RP/sounds/random/chestopen.ogg`。官方支持的音频格式还包括WAV；仓库示例提供的`chestopen.wav`是一段程序生成的测试提示音。使用其中一种即可，不要在同一路径同时放置多个仅扩展名不同的候选文件。

## 验证同路径替换

重新加载资源包后，在世界中放置一个箱子，再打开它。按照本例，箱子打开时应当播放新的提示音，而关闭箱子时仍然使用原来的关闭音效。这个区别有助于确认我们替换的是打开动作对应的资源。

如果没有听到变化，首先检查是否把音频放在`sounds/random`下，文件主体名称是否确实为`chestopen`，以及它是否通过音频编辑器实际导出为对应格式。把`recording.mp3`直接改名为`chestopen.ogg`不会转换编码。还应检查游戏音量、资源包优先级，以及新音频本身是否只有静音。

完成这个测试后，我们已经掌握了对已有资源进行替换的办法。不过，如果希望一个新声音可以通过命令独立播放，就需要增加自己的声音定义。

## 为声音分配新的标识符

我们另取一份提示音，放到`sounds/tutorial/foundations/bell.ogg`；也可以使用示例中的同名WAV。路径中加入自己的目录，是为了减少与其他资源包发生覆盖的机会。

然后在`sounds`目录下新建`sound_definitions.json`，写入：

```json
{
    "format_version": "1.20.20",
    "sound_definitions": {
        "tutorial:bell": {
            "category": "block",
            "sounds": [
                "sounds/tutorial/foundations/bell"
            ]
        }
    }
}
```

**声音定义**（**Sound Definition**）将`tutorial:bell`这个标识符对应到一段音频。这里的音频路径相对于资源包根目录，采用正斜杠，并且不写文件扩展名。`sounds`虽然目前只有一个元素，仍然是数组，这也为一个定义选用多个音频提供了结构上的位置。

`category`用于声音分类，并与游戏的音量控制有关。本例选择`block`，便于沿用方块音效的使用场景。我们先保持其他参数简单，避免在尚未听到声音之前同时引入距离衰减、音高随机化等影响因素。

在允许使用命令的测试世界中执行：

```mcfunction
/playsound tutorial:bell @s ~ ~ ~ 1 1
```

这里在执行者所在位置向执行者播放声音，最后两个`1`分别给出音量和音高参数。不要把`tutorial:bell`换成文件名或绝对文件路径：命令查找的是声音定义的标识符。

## 让动作使用自定义声音

仅能通过命令播放，并不意味着箱子会自动使用它。如果希望把箱子打开动作改为使用`tutorial:bell`，可以在资源包根目录另建`sounds.json`：

```json
{
    "individual_event_sounds": {
        "events": {
            "chest.open": {
                "sound": "tutorial:bell",
                "volume": 1.0,
                "pitch": 1.0
            }
        }
    }
}
```

注意这两个JSON文件的位置不同：`sounds.json`在包根目录，`sound_definitions.json`在`sounds`目录。前者把游戏动作联系到声音标识符，后者把标识符联系到音频。为了单独验证这条新路径，我们可以先移走本节开头的`sounds/random/chestopen.ogg`或WAV替换文件，再重新加载测试。

若命令播放成功而箱子仍使用原声，优先检查根目录的事件关联；若命令也无声，则先检查声音定义与音频路径。这样的分段验证，可以把问题缩小到某一层，而不是反复修改所有文件。

本节不需要复制原版全部声音定义。只写入需要新增或调整的条目，能够让改动范围保持清晰。不过，同一个原版事件被多个包修改时仍然会发生优先级冲突，因此正式制作中应检查与其他包同时加载的效果。

::: tip 版本与参考

本例使用稳定的资源包声音流程与1.20.20声音定义格式，不使用新版预览中的服务端声音扩展。参考：[官方声音基础](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontosound?view=minecraft-bedrock-stable)、[添加自定义声音](https://learn.microsoft.com/en-us/minecraft/creator/documents/addcustomsounds?view=minecraft-bedrock-stable)、[原版声音定义](https://github.com/Mojang/bedrock-samples/blob/main/resource_pack/sounds/sound_definitions.json)。原版音频路径可能随版本调整，核对日期：2026年10月15日。

:::
