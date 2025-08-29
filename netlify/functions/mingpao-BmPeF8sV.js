import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import{ofetch_default as a}from"./ofetch-Bzt0BXUH.js";import{rss_parser_default as o}from"./rss-parser-1vyhErsD.js";import s from"node:path";import*as c from"cheerio";t();const l=t=>r(s.join(e,`templates/fancybox-148983b5.art`),{media:t}),u=(t,n)=>r(s.join(e,`templates/description-90c8d6bd.art`),{media:l(t),desc:n}),d=(e,t)=>{let n=t(e),r=new URL(n.attr(`href`)),i;return r.hostname===`videop.mingpao.com`&&(i=new URL(r.searchParams.get(`file`)),i.hostname=`cfrvideo.mingpao.com`,i=i.href),{href:r.href,title:n.attr(`title`),video:i}},f={path:`/:type?/:category?`,name:`新聞`,example:`/mingpao/ins/all`,parameters:{type:{description:`新聞類型`,default:`ins`,options:[{value:`ins`,label:`即時新聞`},{value:`pns`,label:`每日明報`}]},category:`頻道，見下表`},radar:[{title:`即時新聞`,source:[`news.mingpao.com/ins/:categoryName/section/:date/:category`],target:`/mingpao/ins/:category`},{title:`每日明報`,source:[`news.mingpao.com/pns/:categoryName/section/:date/:category`],target:`/mingpao/pns/:category`}],maintainers:[`TonyRL`],handler:p,description:`| category | 即時新聞頻道 |
| -------- | ------------ |
| all      | 總目錄       |
| s00001   | 港聞         |
| s00002   | 經濟         |
| s00003   | 地產         |
| s00004   | 兩岸         |
| s00005   | 國際         |
| s00006   | 體育         |
| s00007   | 娛樂         |
| s00022   | 文摘         |
| s00024   | 熱點         |

| category | 每日明報頻道 |
| -------- | ------------ |
| s00001   | 要聞         |
| s00002   | 港聞         |
| s00003   | 社評         |
| s00004   | 經濟         |
| s00005   | 副刊         |
| s00011   | 教育         |
| s00012   | 觀點         |
| s00013   | 中國         |
| s00014   | 國際         |
| s00015   | 體育         |
| s00016   | 娛樂         |
| s00017   | English      |
| s00018   | 作家專欄     |`};async function p(e){let t=e.req.param(`type`)??`ins`,r=e.req.param(`category`)??(t===`ins`?`all`:`s00001`),s=`https://news.mingpao.com/rss/${t}/${r}.xml`,l=await o.parseURL(s),f=await Promise.all(l.items.map(e=>n.tryGet(e.link,async()=>{let t=await a(e.link,{headers:{Referer:`https://news.mingpao.com/`}}),n=c.load(t),r=n(`#topvideo`).length?n(`#topvideo iframe`).toArray().map(e=>n(e).attr(`href`,n(e).attr(`src`))).map(e=>d(e,n)):[],o=n(`a.fancybox`).length?n(`a.fancybox`):n(`a.fancybox-buttons`);n(`div.ad300ins_m`).remove(),n(`div.clear, div.inReadLrecGroup, div.clr`).remove(),n(`div#ssm2`).remove(),n(`iframe`).remove(),n(`p[dir=ltr]`).remove(),e.category=e.categories;let s=[...r,...o.toArray().map(e=>d(e,n))],l=n(`script`).toArray().find(e=>n(e).text()?.includes(`$('#lower').prepend('`)),f=l?n(l).text()?.match(/\$\('#lower'\)\.prepend\('(.*)'\);/)?.[1]?.replaceAll(/\\"/g,`"`):``;if(f){let e=c.load(f,null,!1);s=[...s,...e(`a.fancybox`).toArray().map(t=>d(t,e))]}return delete e.categories,delete e.content,delete e.contentSnippet,delete e.creator,delete e.isoDate,e.description=u(s,n(`.txt4`).html()??n(`.article_content.line_1_5em`).html()??n(`.txt3`).html()),e.pubDate=i(e.pubDate),e.guid=e.link.includes(`?`)?e.link:e.link.slice(0,e.link.lastIndexOf(`/`)),e})));return{title:l.title,link:l.link,description:l.description,item:f,image:l.image.url,language:l.language}}export{f as route};
//# sourceMappingURL=mingpao-BmPeF8sV.js.map