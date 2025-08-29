import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a=async(a,o)=>{let s=await n(a),c=i(s),l=c(o.selector).toArray().map(e=>{let n=c(e),i=n.find(`p.text-m-height`).text(),a=n.find(`a`).attr(`href`),s=o.date?r(t(n.find(`div.text-light p`).first().text()),0):``,l=n.find(`img`).attr(`src`),u=[n.find(`p.pt025`).text()];return{title:i,link:`https://insider.finology.in${a}`,pubDate:s,itunes_item_image:l,category:u}}),u=(await Promise.allSettled(l.map(r=>r.link===void 0?r:e.tryGet(r.link,async()=>{let e=await n(r.link||``),a=i(e),s=a(`div.w60.flex.flex-wrap-badge`);return r.author=s.find(`div a p`).text(),r.updated=o.date?t(s.find(`p:contains("Updated on") span`).text()):``,r.description=a(`div#main-wrapper div#insiderhead`).find(`div.flex.flex-col.w100.align-center`).children(`div.m-position-r`).remove().end().find(`a[href="https://quest.finology.in/"]`).remove().end().find(`div.blur-wall-wrap`).remove().end().html()??``,r})))).map((e,t)=>e.status===`fulfilled`?e.value:{...l[t],description:`Website did not load within Timeout Limits. <a href="${l[t].link}">Check with Website if the page is slow</a>`}),d=c(`h1.font-heading.fs1875`)?.text(),f=u.filter(e=>e!==null&&typeof e!=`string`);return{items:f,topicName:d}},o={path:`/category/:category`,categories:[`finance`],url:`insider.finology.in/business`,example:`/finology/success-stories`,parameters:{category:`Refer Table below or find in URL`},radar:[{source:[`insider.finology.in/:category`]}],name:`Category`,maintainers:[`Rjnishant530`],handler:s,description:`::: info Category
| Category              | Link               |
| --------------------- | ------------------ |
| **Business**          | business           |
| Big Shots             | entrepreneurship   |
| Startups              | startups-india     |
| Brand Games           | success-stories    |
| Juicy Scams           | juicy-scams        |
| **Finance**           | finance            |
| Macro Moves           | economy            |
| News Platter          | market-news        |
| Tax Club              | tax                |
| Your Money            | your-money         |
| **Invest**            | investing          |
| Stock Market          | stock-market       |
| Financial Ratios      | stock-ratios       |
| Investor's Psychology | behavioral-finance |
| Mutual Funds          | mutual-fund        |
:::`};async function s(e){let{category:t}=e.req.param(),n={description:e=>`Articles for your research and knowledge under ${e}`,date:!0,selector:`div.card`};return await c(`https://insider.finology.in`,`/${t}`,n)}async function c(e,t,n){let{items:r,topicName:i}=await a(`${e}${t}`,n);return{title:`${i} - Finology Insider`,link:`${e}${t}`,item:r,description:n.description(i||``),logo:`https://insider.finology.in/Images/favicon/favicon.ico`,icon:`https://insider.finology.in/Images/favicon/favicon.ico`,language:`en-us`}}export{c as commonHandler,o as route};
//# sourceMappingURL=category-C99raL3g.js.map