# 修改存档中的NBT

编辑地形时，我们看到的是方块与实体；关闭世界后，这些信息则由存档文件保存。某些设置可以在游戏界面中修改，另一些内容需要专门的工具查看。在本节中，我们将认识**命名二进制标签**（**Named Binary Tag**，**NBT**），并通过一个范围明确的实验，修改副本中保存的世界名称。

## NBT与JSON有什么不同

NBT可以表达复合对象、列表、字符串和多种数值类型，因此在结构上有些像我们熟悉的JSON。但是，NBT不仅保存值，也明确保存类型。一个字节整数、一个32位整数和一个64位整数，即使数值都为1，也不是同一种标签。

此外，NBT通常以二进制形式存储。某些编辑器将它显示为树状结构，或显示为**字符串化NBT**（**SNBT**），只是为了方便人阅读。不能将JSON文本直接保存成`level.dat`，也不能因为文件中偶尔出现可读文字，就用文本编辑器替换其中的字节。

## 基岩版存档需要单独识别

基岩版的`level.dat`使用带有文件头的小端NBT。前8个字节由两个32位小端整数构成，后面的内容才是NBT负载。第二个整数表示负载长度。修改字符串后，负载长度可能变化，因此保存时也需要同步更新文件头。

与之不同，区块等大量世界数据位于`db`目录中的LevelDB数据库。数据库包含多个互相关联的文件，并不是“一块区域对应一个可以直接替换的JSON”。`level.dat`编辑器也不等于完整的区块数据库编辑器。

还有一种容易混淆的格式是网络使用的NBT编码。支持“小端NBT”的工具未必同时支持网络变长整数形式，反之亦然。选择工具时，应确认它支持的是基岩版离线`level.dat`，而不只是笼统写着“支持NBT”。

## 准备离线副本

先正常保存退出世界；如果世界由BDS运行，则先正常停止服务器，再复制整个世界目录。我们在副本中操作，原始目录保持可供恢复的完整状态。不要只复制正在被写入的几份`.ldb`文件，以免得到不一致的数据库。

实际更改世界名称时，游戏内的重命名功能通常已经足够。本节选择名称作为实验，是因为它容易观察、也容易核对，适合帮助我们理解二进制数据的读取和保存，而不是因为所有名称修改都应绕过游戏界面。

## 使用带类型的NBT库处理数据

下面的核心示例使用Python的`nbtlib`。该库提供小端解析与写入能力，但不会替我们自动处理基岩版`level.dat`前面的8字节文件头。因此，程序需要分别处理文件头和NBT负载。

```python
from io import BytesIO
from pathlib import Path
import struct
import nbtlib

source = Path("world_copy/level.dat")
target = Path("world_copy/level.renamed.dat")
raw = source.read_bytes()
if len(raw) < 8:
    raise ValueError("文件不足8字节，无法读取level.dat文件头")

storage_version, payload_size = struct.unpack("<II", raw[:8])
if payload_size != len(raw) - 8:
    raise ValueError("文件头声明的长度与实际负载不一致")

stream = BytesIO(raw[8:])
root = nbtlib.File.parse(stream, byteorder="little")
if stream.tell() != payload_size:
    raise ValueError("NBT末尾存在未解析数据")
if not isinstance(root.get("LevelName"), nbtlib.String):
    raise ValueError("未找到预期的LevelName字符串标签")

root["LevelName"] = nbtlib.String("附加包实验世界")
output = BytesIO()
root.write(output, byteorder="little")
payload = output.getvalue()
with target.open("xb") as file:
    file.write(struct.pack("<II", storage_version, len(payload)))
    file.write(payload)
```

`<II`表示两个32位无符号小端整数。我们保留原始文件头的版本值，只更新长度。新的名称显式包装为`nbtlib.String`，从而保留正确的标签类型。`xb`模式则拒绝覆盖已存在的输出文件，使实验不会在不知情时替换前一次结果。

运行前需要在独立Python环境中安装`nbtlib==2.0.4`；本节根据库提供的`File.parse`和`File.write`接口编写，并在该版本上完成了合成NBT数据的读写检查。完整的命令行版本位于`examples/presentation/rename_level.py`，支持先查看、再写出新文件。安装成功与脚本语法正确都不等于真实世界已经兼容，仍需下面的验证。

## 验证后再替换副本

先用同一程序读取输出文件，确认名称和文件头长度都正确。再比较修改前后的标签树：除`LevelName`外，其他标签的值与类型都应保留。序列化后的二进制排列可能变化，因此仅凭“文件字节不同”无法判断内容是否错误。

确认后，在离线副本中保留原`level.dat`的备份，再将输出文件替换为副本的`level.dat`。世界目录中的`levelname.txt`也可能参与名称显示；应在副本中使其与名称保持一致。重新进入这个副本，检查名称、出生位置、物品栏与关键场景，再正常保存退出。

如果文件解析失败，应停止该次修改，先核实文件类型、头部、字节序和库版本。不要通过删除报错字段、截短文件或把所有数字转成普通JSON数值来“修复”数据。尤其是64位整数，经过不保留整数精度的工具后可能发生不可逆变化。

## 不应通过改标签完成的事情

删除实验标记不能保证一个已使用实验功能的世界恢复为正式版兼容；改写版本标签也不会完成区块格式转换。联机身份、行为包依赖和实体状态之间同样存在关联。只有理解字段用途并具有验证方法之后，才适合进行对应修改。

内部导出数据有助于研究结构，但不能代替保存格式规范，也不能证明每个内部字段都是受支持的编辑入口。本教程不会根据一个字段名称猜测它在所有客户端中的语义。

## 适用范围与参考

本节限定为离线副本中的`level.dat`标签实验，不直接修改LevelDB区块数据库。代码未声称已通过用户真实存档的加载测试。

- [官方：导出世界的文件组成](https://learn.microsoft.com/en-us/minecraft/creator/documents/createaworldtemplate?view=minecraft-bedrock-stable)
- [NBT库作者：小端格式与level.dat文件头](https://github.com/aternosorg/php-nbt#bedrock-edition-leveldat)
- [nbtlib作者：支持的格式与使用方式](https://github.com/vberlier/nbtlib)
- [nbtlib：文件解析及写入实现](https://github.com/vberlier/nbtlib/blob/main/nbtlib/nbt.py)
- [本教程的资料版本与验证边界](../misc/source_guide.md)
