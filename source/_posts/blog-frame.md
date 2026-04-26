---
title: Frame 使用心得
topic: hy2
date: 2026/4/26
tags: [技术, 杂谈]
---
> 本文的教程来自于 Frame 的 README 文档，按照 MIT 协议授权。

总而言之，我已经将荒废了几个月的博客迁移到了 hexo-theme-frame 上面。

![cover](https://clio-space-1300725494.cos.ap-guangzhou.myqcloud.com/frame/featured_img/hexo_cover.jpg) 
  
Frame 是一个极简风格的 hexo 主题。Frame 的主题设计如同一个简洁优雅的画框，适合用来展示你的个人博客或者作品集。
 
与我之前使用的主题不同，Frame 简洁、设计感强，也更加符合我的审美，了。

美中不足的是，作者已经很久没发布新 Release 了，导致其缺少了一些功能（比如深色模式切换）。
 
## 开始使用 
### 安装 
  
请在你的 hexo 项目主题文件夹下安装 Frame： 
  
 ``` 
 # go to your hexo theme folder 
 cd themes 
  
 # clone the project 
 git clone https://github.com/zoeingwingkei/frame.git 
 ``` 
  
### 主题配置 
  
 在 hexo 项目的 `config.yml` 文件里， 将你的项目主题换成 Frame: 
  
``` 
theme: frame 
``` 
  

  
## 主题色 
  
Frame 提供三种不同的主题色：Default 默认，Classic 经典和 Dark 暗色。 
  
 ![color mode](https://clio-space-1300725494.cos.ap-guangzhou.myqcloud.com/frame/featured_img/color_mode.jpg) 
  
你可以在 `frame` 主题文件夹下面的 `config.yml` 文件修改主题色的配置： 
  
``` 
# color mode: default / classic / dark 
 color_mode: classic 
``` 
  
## Gallery 模式 
  
在 `gallery` 视图模式下，文章会连同封面图和标签一起展示。只需将你的文章加入到 `gallery` 这个分类里即可。 
  
``` 
categories: 
- [gallery] 
``` 

文章的封面图链接需要写在 `markdown` 文件的 [Front-matter](https://hexo.io/zh-cn/docs/front-matter) 里： 
  
``` 
featured_image: /path/to/your/image.jpg  
``` 
  
## 博客主页 
  
默认情况下，你的主页会展示标题，正文，一些链接以及一个封面图。你可以在主题文件夹下的 `config.yml` 文件里修改这些配置：  
  
``` 
# profile 
profile: 
  title: Your profile title. 
  body: Your profile body 
  image: /path/to/your/image.jpg    
  links: 
    Blogs: /archive/ 
    Resume: /path/to/your/resume.pdf 
    Projects: /categories/gallery/ 
 ``` 
  
如果你想要进一步个性化你的个人主页，请到 `frame/layout/pages/profile.ejs` 里修改你的主页结构和风格，在此祝你设计愉快 🙌 
  
## 标签页 
  
网站的 `/tag/` 页面会列出这个博客里所有的标签。在此之前你需要新建一个名为 `tag` 的 hexo 页面。 
  
``` 
hexo new page tag 
``` 
  
然后，在 `source/tag/index.md` 文件下, 输入以下申明: 

``` 
 --- 
 title: '''tag''' 
 layout: tag 
 --- 
``` 
  
## 配置项   
### 页头 
  
主题的页头由网站 Logo 和菜单栏组成，你可以在主题文件夹下的 `config.yml` 文件里修改这些配置。在默认的状态下，网站 Logo 为你的网站名，你也可以自行上传图片作为你的网站 Logo。 
  
``` 
 # header 
 site_brand_name: Frame. 
  
 logo_image: 
   enable: true 
   image_path: /logo.png # path to your logo image 
  
 menu: 
   Home: / 
   Archive: /archives/ 
   Gallery: /categories/gallery/ 
   About: /about/ 
 ``` 
  
### 页脚 
  
同样的，你可以在 `config.yml` 文件里修改页脚的配置：  
  
``` 
 # footer 
 footer: 
   copyright_info: 
     enable: true 
     author: © Your name 
  
   powered_by: # Powered by Hexo & Frame 
     enable: true 
  
   other_info: 
     enable: true 
     content: Customized content. 
``` 
  
### 网站图标 
  
你可以在 `frame/source/` 文件夹里添加你的网站图标，然后在 `config.yml` 里添加这个图标的路径： 
  
``` 
# favicon 
favicon: /favicon.ico 
``` 
  
### 数学公式 
  
如果你需要在你的博客里书写数学公式，那么你需要在 `config.yml` 文件里开启 [MathJax](*https://github.com/hexojs/hexo-math*) 工具： 
  
``` 
mathjax_enable: true 
``` 
注意：如果你还未安装 hexo 的数学公式插件，你需要先将其安装在你的 hexo 项目里： 
  
``` 
npm i hexo-math --save 
``` 
  
### 评论系统 
  
 Frame 现在支持的第三方评论系统有：[valine](https://valine.js.org/) 和 [disqus](https://disqus.com/)。详细的用法介绍请参考[这篇文章](https://zoeingwingkei.github.io/frame-demo-site/2021/11/11/comment/)。 
  
### 本地搜索 
  
 Frame 现在支持使用 [hexo-generator-searchdb](https://github.com/theme-next/hexo-generator-searchdb) 的本地搜索功能。详细的用法介绍请参考[这篇文章](https://zoeingwingkei.github.io/frame-demo-site/2022/08/05/local-search/)。 
 