import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";const r={global:`最新`,shares:`股市`,bonds:`债市`,commodities:`商品`,forex:`外汇`,enterprise:`公司`,"asset-manage":`资管`,tmt:`科技`,estate:`地产`,car:`汽车`,medicine:`医药`},i={path:`/news/:category?`,categories:[`finance`],example:`/wallstreetcn/news`,radar:[{source:[`wallstreetcn.com/news/:category`,`wallstreetcn.com/`]}],name:`资讯`,maintainers:[`nczitzk`],handler:a,description:`| id           | 分类 |
| ------------ | ---- |
| global       | 最新 |
| shares       | 股市 |
| bonds        | 债市 |
| commodities  | 商品 |
| forex        | 外汇 |
| enterprise   | 公司 |
| asset-manage | 资管 |
| tmt          | 科技 |
| estate       | 地产 |
| car          | 汽车 |
| medicine     | 医药 |`};async function a(i){let a=i.req.param(`category`)??`global`,o=`https://api-one.wallstcn.com`,s=`https://wallstreetcn.com/news/${a}`,c=`${o}/apiv1/content/information-flow?channel=${a}-channel&accept=article&limit=${i.req.query(`limit`)??25}`,l=await n({method:`get`,url:c}),u=l.data.data.items.filter(e=>e.resource_type!==`ad`).map(e=>({type:e.resource_type,guid:e.resource.id,link:e.resource.uri,pubDate:t(e.resource.display_time*1e3)}));return u=await Promise.all(u.map(t=>e.tryGet(t.link,async()=>{let e=await n({method:`get`,url:`${o}/apiv1/content/${t.type===`live`?`lives/${t.guid}`:`articles/${t.guid}?extract=0`}`}),r=e.data;if(r.code!==2e4)return null;let i=r.data;return t.title=i.title||i.content_text,t.author=i.source_name??i.author.display_name,t.description=i.content+(i.content_more??``),t.category=i.asset_tags?.map(e=>e.name)??[],i.audio_uri&&(t.enclosure_type=`audio/mpeg`,t.enclosure_url=i.audio_uri,t.itunes_item_image=i.image?.uri??``,t.itunes_duration=i.audio_info?.duration??``),delete t.type,t}))),u=u.filter(e=>e!==null),{title:`华尔街见闻 - 资讯 - ${r[a]}`,link:s,item:u,itunes_author:`华尔街见闻`,image:`https://static.wscn.net/wscn/_static/favicon.png`}}export{i as route};
//# sourceMappingURL=news-CDkyobyO.js.map