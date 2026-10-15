# 将粒子挂接在实体上

我们已经能够在世界中的一个固定位置产生粒子。如果希望生物走到哪里，火星便从哪里产生，就需要将粒子与实体联系起来。本节将沿用前面制作的自定义实体，为它增加一个周期性产生火星的动画。

这里默认大家已经完成了前章的`tutorial:guide`实体，并能通过`/summon tutorial:guide`生成它。我们只向这些文件中增加粒子所需的字段，不必重新制作实体，也不应覆盖原来已经工作的材质、纹理和渲染控制器。

## 为粒子指定挂接位置

模型中的**定位器**（**Locator**）是一个带名称的位置，适合用来标记嘴部、手部或武器尖端。我们先打开资源包的`models/entity/guide.geo.json`，找到`geometry.tutorial.guide`中名为`body`的骨骼，在这个骨骼对象内增加：

```json
{
  "locators": {
    "spark_origin": [0, 20, 0]
  }
}
```

这是需要合并到骨骼中的字段片段，不是完整模型文件。如果该骨骼已经有`locators`，只添加其中的`spark_origin`成员。前章模型的头顶高度为20，所以这里先把发射点放在头顶。坐标使用模型单位，通常16个模型单位对应游戏中的一格；它和粒子组件中的长度单位不同。对于有复杂枢轴或父子骨骼关系的模型，建议在模型编辑器中观察定位器的位置，再将它移到实际需要的位置。

定位器跟随所属骨骼运动。因此，将它放在手部骨骼中，便可以让粒子起点随手部动画移动；将它放在身体骨骼中，则适合用来制作身体周围的效果。

## 注册粒子并播放动画

保留前两节的粒子文件。在资源包`entity/guide.entity.json`的`minecraft:client_entity.description`中，合并以下三个字段：

```json
{
  "particle_effects": {
    "spark": "tutorial:spark"
  },
  "animations": {
    "spark_pulse": "animation.tutorial.spark_pulse"
  },
  "scripts": {
    "animate": [
      "spark_pulse"
    ]
  }
}
```

如果已经有`animations`或`scripts.animate`，应当追加成员。例如，前章的`scripts.animate`中已有`look`和`pulse`，添加后应该同时保留它们与`spark_pulse`。我们在这里建立了两层引用：`spark`是客户端实体内部的粒子短名称，指向`tutorial:spark`；`spark_pulse`是动画短名称，指向下一步要定义的完整动画标识符。

在资源包中创建`animations/tutorial.spark.animation.json`：

```json
{
  "format_version": "1.8.0",
  "animations": {
    "animation.tutorial.spark_pulse": {
      "loop": true,
      "animation_length": 2,
      "particle_effects": {
        "0.25": {
          "effect": "spark",
          "locator": "spark_origin",
          "bind_to_actor": true
        }
      }
    }
  }
}
```

这个动画不修改任何骨骼，只在时间轴到达0.25秒时触发粒子。由于动画每2秒循环一次，预期实体会以这个间隔不断产生火星。`effect`填写的是刚才注册的短名称`spark`，不能在这里将短名称与文件路径混用。

重新加载资源包并生成测试实体后，我们可以先让实体静止，确认火星的位置，再观察它行走、转身或播放骨骼动画时的效果。若游戏中同时存在很多这样的实体，每个实体都会运行自己的动画，因此还应检查数量增加后的性能。

## 跟随发射器与跟随已发射粒子

我们不妨仔细观察移动中的实体。粒子从实体身上的定位器产生，却可能在产生以后留在身后。这并不一定是绑定失败：**发射起点随实体移动**与**已经产生的粒子随实体移动**，是两个不同的问题。

动画中的`bind_to_actor`管理效果与实体的绑定。粒子组件`minecraft:emitter_local_space`则进一步决定粒子使用哪个参考系。如果希望已经产生的粒子也随实体平移和旋转，可以向`tutorial:spark`的`components`中合并：

```json
{
  "minecraft:emitter_local_space": {
    "position": true,
    "rotation": true
  }
}
```

如果我们要制作烟雾轨迹，往往更希望已经发出的烟留在世界中，此时可以保留默认的世界空间模拟。`rotation`为`true`而`position`为`false`不是有效组合。大家可以复制粒子文件、更换标识符后分别测试两种方案，避免为一个实体调整效果时，影响所有引用同一个粒子的对象。

## 沿着引用关系排查

没有任何火星时，先用`/particle tutorial:spark ~ ~1 ~2`验证粒子本身，再依次检查客户端实体是否注册了`spark`、动画是否通过`scripts.animate`启动、时间轴是否引用正确的短名称。粒子有显示但位置不对时，则检查实际模型中是否存在`spark_origin`，以及它属于哪一根骨骼。

如果火星出现得过于频繁，应检查是否同时从动画和动画控制器触发了相同效果，或重复添加了相同动画短名称。绑定效果不会自动为实体增加攻击范围，也不会把粒子碰撞转化为伤害。视觉与行为分别实现，然后在同一个明确的状态下启动，两者才能保持一致。

## 参考资料

- [在实体中使用粒子效果](https://learn.microsoft.com/en-us/minecraft/creator/documents/particleeffects?view=minecraft-bedrock-stable)。
- [动画中的粒子时间轴、定位器与绑定字段](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/visualreference/actor_animation.v1.8.0?view=minecraft-bedrock-stable)。
- [发射器局部空间](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/particlesreference/particlecomponents/minecraftemitter_local_space?view=minecraft-bedrock-stable)。

本节于2026-10-15核对稳定版格式；最终挂接位置以所用模型和客户端中的实际显示为准。
