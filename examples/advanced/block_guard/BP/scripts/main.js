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
