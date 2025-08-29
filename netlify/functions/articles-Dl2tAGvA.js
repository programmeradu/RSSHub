import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{load as r}from"cheerio";import i from"markdown-it";const a=i({html:!0,breaks:!0}),o=`https://leetcode.com`,s=`${o}/graphql`,c={path:`/articles`,categories:[`programming`],example:`/leetcode/articles`,parameters:{},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`leetcode.com/articles`]}],name:`Articles`,maintainers:[`LogicJake`],handler:l,url:`leetcode.com/articles`};async function l(){let i=new URL(`/articles/`,o).href,c=await n(i,{parseResponse:e=>e}),l=r(c),u=l(`a.list-group-item`).toArray().filter(e=>l(e).find(`h4.media-heading i`).length===0).map(e=>{let t={title:l(e).find(`h4.media-heading`).text().trim(),author:l(e).find(`.text-500`).text(),link:new URL(l(e).attr(`href`),o).href,pubDate:l(e).find(`p.pull-right.media-date strong`).text().trim()};return t}),d=await Promise.all(u.map(r=>e.tryGet(r.link,async()=>{let e=r.link.split(`/`)[4],i=await n(s,{method:`POST`,body:{operationName:`questionContent`,variables:{titleSlug:e},query:`query questionContent($titleSlug: String!) {
                                question(titleSlug: $titleSlug) {
                                    content
                                    mysqlSchemas
                                    dataSchemas
                                }
                            }`}}),o=await n(s,{method:`POST`,body:{operationName:`officialSolution`,variables:{titleSlug:e},query:`query officialSolution($titleSlug: String!) {
                                question(titleSlug: $titleSlug) {
                                    solution {
                                        content
                                    }
                                }
                            }`}}),c=a.render(o.data.question.solution.content);return r.description=(i.data.question.content?.trim()??``)+c,r.pubDate=t(r.pubDate),r})));return{title:l(`head title`).text(),description:l(`meta[property="og:description"]`).attr(`content`),image:`https://assets.leetcode.com/static_assets/public/icons/favicon-192x192.png`,link:i,item:d}}export{c as route};
//# sourceMappingURL=articles-Dl2tAGvA.js.map