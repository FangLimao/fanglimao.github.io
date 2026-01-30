---
title: Pnpm与Monorepo
date: 2025/2/17
description: 如何使用Pnpm创建Monorepo
category: [技术]
references:
  - '[过滤 | Pnpm](https://pnpm.io/zh/filtering)'
  - '[pnpm-workspace.yaml | Pnpm ](https://pnpm.io/zh/pnpm-workspace_yaml)'
  - '[工作空间 | Pnpm](https://pnpm.io/zh/workspaces)'
---
## 什么是Monorepo与工作空间
**Monorepo**是一种将多个项目放在一个仓库中的开发模式，通常用于大型项目或团队协作，其可以方便地管理多个项目的依赖关系，提高开发效率，同时也可以方便地共享代码和资源。

至于将多个项目放在多个不同的仓库中的开发方式，则称之为**MultiRepo**。

**工作空间（Workspace）** 是Pnpm中的一种内置功能，一个工作空间就可以将多个项目合并到一个仓库中。

## 创建`package.json`
首先在我们仓库的根目录下创建一个`package.json`文件，写入如下内容：

```json
{
  "name": "monorepo",
  "private": true,
  "script": {}
} 
```

注意到`private`设置为了`true`，用于防止工作空间本身被意外地发布到npm。

## 创建`pnpm-workspace.yaml`
在仓库的根目录下面创建一个`pnpm-workspace.yaml`，其定义了工作空间的项目目录，也可以用于排除不需要包含在其中的目录，如：

```yaml
packages:
  # 指定根目录某一子目录中的包
  - 'app'
  # packages/ 首层子目录中的所有包
  - 'packages/*'
  # components/ 所有子目录中的所有包
  - 'components/**'
  # 排除测试目录中的包
  - '!**/test/**'

```

在这个例子中，我们定义了三个包目录，分别是：

- 根目录下的`app`目录；
- `packages`目录下的首层子目录；
- `components`目录下的所有子目录；

同时，我们排除了`test`目录下的所有包。

接下来，我们可以在`packages`目录下创建我们的项目，如：

```json
// 文件路径：packages/app-1/package.json
{
  "name": "monorepo-app-1",
  "version": "1.0.0",
  "dependencies": {
  }
}
```

```json
// 文件路径：packages/app-2/package.json
{
  "name": "monorepo-app-2",
  "version": "1.0.0",
  "dependencies": {
  }
}
```

## 安装依赖
首先是为工作空间安装依赖：

```bash
pnpm add <package-name> -w
```

`-w`参数表示为工作空间安装依赖，而不是为某个具体的包安装依赖。

然后是为某个具体的包安装依赖：

```bash
pnpm add <package-name> --filter <filiter>
```

`--filter`参数用于指定为哪个包安装依赖，如：

- `pnpm add lodash --filter monorepo-app-1`表示为`monorepo-app-1`包安装`lodash`依赖；
- `pnpm add lodash --filter "@monorepo/*"`表示为工作空间中所有以`monorepo-`开头的包安装`lodash`依赖。

具体的语法请参阅[官方文档](https://pnpm.io/zh/filtering)

##  安装内部依赖
安装工作空间中的某个包作为另一个包的依赖，与安装普通依赖类似：

```bash
pnpm add <package-name> --filter <filter> --link-workspace-packages=true
```

注意到使用了`link-workspace-packages`选项，这将会把工作空间中的包链接到当前包的`node_modules`中，而不是从注册表中下载。

我们也可以在`.npmrc`中将其设置为`true`，这样就不用每次安装的指定这个选项了:

```bash
link-workspace-packages=true
```

除此之外，我们也可以在`package.json`中通过向依赖版本号添加`workspace:`前缀来强制使其链接到工作空间中的包，如：

```json
{
  "dependencies": {
    "monorepo-app-1": "workspace:1.0.0"
  }
}
```

## 更新与卸载依赖
更新工作空间中的依赖：

```bash
pnpm update -w
```

更新某个具体的包的依赖：

```bash
pnpm update --filter <filter>
```

卸载工作空间中的依赖：

```bash
pnpm remove <package-name> -w
```

卸载某个具体的包的依赖：

```bash
pnpm remove <package-name> --filter <filter>
```

## 执行脚本
执行工作空间中所有脚本：

```bash
pnpm run <script> -r
```

> `-r`参数将从每个包的`scripts`对象中运行任意的命令；
> 
> 如果一个包没有相应的命令，将被跳过，如果没有任何的包有此命令，该命令将会执行失败。

## 发布
发布工作空间中的所有包：

```bash
pnpm publish -r
```

## 总结
Pnpm与Monorepo的结合使用，可以方便地管理多个项目的依赖关系，提高开发效率，同时也可以方便地共享代码和资源。

以下是一些常用的命令：

```bash
pnpm add <package-name> --link-workspace-packages=true
pnpm update --filter <filter>
pnpm remove <package-name> -w
pnpm remove <package-name> --filter <filter>
pnpm run <script> -r
```