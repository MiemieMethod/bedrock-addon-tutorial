# 自定义交易表

在本节中，我们一起来让教学向导出售旅行口粮，并收购小麦。这样，前面制作的物品便有了合成以外的获取途径。

**交易表**（**Trade Table**）描述交易需要支付什么、能够得到什么，以及一笔交易可以使用多少次。它不会独自创建交易界面，我们还需要把交易表连接到实体的交易组件中。

## 创建两笔交易

在行为包创建`trading/guide_trades.json`：

```json
{
  "tiers": [
    {
      "total_exp_required": 0,
      "groups": [
        {
          "num_to_select": 2,
          "trades": [
            {
              "wants": [
                {"item": "minecraft:emerald", "quantity": 1}
              ],
              "gives": [
                {"item": "tutorial:travel_ration", "quantity": 3}
              ],
              "max_uses": 12,
              "reward_exp": true,
              "trader_exp": 1
            },
            {
              "wants": [
                {"item": "minecraft:wheat", "quantity": 16}
              ],
              "gives": [
                {"item": "minecraft:emerald", "quantity": 1}
              ],
              "max_uses": 8,
              "reward_exp": true,
              "trader_exp": 1
            }
          ]
        }
      ]
    }
  ]
}
```

`wants`站在商人的角度描述它想要的物品，因此第一笔交易是玩家支付1个绿宝石，商人给出3份口粮。不要把它与玩家“想买什么”的方向混淆。

`tiers`组织交易等级，`groups`组织同一等级内的候选组。这里一组中有两笔交易，`num_to_select`也是2，因此两笔都被选取。若将它改成1，新生成的向导会从该组中选出一笔，而不是每次点击交易时重新随机挑一笔。

`max_uses`限制一笔报价的使用次数，`reward_exp`控制该交易是否奖励玩家经验，`trader_exp`则是商人获得的交易经验。玩家经验与商人等级进度不是同一个数值系统。

本例只使用一个等级，并将`total_exp_required`设为0。我们先把单等级交易链路做通，再考虑多级解锁，避免一开始就把报价生成、经验阈值与补货混在一起。

## 将交易表挂接到向导

打开行为包`entities/guide.json`，将下面三个组件合并到`minecraft:entity.components`中。这里展示的是组件片段，不应覆盖原来的生命值、物理等组件：

```json
{
  "minecraft:economy_trade_table": {
    "display_name": "entity.tutorial:guide.name",
    "table": "trading/guide_trades.json",
    "new_screen": true
  },
  "minecraft:behavior.trade_with_player": {
    "priority": 1
  },
  "minecraft:behavior.look_at_trading_player": {
    "priority": 2
  }
}
```

`table`填写从行为包根目录出发的路径，并包含`.json`。原版流浪商人的行为文件也通过这样的路径连接它的交易表。若在某篇组件说明里看到将路径称为“资源包路径”的文字，应结合实际原版文件位置核对；交易数据放在行为包中。

`display_name`使用前面已经定义的语言键。交易组件提供交易能力，相关AI意向则让实体在交易期间配合玩家。原来的闲逛优先级为6，因此交易行为可以优先于闲逛运行。

休息状态并不会移除这三个基础组件，所以本例向导休息时仍可交易。这是当前玩法设计。如果希望休息时关门，需要将交易能力也纳入工作组件组，并完整测试进入与离开交易界面的过程。

## 观察报价和库存

重新进入世界后，召唤一个新的教学向导。旧实体可能已经保存了报价数据，因此修改交易表后一直与原来的实体交易，未必能看到新报价。

给自己准备绿宝石和小麦：

```mcfunction
/give @s minecraft:emerald 16
/give @s minecraft:wheat 64
```

与向导交互，检查界面中是否有“1个绿宝石换3份口粮”和“16份小麦换1个绿宝石”两笔交易。完成一次后核对支付数量、输出数量和口粮本身是否可以食用。再重复同一笔交易至次数用完，观察其是否变为不可用。

我们尚未制作商人的自动补货机制。`max_uses`并不意味着等待一段时间就自动重置，`trader_exp`也不会自动赋予村民的工作站行为。需要补货时，应在后续功能中明确设计相应机制，不要仅因为外观像商人就假定它继承了所有村民规则。

## 排查交易故障

没有交易界面时，先查实体是否加载了交易组件；有界面却缺少报价时，查交易表路径、等级与候选组；某笔报价无效时，检查物品标识符是否注册。不要使用创造模式无限资源的直觉判断实际支付，最好在生存模式下用已知数量的材料验证。

## 参考资料与版本

- [Mojang流浪商人定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/entities/wandering_trader.json)及其[交易表](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/behavior_pack/trading/economy_trades/wandering_trader_trades.json)。
- [官方交易表制作教程](https://github.com/MicrosoftDocs/minecraft-creator/blob/main/creator/Documents/CreateTradeTable.md)。
- [BDS交易等级模式](https://github.com/bedrock-apis/bds-docs/blob/5c1713697a9fcf0e7491574303a742432e5ee8e2/metadata/json_schemas/client_server/entity/1.21.30/TradeTier.json)。

资料核查日期：2026-10-15。使用稳定交易组件，交易表本身不添加虚构的`minecraft:trade_table`根节点或统一格式版本号。
