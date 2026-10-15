# 注册GameTest函数并验证游戏行为

上一节中，我们已经能够在玩家生成时执行脚本。不过，假设我们又修改了几十处代码，怎样确认其中一项规则仍然正确呢？如果每次都凭记忆搭建场地、操作方块，再用眼睛判断结果，既容易遗漏条件，也不方便重复。**游戏测试框架**（**GameTest Framework**）便可以帮助我们固定这些过程。

这一节的目标是创建一个很小的自动测试：在测试场地的指定位置放置金块，然后检查该位置确实存在金块。例子看起来简单，却包含了注册、场地、操作、断言和结束这几个关键环节。

## 先明确实验接口的范围

GameTest模块与稳定的`@minecraft/server`分别声明依赖。截至本次核对，官方GameTest模块参考仍将其标为预发布接口；`bedrock-apis/bds-docs`的`stable`分支也包含`server-gametest_1.0.0-beta.d.ts`。请注意，**stable分支包含某份文件，不代表文件中描述的模块已经进入稳定轨道**。

本节使用的接口形状以这个`1.0.0-beta`声明以及官方`register`、`Test`和`RegistrationBuilder`参考为依据。实验模块必须与目标游戏构建对应，并启用所需的Beta APIs实验。官方在线页还可能展示带具体Preview构建后缀的版本；准备运行时，应使用目标构建实际支持的版本，不要将不同构建的后缀拼在一起。

因此，我们把测试放在单独的行为包中，并仅在测试世界启用。正式玩法包没有必要因为一个开发测试而增加实验依赖。仓库提供的是测试脚本和准备方法，没有把未生成的结构文件伪装成可以直接安装运行的完整测试包。

## 创建一个最小测试场地

GameTest需要一份**结构**（**Structure**）来确定测试范围和初始环境。我们先在创造模式测试世界中建立一个至少`3×3×3`的区域，为底部铺好地面，并确保上方没有方块和实体。通过结构方块将整个区域保存、导出为`.mcstructure`文件。

把导出的文件放在测试行为包的`structures/tutorial/empty.mcstructure`中。随后，代码通过`structureName("tutorial:empty")`引用它。这里的冒号用于区分命名空间与结构名；对应文件路径则使用目录分隔符。不要把文件命名为含冒号的文件名。

场地的大小、原点与内容都是测试的一部分。如果把底部地板排除在导出的区域之外，后面使用的相对坐标就需要一起修改。我们应将实际导出的结构与脚本一起维护，保证其他人在另一张世界中运行测试时也有相同的初始条件。

## 编写并注册测试

在测试脚本入口中写入以下内容，对应文件见`examples/advanced/gametest/block_check.js`：

```javascript
import { register } from "@minecraft/server-gametest";

register("tutorial", "place_gold_block", (test) => {
    const position = { x: 1, y: 1, z: 1 };
    test.setBlockType("minecraft:gold_block", position);
    test.assertBlockPresent("minecraft:gold_block", position, true);
    test.succeed();
})
    .structureName("tutorial:empty")
    .maxTicks(20);
```

`register`的前两个参数分别给出测试组名与测试名。第三个参数是一条回调函数，参数`test`代表当前这次测试。注册动作使测试可以被框架找到，并不会在每次玩家进入世界时自动执行测试内容。

回调中的位置使用测试结构内的相对坐标。我们先放置金块，再调用`assertBlockPresent`进行**断言**（**Assertion**）。所谓断言，就是明确要求某个条件成立；如果要求不成立，测试就应该失败，而不是继续显示一条令人误以为成功的聊天信息。

最后，`succeed`告诉框架，这次测试已经满足所有要求。`maxTicks(20)`给出允许运行的刻数上限。对于本例这种立即执行的检查，通常无需等待完整20刻；上限是防止测试一直不结束，不是故意增加等待时间。

## 运行成功测试与故意失败测试

确认测试包已正确声明脚本入口及匹配的`@minecraft/server-gametest`实验依赖，进入世界后，在有操作权限的情况下执行：

```mcfunction
/gametest run tutorial:place_gold_block
```

我们应当观察到测试场地生成，以及框架给出的成功结果。如果命令提示找不到测试，首先查看入口是否加载和注册是否报错；如果提示找不到结构，检查`structures/tutorial/empty.mcstructure`及`structureName`是否对应。

接下来，我们故意把断言中的`minecraft:gold_block`改为`minecraft:diamond_block`，而保留放置金块的代码。重新加载测试包后再次运行，预期结果应为失败。这个步骤很重要：它帮助我们确认测试真的检查了目标条件，而不是无论如何都会调用成功函数。

修改完成后恢复原来的断言，再重新运行。只有在目标游戏构建中实际完成这两轮运行，我们才能记录“成功用例通过，错误条件能够被捕捉”。仅有JavaScript语法检查不能得出这个结论。

## 为需要等待的行为编写测试

并非所有游戏效果都会立即发生。比如，生物走到目标位置需要经过多次游戏更新。此时可以将检查放入`succeedWhen`，由框架反复尝试断言，直到条件满足或达到超时上限。

```javascript
// 假定前面的代码已经安排了某种稍后发生的方块变化。
test.succeedWhen(() => {
    test.assertBlockPresent(
        "minecraft:gold_block",
        { x: 1, y: 1, z: 1 },
        true
    );
});
```

这里不要在外面立即调用`succeed`，否则测试会在等待条件满足之前结束。也不要把“没有达到目标”的普通情况吞进`try...catch`后什么都不做，否则框架可能失去正确判断失败的依据。

同样，我们不应把需要永久运行的玩法主循环注册成一个永不结束的测试。玩法应由普通脚本事件和调度驱动，GameTest只负责在受控场地中验证它。下一节中，我们回到普通玩法脚本，进一步学习事件发生前后两种回调。

## 参考资料

- [官方第一个GameTest教程](https://learn.microsoft.com/en-us/minecraft/creator/documents/gametestbuildyourfirstgametest?view=minecraft-bedrock-stable)。
- [GameTest模块与注册函数](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-gametest/minecraft-server-gametest?view=minecraft-bedrock-experimental)。
- [RegistrationBuilder参考](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-gametest/registrationbuilder?view=minecraft-bedrock-experimental)。
- [BDS导出的GameTest Beta声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-gametest_1.0.0-beta.d.ts)。
