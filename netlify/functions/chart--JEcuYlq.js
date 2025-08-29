import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{art as n}from"./render-CxhTJIsl.js";import{ofetch_default as r}from"./ofetch-Bzt0BXUH.js";import i from"node:path";import{load as a}from"cheerio";t();const o=`https://www.openrice.com`,s={path:`/:lang/hongkong/explore/chart/:category`,maintainers:[`after9`],handler:c,categories:[`shopping`],example:`/openrice/zh/hongkong/explore/chart/most-bookmarked`,parameters:{lang:`语言，缺省为 zh`,category:`类别，缺省为 most-bookmarked`},name:`香港餐廳排行榜`,description:`
| 简体 | 繁體 | EN |
| ----- | ------ | ----- |
| zh-cn | zh | en |

| 最多收藏 | 每周最高评分 | 最高浏览 | 最佳甜品餐厅 |
| ----- | ------ | ----- | ----- |
| most-bookmarked | best-rating | most-popular | best-dessert |
  `};async function c(t){let s=t.req.param(`lang`)??`zh`,c=t.req.param(`category`)??`most-bookmarked`,l=`/${s}/hongkong/explore/chart/${c}`,u=await r(o+l),d=a(u),f=d(`title`).text()??`Hong Kong Restaurant Chart`,p=d(`title`).text()??`Hong Kong Restaurant Chart`,m=d(`.poi-chart-main-grid-item-desktop-wrapper`),h=m.toArray().map(t=>{let r=d(t),a=r.find(`.rank-icon`).attr(`class`),o=a?.match(/rank-(\d+)/)?.[1]??``,s=r.find(`.pcmgidtr-left-section-poi-info-details .pcmgidtrls-poi-info-details-text`),c=s.toArray().map(e=>d(e).text()),l=r.find(`.pcmgidtr-left-section-poi-info-name .link`).text()??``,u=r.find(`.pcmgidtr-left-section-poi-info-name .link`).attr(`href`)??``,f=r.find(`.pcmgidtr-left-section-door-photo img`).attr(`src`)??null,p=n(i.join(e,`templates/chart-7650458a.art`),{description:c??[],rankNumber:o,image:f});return{title:l,description:p,link:u}});return{title:f,link:o+l,description:p,item:h}}export{s as route};
//# sourceMappingURL=chart--JEcuYlq.js.map