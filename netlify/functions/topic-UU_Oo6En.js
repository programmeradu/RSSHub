import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a=`https://www.peopo.org`,o={path:`/topic/:topicId?`,categories:[`new-media`],example:`/peopo/topic/159`,parameters:{topicId:`分類 ID，見下表，默認為社會關懷`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`peopo.org/topic/:topicId`],target:`/topic/:topicId`}],name:`新聞分類`,maintainers:[],handler:s,description:`| 分類     | ID  |
| -------- | --- |
| 社會關懷 | 159 |
| 生態環保 | 113 |
| 文化古蹟 | 143 |
| 社區改造 | 160 |
| 教育學習 | 161 |
| 農業     | 163 |
| 生活休閒 | 162 |
| 媒體觀察 | 164 |
| 運動科技 | 165 |
| 政治經濟 | 166 |
| 北台灣   | 223 |
| 中台灣   | 224 |
| 南台灣   | 225 |
| 東台灣   | 226 |
| 校園中心 | 167 |
| 原住民族 | 227 |
| 天然災害 | 168 |`};async function s(o){let{topicId:s=`159`}=o.req.param(),c=`${a}/topic/${s}`,l=await n(c),u=i(l.data),d=u(`.view-list-title`).toArray().map(e=>(e=u(e),{title:e.find(`a`).text(),link:new URL(e.find(`a`).attr(`href`),a).href})),f=await Promise.all(d.map(a=>e.tryGet(a.link,async()=>{let e=await n(a.link),o=i(e.data);return a.author=o(`#user-info h3`).text(),a.category=o(`#node-terms .inline li`).toArray().map(e=>o(e).find(`a`).text()),a.pubDate=r(t(o(`.submitted span`).text()),8),a.description=(o(`.field-name-field-video-id .field-items`).text()?o(`.field-name-field-video-id input`).attr(`value`):``)+o(`.post_text_s .field-items`).html(),a})));return{title:u(`head title`).text(),link:c,language:`zh-TW`,item:f}}export{o as route};
//# sourceMappingURL=topic-UU_Oo6En.js.map