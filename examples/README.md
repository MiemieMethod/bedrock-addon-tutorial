# 教程配套示例

这里保存教程中需要跨文件配合的示例。我们可以先阅读对应章节，再将一组示例放入新的测试世界，按照各目录的说明逐项检查结果。不同目录是不同练习，不需要为了学习某一章便一次性启用所有包。

| 目录 | 对应内容 | 从哪里开始 |
| --- | --- | --- |
| [foundations](foundations/README.md) | 清单、配方、资源、皮肤与声音 | [制作第一个附加包](../docs/primer/sec1.1.md) |
| [entities](entities/README.md) | 物品、方块、模型、实体、交易与掉落 | [自定义物品](../docs/primer/sec4.2.md) |
| [world](world/README.md) | 粒子、群系、地物、结构与命令函数 | [自定义粒子](../docs/primer/sec7.1.md) |
| [presentation](presentation/README.md) | 材质与界面练习 | [着色器基础](../docs/primer/sec10.1.md) |
| [javascript](javascript/README.md) | JavaScript基础章的输出校验 | [认识JS的语法](../docs/advanced/sec0.1.md) |
| [advanced](advanced/README.md) | 脚本、GameTest、计时赛与表单 | [学习当前Script API](../docs/advanced/sec1.2.md) |

示例有各自的最低引擎版本和格式前提。特别是世界生成、图形功能和实验性GameTest，不能仅因为一个基础配方能够加载，便推定同一环境满足这些练习的要求。

世界存档与结构方块的导出产物需要由游戏实际生成。相关目录说明了导出和放置步骤，没有用空文件代替`level.dat`、世界数据库或`.mcstructure`。原版纹理引用则依赖游戏提供的资源；本仓库没有复制一套原版游戏资产。

本次校验包括文件语法、引用关系、独立JavaScript示例、脚本类型检查和文档构建；未执行Minecraft客户端或BDS运行验证。各节给出的预期效果是下一步运行时的验收目标。完整资料基线见[版本、资料来源与验证范围](../docs/misc/source_guide.md)。
