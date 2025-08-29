import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{load as r}from"cheerio";const i=`https://gs.bjtu.edu.cn`,a=`${i}/cms/item/?tag=`,o=`${i}/cms/zszt/item/?cat=`,s=/_zszt/,c={noti_zs:{selector:{list:`.tab-content li`},tag:1,name:`通知公告_招生`},noti:{selector:{list:`.tab-content li`},tag:2,name:`通知公告`},news:{selector:{list:`.tab-content li`},tag:3,name:`新闻动态`},zsxc:{selector:{list:`.tab-content li`},tag:4,name:`招生宣传`},py:{selector:{list:`.tab-content li`},tag:5,name:`培养`},zs:{selector:{list:`.tab-content li`},tag:6,name:`招生`},xw:{selector:{list:`.tab-content li`},tag:7,name:`学位`},ygb:{selector:{list:`.tab-content li`},tag:8,name:`研工部`},ygbtzgg:{selector:{list:`.tab-content li`},tag:9,name:`通知公告 - 研工部`},ygbnews:{selector:{list:`.tab-content li`},tag:10,name:`新闻动态 - 研工部`},ygbnewscover:{selector:{list:`.tab-content li`},tag:11,name:`新闻封面 - 研工部`},all:{selector:{list:`.tab-content li`},tag:12,name:`文章列表`},bszs_zszt:{selector:{list:`.mainleft_box li`},tag:2,name:`博士招生 - 招生专题`},sszs_zszt:{selector:{list:`.mainleft_box li`},tag:3,name:`硕士招生 - 招生专题`},zsjz_zszt:{selector:{list:`.mainleft_box li`},tag:4,name:`招生简章 - 招生专题`},zcfg_zszt:{selector:{list:`.mainleft_box li`},tag:5,name:`政策法规 - 招生专题`}},l=(a,o)=>{let s=a.find(`a`),c=a.find(`span`).text().match(/\d{4}(-|\/|.)\d{1,2}\1\d{1,2}/)[0],l=s.text(),u=i+s.attr(`href`);return e.tryGet(u,async()=>{let e=await n(u),i=r(e),a=i(o).html();return{title:l,pubDate:t(c),link:u,description:a}})},u={path:`/gs/:type?`,categories:[`university`],example:`/bjtu/gs/noti`,parameters:{type:`Article type`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`gs.bjtu.edu.cn`]}],name:`研究生院`,maintainers:[`E1nzbern`],handler:d,description:`
| 文章来源           | 参数         |
| ----------------- | ------------ |
| 通知公告_招生      | noti_zs      |
| 通知公告           | noti         |
| 新闻动态           | news         |
| 招生宣传           | zsxc         |
| 培养               | py           |
| 招生               | zs           |
| 学位               | xw           |
| 研工部             | ygb          |
| 通知公告 - 研工部   | ygbtzgg      |
| 新闻动态 - 研工部   | ygbnews      |
| 新闻封面 - 研工部   | ygbnewscover |
| 文章列表           | all          |
| 博士招生 - 招生专题 | bszs_zszt    |
| 硕士招生 - 招生专题 | sszs_zszt    |
| 招生简章 - 招生专题 | zsjz_zszt    |
| 政策法规 - 招生专题 | zcfg_zszt    |

::: tip
  文章来源的命名均来自研究生院网站标题。
  最常用的几项有“通知公告_招生”、“通知公告”、“博士招生 - 招生专题”、“硕士招生 - 招生专题”。
:::`};async function d(e){let{type:t=`noti`}=e.req.param(),i=a,u=`div.main_left.main_left_list`;s.test(t)&&(i=o,u=`div.mainleft_box`);let d=`${i}${c[t].tag}`,f=await n(d),p=r(f),m=p(c[t].selector.list),h=await Promise.all(m.toArray().map(e=>{let t=p(e);return l(t,u)}));return{title:`${c[t].name} - 北京交通大学研究生院`,link:d,item:h,allowEmpty:!0}}export{u as route};
//# sourceMappingURL=gs-DDziFjqc.js.map