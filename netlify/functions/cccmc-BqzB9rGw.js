import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{ViewType as r}from"./types-A5bA50Mg.js";import{load as i}from"cheerio";const a=async r=>{let{category:a=`ywgg/tzgg`}=r.req.param(),o=Number.parseInt(r.req.query(`limit`)??`15`,10),s=`https://www.cccmc.org.cn`,c=new URL(a.endsWith(`/`)?a:`${a}/`,s).href,l=await n(c),u=i(l),d=u(`html`).attr(`lang`)??`zh-CN`,f=[],p=/\{url:'(.*)',title:'(.*)',time:'(.*)'\},/g;f=l.match(p)?.slice(0,o).map(e=>{let n=e.match(/'(.*?)'/),r=n?.[2]??``,i=n?.[3],a=n?.[1],o=i,c={title:r,pubDate:i?t(i):void 0,link:a?new URL(a,s).href:void 0,updated:o?t(o):void 0,language:d};return c})??[],f=(await Promise.all(f.map(r=>r.link?e.tryGet(r.link,async()=>{let e=await n(r.link),a=i(e),o=a(`div.title`).text(),s=a(`div#article-content`).html()??``,c=a(`span.time`).text().split(/：/).pop(),l=a(`span.form, span.from`).toArray(),u=l.map(e=>{let t=a(e);return{name:t.text().split(/：/).pop()??t.text()}}),f=c,p={title:o,description:s,pubDate:c?t(c):r.pubDate,author:u,content:{html:s,text:s},updated:f?t(f):r.updated,language:d};return{...r,...p}}):r))).filter(e=>!0);let m=u(`title`).text();return{title:m,description:m.split(/-/)[0].trim(),link:c,item:f,allowEmpty:!0,image:u(`img.logo`).attr(`src`),author:m.split(/-/)?.pop()?.trim(),language:d,id:c}},o={path:`/:category{.+}?`,name:`通用`,url:`www.cccmc.org.cn`,maintainers:[`nczitzk`],handler:a,example:`/cccmc/ywgg/tzgg`,parameters:{category:"分类，默认为 `ywgg/tzgg`，即通知公告，可在对应分类页 URL 中找到, Category, `ywgg/tzgg`，即通知公告  by default"},description:`:::tip
若订阅 [综合政策](https://www.cccmc.org.cn/zcfg/zhzc/)，网址为 \`https://www.cccmc.org.cn/zcfg/zhzc/\`，请截取 \`https://www.cccmc.org.cn/\` 到末尾的部分 \`zcfg/zhzc\` 作为 \`category\` 参数填入，此时目标路由为 [\`/cccmc/zcfg/zhzc\`](https://rsshub.app/cccmc/zcfg/zhzc)。
:::

<details>
<summary>更多分类</summary>

#### [会员之家](https://www.cccmc.org.cn/hyzj)

| [会员之声](https://www.cccmc.org.cn/hyzj/hyzs/) | [会员动态](https://www.cccmc.org.cn/hyzj/hydt/) | [会员推介](https://www.cccmc.org.cn/hyzj/hytj/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [hyzj/hyzs](https://rsshub.app/cccmc/hyzj/hyzs) | [hyzj/hydt](https://rsshub.app/cccmc/hyzj/hydt) | [hyzj/hytj](https://rsshub.app/cccmc/hyzj/hytj) |

#### [政策法规](https://www.cccmc.org.cn/zcfg)

| [综合政策](https://www.cccmc.org.cn/zcfg/zhzc/) | [国内贸易](https://www.cccmc.org.cn/zcfg/gnmy/) | [对外贸易](https://www.cccmc.org.cn/zcfg/dwmy/) | [投资合作](https://www.cccmc.org.cn/zcfg/tzhz/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [zcfg/zhzc](https://rsshub.app/cccmc/zcfg/zhzc) | [zcfg/gnmy](https://rsshub.app/cccmc/zcfg/gnmy) | [zcfg/dwmy](https://rsshub.app/cccmc/zcfg/dwmy) | [zcfg/tzhz](https://rsshub.app/cccmc/zcfg/tzhz) |

#### [行业资讯](https://www.cccmc.org.cn/hyzx)

| [统计分析](https://www.cccmc.org.cn/hyzx/tjfx/) | [石油化工](https://www.cccmc.org.cn/hyzx/syhg/) | [金属矿产](https://www.cccmc.org.cn/hyzx/jskc/) | [五金建材](https://www.cccmc.org.cn/hyzx/wjjc/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [hyzx/tjfx](https://rsshub.app/cccmc/hyzx/tjfx) | [hyzx/syhg](https://rsshub.app/cccmc/hyzx/syhg) | [hyzx/jskc](https://rsshub.app/cccmc/hyzx/jskc) | [hyzx/wjjc](https://rsshub.app/cccmc/hyzx/wjjc) |

#### [商业机会](https://www.cccmc.org.cn/syjh/)+

| [供应信息](https://www.cccmc.org.cn/syjh/gyxx/) | [需求信息](https://www.cccmc.org.cn/syjh/xqxx/) | [合作信息](https://www.cccmc.org.cn/syjh/hzxx/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [syjh/gyxx](https://rsshub.app/cccmc/syjh/gyxx) | [syjh/xqxx](https://rsshub.app/cccmc/syjh/xqxx) | [syjh/hzxx](https://rsshub.app/cccmc/syjh/hzxx) |

#### [商会党建](https://www.cccmc.org.cn/shdj)

| [党群动态](https://www.cccmc.org.cn/shdj/dqdt/) | [党内法规](https://www.cccmc.org.cn/shdj/dnfg/) | [青年工作](https://www.cccmc.org.cn/shdj/qngz/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [shdj/dqdt](https://rsshub.app/cccmc/shdj/dqdt) | [shdj/dnfg](https://rsshub.app/cccmc/shdj/dnfg) | [shdj/qngz](https://rsshub.app/cccmc/shdj/qngz) |
</details>
`,categories:[`new-media`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.cccmc.org.cn/:category`],target:e=>{let t=e.category;return`/cccmc${t?`/${t}`:``}`}},{title:`商业机会 - 供应信息`,source:[`www.cccmc.org.cn/syjh/gyxx/`],target:`/syjh/gyxx`},{title:`商业机会 - 需求信息`,source:[`www.cccmc.org.cn/syjh/xqxx/`],target:`/syjh/xqxx`},{title:`商业机会 - 合作信息`,source:[`www.cccmc.org.cn/syjh/hzxx/`],target:`/syjh/hzxx`},{title:`商会党建 - 党群动态`,source:[`www.cccmc.org.cn/shdj/dqdt/`],target:`/shdj/dqdt`},{title:`商会党建 - 党内法规`,source:[`www.cccmc.org.cn/shdj/dnfg/`],target:`/shdj/dnfg`},{title:`商会党建 - 青年工作`,source:[`www.cccmc.org.cn/shdj/qngz/`],target:`/shdj/qngz`},{title:`行业资讯 - 统计分析`,source:[`www.cccmc.org.cn/hyzx/tjfx/`],target:`/hyzx/tjfx`},{title:`行业资讯 - 石油化工`,source:[`www.cccmc.org.cn/hyzx/syhg/`],target:`/hyzx/syhg`},{title:`行业资讯 - 金属矿产`,source:[`www.cccmc.org.cn/hyzx/jskc/`],target:`/hyzx/jskc`},{title:`行业资讯 - 五金建材`,source:[`www.cccmc.org.cn/hyzx/wjjc/`],target:`/hyzx/wjjc`},{title:`会员之家 - 会员之声`,source:[`www.cccmc.org.cn/hyzj/hyzs/`],target:`/hyzj/hyzs`},{title:`会员之家 - 会员动态`,source:[`www.cccmc.org.cn/hyzj/hydt/`],target:`/hyzj/hydt`},{title:`会员之家 - 会员推介`,source:[`www.cccmc.org.cn/hyzj/hytj/`],target:`/hyzj/hytj`},{title:`政策法规 - 综合政策`,source:[`www.cccmc.org.cn/zcfg/zhzc/`],target:`/zcfg/zhzc`},{title:`政策法规 - 国内贸易`,source:[`www.cccmc.org.cn/zcfg/gnmy/`],target:`/zcfg/gnmy`},{title:`政策法规 - 对外贸易`,source:[`www.cccmc.org.cn/zcfg/dwmy/`],target:`/zcfg/dwmy`},{title:`政策法规 - 投资合作`,source:[`www.cccmc.org.cn/zcfg/tzhz/`],target:`/zcfg/tzhz`}],view:r.Articles};export{a as handler,o as route};
//# sourceMappingURL=cccmc-BqzB9rGw.js.map