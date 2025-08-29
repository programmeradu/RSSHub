import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import{config as n}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as r}from"./cache-kimkMTWJ.js";import{art as i}from"./render-CxhTJIsl.js";import{parseDate as a}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as o}from"./got-CdvI2yKX.js";import{timezone as s}from"./timezone-BrNu6iXe.js";import{config_not_found_default as c}from"./config-not-found-BVqhRP9D.js";import l from"node:path";import{load as u}from"cheerio";import d from"p-map";t();const f=new Set([`52bdys.com`,`bde4.icu`,`bdys01.com`]),p={path:`/:caty?/:type?/:area?/:year?/:order?`,categories:[`multimedia`],example:`/bdys`,parameters:{caty:"影视类型，见下表，默认为 `all` 即不限",type:"资源分类，见下表，默认为 `all` 即不限",area:"制片地区，见下表，默认为 `all` 即不限",year:"上映时间，此处填写年份不小于2000，默认为 `all` 即不限",order:`影视排序，见下表，默认为更新时间`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`首页`,maintainers:[`nczitzk`],handler:m,description:`#### 资源分类

| 不限 | 电影 | 电视剧 |
| ---- | ---- | ------ |
| all  | 0    | 1      |

#### 影视类型

| 不限 | 动作    | 爱情   | 喜剧 | 科幻   | 恐怖   |
| ---- | ------- | ------ | ---- | ------ | ------ |
| all  | dongzuo | aiqing | xiju | kehuan | kongbu |

| 战争      | 武侠  | 魔幻   | 剧情   | 动画    | 惊悚     |
| --------- | ----- | ------ | ------ | ------- | -------- |
| zhanzheng | wuxia | mohuan | juqing | donghua | jingsong |

| 3D | 灾难   | 悬疑   | 警匪    | 文艺  | 青春     |
| -- | ------ | ------ | ------- | ----- | -------- |
| 3D | zainan | xuanyi | jingfei | wenyi | qingchun |

| 冒险    | 犯罪   | 纪录 | 古装     | 奇幻   | 国语  |
| ------- | ------ | ---- | -------- | ------ | ----- |
| maoxian | fanzui | jilu | guzhuang | qihuan | guoyu |

| 综艺   | 历史  | 运动    | 原创压制   |
| ------ | ----- | ------- | ---------- |
| zongyi | lishi | yundong | yuanchuang |

| 美剧  | 韩剧  | 国产电视剧 | 日剧 | 英剧   | 德剧 |
| ----- | ----- | ---------- | ---- | ------ | ---- |
| meiju | hanju | guoju      | riju | yingju | deju |

| 俄剧 | 巴剧 | 加剧  | 西剧    | 意大利剧 | 泰剧  |
| ---- | ---- | ----- | ------- | -------- | ----- |
| eju  | baju | jiaju | spanish | yidaliju | taiju |

| 港台剧    | 法剧 | 澳剧 |
| --------- | ---- | ---- |
| gangtaiju | faju | aoju |

#### 制片地区

| 大陆 | 中国香港 | 中国台湾 |
| ---- | -------- | -------- |

| 美国 | 英国 | 日本 | 韩国 | 法国 |
| ---- | ---- | ---- | ---- | ---- |

| 印度 | 德国 | 西班牙 | 意大利 | 澳大利亚 |
| ---- | ---- | ------ | ------ | -------- |

| 比利时 | 瑞典 | 荷兰 | 丹麦 | 加拿大 | 俄罗斯 |
| ------ | ---- | ---- | ---- | ------ | ------ |

#### 影视排序

| 更新时间 | 豆瓣评分 |
| -------- | -------- |
| 0        | 1        |`};async function m(t){let p=t.req.param(`caty`)||`all`,m=t.req.param(`type`)||`all`,h=t.req.param(`area`)||`all`,g=t.req.param(`year`)||`all`,_=t.req.param(`order`)||`0`,v=t.req.query(`domain`)||`bdys01.com`;if(!n.feature.allow_user_supply_unsafe_domain&&!f.has(new URL(`https://${v}`).hostname))throw new c(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);let y=`https://www.${v}`,b=`${y}/s/${p}?${m===`all`?``:`&type=`+m}${h===`all`?``:`&area=`+h}${g===`all`?``:`&year=`+g}&order=${_}`,x=await o({method:`get`,url:b}),S=u(x.data),C=``,w=S(`.card-body .card a`).slice(0,15).toArray().map(e=>{e=S(e);let t=e.attr(`href`).split(`;jsessionid=`);C=t[1];let n=e.next();return{title:n.find(`h3`).text(),link:`${y}${t[0]}`,pubDate:a(n.find(`.text-muted`).text())}}),T={cookie:`JSESSIONID=${C}`},E=await d(w,t=>r.tryGet(t.link,async()=>{let n=await o({method:`get`,url:t.link,headers:T}),r=await o({method:`get`,url:`${y}/downloadInfo/list?mid=${t.link.split(`/`)[4].split(`.`)[0]}`,headers:T}),c=u(n.data);c(`svg`).remove();let d=c(`.download-list .list-group`);return t.description=i(l.join(e,`templates/desc-e98cff24.art`),{info:c(`.row.mt-3`).html(),synopsis:c(`#synopsis`).html(),links:r.data,torrents:d.html()}),t.pubDate=s(a(c(`.bg-purple-lt`).text().replace(`更新时间：`,``)),8),t.guid=`${t.link}#${c(`.card h1`).text()}`,t.enclosure_url=d.html()?`${y}${d.find(`a`).first().attr(`href`)}`:r.data.pop().url,t.enclosure_type=`application/x-bittorrent`,t}),{concurrency:1});return{title:`哔嘀影视`,link:b,item:E}}export{p as route};
//# sourceMappingURL=bdys-BDGUMGvm.js.map