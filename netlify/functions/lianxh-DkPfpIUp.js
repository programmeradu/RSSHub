import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import*as r from"cheerio";import i from"markdown-it";const a=i({html:!0,breaks:!0}),o={path:`/:category?`,example:`/lianxh`,parameters:{category:"分类 id，可在对应分类页 URL 中找到，默认为 `all`，即全部"},radar:[{source:[`www.lianxh.cn/blogs/all.html`,`www.lianxh.cn/`]}],name:`精彩资讯`,maintainers:[`nczitzk`],handler:s,url:`www.lianxh.cn/`,description:`| 分类                 | id  |
 -------------------- | --- |
 全部                 | all |
 Stata 入门           | 16  |
 Stata 教程           | 17  |
 计量专题             | 18  |
 内生性 - 因果推断    | 19  |
 面板数据             | 20  |
 交乘项 - 调节 - 中介 | 21  |
 结果输出             | 22  |
 工具软件             | 23  |
 Stata 绘图           | 24  |
 数据处理             | 25  |
 Stata 程序           | 26  |
 Probit-Logit         | 27  |
 时间序列             | 28  |
 空间计量 - 网络分析  | 29  |
 Markdown-LaTeX       | 30  |
 论文写作             | 31  |
 回归分析             | 32  |
 其它                 | 33  |
 数据分享             | 34  |
 Stata 资源           | 35  |
 文本分析 - 爬虫      | 36  |
 Python-R-Matlab      | 37  |
 IV-GMM               | 38  |
 倍分法 DID           | 39  |
 断点回归 RDD         | 40  |
 PSM-Matching         | 41  |
 合成控制法           | 42  |
 Stata 命令           | 43  |
 专题课程             | 44  |
 风险管理             | 45  |
 生存分析             | 46  |
 机器学习             | 47  |
 分位数回归           | 48  |
 SFA-DEA - 效率分析   | 49  |
 答疑 - 板书          | 50  |
 论文重现             | 51  |
 最新课程             | 52  |
 公开课               | 53  |`};async function s(i){let{category:o=`all`}=i.req.param(),s=`https://www.lianxh.cn`,c=`${s}/blogs/${o}.html`,l=await n(c),u=r.load(l),d=u(`.card-body > a`).slice(0,i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`),10):30).toArray().map(e=>{let t=u(e),n=t.attr(`href`);return{title:t.find(`h5`).text().trim(),link:s+n,id:n?.split(`/`).pop()?.split(`.`)[0]}}),f=await Promise.all(d.map(r=>e.tryGet(r.link,async()=>{let{data:e}=await n(`${s}/web-api/article`,{query:{id:r.id}});return r.description=a.render(e.details),r.pubDate=t(e.release_time,`YYYY-MM-DD`),r.author=e.author,r})));return{title:`连享会 - ${u(`.card-title`).text()}`,link:c,item:f}}export{o as route};
//# sourceMappingURL=lianxh-DkPfpIUp.js.map