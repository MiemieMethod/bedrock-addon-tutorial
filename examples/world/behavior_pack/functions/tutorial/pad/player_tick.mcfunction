execute if block ~ ~-1 ~ minecraft:gold_block unless entity @s[tag=ta_on_pad] run function tutorial/pad/enter
execute unless block ~ ~-1 ~ minecraft:gold_block run tag @s remove ta_on_pad
