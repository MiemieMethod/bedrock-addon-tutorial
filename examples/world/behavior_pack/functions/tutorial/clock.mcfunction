scoreboard players add clock tut_clock 1
execute if score clock tut_clock matches 20.. run function tutorial/second
execute if score clock tut_clock matches 20.. run scoreboard players set clock tut_clock 0
