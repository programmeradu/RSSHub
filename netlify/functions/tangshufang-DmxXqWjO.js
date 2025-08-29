import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i={path:`/:category?`,categories:[`new-media`],example:`/tangshufang`,parameters:{category:`分类，见下表，默认为首页`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`tangshufang.com/:category`,`tangshufang.com/`]}],name:`分类`,maintainers:[`nczitzk`],handler:a,description:`| 首页 | 老唐实盘 | 书房拾遗 | 理念 & 估值 | 经典陪读 | 财务套利 |
| ---- | -------- | -------- | ----------- | -------- | -------- |
|      | shipan   | wenda    | linian      | peidu    | taoli    |

| 企业分析 | 白酒企业 | 腾讯控股 | 分众传媒 | 海康威视 | 其他企业 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| qiye     | baijiu   | tengxun  | fenzhong | haikang  | qita     |

| 核心五篇 | 读者投稿 | 读书随笔 | 财报浅析 | 出行游记 | 巴芒连载 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| hexin    | tougao   | suibi    | caibao   | youji    | bamang   |`};async function a(i){let a=i.req.param(`category`)??``,o=i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`)):10,s=`https://www.tangshufang.com${a?`/${a}`:``}`,c=await n({method:`get`,url:s}),l=r(c.data),u=l(`article`).slice(0,o).toArray().map(e=>{e=l(e);let n=e.find(`h2 a`);return{title:n.text(),link:n.attr(`href`),pubDate:t(e.find(`time`).text())}});return u=await Promise.all(u.map(t=>e.tryGet(t.link,async()=>{let e=await n({method:`get`,url:t.link}),i=r(e.data);return t.description=i(`.wxsyncmain`).html(),t.category=i(`a[rel="category tag"]`).toArray().map(e=>i(e).text()),t}))),{title:l(`title`).text(),link:s,item:u}}export{i as route};
//# sourceMappingURL=tangshufang-DmxXqWjO.js.map