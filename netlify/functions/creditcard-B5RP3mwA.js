import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{wait_default as n}from"./wait-baJzjFxf.js";import{load as r}from"cheerio";import i from"iconv-lite";import a from"p-map";const o=e=>i.decode(e,`gbk`);async function s(e){let i=Math.floor(Math.random()*2001)+1e3;await n(i);let a=await t.get(e,{responseType:`buffer`}),s=r(o(a.data));s(`.lookMore`).remove(),s(`script, style`).remove(),s(`#loginDialog`).remove();let c=s(`.firstpost`);c.find(`ignore_js_op img`).each(function(){s(this).attr(`src`,s(this).attr(`file`));for(let e of[`id`,`aid`,`zoomfile`,`file`,`zoomfile`,`class`,`onclick`,`title`,`inpost`,`alt`,`onmouseover`])s(this).removeAttr(e)});let l=c.find(`ignore_js_op img`);c.find(`ignore_js_op`).remove(),c.append(l);let u=c.html();return{description:u}}const c=(e,t)=>a(e,async e=>{let n=r(e),i=n(`.comiis_common a[data-track='版块页主题分类']`),a=n(`.comiis_common a[data-track='版块页文章']`),o=new URL(a.attr(`href`),`https://www.flyert.com.cn`).href,c={title:i.text()+`-`+a.text(),link:o,guid:o},l=await t.tryGet(o,()=>s(o));return Object.assign({},c,l)},{concurrency:2});var l={ProcessFeed:c};const u=e=>i.decode(e,`gbk`),d={path:`/creditcard/:bank`,categories:[`travel`],example:`/flyert/creditcard/zhongxin`,parameters:{bank:`信用卡板块各银行的拼音简称`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`flyert.com.cn/`]}],name:`信用卡`,maintainers:[`nicolaszf`],handler:f,url:`flyert.com/`,description:`| 信用卡模块 | bank          |
| ---------- | ------------- |
| 国内信用卡 | creditcard    |
| 浦发银行   | pufa          |
| 招商银行   | zhaoshang     |
| 中信银行   | zhongxin      |
| 交通银行   | jiaotong      |
| 中国银行   | zhonghang     |
| 工商银行   | gongshang     |
| 广发银行   | guangfa       |
| 农业银行   | nongye        |
| 建设银行   | jianshe       |
| 汇丰银行   | huifeng       |
| 民生银行   | mingsheng     |
| 兴业银行   | xingye        |
| 花旗银行   | huaqi         |
| 上海银行   | shanghai      |
| 无卡支付   | wuka          |
| 投资理财   | 137           |
| 网站权益汇 | 145           |
| 境外信用卡 | intcreditcard |`};async function f(n){let i=n.req.param(`bank`),a=`https://www.flyert.com.cn/forum-${i}-1.html`,o=``;switch(i){case`creditcard`:o=`国内信用卡`;break;case`pufa`:o=`浦发银行`;break;case`zhaoshang`:o=`招商银行`;break;case`zhongxin`:o=`中信银行`;break;case`jiaotong`:o=`交通银行`;break;case`zhonghang`:o=`中国银行`;break;case`gongshang`:o=`工商银行`;break;case`guangfa`:o=`广发银行`;break;case`nongye`:o=`农业银行`;break;case`jianshe`:o=`建设银行`;break;case`huifeng`:o=`汇丰银行`;break;case`mingsheng`:o=`民生银行`;break;case`xingye`:o=`兴业银行`;break;case`huaqi`:o=`花旗银行`;break;case`shanghai`:o=`上海银行`;break;case`wuka`:o=`无卡支付`;break;case`137`:o=`投资理财`;break;case`145`:o=`网站权益汇`;break;case`intcreditcard`:o=`境外信用卡`}let s=await t.get(a,{responseType:`buffer`}),c=r(u(s.data)),d=c(`[id*='normalthread']`).toArray(),f=await l.ProcessFeed(d,e);return{title:`飞客茶馆信用卡 - ${o}`,link:`https://www.flyert.com.cn/`,description:`飞客茶馆信用卡 - ${o}`,item:f}}export{d as route};
//# sourceMappingURL=creditcard-B5RP3mwA.js.map