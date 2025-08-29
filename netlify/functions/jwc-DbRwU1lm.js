import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a=`http://www.jwc.zjut.edu.cn/`,o={path:`/jwc/:type`,categories:[`university`],example:`/zjut/jwc/1839`,parameters:{type:`分类，见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`浙江工业大学教务处`,maintainers:[`zhullyb`],url:`www.jwc.zjut.edu.cn`,handler:s,radar:[{source:[`www.jwc.zjut.edu.cn/:type/list.htm`],target:`/jwc/:type`}],description:`| 板块 | 参数 |
| ------- | ------- |
| 新闻动态 | 1838 |
| 课程思政 | 1842 |
| 校内动态 | 2613 |
| 学习思考 | 2614 |
| 成果展示 | 2615 |
| 媒体聚焦 | 2616 |
| 制度文件 | 2617 |
| 教学运行 | 1849 |
| 实践竞赛 | 1850 |
| 留学生Notice | 1851 |
| 项目申报 | 1852 |
| 学籍管理 | 1853 |
| 办事指南 | 1839 |`};async function s(o){let s=Number.parseInt(o.req.param(`type`)),c=await n(a+s+`/list.htm`),l=i(c),u=l(`.news.clearfix`).toArray().map(e=>{let n=l(e),i=n.find(`a`);try{let e=i.attr(`title`)||``,o=i.attr(`href`);o?o.startsWith(`http`)||(o=a.slice(0,-1)+o):o=``;let s=r(t(n.find(`.news_meta`).text()),8);return{title:e,link:o,pubDate:s}}catch{return{title:``,link:``,pubDate:Date.now()}}}).filter(e=>e.title&&e.link),d=await Promise.all(u.map(t=>e.tryGet(t.link,async()=>{let e={...t,description:``};if(new URL(t.link).hostname===`www.jwc.zjut.edu.cn`)if(new URL(t.link).pathname.startsWith(`/_upload`))e.description=t.link;else{let r=await n(t.link),a=i(r);e.description=a(`.wp_articlecontent`).html()||``}else e.description=t.link;return e})));return{title:l(`head > title`).text()+` - 浙江工业大学教务处`,link:a+s+`/list.htm`,item:d}}export{o as route};
//# sourceMappingURL=jwc-DbRwU1lm.js.map