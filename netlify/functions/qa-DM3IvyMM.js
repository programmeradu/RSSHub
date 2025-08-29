import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t,parseRelativeDate as n}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import{timezone as i}from"./timezone-BrNu6iXe.js";import{load as a}from"cheerio";const o={path:`/qa/:category?/:state?`,categories:[`programming`],example:`/quicker/qa`,parameters:{category:`分类，见下表，默认为全部`,state:`状态，见下表，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`讨论区`,maintainers:[`Cesaryuan`,`nczitzk`],handler:s,description:`分类

| 使用问题 | 动作开发 | BUG 反馈 | 功能建议 |
| -------- | -------- | -------- | -------- |
| 1        | 9        | 3        | 4        |

| 动作需求 | 经验创意 | 动作推荐 | 信息发布 |
| -------- | -------- | -------- | -------- |
| 6        | 2        | 7        | 5        |

| 随便聊聊 | 异常报告 | 全部 |
| -------- | -------- | ---- |
| 8        | 10       | all  |

  状态

| 全部 | 精华   | 已归档  |
| ---- | ------ | ------- |
|      | digest | achived |`};async function s(o){let s=o.req.param(`category`)??`all`,c=o.req.param(`state`)??``,l=`https://getquicker.net`,u=`${l}/QA${s===`all`?``:`?category=${s}`}${c?`?state=${c}`:``}`,d=await r({method:`get`,url:u}),f=a(d.data),p=f(`a.question-title`).slice(0,o.req.query(`limit`)?Number.parseInt(o.req.query(`limit`)):25).toArray().map(e=>(e=f(e),{title:e.text(),link:`${l}${e.attr(`href`)}`}));return p=await Promise.all(p.map(o=>e.tryGet(o.link,async()=>{let e=await r({method:`get`,url:o.link}),s=a(e.data);s(`div[data-note="最后更新人信息"]`).remove();let c=s(`.info-text`).first().text().replace(/创建于 /,``).trim();return o.description=s(`.topic-body`).html(),o.author=s(`.user-link`).first().text(),o.pubDate=i(/-/.test(c)?t(c):n(c),8),o}))),{title:f(`title`).text(),link:u,item:p,allowEmpty:!0}}export{o as route};
//# sourceMappingURL=qa-DM3IvyMM.js.map