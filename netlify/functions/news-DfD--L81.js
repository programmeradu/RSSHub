import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./render-CxhTJIsl.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import"./timezone-BrNu6iXe.js";import{ProcessItems as n,rootUrl as r}from"./utils-BPPoW_Xu.js";const i={path:`/news/:id?`,categories:[`traditional-media`],example:`/yicai/news`,parameters:{id:`分类 id，见下表，可在对应分类页中找到，默认为新闻`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`yicai.com/news/:id`,`yicai.com/news`],target:`/news/:id`}],name:`新闻`,maintainers:[`nczitzk`],handler:a,description:`| Id                       | 名称       |
| ------------------------ | ---------- |
| gushi                    | A 股       |
| kechuangban              | 科创板     |
| hongguan                 | 大政       |
| jinrong                  | 金融       |
| quanqiushichang          | 海外市场   |
| gongsi                   | 产经       |
| shijie                   | 全球       |
| kechuang                 | 科技       |
| quyu                     | 区域       |
| comment                  | 评论       |
| dafengwenhua             | 商业人文   |
| books                    | 阅读周刊   |
| loushi                   | 地产       |
| automobile               | 汽车       |
| china_financial_herald | 对话陆家嘴 |
| fashion                  | 时尚       |
| ad                       | 商业资讯   |
| info                     | 资讯       |
| jzfxb                    | 价值风向标 |
| shuducaijing             | 数读财经   |
| shujujiepan              | 数据解盘   |
| shudushenghuo            | 数读生活   |
| cbndata                  | CBNData    |
| dtcj                     | DT 财经    |
| xfsz                     | 消费数知   |`};async function a(i){let a=i.req.param(`id`)??``,o;if(a){let e=`${r}/api/ajax/getnavs`,n=await t({method:`get`,url:e});for(let e of n.data.header.news)if(e.EnglishName===a||e.ChannelID===a){o={id:e.ChannelID,name:e.ChannelName,slug:e.EnglishName};break}}let s=`${r}/news${a?`/${o.slug}`:``}`,c=`${r}/api/ajax/${a?`getlistbycid?cid=${o.id}`:`getjuhelist?action=news`}&page=1&pagesize=${i.req.query(`limit`)??30}`,l=await n(c,e.tryGet);return{title:`第一财经 - ${o?.name??`新闻`}`,link:s,item:l}}export{i as route};
//# sourceMappingURL=news-DfD--L81.js.map