import { system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const PROPERTY = "tutorial:field_record";
const pendingPlayers = new Set();

system.beforeEvents.startup.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent(
        "tutorial:field_station",
        {
            onPlayerInteract(interaction) {
                const player = interaction.player;
                if (player) void openStation(player);
            }
        }
    );
});

function readRecord(player) {
    const stored = player.getDynamicProperty(PROPERTY);
    if (typeof stored !== "string") return undefined;

    try {
        const record = JSON.parse(stored);
        if (record === null || typeof record !== "object") return undefined;
        if (record.version !== 1 || typeof record.dimension !== "string") {
            return undefined;
        }
        if (![record.x, record.y, record.z].every(Number.isFinite)) {
            return undefined;
        }
        return record;
    } catch {
        return undefined;
    }
}

function describeRecord(record) {
    if (!record) return "还没有保存位置。";
    return `${record.dimension}：${record.x}, ${record.y}, ${record.z}`;
}

async function openStation(player) {
    const playerId = player.id;
    if (pendingPlayers.has(playerId)) return;
    pendingPlayers.add(playerId);

    try {
        const location = player.location;
        const current = {
            version: 1,
            dimension: player.dimension.id,
            x: Math.floor(location.x),
            y: Math.floor(location.y),
            z: Math.floor(location.z)
        };

        const response = await new ActionFormData()
            .title("探险记录台")
            .body(`已保存的位置：\n${describeRecord(readRecord(player))}`)
            .button("记录打开界面时的位置")
            .button("显示已保存的位置")
            .button("清除位置记录")
            .show(player);

        if (!player.isValid || response.canceled) return;

        if (response.selection === 0) {
            player.setDynamicProperty(PROPERTY, JSON.stringify(current));
            player.sendMessage(`已记录：${describeRecord(current)}`);
        } else if (response.selection === 1) {
            player.sendMessage(describeRecord(readRecord(player)));
        } else if (response.selection === 2) {
            player.setDynamicProperty(PROPERTY, undefined);
            player.sendMessage("位置记录已清除。");
        }
    } catch (error) {
        console.warn(`[Tutorial] 记录台操作未完成：${error}`);
    } finally {
        pendingPlayers.delete(playerId);
    }
}
