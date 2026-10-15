# 修改RenderDragon

在上一节中，我们已经了解旧光影资料为什么不能直接套用到当前客户端。本节将以一个可以清楚观察输入与结果的实验，学习如何为RenderDragon提供受支持的材质数据。这里的“修改”指通过资源包调整公开的渲染输入，而不是修改或替换游戏的渲染器程序。

## 选择我们能够控制的部分

**RenderDragon**是基岩版使用的渲染引擎。**Vibrant Visuals**则提供了一组面向创作者的视觉定制能力，包括PBR纹理集以及环境表现相关的数据。在制作资源包时，我们必须区分渲染引擎、图形模式和资源包接口这三个层次。

我们这次选择一个简单目标：让石头呈现均匀的浅灰色金属表面，并通过修改粗糙度观察反射的变化。这个目标只需要纹理集，不需要自定义着色器源码，也不需要行为包。

## 准备资源包

创建名为`PresentationPBR`的资源包，将下面的清单文件放在根目录。两个UUID只是教程示例；建立自己的独立作品时，应当重新生成。

```json
{
  "format_version": 2,
  "header": {
    "name": "纹理集观察实验",
    "description": "比较石头表面的金属度与粗糙度",
    "uuid": "6996c799-2e6e-440e-820e-ecbf1208cc9c",
    "version": [1, 0, 0],
    "min_engine_version": [1, 21, 120]
  },
  "modules": [
    {
      "type": "resources",
      "uuid": "beec65fa-b797-48d1-82b8-14a5f367eb54",
      "version": [1, 0, 0]
    }
  ],
  "capabilities": ["pbr"]
}
```

`pbr`声明对应本实验使用的PBR资源能力。最低引擎版本采用官方Vibrant Visuals资源包文档给出的要求，并不表示我们已经在所有高于该版本的设备上测试通过。设备还需要支持相应图形模式，玩家也需要在设置中选择该模式。

随后，在资源包中创建`textures/blocks/stone.texture_set.json`：

```json
{
  "format_version": "1.16.100",
  "minecraft:texture_set": {
    "color": [190, 190, 190, 255],
    "metalness_emissive_roughness": [255, 0, 32]
  }
}
```

这里特意使用常量颜色，因而无需额外准备图片。颜色数组的四个分量依次表示红、绿、蓝和Alpha，取值范围为0到255。MER数组的三个分量依次表示金属度、自发光和粗糙度，而不是普通颜色的红绿蓝视觉含义。

`stone`与原版石头所使用的纹理路径对应。这种文件覆盖会影响使用该纹理的表面，所以本实验应当放在单独的测试包中。我们没有创建新的方块标识符，也没有改变石头的硬度、掉落物或碰撞形状。

完整的两个文本文件位于仓库的`examples/presentation/pbr_resource_pack/`目录。它们用于演示公开格式；最终画面仍需按下面的流程在目标客户端中验证。

## 观察粗糙度的作用

加载资源包并启用Vibrant Visuals之后，在固定光照环境中放置一面石头墙。先观察`[255, 0, 32]`，随后只把第三项改为220，再重新加载资源。较低的粗糙度通常对应更集中的反射，较高的粗糙度则使反射更分散。实际观感还取决于光源、周围环境及相机角度。

接下来，保持粗糙度为220，将金属度由255改为0，比较非金属表面。每次只调整一项，我们才可以将变化归因于对应参数。不要把测试期间的时间、天气和曝光一起改掉。

如果希望恢复石头原有的花纹，可以在自己有权使用的包中准备颜色图片，再将`color`改为同一资源包中图片的相对资源名称。纹理集引用的图片需要存在于该包中，不能假定它会自动借用较低优先级包中的同名图片。

## 从常量扩展为纹理

常量MER使整个表面具有相同性质，而一张MER图片可以让不同像素具有不同的金属度和粗糙度。比如，金属箱子的金属边框与涂漆面板就不必共用完全相同的参数。

如果继续制作凹凸效果，可以选择法线贴图或高度图。对于同一个纹理集，两者不能同时定义。当前纹理集格式还提供MERS数据，将次表面散射加入第四个通道；它具有自己的版本与图形模式限制，也不能与MER同时填写。第一次实验没有必要一次引入所有数据层。

## 没有变化时如何排查

首先检查资源包是否出现在世界的已激活列表，并检查有没有更高优先级的包覆盖同一纹理集。随后确认当前实际使用的图形模式。经典模式不会因为我们填入MER就自动获得完整的PBR反射效果。

如果出现内容错误，逐项检查：颜色是否有四个分量、MER是否有三个分量、引用图片是否在同一包中，以及是否同时填写了互斥的数据层。若基础颜色已改变而反射不明显，说明资源加载与PBR效果需要分开排查，不能立刻认定整个文件都未生效。

至于底层着色器二进制、第三方注入工具和特定客户端补丁，它们属于另外的开发环境。它们产生的效果不能作为普通资源包在原版客户端中的兼容性承诺。

## 适用范围与参考

本例以正式版公开PBR纹理集为依据；Vibrant Visuals相关能力还取决于设备和图形模式。Mojang样本的`main`与`preview`并非同一游戏构建，预览版新增参数应当另建实验包测试。

- [官方：Vibrant Visuals资源包](https://learn.microsoft.com/en-us/minecraft/creator/documents/vibrantvisuals/vvresourcepacks?view=minecraft-bedrock-stable)
- [官方：纹理集字段、互斥规则及资源优先级](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/texturesetsreference/texturesetsconcepts/texturesetsintroduction?view=minecraft-bedrock-stable)
- [Mojang正式版样本](https://github.com/Mojang/bedrock-samples/tree/46ba6ea985fb5a92d79a9419198f10dda14c199d/resource_pack)与[预览版样本](https://github.com/Mojang/bedrock-samples/tree/602eee34b6f4540ea8569a92736920aa8e897a2e/resource_pack)
- [本教程的资料版本与验证边界](../misc/source_guide.md)
