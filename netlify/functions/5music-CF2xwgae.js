import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{load as n}from"cheerio";const r={path:`/new-releases/:category?`,categories:[`shopping`],example:`/5music/new-releases`,parameters:{category:`Category, see below, defaults to all`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.5music.com.tw/New_releases.asp`,`www.5music.com.tw/`],target:`/new-releases`}],name:`新貨上架`,maintainers:[`gideonsenku`],handler:i,description:`Categories:
| 華語 | 西洋 | 東洋 | 韓語 | 古典 |
| ---- | ---- | ---- | ---- | ---- |
| A | B | F | M | D |`,url:`www.5music.com.tw/New_releases.asp`};async function i(r){let i=r.req.param(`category`)??`A`,a=`https://www.5music.com.tw/New_releases.asp?mut=${i}`,{data:o}=await t(a),s=n(o),c=s(`.releases-list .tbody > .box`).toArray().map(t=>{let n=s(t),r=n.find(`.td`),i=s(r[0]),o=i.find(`a`).toArray().map(e=>s(e).text().trim()).join(` / `),c=s(r[1]),l=c.find(`a`).first().text().trim(),u=c.find(`a`).first().attr(`href`),d=s(r[2]).text().trim(),f=s(r[3]).text().trim(),p=s(r[4]).text().trim();return{title:`${o} - ${l}`,description:`
                    <p>艺人: ${o}</p>
                    <p>专辑: ${l}</p>
                    <p>发行公司: ${f}</p>
                    <p>格式: ${p}</p>
                    <p>发行日期: ${d}</p>
                `,link:u?`https://www.5music.com.tw/${u}`:a,pubDate:e(d),category:p,author:o}});return{title:`五大唱片 - 新货上架`,link:a,item:c,language:`zh-tw`}}export{r as route};
//# sourceMappingURL=5music-CF2xwgae.js.map