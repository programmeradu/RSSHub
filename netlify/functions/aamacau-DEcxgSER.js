import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i={path:`/:category?/:id?`,categories:[`new-media`],example:`/aamacau`,parameters:{category:`分类，见下表，默认为即時報道`,id:`id，可在对应页面 URL 中找到，默认为空`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`aamacau.com/`]}],name:`话题`,maintainers:[],handler:a,url:`aamacau.com/`,description:`| 即時報道     | 每週專題    | 藝文爛鬼樓 | 論盡紙本 | 新聞事件 | 特別企劃 |
| ------------ | ----------- | ---------- | -------- | -------- | -------- |
| breakingnews | weeklytopic | culture    | press    | case     | special  |

::: tip
  除了直接订阅分类全部文章（如 [每週專題](https://aamacau.com/topics/weeklytopic) 的对应路由为 [/aamacau/weeklytopic](https://rsshub.app/aamacau/weeklytopic)），你也可以订阅特定的专题，如 [【9-12】2021 澳門立法會選舉](https://aamacau.com/topics/【9-12】2021澳門立法會選舉) 的对应路由为 [/【9-12】2021 澳門立法會選舉](https://rsshub.app/aamacau/【9-12】2021澳門立法會選舉)。

  分类中的专题也可以单独订阅，如 [新聞事件](https://aamacau.com/topics/case) 中的 [「武漢肺炎」新聞檔案](https://aamacau.com/topics/case/「武漢肺炎」新聞檔案) 对应路由为 [/case/「武漢肺炎」新聞檔案](https://rsshub.app/aamacau/case/「武漢肺炎」新聞檔案)。

  同理，其他分类同上例子也可以订阅特定的单独专题。
:::`};async function a(i){let a=i.req.param(`category`)??`topics`,o=i.req.param(`id`)??``,s=`https://aamacau.com/${a===`topics`?`topics/breakingnews`:`topics/${a}${o?`/${o}`:``}`}`,c=await n({method:`get`,url:s}),l=r(c.data),u=l(`post-title a`).toArray().map(e=>(e=l(e),{title:e.text(),link:e.attr(`href`)})),d=await Promise.all(u.map(i=>e.tryGet(i.link,async()=>{let e=await n({method:`get`,url:i.link}),a=r(e.data);return a(`.cat, .author, .date`).remove(),i.description=a(`#contentleft`).html(),i.author=a(`meta[itemprop="author"]`).attr(`content`),i.pubDate=t(a(`meta[property="article:published_time"]`).attr(`content`)),i})));return{title:l(`title`).text(),link:s,item:d}}export{i as route};
//# sourceMappingURL=aamacau-DEcxgSER.js.map