scoreboard players add @a tutorial.state 0
scoreboard players add @a tutorial.time 0
execute as @a[scores={tutorial.state=0}] at @s if entity @e[type=tutorial:anchor,tag=tutorial:start,r=2] run function tutorial/race/start
scoreboard players add @a[scores={tutorial.state=1}] tutorial.time 1
execute as @a[scores={tutorial.state=1}] at @s if entity @e[type=tutorial:anchor,tag=tutorial:finish,r=2] run function tutorial/race/finish
execute as @a[scores={tutorial.state=1}] run titleraw @s actionbar {"rawtext":[{"text":"计时："},{"score":{"name":"@s","objective":"tutorial.time"}},{"text":" 刻"}]}
