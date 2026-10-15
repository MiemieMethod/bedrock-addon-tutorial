# 高级教程配套示例

这些示例对应`docs/advanced/sec1.1.md`至`sec3.1.md`。它们是彼此独立的教学包，请按章节启用，不要把所有文件复制到同一个行为包中。脚本示例固定使用`@minecraft/server` `2.0.0`，探险记录台另使用`@minecraft/server-ui` `2.0.0`；清单的最低引擎版本为`1.21.90`。这是接口与文件格式的基线，不是对任意后续游戏版本完成过实测的声明。

## 目录与运行方法

| 目录 | 对应章节 | 启用内容 | 观察目标 |
| --- | --- | --- | --- |
| `script_basics` | 当前Script API | `BP` | 日志中出现加载信息，玩家初次生成时出现欢迎信息 |
| `block_guard` | 事件回调 | `BP` | 主世界指定展示区的绿宝石块不能被玩家破坏 |
| `player_guide` | 玩家引导 | `BP` | 进入、重读、重置、重新连接后保留正确阅读版本 |
| `gametest` | GameTest | 按该目录说明自行准备测试包 | 正确条件通过，故意错误条件失败 |
| `checkpoint_race` | 哑实体、命令循环与计时赛 | `BP`和`RP` | 按文档放置起终点后，玩家分别计时并能重置 |
| `hud_coordinates` | JSON UI绑定 | `RP` | 开启坐标后出现第二份坐标，关闭后同时隐藏 |
| `field_station` | 综合实例 | `BP`和`RP` | 与记录台交互，保存、查看和清除自己的位置 |

把相应`BP`或`RP`目录作为一个包安装至目标平台支持的开发包位置。目录名可以改为便于识别的名称，但`manifest.json`应位于包的根目录。启用内容日志后，完整进入测试世界。涉及命令的布置与调试需要相应权限；稳定脚本示例不要求为了脚本本身开启Beta APIs。

`checkpoint_race`首次使用时执行`/function tutorial/race/setup`，随后按照章节召唤并标记起终点。两个记分板目标应只创建一次。重新比赛使用`/function tutorial/race/reset`，无需重新安装。移除地图锚点使用它自己的`tutorial:remove`事件，并确保选择器限定到需要移除的实体。

`field_station`使用`/give @s tutorial:field_station`获取方块。它借用原版金块纹理，记录的是打开界面时玩家脚部位置向下取整后的方块坐标；不会传送玩家，也不会记录其他玩家的数据。

## 检查范围

生成时对JSON进行了语法解析，并使用官方npm包中的`@minecraft/server@2.0.0`和`@minecraft/server-ui@2.0.0`类型声明检查四个稳定脚本入口；GameTest调用另外按BDS导出的`1.0.0-beta`声明检查。静态检查不能验证世界加载、实体渲染、游戏命令执行或实际UI布局。这些仍须在所选客户端或BDS版本中按每节的验收步骤完成。

JSON UI样例依赖客户端原版HUD中的`root_panel`、`#player_position_text`和`#player_position_visible`，不是稳定Script API的一部分。若目标版本改变HUD结构，应先对照同版本原版资源包，再决定如何调整。其他包也可能使用动作栏或修改HUD，兼容性需要单独检查。

## 重现脚本静态检查

本次检查使用Node.js `24.19.0`、TypeScript `7.0.2`、`@minecraft/server` `2.0.0`和`@minecraft/server-ui` `2.0.0`。实际解析的辅助类型依赖为`@minecraft/common` `1.3.0`和`@minecraft/vanilla-data` `1.26.52`。后者只是此次类型检查环境中的依赖，不代表示例把最低游戏版本改成了`1.26.52`，也没有被打包进游戏脚本。

参与稳定接口检查的入口是：

- `examples/advanced/script_basics/BP/scripts/main.js`
- `examples/advanced/block_guard/BP/scripts/main.js`
- `examples/advanced/player_guide/BP/scripts/main.js`
- `examples/advanced/field_station/BP/scripts/main.js`

我们可以在仓库根目录使用下面的Bash命令，在独立临时目录重现检查。为防止依赖升级改变结果，这里把本次实际安装的版本全部写明。命令只复制待检查脚本到临时目录，不将`node_modules`写入仓库。

```bash
repo_dir="$PWD"
check_dir="$(mktemp -d)"
npm install --prefix "$check_dir" --save-exact --ignore-scripts --no-audit --no-fund \
  typescript@7.0.2 @minecraft/server@2.0.0 @minecraft/server-ui@2.0.0 \
  @minecraft/common@1.3.0 @minecraft/vanilla-data@1.26.52

for example in script_basics block_guard player_guide field_station; do
  mkdir -p "$check_dir/cases/$example"
  cp "$repo_dir/examples/advanced/$example/BP/scripts/main.js" \
    "$check_dir/cases/$example/main.js"
done

cat > "$check_dir/tsconfig.json" <<'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "checkJs": true,
    "allowJs": true,
    "noEmit": true,
    "skipLibCheck": true,
    "strict": false
  },
  "include": ["cases/**/*.js"]
}
JSON

"$check_dir/node_modules/.bin/tsc" -p "$check_dir/tsconfig.json"
```

这与本次运行采用相同的编译选项。它是对JavaScript可推断类型与调用方式的检查，未启用严格模式，并跳过依赖声明文件内部的检查；不能把通过结果解释为所有参数都获得了完整类型约束，更不能代替游戏运行。命令成功时退出码为0，通常没有额外输出。

### 另外检查GameTest调用

本次GameTest检查使用的并非从npm随意安装的最新版，而是`bedrock-apis/bds-docs`的`stable`分支中`types/@minecraft/server-gametest_1.0.0-beta.d.ts`当时的实际内容，文件blob为`36b7273e74516cfb1079353fb7ab5c43b2947508`。为避免后续分支变化影响复现，可以按该blob取回同一份声明。

在保持上面`repo_dir`和`check_dir`变量的同一终端中执行：

```bash
python3 - "$check_dir" <<'PY'
import base64
import hashlib
import json
from pathlib import Path
import sys
import urllib.request

check_dir = Path(sys.argv[1])
blob_sha = "36b7273e74516cfb1079353fb7ab5c43b2947508"
url = f"https://api.github.com/repos/bedrock-apis/bds-docs/git/blobs/{blob_sha}"
with urllib.request.urlopen(url) as response:
    blob = json.load(response)
declaration = base64.b64decode(blob["content"])
git_object = b"blob " + str(len(declaration)).encode("ascii") + b"\0" + declaration
if hashlib.sha1(git_object).hexdigest() != blob_sha:
    raise RuntimeError("GameTest声明的blob校验失败")

module_dir = check_dir / "node_modules/@minecraft/server-gametest"
module_dir.mkdir(parents=True, exist_ok=True)
(module_dir / "index.d.ts").write_bytes(declaration)
(module_dir / "package.json").write_text(json.dumps({
    "name": "@minecraft/server-gametest",
    "version": "1.0.0-beta",
    "types": "index.d.ts"
}), encoding="utf-8")
PY

mkdir -p "$check_dir/cases/gametest"
cp "$repo_dir/examples/advanced/gametest/block_check.js" \
  "$check_dir/cases/gametest/main.js"
"$check_dir/node_modules/.bin/tsc" -p "$check_dir/tsconfig.json"
```

临时模块只有类型声明，没有GameTest运行实现；实际运行仍由游戏提供。第二次命令同时检查前述四个稳定入口及`block_check.js`，不能据此认定实验模块已经能在某个特定客户端中加载。完成后可以删除自己创建的临时目录；无需把它复制到行为包或提交进仓库。

## 参考基线

- [官方稳定脚本模块参考](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/minecraft-server?view=minecraft-bedrock-stable)。
- [BDS稳定分支的Server 2.0.0导出声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-bindings_2.0.0.d.ts)。
- [BDS稳定分支的Server UI 2.0.0导出声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-ui-bindings_2.0.0.d.ts)。
- [Mojang原版资源和行为样例](https://github.com/Mojang/bedrock-samples/tree/main)与[Preview分支](https://github.com/Mojang/bedrock-samples/tree/preview)。

开发独立作品时请重新生成包与模块UUID。更新同一作品时则保持头部UUID稳定，尤其不要为了更新文字而意外切换动态属性的存储身份。
