import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./render-CxhTJIsl.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{invalid_parameter_default as i}from"./invalid-parameter-CUJdROXf.js";import{isValidHost as a}from"./valid-host-DEPw8oAS.js";import{parseArticle as o}from"./utils-Dh7TLRXa.js";import{load as s}from"cheerio";const c={path:`/:column/:category`,categories:[`traditional-media`],example:`/caixin/finance/regulation`,parameters:{column:`栏目名`,category:`栏目下的子分类名`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!0,supportScihub:!1},name:`新闻分类`,maintainers:[`idealclover`],handler:l,description:`Column 列表：

| 经济    | 金融    | 政经  | 环科    | 世界          | 观点网  | 文化    | 周刊   |
| ------- | ------- | ----- | ------- | ------------- | ------- | ------- | ------ |
| economy | finance | china | science | international | opinion | culture | weekly |

  以金融板块为例的 category 列表：（其余 column 以类似方式寻找）

| 监管       | 银行 | 证券基金 | 信托保险         | 投资       | 创新       | 市场   |
| ---------- | ---- | -------- | ---------------- | ---------- | ---------- | ------ |
| regulation | bank | stock    | insurance_trust | investment | innovation | market |

  Category 列表：

| 封面报道   | 开卷  | 社论      | 时事             | 编辑寄语     | 经济    | 金融    | 商业     | 环境与科技              | 民生    | 副刊   |
| ---------- | ----- | --------- | ---------------- | ------------ | ------- | ------- | -------- | ----------------------- | ------- | ------ |
| coverstory | first | editorial | current_affairs | editor_desk | economy | finance | business | environment_technology | cwcivil | column |`};async function l(c){let l=c.req.param(`category`),u=c.req.param(`column`),d=`https://${u}.caixin.com/${l}`;if(!a(u))throw new i(`Invalid column`);let f=await n(d),p=s(f.data),m=p(`head title`).text(),h=JSON.parse(p(`script`).text().match(/var entity = ({.*?})/)[1]),{data:{datas:g}}=await n(`https://gateway.caixin.com/api/extapi/homeInterface.jsp`,{searchParams:{subject:h.id,type:0,count:c.req.query(`limit`)?Number.parseInt(c.req.query(`limit`)):25,picdim:`_266_177`,start:0}}),_=g.map(e=>({title:e.desc,description:e.summ,link:e.link.replace(`http://`,`https://`),pubDate:r(t(e.time),8),category:e.keyword.split(` `),audio:e.audioUrl,audio_image_url:e.pict.imgs[0].url})),v=await Promise.all(_.map(t=>e.tryGet(t.link,()=>o(t))));return{title:m,link:d,description:`财新网 - 提供财经新闻及资讯服务`,item:v}}export{c as route};
//# sourceMappingURL=category-DGUsWpo5.js.map