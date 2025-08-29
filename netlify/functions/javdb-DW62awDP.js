import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import"./cache-kimkMTWJ.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import"./got-CdvI2yKX.js";import"./config-not-found-BVqhRP9D.js";import{utils_default as e}from"./utils-BrGisCrd.js";const t={path:`/home/:category?/:sort?/:filter?`,radar:[{source:[`javdb.com/`]}],name:`主页`,example:`/javdb/home`,parameters:{category:"分类，见下表，默认为 `有碼`",sort:"排序，见下表，默认为 `磁鏈更新排序`",filter:"过滤，见下表，默认为 `可下载`"},maintainers:[`nczitzk`],handler:n,url:`javdb.com/`,description:`分类

| 有碼     | 無碼       | 歐美    |
| -------- | ---------- | ------- |
| censored | uncensored | western |

  排序

| 发布日期排序 | 磁鏈更新排序 |
| ------------ | ------------ |
| 1            | 2            |

  过滤

| 全部 | 可下载 | 含字幕 | 含短評 |
| ---- | ------ | ------ | ------ |
| 0    | 1      | 2      | 3      |`};async function n(t){let n=t.req.param(`category`)??`censored`,r=t.req.param(`sort`)??`2`,i=t.req.param(`filter`)??`1`,a=`${n===`censored`?``:n}?vft=${i}&vst=${r}`,o={censored:`有碼`,uncensored:`無碼`,western:`歐美`,fc2:`FC2`},s={0:``,1:`可下载`,2:`含字幕`,3:`含短評`},c={1:`发布日期排序`,2:`磁鏈更新排序`},l=`${o[n]} - JavDB - ${s[i]===``?`|`:`${s[i]} | `}${c[r]}`;return await e.ProcessItems(t,a,l)}export{t as route};
//# sourceMappingURL=javdb-DW62awDP.js.map