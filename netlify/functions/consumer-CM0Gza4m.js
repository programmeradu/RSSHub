import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i={path:`/:category?/:language?/:keyword?`,categories:[`new-media`],example:`/consumer`,parameters:{category:`分类，见下表，默认为測試及調查`,language:`语言，见下表，默认为繁体中文`,keyword:`关键字，默认为空`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`consumer.org.hk/`]}],name:`文章`,maintainers:[`nczitzk`],handler:a,url:`consumer.org.hk/`,description:`分类

| 测试及调查 | 生活资讯 | 投诉实录  | 议题评论 |
| ---------- | -------- | --------- | -------- |
| test       | life     | complaint | topic    |

  语言

| 简体中文 | 繁体中文 |
| -------- | -------- |
| sc       | tc       |`};async function a(i){let a=i.req.param(`category`)??`test`,o=i.req.param(`language`)??`tc`,s=i.req.param(`keyword`)??``,c=`https://www.consumer.org.hk`,l=`${c}/${o}/free-article/free-article-${a}?category=free-article-${a}&q=${s}`,u=await n({method:`get`,url:l}),d=r(u.data),f=d(`.half-img-blk__title, .img-plate-blk__title`).find(`a`).toArray().map(e=>(e=d(e),{title:e.text(),link:`${c}${e.attr(`href`)}`,pubDate:t(e.parent().prev().find(`li`).first().text(),`YYYY.MM`)}));return f=await Promise.all(f.map(t=>e.tryGet(t.link,async()=>{let e=await n({method:`get`,url:t.link}),i=r(e.data);return t.description=i(`.ckec`).html(),t}))),{title:d(`title`).text(),link:l,item:f}}export{i as route};
//# sourceMappingURL=consumer-CM0Gza4m.js.map