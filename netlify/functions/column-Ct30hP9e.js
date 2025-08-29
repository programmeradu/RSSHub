import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import{ofetch_default as a}from"./ofetch-Bzt0BXUH.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import{ViewType as s}from"./types-A5bA50Mg.js";import c from"node:path";import{load as l}from"cheerio";t();const u=async t=>{let{id:s}=t.req.param(),u=Number.parseInt(t.req.query(`limit`)??`10`,10),d=`https://www.oschina.net`,f=String.raw`https://my\.oschina\.net`,p=new URL(`news/column?columnId=${s}`,d).href,m=await a(p),h=l(m),g=h(`html`).attr(`lang`)??`zh-CN`,_=[];_=h(`div.news-item`).slice(0,u).toArray().map(t=>{let n=h(t),a=n.find(`div.title`).text(),s=r(c.join(e,`templates/description-b958bde9.art`),{intro:n.find(`div.description p.line-clamp`).text()}),l=n.find(`inddiv.item`).contents().last().text().trim(),u=n.attr(`data-url`),d=n.find(`inddiv.item a`).toArray(),f=d.map(e=>{let t=h(e);return{name:t.text(),url:t.attr(`href`)}}),p=n.find(`img`).attr(`src`),m=l,_={title:a,description:s,pubDate:l?o(i(l),8):void 0,link:u,author:f,content:{html:s,text:s},image:p,banner:p,updated:m?o(i(m),8):void 0,language:g};return _}),_=(await Promise.all(_.map(t=>t.link?n.tryGet(t.link,async()=>{let n=await a(t.link),s=l(n);s(`.ad-wrap`).remove();let u=s(`h1.article-box__title`).text(),p=r(c.join(e,`templates/description-b958bde9.art`),{description:s(`div.content`).html()}),m=s(`div.article-box__meta div.item-list div.item`).toArray().find(e=>/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(s(e).text())),h=m?s(m).text():void 0,_=s(`val[data-name="shareUrl"]`).attr(`data-value`),v=[...s(`div.breadcrumb-box a.item`).toArray().slice(0,-1),...s(`div.article-box__meta div.item-list div.item span.label`).toArray(),...s(`div.tags-box a.tag-item`).toArray()],y=[...new Set(v.map(e=>s(e).text()).filter(Boolean))],b=s(`div.article-box__meta div.item-list div.item a`).toArray().filter(e=>s(e).attr(`href`)?RegExp(`^${f}/u/\\d+$`).test(s(e).attr(`href`)):!1),x=b.map(e=>{let t=s(e);return{name:t.text(),url:t.attr(`href`)}}),S=`oschina-${s(`val[data-name="objId"]`).attr(`data-value`)}`,C=s(`val[data-name="sharePic"]`).attr(`data-value`),w=s(`meta[property="bytedance:updated_time"]`).attr(`content`)||h,T={title:u,description:p,pubDate:h?o(i(h),8):t.pubDate,link:_?new URL(_,d).href:t.link,category:y,author:x,guid:S,id:S,content:{html:p,text:p},image:C,banner:C,updated:w?i(w):t.updated,language:g},E=s(`div.related-links-box ul.link-list li a`).toArray(),D=E.map(e=>{let t=s(e);return{url:t.attr(`href`),type:`related`,content_html:t.parent().html()}}).filter(e=>!0);return D&&(T={...T,_extra:{links:D}}),{...t,...T}}):t))).filter(e=>!0);let v=h(`a.logo`).attr(`title`);return{title:`${v} - ${h(`div#tabDropdownListOpen a.selected`).text()}`,description:h(`meta[name="description"]`).attr(`content`),link:p,item:_,allowEmpty:!0,image:h(`a.logo img`).attr(`src`),author:v,language:g,id:h(`val[data-name="weixinShareUrl"]`).attr(`data-value`)}},d={path:`/column/:id`,name:`专栏`,url:`www.oschina.net`,maintainers:[`nczitzk`],handler:u,example:`/oschina/column/14`,parameters:{id:`专栏 id，可在对应专栏页 URL 中找到`},description:`:::tip
若订阅 [开源安全专栏](https://www.oschina.net/news/column?columnId=14)，网址为 \`https://www.oschina.net/news/column?columnId=14\`，请截取 \`https://www.oschina.net/news/column?columnId=\` 到末尾的部分 \`14\` 作为 \`id\` 参数填入，此时目标路由为 [\`/oschina/column/14\`](https://rsshub.app/oschina/column/14)。

:::

<details>
<summary>更多专栏</summary>

| 名称            | ID  |
| --------------- | --- |
| 古典主义 Debian | 4   |
| 自由&开源       | 5   |
| 溯源            | 6   |
| 开源先懂协议    | 7   |
| 开源变局        | 8   |
| 创造者说        | 9   |
| 精英主义 BSD    | 10  |
| 苹果有开源      | 11  |
| 开源访谈        | 12  |
| 抱团找组织      | 13  |
| 开源安全        | 14  |
| OSPO            | 15  |
| 创业小辑        | 16  |
| 星推荐          | 17  |
| 单口开源        | 18  |
| 编辑部观察直播  | 19  |
| 开源商业化      | 20  |
| ChatGPT 专题    | 21  |
| 开源新思        | 24  |
| 开源日报        | 25  |
| 大模型思辨      | 26  |
| 家里有个程序员  | 27  |
| 开源漫谈        | 23  |

</details>
`,categories:[`programming`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.oschina.net`],target:(e,t)=>{let n=new URL(t),r=n.searchParams.get(`id`)??void 0;return`/oschina/column/${r}`}}],view:s.Articles};export{u as handler,d as route};
//# sourceMappingURL=column-Ct30hP9e.js.map