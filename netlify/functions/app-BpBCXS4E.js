import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import s from"node:path";import{load as c}from"cheerio";t();const l={path:`/app/:column?`,categories:[`traditional-media`],example:`/gzdaily/app/74`,parameters:{column:`栏目 ID，点击对应栏目后在地址栏找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`客户端`,maintainers:[`TimWu007`],handler:u,description:`::: tip
  在北京时间深夜可能无法获取内容。
:::

  常用栏目 ID：

| 栏目名 | ID   |
| ------ | ---- |
| 首页   | 74   |
| 时局   | 374  |
| 广州   | 371  |
| 大湾区 | 397  |
| 城区   | 2980 |`};async function u(t){let l=t.req.param(`column`)??74,u=`https://app.gzdaily.cn/app_if/getArticles?columnId=${l}&page=1`,{data:d}=await a(u),f=d.list.filter(e=>e.newstype===0).map(t=>({title:t.title,description:r(s.join(e,`templates/description-081ee31d.art`),{thumb:t.picBig}),pubDate:o(i(t.publishtime),8),link:t.shareUrl,colName:t.colName,author:t.arthorName})),p=``,m=await Promise.all(f.map(e=>n.tryGet(e.link,async()=>{let t=await a({method:`get`,url:e.link}),n=c(t.data);return p=p===``?e.colName:p,n(`.abstract`).text()&&(n(`.abstract`).find(`span`).remove(),e.description+=`<blockquote>`+n(`.abstract`).text()+`</blockquote>`),e.description+=n(`.article`).html()??``,e})));return{title:`广州日报客户端 - ${p}`,link:`https://www.gzdaily.cn/amucsite/web/index.html#/home/${l}`,item:m}}export{l as route};
//# sourceMappingURL=app-BpBCXS4E.js.map