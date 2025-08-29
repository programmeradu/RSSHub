import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i={path:`/article/:id?`,categories:[`new-media`],example:`/wyzxwk/article/shushe`,parameters:{id:`栏目 id，可在栏目页 URL 中找到，默认为时代观察`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`wyzxwk.com/Article/:id`,`wyzxwk.com/`]}],name:`栏目`,maintainers:[`nczitzk`],handler:a,description:`时政

| 时代观察 | 舆论战争 |
| -------- | -------- |
| shidai   | yulun    |

  经济

| 经济视点 | 社会民生 | 三农关注 | 产业研究 |
| -------- | -------- | -------- | -------- |
| jingji   | shehui   | sannong  | chanye   |

  国际

| 国际纵横 | 国防外交 |
| -------- | -------- |
| guoji    | guofang  |

  思潮

| 理想之旅 | 思潮碰撞 | 文艺新生 | 读书交流 |
| -------- | -------- | -------- | -------- |
| lixiang  | sichao   | wenyi    | shushe   |

  历史

| 历史视野 | 中华文化 | 中华医药 | 共产党人 |
| -------- | -------- | -------- | -------- |
| lishi    | zhonghua | zhongyi  | cpers    |

  争鸣

| 风华正茂 | 工农之声 | 网友杂谈 | 网友时评 |
| -------- | -------- | -------- | -------- |
| qingnian | gongnong | zatan    | shiping  |

  活动

| 乌有公告 | 红色旅游 | 乌有讲堂  | 书画欣赏 |
| -------- | -------- | --------- | -------- |
| gonggao  | lvyou    | jiangtang | shuhua   |`};async function a(i){let a=i.req.param(`id`)??`shidai`,o=`http://www.wyzxwk.com/Article/${a}`,s=await n({method:`get`,url:o}),c=r(s.data);c(`.g-sd`).remove();let l=c(`h3 a`).toArray().map(e=>(e=c(e),{title:e.text(),link:e.attr(`href`)}));return l=await Promise.all(l.map(i=>e.tryGet(i.link,async()=>{if(i.link.indexOf(`wyzxwk.com`)>0)try{let e=await n({method:`get`,url:i.link}),a=r(e.data);a(`.zs-modal-body`).prev().nextAll().remove();let o=e.data.match(/<span class="s-grey-3">(\d{4}-\d{2}-\d{2})<\/span>/);o&&(i.pubDate=t(o[1],`YYYY-MM-DD`)),i.description=a(`article`).html()}catch{i.description=``}return i}))),{title:`${c(`title`).text().split(` - `)[0]} - 乌有之乡网刊`,link:o,item:l}}export{i as route};
//# sourceMappingURL=article-DmPlzqXu.js.map