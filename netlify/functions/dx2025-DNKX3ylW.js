import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{load as n}from"cheerio";const r={path:`/:type?/:category?`,categories:[`new-media`],example:`/dx2025`,parameters:{type:`内容类别，见下表，默认为空`,category:`行业分类，见下表，默认为空`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`分类`,maintainers:[`nczitzk`],handler:i,description:`内容类别

| 产业观察             | 行业报告         | 政策   | 数据 |
| -------------------- | ---------------- | ------ | ---- |
| industry-observation | industry-reports | policy | data |

  行业分类

| 行业                 | 行业名称                                                          |
| -------------------- | ----------------------------------------------------------------- |
| 新一代信息技术       | next-generation-information-technology-industry-reports           |
| 高档数控机床和机器人 | high-grade-cnc-machine-tools-and-robots-industry-reports          |
| 航空航天装备         | aerospace-equipment-industry-reports                              |
| 海工装备及高技术船舶 | marine-engineering-equipment-and-high-tech-ships-industry-reports |
| 先进轨道交通装备     | advanced-rail-transportation-equipment-industry-reports           |
| 节能与新能源汽车     | energy-saving-and-new-energy-vehicles-industry-reports            |
| 电力装备             | electric-equipment-industry-reports                               |
| 农机装备             | agricultural-machinery-equipment-industry-reports                 |
| 新材料               | new-material-industry-reports                                     |
| 生物医药及医疗器械   | biomedicine-and-medical-devices-industry-reports                  |
| 现代服务业           | modern-service-industry-industry-reports                          |
| 制造业人才           | manufacturing-talent-industry-reports                             |`};async function i(r){let i=r.req.param(`type`)||``,a=r.req.param(`category`)||``,o=`https://www.dx2025.com${i===``?``:`/archives/${i===`tag`?`tag${a===``?``:`/${a}`}`:`category/${i}${a===``?``:`/${a}`}`}`}`,s=await t({method:`get`,url:o}),c=n(s.data),l=c(`.entry-title a`).slice(0,10).toArray().map(e=>(e=c(e),{title:e.text(),link:e.attr(`href`)})),u=await Promise.all(l.map(r=>e.tryGet(r.link,async()=>{let e=await t({method:`get`,url:r.link}),i=n(e.data);return r.author=i(`.entry-author-name`).text(),r.description=i(`.bpp-post-content, .entry-content`).html(),r.pubDate=new Date(i(`.entry-date`).attr(`datetime`)).toUTCString(),r})));return{title:c(`title`).text(),link:o,item:u}}export{r as route};
//# sourceMappingURL=dx2025-DNKX3ylW.js.map