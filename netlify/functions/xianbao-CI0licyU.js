import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";const n={path:`/:category?`,name:`线板酷`,url:`new.xianbao.fun`,maintainers:[`nashi23`],handler:r,example:`/xianbao`,parameters:{category:`类别id，默认为：latest`},description:`
| 分类         | id             |
| ------------ | -------------- |
| 最新         | latest         |
| 赚客吧       | zuankeba       |
| 赚客吧热帖   | zuankeba-hot   |
| 新赚吧       | xinzuanba      |
| 新赚吧热帖   | xinzuanba-hot  |
| 微博         | weibo          |
| 微博热帖     | weibo-hot      |
| 豆瓣线报     | douban         |
| 豆瓣热帖     | douban-hot     |
| 酷安         | kuan           |
| 小嘀咕       | xiaodigu       |
| 葫芦侠       | huluxia        |
| 小刀娱乐网   | xiadao         |
| 技术QQ网     | qqjishu        |
| YYOK大全     | yyok           |
| 活动资讯网   | huodong        |
| 免费赚钱中心 | mianfei        |
| 一小时       | yixiaoshi      |
| 三小时       | sanxiaoshi     |
| 六小时       | liuxiaoshi     |
| 十二小时     | shierxiaoshi   |
| 二十四小时   | ershisixiaoshi |
| 四十八小时   | sishibaxiaoshi |
| 今天         | jintian        |
| 昨天         | zuotian        |
| 前天         | qiantian       |
| 三天         | santian        |
| 五天         | wutian         |
| 七天         | qitian         |
| 十五天       | shiwutian      |`,categories:[`shopping`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`new.xianbao.fun`],target:`/`}]};async function r(n){let r=n.req.param()||{category:`latest`},a=``,o=r.category||`latest`,s=i.find(e=>e.id===o)||i.find(e=>e.id===`latest`),c=s.fullName,l=s.pushPath;a=o.endsWith(`xiaoshi`)||o.endsWith(`tian`)?`${o}-hot.html`:o.endsWith(`hot`)?`${o}.html`:o===`latest`?``:`category-${o}`;let u=`http://new.xianbao.fun/plus/json/${l}.json`,d=await t(u),f=JSON.parse(d.body),p;if(Array.isArray(f))p=f;else{let e=Object.keys(f).find(e=>e.startsWith(`remen`));p=f[e]}let m=p.map(t=>({title:t.title,link:`http://new.xianbao.fun${t.url}`,description:t.content,pubDate:e(t.shijianchuo*1e3),author:t.louzhu,category:t.catename}));return{title:`线板酷-${c}`,link:`http://new.xianbao.fun/${a}`,item:m}}const i=[{id:`latest`,fullName:`最新`,pushPath:`push`},{id:`yixiaoshi`,fullName:`一小时`,pushPath:`rank/yixiaoshi`},{id:`sanxiaoshi`,fullName:`三小时`,pushPath:`rank/sanxiaoshi`},{id:`liuxiaoshi`,fullName:`六小时`,pushPath:`rank/liuxiaoshi`},{id:`shierxiaoshi`,fullName:`十二小时`,pushPath:`rank/shierxiaoshi`},{id:`ershisixiaoshi`,fullName:`二十四小时`,pushPath:`rank/ershisixiaoshi`},{id:`sishibaxiaoshi`,fullName:`四十八小时`,pushPath:`rank/sishibaxiaoshi`},{id:`jintian`,fullName:`今天`,pushPath:`rank/jintian`},{id:`zuotian`,fullName:`昨天`,pushPath:`rank/zuotian`},{id:`qiantian`,fullName:`前天`,pushPath:`rank/qiantian`},{id:`santian`,fullName:`三天`,pushPath:`rank/santian`},{id:`wutian`,fullName:`五天`,pushPath:`rank/wutian`},{id:`qitian`,fullName:`七天`,pushPath:`rank/qitian`},{id:`shiwutian`,fullName:`十五天`,pushPath:`rank/shiwutian`},{id:`zuankeba`,fullName:`赚客吧`,pushPath:`push_16`},{id:`zuankeba-hot`,fullName:`赚客吧热帖`,pushPath:`rank/zuankeba-hot`},{id:`xinzuanba`,fullName:`新赚吧`,pushPath:`push_18`},{id:`xinzuanba-hot`,fullName:`新赚吧热帖`,pushPath:`rank/xinzuanba-hot`},{id:`weibo`,fullName:`微博`,pushPath:`push_10`},{id:`weibo-hot`,fullName:`微博热帖`,pushPath:`rank/weibo-hot`},{id:`douban`,fullName:`豆瓣线报`,pushPath:`push_23`},{id:`douban-hot`,fullName:`豆瓣热帖`,pushPath:`rank/douban-hot`},{id:`kuan`,fullName:`酷安`,pushPath:`push_17`},{id:`xiaodigu`,fullName:`小嘀咕`,pushPath:`push_11`},{id:`huluxia`,fullName:`葫芦侠`,pushPath:`push_20`},{id:`xiadao`,fullName:`小刀娱乐网`,pushPath:`push_3`},{id:`qqjishu`,fullName:`技术QQ网`,pushPath:`push_6`},{id:`yyok`,fullName:`YYOK大全`,pushPath:`push_7`},{id:`huodong`,fullName:`活动资讯网`,pushPath:`push_8`},{id:`mianfei`,fullName:`免费赚钱中心`,pushPath:`push_9`}];export{n as route};
//# sourceMappingURL=xianbao-CI0licyU.js.map