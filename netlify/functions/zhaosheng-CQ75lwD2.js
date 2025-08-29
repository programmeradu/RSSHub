import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i={path:`/yjsy/zhaosheng/:id?`,categories:[`university`],example:`/sdust/yjsy/zhaosheng`,parameters:{id:`栏目 id，见下表，默认为通知公告`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`研究生招生网`,maintainers:[`nczitzk`],handler:a,description:`栏目

| 招生简章 | 专业目录 | 往届录取 | 管理规定 | 资料下载 |
| -------- | -------- | -------- | -------- | -------- |
| zsjz     | zyml     | wjlq     | glgd     | zlxz     |

| 通知公告 | 博士招生 | 硕士招生 | 推免生招生 | 招生宣传 |
| -------- | -------- | -------- | ---------- | -------- |
| tzgg     | bszs     | sszs     | tms        | zsxc     |`};async function a(i){let a=i.req.param(`id`)??`tzgg`,o=`https://yjsy.sdust.edu.cn/zhaosheng/${a}.htm`,s=await n({method:`get`,url:o}),c=r(s.data),l=c(`.pageUl ul li a`).toArray().map(e=>(e=c(e),{title:e.attr(`title`),link:new URL(e.attr(`href`),o).href,pubDate:t(e.find(`span`).text())}));return l=await Promise.all(l.map(t=>e.tryGet(t.link,async()=>{let e=await n({method:`get`,url:t.link}),i=r(e.data);return t.description=i(`.txt, .v_news_content`).html(),t}))),{title:c(`title`).text(),link:o,item:l}}export{i as route};
//# sourceMappingURL=zhaosheng-CQ75lwD2.js.map