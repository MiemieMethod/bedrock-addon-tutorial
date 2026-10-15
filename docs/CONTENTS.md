# 目录

本教程面向国际基岩版。开始复制示例前，请阅读[版本、资料来源与验证范围](misc/source_guide.md)。

## 入门教程

### 第0章 认识JSON

1. [JSON的语法](primer/sec0.1.md)

### 第1章 制作第一个附加包

1. [什么是附加包？](primer/sec1.1.md)
2. [认识清单文件](primer/sec1.2.md)
3. [从配方开始](primer/sec1.3.md)
4. [测试与打包](primer/sec1.4.md)

### 第2章 附加包的基本功能

1. [认识资源包](primer/sec2.1.md)
2. [认识行为包](primer/sec2.2.md)
3. [认识皮肤包](primer/sec2.3.md)
4. [认识世界模板](primer/sec2.4.md)

### 第3章 修改原版

1. [修改原版纹理](primer/sec3.1.md)
2. [修改原版声音](primer/sec3.2.md)
3. [修改原版翻译](primer/sec3.3.md)

### 第4章 自定义物品

1. [自定义旧版格式物品](primer/sec4.1.md)
2. [自定义实验性格式物品](primer/sec4.2.md)
3. [自定义配方](primer/sec4.3.md)

### 第5章 自定义方块

1. [自定义旧版格式方块](primer/sec5.1.md)
2. [自定义实验性格式方块](primer/sec5.2.md)
3. [自定义方块模型](primer/sec5.3.md)

### 第6章 自定义实体

1. [认识Molang](primer/sec6.1.md)
2. [自定义客户端实体](primer/sec6.2.md)
3. [自定义服务端实体](primer/sec6.3.md)
4. [自定义实验性格式实体](primer/sec6.4.md)
5. [自定义实体生成规则](primer/sec6.5.md)
6. [自定义交易表](primer/sec6.6.md)
7. [自定义战利品表](primer/sec6.7.md)

### 第7章 自定义粒子

1. [自定义粒子发射器与粒子](primer/sec7.1.md)
2. [自定义粒子事件](primer/sec7.2.md)
3. [将粒子挂接在实体上](primer/sec7.3.md)

### 第8章 自定义世界生成

1. [自定义生物群系](primer/sec8.1.md)
2. [自定义地物](primer/sec8.2.md)
3. [结构与地物的配合](primer/sec8.3.md)

### 第9章 命令系统

1. [认识命令](primer/sec9.1.md)
2. [函数与函数滴答](primer/sec9.2.md)
3. [将函数应用到附加包的方方面面](primer/sec9.3.md)

### 第10章 着色器

1. [着色器基础](primer/sec10.1.md)
2. [修改HAL](primer/sec10.2.md)
3. [修改RenderDragon](primer/sec10.3.md)

### 第11章 UI

1. [认识JSON UI](primer/sec11.1.md)
2. [认识Ore UI](primer/sec11.2.md)
3. [自定义字体](primer/sec11.3.md)

### 第12章 自定义皮肤

1. [自定义皮肤包](primer/sec12.1.md)
2. [自定义角色部件](primer/sec12.2.md)

### 第13章 编辑世界

1. [编辑世界的地形](primer/sec13.1.md)
2. [修改存档中的NBT](primer/sec13.2.md)
3. [将世界打包为世界模板](primer/sec13.3.md)

### 第14章 发布作品

1. [发布至MCPEDL](primer/sec14.1.md)
2. [加密并发布至服务器](primer/sec14.2.md)
3. [将自己的作品写入开发Wiki](primer/sec14.3.md)

## 进阶教程

### 第0章 认识JS

1. [认识JS的语法](advanced/sec0.1.md)
2. [声明、赋值与算术](advanced/sec0.2.md)
3. [了解不同的数据类型](advanced/sec0.3.md)
4. [JS中的函数](advanced/sec0.4.md)
5. [JS中的对象](advanced/sec0.5.md)
6. [布尔运算与条件语句](advanced/sec0.6.md)
7. [循环语句与跳转语句](advanced/sec0.7.md)
8. [了解位运算](advanced/sec0.8.md)
9. [了解作用域](advanced/sec0.9.md)
10. [了解this关键字](advanced/sec0.10.md)
11. [了解箭头函数](advanced/sec0.11.md)
12. [了解字符串模板](advanced/sec0.12.md)
13. [了解类与构造函数](advanced/sec0.13.md)
14. [了解自调用函数与闭包](advanced/sec0.14.md)
15. [了解异步与承诺](advanced/sec0.15.md)

### 第1章 脚本使能的附加包

1. [认识旧版脚本引擎Script API](advanced/sec1.1.md)
2. [学习当前Script API与GameTest的关系](advanced/sec1.2.md)
3. [注册GameTest函数并验证游戏行为](advanced/sec1.3.md)
4. [基于Script API事件回调修改游戏](advanced/sec1.4.md)
5. [实例：制作具有存档记忆的玩家引导](advanced/sec1.5.md)

### 第2章 进阶的数据驱动的附加包

1. [学习使用哑实体](advanced/sec2.1.md)
2. [学习命令主循环系统](advanced/sec2.2.md)
3. [学习使用特殊的JSON UI绑定](advanced/sec2.3.md)
4. [实例：用哑实体与命令制作计时赛](advanced/sec2.4.md)

### 第3章 数据与脚本的联动

1. [实例：联动自定义方块、脚本与表单制作探险记录台](advanced/sec3.1.md)

## 登峰教程

1. [阅读导出模式](peak/schema.md)
2. [为版本差异建立最小实验](peak/compatibility.md)
3. [组织可以复现的作品](peak/reproducibility.md)

## 杂项文章

- [版本、资料来源与验证范围](misc/source_guide.md)
- [阅读历史数据升级记录](misc/cereal_upgrade.md)
- [阅读历史定义事件记录](misc/definition_event.md)
