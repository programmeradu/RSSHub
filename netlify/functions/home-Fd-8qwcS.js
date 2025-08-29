import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a=`https://www.qztc.edu.cn/`,o={path:`/home/:type`,categories:[`university`],example:`/qztc/home/2093`,parameters:{type:`分类，见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`首页`,maintainers:[`iQNRen`],url:`www.qztc.edu.cn`,handler:s,radar:[{source:[`www.qztc.edu.cn/:type/list.htm`],target:`/home/:type`}],description:`| 板块 | 参数 |
| ------- | ------- |
| 泉师新闻 | 2093 |
| 通知公告 | 2094 |
| 采购公告 | 2095 |
| 学术资讯 | xszx |
| 招聘信息 | 2226 |
`};async function s(o){let s=o.req.param(`type`),c=await n(a+s+`/list.htm`),l=i(c),u=l(`.news.clearfix`).toArray().map(e=>{let n=l(e),i=n.find(`a`);try{let e=i.attr(`title`)||``,o=i.attr(`href`);o?o.startsWith(`http`)||(o=a.slice(0,-1)+o):o=``;let s=r(t(n.find(`.news_meta`).text()),8);return{title:e,link:o,pubDate:s}}catch{return{title:``,link:``,pubDate:Date.now()}}}).filter(e=>e.title&&e.link),d=await Promise.all(u.map(t=>e.tryGet(t.link,async()=>{let e={...t,description:``},r=await n(t.link),a=i(r);return e.description=a(`.wp_articlecontent`).html()||``,e})));return{title:l(`head > title`).text()+` - 泉州师范学院-首页`,link:a+s+`/list.htm`,item:d}}export{o as route};
//# sourceMappingURL=home-Fd-8qwcS.js.map