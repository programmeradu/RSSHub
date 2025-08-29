import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={path:`/:category?`,categories:[`traditional-media`],example:`/yomiuri/news`,parameters:{category:"Category, `news` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.yomiuri.co.jp/:category?`]}],name:`News`,maintainers:[`Arracc`],handler:o,description:`Free articles only.

| Category       | Parameter |
| -------------- | --------- |
| 新着・速報     | news      |
| 社会           | national  |
| 政治           | politics  |
| 経済           | economy   |
| スポーツ       | sports    |
| 国際           | world     |
| 地域           | local     |
| 科学・ＩＴ     | science   |
| エンタメ・文化 | culture   |
| ライフ         | life      |
| 医療・健康     | medical   |
| 教育・就活     | kyoiku    |
| 選挙・世論調査 | election  |
| 囲碁・将棋     | igoshougi |
| 社説           | editorial |
| 皇室           | koushitsu |`};async function o(a){let{category:o=`news`}=a.req.param(),s=`https://www.yomiuri.co.jp/${o}`,c=await n(s),l=c.data,u=i(l),d;o===`news`?d=u(`.news-top-latest__list .news-top-latest__list-item__inner`).toArray().map(e=>{e=u(e);let n=e.find(`h3 a`);return{title:n.text(),link:n.attr(`href`),pubDate:r(t(e.find(`time`).attr(`datetime`)),9),locked:e.find(`.icon-locked`).length}}):(u(`.p-category-reading-recommend`).remove(),d=u(`.layout-contents__main .c-list-title`).toArray().map(e=>{e=u(e);let n=e.find(`h3 a`),i=e.parent();return{title:n.text(),link:n.attr(`href`),pubDate:r(t(i.find(`time`).attr(`datetime`)),9),locked:i.find(`.c-list-member-only`).length}}));let f=await Promise.all(d.map(r=>e.tryGet(r.link,async()=>{if(r.locked)return r;let e=await n(r.link),a=i(e.data),o=a(`.p-main-contents`);o.find(`[class^=ev-article], svg`).remove(),o.find(`img`).each((e,t)=>{t.attribs.src=t.attribs.src.split(`?`)[0]}),r.description=o.html(),r.pubDate=t(a(`meta[property="article:published_time"]`).attr(`content`)),r.updated=t(a(`meta[property="article:modified_time"]`).attr(`content`));let s=a(`.p-header-category-breadcrumbs li a`).last().text();return r.category=s,r.title=`[${s}] ${r.title}`,r})));return{title:u(`head title`).text(),link:s,image:`https://www.yomiuri.co.jp/apple-touch-icon.png`,item:f}}export{a as route};
//# sourceMappingURL=news-0TM4eICA.js.map