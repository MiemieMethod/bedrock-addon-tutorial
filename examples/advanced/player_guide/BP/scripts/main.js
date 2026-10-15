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
