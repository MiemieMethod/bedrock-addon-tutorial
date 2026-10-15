scoreboard players set @s tutorial.state 0
scoreboard players set @s tutorial.time 0
titleraw @s actionbar {"rawtext":[{"text":"已准备好下一轮"}]}
tellraw @s {"rawtext":[{"text":"比赛状态已重置，走进起点即可开始。"}]}
