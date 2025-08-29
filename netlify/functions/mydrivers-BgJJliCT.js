import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import"./cache-kimkMTWJ.js";import{art as n}from"./render-CxhTJIsl.js";import{parseDate as r}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as i}from"./got-CdvI2yKX.js";import{timezone as a}from"./timezone-BrNu6iXe.js";import{categories as o,convertToQueryString as s,getInfo as c,processItems as l,rootUrl as u,title as d}from"./util-Dess27yo.js";import f from"node:path";import{load as p}from"cheerio";t();const m={path:`/:category{.+}?`,name:`分类`,parameters:{category:`分类，见下表，默认为最新`},example:`/mydrivers/bcid/801`,maintainers:[`kt286`,`nczitzk`],handler:h,radar:[{source:[`m.mydrivers.com/`],target:`/zhibo`}],description:`
#### 板块

| 电脑     | 手机     | 汽车     | 业界     | 游戏     |
| -------- | -------- | -------- | -------- | -------- |
| bcid/801 | bcid/802 | bcid/807 | bcid/803 | bcid/806 |

#### 话题

| 科学     | 排行     | 评测     | 一图     |
| -------- | -------- | -------- | -------- |
| tid/1000 | tid/1001 | tid/1002 | tid/1003 |

#### 品牌

| 安卓     | 阿里     | 微软    | 百度    | PS5       | Xbox     | 华为     |
| -------- | -------- | ------- | ------- | --------- | -------- | -------- |
| icid/121 | icid/270 | icid/90 | icid/67 | icid/6950 | icid/194 | icid/136 |

| 小米      | VIVO     | 三星     | 魅族     | 一加     | 比亚迪   | 小鹏      |
| --------- | -------- | -------- | -------- | -------- | -------- | --------- |
| icid/9355 | icid/288 | icid/154 | icid/140 | icid/385 | icid/770 | icid/7259 |

| 蔚来      | 理想       | 奔驰     | 宝马     | 大众     |
| --------- | ---------- | -------- | -------- | -------- |
| icid/7318 | icid/12947 | icid/429 | icid/461 | icid/481 |
`};async function h(t){let{category:m=`new`}=t.req.param(),h=``;/^(\w+\/\w+)$/.test(m)||(h=`${d} - ${Object.hasOwn(o,m)?o[m]:o[Object.keys(o)[0]]}`,m=`ac/${m}`);let g=t.req.query(`limit`)?Number.parseInt(t.req.query(`limit`),10):20,_=s(m),v=new URL(`newsclass.aspx${_}`,u).href,y=new URL(`m/newslist.ashx${_}`,u).href,{data:b}=await i(y),x=p(b),S=x(`li[data-id]`).slice(0,g).toArray().map(t=>(t=x(t),{title:t.find(`div.news_title`).text(),link:new URL(t.find(`div.news_title span.newst a`).prop(`href`),u).href,description:n(f.join(e,`templates/description-0bcaa0e1.art`),{image:t.find(`a.newsimg img`).prop(`src`)}),author:t.find(`p.tname`).text(),guid:t.prop(`data-id`),pubDate:a(r(t.find(`p.ttime`).text()),8),comments:t.find(`a.tpinglun`).text()?Number.parseInt(t.find(`a.tpinglun`).text(),10):0}));return S=await l(S),{...await c(v),...h?{title:h}:{},item:S}}export{m as route};
//# sourceMappingURL=mydrivers-BgJJliCT.js.map