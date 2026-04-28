---
title: 附加包小册·序章
topic: hy2
date: 2026/4/27
tags: [技术, Minecraft, 附加包]
---
# 序章·启程之前

这一章的内容非常基础，包含附加包的相关知识，以及掌握一些附加包开发工具的使用方法，以及掌握附加包开发中最重要的技能：编写 JSON 文件。

如果已经掌握了这些知识，你完全可以通读一遍，然后直接跳过这一章 :D

本章包含以下小节：

- Prologue.1 概述与发展史
- Prologue.2 认识 JSON
- Prologue.3 开发工具与相关资源

准备好了吗，我们开始吧！

# Prologue.1 基础知识

在本节中，我们将会了解附加包的一些基础知识，以及其发展的历史。

## 文件结构

附加包内主要是 JSON 文件，这是一种轻量级的文本数据交换格式，利于理解，这种基于一些数据驱动游戏内容的方式叫做**数据驱动（Data-Driven）**。

> 尽管数据驱动允许我们修改一些原版内容，然而目前大部分原版的物品、方块都是硬编码的，我们无法对其进行修改
>
> 如果要对一些原版内容进行修改，请考虑一下附加包间的兼容性[^1]

除此之外，附加包还可以包含音效、纹理、JavaScript 脚本等，我们可以按需使用这些功能。

## 行为与资源

附加包通常分为资源包和行为包，两者可以访问对方的资源，它们一般一起运行，但有时也可以独立运行而不出错。

**资源包（Resource Pack）**，通常缩写为 **RP** 或 **RES**，其通常包括：

- 纹理；
- 模型；
- 动画；
- 粒子音效。

**行为包（Behavior Pack）**，通常缩写为 **BP** 或 **BEH**，其通常包括:

- 方块文件；
- 物品文件；
- 实体文件；
- 脚本文件；
- 配方、战利品表文件。

行为包和资源包的资产一般而言是可以互相访问的，例如，想要创建一个自定义物品，我们就需要在行为包定义它的行为（如它的 ID 是什么，最大堆叠是多少，可不可以食用……），再在资源包中定义它的纹理、名称等。

正因如此，在大多数情况下，想要完整实现游戏内容，需要行为包和资源包同时工作才可以做到[^2]。

## 附加包简史

> 本段落内容与开发关系不大，如果嫌烦可以跳过 :D

附加包的发展与完善经历了一个漫长的过程：

在 Alpha 0.15.0 中，官方加入了最初的自定义游戏内资源包——塑料资源包和城市资源包；

最初的一段时间内，官方致力于数据驱动实体相关内容，配方、物品、方块等内容几乎为零。

在 1.9.0 中，加入了 **Minecraft Script Engine（MSE）**，其使用JavaScript编写，为附加包加入了监听和相应游戏事件等功能。

然而 MSE 从加入到被 Script API 代替，其功能始终不完善，而且只能在 Windows 平台启用。

在 1.12.0 中，官方加入了通过脚本加入自定义方块的功能；并允许通过附加包加入自定义物品。

然而这些功能有待完善，自定义的方块甚至只能通过命令获取并放置。

在 1.16.100 中，附加包的功能得到了极大的完善，虽然大部分需要打开假日创作者实验性玩法，但新的组件以及数据驱动的事件触发器带来了以前附加包不敢想象的自定义程度。

在 1.16.210 中，官方加入了 GameTest 框架 ，这是一个基于将测试代码与测试结构配对的服务端测试的自动工具，其后来演变为了 Script API，而 GameTest 则成为了其中的一个模块。

在 1.18.30 中，MSE 被官方移除，其功能可以用 Script API 代替。

在 1.20.0-1.21.0 中，假日创作者相关组件逐渐转入正式版，最终于 1.21.20 寿终正寝，~~并引起了一些争议~~。

> 可以看出，**附加包相关技术仍然在不断的发展迭代当中**，尽管本书尽力采用了最新的写法，但当你读到这里时，或许已经有一些内容过时了，所以请务必保持对[官方文档](https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable)的跟进。

## 小结

通过本节，我们了解了：

- 附加包分为行为包和资源包；
- 附加包的文件结构；
- 附加包的发展史。

接下来，我们将了解 JSON 的基本语法。

[^1]: 举个例子，如果我们修改原版的`player.json`来尝试更改玩家的行为时，如果其他行为包也修改了`player.json`，那么就会导致冲突，导致一些不可预料的错误 ( º﹃º )
[^2]: 当然，行为包和资源包有时也可以单独加载而不出错

# Prologue.2 认识 JSON

**JSON** 是 **J**ava**S**cript **O**bject **N**otation 的的缩写，是一种轻量级的文本数据交换格式。

本节将不会深究 JSON 的技术细节，而是粗略介绍其语法，如果想详细了解请自行搜索或者查看文末的链接。

## 对象
~~~json
{} 
~~~

如上，**对象**用一对花括号表示，对象是无序的。

代码范例中的花括号是 JSON 中的**根对象**，在附加包中，大部分 JSON 文件以根对象为基础，并向里面添加**键值对**。

## 字符串
~~~json
"字符串"
~~~

**字符串**用英文双引号包裹，如果字符串内包含双引号，字符串内的双引号前需要加上转义符`\`。

## 键值对
~~~json
"键": "值"
~~~

上面所展示的**键值对**，每个键值对由一个、一个冒号、和一个值组成。

键值对中键必须是字符串类型，而值可以是任意类型，甚至是对象类型！

~~~json
"键1": "值1", // 末尾有逗号
"键2": "值2" // 末尾没有逗号
~~~

若键值对后无键值对，则末尾不可以加逗号；若键值对后仍有键值对，则必须在末尾加逗号。

~~~json
{
  "键1": "值1",
  "键2": "值2"
} 
~~~

一般而言，键值对需要添加到对象中，如范例中的键值对被添加到了根对象中。

## 数组
~~~json
"数组": ["值1","值2","值3"]
~~~

**数组**用中括号表示，里面的每一个数字称之为**元素**，元素除了数字外，还可以是字符串、布尔值、对象等类型。

与键值对类似，若元素后元素，则末尾不可以加逗号；若元素后仍有元素，则必须在末尾加逗号。

## 布尔值
~~~json
{
  "值1": true,
  "值2": false
}
~~~
布尔值只可以填`true`和`false`，其中`true`代表真，`false`代表假。

如上文的范例，`值1`被判定为真，`值2`被判定为假。

## 注释

~~~json
// 行注释
/*
 123456
 块注释
*/
~~~
`//`是行注释，它之后所有的字符直到行尾都会被视为注释内容，不会被解析器识别。

`/* */`是块注释，这两个符号之间的所有内容都会被视为注释，从而被编译器忽略。

>  JSON 本身并不支持注释，但 Minecraft 为其提供了支持

## 常见错误

JSON 的语法非常严格，初学者经常会犯一些语法错误，导致其内容无法正常在游戏中运行。

### 尾随或缺失逗号
~~~
{
  "键1": "值1" // 末尾缺失逗号
  "键2": "值2", // 末尾有多余的逗号
} 
~~~

若键值对后无键值对，则末尾不可以加逗号；若键值对后仍有键值对，则必须在末尾加逗号。

上面的范例中`键1`缺失了逗号；`键2`尾随了逗号。

### 使用全角符号

~~~json
｛
  “值1”： true，
  “值2”： false
｝
~~~

除了字符串内的字符，JSON 中的符号必须是**半角（英文）符号**，否则就会出现错误！

### 排查错误

我们可以根据编译器的错误信息排查问题，同时你也可以通过 JSON 格式化工具来排查错误，以下是一些在线的 JSON 格式化/语法检查工具：

- [JSON 在线解析格式化验证](https://www.json.cn/)
- [JSON Lint - Format & Validate JSON](https://jsolint.com/)

## 深入了解

- [JSON - 菜鸟教程](https://www.runoob.com/json/json-tutorial.html)
- [学习JSON | MDN](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/JSON)

## 小结

通过本节，我们了解了：

- JSON 的基本语法；
- JSON 的常见语法错误。

接下来，我们将会了解开发所需要的一些工具。

# Prologue.3 开发工具与相关资源

正所谓「工欲善其事，必先利其器」，在开始正式开始制作附加包之前，要了解一下我们制作附加包所需要的工具以及一些实用资源。

## Minecraft 基岩版

附加包是服务于 Minecraft 基岩版的，如果我们没有 Minecraft 基岩版，那么一切创造出来的美好事物都将会想空中楼阁一样脆弱。

关于如何下载 Minecraft 基岩版，这里不再赘述，请自行查阅相关资料。

## 文本编辑器

附加包可以使用任何文本编辑器进行编辑，甚至直接用记事本写也可以（但非常不推荐）！

为了开发的方便，我们推荐使用以下编辑器：

- [Microsoft VS Code](https://code.visualstudio.com/)：一款由微软出品的开源跨平台代码编辑器；
- [Bridge](https://bridge-core.app)：一款专为 Minecraft 附加包提供的IDE（集成开发环境）；
- [MT管理器](https://mt2.cn/)：一款Android 平台文件管理器，内置简单的代码编辑功能与压缩功能；
- [ES文件浏览器](http://www.estrongs.com/?lang=zh-CN)。

选择一款好的文本编辑器可以使我们在编辑 JSON 文件、尤其是在编写体量较大的 JSON 文件（比如交易表）时更加游刃有余，而假如你一意孤行要用记事本编写附加包，那么……祝你好运( • ̀ω•́ )

> 如果选用 Microsoft VS Code，建议安装以下插件使开发更轻松：
> - [Chinese (Simplified) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)：中文语言包，如果能看懂英文可以跳过；
> - [Blockception's Minecraft Bedrock Development](https://marketplace.visualstudio.com/items?itemName=BlockceptionLtd.blockceptionvscodeminecraftbedrockdevelopmentextension)：**强烈推荐！** 这个插件可以为我们附加包中的`.mcfunction`、`.json`以及`.lang`文件提供语法高亮、自动补全等功能；
> - [.mcfunction support](https://marketplace.visualstudio.com/items?itemName=arcensoth.language-mcfunction)；
> - [.lang support](https://marketplace.visualstudio.com/items?itemName=zz5840.minecraft-lang-colorizer)；
> - [Bedrock Definitions](https://marketplace.visualstudio.com/items?itemName=destruc7i0n.vscode-bedrock-definitions)；
> - [Snowstorm Particle Editor](https://marketplace.visualstudio.com/items?itemName=JannisX11.snowstorm)；
> - [UUID Generator](https://marketplace.visualstudio.com/items?itemName=netcorext.uuid-generator)：自动生成 UUID 的插件。

## 图像处理程序

在开发过程中，我们可能需要用到一些纹理资源，因此我们需要一款图像处理软件来绘制这些纹理：

- PC：PhotoShop、GIMP、Pixelorama；
- Android：IsoPix；
- iOS：Pixelmator。

## 压缩软件

附加包制作完成后，我们需要将附加包压缩成压缩文件以供发布，因此我们需要一款压缩软件：

- PC：7Zip、WinRAR；
- Android：MT管理器；
- iOS：ES文件浏览器。

## 游戏内工具

有一些调试工具是游戏内置的，我们无需单独下载，但需要掌握其使用方法。

### 内容日志

在附加包的工作过程中，Minecraft 会在**内容日志（Content Log）** 中记录相关信息，其中一些信息只是记录正常的游戏操作，而有些则是一些错误信息[^1]。

使用内容日志可以帮助我们快速找到附加包问题的源头，从而减轻工作量，我们可以通过下面的方式开启内容日志：

1. 进入游戏设置/创建者；
2. 将「内容日志设置」下的三个选项全部启用。

接下来，我们就可以在屏幕上方看到内容日志了。

在游戏设置/创建者/内容日志设置/内容日志历史中，我们可以查看过去的内容日志。

过去的内容日志一般会被保存在下面的位置：

- **Windows UWP**：`%LocalAppData%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe`；
- **Android** ：`*root storage location*/games/com.mojang/logs`；
- **iOS** ：`*root storage location*/Minecraft/game/com.mojang/logs`

### 查看与复制坐标

我们可以通过下面的步骤开启查看与复制坐标的功能：

1. 进入游戏设置/创建者；
2. 将「启用复制坐标UI」选项启用。

接下来，我们就可以通过聊天栏上方来获取并复制当前/方块坐标了。


## 原版附加包

Minecraft 中的一些原版游戏内容就是基于附加包实现的，而 Mojang 则为基岩版开发者提供了原版的附加包范例，通过这些范例，我们可以轻松的获取一些原版的资源：

- [Bedrock Dev](https://bedrock.dev/zh/packs)：提供了比较全的原版附加包模板，1.19.40.24 前的版本均可以直接下载；
- [Github](https://github.com/Mojang/bedrock-samples)：这里有官方提供的原版附加包模板，然而 Github 可能在部分地区无法访问。

## 开发文档、教程和博文

在网络上散落着许多关于附加包开发的教程和博文，我们可以自行查阅。

## 小结

在安装了对应平台的开发工具，并且了解了游戏内置的开发工具后，我们的开发之旅就可以正式开始了。


[^1]: [Content Error Log - Microsoft Learn](https://learn.microsoft.com/en-us/minecraft/creator/documents/contenterrorlog?view=minecraft-bedrock-stable)
