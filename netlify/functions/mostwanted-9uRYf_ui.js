import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./render-CxhTJIsl.js";import{ofetch_default as e}from"./ofetch-Bzt0BXUH.js";import{ViewType as t}from"./types-A5bA50Mg.js";import{baseUrl as n,fetchItems as r}from"./util-TQdjsWdI.js";import{load as i}from"cheerio";const a=async t=>{let{time:a=`24h`,country:o=`us`}=t.req.param(),s=Number.parseInt(t.req.query(`limit`)??`30`,10),c=new URL(`mostwanted/`,n).href,l=await e(c,{headers:{Cookie:`countryId=${o};`}}),u=i(l),d=u(`html`).attr(`lang`)??`en`,f=a?`div[id$="-${a}"] div.card-panel`:`div.card-panel`,p=await r(u,f,c,o,s),m=u(`title`).text(),h=u(`ul.tabs li.tab a[href$="-${a}"]`).text();return{title:`${m}${h?` - ${h}`:``}`,description:u(`meta[name="description"]`).attr(`content`),link:c,item:p,allowEmpty:!0,image:u(`a.brand-logo img`).attr(`src`)?new URL(u(`a.brand-logo img`).attr(`src`),n).href:void 0,author:m.split(/\|/).pop(),language:d,id:c}},o={path:`/mostwanted/:time?/:country?`,name:`Watchlist Charts`,url:`app-sales.net`,maintainers:[`nczitzk`],handler:a,example:`/app-sales/mostwanted`,parameters:{time:{description:"Time, `24h` as Last 24h by default",options:[{label:`Last 24h`,value:`24h`},{label:`Last Week`,value:`week`},{label:`All Time`,value:`alltime`}]},country:{description:"Country ID, `us` as United States by default",options:[{label:`United States`,value:`us`},{label:`Austria`,value:`at`},{label:`Australia`,value:`au`},{label:`Brazil`,value:`br`},{label:`Canada`,value:`ca`},{label:`France`,value:`fr`},{label:`Germany`,value:`de`},{label:`India`,value:`in`},{label:`Italy`,value:`it`},{label:`Netherlands`,value:`nl`},{label:`Poland`,value:`pl`},{label:`Russia`,value:`ru`},{label:`Spain`,value:`es`},{label:`Sweden`,value:`se`},{label:`Great Britain`,value:`gb`}]}},description:`
| Last 24h | Last Week | All Time |
| -------- | --------- | -------- |
| 24h      | week      | alltime  |

<details>
  <summary>More countries</summary>

| Currency | Country       | ID  |
| -------- | ------------- | --- |
| USD      | United States | us  |
| EUR      | Austria       | at  |
| AUD      | Australia     | au  |
| BRL      | Brazil        | br  |
| CAD      | Canada        | ca  |
| EUR      | France        | fr  |
| EUR      | Germany       | de  |
| INR      | India         | in  |
| EUR      | Italy         | it  |
| EUR      | Netherlands   | nl  |
| PLN      | Poland        | pl  |
| RUB      | Russia        | ru  |
| EUR      | Spain         | es  |
| SEK      | Sweden        | se  |
| GBP      | Great Britain | gb  |

</details>
`,categories:[`program-update`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`app-sales.net/mostwanted`],target:`/mostwanted`},{title:`Watchlist Charts - Last 24h`,source:[`app-sales.net/mostwanted`],target:`/mostwanted/24h`},{title:`Watchlist Charts - Last Week`,source:[`app-sales.net/mostwanted`],target:`/mostwanted/week`},{title:`Watchlist Charts - All Time`,source:[`app-sales.net/mostwanted`],target:`/mostwanted/alltime`}],view:t.Articles};export{a as handler,o as route};
//# sourceMappingURL=mostwanted-9uRYf_ui.js.map