# 认识JSON UI

当我们为玩法添加提示、菜单或状态显示时，便会接触到**用户界面**（**User Interface**，**UI**）。基岩版的一部分界面通过JSON文件描述控件及其关系，我们通常称之为**JSON UI**。在本节中，我们将从一个固定的HUD标签入手，认识它的文件结构，并分清界面外观与游戏逻辑之间的关系。

## 控件如何组成界面

**控件**（**Control**）是界面的基本组成部分。例如，标签显示文字，图像显示纹理，面板负责组织子控件。一个面板中还可以包含其他面板，因此界面往往具有树状结构。

我们可以把“任务名称、任务说明和确认按钮”放在同一个面板中。当面板移动时，这些子控件就可以一起调整位置。这与把模型的多个骨骼组织为父子关系有相似之处，不过这里处理的是二维界面布局。

每个JSON UI文件通常通过`namespace`指定命名空间。文件中定义的控件可以用`命名空间.控件名`引用。注意，这里的点号引用规则与物品标识符中的冒号规则不同，不能混写。

## 定义一个标签

先准备一个普通资源包。在其中创建`ui/tutorial_hud.json`：

```json
{
  "namespace": "tutorial_hud",
  "status_label": {
    "type": "label",
    "text": "附加包实验世界",
    "color": [1.0, 1.0, 1.0],
    "shadow": true,
    "anchor_from": "top_middle",
    "anchor_to": "top_middle",
    "offset": [0, 16],
    "size": [180, 14],
    "layer": 20
  }
}
```

`type`说明这是标签，`text`给出固定文字。两个锚点使标签与父控件的顶部中央对齐，再由`offset`向下移动。这里的界面坐标会受到GUI缩放等设置影响，不能简单理解为所有设备上的物理屏幕像素。

仅仅定义控件，并不会让它自动显示。正如模型需要被实体引用一样，我们还要将标签挂到正在使用的界面中。

在`ui/_ui_defs.json`中登记新增文件：

```json
{
  "ui_defs": [
    "ui/tutorial_hud.json"
  ]
}
```

然后在资源包中创建`ui/hud_screen.json`，对原版HUD的`root_panel`进行局部修改：

```json
{
  "namespace": "hud",
  "root_panel": {
    "modifications": [
      {
        "array_name": "controls",
        "operation": "insert_back",
        "value": [
          {
            "tutorial_status@tutorial_hud.status_label": {}
          }
        ]
      }
    ]
  }
}
```

`@`左侧是这一次引用所使用的名称，右侧是被引用控件的完整名称。这里将标签追加到原版根面板的控件数组，而不是复制几千行原版文件重新维护。我们读取的正式版样本中存在`hud.root_panel`；未来若原版结构变化，仍然需要重新检查修改目标。

## 进入世界观察

将资源包用于测试世界，进入游戏后检查屏幕顶部。预期结果是出现固定文字，同时原版快捷栏、生命值和其他HUD内容继续存在。如果原版控件大面积消失，应当首先检查是否错误地覆盖了整个`controls`数组，或把原版文件替换成了不完整结构。

接下来，我们分别改变GUI缩放、窗口宽高比和安全区域设置，检查标签是否被裁切，以及是否遮挡原版提示。如果一个标签只在作者的全屏窗口中显示正确，它还不能算完成了界面适配。

Mojang样本中还能看到以`$`开头的变量和以`#`开头的绑定名称。变量用于界面配置或表达式，**绑定**（**Binding**）则将界面与游戏提供的数据连接起来。绑定名不是随意填写就会产生数据的变量；引擎必须实际提供相应数据源。

## 外观与逻辑的边界

固定标签只能证明界面资源成功加载。如果我们再画一个“领取奖励”按钮，也不会因此自动产生发放物品的逻辑。JSON UI中已有的按钮映射通常依赖引擎或既有屏幕提供的处理入口，普通资源包不能通过猜测一个按钮名称来注册任意服务端函数。

对于玩法中的选项菜单，可以优先使用脚本API提供的表单。它能够把玩家选择传回脚本，便于进行状态检查和结果处理。下一节将介绍这种公开入口与Ore UI之间的区别。

同样，网易开发工作台中的界面工程文件、Python界面API与国际版公开脚本API并不相同。我们可以沿用控件、布局和交互的设计思想，却不能把中国版的创建屏幕方法原样复制进国际版。

## 兼容性与排错

若标签完全不显示，依次检查资源包激活状态、`_ui_defs.json`中的路径、命名空间拼写，以及原版目标控件是否仍然存在。查看内容日志比不断更换`layer`数值更有效；层级只能解决遮挡，不能修复未加载的文件。

JSON UI修改会与其他修改相同界面的包产生冲突。官方的协作式附加包指南明确提醒，JSON UI和字体资源不具备良好的多包组合能力。因此，本实验适合独立界面资源包或受控地图，不应默认加入一个承诺与任意附加包共同工作的通用行为包。

## 适用范围与参考

本例基于Mojang正式版样本`1.26.50.4`中的HUD结构。JSON UI属于对客户端界面实现的修改，实际效果需要在目标客户端检查；文件存在也不代表每个平台都正在使用对应屏幕。

- [Mojang：原版HUD结构](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/resource_pack/ui/hud_screen.json)
- [Mojang：界面登记文件](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/resource_pack/ui/_ui_defs.json)
- [Mojang：通用控件定义](https://github.com/Mojang/bedrock-samples/blob/46ba6ea985fb5a92d79a9419198f10dda14c199d/resource_pack/ui/ui_common.json)
- [官方：协作式附加包指南](https://learn.microsoft.com/en-us/minecraft/creator/documents/practices/guidelinesforbuildingcooperativeaddons?view=minecraft-bedrock-stable)
- [本教程的资料版本与验证边界](../misc/source_guide.md)
