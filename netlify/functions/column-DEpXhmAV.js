import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import{parseDate as r}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as i}from"./got-CdvI2yKX.js";import a from"node:path";t();const o={path:`/:column`,categories:[`multimedia`],example:`/cntv/TOPC1451528971114112`,parameters:{column:`栏目ID, 可在对应CNTV栏目页面找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`navi.cctv.com/`]}],name:`栏目`,maintainers:[`WhoIsSure`,`Fatpandac`],handler:s,url:`navi.cctv.com/`,description:`::: tip
栏目 ID 查找示例:
打开栏目具体某一期页面，F12 控制台输入\`column_id\`得到栏目 ID。
:::

  栏目

| 新闻联播             | 新闻周刊             | 天下足球             |
| -------------------- | -------------------- | -------------------- |
| TOPC1451528971114112 | TOPC1451559180488841 | TOPC1451551777876756 |`};async function s(t){let o=t.req.param(`column`),s=Number.isNaN(Number.parseInt(t.req.query(`limit`)))?25:Number.parseInt(t.req.query(`limit`)),c=await i({method:`get`,url:`https://api.cntv.cn/NewVideo/getVideoListByColumn?id=${o}&n=${s}&sort=desc&p=1&mode=0&serviceId=tvcctv`}),l=c.data.data.list,u=l[0].title.match(/《(.*?)》/)[1];return{title:`CNTV 栏目 - ${u}`,description:`${u} 栏目的视频更新`,item:l.map(t=>({title:t.title,description:n(a.join(e,`templates/column-49f236d2.art`),{item:t}),pubDate:r(t.time),link:t.url}))}}export{o as route};
//# sourceMappingURL=column-DEpXhmAV.js.map