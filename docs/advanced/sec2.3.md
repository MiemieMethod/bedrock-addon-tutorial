# 学习使用特殊的JSON UI绑定

我们已经能够通过记分板记录状态，也能够用命令或脚本显示文字。接下来，我们进一步认识**JSON UI绑定**（**JSON UI Binding**）：一个文本控件怎样获得随游戏变化的数据，而不是始终显示写在JSON中的固定字符串？

本节以原版HUD中的坐标绑定为例。需要先说明，JSON UI涉及客户端具体屏幕的内部结构，其兼容性边界与稳定脚本API不同。这里依据核对时`Mojang/bedrock-samples`的`main`与`preview`分支中实际存在的HUD定义编写，不据此保证所有版本、所有新界面和所有平台都使用相同结构。完整实验资源包位于`examples/advanced/hud_coordinates/RP`。

## 先从原版定义寻找真实的数据来源

我们打开原版资源包的`ui/hud_screen.json`，可以找到坐标文字使用的`#player_position_text`，以及控制坐标显示的`#player_position_visible`。原版定义将前者绑定到文本，将后者绑定到可见性。

这说明数据来源已经由游戏中的HUD逻辑提供。我们可以使用它，而不需要自己在每一帧把玩家坐标写进JSON文件。但是，如果凭空写出`#tutorial_money`，并不会自动创建一个名为“tutorial_money”的游戏数据通道。井号只是绑定名称所用的约定，不是一种“把任意变量发送到界面”的权限。

同样，记分板目标名不会自动成为UI绑定名，Script API中的普通变量也不会因为名称相同就出现在资源包里。我们应先找到引擎真实提供的数据，再判断当前屏幕和控件是否能够取得它。

## 创建自己的坐标标签

在资源包的`ui/tutorial_hud.json`中定义一个标签：

```json
{
  "namespace": "tutorial_hud",
  "position_label": {
    "type": "label",
    "anchor_from": "top_right",
    "anchor_to": "top_right",
    "offset": [-12, 40],
    "size": [180, 20],
    "text_alignment": "right",
    "color": [1.0, 0.9, 0.3],
    "shadow": true,
    "text": "#text",
    "bindings": [
      {
        "binding_type": "global",
        "binding_name": "#player_position_text",
        "binding_name_override": "#text"
      },
      {
        "binding_type": "global",
        "binding_name": "#player_position_visible",
        "binding_name_override": "#visible"
      }
    ]
  }
}
```

我们先关注第一条绑定。`binding_name`说明读取哪份数据，`binding_name_override`则说明以哪个本地绑定名提供给控件。标签的`text`填写`#text`，便会使用这份绑定的结果。第二条绑定把原版的坐标可见状态映射到`#visible`，避免关闭坐标显示后自定义标签仍然留在屏幕上。

这里的`global`是JSON UI绑定的作用方式，并不表示网络广播，也不表示这个绑定在任意屏幕中都必定存在。它仍然依赖实际运行的屏幕所提供的绑定环境。

## 把定义挂接到HUD

单独定义一个标签还不够，它需要进入已经显示的控件树。在资源包的`ui/hud_screen.json`中，以原版命名空间`hud`对`root_panel`的子控件数组进行追加修改：

```json
{
  "namespace": "hud",
  "root_panel": {
    "modifications": [
      {
        "array_name": "controls",
        "operation": "insert_front",
        "value": [
          {"tutorial_position@tutorial_hud.position_label": {}}
        ]
      }
    ]
  }
}
```

`tutorial_position`是这次挂接形成的控件实例名，`tutorial_hud.position_label`是它所依据的定义。我们只增加自己的控件，不复制整个原版HUD文件，以减少与未来版本和其他资源包的冲突。不过，多个包修改同一控件仍可能相互影响，不能把局部修改理解为绝对兼容。

随后在`ui/_ui_defs.json`中登记新的定义文件：

```json
{
  "ui_defs": ["ui/tutorial_hud.json"]
}
```

本例保留原版坐标显示，所以启用坐标后会看到两份坐标，其中一份位于右上区域。这样便于我们直接比较绑定结果。要做成正式界面，应根据自己的HUD布局决定是否保留重复内容，并在确认目标版本结构之后处理原版控件。

## 区分变量、绑定与控件引用

现在，我们可以把几种看起来相近的符号整理一下。

| 写法 | 在本节中的作用 |
| --- | --- |
| `tutorial_hud.position_label` | 带命名空间的控件定义引用 |
| `tutorial_position@tutorial_hud.position_label` | 从定义建立一个有名称的控件实例 |
| `$name` | JSON UI变量常用的命名形式，用于定义和传递配置 |
| `#player_position_text` | 当前HUD环境中的引擎绑定数据 |
| `binding_name_override` | 将取得的数据映射为控件所使用的本地绑定名称 |

某些控件还使用集合绑定，把物品栏、列表或表单的第几个元素映射给第几个子控件。这时应同时理解集合名称、索引以及控件工厂的生成过程。我们不能把在物品格内工作的绑定复制到独立标签中，就期待它自动知道应该读取哪一个物品格。

## 验证与能力边界

在测试世界中启用资源包，打开坐标显示，移动玩家并观察两份坐标是否一致，再关闭坐标显示，检查自定义文字是否消失。接着测试不同GUI缩放比例、窗口尺寸和常用输入模式。若屏幕完全没有出现文字，先检查资源包是否加载、`_ui_defs.json`路径以及`root_panel`挂接目标是否仍存在，再检查绑定。

如果目标是让玩家选择“开始比赛”“查看成绩”等操作，普通脚本表单通常比修改原版界面更容易维护；如果只是显示比赛进度，`titleraw ... actionbar`或脚本的动作栏接口便可能已经足够。JSON UI适合承担明确的客户端布局需求，不能替代服务端玩法规则和权限检查。

本节没有提供国际版Script API任意打开自定义JSON UI屏幕的方法，因为公开的稳定脚本表单接口并不等同于中国版模组SDK的自定义屏幕接口。我们应按所使用平台实际提供的能力设计功能。

## 参考资料与版本核对

- [Mojang原版HUD：main](https://github.com/Mojang/bedrock-samples/blob/main/resource_pack/ui/hud_screen.json)与[preview](https://github.com/Mojang/bedrock-samples/blob/preview/resource_pack/ui/hud_screen.json)。本次核对的文件blob分别为`87c839b9b9d717dd96ea0667d92dab103103b4bf`与`e2037b2d0d789a1431610a8f639ccd16e63686c3`，分支后续仍会变化。
- [原版UI文件登记](https://github.com/Mojang/bedrock-samples/blob/main/resource_pack/ui/_ui_defs.json)。本例需要在实际客户端进行界面与兼容性验收，BDS本身不能显示客户端HUD。
