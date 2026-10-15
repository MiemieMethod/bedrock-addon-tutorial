# 实例：联动自定义方块、脚本与表单制作探险记录台

在前面的章节中，我们分别学习了数据驱动的方块、脚本回调、玩家状态和界面。现在，我们来制作一个将它们组合起来的作品：**探险记录台**。玩家与记录台交互后，可以选择保存当前位置、查看已保存的位置，或清除记录。每位玩家拥有自己的记录，退出世界后也可以继续查看。

我们先把目标限制为“记录位置”。本例不直接传送玩家，因此无需把一个已过时的位置当作必定安全的落脚点。这样可以集中观察数据文件如何把交互交给脚本，脚本又如何把选择交给玩家。

## 准备版本与文件

完整示例位于`examples/advanced/field_station`。一起启用其中的`BP`和`RP`，行为包使用`1.21.90`方块格式，并声明`@minecraft/server` `2.0.0`与`@minecraft/server-ui` `2.0.0`稳定模块依赖。这里使用自定义组件V2的扁平写法，不能原样放进仍使用旧自定义组件注册流程的项目。

`BP`中包含方块、掉落表、脚本入口与清单；`RP`中包含名称翻译与清单。示例方块借用原版金块纹理，使用内置完整方块几何体，避免让贴图制作掩盖本节需要理解的联动关系。示例并未在每个目标平台实际运行，正式使用前需要完成本节末尾的验收。

## 在方块上声明自定义组件

行为包的`blocks/field_station.json`内容如下：

```json
{
  "format_version": "1.21.90",
  "minecraft:block": {
    "description": {
      "identifier": "tutorial:field_station",
      "menu_category": {"category": "construction"}
    },
    "components": {
      "minecraft:geometry": "minecraft:geometry.full_block",
      "minecraft:material_instances": {
        "*": {"texture": "gold_block", "render_method": "opaque"}
      },
      "minecraft:destructible_by_mining": {"seconds_to_destroy": 1.5},
      "minecraft:destructible_by_explosion": {"explosion_resistance": 6},
      "minecraft:loot": "loot_tables/blocks/field_station.json",
      "tutorial:field_station": {}
    }
  }
}
```

最后的`tutorial:field_station`是我们即将在脚本中注册的**自定义组件**（**Custom Component**）。它在这里没有额外参数，仅仅说明这个方块需要使用对应的交互回调。标识符必须与脚本注册时完全一致，包括命名空间与下划线。

请注意，方块标识符与自定义组件标识符可以相同，但它们属于不同用途。前者表示“这是什么方块”，后者表示“将哪些脚本回调附着在方块上”。以后若有几种不同外观的记录台，可以让它们共同使用同一个组件。

## 注册交互入口

我们在脚本入口中导入所需模块，并在启动事件中注册组件：

```javascript
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
```

组件需要在方块定义被使用之前注册，因此这里使用`system.beforeEvents.startup`。我们在此只登记回调，不读取世界中的方块和玩家。实际交互发生时，引擎再调用`onPlayerInteract`，并把相关信息传进来。

`interaction.player`在类型声明中是可选值，所以需要检查后再打开界面。不要因为人工测试中每次都是玩家点击，就忽略接口本身允许为空的情况。

## 保存一份有版本的位置记录

我们希望一次记录同时包含维度和坐标，可以把它编码成JSON字符串保存在玩家动态属性中。为了避免未来升级时读错数据，还加入一个版本字段。下面两个函数负责读取和显示：

```javascript
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
```

这里不能只检查字符串能否被解析。比如`null`、数组或缺少坐标的对象都可能是语法正确的JSON，却不是我们约定的有效记录。我们要检查版本和字段类型，才能安心地将读回的数据用于后续逻辑。

本例只保存一份很小的记录，尚未涉及大型数据库。若以后保存长路线，应额外限制点数、字符串长度，并设计迁移与清理策略。

## 处理表单结果

接下来补全同一文件中的`openStation`函数：

```javascript
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
```

`show`返回一个Promise，所以玩家选择结果并不会在调用的同一瞬间得到。我们使用`await`等待结果，再检查玩家是否仍有效以及是否取消。按钮序号从0开始，与添加按钮的顺序对应。

`pendingPlayers`防止同一玩家在已有表单尚未结束时重复打开。当表单返回成功或取消结果，或者等待过程抛出异常后，程序离开`try`块时会通过`finally`移除本次等待标记。需要注意，Promise仍处于待决状态时，`await`后面的代码和`finally`尚未执行；这段代码没有额外设置超时，也不承诺一个一直没有完成的表单会自动解除等待。这个集合只是临时交互状态，关闭世界后不需要保留；真正的位置记录则存入玩家动态属性。

我们在打开表单前保存当前位置快照，所以按钮明确写成“记录打开界面时的位置”。若等到玩家作出选择才读取位置，玩家在等待期间发生移动或被传送时，最终记录就可能不是他原本想保存的位置。界面措辞应与实际行为一致。

## 在游戏中完成验收

完整退出并重新进入启用了两个示例包的测试世界，使用`/give @s tutorial:field_station`获得记录台并放置。空手与它交互，先选择记录，再次交互选择显示，确认维度和坐标正确。随后退出世界重新进入，验证记录仍然存在，再执行清除并确认显示“还没有保存位置”。

多人测试时，让两位玩家在不同位置记录，确认彼此不会覆盖。还应测试直接关闭表单、快速连续交互、打开其他界面时尝试交互，以及表单打开后玩家离开世界。预期这些情况不会造成无限重试，也不会永久锁住交互入口。

修改自定义组件注册和方块JSON后，应完整重新进入世界，不能仅依赖脚本热重载判断结果。如果方块存在却没有交互效果，先查看组件是否注册成功；如果界面出现而按钮无效，再检查结果分支及内容日志。这样便能按“数据定义—回调入口—表单结果—状态写入”逐层定位问题。

至此，一个由方块提供入口、脚本处理逻辑、表单收集选择、动态属性保存结果的作品便形成了。后续扩展可以增加记录名称或多个地点，但应继续保持数据格式、界面措辞和服务端规则相互一致。

## 参考资料

- [官方自定义组件说明](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/custom-components?view=minecraft-bedrock-stable)。
- [BlockComponentPlayerInteractEvent](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockcomponentplayerinteractevent?view=minecraft-bedrock-stable)与[ActionFormData](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/actionformdata?view=minecraft-bedrock-stable)。
- [BDS导出的Server 2.0.0声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-bindings_2.0.0.d.ts)与[Server UI 2.0.0声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-ui-bindings_2.0.0.d.ts)。这些声明用于核对接口，并不意味着需要导入带`-bindings`后缀的模块。
