# 实例：制作具有存档记忆的玩家引导

我们已经可以在玩家生成时发送欢迎消息。不过，如果希望玩家只在第一次参加教程时看到完整说明，以后重新进入只显示简短提醒，该怎么办呢？如果只使用一个JavaScript变量，关闭世界后变量就会消失；如果只检查`initialSpawn`，玩家下次重新进入时仍然满足条件。

在本节中，我们一起制作一个能够记住玩家阅读状态的引导功能。玩家初次进入时收到说明；使用指南针点击金块，可以再次查看；使用指南针潜行点击金块，可以重置自己的阅读状态。这个实例使用稳定的`@minecraft/server` `2.0.0`接口，完整文件位于`examples/advanced/player_guide/BP`。

## 明确状态应保存在什么地方

**动态属性**（**Dynamic Property**）能够让脚本在世界或实体上保存受支持类型的数据。本例的状态属于某位玩家，因此应保存在玩家上。如果把同一个布尔值保存在`world`上，那么第一个玩家读过引导后，其他玩家也会被误认为已经读过。

我们使用`tutorial:guide_version`保存玩家读过的引导版本。选择数字而不是只有真假的布尔值，是为了以后更新规则时能够再次提醒旧玩家。例如，当前规则为第1版，未来改为第2版之后，只需要比较存储值与当前版本即可。

动态属性的持久身份与行为包的头部UUID有关。更新同一作品时，应保持这个UUID稳定；如果每次修改代码都重新生成头部UUID，旧状态就不能按原身份继续访问。实体也有自己的生命周期，本例讨论的是玩家上的引导状态，而不是承诺任意被删除实体上的数据都能永久保留。

## 完整入口代码

我们先使用前面脚本包的清单结构，另行生成这一独立示例包的UUID，然后将下面的内容写入`scripts/main.js`：

```javascript
import { system, world } from "@minecraft/server";

const GUIDE_VERSION = 1;
const PROPERTY = "tutorial:guide_version";

function showGuide(player) {
    player.sendMessage("欢迎来到教程练习区！");
    player.sendMessage("请先备份世界，再尝试修改附加包中的定义。");
    player.sendMessage("手持指南针点击金块，可重新查看这份说明。");
    player.sendMessage("潜行并使用指南针点击金块，可重置阅读状态。");
    player.setDynamicProperty(PROPERTY, GUIDE_VERSION);
}

world.afterEvents.playerSpawn.subscribe((event) => {
    if (!event.initialSpawn) return;

    const player = event.player;
    if (player.getDynamicProperty(PROPERTY) !== GUIDE_VERSION) {
        showGuide(player);
    } else {
        player.sendMessage("欢迎回来！需要说明时，可用指南针点击金块。");
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    if (event.block.typeId !== "minecraft:gold_block") return;
    if (event.itemStack?.typeId !== "minecraft:compass") return;

    event.cancel = true;
    if (!event.isFirstEvent) return;

    const player = event.player;
    const resetRequested = player.isSneaking;
    system.run(() => {
        if (!player.isValid) return;

        try {
            if (resetRequested) {
                player.setDynamicProperty(PROPERTY, undefined);
                player.sendMessage("阅读状态已重置，下次进入世界时会再次显示完整说明。");
            } else {
                showGuide(player);
            }
        } catch (error) {
            console.warn(`[Tutorial] 玩家引导处理失败：${error}`);
        }
    });
});
```

我们将显示说明与写入阅读版本放入同一个`showGuide`函数。这样，无论是首次进入还是主动重读，都使用相同的文字与状态更新方式。如果以后修改指南内容，不会出现一个入口已经更新、另一个入口仍显示旧规则的问题。

第一次读取尚未设置的动态属性时，结果为`undefined`。这个值不等于`GUIDE_VERSION`，因此会进入完整说明分支。完成显示后再写入版本，后续重新连接便可以根据存档状态选择简短提醒。

## 避免把一次长按处理成多次请求

我们通过`playerInteractWithBlock`观察玩家使用物品与方块交互。这个事件可能在持续按住交互键时重复触发，所以在识别目标之后，使用`isFirstEvent`限定只处理初次按下。

这里先设置取消标志，再检查是否首次触发，是为了使整个交互过程都按本例规则处理。真正发送消息与写入属性仍然安排到`system.run`中。潜行状态则在玩家发起请求时保存下来，避免玩家在回调执行前松开按键，导致原来的“重置”请求变成“重读”。

这也是一种常用思路：在事件中提取足够描述本次请求的数据，在允许执行副作用的阶段完成操作。不要长期保存整个事件对象，也不要假定玩家在两个时刻的操作状态一定相同。

## 准备并验证玩法

在测试世界中启用行为包，准备一块金块与一个指南针。管理员可以使用以下命令准备物品，然后将金块放在方便交互的位置：

```mcfunction
/give @s minecraft:gold_block
/give @s minecraft:compass
```

我们需要完成五项验证：首次进入能够看到完整说明；退出后再次进入只看到简短提醒；死亡重生不会重新执行初次进入逻辑；普通点击金块可以重读；潜行点击后重新进入会再次显示完整说明。多人测试时，让两位玩家分别操作，确认重置一人的状态不会改变另一人。

接着，将代码中的`GUIDE_VERSION`改为`2`，完整退出并重新进入世界。先前只读过第1版说明的玩家应再次收到完整引导，而已经读取第2版的玩家再次进入后仍收到简短提醒。这个过程验证的是状态升级逻辑，不需要删除玩家数据。

## 继续扩展之前

本例没有发放物品或扣除货币，因此重复显示说明的代价很低。如果以后把同样的状态用于礼包领取，就必须进一步考虑物品栏空间、发放失败、服务器中断和写入顺序。脚本的一连串调用并不自动构成数据库事务，不能只把“读过引导”的字段改名为“领过奖励”，就认定它能够保证奖励恰好发放一次。

另一方面，动态属性也不等于随意保存任何JavaScript对象。需要保存多个字段时，可以使用多个明确命名的属性，或者对结构化数据进行序列化，并对读回的数据类型、版本和长度进行检查。对于本例这样只有一个整数版本的状态，直接保存数字更加清晰。

完成这个实例后，我们便把事件入口、延迟执行、玩家有效性和持久状态连成了一个完整流程。接下来，我们将暂时离开脚本，学习如何使用实体与命令组织另一种轻量的玩法系统。

## 参考资料

- [Entity动态属性与实体有效性接口](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/entity?view=minecraft-bedrock-stable)。
- [PlayerInteractWithBlockBeforeEvent](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/playerinteractwithblockbeforeevent?view=minecraft-bedrock-stable)。
- [BDS导出的2.0.0接口声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-bindings_2.0.0.d.ts)。
