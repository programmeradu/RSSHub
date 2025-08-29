import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import{load as i}from"cheerio";const a={path:`/advisor/data/:type?/:category?`,categories:[`programming`],example:`/github/advisor/data/reviewed/composer`,features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`github.com/advisories`,`github.com`]}],name:`Github Advisory Database RSS`,maintainers:[`sd0ric4`],handler:o,description:`
| Type | Description | Explanation |
| --- | --- | --- |
| reviewed | Reviewed | 已审核 |
| unreviewed | Unreviewed | 未审核 |

| Category | Description | Explanation |
| --- | --- | --- |
| composer | Composer | PHP 依赖管理工具 |
| go | Go | Go 语言包管理工具 |
| maven | Maven | Java 项目管理工具 |
| npm | NPM | Node.js 包管理工具 |
| nuget | NuGet | .NET 包管理工具 |
| pip | Pip | Python 包管理工具 |
| pub | Pub | Dart 包管理工具 |
| rubygems | RubyGems | Ruby 包管理工具 |
| rust | Rust | Rust 包管理工具 |
| erlang | Erlang | Erlang 包管理工具 |
| actions | Actions | GitHub Actions |
| swift | Swift | Swift 包管理工具 |`};async function o(a){let{category:o,type:s}=a.req.param(),c=`https://github.com/advisories?query=type%3A${s}+ecosystem%3A${o}`,l=await r({method:`get`,url:c}),u=i(l.data),d=u(`div.Box-row`).toArray().map(e=>{e=u(e);let n=e.find(`a.Link--primary`),r=e.find(`relative-time`).attr(`datetime`),i=n.text()||`No title`,a=n.attr(`href`)||`#`,o=t(r||``);return{title:i,link:`https://github.com${a}`,pubDate:o,description:``}}),f=await Promise.all(d.map(t=>e.tryGet(t.link,async()=>{let e=await n(t.link),r=i(e);return t.description=r(`.comment-body`).first().html()||``,t})));return{title:`GitHub Advisory Database RSS - ${o} - ${s}`,link:`https://github.com/advisories`,item:f}}export{a as route};
//# sourceMappingURL=advisor-9Cne6gQ-.js.map