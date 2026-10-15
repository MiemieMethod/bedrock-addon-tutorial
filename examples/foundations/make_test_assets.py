"""生成教程前3章使用的确定性测试资产；只需Python标准库。"""

from pathlib import Path
import math
import struct
import wave
import zlib


ROOT = Path(__file__).resolve().parent


def write_png(path, pixels):
    height = len(pixels)
    width = len(pixels[0])

    def chunk(kind, payload):
        data = kind + payload
        return struct.pack(">I", len(payload)) + data + struct.pack(">I", zlib.crc32(data))

    rows = b"".join(b"\x00" + bytes(channel for pixel in row for channel in pixel) for row in pixels)
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(rows))
    png += chunk(b"IEND", b"")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(png)


def write_tone(path):
    rate = 22050
    duration = 0.22
    samples = []
    for index in range(int(rate * duration)):
        time = index / rate
        envelope = min(time / 0.01, 1.0) * max(0.0, 1.0 - time / duration)
        value = int(32767 * 0.18 * envelope * math.sin(2 * math.pi * 660 * time))
        samples.append(struct.pack("<h", value))
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as stream:
        stream.setnchannels(1)
        stream.setsampwidth(2)
        stream.setframerate(rate)
        stream.writeframes(b"".join(samples))


def main():
    checker = [[(230, 63, 154, 255) if (x // 4 + y // 4) % 2 else (32, 179, 200, 255)
                for x in range(16)] for y in range(16)]
    write_png(ROOT / "Tutorial_RP/textures/blocks/dirt.png", checker)

    # 标准64×64皮肤布局中的基本层；外层保持透明。
    skin = [[(0, 0, 0, 0) for _ in range(64)] for _ in range(64)]
    regions = [
        (0, 0, 32, 16, (239, 204, 164, 255)),
        (16, 16, 40, 32, (35, 142, 190, 255)),
        (40, 16, 56, 32, (40, 152, 190, 255)),
        (0, 16, 16, 32, (35, 51, 100, 255)),
        (16, 48, 32, 64, (35, 51, 100, 255)),
        (32, 48, 48, 64, (40, 152, 190, 255)),
        (32, 20, 40, 32, (25, 80, 120, 255)),
        (10, 10, 12, 12, (20, 30, 40, 255)),
        (14, 10, 16, 12, (20, 30, 40, 255)),
    ]
    for x0, y0, x1, y1, color in regions:
        for y in range(y0, y1):
            for x in range(x0, x1):
                skin[y][x] = color
    write_png(ROOT / "Tutorial_Skins/student.png", skin)
    write_tone(ROOT / "Tutorial_RP/sounds/random/chestopen.wav")
    write_tone(ROOT / "Tutorial_RP/sounds/tutorial/foundations/bell.wav")


if __name__ == "__main__":
    main()
