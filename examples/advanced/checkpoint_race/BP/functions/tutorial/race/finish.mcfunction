scoreboard players set @s tutorial.state 2
titleraw @s actionbar {"rawtext":[{"text":"本轮已经完成"}]}
tellraw @s {"rawtext":[{"text":"本轮成绩："},{"score":{"name":"@s","objective":"tutorial.time"}},{"text":" 刻。离开起点后可重置下一轮。"}]}
