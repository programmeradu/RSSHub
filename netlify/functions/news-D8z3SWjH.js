import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import s from"node:path";import{load as c}from"cheerio";t();const l={path:`/:language/news/:category?`,categories:[`new-media`],example:`/dn/en-us/news`,parameters:{language:`Language, see below`,category:`Category, see below, The Latest by default`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`News`,maintainers:[`nczitzk`],handler:u,description:`#### Language

| English | 中文  |
| ------- | ----- |
| en-us   | zh-cn |

#### Category

| English Category     | 中文分类 | Category id |
| -------------------- | -------- | ----------- |
| The Latest           | 最新     |             |
| Industry Information | 行业资讯 | category-1  |
| Knowledge            | 域名知识 | category-2  |
| Investment           | 域名投资 | category-3  |`};async function u(t){let{language:l,category:u=``}=t.req.param(),d=t.req.query(`limit`)?Number.parseInt(t.req.query(`limit`),10):10,f=`https://dn.com`,p=new URL(`/${l}/news/${u}`,f).href,{data:m}=await a(p),h=c(m),g=h(`a.list-item`).slice(0,d).toArray().map(t=>{t=h(t);let n=t.find(`div.img img`);return{title:t.find(`h2.ellipse2`).text(),link:new URL(t.prop(`href`),f).href,description:r(s.join(e,`templates/description-b61fca98.art`),{image:n?{src:n.prop(`src`),alt:n.prop(`alt`)}:void 0,abstracts:t.find(`p.abstract`).html()}),category:t.find(`span.cat`).toArray().map(e=>h(e).text()),pubDate:o(i(t.find(`span.time`).text()),8)}});g=await Promise.all(g.map(t=>n.tryGet(t.link,async()=>{let{data:n}=await a(t.link),l=c(n);return t.title=l(`h1.tit`).text(),t.description=r(s.join(e,`templates/description-b61fca98.art`),{abstracts:l(`div.abstract`).html(),description:l(`div.detail`).html()}),t.author=l(`span.author`).text().replace(/(By|作者)\s/,``),t.category=[...t.category,...l(`div.tags p a`).toArray().map(e=>l(e).text())],t.pubDate=o(i(l(`span.date`).text()),8),t})));let _=h(`a.logo img`).prop(`alt`),v=h(`link[rel="icon"]`).prop(`href`);return{item:g,title:`${_} - ${h(`div.group a.active`).text()}`,link:p,description:h(`meta[name="description"]`).prop(`content`),language:h(`html`).prop(`lang`),image:new URL(h(`a.logo img`).prop(`src`),f).href,icon:v,logo:v,subtitle:h(`title`).text(),author:_}}export{l as route};
//# sourceMappingURL=news-D8z3SWjH.js.map