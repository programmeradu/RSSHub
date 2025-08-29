import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseRelativeDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{ViewType as n}from"./types-A5bA50Mg.js";const r={path:`/report/:industry?`,categories:[`finance`],view:n.Articles,example:`/moodysmismicrosite/report/企业&金融机构`,parameters:{industry:{description:`可选参数，默认为全部行业。行业选择，支持使用&连接多个。`,options:[{value:`0`,label:`企业`},{value:`1`,label:`金融机构`},{value:`2`,label:`主权`},{value:`3`,label:`地方政府及城投公司`},{value:`4`,label:`宏观经济`},{value:`5`,label:`结构融资`},{value:`6`,label:`基础设施及项目融资`},{value:`7`,label:`ESG`},{value:`8`,label:`其他`}],default:`全部`}},radar:[{source:[`www.moodysmismicrosite.com/report`]}],name:`industry`,description:`
| ID | Description |
| ---   | ---   |
| 0 | 企业 |
| 1 | 金融机构 |
| 2 | 主权 |
| 3 | 地方政府及城投公司 |
| 4 | 宏观经济 |
| 5 | 结构融资 |
| 6 | 基础设施项目融资 |
| 7 | ESG |
| 8 | 其他 |
    `,maintainers:[`Cedaric`],handler:i};async function i(n){let r={0:`企业`,1:`金融机构`,2:`主权`,3:`地方政府及城投公司`,4:`宏观经济`,5:`结构融资`,6:`基础设施项目融资`,7:`ESG`,8:`其他`},i=Object.fromEntries(Object.entries(r).map(([e,t])=>[t,e])),a=n.req.param(`industry`)||`行业`,o=a.split(`&`).map(e=>i[e.trim()]).filter(e=>e!==void 0).join(`,`),s=await t(`https://www.moodysmismicrosite.com/micro/v2/report/list?page_num=1&page_size=25&keyword=&industry_ids=${o}`),c=s?.data?.data?.list||[];return{title:`穆迪评级(${a})`,link:`https://www.moodysmismicrosite.com/report`,allowEmpty:!0,item:c.map(t=>({title:t.title,pubDate:e(t.release_time),link:`https://www.moodysmismicrosite.com/details/${t.id}`,description:t.content_profile,category:t.classification,guid:t.id}))}}export{r as route};
//# sourceMappingURL=report-D60BAI3W.js.map