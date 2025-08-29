import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import{ViewType as o}from"./types-A5bA50Mg.js";import s from"node:path";import{load as c}from"cheerio";t();const l={recommend:{url:`content/recommend`,title:`推荐`},hkstock:{url:`content/hkstock`,title:`港股`},meigu:{url:`content/meigu`,title:`美股`},agu:{url:`content/agu`,title:`沪深`},ct:{url:`content/ct`,title:`创投`},esg:{url:`content/esg`,title:`ESG`},aqs:{url:`content/aqs`,title:`券商`},ajj:{url:`content/ajj`,title:`基金`},focus:{url:`focus`,title:`要闻`},announcement:{url:`announcement`,title:`公告`},research:{url:`research`,title:`研究`},shares:{url:`shares`,title:`新股`},bazaar:{url:`bazaar`,title:`市场`},company:{url:`company`,title:`公司`}},u={path:`/:id?/:category?`,categories:[`finance`],view:o.Articles,example:`/zhitongcaijing`,parameters:{id:`栏目 id，可在对应栏目页 URL 中找到，默认为 recommend，即推荐`,category:`分类 id，可在对应栏目子分类页 URL 中找到，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`推荐`,maintainers:[`nczitzk`],handler:d,description:`| id           | 栏目 |
| ------------ | ---- |
| recommend    | 推荐 |
| hkstock      | 港股 |
| meigu        | 美股 |
| agu          | 沪深 |
| ct           | 创投 |
| esg          | ESG  |
| aqs          | 券商 |
| ajj          | 基金 |
| focus        | 要闻 |
| announcement | 公告 |
| research     | 研究 |
| shares       | 新股 |
| bazaar       | 市场 |
| company      | 公司 |`};async function d(t){let o=t.req.param(`id`)??`recommend`,u=t.req.param(`category`)??``,d=t.req.query(`limit`)?Number.parseInt(t.req.query(`limit`)):20,f=`https://www.zhitongcaijing.com`,p=`${f}/${l[o].url}.html${u===``?``:`?category_key=${u}`}`,m=`${f}/${l[o].url}.html?data_type=1&page=1${u===``?``:`&category_key=${u}`}`,h=await a({method:`get`,url:m}),g=h.data.data.slice(0,d).map(e=>({title:e.title,link:`${f}${e.url}`,description:e.digest,author:e.author_info.author_name,pubDate:i((e.create_time??Number.parseInt(e.original_time))*1e3),category:[...e.keywords?.split(`,`)??[],e.category_name??e.type_tag]}));return g=await Promise.all(g.map(t=>n.tryGet(t.link,async()=>{let n=await a({method:`get`,url:t.link}),i=c(n.data);return i(`#subscribe-vip-box`).remove(),i(`#news-content`).remove(),t.description=r(s.join(e,`templates/description-fbc0524d.art`),{digest:i(`.digetst-box`).html()||i(`.telegram-origin-contentn`).html(),description:i(`.news-body-content`).html()}),t}))),{title:`智通财经 - ${l[o].title}`,link:p,item:g}}export{u as route};
//# sourceMappingURL=zhitongcaijing-CbM6zh5v.js.map