import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";const n={path:`/xianmian`,categories:[`program-update`],example:`/appstore/xianmian`,parameters:{},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`app.so/xianmian`]}],name:`每日精品限免 / 促销应用（鲜面连线 by AppSo）`,maintainers:[`Andiedie`],handler:r,url:`app.so/xianmian`};async function r(){let{data:{objects:n}}=await t.get(`https://app.so/api/v5/appso/discount/?platform=web&limit=10`);return{title:`每日精品限免 / 促销应用`,link:`http://app.so/xianmian/`,description:`鲜面连线 by AppSo：每日精品限免 / 促销应用`,item:n.map(t=>({title:`「${t.discount_info[0].discounted_price===`0.00`?`免费`:`降价`}」${t.app.name}`,description:`
          <img src="${t.app.icon.image}"/>
          <br/>
          原价：¥${t.discount_info[0].original_price} -> 现价：¥${t.discount_info[0].discounted_price}
          <br/>
          平台：${t.app.download_link[0].device}
          <br/>
          ${t.content}
        `,pubDate:e(t.updated_at*1e3),link:t.app.download_link[0].link}))}}export{n as route};
//# sourceMappingURL=xianmian-DhKGzzsT.js.map