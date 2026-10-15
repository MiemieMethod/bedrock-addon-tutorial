# 物品、方块与教学向导示例

本目录是入门教程第4至6章的累计结果。旧格式阅读示例没有装入这里；包内均使用正文给出的当前接口。资源包借用游戏自带的面包、绿宝石、石头和荧石纹理，不包含复制的原版图片。

将`behavior_pack`和`resource_pack`分别作为独立包安装，并在一个新的测试世界中启用。两个包的清单最低引擎版本是1.21.80；资料核查基线是2026-10-15可访问的稳定版1.26.50。建议使用与正文基线一致的稳定客户端。

可以逐步执行：

```mcfunction
/give @s tutorial:token 20
/give @s tutorial:travel_ration 4
/give @s tutorial:teaching_stone
/give @s tutorial:stone_platform
/setblock ~2 ~ ~ tutorial:teaching_lamp ["tutorial:lit"=true]
/summon tutorial:guide ~4 ~ ~
/event entity @e[type=tutorial:guide,c=1] tutorial:rest
/event entity @e[type=tutorial:guide,c=1] tutorial:work
```

口粮有两种工作台配方：小麦、苹果、小麦横排得到2份；一个面包与一个苹果无序合成得到2份。腐肉可在普通熔炉烧成皮革。向导能闲逛、切换工作状态、交易，并在死亡时产生战利品；自然生成规则也已启用，故本包只应先在测试世界体验。实体生命、掉落和食物消耗应在生存模式检验。

正文：[物品](../../docs/primer/sec4.1.md)、[方块](../../docs/primer/sec5.1.md)、[Molang与实体](../../docs/primer/sec6.1.md)。各节末尾列出资料版本和来源。

已经执行的检查仅包括JSON语法、文件引用及定义结构检查。尚未在Minecraft客户端或BDS中运行；AI、自然生成概率、交易界面、模型与动画仍需按正文步骤进行游戏内验收。本目录没有任何LeviLamina导出数据，也不声称已经取得那类数据。
