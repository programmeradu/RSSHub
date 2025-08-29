import"./esm-shims-Dqvxr0BZ.js";import{config as e}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as t}from"./cache-kimkMTWJ.js";import{parseDate as n}from"./parse-date-Bgabdhlb.js";import{ofetch_default as r}from"./ofetch-Bzt0BXUH.js";import{ViewType as i}from"./types-A5bA50Mg.js";import{load as a}from"cheerio";const o=async i=>{let o=`https://www.bitget.com`,c=`${o}/v1/msg/push/stationLetterNew`,{type:l,lang:u=`zh-CN`}=i.req.param(),d=u.replace(`-`,`_`),f={Referer:o,accept:`application/json, text/plain, */*`,"content-type":`application/json;charset=UTF-8`,language:d,locale:d},p=i.req.query(`limit`)??`10`,m={pageSize:p,openUnread:0,stationLetterType:`0`,isPre:!1,lastEndId:null,languageType:1};switch(l){case`new-listing`:m.stationLetterType=`02`;break;case`latest-activities`:m.stationLetterType=`01`;break;case`new-announcement`:m.stationLetterType=`06`;break;case`all`:m.stationLetterType=`0`,m.excludeStationLetterType=`00`;break;default:throw Error(`Invalid type`)}let h=await t.tryGet(`bitget:announcement:${l}:${p}:${u}`,async()=>{let e=await r(c,{method:`POST`,body:m,headers:f});if(e?.code!==`200`)throw Error(`Failed to fetch announcements, error code: `+e?.code);return e},e.cache.routeExpire,!1);if(!h)throw Error(`Failed to fetch announcements`);let g=h.data.items,_=await Promise.all(g.map(e=>t.tryGet(`bitget:announcement:${e.id}:${p}:${u}`,async()=>{let t=n(Number(e.sendTime)),i={title:e.title??``,link:e.openUrl??``,pubDate:e.sendTime?t:void 0,description:e.content??``};if(e.imgUrl&&(i.image=e.imgUrl),e.stationLetterType===`01`||e.stationLetterType===`06`)try{let t=await r(e.openUrl??``,{headers:f}),n=a(t),o=JSON.parse(n(`script#__NEXT_DATA__`).text());i.description=o.props.pageProps.details?.content||o.props.pageProps.pageInitInfo?.ruleContent||e.content||``}catch(t){if(t.name&&(t.name===`HTTPError`||t.name===`RequestError`||t.name===`FetchError`))i.description=e.content??``;else throw t}return i})));return{title:`Bitget | ${s(l)}`,link:`https://www.bitget.com/${u}/inmail`,item:_}},s=e=>{let t={all:`All`,"new-listing":`New Listing`,"latest-activities":`Latest Activities`,"new-announcement":`New Announcement`};return t[e]},c={path:`/announcement/:type/:lang?`,categories:[`finance`],view:i.Articles,example:`/bitget/announcement/all/zh-CN`,parameters:{type:{description:`Bitget 通知类型`,default:`all`,options:[{value:`all`,label:`全部通知`},{value:`new-listing`,label:`新币上线`},{value:`latest-activities`,label:`最新活动`},{value:`new-announcement`,label:`最新公告`}]},lang:{description:`语言`,default:`zh-CN`,options:[{value:`zh-CN`,label:`中文`},{value:`en-US`,label:`English`},{value:`es-ES`,label:`Español`},{value:`fr-FR`,label:`Français`},{value:`de-DE`,label:`Deutsch`},{value:`ja-JP`,label:`日本語`},{value:`ru-RU`,label:`Русский`},{value:`ar-SA`,label:`العربية`}]}},radar:[{source:[`www.bitget.com/:lang/inmail`],target:`/announcement/all/:lang`}],name:`Announcement`,description:`
type:
| Type | Description |
| --- | --- |
| all | 全部通知 |
| new-listing | 新币上线 |
| latest-activities | 最新活动 |
| new-announcement | 最新公告 |

lang:
| Lang | Description |
| ---   | ---   |
| zh-CN | 中文 |
| en-US | English |
| es-ES | Español |
| fr-FR | Français |
| de-DE | Deutsch |
| ja-JP | 日本語 |
| ru-RU | Русский |
| ar-SA | العربية |
`,maintainers:[`YukiCoco`],handler:o};export{c as route};
//# sourceMappingURL=announcement-CNSd-_XS.js.map