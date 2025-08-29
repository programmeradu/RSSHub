import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./render-CxhTJIsl.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{getData as n,processItems as r,rootUrl as i}from"./util-IzpZM47K.js";const a={path:`/rank/:category?`,categories:[`new-media`],example:`/xinpianchang/rank`,parameters:{category:"分类 id，可在对应排行榜页 URL 中找到，见下表，默认为 `all` ，即总榜"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`排行榜`,maintainers:[`nczitzk`],handler:o,description:`| 分类     | id         |
| -------- | ---------- |
| 总榜     | all        |
| 精选榜   | staffPicks |
| 广告     | ad         |
| 宣传片   | publicity  |
| 创意     | creative   |
| 干货教程 | backstage  |`};async function o(a){let{category:o=`all`}=a.req.param(),s=a.req.query(`limit`)?Number.parseInt(a.req.query(`limit`),10):60,c=new URL(`api/xpc/v2/rank/${o}`,i).href,{data:l}=await t(c),u=l.data.list[0],d=u.web_link,f=`${u.code}-${u.year}-${u.index}`,{data:p,response:m}=await n(d,e.tryGet),h=m.match(/\/static\/(\w+)\/_buildManifest\.js/)[1],g=new URL(`_next/data/${h}/rank/article/${f}.json`,i).href,{data:_}=await t(g),v=_.pageProps.rankList;return v=await r(v.slice(0,s),e.tryGet),{...p,item:v}}export{a as route};
//# sourceMappingURL=rank-CWqkflos.js.map