import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i=`http://www.bmie.neu.edu.cn`,a={news:561,academic:562,talent_development:563,international_exchange:`gjjl3`,announcement:564,undergraduate_dev:573,postgraduate_dev:574,undergraduate_recruit:`bks`,postgraduate_recruit:574,CPC_build:556,CPC_work:576,union_work:577,CYL_work:`gqtgz`,security_management:569,alumni_style:557},o={path:`/bmie/:type`,categories:[`university`],example:`/neu/bmie/news`,parameters:{type:`分类 id 见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`医学与生物信息工程学院`,maintainers:[`tennousuathena`],handler:s,description:`| Id                      | 名称       |
| ----------------------- | ---------- |
| news                    | 学院新闻   |
| academic                | 学术科研   |
| talent_development     | 人才培养   |
| international_exchange | 国际交流   |
| announcement            | 通知公告   |
| undergraduate_dev      | 本科生培养 |
| postgraduate_dev       | 研究生培养 |
| undergraduate_recruit  | 本科生招募 |
| postgraduate_recruit   | 研究生招募 |
| CPC_build              | 党的建设   |
| CPC_work               | 党委工作   |
| union_work             | 工会工作   |
| CYL_work               | 共青团工作 |
| security_management    | 安全管理   |
| alumni_style           | 校友风采   |`};async function s(o){let s=o.req.param(`type`);a[s]!==void 0&&(s=a[s]);let c=`${i}/${s}/list.htm`,l=await n(c),u=l.data,d=r(u),f=d(`title`).text(),p=d(`#subIndex > div.main_frame_sub > div.detail_sub > div > div > div > ul > li`).slice(0,7).toArray(),m=await Promise.all(p.map(async a=>{let o=r(a),s=o(`a`).attr(`title`),c=i+o(`a`).attr(`href`),l=await e.tryGet(c,async()=>{let e=await n(c),t=r(e.data),i=t(t(`.ny_con p`)[1]).text(),a=i.search(/\d{4}-\d{2}-\d{2}/),o=i.substring(a,a+10),s=i.indexOf(`作者：`)+3,l=i.lastIndexOf(`|`),u=i.substring(s,l).trim();return t(`.entry`).find(`span`).each(function(){let e=t(this).text();t(this).replaceWith(e)}),t(`.entry`).find(`div`).each(function(){let e=t(this).html();t(this).replaceWith(e)}),t(`.entry`).find(`a`).remove(),t(`.entry`).find(`p`).each(function(){t(this).removeAttr(`style`),t(this).removeAttr(`class`)}),t(`.wp_art_adjoin`).remove(),{description:t(`.entry`).html(),date:o,author:u}}),u=l.description,d=t(l.date),f=l.author,p={title:s,description:u,link:c,pubDate:d,author:f};return p}));return{title:`东北大学 医学与生物信息工程学院 ${f}`,link:c,item:m}}export{o as route};
//# sourceMappingURL=bmie-C70jMNQX.js.map