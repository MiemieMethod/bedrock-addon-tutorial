# 粒子、世界生成与函数示例

本目录配合入门教程第七至第九章使用。我们可以先测试一个独立效果，再逐步将它们组合起来。样例已经通过JSON语法与文件引用检查，但没有在Minecraft客户端中实际运行；请按照下面的步骤完成游戏内验收。

## 准备测试世界

将`behavior_pack`和`resource_pack`分别复制到对应的开发包目录，在1.26.50系列稳定版或更新的兼容客户端中启用两者。清单要求的最低引擎版本为1.26.30，这是群系地表构建器采用的版本要求。本例不依赖预览版，也不需要开启实验性功能。

请使用新建的普通类型创造模式世界，并允许执行命令。世界生成例子需要尚未生成的区块；在已有世界原地重新加载，不能保证看到新的地表和地物。

## 逐项观察

| 对应正文 | 操作 | 预期结果 |
| --- | --- | --- |
| [自定义粒子](../../docs/primer/sec7.1.md) | `/particle tutorial:spark ~ ~1 ~2` | 出现一簇向外散开的火星。 |
| [粒子事件](../../docs/primer/sec7.2.md) | `/particle tutorial:double_spark ~ ~1 ~2` | 在约0.5秒和1秒时各产生一簇火星。 |
| [自定义群系](../../docs/primer/sec8.1.md) | `/locate biome tutorial:chalk_plains` | 找到具有方解石地表的区域。 |
| [自定义地物](../../docs/primer/sec8.2.md) | 观察新生成的白石平原 | 部分符合条件的地表位置出现南瓜。 |
| [函数与滴答](../../docs/primer/sec9.2.md) | `/function tutorial/welcome` | 显示欢迎消息，并给予一个苹果。 |
| [函数与滴答](../../docs/primer/sec9.2.md) | `/function tutorial/clock_setup` | 开始约每20游戏刻显示一次动作栏提示。 |
| [平台练习](../../docs/primer/sec9.3.md) | `/function tutorial/pad/setup`，然后走上金块 | 显示进入次数并产生火星；停留不重复，离开再回来可以再次触发。 |

暂停计时练习可以执行`/tag @s remove tutorial_clock_ready`。退出平台练习可以执行`/tag @s remove ta_pad_player`，再执行`/tag @s remove ta_on_pad`清除自己的平台状态。初始化函数会重置相应练习的计数，请勿放入逐刻入口。

## 实体粒子挂接

`resource_pack/animations/tutorial.spark.animation.json`提供了粒子动画。它需要合并到第六章`tutorial:guide`实体的客户端定义中才能播放，本目录没有重复定义该实体。可以配合`examples/entities`使用，并按照[将粒子挂接在实体上](../../docs/primer/sec7.3.md)添加粒子短名称、动画短名称、`scripts.animate`成员和模型定位器，保留原有的`look`和`pulse`动画。

## 结构模板练习

`structure-exercise`中的两个JSON文件暂时没有装入行为包，因为它们依赖亲自在游戏中导出的`waymarker.mcstructure`。按[结构与地物的配合](../../docs/primer/sec8.3.md)搭建并导出模板后：

1. 将模板放入`behavior_pack/structures/tutorial/waymarker.mcstructure`。
2. 将`structure-exercise/features/waymarker_feature.json`复制到行为包的`features`目录。
3. 将`structure-exercise/feature_rules/waymarker_rule.json`复制到行为包的`feature_rules`目录。
4. 在没有保存同名结构的新测试世界中，先执行`/structure load tutorial:waymarker ~2 ~ ~2`，确认包内模板能够加载。
5. 再观察新生成白石平原中的自然放置结果。

结构方块的`.mcstructure`导出与“3D导出”不同；后者产生的模型文件不能作为本练习的结构模板。

## 版本依据

核对日期：2026-10-15。对应读取的`Mojang/bedrock-samples`版本记录为`main`的1.26.50.4，以及`preview`的1.26.60.29；本目录按稳定版目标编写。命令还对照了`bedrock-apis/bds-docs`稳定与预览分支的公开命令签名。各功能的具体参考链接与兼容边界见相应正文及[资料来源与版本说明](../../docs/misc/source_guide.md)。
