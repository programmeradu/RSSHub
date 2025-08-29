import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import"./cache-kimkMTWJ.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import"./got-CdvI2yKX.js";import"./config-not-found-BVqhRP9D.js";import{utils_default as e}from"./utils-BrGisCrd.js";const t={path:`/rankings/:category?/:time?`,categories:[`multimedia`],example:`/javdb/rankings`,parameters:{category:"分类，见下表，默认为 `有碼`",time:"时间，见下表，默认为 `日榜`"},features:{requireConfig:[{name:`JAVDB_SESSION`,description:"JavDB登陆后的session值，可在控制台的cookie下查找 `_jdb_session` 的值，即可获取",optional:!0}],requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`javdb.com/`],target:``}],name:`排行榜`,maintainers:[`nczitzk`],handler:n,url:`javdb.com/`,description:`分类

| 有碼     | 無碼       | 歐美    |
| -------- | ---------- | ------- |
| censored | uncensored | western |

  时间

| 日榜  | 週榜   | 月榜    |
| ----- | ------ | ------- |
| daily | weekly | monthly |`};async function n(t){let n=t.req.param(`category`)??`censored`,r=t.req.param(`time`)??`daily`,i=`/rankings/movies?p=${r}&t=${n}`;return await e.ProcessItems(t,i,`JavDB`)}export{t as route};
//# sourceMappingURL=rankings-DPm4sF5X.js.map