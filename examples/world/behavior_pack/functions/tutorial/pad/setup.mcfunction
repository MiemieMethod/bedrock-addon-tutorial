scoreboard objectives add tut_visits dummy
scoreboard players set @s tut_visits 0
tag @s remove ta_on_pad
tag @s add ta_pad_player
tellraw @s {"rawtext":[{"text":"平台练习已准备好，请走上金块。"}]}
