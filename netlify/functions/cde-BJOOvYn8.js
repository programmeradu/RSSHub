import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{utils_default as r}from"./utils-BzhgN1z8.js";import{load as i}from"cheerio";const a={news:`https://www.cde.org.cn/main/news/listpage/545cf855a50574699b46b26bcb165f32`,policy:`https://www.cde.org.cn/main/policy/listpage/9f9c74c73e0f8f56a8bfbc646055026d`},o={news:{zwxw:`getList`,ywdd:`getHotNewsList`,tpxw:`getPictureNewsList`,gzdt:`getWorkList`},policy:{flfg:`getPolicyList`,zxgz:`getRuleList`}},s={news:{zwxw:`政务新闻`,ywdd:`要闻导读`,tpxw:`图片新闻`,gzdt:`工作动态`},policy:{flfg:`法律法规`,zxgz:`政策规章`}},c={news:{zwxw:{pageSize:25,pageNum:1,classId:`545cf855a50574699b46b26bcb165f32`},ywdd:{pageSize:25,pageNum:1,ishot:1},tpxw:{pageSize:25,pageNum:1},gzdt:{pageSize:25,pageNum:1,classId:`8dc6aac86eb083759b1e01615617a347`}},policy:{flfg:{pageNum:1,pageSize:25,fclass:0,keyName:`TITLE`,logicC:`bh`},zxgz:{pageNum:1,pageSize:25,fclass:0,keyName:`TITLE`,logicC:`bh`}}},l={path:`/:channel/:category`,categories:[`government`],example:`/cde/news/gzdt`,parameters:{channel:`频道`,category:`类别`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`首页`,maintainers:[`Fatpandac`],handler:u,description:`-   频道

| 新闻中心 | 政策法规 |
| :------: | :------: |
|   news   |  policy  |

  -   类别

| 新闻中心 | 政务新闻 | 要闻导读 | 图片新闻 | 工作动态 |
| :------: | :------: | :------: | :------: | :------: |
|          |   zwxw   |   ywdd   |   tpxw   |   gzdt   |

| 政策法规 | 法律法规 | 中心规章 |
| :------: | :------: | :------: |
|          |   flfg   |   zxgz   |`};async function u(l){let u=l.req.param(`channel`),d=l.req.param(`category`);c[u][d].pageSize=l.req.param(`limit`)??25;let f=`${r.rootUrl}/main/${u}/${o[u][d]}`,p=await n({method:`post`,url:f,headers:{cookie:await r.getCookie(l)},form:c[u][d]}),m=p.data.data,h=m.records.map(e=>{let t={news:`${r.rootUrl}/main/${e.isPic?`newspic/view/`:`news/viewInfoCommon/`}${e.newsIdCode}`,policy:`${r.rootUrl}/main/${e.regulatIdCODE?`policy/regulatview/${e.regulatIdCODE}`:`policy/view/${e.policyIdCODE}`}`};return{title:e.title,link:t[u]}}),g=await Promise.all(h.map(a=>e.tryGet(a.link,async()=>{let e=await n(a.link,{headers:{cookie:await r.getCookie(l)}}),o=i(e.data);a.pubDate=t(o(`div.news_detail_date`).text(),`YYYYMMDD`);let s=o(`div.news_detail_box`),c=s.find(`div.news_detail_title`).remove().end(),u=c.find(`div.news_detail_date`).remove().end(),d=u.find(`img`).remove().end();return a.description=d.html(),a})));return{title:`${r.title} - ${s[u][d]}`,link:a[u],item:g}}export{l as route};
//# sourceMappingURL=cde-BJOOvYn8.js.map