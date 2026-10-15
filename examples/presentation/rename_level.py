"""Read a Bedrock level.dat copy, or write a new copy with a different LevelName.

This example does not edit LevelDB, replace the source, or change levelname.txt.
Requires the version pinned in requirements-nbt.txt. See primer/sec13.2.md.
"""
from __future__ import annotations

import argparse
from io import BytesIO
from pathlib import Path
import struct

import nbtlib


def decode_level(raw: bytes) -> tuple[int, nbtlib.File]:
    """Validate the Bedrock header and read named, little-endian NBT."""
    if len(raw) < 8:
        raise ValueError("文件不足8字节，无法读取level.dat文件头")
    storage_version, payload_size = struct.unpack("<II", raw[:8])
    if payload_size != len(raw) - 8:
        raise ValueError("文件头声明的长度与实际NBT负载不一致")
    stream = BytesIO(raw[8:])
    root = nbtlib.File.parse(stream, byteorder="little")
    if stream.tell() != payload_size:
        raise ValueError("NBT末尾存在未解析数据")
    if not isinstance(root.get("LevelName"), nbtlib.String):
        raise ValueError("根复合标签中没有预期的LevelName字符串")
    return storage_version, root


def renamed_bytes(raw: bytes, name: str) -> bytes:
    """Change one typed field and preserve the header's storage version."""
    storage_version, root = decode_level(raw)
    if len(name.encode("utf-8")) > 65535:
        raise ValueError("名称超出NBT字符串的长度范围")
    root["LevelName"] = nbtlib.String(name)
    stream = BytesIO()
    root.write(stream, byteorder="little")
    payload = stream.getvalue()
    result = struct.pack("<II", storage_version, len(payload)) + payload
    _, reread = decode_level(result)
    if reread.snbt() != root.snbt():
        raise ValueError("重新读取输出时发现标签内容不一致")
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="离线世界副本中的level.dat")
    parser.add_argument("--name", help="新的世界名称；省略时只读取")
    parser.add_argument("--output", type=Path, help="必须是尚不存在的新文件")
    args = parser.parse_args()
    if (args.name is None) != (args.output is None):
        parser.error("--name与--output必须同时提供")
    if args.output and args.output.resolve() == args.source.resolve():
        parser.error("输出不能指向输入文件")
    try:
        raw = args.source.read_bytes()
        storage_version, root = decode_level(raw)
        print(f"存储版本：{storage_version}")
        print(f"当前名称：{root['LevelName']}")
        if args.output is not None:
            result = renamed_bytes(raw, args.name)
            with args.output.open("xb") as output:
                output.write(result)
            print(f"已生成新文件：{args.output}")
            print("原文件未替换。请先检查输出，再在离线副本中测试。")
    except Exception as error:
        parser.exit(1, f"处理失败：{error}\n")


if __name__ == "__main__":
    main()
