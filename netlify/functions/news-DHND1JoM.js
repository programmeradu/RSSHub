import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import o from"node:path";import{load as s}from"cheerio";t();const c={path:`/news/:category?`,categories:[`new-media`],example:`/kamen-rider-official/news`,parameters:{category:`Category, see below, すべて by default`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`最新情報`,maintainers:[`nczitzk`],handler:l,description:`| Category                               |
| -------------------------------------- |
| すべて                                 |
| テレビ                                 |
| 映画・V シネマ等                       |
| Blu-ray・DVD、配信等                   |
| 20 作記念グッズ・東映 EC 商品          |
| 石ノ森章太郎生誕 80 周年記念商品       |
| 玩具・カード                           |
| 食品・飲料・菓子                       |
| 子供生活雑貨                           |
| アパレル・大人向け雑貨                 |
| フィギュア・ホビー・一番くじ・プライズ |
| ゲーム・デジタル                       |
| 雑誌・書籍・漫画                       |
| 音楽                                   |
| 映像                                   |
| イベント                               |
| ホテル・レストラン等                   |
| キャンペーン・タイアップ等             |
| その他                                 |
| KAMEN RIDER STORE                      |
| THE 鎧武祭り                           |
| 鎧武外伝                               |
| 仮面ライダーリバイス                   |
| ファイナルステージ                     |
| THE50 周年展                           |
| 風都探偵                               |
| 仮面ライダーギーツ                     |
| 仮面ライダーアウトサイダーズ           |
| 仮面ライダーガッチャード               |
| 仮面ライダー BLACK SUN                 |`};async function l(t){let c=t.req.param(`category`),l=t.req.query(`limit`)?Number.parseInt(t.req.query(`limit`),10):50,u=`https://www.kamen-rider-official.com`,d=new URL(`api/v1/news_articles`,u).href,f=new URL(`news_articles/${c?`?category=${c}`:``}`,u).href,{data:p}=await a(f),m=p.match(/"buildId":"(.*?)"/)[1],h=new URL(`_next/data/${m}/news_articles.json`,u).href,{data:g}=await a(h),_=g.pageProps.categoryIds[c],{data:v}=await a(d,{searchParams:{category_id:_,limit:l,offset:0}}),y=v.news_articles.slice(0,l).map(t=>({title:t.list_title,link:new URL(t.path,u).href,description:r(o.join(e,`templates/description-3c368c7e.art`),{image:t.list_image_path?{src:new URL(t.list_image_path,u).href,alt:t.list_title}:void 0}),author:t.author,category:[t.category_name,t.category_2_name].filter(Boolean),guid:`kamen-rider-official-${t.id}`,pubDate:i(t.release_date)}));y=await Promise.all(y.map(t=>n.tryGet(t.link,async()=>{let{data:n}=await a(t.link),i=s(n);return i(`a.c-button`).each(function(){i(this).parent().remove()}),i(`img`).each(function(){i(this).replaceWith(r(o.join(e,`templates/description-3c368c7e.art`),{image:{src:i(this).prop(`src`)}}))}),t.title=i(`h1.p-post__title`).text()||t.title,t.description=i(`main.p-post__main`).html(),t.author=i(`div.p-post__responsibility p`).toArray().map(e=>i(e).text()).join(` / `),t.category=[...new Set([...t.category,...i(`ul.p-post__categories li a.p-post__category`).toArray().map(e=>i(e).text().trim())].filter(Boolean))],t})));let b=s(p),x=new URL(b(`link[rel="icon"]`).prop(`href`),u).href;return{item:y,title:`${b(`title`).text().split(/ー/)[0]}${c?` - ${c}`:``}`,link:f,description:b(`meta[property="og:description"]`).prop(`content`),language:b(`html`).prop(`lang`),image:b(`meta[property="og:image"]`).prop(`content`),icon:x,logo:x,subtitle:b(`meta[property="keywords"]`).prop(`content`),author:b(`meta[property="og:site_name"]`).prop(`content`),allowEmpty:!0}}export{c as route};
//# sourceMappingURL=news-DHND1JoM.js.map