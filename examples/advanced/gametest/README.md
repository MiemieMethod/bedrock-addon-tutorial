# GameTest方块检查

本目录提供测试源文件`block_check.js`与`manifest.template.json`，不包含伪造的`.mcstructure`文件，也没有宣称已在游戏中运行。

## 准备测试包

1. 在独立测试世界中建立至少`3×3×3`的场地，底部有地板，上方没有方块或实体。使用结构方块将该区域导出为`empty.mcstructure`。
2. 新建测试行为包，将`manifest.template.json`复制为其根目录下的`manifest.json`。
3. 将`block_check.js`放入该包的`scripts/block_check.js`，将结构放入`structures/tutorial/empty.mcstructure`。
4. 模板声明`@minecraft/server` `2.0.0`与`@minecraft/server-gametest` `1.0.0-beta`。后者依据本次读取的BDS导出声明。请在目标游戏构建中核对这一实验版本实际可用，并启用Beta APIs；如果目标构建使用不同的实验版本，应同时核对类型与清单，不能仅机械替换字符串。
5. 完整进入世界，以有相应权限的玩家执行`/gametest run tutorial:place_gold_block`。

预期先放置金块，再成功断言同一相对坐标的方块类型。之后将断言中的类型改为`minecraft:diamond_block`重新运行，预期失败。最后恢复原来的断言。场地坐标、结构导出和实验模块解析均需实际运行验证。

本测试有明确结束条件，不作为普通玩法的常驻循环。其注册、放置、断言和结束方法分别依据[官方GameTest模块](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-gametest/minecraft-server-gametest?view=minecraft-bedrock-experimental)和[BDS导出的Beta声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-gametest_1.0.0-beta.d.ts)。
