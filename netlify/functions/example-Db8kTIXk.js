import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import i from"node:path";import{load as a}from"cheerio";t();const o={path:`/:category?/:language?`,categories:[`study`],example:`/mindmeister/mind-map-examples`,parameters:{category:"Categories, see the table below, `mind-map-examples` by default",language:"Languages, see the table below, `en` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Public Maps`,maintainers:[`TonyRL`],handler:s,description:`| Categories    | parameter         |
| ------------- | ----------------- |
| Featured Map  | mind-map-examples |
| Business      | business          |
| Design        | design            |
| Education     | education         |
| Entertainment | entertainment     |
| Life          | life              |
| Marketing     | marketing         |
| Productivity  | productivity      |
| Summaries     | summaries         |
| Technology    | technology        |
| Other         | other             |

| Languages  | parameter |
| ---------- | --------- |
| English    | en        |
| Deutsch    | de        |
| Français   | fr        |
| Español    | es        |
| Português  | pt        |
| Nederlands | nl        |
| Dansk      | da        |
| Русский    | ru        |
| 日本語     | ja        |
| Italiano   | it        |
| 简体中文   | zh        |
| 한국어     | ko        |
| Other      | other     |`};async function s(t){let{category:o=`mind-map-examples`,language:s=`en`}=t.req.param(),c=`https://www.mindmeister.com${s===`en`||s===`other`?``:`/${s}`}/${o===`mind-map-examples`?o:`mind-maps/${o}?language=${s}`}`,l=await r(c),u=a(l.data),d=u(`#public-listing .map-tile-wrapper`).toArray().map(t=>{t=u(t);let r=new URL(t.find(`.map-wrapper`).attr(`style`).match(/url\('(.*)'\);/)[1]).href;return{title:t.find(`.title`).text(),description:n(i.join(e,`templates/image-ed2e843c.art`),{src:r.split(`?`)[0],alt:t.find(`.title`).text().trim()}),link:t.find(`.title`).attr(`href`),author:t.find(`.author`).text().trim().replace(/^by/,``),category:t.find(`.fw-bold`).text()}});return{title:u(`head title`).text(),description:u(`head meta[name=description]`).text(),link:c,item:d,language:s}}export{o as route};
//# sourceMappingURL=example-Db8kTIXk.js.map