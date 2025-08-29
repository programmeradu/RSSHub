import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={path:`/blog/:id?/:page?`,categories:[`new-media`],example:`/sakurazaka46/blog`,parameters:{id:"Member ID, see below, `all` by default",page:"Page, `0` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Sakurazaka46 Blog 櫻坂 46 博客`,maintainers:[`victor21813`,`nczitzk`,`akashigakki`],handler:o,description:`Member ID

| Member ID | Name         |
| --------- | ------------ |
| 2000      | 三期生リレー |
| 69        | 山下 瞳月    |
| 68        | 村山 美羽    |
| 67        | 村井 優      |
| 66        | 向井 純葉    |
| 65        | 的野 美青    |
| 64        | 中嶋 優月    |
| 63        | 谷口 愛季    |
| 62        | 小島 凪紗    |
| 61        | 小田倉 麗奈  |
| 60        | 遠藤 理子    |
| 59        | 石森 璃花    |
| 58        | 守屋 麗奈    |
| 57        | 増本 綺良    |
| 56        | 幸阪 茉里乃  |
| 55        | 大沼 晶保    |
| 54        | 大園 玲      |
| 53        | 遠藤 光莉    |
| 51        | 山﨑 天      |
| 50        | 森田 ひかる  |
| 48        | 松田 里奈    |
| 47        | 藤吉 夏鈴    |
| 46        | 田村 保乃    |
| 45        | 武元 唯衣    |
| 44        | 関 有美子    |
| 43        | 井上 梨名    |
| 15        | 原田 葵      |
| 14        | 土生 瑞穂    |
| 11        | 菅井 友香    |
| 08        | 齋藤 冬優花  |
| 07        | 小林 由依    |
| 06        | 小池 美波    |
| 04        | 尾関 梨香    |
| 03        | 上村 莉菜    |`};async function o(a){let o=a.req.param(`id`)??`all`,s=a.req.param(`page`)??`0`,c=`https://sakurazaka46.com`,l=o===`all`?`?page=${s}`:`?page=${s}&ct=${o}`,u=`${c}/s/s46/diary/blog/list${l}`,d=await n({method:`get`,url:u}),f=i(d.data),p=f(`.com-blog-part .box a`).toArray().map(e=>(e=f(e),{title:e.text(),author:e.find(`.name`).text(),link:`${c}${e.attr(`href`).split(`?`)[0]}`}));return p=await Promise.all(p.map(a=>e.tryGet(a.link,async()=>{let e=await n({method:`get`,url:a.link}),o=i(e.data);return a.description=o(`.box-article`).html(),a.pubDate=r(t(o(`.blog-foot .date`).text()),9),a}))),{title:`${f(`title`).text()}${o?` - ${f(`.name`).first().text()}`:``}`,link:u,item:p}}export{a as route};
//# sourceMappingURL=blog-CZKnoCNL.js.map