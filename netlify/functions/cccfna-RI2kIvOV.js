import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={path:`/:category/:type?`,categories:[`government`],example:`/cccfna/meirigengxin`,parameters:{category:`文章种类，即一级分类，详情见下表`,type:`文章类型，即二级分类，详情见下表`},radar:[{source:[`www.cccfna.org.cn/:category/:type?`]}],description:`
::: tip
存在**二级分类**的**一级分类**不能单独当作参数，如：\`/cccfna/hangyezixun\`
:::

文章的目录分级如下:

- shanghuidongtai（商会通知）
- meirigengxin（每日更新）
- tongzhigonggao（通知公告）
- hangyezixun（行业资讯）
  - zhengcedaohang（政策导航）
  - yujinxinxi（预警信息）
  - shichangdongtai（市场动态）
  - gongxuxinxi（供需信息）
- maoyitongji（贸易统计）
  - tongjikuaibao（统计快报）
  - hangyetongji（行业统计）
  - guobiemaoyi（国别贸易）
  - maoyizhinan（贸易指南）
- nongchanpinbaogao（农产品报告）
  - nongchanpinyuebao（农产品月报）
  - zhongdianchanpinyuebao（重点产品月报）
  - zhongdianchanpinzoushi（重点产品走势）`,name:`资讯信息`,maintainers:[`hualiong`],handler:async a=>{let{category:o,type:s}=a.req.param(),c=`https://www.cccfna.org.cn/${o}${s?`/`+s:``}`,l=await n(c),u=i(l),d=u(`body > script`).last().text().match(RegExp(`https://www.cccfna.org.cn/${o}/.+?.html`,`g`)).slice(0,15).map(e=>({title:``,link:e})),f=await Promise.all(d.map(a=>e.tryGet(a.link,async()=>{let e=i(await n(a.link)),o=e(`.list_cont`);return a.title=o.find(`.title`).text(),a.pubDate=r(t(o.find(`.tip > .time`).text(),`发布时间：YYYY-MM-DD`),8),a.description=o.find(`#article-content`).html(),a})));return{title:u(`head > title`).text(),link:c,item:f}}};export{a as route};
//# sourceMappingURL=cccfna-RI2kIvOV.js.map