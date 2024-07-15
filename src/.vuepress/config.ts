import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "猫的碎碎念",
  description: "年年岁岁花相似，岁岁年年人碎碎",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
