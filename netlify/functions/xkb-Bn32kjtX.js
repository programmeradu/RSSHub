import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import s from"node:path";t();const c={path:`/:channel`,categories:[`traditional-media`],example:`/xkb/350`,parameters:{channel:`栏目 ID，点击对应栏目后在地址栏找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`新闻`,maintainers:[`TimWu007`],handler:l,description:`常用栏目 ID：

| 栏目名 | ID  |
| ------ | --- |
| 首页   | 350 |
| 重点   | 359 |
| 广州   | 353 |
| 湾区   | 360 |
| 天下   | 355 |`};async function l(t){let c=t.req.param(`channel`)??350,l=`https://www.xkb.com.cn/xkbapp/fundapi/article/api/articles?chnlId=${c}&visibility=1&page=0&size=20&keyword=`,{data:u}=await a({method:`get`,url:l,headers:{siteId:35}}),d=u.data.filter(e=>e.contentUrl).map(t=>({title:t.listTitle,description:r(s.join(e,`templates/description-081ee31d.art`),{thumb:t.shareImg}),pubDate:o(i(t.operTime),8),link:`https://www.xkb.com.cn/detail?id=`+t.id,contentUrl:t.contentUrl,author:t.metaInfo.author,chnlName:t.metaInfo.chnlName})),f=``,p=await Promise.all(d.map(e=>n.tryGet(e.contentUrl,async()=>{let t=await a({method:`get`,url:e.contentUrl});return e.description+=t.data.htmlContent??``,f=f===``?e.chnlName:f,e})));return{title:`新快报新快网 - ${f}`,link:`https://www.xkb.com.cn/home?id=${c}`,item:p}}export{c as route};
//# sourceMappingURL=xkb-Bn32kjtX.js.map