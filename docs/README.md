---
externalLinkIcon: false
---

# Minecraft基岩版附加包开发教程

[![CC by-nc-sa 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]
[![issues][issues-shield]][issues]
[![contributors][contributors-shield]][contributors]

欢迎来到Minecraft基岩版附加包教程三部曲。本教程分为《入门教程》《进阶教程》与《登峰教程》三个篇章。每个篇章适用的教学对象皆不相同。《入门教程》适用于对附加包一无所知的初学者，《进阶教程》适用于了解了一定的附加包内容后选择学习脚本或更高级的数据驱动用法的有一定经验的开发者，《登峰教程》适用于已经对绝大部分附加包内容有了适当的了解，渴望完全地学习附加包开发的附加包研究者。

## 写在前面

Minecraft附加包是一种在Minecraft基岩版中能够对游戏进行修改的内容形式。我们可以通过资源包改变纹理、声音和模型，通过行为包定义配方、物品、方块和实体，还可以通过脚本让这些内容相互配合，组成自己的玩法。这里所说的修改依赖游戏提供的接口；不同功能允许我们修改的范围并不相同，这也是我们在学习过程中需要逐步了解的内容。

本教程以国际基岩版为对象。我们将从一个能够亲手完成的小配方开始，学习文件如何被游戏读取，再逐步进入资源、行为、命令与脚本。在这个过程中，我们不仅要看到示例产生的结果，还要尝试解释这个结果为什么会出现，以及修改某个字段后，哪些部分会随之改变。

## 如何开始学习

如果你尚未接触过JSON，可以先阅读[JSON的语法](primer/sec0.1.md)。已经能够阅读简单配置文件的读者，则可以从[什么是附加包？](primer/sec1.1.md)开始，依次完成清单、配方和打包练习。初次练习时，不妨为每组示例新建一个测试世界，这样，我们就容易分清楚当前观察到的内容来自哪一个包。

如果你已经能够制作自己的物品、方块或实体，可以进入[进阶教程](advanced/sec0.1.md)，学习JavaScript和当前脚本接口。旧版脚本引擎与GameTest在教程中有各自的位置；我们会说明它们的用途和时代背景，而不会将名称相似的系统混在一起使用。

如果你希望进一步研究教程尚未逐项讲解的字段，可以从[阅读导出模式](peak/schema.md)开始，学习如何查阅模式、比较版本，并为自己的结论保留可以复现的证据。三部分的全部页面都可以在[目录](CONTENTS.md)中找到。

## 阅读示例之前

附加包的格式会随游戏更新而变化。游戏版本、JSON格式版本、包版本与脚本模块版本分别解决不同的问题，不能简单地统一成同一个数字。开始复制示例之前，请先阅读[版本、资料来源与验证范围](misc/source_guide.md)，然后查看具体章节的适用条件。

仓库的`examples/`目录提供配套文件。示例中的“预期结果”是我们进入游戏后需要检查的目标，不等于已经在所有设备和版本中完成测试。制作自己的作品时，我们还需要检查内容日志、实际效果以及保存重进后的行为。有关这些检查的方法，会随着各章练习逐步展开。

## 许可协议

[![CC by-nc-sa 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]<br/>
本作品采用[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa]进行许可。

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY%20NC%20SA%204.0-lightgrey.svg
[issues]: https://github.com/MiemieMethod/bedrock-addon-tutorial/issues
[issues-shield]: https://img.shields.io/github/issues/MiemieMethod/bedrock-addon-tutorial
[contributors]: https://github.com/MiemieMethod/bedrock-addon-tutorial/graphs/contributors
[contributors-shield]: https://img.shields.io/github/contributors-anon/MiemieMethod/bedrock-addon-tutorial
