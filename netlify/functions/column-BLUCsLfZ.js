import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import"./timezone-BrNu6iXe.js";import{baseUrl as n,parseItem as r,parseList as i}from"./utils-CNTj_sIn.js";import{load as a}from"cheerio";const o={path:`/column/:columnId`,categories:[`game`],example:`/indienova/column/52`,parameters:{columnId:`专题 ID，可在 URL中找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`indienova.com/column/:columnId`]}],name:`专题`,maintainers:[`TonyRL`],handler:s,description:`<details>
<summary>专题 ID</summary>

    游戏推荐

| itch 一周游戏汇 | 一周值得关注的发售作品 | 诺娃速递 | 周末游戏视频集锦 | 每月媒体评分 | 年度最佳游戏 | Indie Focus 近期新游 | indienova Picks 精选 |
| --------------- | ---------------------- | -------- | ---------------- | ------------ | ------------ | -------------------- | -------------------- |
| 52              | 29                     | 41       | 43               | 45           | 39           | 1                    | 8                    |

    游戏评论

| 游必有方 Podcast | 独立游戏潮（RED） |
| ---------------- | ----------------- |
| 6                | 3                 |

    游戏开发

| 游戏设计模式 | Roguelike 开发 | GMS 中文教程 |
| ------------ | -------------- | ------------ |
| 15           | 14             | 7            |

    游戏设计

| 游戏与所有 | 让人眼前一亮的游戏设计 | 游戏音乐分析 | 游戏情感设计 | 游戏相关书籍 | 游戏设计课程笔记 | 游戏设计工具 | 游戏设计灵感 | 设计师谈设计 | 游戏研究方法 | 功能游戏 | 游戏设计专业院校 | 像素课堂 |
| ---------- | ---------------------- | ------------ | ------------ | ------------ | ---------------- | ------------ | ------------ | ------------ | ------------ | -------- | ---------------- | -------- |
| 10         | 33                     | 17           | 4            | 22           | 11               | 24           | 26           | 27           | 28           | 38       | 9                | 19       |

    游戏文化

| NOVA 海外独立游戏见闻 | 工作室访谈 | indie Figure 游戏人 | 游戏艺术家 | 独立游戏音乐欣赏 | 游戏瑰宝 | 电脑 RPG 游戏史 | ALT. CTRL. GAMING |
| --------------------- | ---------- | ------------------- | ---------- | ---------------- | -------- | --------------- | ----------------- |
| 53                    | 23         | 5                   | 44         | 18               | 21       | 16              | 2                 |

    Game Jam

| Ludum Dare | Global Game Jam |
| ---------- | --------------- |
| 31         | 13              |
</details>`};async function s(o){let s=o.req.param(`columnId`),{data:c,url:l}=await t(`${n}/column/${s}`),u=a(c),d=i(u),f=await Promise.all(d.map(t=>e.tryGet(t.link,()=>r(t))));return{title:u(`head title`).text(),link:l,item:f}}export{o as route};
//# sourceMappingURL=column-BLUCsLfZ.js.map