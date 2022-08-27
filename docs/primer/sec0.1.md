# JSON的语法

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg" /></a>

::: tip

本章假定读者对JSON文件格式较为陌生，如果已经对该内容有了一定的了解，可以选择直接从[第一章](./sec1.1.html)开始阅读。注意：本章内容是用于配合本教程所介绍的基础内容，如果想正式学习相关内容，可以前往[官方](http://www.json.org/json-zh.html)、正式的[规范](https://datatracker.ietf.org/doc/html/rfc8259)或[教程](https://www.w3school.com.cn/js/js_json_intro.asp)网站来进行学习。

:::

JSON是一种用于存储和交换信息的通用格式，也是我们在Minecraft附加包中最常接触到的一种文件格式。充分了解这种文件格式有助于我们在编写附加包的过程中得到更加轻松的体验，避免因单纯的语法错误导致不必要的时间损失。

**JSON**全称<strong><u>J</u>ava<u>S</u>cript <u>O</u>bject <u>N</u>otation</strong>，译为**JavaScript对象表示法**或**JavaScript对象简谱**，念作/ˈdʒeɪsən/或/ˈdʒeɪˌsɒn/。最开始，这种文件格式析取自一种名为JavaScript的程序语言，随着人们发现这种数据格式清晰简洁，非常适合作为一种理想的数据交换语言使用，这种文件格式逐渐脱离了JavaScript，成为了在计算机科学的各处各地都得到了广泛应用的一种轻量数据交换格式。

首先，我们观察一个使用了JSON文件格式的示例。这是一个附加包中最基本的文件——清单文件的示例：

```json
{
    "format_version": 2,
    "header": {
        "description": "resourcePack.vanilla.description",
        "name": "resourcePack.vanilla.name",
        "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
        "version": [0, 0, 1],
        "min_engine_version": [1, 13, 0]
    },
    "modules": [
        {
            "description": "resourcePack.vanilla.description",
            "type": "resources",
            "uuid": "53644fac-a276-42e5-843f-a3c6f169a9ab",
            "version": [0, 0, 1]
        }
    ]
}
```

我们此时并不考虑该文件的功能，我们仅使用该文件作为JSON格式学习的示例。我们可以看到，该文件有如下基本结构：

- 整个文本以左花括号`{`开头，以右花括号`}`结尾。
- 文本中可以看到典型的`"冒号前一些东西": 冒号后一些东西`的结构，我们称这种结构为一个**字段**（**Field**）。
  - 有一些字段后面还有一个英文逗号`,`。
- 在一个字段中，“冒号前一些东西”我们称之为**键**（**Key**），“冒号后一些东西”我们称之为**值**（**Value**）。每个字段的键都是用英文的直引号`"`括起来的，但是一个字段值是多种多样的，我们可以看到有数字作为值，有和键一样用英文直引号`"`括起来的内容作为值，也有以左花括号`{`开头，中间又是一堆东西，然后以右花括号`}`结尾，或以左方括号`[`开头，中间一些东西，然后以右方括号`]`结尾的内容作为值。

有了上述观察，我们不免产生一些疑问，花括号`{}`括起来的东西是什么？为什么要用`"键": 值`这种被称为字段的结构？到底哪些字段后面会存在英文逗号`,`，哪些不存在？键和值都遵循什么规则，都允许存在什么样的形式？下面，我们来一一解答这些问题。

## 对象

正如JSON的名字——“JavaScript对象表示法”所说的那样，JSON是用来表示一个JavaScript对象的文件格式。只不过，严谨地说，JSON的格式比JavaScript的对象格式还要严格一些，所以我们更愿意直接称呼JSON中表示的这种JavaScript对象为“JSON对象”，或直接与JavaScript中一样简称为**对象**（**Object**）。

一个对象的特征，或者说标志，便是一对**花括号**`{}`。从左花括号`{`开始，中间写入一些内容，到右花括号`}`结束，这一整个内容便是一个对象。正如我们上面示例中看到的那样，一个JSON文件的全部内容便是一整个对象。注意，**花括号必须成对出现**，如果只有单独的一边的花括号，我们便无法确定从哪儿到哪儿才是一个对象，这种格式便是错误的JSON格式，自然也无法被程序正确解析。

以下便是一个最简单的对象：

```json
{}
```

我们可以看到，这里的最右花括号之间什么内容都没有，这种对象自然被我们称为**空对象**（**Empty Object**）。那么，如果要向对象中填充内容，我们应该采取什么样的格式呢？没错，答案就是我们在之前的示例中观察到的结果——使用**字段**来描述。

### 字段

**字段**是用作在对象中描述一对信息的格式，这对信息中有一部分是用来说明该字段是“用于说明什么属性的”，而另一部分是用来说明该字段“在上述说明的属性下给出的值是多少”。以一个人为例，其名字为小明，身高为170cm，体重为60kg。那么如果我们想把小明描述成对象中的字段，便可以按照如下格式来书写：

```json
{
    "name": "小明",
    "height": 170,
    "weight": 60
}
```

每个字段的中间都存在一个英文冒号`:`，冒号的左侧我们称之为**键**，右侧我们称之为**值**。每两个两个字段之间使用英文逗号`,`分隔，用来代表他们是不同的字段。在上述示例中，`"name"`、`"height"`和`"weight"`都是键，而对应的`"小明"`、`170`和`60`则是它们各自的值。`"name"`字段结尾处的逗号用于分隔`"name"`字段和`"height"`字段，`"height"`字段结尾处的逗号用于分隔`"height"`字段和`"weight"`字段。`"weight"`字段之后没有其他字段了，所以无需再添加任何逗号，正如`"name"`字段之前也没有任何逗号一样。

逗号并非一定要写在字段的末尾，他们可以在两个字段之间的任何位置，比如下一个字段的开头。事实上，字段与字段之间，甚至键、值、冒号、逗号、花括号等元素之间，都可以存在任意数量的“**空白**（**Whitespace**）字符”，空白字符包括空格符、制表符、换行符、回车符等。也就是说，不仅仅是逗号可以在空白字符中任意移动自己的位置，事实上，上述小明的示例用下面所展示的任意一种写法都是可行且等价的：

:::: code-group
::: code-group-item 完全收紧

```json
{"name":"小明","height":170,"weight":60}
```

:::
::: code-group-item 适当空格

```json
{ "name": "小明", "height": 170, "weight": 60 }
```

:::
::: code-group-item 随意空格

```json
{    "name"  :  "小明",    "height" : 170,  "weight":       60   }
```

:::
::: code-group-item 标准换行

```json
{
    "name": "小明",
    "height": 170,
    "weight": 60
}
```

:::
::: code-group-item 逗号左移

```json
{
    "name": "小明"
   ,"height": 170
   ,"weight": 60
}
```

:::
::: code-group-item 放飞自我

```json
{
          "name":   "小明" ,
  "height"  :    170
       ,
       "weight" :
   60
                          }
```

:::
::::

当然，虽然对于计算机来说，上述的写法都会解析为同样的内容，但是对于人类来说，有些写法还是“为时过早”了。从我们自身和其他人在查阅我们的代码时的可读性的角度出发，上述示例中的“**适当空格**”和“**标准换行**”标签页展示的格式分别是在“同一行写”和“换行写”时**最为推荐的格式**。当然，“完全收紧”的格式也不是毫无用处的，人们在网络传输时往往采用完全收紧的方式剔除掉所有的“无关字符”，以保证文件是“最小化”的，从而使消耗的流量降到最低。

同时，我们注意到了上述的换行书写示例中，我们的三个字段并没有和两个花括号处在同一竖直线上，换句话说，我们在三个字段的开头分别添加了若干空格。这种行为被称为**缩进**（**Indentation**）。适当的缩进可以使我们的代码更加规范和可读，同时也方便我们检查文件格式有没有出现错误。比如，在上述示例中，我们将一个对象的内容缩进之后，内容中的各字段在同一个竖直线上对齐，对象两侧的花括号在另一个竖直线上互相对齐，这不仅可以快速帮我们定位到该对象的字段，帮助我们快速观察到字段的数目和各自的值，同时也可以帮助我们检查该对象的两个花括号是否成对，有没有“落单”的括号出现等内容，因此，良好的缩进习惯是一个优秀的开发者养成具备习惯之一，否则，如果最后的代码真的写成了上述示例中“放飞自我”的格式，如并非故意，那可真要贻笑大方了。

一般而言，我们可以使用多种字符充当缩进用的空白字符，但是一旦选择某种字符，便推荐将其在全文统一。常用的缩进用空白字符有单个制表符（即1个TAB），2个、3个或4个空格，当然，你选择其他数量的空格或制表符也是可行的，毕竟这并不违背JSON文件的规范。

:::: code-group
::: code-group-item 1个制表符

```json
{
	"format_version": 2,
	"header": {
		"description": "resourcePack.vanilla.description",
		"name": "resourcePack.vanilla.name",
		"uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
		"version": [0, 0, 1],
		"min_engine_version": [1, 13, 0]
	},
	"modules": [
		{
			"description": "resourcePack.vanilla.description",
			"type": "resources",
			"uuid": "53644fac-a276-42e5-843f-a3c6f169a9ab",
			"version": [0, 0, 1]
		}
	]
}
```

:::
::: code-group-item 2个空格

```json
{
  "format_version": 2,
  "header": {
    "description": "resourcePack.vanilla.description",
    "name": "resourcePack.vanilla.name",
    "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
    "version": [0, 0, 1],
    "min_engine_version": [1, 13, 0]
  },
  "modules": [
    {
      "description": "resourcePack.vanilla.description",
      "type": "resources",
      "uuid": "53644fac-a276-42e5-843f-a3c6f169a9ab",
      "version": [0, 0, 1]
    }
  ]
}
```

:::
::: code-group-item 3个空格

```json
{
   "format_version": 2,
   "header": {
      "description": "resourcePack.vanilla.description",
      "name": "resourcePack.vanilla.name",
      "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
      "version": [0, 0, 1],
      "min_engine_version": [1, 13, 0]
   },
   "modules": [
      {
         "description": "resourcePack.vanilla.description",
         "type": "resources",
         "uuid": "53644fac-a276-42e5-843f-a3c6f169a9ab",
         "version": [0, 0, 1]
      }
   ]
}
```

:::
::: code-group-item 4个空格

```json
{
    "format_version": 2,
    "header": {
        "description": "resourcePack.vanilla.description",
        "name": "resourcePack.vanilla.name",
        "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
        "version": [0, 0, 1],
        "min_engine_version": [1, 13, 0]
    },
    "modules": [
        {
            "description": "resourcePack.vanilla.description",
            "type": "resources",
            "uuid": "53644fac-a276-42e5-843f-a3c6f169a9ab",
            "version": [0, 0, 1]
        }
    ]
}
```

:::
::::

## 数据格式

看到这里，你一定对JSON中的对象具有一定的了解了，但是，我们依旧尚未关注对象中字段的值都允许什么样的类型。我们将目光看向上面的“缩进示例”所描述的文件。如果记忆力不错的话，你一定还记得我们说过这是附加包的清单文件。我们就再次来以这个清单文件为例，学习JSON中的值所允许的数据类型，或者说，数据格式。

### 数字

```json{2}
{
    "format_version": 2,
    "header": {
    },
    "modules": [
    ]
}
```

JSON中的值允许使用**数字**（**Number**），例如上述的`"format_version": 2`中的值`2`。当然，数字未必是整数，JSON中允许**整数**（**Integer**，**int**）和**浮点数**（**Floating Number**，**float**）两种数字形式。浮点数即我们平常所说的“小数”，或者说“实数”，不过虽然可能会被称为“实数”或“实型”，但是事实上显然是只能接受“有理数”的输入，或者更准确地说，有限小数的输入。以下示例都属于数字数据格式：

```json{2-6}
{
    "height": 170,
    "weight": 60.5,
    "chest": 90.95,
    "waist": 62.05,
    "hip": 96.05
}
```

### 对象

```json{3-9}
{
    "format_version": 2,
    "header": {
        "description": "resourcePack.vanilla.description",
        "name": "resourcePack.vanilla.name",
        "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
        "version": [0, 0, 1],
        "min_engine_version": [1, 13, 0]
    },
    "modules": [
    ]
}
```

JSON中字段的值也可以是一个完整的对象，就比如这里`"header"`字段的值即是一个对象，这个对象中又含有`description"`等五个新的字段。对象常用来表达属性之间的包含关系。最外面的对象，在上述示例中也就是第一行和最后一行的花括号所括住的对象，被我们称为该JSON的**根对象**（**Root Object**）。

### 字符串

```json{4-6}
{
    "format_version": 2,
    "header": {
        "description": "resourcePack.vanilla.description",
        "name": "resourcePack.vanilla.name",
        "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
        "version": [0, 0, 1],
        "min_engine_version": [1, 13, 0]
    },
    "modules": [
    ]
}
```

除了数字和对象之外，JSON中也有一种用于表示“一段文本”的数据格式，那便是**字符串**（**String**）。顾名思义，字符串就是一列字符“串”在一起，即“一段文本”，为了能够使计算机正确解析字符串，正确“认识到”这是一个字符串，我们需要使用**英文直引号**`"`将字符串的两侧括住。以下便是一些字符串的示例：

```json{2-8}
{
    "name": "小明",
    "gender": "",
    "height": "170cm",
    "weight": "60.5kg",
    "chest": "90.95cm",
    "waist": "62.05cm",
    "hip": "96.05cm"
}
```

由于小明是我虚构的人物，而我并不想擅自假定小明的性别，所以我在`"gender"`字段里留了空，相邻的两个引号`""`也是一种字符串，这种字符串被称为**空字符串**（**Empty String**）。我们可以看到，除了字段的值可以是字符串之外， 字段的键也都是使用英文直引号`"`括起来的形式。虽然并不建议这么理解，但是如果你想的话，你也可以理解为“无论字段的值如何，**字段的键都必须要是字符串的形式**，只不过，字段的键不可以是空字符串”。

### 数组

```json{7,8}
{
    "format_version": 2,
    "header": {
        "description": "resourcePack.vanilla.description",
        "name": "resourcePack.vanilla.name",
        "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
        "version": [0, 0, 1],
        "min_engine_version": [1, 13, 0]
    },
    "modules": [
    ]
}
```

除了上述我们已经多次观察的值的类型之外，JSON还允许一种特殊的数据类型，这种数据类型被称为**数组**（**Array**）。我们可以观察到，与对象非常类似的是，数组也使用一种形式的括号来作为两边的边界，只不过，数组使用的是方括号`[]`而非花括号。

我们之前已经知道，对象中的每一个字段都有其“名字”，即它的键，但是，数组中的值并没有与之对应的键，它们唯一的不同在于它们在数组中出现的顺序，即谁是第0位，谁是第1位，谁是第2位等。数组中只有值，数组中每一个值被称为一个**元素**（**Element**）。

和对象可以拥有任意多的字段一样，数组理论上也可以拥有任意多的元素，但是，有些位置的数组受到游戏接口的限制，只有一部分元素是有效的，且可以被游戏读取。比如，上述示例中的`"version"`和`"min_engine_version"`都只有前三个元素可以被游戏读取并正确解析为版本号，而`"modules"`字段则可以接受并正确读取任意多的元素。不过，这也仅仅是受限于游戏引擎提供的接口而已，这并不是本章想要讲述的内容。单纯从JSON格式上来看，不论你在数组中放置多少个元素，这个JSON文件都是符合格式标准的。

```json{10-17}
{
    "format_version": 2,
    "header": {
        "description": "resourcePack.vanilla.description",
        "name": "resourcePack.vanilla.name",
        "uuid": "0575c61f-a5da-4b7f-9961-ffda2908861e",
        "version": [0, 0, 1],
        "min_engine_version": [1, 13, 0]
    },
    "modules": [
        {
            "description": "resourcePack.vanilla.description",
            "type": "resources",
            "uuid": "53644fac-a276-42e5-843f-a3c6f169a9ab",
            "version": [0, 0, 1]
        }
    ]
}
```

数组中和对象中字段的值所接受的类型并没有什么差别，比如上述例子中的`"modules"`数组的元素就是一个对象。数组中元素的顺序，或者说“位置”，被称为该元素的**索引**（**Index**）。注意，**索引都是从0开始计数的**，例如上述的`"modules"`数组只有一个元素，这个元素是一个对象，它的索引是0。

如果你还记得的话，我们一开始说过，JSON是从JavaScript语言中析取出来的一种格式。在JavaScript中，数组也是一种特殊的对象，或许是因为这个原因，在JSON中，人们有时也会使用一个JSON数组来作为JSON的根“对象”，这并非是一种错误的写法，只不过并不那么常见。以下是一个最外层（即根“对象”）是一个数组的示例：

```json
[
  "en_US",
  "zh_CN",
  "zh_TW"
]
```

### 布尔值

为了纪念伟大的数学家与逻辑学家**乔治·布尔**（George Boole），人们将一种用于表示纯粹的“真”或“假”的概念的数据类型称为**布尔值**（**Boolean Value**，**boolean**，**bool**），这种值的类型被实现到了很多的计算机语言中，JSON中也不例外。在JSON中，我们使用`true`表示“**真**”或者“是”的概念，`false`表示“**假**”或者“否”的概念，二者皆为小写，不可以使用大写的形式。像`true`、`false`这样的预先给定了“只能这么写”的值在JSON中也被称为**字面量**（**Literal**），由于是直接的字面量，所以它们**不需要像字符串那样使用引号将自身括住**。以下是一个使用了布尔值的JSON示例：

```json{3-6}
{
    "name": "小明",
    "is_chinese": true,
    "is_american": false,
    "is_british": false,
    "is_japanese": false
}
```

### 空值

和布尔值一样，JSON中还有第三个字面量`null`，被称为**空值**（**Null**），用于代表“空”或“未知”的概念。空值`null`和数字中的`0`、字符串中的空字符串`""`、空对象`{}`、空数组`[]`都不同，它仅仅代表“这里什么都没有”或者“什么都不知道”。比如，我们可以问小明手里有几个苹果，如果回答“0”，那么我们就可以知道小明手里有0个苹果（即没有苹果），但是如果回答“Null”，结果就变成了我们无法知道小明手里有多少苹果，甚至小明有可能身患残疾，根本无法“手持”苹果了，这一点我们也无法从“Null”这个结果中肯定或否定。在一般的JSON编写中，我们并不经常会用到空值`null`，这个值一般是用于防止程序出现意外错误而引入的。注意，如同两个布尔值一样，`null`中的每一个字母也需要小写：

```json{3}
{
    "name": "小明",
    "handed_apple_count": null
}
```

## 注释

**注释**（**Comment**）是代码文件中为了阐明上下文信息而写入的一段文本，有效的注释可以使阅读代码变得更加高效。**标准的JSON规范是不支持注释的**，但是**Minecraft中的JSON全部都支持注释**。注释可以通过两种方式实现，分别是**单行注释**（**Single-line Comment**）和**多行注释**（**Multi-line Comment**）。

### 单行注释

我们可以使用连续的两个英文正斜杠`//`来开启一个**单行注释**，从`//`之后的所有部分都将属于注释的内容，不会被当做JSON的正文被计算机解析。以下是一个运用了单行注释的JSON示例：

```json
// 小明的个人信息
{
    "name": "小明", // 姓名
    "height": 170, // 身高
    "weight": 60 // 体重
}
```

### 多行注释

单行注释虽然应用起来非常方便，但是还是有诸多限制，例如，单行注释开始之后就必须遇到换行符才能结束注释，并不能通过我们的自由意志来控制何时结束，亦或者，单行注释只能在同一行中进行注释，如果我们想书写一些跨行文本作为注释，就必须在每一行前面都写入两个英文正斜杠`//`，这显得十分冗余。所以，应对上述举例中的情形，我们更愿意使用**多行注释**来解决问题。

多行注释以连续的一个英文正斜杠和一个星号`/*`开始，以连续的一个星号和一个英文正斜`*/`结束，其中间所有内容皆属于注释内容，不会被计算机解析，示例如下：

```json{1-3}
/* 小明的个人信息
包含了姓名、身高、体重等信息
内部数据，不可外传 */
{
    "name": "小明", // 姓名
    "height": 170, // 身高
    "weight": 60 // 体重
}
```

善用注释，既可以方便自己在后期对代码进行调试，也方便他人对代码进行快速阅读和理解。

## 文件

一路看到这里，我们还没有学习如何将JSON保存为一个文件。事实上，JSON保存为文件非常简单，虽然JSON文件的文件扩展名为`.json`，但其事实上就是一个纯文本文件（你可以理解为扩展名为`.json`的TXT文件）。整个文件以左花括号（或左方括号）开始，以右花括号（或右方括号）结束，包含了一整个JSON对象（或数组），这便是一个JSON文件。额外地，JSON文件的MIME类型是“application/json”。

打开JSON文件的方式有很多，比如，你可以直接使用计算机自带的记事本将其当做一个TXT文件那样来打开，但我们并不建议这种方式。我们推荐使用一些更优秀的，排版更规范的甚至带有文件验证与纠错功能的编辑器来打开和编辑。在PC端，我们推荐轻量级文本编辑器[Notepad++](https://notepad-plus-plus.org/)或功能更完善的综合性代码编辑器[Visual Code Studio](https://code.visualstudio.com/)；在移动端，我们推荐Android端的轻量级[QuickEdit文本编辑器](https://play.google.com/store/apps/details?id=com.rhmsoft.edit)和iOS端的轻量级[TextCode编辑器](https://apps.apple.com/cn/app/id992101777)；此外，我们还推荐有能力者使用功能更强大的[Vim](https://www.vim.org/)来进行代码编辑。

正确且熟练地编辑JSON文件是Minecraft附加包学习和开发的基础，请开发者们谨记本章学习到的内容，练习并熟练地应用到附加包开发的过程中。
