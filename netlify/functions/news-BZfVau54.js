import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import{parseDate as r}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as i}from"./got-CdvI2yKX.js";import a from"node:path";t();const o={focus:{tc:`要聞`,sc:`要闻`},instant:{tc:`快訊`,sc:`快讯`},local:{tc:`港澳`,sc:`港澳`},greaterchina:{tc:`兩岸`,sc:`两岸`},world:{tc:`國際`,sc:`国际`},finance:{tc:`財經`,sc:`财经`},sports:{tc:`體育`,sc:`体育`},parliament:{tc:`法庭`,sc:`法庭`},weather:{tc:`天氣`,sc:`天气`}},s={path:`/news/:category?/:language?`,categories:[`traditional-media`],example:`/tvb/news`,parameters:{category:`分类，见下表，默认为要聞`,language:`语言，见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`tvb.com/:language/:category`,`tvb.com/`]}],name:`新闻`,maintainers:[`nczitzk`],handler:c,description:`分类

| 要聞  | 快訊    | 港澳  | 兩岸         | 國際  | 財經    | 體育   | 法庭       | 天氣    |
| ----- | ------- | ----- | ------------ | ----- | ------- | ------ | ---------- | ------- |
| focus | instant | local | greaterchina | world | finance | sports | parliament | weather |

  语言

| 繁 | 简 |
| -- | -- |
| tc | sc |`};async function c(t){let s=t.req.param(`category`)??`focus`,c=t.req.param(`language`)??`tc`,l=`https://inews-api.tvb.com`,u=`${l}/news/entry/category`,d=`${l}/${c}/${s}`,f=await i({method:`get`,url:u,searchParams:{id:s,lang:c,page:1,limit:t.req.query(`limit`)??50,country:`HK`}}),p=f.data.content.map(t=>({title:t.title,link:`https://news.tvb.com/${c}/${s}/${t.id}`,pubDate:r(t.publish_datetime),category:[...t.category.map(e=>e.title),...t.tags],description:n(a.join(e,`templates/description-7d8aec1a.art`),{description:t.desc,images:t.media.image?.map(e=>e.thumbnail.replace(/_\d+x\d+\./,`.`))??[]})}));return{title:`${f.data.meta.title} - ${o[s][c]}`,link:d,item:p}}export{s as route};
//# sourceMappingURL=news-BZfVau54.js.map