import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";const n={path:`/books`,categories:[`programming`],example:`/juejin/books`,parameters:{},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`juejin.cn/books`]}],name:`小册`,maintainers:[`xyqfer`],handler:r,url:`juejin.cn/books`,description:`> 掘金小册需要付费订阅，RSS 仅做更新提醒，不含付费内容.`};async function r(){let n=await t(`https://api.juejin.cn/booklet_api/v1/booklet/listbycategory`,{method:`POST`,body:{category_id:`0`,cursor:`0`,limit:20}}),r=n.data.map(({base_info:t})=>({title:t.title,link:`https://juejin.cn/book/${t.booklet_id}`,description:`
            <img src="${t.cover_img}"><br>
            <strong>${t.title}</strong><br><br>
            ${t.summary}<br>
            <strong>价格:</strong> ${t.price/100}元
        `,pubDate:e(t.ctime*1e3),guid:t.booklet_id}));return{title:`掘金小册`,link:`https://juejin.cn/books`,item:r}}export{n as route};
//# sourceMappingURL=books-C_kHJM8d.js.map