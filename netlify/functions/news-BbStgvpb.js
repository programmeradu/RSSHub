import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{invalid_parameter_default as i}from"./invalid-parameter-CUJdROXf.js";import{load as a}from"cheerio";const o={path:`/suzhou/news/:uid`,categories:[`government`],example:`/gov/suzhou/news/news`,parameters:{uid:`栏目名`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.suzhou.gov.cn/szsrmzf/:uid/nav_list.shtml`]}],name:`政府新闻`,maintainers:[`EsuRt`,`luyuhuang`],handler:s,description:`| 新闻栏目名 |       :uid       |
| :--------: | :--------------: |
|  苏州要闻  |   news 或 szyw   |
|  区县快讯  | district 或 qxkx |
|  部门动态  |       bmdt       |
|  新闻视频  |       xwsp       |
|  政务公告  |       zwgg       |
|  便民公告  |       mszx       |
|  民生资讯  |       bmzx       |

| 热点专题栏目名 |  :uid  |
| :------------: | :----: |
|    热点专题    |  rdzt  |
|   市本级专题   |  sbjzt |
|  最新热点专题  | zxrdzt |
|    往期专题    |  wqzt  |
|    区县专题    |  qxzt  |

::: tip
  **热点专题**栏目包含**市本级专题**和**区县专题**

  **市本级专题**栏目包含**最新热点专题**和**往期专题**

  如需订阅完整的热点专题，仅需订阅 **热点专题**\`rdzt\` 一项即可。
:::`};async function s(o){let s=`https://www.suzhou.gov.cn`,c=o.req.param(`uid`),l=``,u=``,d=``,f=[];switch(c){case`szyw`:case`news`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=5057aeffb1a84a7e8aeded87728da48c`,l=`${s}/szsrmzf/szyw/nav_list.shtml`,u=`苏州市政府 - 苏州要闻`;break;case`qxkx`:case`district`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=75c636ea0efb487ea7e479e3cc0ff3e5`,l=`${s}/szsrmzf/qxkx/nav_list.shtml`,u=`苏州市政府 - 区县快讯`;break;case`bmdt`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=b3d097e3eb79421f88439ea381ce33c3`,l=`${s}/szsrmzf/bmdt/nav_list.shtml`,u=`苏州市政府 - 部门动态`;break;case`xwsp`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=507980d214c943ebb0a70853ec94b12e`,l=`${s}/szsrmzf/xwsp/nav_list.shtml`,u=`苏州市政府 - 新闻视频`;break;case`rdzt`:l=`${s}/szsrmzf/rdzt/nav_list.shtml`,u=`苏州市政府 - 热点专题`;break;case`sbjzt`:l=`${s}/szsrmzf/sbjzt/nav_list.shtml`,u=`苏州市政府 - 市本级专题`;break;case`zxrdzt`:l=`${s}/szsrmzf/zxrdzt/nav_list.shtml`,u=`苏州市政府 - 最新热点专题`;break;case`wqzt`:l=`${s}/szsrmzf/wqzt/nav_list.shtml`,u=`苏州市政府 - 往期专题`;break;case`qxzt`:l=`${s}/szsrmzf/qxzt/nav_list.shtml`,u=`苏州市政府 - 区县专题`;break;case`zwgg`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=260915178a1f4c4fac44c4bf6378c9b0`,l=`${s}/szsrmzf/zwgg/nav_list.shtml`,u=`苏州市政府 - 政务公告`;break;case`mszx`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=dc60acecb0be46b89d42272dcb8bd32b`,l=`${s}/szsrmzf/mszx/nav_list.shtml`,u=`苏州市政府 - 便民公告`;break;case`bmzx`:d=`${s}/szinf/info/getInfoCommon/?pagesize=15&currpage=1&channelid=b015bfa5e5514cc9a26cd9f956ef8e69`,l=`${s}/szsrmzf/bmzx/bmzx_list.shtml`,u=`苏州市政府 - 民生资讯`;break;default:throw new i(`pattern not matched`)}if(d){let i=await n(d),o=i.data.infolist.map(e=>({title:e.title,link:e.link.startsWith(`http`)?e.link:new URL(e.link,s).href,pubDate:r(t(e.pubtime,`YYYY-MM-DD HH:mm:ss`),8)}));f=await Promise.all(o.map(t=>e.tryGet(t.link,async()=>{let e=await n(t.link),r=a(e.data);return t.description=r(`ucapcontent`).html(),t})))}else{let e=await n(l),i=a(e.data);f=i(`ul.infolist li`).toArray().map(e=>{e=i(e);let n=e.find(`a`);return{title:n.attr(`title`),link:new URL(n.attr(`href`),s).href,pubDate:r(t(e.find(`.time`).text(),`YYYY-MM-DD`),8)}})}return{title:u,link:l,item:f}}export{o as route};
//# sourceMappingURL=news-BbStgvpb.js.map