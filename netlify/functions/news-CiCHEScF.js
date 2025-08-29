import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={path:`/2yuan/news/:id?`,categories:[`university`],example:`/xjtu/2yuan/news`,parameters:{id:`编号，见下表，默认为通知公告`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`第二附属医院新闻`,maintainers:[`nczitzk`],handler:o,description:`| 分类     | 编号 |
| -------- | ---- |
| 通知公告 | 110  |
| 综合新闻 | 6    |
| 科室动态 | 8    |
| 教学动态 | 45   |
| 科研动态 | 51   |
| 护理动态 | 57   |
| 党群活动 | 63   |
| 外事活动 | 13   |
| 媒体二院 | 14   |
| 理论政策 | 16   |`};async function o(a){let o=a.req.param(`id`)??`110`,s=`http://2yuan.xjtu.edu.cn`,c=`${s}/Html/News/Columns/${o}/Index.html`,l=await n({method:`get`,url:c}),u=i(l.data),d=u(`.column_list h2`).toArray().map(e=>(e=u(e),{title:e.find(`a`).attr(`title`),link:`${s}${e.find(`a`).attr(`href`)}`,pubDate:r(t(e.find(`.dy_date`).text()),8)}));return d=await Promise.all(d.map(a=>e.tryGet(a.link,async()=>{let e=await n({method:`get`,url:a.link}),o=i(e.data);return a.description=o(`#zoom`).html(),a.pubDate=r(t(o(`.sub_tit3 strong`).first().text().replace(/发布时间：/,``)),8),a}))),{title:u(`title`).text(),link:c,item:d}}export{a as route};
//# sourceMappingURL=news-CiCHEScF.js.map