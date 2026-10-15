# 基于Script API事件回调修改游戏

现在，我们已经认识了普通脚本与GameTest的关系。接下来，我们回到玩法开发，尝试完成一个展示区规则：玩家能够正常破坏其他方块，但不能破坏展示区中的绿宝石块；当玩家尝试破坏时，还会收到一条提示。

这个例子使用`@minecraft/server`的`2.0.0`稳定API。它不需要运行GameTest，相关回调由世界中的实际游戏事件触发。完整脚本位于`examples/advanced/block_guard/BP`。

## 事件发生前与发生后

我们先设想一下，如果等到绿宝石块已经被破坏，再把它放回原位，会发生什么？方块也许看起来恢复了，但掉落物、工具耐久或周围方块的更新可能已经发生。仅仅补回一个方块，不一定能恢复全部结果。

因此，当前脚本API将一部分事件分成**前置事件**（**Before Event**）和**后置事件**（**After Event**）。前置事件在相关行为完成之前提供处理机会，其中某些事件允许通过`cancel`取消行为；后置事件用于得知行为已经发生，并执行记录、统计和反馈等后续逻辑。

它们不是任意替换的两个写法。我们要取消玩家破坏方块，就应先查看`world.beforeEvents.playerBreakBlock`；如果只是统计成功破坏的方块，则可以查看`world.afterEvents.playerBreakBlock`。并非每种前置事件都具有相同字段，也不是所有游戏行为都有对应的可取消事件。

## 编写一个范围明确的保护规则

我们在主世界设置一个演示区域：方块的X、Z坐标分别位于`-8`至`8`，Y坐标位于`60`至`80`。只有该区域中的绿宝石块受到本节规则保护。创建与上一节相同结构的脚本行为包，将入口替换为：

```javascript
import { system, world } from "@minecraft/server";

function isProtected(block) {
    const { x, y, z } = block.location;
    return block.dimension.id === "minecraft:overworld"
        && block.typeId === "minecraft:emerald_block"
        && x >= -8 && x <= 8
        && y >= 60 && y <= 80
        && z >= -8 && z <= 8;
}

function onBeforeBreak(event) {
    if (!isProtected(event.block)) return;

    event.cancel = true;
    const player = event.player;
    system.run(() => {
        if (!player.isValid) return;
        player.sendMessage("这是展示区的绿宝石块，请保留它。");
    });
}

function onAfterBreak(event) {
    console.warn(`[Tutorial] ${event.player.name}破坏了一个方块。`);
}

world.beforeEvents.playerBreakBlock.subscribe(onBeforeBreak);
world.afterEvents.playerBreakBlock.subscribe(onAfterBreak);
```

我们先把“是否受到保护”提取成`isProtected`函数。这使规则本身与事件处理分开：如果以后需要扩大展示区，只修改坐标条件即可，不必到回调中寻找多处相同数字。

这里同时检查了维度。不同维度中可能存在相同坐标，仅仅判断X、Y、Z并不能唯一确定一个世界位置。方块类型使用完整标识符`minecraft:emerald_block`，也避免了把显示名称与标识符混为一谈。

## 为什么将提示延后执行？

在前置事件中，我们立即设置`event.cancel = true`。这个设置必须发生在本次事件允许处理的阶段内。如果把取消操作也放入`system.run`，等回调执行时再修改旧事件对象，就已经错过取消这次破坏的机会了。

另一方面，前置事件通常处于受限的执行环境，很多改变世界或向玩家执行操作的接口不能直接调用。我们将提示安排到`system.run`中，在后续允许执行的阶段进行。不要笼统地把它理解为“精确延迟1刻”；调度发生的具体时机与当前执行阶段有关。

延后执行时，玩家可能已经离开。因此，我们先检查`player.isValid`。在2.0.0接口中，这是一个布尔属性，写作`player.isValid`，不是旧写法中的函数调用`player.isValid()`。检查对象是否仍有效是处理异步操作与延迟回调时的基本习惯；对于更复杂的延迟操作，还应处理接口可能抛出的异常。

## 订阅与取消订阅

上面的两个回调都使用具名函数。这不仅方便阅读，也使我们可以在系统确实需要停用时，向`unsubscribe`传入原来的函数引用：

```javascript
world.beforeEvents.playerBreakBlock.unsubscribe(onBeforeBreak);
world.afterEvents.playerBreakBlock.unsubscribe(onAfterBreak);
```

这两行是停用示例，不要直接放在前面的订阅语句后，否则保护会马上被取消。一个始终启用的简单附加包可以保持订阅；一个具有启停状态的子系统，则应保存自己注册的回调，并在停用时对应清理。

还需要注意，新写出的一条箭头函数不是原来的回调引用。即使两条函数中的代码完全一样，也不能用后创建的函数替代先前注册的函数去取消订阅。同样，不应在每次玩家进入时重复注册一个全局方块事件监听，否则多人连接之后，单次操作就可能得到多份提示。

## 在游戏中验证事件边界

我们可以在测试世界中依次进行以下操作：

1. 在主世界的演示范围内放置绿宝石块，以生存模式尝试破坏。预期方块保留，并收到提示。
2. 在同一区域破坏普通石头。预期正常破坏，后置事件打印日志。
3. 在区域外放置绿宝石块并破坏。预期不受保护。
4. 换到另一维度的相同坐标测试。预期不套用主世界展示区规则。

这些测试分别检查方块类型、坐标、维度和取消时机。若只有第一项通过，还不能说明规则范围正确。

本例只处理“玩家破坏方块”这一入口。爆炸、活塞、其他脚本与管理员命令可能经过不同的处理路径。因此，它是一个事件边界清晰的教学规则，不是覆盖一切修改方式的领地保护系统。继续扩展时，应先列出希望拦截的行为，再为每条行为寻找相应机制。

下一节中，我们会将事件回调与存档状态结合起来，制作一个不会在每次重生时重复欢迎的玩家引导功能。

## 参考资料

- [WorldBeforeEvents](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/worldbeforeevents?view=minecraft-bedrock-stable)与[WorldAfterEvents](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/worldafterevents?view=minecraft-bedrock-stable)。
- [官方调度接口指南](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/system-run-guide?view=minecraft-bedrock-stable)。
- [BDS导出的2.0.0接口声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-bindings_2.0.0.d.ts)。
