import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import o from"node:path";import{load as s}from"cheerio";t();const c=(e,t=[])=>{for(let n of e){let{key:e,value:r,children:i}=n;t.push({key:e,value:r}),i&&i.length>0&&c(i,t)}return t},l={path:`/report/:industry?/:label?`,categories:[`new-media`],example:`/questmobile/report`,parameters:{industry:"行业，见下表，默认为 `-1`，即全部行业",label:"标签，见下表，默认为 `-1`，即全部标签"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`行业研究报告`,maintainers:[`nczitzk`],handler:u,description:`::: tip
  若订阅行业 [互联网行业](https://www.questmobile.com.cn/research/reports/1/-1)，网址为 \`https://www.questmobile.com.cn/research/reports/1/-1\`
  参数 industry 为 \`互联网行业\` 或 \`1\`，此时路由为 [\`/questmobile/report/互联网行业\`](https://rsshub.app/questmobile/report/互联网行业) 或 [\`/questmobile/report/1/-1\`](https://rsshub.app/questmobile/report/1/-1)。

  若订阅标签 [榜单](https://www.questmobile.com.cn/research/reports/-1/11)，网址为 \`https://www.questmobile.com.cn/research/reports/-1/11\`
  参数 label 为 \`榜单\` 或 \`11\`，此时路由为 [\`/questmobile/report/榜单\`](https://rsshub.app/questmobile/report/榜单) 或 [\`/questmobile/report/-1/11\`](https://rsshub.app/questmobile/report/-1/11)。

  若订阅行业和标签 [品牌领域 - 互联网经济](https://www.questmobile.com.cn/research/reports/2/1)，网址为 \`https://www.questmobile.com.cn/research/reports/2/1\`
  参数 industry 为 \`品牌领域\` 或 \`2\`，参数 label 为 \`互联网经济\` 或 \`1\`，此时路由为 [\`/questmobile/report/品牌领域/互联网经济\`](https://rsshub.app/questmobile/report/品牌领域/互联网经济) 或 [\`/questmobile/report/2/1\`](https://rsshub.app/questmobile/report/2/1)，甚至 [\`/questmobile/report/品牌领域/1\`](https://rsshub.app/questmobile/report/品牌领域/1)。
:::

<details>
<summary>全部行业和标签</summary>

#### 行业

| 互联网行业 | 移动社交 | 移动视频 | 移动购物 | 系统工具 |
| ---------- | -------- | -------- | -------- | -------- |
| 1          | 1001     | 1002     | 1003     | 1004     |

| 出行服务 | 金融理财 | 生活服务 | 移动音乐 | 新闻资讯 |
| -------- | -------- | -------- | -------- | -------- |
| 1005     | 1006     | 1007     | 1008     | 1009     |

| 办公商务 | 手机游戏 | 实用工具 | 数字阅读 | 教育学习 |
| -------- | -------- | -------- | -------- | -------- |
| 1010     | 1011     | 1012     | 1013     | 1014     |

| 汽车服务 | 拍摄美化 | 智能设备 | 旅游服务 | 健康美容 |
| -------- | -------- | -------- | -------- | -------- |
| 1015     | 1016     | 1017     | 1018     | 1020     |

| 育儿母婴 | 主题美化 | 医疗服务 | 品牌领域 | 美妆品牌 |
| -------- | -------- | -------- | -------- | -------- |
| 1022     | 1023     | 1024     | 2        | 2001     |

| 母婴品牌 | 家电品牌 | 食品饮料品牌 | 汽车品牌 | 服饰箱包品牌 |
| -------- | -------- | ------------ | -------- | ------------ |
| 2002     | 2003     | 2004         | 2005     | 2006         |

#### 标签

| 互联网经济 | 圈层经济 | 粉丝经济 | 银发经济 | 儿童经济 |
| ---------- | -------- | -------- | -------- | -------- |
| 1          | 1001     | 1002     | 1004     | 1005     |

| 萌宠经济 | 她经济 | 他经济 | 泛娱乐经济 | 下沉市场经济 |
| -------- | ------ | ------ | ---------- | ------------ |
| 1007     | 1009   | 1010   | 1011       | 1012         |

| 内容经济 | 订阅经济 | 会员经济 | 居家经济 | 到家经济 |
| -------- | -------- | -------- | -------- | -------- |
| 1013     | 1014     | 1015     | 1016     | 1017     |

| 颜值经济 | 闲置经济 | 旅游经济            | 人群洞察 | 00 后 |
| -------- | -------- | ------------------- | -------- | ----- |
| 1018     | 1020     | 1622842051677753346 | 2        | 2002  |

| Z 世代 | 银发族 | 宝妈宝爸 | 萌宠人群 | 运动达人 |
| ------ | ------ | -------- | -------- | -------- |
| 2003   | 2004   | 2005     | 2007     | 2008     |

| 女性消费 | 男性消费 | 游戏人群 | 二次元 | 新中产 |
| -------- | -------- | -------- | ------ | ------ |
| 2009     | 2010     | 2012     | 2013   | 2014   |

| 下沉市场用户 | 大学生 | 数字化营销 | 广告效果 | 品牌营销 |
| ------------ | ------ | ---------- | -------- | -------- |
| 2018         | 2022   | 3          | 3001     | 3002     |

| 全域营销 | 私域流量 | 新媒体营销 | KOL 生态 | 内容营销 |
| -------- | -------- | ---------- | -------- | -------- |
| 3003     | 3004     | 3005       | 3006     | 3008     |

| 直播电商 | 短视频带货 | 娱乐营销            | 营销热点 | 双 11 电商大促 |
| -------- | ---------- | ------------------- | -------- | -------------- |
| 3009     | 3010       | 1630464311158738945 | 4        | 4001           |

| 618 电商大促 | 春节营销 | 五一假期营销 | 热点事件盘点 | 消费热点 |
| ------------ | -------- | ------------ | ------------ | -------- |
| 4002         | 4003     | 4004         | 4007         | 5        |

| 时尚品牌 | 连锁餐饮 | 新式茶饮 | 智能家电 | 国潮品牌 |
| -------- | -------- | -------- | -------- | -------- |
| 5001     | 5002     | 5003     | 5004     | 5007     |

| 白酒品牌            | 精益运营 | 媒介策略 | 用户争夺 | 精细化运营 |
| ------------------- | -------- | -------- | -------- | ---------- |
| 1622841828310093825 | 6        | 6001     | 6002     | 6003       |

| 用户分层 | 增长黑马 | 社交裂变 | 新兴领域 | 新能源汽车 |
| -------- | -------- | -------- | -------- | ---------- |
| 6004     | 6005     | 6007     | 7        | 7001       |

| 智能汽车 | 新消费 | AIoT | 产业互联网 | AIGC                |
| -------- | ------ | ---- | ---------- | ------------------- |
| 7002     | 7003   | 7004 | 7005       | 1645677998450511873 |

| OTT 应用            | 智能电视            | 全景数据 | 全景生态 | 微信小程序 |
| ------------------- | ------------------- | -------- | -------- | ---------- |
| 1676063510499528705 | 1676063630293045249 | 8        | 8001     | 8002       |

| 支付宝小程序 | 百度智能小程序 | 企业流量            | 抖音小程序          | 手机终端 |
| ------------ | -------------- | ------------------- | ------------------- | -------- |
| 8003         | 8004           | 1671052842096496642 | 1676063017220018177 | 9        |

| 智能终端 | 国产终端 | 5G 手机 | 盘点 | 季度报告 |
| -------- | -------- | ------- | ---- | -------- |
| 9001     | 9002     | 9003    | 10   | 10001    |
</details>`};async function u(t){let{industry:l,label:u}=t.req.param(),d=t.req.query(`limit`)?Number.parseInt(t.req.query(`limit`),10):50,f=`https://www.questmobile.com.cn`,p=new URL(`api/v2/report/article-list`,f).href,m=new URL(`api/v2/report/industry-label-tree`,f).href,{data:{data:{industryTree:h,labelTree:g}}}=await a(m),_=c(h),v=c(g),y=l?_.find(e=>e.key===l||e.value===l):void 0,b=u?v.find(e=>e.key===u||e.value===u):y?void 0:v.find(e=>e.key===l||e.value===l),x=y?.key??-1,S=b?.key??-1,C=new URL(`research/reports/${y?.key??-1}/${b?.key??-1}`,f).href,{data:w}=await a(p,{searchParams:{version:0,pageSize:d,pageNo:1,industryId:x,labelId:S}}),T=w.data.slice(0,d).map(t=>({title:t.title,link:new URL(`research/report/${t.id}`,f).href,description:r(o.join(e,`templates/description-8a9c85d2.art`),{image:{src:t.coverImgUrl,alt:t.title},introduction:t.introduction,description:t.content}),category:[...t.industryList??[],...t.labelList??[]],guid:`questmobile-report#${t.id}`,pubDate:i(t.publishTime)}));T=await Promise.all(T.map(t=>n.tryGet(t.link,async()=>{let{data:n}=await a(t.link),c=s(n);return c(`div.text div.daoyu`).remove(),t.title=c(`div.title h1`).text(),t.description+=r(o.join(e,`templates/description-8a9c85d2.art`),{description:c(`div.text`).html()}),t.author=c(`div.source`).text().replace(/^.*?：/,``),t.category=c(`div.hy, div.keyword`).find(`span`).toArray().map(e=>c(e).text()),t.pubDate=i(c(`div.data span`).prop(`datetime`)),t})));let{data:E}=await a(C),D=s(E),O=D(`meta[property="og:title"]`).prop(`content`).split(/-/)[0],k=[y?.value,b?.value].filter(Boolean),A=D(`img[alt="${O}"]`).prop(`src`),j=D(`link[rel="shortcut icon"]`).prop(`href`);return{item:T,title:`${O}${k.length===0?``:` - ${k.join(` - `)}`}`,link:C,description:D(`meta[property="og:description"]`).prop(`content`),language:`zh`,image:A,icon:j,logo:j,subtitle:D(`meta[name="keywords"]`).prop(`content`),author:O,allowEmpty:!0}}export{l as route};
//# sourceMappingURL=report-ClEj4vD0.js.map