import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i={"5dd92265e4b0bf88dd8c1175":`热点`,"5dd921a7e4b0bf88dd8c116f":`订阅`,"604f1cbbe4b0cf5c2234d470":`学党史`,"5dd92242e4b0bf88dd8c1174":`政经`,"61259fd6e4b0d294f7f9786d":`合作区`,"61dfe511e4b0248b60d1c568":`名记名播`,"5dd9222ce4b0bf88dd8c1173":`大湾区`,"617805e4e4b037abacfd4820":`网评`,"5dd9220de4b0bf88dd8c1172":`TV新闻`,"5e6edd50e4b02ebde0ab061e":`音频`,"600e8ad4e4b02c3a6af6aaa8":`澳门`,"600f760fe4b0e33cf6f8e68e":`政务`,"5ff7c0fde4b0e2f210d05e20":`教育`,"5fc88615e4b0e3055e693e0a":`深圳`,"600e8a93e4b02c3a6af6aa80":`中山`,"5dd921ece4b0bf88dd8c1170":`民生`,"61148184e4b08d3215364396":`社区`,"5dd9215fe4b0bf88dd8c116b":`专题`,"5e2e5107e4b0c14b5d0e3d04":`战疫`,"5f88eaf2e4b0a27cd404e09e":`横琴`,"5f86a3f5e4b09d75f99dde7d":`香洲`,"5e8c42b4e4b0347c7e5836e0":`金湾`,"5ee70534e4b07b8a779a1ad6":`斗门`,"607d37ade4b05c59ac2f3d40":`高新`},a={path:`/:column?`,categories:[`new-media`],example:`/hizu`,parameters:{column:`栏目，见下表，默认为热点`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`hizh.cn/`]}],name:`栏目`,maintainers:[`nczitzk`],handler:o,url:`hizh.cn/`,description:`| 分类     | 编号                     |
| -------- | ------------------------ |
| 热点     | 5dd92265e4b0bf88dd8c1175 |
| 订阅     | 5dd921a7e4b0bf88dd8c116f |
| 学党史   | 604f1cbbe4b0cf5c2234d470 |
| 政经     | 5dd92242e4b0bf88dd8c1174 |
| 合作区   | 61259fd6e4b0d294f7f9786d |
| 名记名播 | 61dfe511e4b0248b60d1c568 |
| 大湾区   | 5dd9222ce4b0bf88dd8c1173 |
| 网评     | 617805e4e4b037abacfd4820 |
| TV 新闻  | 5dd9220de4b0bf88dd8c1172 |
| 音频     | 5e6edd50e4b02ebde0ab061e |
| 澳门     | 600e8ad4e4b02c3a6af6aaa8 |
| 政务     | 600f760fe4b0e33cf6f8e68e |
| 教育     | 5ff7c0fde4b0e2f210d05e20 |
| 深圳     | 5fc88615e4b0e3055e693e0a |
| 中山     | 600e8a93e4b02c3a6af6aa80 |
| 民生     | 5dd921ece4b0bf88dd8c1170 |
| 社区     | 61148184e4b08d3215364396 |
| 专题     | 5dd9215fe4b0bf88dd8c116b |
| 战疫     | 5e2e5107e4b0c14b5d0e3d04 |
| 横琴     | 5f88eaf2e4b0a27cd404e09e |
| 香洲     | 5f86a3f5e4b09d75f99dde7d |
| 金湾     | 5e8c42b4e4b0347c7e5836e0 |
| 斗门     | 5ee70534e4b07b8a779a1ad6 |
| 高新     | 607d37ade4b05c59ac2f3d40 |`};async function o(a){let o=a.req.param(`column`)??`5dd92265e4b0bf88dd8c1175`,s=`https://www.hizh.cn`,c=`${s}/channels/zjyapp/columns/${o}/stories.json`,l=await n({method:`get`,url:c}),u=l.data.stories.slice(0,a.req.query(`limit`)?Number.parseInt(a.req.query(`limit`)):50).map(e=>({title:e.title,author:e.author,link:e.jsonUrl,category:e.columnName,pubDate:t(e.published)}));return u=await Promise.all(u.map(t=>e.tryGet(t.link,async()=>{let e=await n({method:`get`,url:t.link}),i=r(e.data.content);return i(`figure`).last().remove(),t.description=i.html(),t.link=`${s}/content.html?jsonUrl=${t.link}`,t}))),{title:`${i[o]} - 珠海网`,link:s,item:u}}export{a as route};
//# sourceMappingURL=hizu-C__YjIFW.js.map