import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import{config as n}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./proxy-D7ccvALx.js";import{cache_default as r}from"./cache-kimkMTWJ.js";import{art as i}from"./render-CxhTJIsl.js";import{parseDate as a}from"./parse-date-Bgabdhlb.js";import{puppeteer_default as o}from"./puppeteer-f0D6AISB.js";import s from"node:path";import{load as c}from"cheerio";t();const l={path:`/:province?`,categories:[`study`],example:`/chinadegrees/11`,parameters:{province:"省市代号，见下表，亦可在 [这里](http://www.chinadegrees.com.cn/help/provinceSwqk.html) 找到，默认为 `11`"},features:{requireConfig:!1,requirePuppeteer:!0,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`各学位授予单位学位证书上网进度`,description:`| 省市             | 代号 |
| ---------------- | ---- |
| 北京市           | 11   |
| 天津市           | 12   |
| 河北省           | 13   |
| 山西省           | 14   |
| 内蒙古自治区     | 15   |
| 辽宁省           | 21   |
| 吉林省           | 22   |
| 黑龙江省         | 23   |
| 上海市           | 31   |
| 江苏省           | 32   |
| 浙江省           | 33   |
| 安徽省           | 34   |
| 福建省           | 35   |
| 江西省           | 36   |
| 山东省           | 37   |
| 河南省           | 41   |
| 湖北省           | 42   |
| 湖南省           | 43   |
| 广东省           | 44   |
| 广西壮族自治区   | 45   |
| 海南省           | 46   |
| 重庆市           | 50   |
| 四川省           | 51   |
| 贵州省           | 52   |
| 云南省           | 53   |
| 西藏自治区       | 54   |
| 陕西省           | 61   |
| 甘肃省           | 62   |
| 青海省           | 63   |
| 宁夏回族自治区   | 64   |
| 新疆维吾尔自治区 | 65   |
| 台湾             | 71   |`,maintainers:[`TonyRL`],handler:u};async function u(t){let{province:l=`11`}=t.req.param(),u=`http://www.chinadegrees.com.cn/help/unitSwqk${l}.html`,d=await r.tryGet(u,async()=>{let e=await o(),t=await e.newPage();await t.setRequestInterception(!0),t.on(`request`,e=>{e.resourceType()===`document`||e.resourceType()===`script`?e.continue():e.abort()}),await t.goto(u,{waitUntil:`domcontentloaded`}),await t.waitForSelector(`.datalist`);let n=await t.evaluate(()=>document.documentElement.innerHTML);await e.close();let r=c(n);return{title:r(`caption`).text().trim(),items:r(`.datalist tr`).toArray().slice(1).map(e=>{e=r(e);let t=e.find(`td`).eq(1).text(),n=e.find(`td`).eq(2).text();return{title:t,pubDate:n,guid:`${t}:${n}`}}).filter(e=>e.title!==`null`)}},n.cache.routeExpire,!1),f=d.items.map(t=>(t.description=i(s.join(e,`templates/description-59ebc3d4.art`),{title:t.title,pubDate:t.pubDate}),t.pubDate=a(t.pubDate,`YYYY-MM-DD`),t));return{title:d.title,link:u,item:f}}export{l as route};
//# sourceMappingURL=province-DK9JrKK8.js.map