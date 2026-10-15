# 自定义粒子发射器与粒子

当我们观察火把时，可以看到火焰附近不断出现细小的粒子。单个粒子很快就消失了，火把周围的效果却没有随之结束。这是因为，负责产生粒子的对象和被产生出来的粒子，并不是同一个对象。在本节中，我们一起来制作一簇短暂出现的火星，借此认识粒子效果的基本结构。

## 认识一个粒子系统

**粒子系统**（**Particle System**）中包含**发射器**（**Emitter**）和它产生的**粒子实例**（**Particle Instance**）。发射器决定在哪里、何时、以什么速率产生粒子；粒子自身则具有外观、运动方式和**生命周期**（**Lifetime**）。因此，发射器停止发射，并不意味着已经产生的粒子必须立即消失。

粒子定义属于资源包。本节默认大家已经创建并启用了资源包，测试世界开启了作弊，并且操作者拥有执行命令的权限。这里使用稳定版已经支持的粒子组件，无需为本例开启实验性功能。我们使用的`1.10.0`是粒子文件的格式版本，并不要求将游戏降级到1.10。

## 定义一簇火星

在资源包中创建`particles/tutorial/spark.json`，填写以下完整内容：

```json
{
  "format_version": "1.10.0",
  "particle_effect": {
    "description": {
      "identifier": "tutorial:spark",
      "basic_render_parameters": {
        "material": "particles_alpha",
        "texture": "textures/particle/particles"
      }
    },
    "components": {
      "minecraft:emitter_rate_instant": {
        "num_particles": 12
      },
      "minecraft:emitter_lifetime_once": {
        "active_time": 0.1
      },
      "minecraft:emitter_shape_sphere": {
        "radius": 0.1,
        "direction": "outwards"
      },
      "minecraft:particle_lifetime_expression": {
        "max_lifetime": 1
      },
      "minecraft:particle_initial_speed": 1.5,
      "minecraft:particle_motion_dynamic": {
        "linear_acceleration": [0, -0.3, 0],
        "linear_drag_coefficient": 0.5
      },
      "minecraft:particle_appearance_billboard": {
        "size": [0.08, 0.08],
        "facing_camera_mode": "lookat_xyz",
        "uv": {
          "texture_width": 128,
          "texture_height": 128,
          "uv": [0, 24],
          "uv_size": [8, 8]
        }
      }
    }
  }
}
```

我们先观察定义的上半部分。`particle_effect`不带`minecraft:`前缀；它下面的`description`给出了粒子的标识符、材质和纹理。这里引用了游戏自带的粒子图集，所以无需另外绘制图片。`uv`选择该图集上从`[0, 24]`开始的一块8×8像素区域，这与当前原版火焰粒子使用的区域一致。若其他资源包覆盖了这张图集，显示结果也可能随之改变。

接下来的三个`emitter`组件共同描述发射器：它一次产生12个粒子，在半径为0.1格的球形区域内选择起点，并向外发射。`active_time`控制发射器的发射阶段，`max_lifetime`则让各个粒子存活1秒。这两个时间不能混为一谈。

我们再观察运动。粒子以每秒1.5格的初速度离开发射器，随后受到向下的加速度和阻力。这里的长度与时间分别以格和秒计量，不使用模型中的像素单位，也不使用游戏刻。`particle_appearance_billboard`中的**公告板**（**Billboard**）可以理解为面向观察者的一张小平面；`lookat_xyz`使它朝向相机。

## 在游戏中观察效果

重新加载资源包后，在聊天栏执行：

```mcfunction
/particle tutorial:spark ~ ~1 ~2
```

预期可以在自己上方1格、南方2格附近看到一簇向外散开的火星，随后它们消失。这里的`~2`沿世界的Z轴正方向偏移，并不始终指向玩家面前。若想将效果放在视线前方，可以使用：

```mcfunction
/execute anchored eyes run particle tutorial:spark ^ ^ ^2
```

大家可以依次只修改一个参数，再次执行命令，比较粒子数量、散开速度和存活时间的变化。例如，将`num_particles`改为24会增加这次喷发的粒子数；将`max_lifetime`改为2则延长粒子存活时间。我们不必一开始就同时修改所有字段，否则难以判断是哪一个参数造成了变化。

需要注意的是，命令返回成功并不保证客户端已经找到并绘制了粒子。没有画面时，应先检查资源包是否启用、标识符是否为`tutorial:spark`，再查看内容日志中的解析或纹理错误。不要直接将原版的任意粒子标识符换进命令就认定自己的文件有问题：有些原版效果使用手动发射模式，依赖调用方提供额外数据。

粒子看起来像火星，也不会因此自动造成伤害、点燃方块或成为光源。我们在这里制作的是客户端的视觉效果；游戏规则需要通过相应的行为逻辑另外实现。

## 参考资料

- [粒子系统介绍与单位](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particlesintroduction?view=minecraft-bedrock-stable)。
- [一次性发射器](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particlecomponents/minecraftemitter_lifetime_once?view=minecraft-bedrock-stable)。
- [原版火焰粒子定义](https://github.com/Mojang/bedrock-samples/blob/main/resource_pack/particles/basic_flame.json)：本节借鉴图集区域，没有照搬其手动发射方式。

本节于2026-10-15依据稳定版文档和`bedrock-samples`的`main`分支核对；示例仍需在目标客户端中完成画面与性能验收。
