# 物品/方块数据驱动升级版本控制

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg" /></a>

## item

`format_version`不支持`[1, 16, 100]`的写法

```json
item:1.16.100:{
    string "format_version"
    itemSchema "minecraft:item"
    {
        item_components "components"
        {
            
        }
    }
}
```

## block

`format_version`不支持`[1, 16, 100]`的写法

```json
block:1.16.100:{
    string "format_version"
    blockSchema "minecraft:item"
    {
        block_components "components"
        {
            
        }
        block_permutation "permutations"
        {
            object "<any array element>"
            {
                block_components "components"
                {
                    
                }
            }
        }
    }
}
```

## minecraft:durability 1.18 item

### 先前模式 1.16.100..1.17.99

```json
minecraft:durability "minecraft:durability"
{
    int "max_durability" : opt
    int "max_damage" : opt
    int_range "damage_chance" : opt
}
```

```json
int_range:
    int
    array[2]
    {
        int "<any array element>"
    }
    object
    {
        int "range_min"
        int "range_max"
    }
```

### 升级成为 1.18.0..

`max_damage`被解析为`max_durability`。

```json
minecraft:durability "minecraft:durability"
{
    int "max_durability" : opt
    int_range "damage_chance" : opt
}
```

## minecraft:food 1.18 item

### 先前模式 1.16.100..1.17.99

```json
minecraft:food "minecraft:food"
{
    int "nutrition" : opt
    bool "can_always_eat" : opt
    enumerated_value "saturation_modifier"<"poor","low","normal","good","max","supernatural","high"> : opt
    item_descriptor "using_converts_to" : opt
    trigger "on_consume" : opt
}
```

```json
item_descriptor:
    string
    object
    {
        string "item"
        expression_node "tags"
    }
```


```json
trigger:
    string
    object
    {
        string "event"
        enumerated_value "target"<"self","other","player","target","parent","baby","block","damager","holder","item">
        expression_node "condition"
    }
```

### 升级成为 1.18.0..

将字符串格式的饱和度修饰符全部解析为数字，并删去字符串格式。（`high`等价于`normal`）

```json
minecraft:food "minecraft:food"
{
    int "nutrition" : opt
    bool "can_always_eat" : opt
    float "saturation_modifier" : opt
    item_descriptor "using_converts_to" : opt
    trigger "on_consume" : opt
}
```

## minecraft:repairable 1.18 item

### 先前模式 1.16.100..1.17.99

```json
minecraft:repairable "minecraft:repairable"
{
    array "repair_items" : opt
    {
        repair_item_entry "<any array element>"
        string "<any array element>"
    }
    trigger "on_repaired" : opt
}
```

```json
repair_item_entry:
object
    {
        array "items"
        {
            item_descriptor "<any array element>"
        }
        expression_node "repair_amount"
    }
```

### 升级成为 1.18.0..

删去`repair_items`的字符串数组格式。

```json
minecraft:repairable "minecraft:repairable"
{
    array "repair_items" : opt
    {
        repair_item_entry "<any array element>"
    }
    trigger "on_repaired" : opt
}
```

## description 1.19.40 block

### 先前模式 1.16.100..1.19.39

```json
blockDescription "description"
{
    object "menu_category"
    {
        LocIdString "group"
        enumerated_value "category"<"all","construction","nature","equipment","items","commands", "none">
    }
}
```

### 升级成为 1.19.40..



```json
blockDescription "description"
{
    object "menu_category"
    {
        LocIdString "group"
        enumerated_value "category"<"all","construction","nature","equipment","items","commands">
        bool "is_hidden_in_commands"
    }
}
```

## minecraft:loot 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
loot "minecraft:loot":
IdentifierString
object
{
    IdentifierString "loot_table"
}
```

### 升级成为 1.19.10..

用`loot_table`的值替换整个对象。

```json
loot "minecraft:loot":
IdentifierString
```

## minecraft:flammable 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
flammable "minecraft:flammable"
{
    int "flame_odds"<0-*>
    int "burn_odds"<0-*>
}
```

### 升级成为 1.19.10..

用`catch_chance_modifier`的值替换`flame_odds`，用`destroy_chance_modifier`的值替换`burn_odds`。

```json
flammable "minecraft:flammable"
{
    int "catch_chance_modifier"<0-*>
    int "destroy_chance_modifier"<0-*>
}
```

## minecraft:pick_collision 1.18 block

### 先前模式 1.16.100..1.17.99

```json
block_aim_collision "minecraft:pick_collision"
bool
object
{
    bool "enabled"
    vec3 "size"
    vec3 "origin"
}
```

```json
vec3:
array[3]
{
    float "<any array element>"
}
```

### 升级成为 1.18.0..1.19.9

重命名为`minecraft:aim_collision`

```json
block_aim_collision "minecraft:aim_collision"
bool
object
{
    bool "enabled"
    vec3 "size"
    vec3 "origin"
}
```

## minecraft:aim_collision 1.19.10 block

### 先前模式 1.18.0..1.19.9

```json
block_aim_collision "minecraft:aim_collision"
bool
object
{
    bool "enabled"
    vec3 "size"
    vec3 "origin"
}
```

### 升级成为 1.19.10..

如果存在`enabled`，用`enabled`的值替换整个对象。

```json
block_aim_collision "minecraft:aim_collision"
bool
object
{
    vec3 "size"
    vec3 "origin"
}
```

## minecraft:aim_collision 1.19.20 block

### 先前模式 1.19.10..1.19.19

```json
block_aim_collision "minecraft:aim_collision"
bool
object
{
    vec3 "size"
    vec3 "origin"
}
```

### 升级成为 1.19.20..

重命名为`minecraft:selection_box`。

```json
selection_box "minecraft:selection_box"
bool
object
{
    vec3 "size"
    vec3 "origin"
}
```

## minecraft:entity_collision 1.18 block

### 先前模式 1.16.100..1.17.99

```json
block_collision "minecraft:entity_collision"
bool
object
{
    bool "enabled"
    vec3 "size"
    vec3 "origin"
}
```

### 升级成为 1.18.0..1.19.9

重命名为`minecraft:block_collision`

```json
block_collision "minecraft:block_collision"
bool
object
{
    bool "enabled"
    vec3 "size"
    vec3 "origin"
}
```

## minecraft:block_collision 1.19.10 block

### 先前模式 1.18.0..1.19.9

```json
block_collision "minecraft:block_collision"
bool
object
{
    bool "enabled"
    vec3 "size"
    vec3 "origin"
}
```

### 升级成为 1.19.10..

如果存在`enabled`，用`enabled`的值替换整个对象，并重命名为`minecraft:collision_box`。

```json
block_collision "minecraft:collision_box"
bool
object
{
    vec3 "size"
    vec3 "origin"
}
```

## minecraft:breathability 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_breathability "minecraft:breathability":
enumerated_value<"solid", "air">
object
{
    enumerated_value "breathing_type"<"solid", "air">
}
```

### 升级成为 1.19.10..

用`breathing_type`的值替换整个对象。

```json
block_breathability "minecraft:breathability":
enumerated_value<"solid", "air">
```

## minecraft:creative_category 1.19.20 block

### 先前模式 1.16.100..1.19.19

```json
creativeGroup "minecraft:creative_category":
object
{
    LocIdString "group"
    enumerated_value "category"<"all","construction","nature","equipment","items","commands", "none">
}
```

### 升级成为 1.19.20..

删除整个对象，并将`group`和`category`的值赋给方块描述组件下的`menu_category`下的`group`和`category`。

```json
blockDescription "description"
{
    object "menu_category"
    {
        LocIdString "group"
        enumerated_value "category"<"all","construction","nature","equipment","items","commands", "none">
    }
}
```

## minecraft:destroy_time 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_destroy_time "minecraft:destroy_time":
float<0.0-*>
object
{
    float "destroy_time"<0.0-*>
}
```

### 升级成为 1.19.10..

用`destroy_time`的值替换整个对象。

```json
block_destroy_time "minecraft:destroy_time":
float<0.0-*>
```

## minecraft:destroy_time 1.19.20 block

### 先前模式 1.19.10..1.19.19

```json
block_destroy_time "minecraft:destroy_time":
float<0.0-*>
```

### 升级成为 1.19.20..

用整个对象的值替换`seconds_to_destroy`字段，重命名为`minecraft:destructible_by_mining`。

```json
block_destructible_by_mining "minecraft:destructible_by_mining":
bool
object
{
    float "seconds_to_destroy"<0.0-*>
}
```

## minecraft:explosion_resistance 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
minecraft:explosion_resistance "minecraft:explosion_resistance":
float<0.0-*>
object
{
    float "resistance"<0.0-*>
}
```

### 升级成为 1.19.10..

用`resistance`的值替换整个对象。

```json
minecraft:explosion_resistance "minecraft:explosion_resistance":
float<0.0-*>
```

## minecraft:explosion_resistance 1.19.20 block

### 先前模式 1.19.10..1.19.19

```json
minecraft:explosion_resistance "minecraft:explosion_resistance":
float<0.0-*>
```

### 升级成为 1.19.20..

用整个对象的值替换`explosion_resistance`字段，重命名为`minecraft:destructible_by_explosion`。

```json
block_destructible_by_explosion "minecraft:destructible_by_explosion":
bool
object
{
    float "explosion_resistance"<0.0-*>
}
```

## minecraft:display_name 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_display_name "minecraft:display_name":
LocIdString
object
{
    LocIdString "display_name"
}
```

### 升级成为 1.19.10..

用`display_name`的值替换整个对象。

```json
block_display_name "minecraft:display_name":
LocIdString
```

## minecraft:display_name 1.19.20 block

### 先前模式 1.19.10..1.19.19

```json
block_display_name "minecraft:display_name":
LocIdString
```

### 升级成为 1.19.20..

将对象的值代入`tile.%s.name`后赋给自己。

```json
block_display_name "minecraft:display_name":
LocIdString
```

## minecraft:friction 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_friction "minecraft:friction"
float<0.1000000014901161-1.0>
object
{
    float "friction"<0.1000000014901161-1.0>
}
```

### 升级成为 1.19.10..

用`friction`的值替换整个对象。

```json
block_friction "minecraft:friction"
float<0.1000000014901161-1.0>
```

## minecraft:friction 1.19.20 block

### 先前模式 1.19.10..1.19.20

```json
block_friction "minecraft:friction"
float<0.1000000014901161-1.0>
```

### 升级成为 1.19.20..

取用1减的差。

```json
block_friction "minecraft:friction"
float<0.0-0.8999999761581421>
```

## minecraft:geometry 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_geometry "minecraft:geometry"
IdentifierString
object
{
    IdentifierString "geometry"
}
```

### 升级成为 1.19.10..

用`geometry`的值替换整个对象。

```json
block_geometry "minecraft:geometry"
IdentifierString
```

## minecraft:block_light_absorption 1.18 block

### 先前模式 1.16.100..1.17.99

```json
block_light_filter "minecraft:block_light_absorption"
int<0-16>
{
    int "filter_level"<0-16>
}
```

### 升级成为 1.18.0..1.19.9

更改`filter_level`的值，重命名组件。

```json
block_light_filter "minecraft:block_light_filter"
brightness
{
    brightness "filter_level"
}
```

```json
brightness:
int<0-15>
```

## minecraft:block_light_filter 1.19.10 block

### 先前模式 1.18.0..1.19.9

```json
block_light_filter "minecraft:block_light_filter"
brightness
{
    brightness "filter_level"
}
```

### 升级成为 1.19.10..

用`filter_level`的值替换整个对象。

```json
block_light_filter "minecraft:block_light_filter"
brightness
```

## minecraft:block_light_filter 1.19.40 block

### 先前模式 1.19.10..1.19.39

```json
block_light_filter "minecraft:block_light_filter"
brightness
```

### 升级成为 1.19.40..

重命名对象。

```json
light_dampening "minecraft:light_dampening"
brightness
```

## minecraft:block_light_emission 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_light_emission "minecraft:block_light_emission"
float<0.0-1.0>
{
    float "emission"<0.0-1.0>
}
```

### 升级成为 1.19.10..

用`emission`的值替换整个对象。

```json
block_light_emission "minecraft:block_light_emission"
float<0.0-1.0>
```

## minecraft:map_color 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
block_map_color "minecraft:map_color"
Color255RGB
{
    Color255RGB "map_color"
}
```

```json
Color255RGB:
string<^#[a-fA-F0-9]{6}$>
array<3>
{
    int "<any array element>"<0-255>
}
```

### 升级成为 1.19.10..

用`map_color`的值替换整个对象。

```json
block_map_color "minecraft:map_color"
Color255RGB
```

## minecraft:part_visibility 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
part_visibility "minecraft:part_visibility"
{
    object "rules"
    {
        expression_node "<identifier>"
    }
}
```

### 升级成为 1.19.10..

将`rules`重命名为`conditions`。

```json
part_visibility "minecraft:part_visibility"
{
    object "conditions"
    {
        expression_node "<identifier>"
    }
}
```

## minecraft:ticking 1.19.10 block

### 先前模式 1.16.100..1.19.9

```json
queued_ticking "minecraft:ticking"
{
    trigger "on_tick"
    array "range"[2]
    {
        float "<any array element>"
    }
    bool "looping"
}
```

### 升级成为 1.19.10..

将`range`从以秒为单位变为以刻为单位，然后重命名为`interval_range`，并添加数字限制。

```json
queued_ticking "minecraft:ticking"
{
    trigger "on_tick"
    array "interval_range"[2]
    {
        float "<any array element>"<0.0-*>
    }
    bool "looping"
}
```

## minecraft:crafting_table 1.18.0 block

### 先前模式 1.16.100..1.17.99

```json
crafting_table "minecraft:crafting_table"
{
    string "custom_description"
    array "crafting_tags"[64]
    {
        string "<any array element>"
    }
    int "grid_size"<3>
}
```

### 升级成为 1.18.0..1.19.9

删除`grid_size`。

```json
crafting_table "minecraft:crafting_table"
{
    string "custom_description"
    array "crafting_tags"[64]
    {
        string "<any array element>"
    }
}
```

## minecraft:crafting_table 1.19.10 block

### 先前模式 1.18.0..1.19.9

```json
crafting_table "minecraft:crafting_table"
{
    string "custom_description"
    array "crafting_tags"[64]
    {
        string "<any array element>"
    }
}
```

### 升级成为 1.19.10..

将`custom_description`重命名为`table_name`。

```json
crafting_table "minecraft:crafting_table"
{
    string "table_name"
    array "crafting_tags"[64]
    {
        string "<any array element>"
    }
}
```
