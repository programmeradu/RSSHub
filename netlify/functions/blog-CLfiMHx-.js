import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import{ofetch_default as a}from"./ofetch-Bzt0BXUH.js";import{ViewType as o}from"./types-A5bA50Mg.js";import s from"node:path";import{load as c}from"cheerio";t();const l=async t=>{let{lang:o=`en`}=t.req.param(),l=Number.parseInt(t.req.query(`limit`)??`30`,10),u=`https://www.deepl.com`,d=new URL(`${o}/blog`,u).href,f=await a(d),p=c(f),m=p(`html`).attr(`lang`)??o,h=[];return h=p(`h4, h6`).slice(0,l).toArray().map(t=>{let n=p(t).parent().parent(),a=n.find(`h4, h6`).text(),o=n.find(`img`).attr(`src`),c=r(s.join(e,`templates/description-b958bde9.art`),{images:o?[{src:o,alt:a}]:void 0,intro:n.find(`p`).text()}),l=n.find(`time`).attr(`datetime`),d=n.attr(`href`),f=n.find(`span.me-6 span`).last().text().split(/,\s/),h=f.map(e=>({name:e,url:void 0,avatar:void 0})),g=l,_={title:a,description:c,pubDate:l?i(l):void 0,link:d?new URL(d,u).href:void 0,author:h,content:{html:c,text:c},image:o,banner:o,updated:g?i(g):void 0,language:m};return _}),h=await Promise.all(h.map(t=>t.link?n.tryGet(t.link,async()=>{let n=await a(t.link),o=c(n),l=o(`h1[data-contentful-field-id="title"]`).text(),u=t.description+r(s.join(e,`templates/description-b958bde9.art`),{description:o(`div.my-redesign-3`).html()}),d=o(`time`).first().attr(`datetime`),f=o(`span[data-contentful-field-id="author"] span`).last().text().split(/,\s/),p=f.map(e=>({name:e,url:void 0,avatar:void 0})),h=o(`meta[property="og:image"]`).attr(`content`)??o(`picture[data-contentful-field-id="image"] img`).attr(`src`),g=d,_={title:l,description:u,pubDate:d?i(d):t.pubDate,author:p,content:{html:u,text:u},image:h,banner:h,updated:g?i(g):t.updated,language:m};return{...t,..._}}):t)),{title:p(`title`).text(),description:p(`meta[property="og:description"]`).attr(`content`),link:d,item:h,allowEmpty:!0,image:p(`meta[property="og:image"]`).attr(`content`),language:m,id:p(`meta[property="og:url"]`).attr(`content`)}},u=[{label:`Deutsch`,value:`de`},{label:`English`,value:`en`},{label:`Español`,value:`es`},{label:`日本語`,value:`ja`},{label:`Français`,value:`fr`},{label:`Italiano`,value:`it`},{label:`Bahasa Indonesia`,value:`id`},{label:`한국어`,value:`ko`},{label:`Nederlands`,value:`nl`},{label:`Čeština`,value:`cs`},{label:`Svenska`,value:`sv`},{label:`Polski`,value:`pl`},{label:`Português (Brasil)`,value:`pt-BR`},{label:`Português`,value:`pt-PT`},{label:`Türkçe`,value:`tr`},{label:`Русский`,value:`ru`},{label:`简体中文`,value:`zh`},{label:`Українська`,value:`uk`},{label:`العربية`,value:`ar`}],d={path:`/blog/:lang?`,name:`Blog`,url:`www.deepl.com`,maintainers:[`nczitzk`],handler:l,example:`/deepl/blog/en`,parameters:{lang:{description:"Language, `en` as English by default",options:u}},description:`:::tip
To subscribe to [Blog](https://www.deepl.com/en/blog), where the source URL is \`https://www.deepl.com/en/blog\`, extract the certain parts from this URL to be used as parameters, resulting in the route as [\`/deepl/blog/en\`](https://rsshub.app/deepl/blog/en).

:::

<details>
  <summary>More languages</summary>

| Language                                               | ID                                           |
| ------------------------------------------------------ | -------------------------------------------- |
| [Deutsch](https://www.deepl.com/de/blog)               | [de](https://rsshub.app/deepl/blog/de)       |
| [English](https://www.deepl.com/en/blog)               | [en](https://rsshub.app/deepl/blog/en)       |
| [Español](https://www.deepl.com/es/blog)               | [es](https://rsshub.app/deepl/blog/es)       |
| [日本語](https://www.deepl.com/ja/blog)                | [ja](https://rsshub.app/deepl/blog/ja)       |
| [Français](https://www.deepl.com/fr/blog)              | [fr](https://rsshub.app/deepl/blog/fr)       |
| [Italiano](https://www.deepl.com/it/blog)              | [it](https://rsshub.app/deepl/blog/it)       |
| [Bahasa Indonesia](https://www.deepl.com/id/blog)      | [id](https://rsshub.app/deepl/blog/id)       |
| [한국어](https://www.deepl.com/ko/blog)                | [ko](https://rsshub.app/deepl/blog/ko)       |
| [Nederlands](https://www.deepl.com/nl/blog)            | [nl](https://rsshub.app/deepl/blog/nl)       |
| [Čeština](https://www.deepl.com/cs/blog)               | [cs](https://rsshub.app/deepl/blog/cs)       |
| [Svenska](https://www.deepl.com/sv/blog)               | [sv](https://rsshub.app/deepl/blog/sv)       |
| [Polski](https://www.deepl.com/pl/blog)                | [pl](https://rsshub.app/deepl/blog/pl)       |
| [Português (Brasil)](https://www.deepl.com/pt-BR/blog) | [pt-BR](https://rsshub.app/deepl/blog/pt-BR) |
| [Português](https://www.deepl.com/pt-PT/blog)          | [pt-PT](https://rsshub.app/deepl/blog/pt-PT) |
| [Türkçe](https://www.deepl.com/tr/blog)                | [tr](https://rsshub.app/deepl/blog/tr)       |
| [Русский](https://www.deepl.com/ru/blog)               | [ru](https://rsshub.app/deepl/blog/ru)       |
| [简体中文](https://www.deepl.com/zh/blog)              | [zh](https://rsshub.app/deepl/blog/zh)       |
| [Українська](https://www.deepl.com/uk/blog)            | [uk](https://rsshub.app/deepl/blog/uk)       |
| [العربية](https://www.deepl.com/ar/blog)               | [ar](https://rsshub.app/deepl/blog/ar)       |

</details>
`,categories:[`new-media`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.deepl.com/:lang/blog`],target:e=>{let t=e.lang;return`/deepl/blog${t?`/${t}`:``}`}},{title:`Deutsch`,source:[`www.deepl.com/de/blog`],target:`/blog/de`},{title:`English`,source:[`www.deepl.com/en/blog`],target:`/blog/en`},{title:`Español`,source:[`www.deepl.com/es/blog`],target:`/blog/es`},{title:`日本語`,source:[`www.deepl.com/ja/blog`],target:`/blog/ja`},{title:`Français`,source:[`www.deepl.com/fr/blog`],target:`/blog/fr`},{title:`Italiano`,source:[`www.deepl.com/it/blog`],target:`/blog/it`},{title:`Bahasa Indonesia`,source:[`www.deepl.com/id/blog`],target:`/blog/id`},{title:`한국어`,source:[`www.deepl.com/ko/blog`],target:`/blog/ko`},{title:`Nederlands`,source:[`www.deepl.com/nl/blog`],target:`/blog/nl`},{title:`Čeština`,source:[`www.deepl.com/cs/blog`],target:`/blog/cs`},{title:`Svenska`,source:[`www.deepl.com/sv/blog`],target:`/blog/sv`},{title:`Polski`,source:[`www.deepl.com/pl/blog`],target:`/blog/pl`},{title:`Português (Brasil)`,source:[`www.deepl.com/pt-BR/blog`],target:`/blog/pt-BR`},{title:`Português`,source:[`www.deepl.com/pt-PT/blog`],target:`/blog/pt-PT`},{title:`Türkçe`,source:[`www.deepl.com/tr/blog`],target:`/blog/tr`},{title:`Русский`,source:[`www.deepl.com/ru/blog`],target:`/blog/ru`},{title:`简体中文`,source:[`www.deepl.com/zh/blog`],target:`/blog/zh`},{title:`Українська`,source:[`www.deepl.com/uk/blog`],target:`/blog/uk`},{title:`العربية`,source:[`www.deepl.com/ar/blog`],target:`/blog/ar`}],view:o.Articles,zh:{path:`/blog/:lang?`,name:`博客`,url:`www.deepl.com`,maintainers:[`nczitzk`],handler:l,example:`/deepl/blog/en`,parameters:{lang:{description:"语言，默认为 `en`，可在对应语言页 URL 中找到",options:u}},description:`:::tip
若订阅 [博客](https://www.deepl.com/zh/blog)，网址为 \`https://www.deepl.com/zh/blog\`，请截取 \`https://www.deepl.com/\` 到末尾 \`/blog\` 的部分 \`zh\` 作为 \`lang\` 参数填入，此时目标路由为 [\`/deepl/blog/zh\`](https://rsshub.app/deepl/blog/zh)。

:::

<details>
  <summary>更多语言</summary>

| Language                                               | ID                                           |
| ------------------------------------------------------ | -------------------------------------------- |
| [Deutsch](https://www.deepl.com/de/blog)               | [de](https://rsshub.app/deepl/blog/de)       |
| [English](https://www.deepl.com/en/blog)               | [en](https://rsshub.app/deepl/blog/en)       |
| [Español](https://www.deepl.com/es/blog)               | [es](https://rsshub.app/deepl/blog/es)       |
| [日本語](https://www.deepl.com/ja/blog)                | [ja](https://rsshub.app/deepl/blog/ja)       |
| [Français](https://www.deepl.com/fr/blog)              | [fr](https://rsshub.app/deepl/blog/fr)       |
| [Italiano](https://www.deepl.com/it/blog)              | [it](https://rsshub.app/deepl/blog/it)       |
| [Bahasa Indonesia](https://www.deepl.com/id/blog)      | [id](https://rsshub.app/deepl/blog/id)       |
| [한국어](https://www.deepl.com/ko/blog)                | [ko](https://rsshub.app/deepl/blog/ko)       |
| [Nederlands](https://www.deepl.com/nl/blog)            | [nl](https://rsshub.app/deepl/blog/nl)       |
| [Čeština](https://www.deepl.com/cs/blog)               | [cs](https://rsshub.app/deepl/blog/cs)       |
| [Svenska](https://www.deepl.com/sv/blog)               | [sv](https://rsshub.app/deepl/blog/sv)       |
| [Polski](https://www.deepl.com/pl/blog)                | [pl](https://rsshub.app/deepl/blog/pl)       |
| [Português (Brasil)](https://www.deepl.com/pt-BR/blog) | [pt-BR](https://rsshub.app/deepl/blog/pt-BR) |
| [Português](https://www.deepl.com/pt-PT/blog)          | [pt-PT](https://rsshub.app/deepl/blog/pt-PT) |
| [Türkçe](https://www.deepl.com/tr/blog)                | [tr](https://rsshub.app/deepl/blog/tr)       |
| [Русский](https://www.deepl.com/ru/blog)               | [ru](https://rsshub.app/deepl/blog/ru)       |
| [简体中文](https://www.deepl.com/zh/blog)              | [zh](https://rsshub.app/deepl/blog/zh)       |
| [Українська](https://www.deepl.com/uk/blog)            | [uk](https://rsshub.app/deepl/blog/uk)       |
| [العربية](https://www.deepl.com/ar/blog)               | [ar](https://rsshub.app/deepl/blog/ar)       |

</details>
`}};export{l as handler,d as route};
//# sourceMappingURL=blog-CLfiMHx-.js.map