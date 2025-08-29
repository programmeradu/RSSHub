import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./render-CxhTJIsl.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import"./timezone-BrNu6iXe.js";import{ProcessItems as n,rootUrl as r}from"./utils-BPPoW_Xu.js";const i={path:`/video/:id?`,categories:[`traditional-media`],example:`/yicai/video`,parameters:{id:`分类 id，见下表，可在对应分类页中找到，默认为视听`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`yicai.com/video/:id`,`yicai.com/video`],target:`/video/:id`}],name:`视听`,maintainers:[`nczitzk`],handler:a,description:`| Id                   | 名称                         |
| -------------------- | ---------------------------- |
| youliao              | 有料                         |
| appshipin            | 此刻                         |
| yicaisudi            | 速递                         |
| caishang             | 财商                         |
| shiji                | 史记                         |
| jinrigushi           | 今日股市                     |
| tangulunjin          | 谈股论金                     |
| gongsiyuhangye       | 公司与行业                   |
| cjyxx                | 财经夜行线                   |
| 6thtradingday        | 第六交易日                   |
| cjfw                 | 财经风味                     |
| chuangshidai         | 创时代                       |
| weilaiyaoqinghan     | 未来邀请函                   |
| tounaofengbao        | 头脑风暴                     |
| zhongguojingyingzhe  | 中国经营者                   |
| shichanglingjuli     | 市场零距离                   |
| huanqiucaijing       | 环球财经视界                 |
| zgjcqyjglsxftl       | 中国杰出企业家管理思想访谈录 |
| jiemacaishang        | 解码财商                     |
| sxpl                 | 首席评论                     |
| zhongguojingjiluntan | 中国经济论坛                 |
| opinionleader        | 意见领袖                     |
| xinjinrong           | 解码新金融                   |
| diyidichan           | 第一地产                     |
| zhichedaren          | 智车达人                     |
| chuangtoufengyun     | 创投风云                     |
| chunxiangrensheng    | 醇享人生                     |
| diyishengyin         | 第一声音                     |
| sanliangboqianjin    | 财智双全                     |
| weilaiyaoqinghan     | 未来邀请函                   |
| zjdy                 | 主角 ▪ 大医                 |
| leye                 | 乐业之城                     |
| sanrenxing           | 价值三人行                   |
| yuandongli           | 中国源动力                   |
| pioneerzone          | 直击引领区                   |`};async function a(i){let a=i.req.param(`id`)??``,o;if(a){let e=`${r}/api/ajax/getnavs`,n=await t({method:`get`,url:e});for(let e of n.data.header.video)if(e.EnglishName===a||e.ChannelID===a){o={id:e.ChannelID,name:e.ChannelName,slug:e.EnglishName};break}}let s=`${r}/video${a?`/${o.slug}`:``}`,c=`${r}/api/ajax/${a?`getlistbycid?cid=${o.id}`:`getjuhelist?action=video`}&page=1&pagesize=${i.req.query(`limit`)??30}`,l=await n(c,e.tryGet);return{title:`第一财经 - ${o?.name??`视听`}`,link:s,item:l}}export{i as route};
//# sourceMappingURL=video-zSJcIC6p.js.map