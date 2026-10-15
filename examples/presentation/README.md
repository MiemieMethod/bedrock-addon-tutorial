# 界面、外观与分发示例

这些文本示例对应入门教程第10至14章。它们经静态语法检查；客户端画面、世界加载及多人分发仍需在目标游戏中验证。

| 路径 | 对应章节 | 使用条件 |
| --- | --- | --- |
| `pbr_resource_pack` | 10.3 | 完整文本资源包，需支持Vibrant Visuals的客户端和图形模式 |
| `hud_resource_pack` | 11.1 | 完整文本资源包，依赖目标版本仍使用原版 `hud.root_panel` |
| `form_behavior_pack` | 11.2 | 完整脚本行为包，声明 `@minecraft/server` 与 `@minecraft/server-ui` 2.0.0 |
| `skin_pack_template` | 12.1 | 只有元数据，需补入自有皮肤PNG |
| `rename_level.py` | 13.2 | 离线NBT实验工具，只写新输出文件，需安装NBT库 |
| `world_template_metadata` | 13.3 | 只有元数据，需结合真实导出的世界 |

各目录的UUID用于本教程实验。创建自己的独立作品时重新生成；更新同一作品时保留身份并递增版本。

## NBT实验

在独立Python环境中安装 `requirements-nbt.txt` 中固定的库版本。先对完整世界进行离线备份，再操作副本：

```sh
python -m pip install -r examples/presentation/requirements-nbt.txt
python examples/presentation/rename_level.py world_copy/level.dat
python examples/presentation/rename_level.py world_copy/level.dat --name "附加包实验世界" --output world_copy/level.renamed.dat
python examples/presentation/rename_level.py world_copy/level.renamed.dat
```

工具不会自动替换 `level.dat`，也不会修改 `levelname.txt`。确认输出标签正确后，按教程在离线副本中进行替换及客户端验证。
