import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={path:`/news/:category?`,categories:[`new-media`],example:`/qm120/news`,parameters:{category:`分类，见下表，默认为健康焦点`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`qm120.com/`]}],name:`新闻`,maintainers:[`nczitzk`],handler:o,url:`qm120.com/`,description:`| 健康焦点 | 行业动态 | 医学前沿 | 法规动态 |
| -------- | -------- | -------- | -------- |
| jdxw     | hydt     | yxqy     | fgdt     |

| 食品安全 | 医疗事故 | 医药会展 | 医药信息 |
| -------- | -------- | -------- | -------- |
| spaq     | ylsg     | yyhz     | yyxx     |

| 新闻专题 | 行业新闻 |
| -------- | -------- |
| zhuanti  | xyxw     |`};async function o(a){let o=a.req.param(`category`)??`jdxw`,s=`http://www.qm120.com/news/${o}`,c=await n({method:`get`,url:s}),l=i(c.data),u=l(`.lb2boxls ul li a`).toArray().map(e=>(e=l(e),{title:e.text(),link:e.attr(`href`)}));return u=await Promise.all(u.map(a=>e.tryGet(a.link,async()=>{let e=await n({method:`get`,url:a.link}),o=i(e.data);return a.description=o(`.neirong_body`).html(),a.pubDate=r(t(o(`.neirong_head p span`).eq(1).text()),8),a}))),{title:`${l(`.zt_liebiao_tit`).text()} - 全民健康网`,link:s,item:u}}export{a as route};
//# sourceMappingURL=news-5nHAJQ1V.js.map