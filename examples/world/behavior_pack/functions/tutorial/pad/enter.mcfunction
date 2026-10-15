tag @s add ta_on_pad
scoreboard players add @s tut_visits 1
tellraw @s {"rawtext":[{"text":"这是你第"},{"score":{"name":"@s","objective":"tut_visits"}},{"text":"次进入平台。"}]}
particle tutorial:spark ~ ~1 ~
