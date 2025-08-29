import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import o from"node:path";import{load as s}from"cheerio";t();const c={article:2,report:3,visualization:4},l={path:`/dt/:column?/:category?`,categories:[`traditional-media`],example:`/yicai/dt/article`,parameters:{column:`栏目，见下表，默认为文章`,category:`分类，见下表，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`DT 财经`,maintainers:[`nczitzk`],handler:u,description:`#### [文章](https://dt.yicai.com/article)

| 分类     | ID         |
| -------- | ---------- |
| 全部     | article/0  |
| 新流行   | article/31 |
| 新趋势   | article/32 |
| 商业黑马 | article/33 |
| 新品     | article/34 |
| 营销     | article/35 |
| 大公司   | article/36 |
| 城市生活 | article/38 |

#### [报告](https://dt.yicai.com/report)

| 分类       | ID        |
| ---------- | --------- |
| 全部       | report/0  |
| 人群观念   | report/9  |
| 人群行为   | report/22 |
| 美妆个护   | report/23 |
| 3C 数码    | report/24 |
| 营销趋势   | report/25 |
| 服饰鞋包   | report/27 |
| 互联网     | report/28 |
| 城市与居住 | report/29 |
| 消费趋势   | report/30 |
| 生活趋势   | report/37 |

#### [可视化](https://dt.yicai.com/visualization)

| 分类     | ID               |
| -------- | ---------------- |
| 全部     | visualization/0  |
| 新流行   | visualization/39 |
| 新趋势   | visualization/40 |
| 商业黑马 | visualization/41 |
| 新品     | visualization/42 |
| 营销     | visualization/43 |
| 大公司   | visualization/44 |
| 城市生活 | visualization/45 |`};async function u(t){let{column:l=`article`,category:u=`0`}=t.req.param(),d=t.req.query(`limit`)?Number.parseInt(t.req.query(`limit`),10):30,f=`https://dt.yicai.com`,p=new URL(`api/getNewsList`,f).href,m=new URL(l,f).href,{data:h}=await a(p,{searchParams:{page:1,rid:c[l],cid:u,pageSize:d}}),g=h.data.data.slice(0,d).map(t=>{let n=t.originVideo,a=n.split(/\./).pop();return{title:t.newstitle,link:new URL(t.url,f).href,description:r(o.join(e,`templates/description-f5a5346e.art`),{image:{src:t.originPic,alt:t.newstitle},intro:t.newsnotes}),author:t.creatername,category:[t.channelrootname,t.channelname,t.NewsTypeName].filter(Boolean),guid:`yicai-dt-${t.newsid}`,pubDate:i(t.utc_createdate),updated:i(t.utc_lastdate),enclosure_url:n,enclosure_type:n?`${a===`mp4`?`video`:`application`}/${a}`:void 0,upvotes:t.newsscore??0}});g=await Promise.all(g.map(t=>n.tryGet(t.link,async()=>{let{data:n}=await a(t.link),i=s(n);return i(`div.logintips`).remove(),i(`img`).each((t,n)=>{n=i(n),i(n).replaceWith(r(o.join(e,`templates/description-f5a5346e.art`),{image:{src:n.prop(`data-original`)??n.prop(`src`),alt:n.prop(`alt`),width:n.prop(`width`),height:n.prop(`height`)}}))}),t.description+=r(o.join(e,`templates/description-f5a5346e.art`),{description:i(`div.txt`).html()}),t.author=i(`div.authortime h3`).text(),t})));let{data:_}=await a(m),v=s(_),y=v(`title`).text(),b=v(`div.logo a img`).prop(`src`),x=new URL(v(`link[rel="shortcut icon"]`).prop(`href`),f).href;return{item:g,title:`${v(`a[data-cid="${u}"]`).text()}${y}`,link:m,description:v(`meta[name="keywords"]`).prop(`content`),language:`zh`,image:b,icon:x,logo:x,subtitle:v(`meta[name="description"]`).prop(`content`),author:y.split(/_/).pop(),allowEmpty:!0}}export{l as route};
//# sourceMappingURL=dt-Dmy56j8H.js.map