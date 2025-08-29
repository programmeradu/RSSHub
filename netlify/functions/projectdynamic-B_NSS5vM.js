import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import s from"node:path";t();const c={path:`/projectdynamic/:type?/:stage?/:status?`,categories:[`finance`],example:`/szse/projectdynamic`,parameters:{type:`类型，见下表，默认为IPO`,stage:`阶段，见下表，默认为全部`,status:`状态，见下表，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`listing.szse.cn/projectdynamic/1/index.html`,`listing.szse.cn/projectdynamic/2/index.html`,`listing.szse.cn/projectdynamic/3/index.html`,`listing.szse.cn/`]}],name:`创业板项目动态`,maintainers:[`nczitzk`],handler:l,url:`listing.szse.cn/projectdynamic/1/index.html`,description:`类型

| IPO | 再融资 | 重大资产重组 |
| --- | ------ | ------------ |
| 1   | 2      | 3            |

  阶段

| 全部 | 受理 | 问询 | 上市委会议 |
| ---- | ---- | ---- | ---------- |
| 0    | 10   | 20   | 30         |

| 提交注册 | 注册结果 | 中止 | 终止 |
| -------- | -------- | ---- | ---- |
| 35       | 40       | 50   | 60   |

  状态

| 全部 | 新受理 | 已问询 | 通过 | 未通过 |
| ---- | ------ | ------ | ---- | ------ |
| 0    | 20     | 30     | 45   | 44     |

| 暂缓审议 | 复审通过 | 复审不通过 | 提交注册 |
| -------- | -------- | ---------- | -------- |
| 46       | 56       | 54         | 60       |

| 注册生效 | 不予注册 | 补充审核 | 终止注册 |
| -------- | -------- | -------- | -------- |
| 70       | 74       | 78       | 76       |

| 中止 | 审核不通过 | 撤回 |
| ---- | ---------- | ---- |
| 80   | 90         | 95   |`};async function l(t){let c={1:`IPO`,2:`再融资`,3:`重大资产重组`},l={10:`受理`,20:`问询`,30:`上市委会议`,35:`提交注册`,40:`注册结果`,50:`中止`,60:`终止`},u={20:`新受理`,30:`已问询`,45:`通过`,44:`未通过`,46:`暂缓审议`,56:`复审通过`,54:`复审不通过`,60:`提交注册`,70:`注册生效`,74:`不予注册`,78:`补充审核`,76:`终止注册`,80:`中止`,90:`审核不通过`,95:`撤回`},d=t.req.param(`type`)??`1`,f=t.req.param(`stage`)??`0`,p=t.req.param(`status`)??`0`,m=`http://listing.szse.cn`,h=`${m}/api/ras/projectrends/query?bizType=${d}${f===`0`?``:`&stage=${f}`}${p===`0`?``:`&status=${p}`}&pageIndex=0&pageSize=20`,g=await a({method:`get`,url:h}),_=g.data.data.map(e=>({title:e.prjid,link:`${m}/api/ras/projectrends/details?id=${e.prjid}`}));return _=await Promise.all(_.map(t=>n.tryGet(t.link,async()=>{let n=await a({method:`get`,url:t.link}),c=n.data.data,l=JSON.parse(c.pjdot)[-1];return t.link=`${m}/projectdynamic/ipo/detail/index.html?id=${t.title}`,t.title=`[${c.prjst}] ${c.cmpnm} (${c.cmpsnm})- ${c.csrcind}`,t.description=r(s.join(e,`templates/description-cb121da6.art`),{data:c,current:l}),t.pubDate=o(i(l.startTime,`YYYY-MM-DD HH:mm:ss`),8),t}))),{title:`${c[d]}项目动态${p===`0`?f===`0`?``:` (${l[f]}) `:` (${u[p]}) `} - 创业板发行上市审核信息公开网站 - 深圳证券交易所`,link:`${m}/projectdynamic/${d}/index.html`,item:_}}export{c as route};
//# sourceMappingURL=projectdynamic-B_NSS5vM.js.map