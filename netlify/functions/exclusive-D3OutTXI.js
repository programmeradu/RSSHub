import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import s from"node:path";import{load as c}from"cheerio";t();const l={"":{id:`BAI5E21O`,title:`首页`},qsyk:{id:`BD21K0DL`,title:`轻松一刻`},cz:{id:`CICMICLU`,title:`槽值`},rj:{id:`CICMOMBL`,title:`人间`},dgxm:{id:`CICMPVC5`,title:`大国小民`},ssyg:{id:`CICMLCOU`,title:`三三有梗`},sd:{id:`D551V75C`,title:`数读`},kk:{id:`D55253RH`,title:`看客`},xhx:{id:`D553A53L`,title:`下划线`},txs:{id:`D553PGHQ`,title:`谈心社`},dd:{id:`CICMS5BI`,title:`哒哒`},pbgl:{id:`CQ9UDVKO`,title:`胖编怪聊`},qyd:{id:`CQ9UJIJN`,title:`曲一刀`},jrzs:{id:`BD284UM8`,title:`今日之声`},lc:{id:`CICMMGBH`,title:`浪潮`},fd:{id:`D5543R68`,title:`沸点`}},u={path:`/exclusive/:id?`,categories:[`new-media`],example:`/163/exclusive/qsyk`,parameters:{id:`栏目, 默认为首页`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`3g.163.com/touch/exclusive/sub/:id`]}],name:`栏目`,maintainers:[`nczitzk`],handler:d,description:`| 分类     | 编号 |
| -------- | ---- |
| 首页     |      |
| 轻松一刻 | qsyk |
| 槽值     | cz   |
| 人间     | rj   |
| 大国小民 | dgxm |
| 三三有梗 | ssyg |
| 数读     | sd   |
| 看客     | kk   |
| 下划线   | xhx  |
| 谈心社   | txs  |
| 哒哒     | dd   |
| 胖编怪聊 | pbgl |
| 曲一刀   | qyd  |
| 今日之声 | jrzs |
| 浪潮     | lc   |
| 沸点     | fd   |`};async function d(t){let u=t.req.param(`id`)??``,d=`https://3g.163.com`,f=`${d}/touch/exclusive${u?`/sub/${u}`:``}`,p=`${d}/touch/reconstruct/article/list/${l[u].id}wangning/0-20.html`,m=await a({method:`get`,url:p}),h=JSON.parse(m.data.match(/^artiList\((.*)\)$/)[1])[`${l[u].id}wangning`],g=h.map(e=>({title:e.title,author:e.source,link:e.skipURL||e.url||`${d}/dy/article/${e.docid}.html`,pubDate:o(i(e.ptime),8),videoId:e.skipType===`video`?e.stitle:``}));return g=await Promise.all(g.map(t=>n.tryGet(t.link,async()=>{try{if(t.videoId){let n=await a({method:`get`,url:`${d}/touch/video/detail/jsonp/VIA8K0PTB.html?callback=videoList`}),i=JSON.parse(n.data.match(/^videoList\((.*)\)$/)[1])?.mp4_url;t.description=r(s.join(e,`templates/exclusive-7ed2212d.art`),{video:i})}else{let n=await a({method:`get`,url:t.link}),i=c(n.data);i(`.m-linkCard`).remove(),i(`.m-photo`).each(function(){i(this).html(r(s.join(e,`templates/exclusive-7ed2212d.art`),{image:i(this).find(`img`).attr(`data-src`)}))}),t.description=i(`.article-body`).html()}}catch{}return delete t.videoId,t}))),{title:`网易独家 - ${l[u].title}`,link:f,item:g}}export{u as route};
//# sourceMappingURL=exclusive-D3OutTXI.js.map