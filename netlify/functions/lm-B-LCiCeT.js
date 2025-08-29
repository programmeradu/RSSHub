import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={path:`/lm/:id?`,categories:[`traditional-media`],example:`/cctv/lm/xwzk`,parameters:{id:"栏目 id，可在对应栏目页 URL 中找到，默认为 `xwzk` 即 新闻周刊"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`news.cctv.com/:category`],target:`/:category`}],name:`栏目`,maintainers:[`nczitzk`],handler:o,description:`| 焦点访谈 | 等着我 | 今日说法 | 开讲啦 |
| -------- | ------ | -------- | ------ |
| jdft     | dzw    | jrsf     | kjl    |

| 正大综艺 | 经济半小时 | 第一动画乐园 |
| -------- | ---------- | ------------ |
| zdzy     | jjbxs      | dydhly       |

::: tip
  更多栏目请看 [这里](https://tv.cctv.com/lm)
:::`};async function o(a){let o=a.req.param(`id`)??`xwzk`,s=`https://tv.cctv.com/lm/${o}/videoset`,c=await n({method:`get`,url:s}),l=i(c.data),u=c.data.match(/(TOPC\d{16})/)[1],d=`https://api.cntv.cn/NewVideo/getVideoListByColumn?id=${u}&n=20&sort=desc&p=1&mode=0&serviceId=tvcctv`,f=await n({method:`get`,url:d}),p=f.data.data.list.map(e=>({url:e.url,guid:e.guid,image:e.image,title:e.title,pubDate:r(t(e.time),8),link:`https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid=${e.guid}`,description:`<p>${e.brief.replaceAll(`\r
`,`</p><p>`)}</p>`})),m=await Promise.all(p.map(t=>e.tryGet(t.link,async()=>{let e=await n({method:`get`,url:t.link}),r=e.data;t.description+=`<video src="${r.hls_url}" controls="controls" poster="${t.image}" width="100%"></video><br>`;for(let e of r.video.chapters)t.description+=`<video src="${e.url}" controls="controls" poster="${e.image}" width="100%"></video><br>`;for(let e=2;r.video[`chapters${e}`];e++)for(let n of r.video[`chapters${e}`])t.description+=`<video src="${n.url}" controls="controls" poster="${n.image}" width="100%"></video><br>`;return t.link=t.url,delete t.url,delete t.image,t})));return{title:l(`title`).text(),link:s,item:m,description:l(`meta[name=description]`).attr(`content`)}}export{a as route};
//# sourceMappingURL=lm-B-LCiCeT.js.map