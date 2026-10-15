scoreboard objectives add tut_clock dummy
scoreboard players set clock tut_clock 0
tag @s add tutorial_clock_ready
tellraw @s {"rawtext":[{"text":"计时练习已启动。"}]}
