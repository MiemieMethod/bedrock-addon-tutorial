import { world } from "@minecraft/server";

console.warn("[Tutorial] 入口模块已加载。");

world.afterEvents.worldLoad.subscribe(() => {
    console.warn("[Tutorial] 世界已经就绪。");
});

world.afterEvents.playerSpawn.subscribe((event) => {
    if (!event.initialSpawn) return;
    event.player.sendMessage("欢迎来到我们的脚本练习世界！");
});
