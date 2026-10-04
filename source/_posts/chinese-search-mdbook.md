---
title: 在 mdBook 中启用中文搜索
date: 2026/10/4
---

> 被 Mdbook 灾难性的中文搜索支持逼疯了，遂写此文。

首先介绍一下什么是 mdBook：

**mdBook** 是一个命令行工具和 Rust crate，用于使用 Markdown 创建书籍。

它的输出类似于 Gitbook 等工具，非常适合创建产品或 API 文档、教程、课程材料或任何需要干净、易于导航和可自定义的演示文稿的内容。

**但是 mdBook 的搜索功能默认不支持中文！**下面的教程将会简述如何让 mdBook 支持中文搜素。

首先，在`assets`目录下创建一个`elasticlunr.js`：

```js
/**
 * @see https://github.com/HillLiu/docker-mdbook
 */
window.elasticlunr.Index.load = (index) => {
  const FzF = window.fzf.Fzf;
  const storeDocs = index.documentStore.docs;
  const indexArr = Object.keys(storeDocs);
  const ofzf = new FzF(indexArr, {
    selector: (item) => {
      const res = storeDocs[item];
      res.text = `${res.title}${res.breadcrumbs}${res.body}`;
      return res.text;
    },
  });
  return {
    search: (searchterm) => {
      const entries = ofzf.find(searchterm);
      return entries.map((data) => {
        const { item, score } = data;
        return {
          doc: storeDocs[item],
          ref: item,
          score,
        };
      });
    },
  };
};
```

随后，获取 fzf 的 umd 格式的源文件，将其放在`assets`目录下。

> 例如，在 https://cdn.jsdelivr.net/npm/fzf@0.5.2/dist/fzf.umd.js 即可获取所需的 JS 文件

最后，在`book.toml`中加入：

```toml
[output.html]
additional-js = ["assets/js/elasticlunr.js", "assets/js/fzf.umd.js"]
```

就成功了！

~~这个解决方法在国内搜索引擎上面搜不到，只有一个知乎回答提了一嘴，最后是笔者在一个日文 mdBook 存储库里找到的详细解决方案。。。~~