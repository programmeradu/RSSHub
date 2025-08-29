import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import"./ofetch-Bzt0BXUH.js";import{got_default as e}from"./got-CdvI2yKX.js";const t={path:`/bookstore`,categories:[`social-media`],example:`/douban/bookstore`,parameters:{},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`豆瓣书店`,maintainers:[`xyqfer`],handler:n};async function n(){let t=`https://market.douban.com/book/`,n=await e({method:`get`,url:`https://market.douban.com/api/freyr/books?page=1&page_size=20&type=book`,headers:{Referer:t}}),r=n.data.data;return{title:`豆瓣书店`,link:t,description:`在豆瓣书店，遇见美好·書生活`,item:r.map(({title:e,url:t,price:n,square_pic:r,rectangle_pic:i,desc:a})=>({title:e,link:t,description:`
        <img src="${i}"><br>
        <img src="${r}"><br>
        ${a}<br>
        <strong>价格:</strong> ${n}元
      `}))}}export{t as route};
//# sourceMappingURL=bookstore-BpLA2WGq.js.map