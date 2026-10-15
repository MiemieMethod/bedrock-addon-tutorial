# 自定义粒子事件

上一节中，我们让一簇火星在命令执行后立即散开。现在我们希望增加一个小小的变化：命令执行后先等待半秒，再产生火星；又过半秒，在相同的位置再产生一次。这个效果可以用多个定时命令实现，也可以交给粒子系统内部的**事件**（**Event**）来完成。在本节中，我们一起使用第二种方法。

## 定义事件与触发事件

我们之前学习过实体事件。粒子也有事件，但两者使用的是各自的事件系统，支持的操作并不相同。粒子事件可以运行Molang表达式、产生另一个粒子效果、播放相应声音或写入调试日志。我们不能将实体的组件组操作直接复制到粒子事件中。

一个事件有两个值得分开考虑的问题：事件触发后做什么，以及事件在什么时候触发。前者写在`particle_effect.events`中，后者由生命周期等组件负责。如果只定义事件，却没有任何组件引用它，事件就不会自动执行。

## 为火星制作时间轴

保留上一节的`particles/tutorial/spark.json`。再在资源包中创建`particles/tutorial/double_spark.json`，填写：

```json
{
  "format_version": "1.10.0",
  "particle_effect": {
    "description": {
      "identifier": "tutorial:double_spark",
      "basic_render_parameters": {
        "material": "particles_alpha",
        "texture": "textures/particle/particles"
      }
    },
    "events": {
      "burst": {
        "sequence": [
          {
            "log": "tutorial:double_spark burst"
          },
          {
            "particle_effect": {
              "effect": "tutorial:spark",
              "type": "emitter"
            }
          }
        ]
      }
    },
    "components": {
      "minecraft:emitter_rate_steady": {
        "spawn_rate": 0,
        "max_particles": 1
      },
      "minecraft:emitter_lifetime_expression": {
        "activation_expression": 1,
        "expiration_expression": "variable.emitter_age >= 1.5"
      },
      "minecraft:emitter_lifetime_events": {
        "timeline": {
          "0.5": "burst",
          "1.0": "burst"
        }
      },
      "minecraft:emitter_shape_point": {}
    }
  }
}
```

我们可以看到，新效果将稳定发射速率设为0，不直接发射粒子，而是充当一个短暂存在的调度器。生命周期表达式在发射器年龄达到1.5秒时将其结束。我们特意让生命周期与已发射粒子的数量无关，避免把“一次性喷发已经完成”误当成“时间轴已经走完”。`timeline`中的键虽然写成字符串，但表示的是从发射器生命周期开始计算的秒数。当时间到达0.5秒与1.0秒时，系统分别触发`burst`。

`burst`使用了一个**顺序节点**（**Sequence Node**）。其中第一个操作写入内容日志，第二个操作生成`tutorial:spark`的发射器。这两个操作在同一次事件中依次执行，`sequence`本身不会在它们之间插入等待。真正实现半秒间隔的是上面的时间轴。

测试世界启用资源包后，执行：

```mcfunction
/particle tutorial:double_spark ~ ~1 ~2
```

预期效果是同一位置先后出现两簇火星。外层发射器在1.5秒后结束，而第二簇火星由自己的生命周期控制。我们在上一节设置的1秒粒子寿命仍然有效。

## 选择合适的事件类型

事件中的`particle_effect.type`决定如何产生新效果。它与粒子文件中的材质名称没有关系。

| 类型 | 作用 |
| --- | --- |
| `emitter` | 在事件位置创建新的发射器，由新效果管理后续粒子。 |
| `emitter_bound` | 创建新的发射器，并在原发射器绑定实体或定位器时继承该绑定。 |
| `particle` | 手动产生一个粒子，目标效果应使用`minecraft:emitter_rate_manual`。 |
| `particle_with_velocity` | 在手动产生粒子的基础上继承触发粒子的速度。 |

本例希望复用上一节已经定义好的整簇火星，所以选择`emitter`。如果将它随意改为`particle`，就改变了调用约定，不能期待保持原来的12个粒子喷发效果。

此外，`minecraft:emitter_lifetime_events`中的时间围绕发射器计算；`minecraft:particle_lifetime_events`中的时间则围绕每个粒子计算。例如，让12个粒子的消亡分别触发一次`burst`，可能生成12簇新的效果。制作连锁烟花时，这种数量关系尤其需要留意。我们不应让A生成B、B又无限生成A。

## 检查事件是否真正执行

如果只出现一次火星，应检查时间轴中是否漏写了第二个键，或外层发射器是否在第二次事件之前就已经结束。若完全没有画面，可以先单独执行上一节的`/particle tutorial:spark ~ ~1 ~2`：它能正常显示，才继续检查调度器。

在开启内容日志的条件下，`log`可以帮助我们区分“事件没有触发”和“事件已经触发，但目标粒子没有显示”。调试结束后可以删去日志节点，保留产生粒子的操作。需要继续制作爆炸、余烬或声音层次时，我们也可以沿用这种方法，先把每个小效果单独做好，再用事件将它们连接起来。

## 参考资料

- [粒子事件及事件类型](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particleeffectevents?view=minecraft-bedrock-stable)。
- [发射器生命周期事件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particlecomponents/minecraftemitter_lifetime_events?view=minecraft-bedrock-stable)。
- [发射器生命周期表达式](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particlecomponents/minecraftemitter_lifetime_expression?view=minecraft-bedrock-stable)。
- [粒子生命周期事件](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particlecomponents/minecraftparticle_lifetime_events?view=minecraft-bedrock-stable)。

本节采用稳定版已有的粒子事件格式，核对日期为2026-10-15；时间轴的实际画面表现需要在目标客户端中验收。
