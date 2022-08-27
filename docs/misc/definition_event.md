# 定义事件

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg" /></a>

**定义事件**（**Definition Event**）是一种可以用于实体、方块和物品的JSON定义中的事件。

## 默认值

可能性：1.0

自身过滤器合集类型：与（0）

触发器过滤器合集类型：与（0）

```cpp
enum FilterGroup::CollectionType : int {
    AND = 0x0, // 逻辑与
    OR = 0x1, // 逻辑或
    NOT = 0x2, // 逻辑非
};
```

定义事件类型：无（3）

```cpp
enum DefinitionEventType : int {
    LEAF = 0x0, // 叶节点
    SEQUENCE = 0x1, // 序列节点
    RANDOM = 0x2, // 随机节点
    NONE = 0x3, // 根节点或错误节点
};
```

## 逻辑

在较旧版本中，包括1.16.100之后的但没有那么新的版本中，定义事件是由同一套逻辑解析的，这导致在物品和方块中无法在`trigger`字段中使用实体才能用的过滤器组（见附录）`filters`，也无法使用物品和方块中常用的Molang表达式条件`condition`。虽然对触发者是否是实体或物品/方块进行特判也能解决问题，但是这也使整个逻辑越来越臃肿。在某个版本之后，定义事件和定义触发器（见附录）皆分化除了适用于实体的**活动对象定义事件**（**Actor Definition Event**）和**活动对象定义触发器**（**Actor Definition Trigger**）。以下在**模式**段落中对不同的定义事件进行了分类讨论，不过在**每个事件加载的逻辑顺序**段落中我们对整个逻辑进行了合并，就如旧版本中的那样，以便读者进行更方便的阅读。

### 模式

#### 实体

```json
actor_definition_event:0.0.0:{
    float "weight" : opt
    filter_group "filters" : opt
    array "randomize"
    {
        definition_event "<any array element>"
    }
    array "sequence"
    {
        definition_event "<any array element>"
    }
    actor_definition_trigger "trigger"
    object "add"
    {
        array "component_groups"
        {
            string "<any array element>"
        }
    }
    object "remove"
    {
        array "component_groups"
        {
            string "<any array element>"
        }
    }
}
```

```json
actor_definition_event:1.16.100:{
    float "weight" : opt
    filter_group "filters" : opt // 根节出现的该字段无效
    array "randomize"
    {
        definition_event "<any array element>"
    }
    array "sequence"
    {
        definition_event "<any array element>"
    }
    actor_definition_trigger "trigger"
    object "add"
    {
        array "component_groups"
        {
            string "<any array element>"
        }
    }
    object "remove"
    {
        array "component_groups"
        {
            string "<any array element>"
        }
    }
    actor_event_responses "<any event responce>"
}
```

```json
actor_definition_event:1.19.20:{
    float "weight" : opt
    filter_group "filters" : opt // 根节点允许出现该字段
    array "randomize"
    {
        definition_event "<any array element>"
    }
    array "sequence"
    {
        definition_event "<any array element>"
    }
    actor_definition_trigger "trigger"
    object "add"
    {
        array "component_groups"
        {
            string "<any array element>"
        }
    }
    object "remove"
    {
        array "component_groups"
        {
            string "<any array element>"
        }
    }
    actor_event_responses "<any event responce>"
}
```

#### 方块/物品

```json
definition_event:1.16.100:{
    float "weight" : opt
    expression_node "condition" : opt
    array "randomize"
    {
        definition_event "<any array element>"
    }
    array "sequence"
    {
        definition_event "<any array element>"
    }
    definition_trigger "trigger"
    item_event_responses "<any event responce>"
    block_event_responses "<any event responce>"
}
```

### 每个事件加载的逻辑顺序

事件接受的值：一个事件加载器，一个JSON值（本事件的定义JSON），一个事件调用者，一个事件响应工厂。其中事件调用者即正在执行该事件的类型，如下：

```cpp
enum TypeExecutingEvent : int {
    BLOCK = 0x0, // 方块
    ACTOR = 0x1, // 活动对象，即实体（Entity）
    ITEM = 0x2, // 物品
    NONE = 0x3, // 无或错误
}; // 注：该枚举系旧版枚举，当活动对象定义事件逻辑单独分离出去后，删去ACTOR，ITEM值更改为0x1，NONE值更改为0x2
```

先读取`weight`字段并计算、存值，取绝对值并覆盖默认的可能性值。

检测该事件的调用者，如果是活动对象（1），读取`filters`字段并存值、解析，否则（即是方块（0）或物品（2））读取`condition`字段并存值、评估。

检测是否存在`randomize`字段，如果存在，读取`randomize`字段并检测是否存在`sequence`字段，如果二者皆存在，提示内容日志错误，并忽略`sequence`字段。如果`randomize`字段不存在，检测并读取`sequence`字段。`randomize`字段或`sequence`字段是一个数组，数组中每个对象称为一个子事件，将读取到的所有子事件称为一个合集，递归加载合集中的每个子事件，而后将整个合集存入该父事件中，并将该父事件的定义事件类型更改为序列（1）或随机（2）。如果二者皆不存在，该事件的定义事件类型更改为叶节点（0），并继续执行下述逻辑。

读取`trigger`字段并按照定义触发器的常规解析方式解析该定义触发器。

检测该事件的调用者，如果是活动对象（1），读取`add`字段（若有）和`remove`字段（若有）并解析。二者格式皆为一个对象，目前内只有`component_groups`字段，用于添加或移除一个组件组。

如果事件响应工厂存在（前提之一为已打开“假日创作者功能”‘实验性玩法，目前有三种事件响应工厂，分别是活动对象、物品和方块），对该叶节点进行模式验证（schema validation）。若验证通过（即JSON结构合乎一个事件响应），执行事件响应逻辑。如果验证失败将强制将该事件的定义事件类型更改为无（3）并报内容日志错误。

## 事件响应

首先明确一点，实体（即活动对象）、物品和方块是共用事件响应的，一个事件响应不属于上述任何一种事物，只存该事物会调用哪种事件响应的逻辑，比如，`CommandResponse`（`run_command`）事件响应早期会被实体、物品和方块调用，后期出现了专门为实体调用的`ActorCommandResponse`，`CommandResponse`依旧同时为物品和方块调用，调用时他们使用的逻辑是一致的，而`ShootEventResponse`事件响应只会被物品调用。

同时还要明确一点，任何事件响应的使用都需要“假日创作者功能”‘实验性玩法。

### 事件响应列表

#### ActorCommandResponse

```json
actor_event_responses:1.16.100:
object "run_command"
{
    string "command"
    array "command"
    {
        string "<any array element>"
    }
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "item">
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，命令起点为实体本身；如果是方块，为命令起点为方块本身；如果是物品，命令起点为持有该物品的实体 |
| `other`    | 如果当前实体的有对立实体，命令起点为该对立实体，否则无意义   |
| `player`   | 如果当前实体是玩家，命令起点为该玩家，否则无意义             |
| `target`   | 如果当前实体有攻击目标，命令起点为该目标，否则无意义         |
| `parent`   | 如果当前实体有父实体，命令起点为该父实体，否则无意义         |
| `baby`     | 如果当前实体有子实体，命令起点为该子实体，否则无意义         |
| `block`    | 如果当前实体有正在交互的方块或触发事件者是方块，命令起点为该方块，否则无意义 |
| `damager`  | N/A                                                          |
| `holder`   | N/A                                                          |
| `item`     | 如果当前实体手持物品或当前物品/方块所对应的物品被有效实体手持，命令起点为该实体，否则无意义 |

以`target`为起点执行一条或多条命令。

#### SetPropertyResponse

```json
actor_event_responses:1.16.100:
object "set_property"
{
    expression_node "[a-zA-Z0-9_.:-]+"
}
```

设置实体的一个属性，接受一般值或Molang表达式。

#### CommandResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "run_command"
{
    string "command"
    array "command"
    {
        string "<any array element>"
    }
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "item">
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，命令起点为实体本身；如果是方块，为命令起点为方块本身；如果是物品，命令起点为持有该物品的实体 |
| `other`    | 如果当前实体的有对立实体，命令起点为该对立实体，否则无意义   |
| `player`   | 如果当前实体是玩家，命令起点为该玩家，否则无意义             |
| `target`   | 如果当前实体有攻击目标，命令起点为该目标，否则无意义         |
| `parent`   | 如果当前实体有父实体，命令起点为该父实体，否则无意义         |
| `baby`     | 如果当前实体有子实体，命令起点为该子实体，否则无意义         |
| `block`    | 如果当前实体有正在交互的方块或触发事件者是方块，命令起点为该方块，否则无意义 |
| `damager`  | N/A                                                          |
| `holder`   | N/A                                                          |
| `item`     | 如果当前实体手持物品或当前物品/方块所对应的物品被有效实体手持，命令起点为该实体，否则无意义 |

以`target`为起点执行一条或多条命令。

#### DecrementStackEventResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "decrement_stack"
{
    bool "ignore_game_mode"
}
```

物品堆叠减少1。

#### DamageResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "damage"
{
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "holder", "item">
    enumerated_value "type"<"none", "override", "contact", "entity_attack", "projectile", "suffocation", "fall", "fire", "fire_tick", "lava", "drowning", "block_explosion", "entity_explosion", "void", "suicide", "magic", "wither", "starve", "anvil", "thorns", "falling_block", "piston", "fly_into_wall", "magma", "fireworks", "lightning", "charging", "temperature", "freezing", "stalactite", "stalagmite">
    int "amount"
    int "mob_amount"
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，对自己造成伤害；如果是物品，对自己造成损坏；如果是方块，无意义 |
| `other`    | 如果当前实体的有对立实体，对该实体造成伤害，否则无意义       |
| `player`   | 如果有玩家在上下文中，对该玩家造成伤害，否则无意义           |
| `target`   | 如果当前实体有攻击目标，对该实体造成伤害，否则无意义         |
| `parent`   | 如果当前实体有父实体，对该实体造成伤害，否则无意义           |
| `baby`     | 如果当前实体有子实体，对该实体造成伤害，否则无意义           |
| `block`    | N/A                                                          |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，对该实体造成伤害，否则无意义 |
| `item`     | 如果触发事件者是方块，对该方块所对应的物品造成损坏，否则无意义 |

对`target`造成`type`类型的`amount`点带有击退的伤害或损坏。特别地，当对物品造成损坏时，`type`字段不表示任何意义，可以为任意字符串。当对实体造成伤害时，如果`type`为`fire`，会额外地点燃实体。

#### DieEventResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "die"
{
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "holder">
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，致其死亡；如果是物品，致该物品的持有者死亡；如果是方块，破坏该方块并产生掉落物 |
| `other`    | 如果当前实体的有对立实体，致其死亡，否则无意义               |
| `player`   | 如果有玩家在上下文中，致其死亡，否则无意义                   |
| `target`   | 如果当前实体有攻击目标，致其死亡，否则无意义                 |
| `parent`   | 如果当前实体有父实体，致其死亡，否则无意义                   |
| `baby`     | 如果当前实体有子实体，致其死亡，否则无意义                   |
| `block`    | 如果触发事件者是方块，破坏该方块并产生掉落物，否则无意义     |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，致其死亡，否则无意义 |
| `item`     | N/A                                                          |

致实体死亡或方块掉落。

#### MobEffectResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "add_mob_effect"
{
    string "effect"
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "holder">
    float "duration" // 单位为秒
    int "amplifier"
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，给予该实体状态效果；如果是物品，给予该物品的持有者状态效果；如果是方块，给予该方块对应的物品的持有者状态效果 |
| `other`    | 如果当前实体的有对立实体，给予其状态效果，否则无意义         |
| `player`   | 如果有玩家在上下文中，给予其状态效果，否则无意义             |
| `target`   | 如果当前实体有攻击目标，给予其状态效果，否则无意义           |
| `parent`   | 如果当前实体有父实体，给予其状态效果，否则无意义             |
| `baby`     | 如果当前实体有子实体，给予其状态效果，否则无意义             |
| `block`    | N/A                                                          |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，给予其状态效果，否则无意义 |
| `item`     | N/A                                                          |

给予一个状态效果。

#### RemoveMobEffectResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "remove_mob_effect"
{
    enumerated_value "effect"<"all">
    string "effect"
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "holder">
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，移除该实体的状态效果；如果是物品，移除该物品的持有者的状态效果；如果是方块，移除该方块对应的物品的持有者的状态效果 |
| `other`    | 如果当前实体的有对立实体，移除其状态效果，否则无意义         |
| `player`   | 如果有玩家在上下文中，移除其状态效果，否则无意义             |
| `target`   | 如果当前实体有攻击目标，移除其状态效果，否则无意义           |
| `parent`   | 如果当前实体有父实体，移除其状态效果，否则无意义             |
| `baby`     | 如果当前实体有子实体，移除其状态效果，否则无意义             |
| `block`    | N/A                                                          |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，移除其状态效果，否则无意义 |
| `item`     | N/A                                                          |

移除一个或全部状态效果。

#### ParticleEffectResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "play_effect"
{
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "holder">
    int "data"
    string "effect"
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，在该实体处播放粒子效果；如果是物品，在该物品的持有者处播放粒子效果；如果是方块，在该方块处播放粒子效果 |
| `other`    | 如果当前实体的有对立实体，在该实体处播放粒子效果，否则无意义 |
| `player`   | 如果有玩家在上下文中，在该玩家处播放粒子效果，否则无意义     |
| `target`   | 如果当前实体有攻击目标，在该实体处播放粒子效果，否则无意义   |
| `parent`   | 如果当前实体有父实体，在该实体处播放粒子效果，否则无意义     |
| `baby`     | 如果当前实体有子实体，在该实体处播放粒子效果，否则无意义     |
| `block`    | 如果有方块在上下文中，在该方块处播放粒子效果，否则无意义     |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，在该实体处播放粒子效果，否则无意义 |
| `item`     | N/A                                                          |

在一个位置带有数据值播放一个旧版粒子。

#### PlaySoundResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "play_sound"
{
    int "sound"
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "holder">
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，在该实体处广播声音效果；如果是物品，在该物品的持有者处广播声音效果；如果是方块，在该方块处广播声音效果 |
| `other`    | 如果当前实体的有对立实体，在该实体处广播声音效果，否则无意义 |
| `player`   | 如果有玩家在上下文中，在该玩家处广播声音效果，否则无意义     |
| `target`   | 如果当前实体有攻击目标，在该实体处广播声音效果，否则无意义   |
| `parent`   | 如果当前实体有父实体，在该实体处广播声音效果，否则无意义     |
| `baby`     | 如果当前实体有子实体，在该实体处广播声音效果，否则无意义     |
| `block`    | 如果有方块在上下文中，在该方块处广播声音效果，否则无意义     |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，在该实体处广播声音效果，否则无意义 |
| `item`     | N/A                                                          |

在一个位置广播一个存档声音事件。

#### SetBlockProperty

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "set_property"
{
    expression_node "[a-zA-Z0-9_.:-]+"
}
```

设置方块的一个属性，接受一般值或Molang表达式。

#### ShootEventResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "shoot"
{
    string "projectile"
    enumerated_value "target"<"self", "other", "target", "parent", "baby">
    float "launch_power"
    expression_node "launch_power"
    float "angle_offset" // 目前仅解析，无实用
    expression_node "angle_offset" // 目前仅解析，无实用
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，在该实体的武器挂接点（2）处以该实体的X旋转角、该实体的Y旋转角或该实体的骑手的Y旋转角为偏角生成并发射弹射物；如果是物品，在该物品的持有者处发射弹射物；如果是方块，在该方块所对应的物品的持有者处发射弹射物 |
| `other`    | 如果当前实体的有对立实体，如果该实体的AABB的中心与当前实体的距离大于或等于0.000099999997，在当前实体的武器挂接点（2）处朝向该对立实体生成并发射弹射物，否则无意义 |
| `player`   | N/A                                                          |
| `target`   | 如果当前实体有攻击目标，与`other`相同的逻辑朝向该实体生成并发射弹射物，否则无意义 |
| `parent`   | 如果当前实体有父实体，与`other`相同的逻辑朝向该实体生成并发射弹射物，否则无意义 |
| `baby`     | 如果当前实体有子实体，与`other`相同的逻辑朝向该实体生成并发射弹射物，否则无意义 |
| `block`    | N/A                                                          |
| `damager`  | N/A                                                          |
| `holder`   | N/A                                                          |
| `item`     | N/A                                                          |

```cpp
enum ActorLocation : int {
    Feet = 0x0,
    Body = 0x1,
    WeaponAttachPoint = 0x2,
    Head = 0x3,
    DropAttachPoint = 0x4,
    ExplosionPoint = 0x5,
    Eyes = 0x6,
    BreathingPoint = 0x7,
    Mouth = 0x8,
};
```

发射一个弹射物，弹射物的发射角度如上所示，初始威力为对应实体的`minecraft:projectile`组件的`power`字段的值乘以此处的`launch_power`字段的值，不确定性为对应实体的`minecraft:projectile`组件的`uncertainty_base`字段的值减去该实体所在存档的难度乘以组件`uncertainty_multiplier`字段的值，基速度为零向量，弹射物无特定攻击目标，无伤害拥有者。

#### SwingEventResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "swing"
{
}
```

使持有该物品的实体播放摆臂动画。

#### TeleportResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "teleport"
{
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "holder">
    vec3 "max_range"
    vec3 "destination"
    bool "land_on_block"
    bool "avoid_water"
}
```

| 接口字符串 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| `self`     | 如果触发事件者是实体，传送该实体；如果是物品，传送该物品的持有者；如果是方块，传送该方块对应的物品的持有者 |
| `other`    | 如果当前实体的有对立实体，传送该实体，否则无意义             |
| `player`   | 如果有玩家在上下文中，传送该实体，否则无意义                 |
| `target`   | 如果当前实体有攻击目标，传送该实体，否则无意义               |
| `parent`   | 如果当前实体有父实体，传送该实体，否则无意义                 |
| `baby`     | 如果当前实体有子实体，传送该实体，否则无意义                 |
| `block`    | N/A                                                          |
| `damager`  | N/A                                                          |
| `holder`   | 如果当前物品或方块所对应的物品被有效实体手持，传送该实体，否则无意义 |
| `item`     | N/A                                                          |

传送一个实体。

#### TransformItemResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "transform_item"
{
    string "transform"
}
```

将物品转化为另一个物品。

#### SetBlock

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "set_block"
{
    string "block_type"
}
```

在当前方块处设置方块类型。

#### SetBlockAtPos

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "set_block_at_pos"
{
    string "block_type"
    vec3 "block_offset"
}
```

在相对于当前方块的偏移位置处设置方块类型。

#### SpawnLootEventResponse

```json
item_event_responses:1.16.100:
block_event_responses:1.16.100:
object "spawn_loot"
{
    string "table"
}
```

在存档中以0.0幸运值无作用实体无玩家无伤害来源的模式从战利品表中抽取物品并掉落在该方块处。

### 事件响应工厂

| 事件响应类名                  | 活动对象 | 物品 | 方块 |
| ----------------------------- | -------- | ---- | ---- |
| `ActorCommandResponse`        | 是       | 否   | 否   |
| `SetPropertyResponse`         | 是       | 否   | 否   |
| `CommandResponse`             | 否       | 是   | 是   |
| `DecrementStackEventResponse` | 否       | 是   | 是   |
| `DamageResponse`              | 否       | 是   | 是   |
| `DieEventResponse`            | 否       | 是   | 是   |
| `MobEffectResponse`           | 否       | 是   | 是   |
| `RemoveMobEffectResponse`     | 否       | 是   | 是   |
| `ParticleEffectResponse`      | 否       | 是   | 是   |
| `PlaySoundResponse`           | 否       | 是   | 是   |
| `SetBlockProperty`            | 否       | 是   | 是   |
| `ShootEventResponse`          | 否       | 是   | 否   |
| `SwingEventResponse`          | 否       | 是   | 是   |
| `TeleportResponse`            | 否       | 是   | 是   |
| `TransformItemResponse`       | 否       | 是   | 是   |
| `SetBlock`                    | 否       | 否   | 是   |
| `SetBlockAtPos`               | 否       | 否   | 是   |
| `SpawnLootEventResponse`      | 否       | 否   | 是   |

# 附录：定义触发器

**定义触发器**（**Definition Trigger**）是一种可以用于实体、方块和物品的JSON定义中的触发器。

## 逻辑

定义触发器分为适用于物品和方块的普通定义触发器和适用于实体的活动对象定义触发器。

### 模式

#### 实体

```json
actor_definition_trigger:0.0.0:
string // 在特定情况下引擎逻辑将允许直接传入一个事件名，比如定义事件中便允许传入
object
{
    string "event"
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "damager", "holder", "item">
    filter_group "filters"
}
```

#### 方块/物品

```json
definition_trigger:1.16.100:
string // 在特定情况下引擎逻辑将允许直接传入一个事件名，比如定义事件中便允许传入
object
{
    string "event"
    enumerated_value "target"<"self", "other", "player", "target", "parent", "baby", "block", "damager", "holder", "item">
}
```

# 附录：过滤器组

**过滤器组**（**Filter Group**）指实体中需要条件的位置传入的过滤器集合，一个过滤器组中可以有一个或多个过滤器。

## 逻辑

每个过滤器组都可以有子过滤器组或一个过滤器组成。过滤器的合集类型默认由执行该过滤器的组件、事件响应或触发器提供，比如所有的定义事件中执行的过滤器以及定义事件中的`trigger`触发器和事件响应中执行的过滤器的默认合集类型都为“与”（AND，0）。

### 模式

#### 实体

```json
filter_group:0.0.0:
array
{
    filter_group "<any array element>" // 子过滤器组的合集类型继承父级
}
object
{
    string "test" // 检测到该字段会被视为叶节点，过滤器组的末级
    enumerated_value "subject"<"self", "other", "player", "target", "parent", "block", "damager">
    enumerated_value "operator"<"equals", "not", "=", "==", "<>", "!=", ">", "<", ">=", "<=">
    string "domain"
    bool "value"
    int "value"
    float "value"
    string "value"
}
object
{
    filter_group "all_of" // 对于父级合集类型为AND的，将子过滤器组中的过滤器添加到父级中，不视为子级，其它情况下新建一个子过滤器组，该子组的合集类型设置为AND并视为父级的子级
    filter_group "all" // 逻辑同上
    filter_group "AND" // 逻辑同上
    filter_group "any_of" // 对于父级合集类型为OR的，将子过滤器组中的过滤器添加到父级中，不视为子级，其它情况下新建一个子过滤器组，该子组的合集类型设置为OR并视为父级的子级
    filter_group "any" // 逻辑同上
    filter_group "OR" // 逻辑同上
    filter_group "none_of" // 对于父级合集类型为NOT的，将子过滤器组中的过滤器添加到父级中，不视为子级，其它情况下新建一个子过滤器组，该子组的合集类型设置为NOT并视为父级的子级。【注意】该逻辑会导致（在父子级关系上）连续的两个或任意多个NOT逻辑会被视为只有一个NOT，该逻辑是有问题的，待Mojang修复；如欲连续使用两个NOT，请在二者之间添加一个占位的AND或OR
    filter_group "NOT" // 逻辑同上
    string "<any legacy filter>"
    string "<environment legacy subfilter predicate>:<environment legacy subfilter params>"
    bool "<any legacy filter>"
    int "<any legacy filter>"
    float "<any legacy filter>"
    array "<any legacy filter>"
    {
        string "<any array element>"
        bool "<any array element>"
        int "<any array element>"
        float "<any array element>"
    }
}
```

```cpp
enum FilterParamType : int {
    Bool = 0x0, // 布尔值
    Int = 0x1, // 整数值
    Float = 0x2, // 浮点数值
    String = 0x3, // 字符串枚举
};
```

#### 生物群系

```json
biome_filter_group:1.12.0:
filter_group
```

#### 注意事项

在源码层面中，以下这种格式的结构中，如果父级（示例中为`top`）的合集类型为OR，会自动在该父级下新建一个合计类型为AND的子过滤器组，并将该结构视为该合集类型为AND的子组的结构进行解析。

```json
"top": {
    "all_of": { /* ... */ },
    "none_of": { /* ... */ }
}
```

简言之，父级如果是OR的情况下，如果父级被解析为一个对象，而且对该象中没有`test`字段（即不是叶节点），而且该对象中的字段数目不止1个（严格大于1），那么在该父级下会先新建一个AND合集类型的子组，将该对象视为该子组的内容来解析。如果该父级解析为一个数组，则不受任何影响；如果该父级是AND或NOT，也不受此影响。上述格式等价转换成下述格式后，将会正常按照OR的逻辑进行解析：

```json
"top": [
    {
        "all_of": { /* ... */ }
    },
    {
        "none_of": { /* ... */ }
    }
]
```

该逻辑保证了所有非叶节点的表现为对象的节点的逻辑都是AND或NOT（一般可来说，如果是根节点，可以肯定为AND，因为根节点的合集类型是由组件、事件响应或触发器来提供的，一般不会提供NOT的根节点逻辑）。表现为数组的逻辑则需要根据父级来确定。

#### 你知道吗

过滤器组的顶级（根节点）在解析时无论其事实上来源于哪个字段，其字段名都会被认为是`top`，但是这个字段名事实上在解析时是没有任何作用的。
