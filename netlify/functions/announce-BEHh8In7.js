import"./esm-shims-Dqvxr0BZ.js";import{config as e}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as t}from"./cache-kimkMTWJ.js";import{parseDate as n}from"./parse-date-Bgabdhlb.js";import{ofetch_default as r}from"./ofetch-Bzt0BXUH.js";import{load as i}from"cheerio";const a={path:`/arknights/announce/:platform?/:group?`,categories:[`game`],example:`/hypergryph/arknights/announce`,parameters:{platform:`平台，默认为 Android`,group:`分组，默认为 ALL`},name:`明日方舟 - 游戏内公告`,maintainers:[`swwind`],handler:o,description:`平台

|  安卓服 | iOS 服 |   B 服   |
| :-----: | :----: | :------: |
| Android |   IOS  | Bilibili |

  分组

| 全部 | 系统公告 | 活动公告 |
| :--: | :------: | :------: |
|  ALL |  SYSTEM  | ACTIVITY |`};async function o(a){let{platform:o=`Android`,group:s=`ALL`}=a.req.param(),c=await t.tryGet(`hypergryph:arknights:announce_meta:${o}`,async()=>{let{announceList:e}=await r(`https://ak-conf.hypergryph.com/config/prod/announce_meta/${o}/announcement.meta.json`);return e},e.cache.routeExpire,!1);s!==`ALL`&&(c=c.filter(e=>e.group===s));let l=await Promise.all(c.map(e=>t.tryGet(e.webUrl,async()=>{let t=await r(e.webUrl),a=i(t),o=a(`.content`).html()??a(`.banner-image-container.cover`).html()??`No Description`;return o=o.replace(/href="uniwebview:\/\/.+?"/,`href="#"`),{title:e.title,description:o,pubDate:n(`${e.month}-${e.day}`,`M-D`),link:e.webUrl}})));return{title:`《明日方舟》${s===`SYSTEM`?`系统`:s===`ACTIVITY`?`活动`:`全部`}公告`,link:`https://ak.hypergryph.com/`,item:l}}export{a as route};
//# sourceMappingURL=announce-BEHh8In7.js.map