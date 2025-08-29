import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./render-CxhTJIsl.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import"./got-CdvI2yKX.js";import{ProcessThreads as t,apiRootUrl as n,rootUrl as r,types as i}from"./utils-BHXgz0H0.js";const a={path:`/category/:id?/:type?/:order?`,categories:[`bbs`],example:`/1point3acres/category/h1b`,parameters:{id:`标签 id，默认为全部`,type:`帖子分类, 见下表，默认为 hot，即热门帖子`,order:`排序方式，见下表，默认为空，即最新回复`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`instant.1point3acres.com/section/:id`,`instant.1point3acres.com/`]}],name:`标签`,maintainers:[`nczitzk`],handler:o,description:`::: tip
  更多标签可以在 [标签列表](https://instant.1point3acres.com/tags) 中找到。
:::

  分类

| 热门帖子 | 最新帖子 |
| -------- | -------- |
| hot      | new      |

  排序方式

| 最新回复 | 最新发布 |
| -------- | -------- |
|          | post     |`};async function o(a){let o=a.req.param(`id`)??``,s=a.req.param(`type`)??`hot`,c=a.req.param(`order`)??``,l=a.req.query(`limit`)?Number.parseInt(a.req.query(`limit`)):10,u=`${r}${o?`/category/${o}`:``}`,d=`${n}/api${o?`/tags/${o}/`:``}threads?type=${s}&includes=tags,forum_name,summary&ps=${l}&pg=1&order=${c===``?``:`time_desc`}&is_groupid=1`;return{title:`一亩三分地 - ${o}${i[s]}`,link:u,item:await t(e.tryGet,d,c)}}export{a as route};
//# sourceMappingURL=category-QIyvjdgU.js.map