import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import{ofetch as n}from"ofetch";import{load as r}from"cheerio";const i={103:`财经资讯`,508:`科技资讯`,106:`商业资讯`,632:`消费资讯`,630:`医疗资讯`,119:`康养资讯`,"004":`汽车资讯`,"009":`房产资讯`,629:`ESG 资讯`,"010":`A股资讯`,"001":`港股资讯`,102:`美股资讯`,113:`银行资讯`,115:`保险资讯`,104:`基金资讯`,503:`私募资讯`,112:`信托资讯`,"007":`外汇资讯`,107:`期货资讯`,118:`债券资讯`,603:`券商资讯`,105:`观点`},a={path:`/:channelNum`,categories:[`finance`],example:`/jrj/103`,parameters:{channelNum:{description:`栏目编号`,options:Object.entries(i).map(([e,t])=>({value:e,label:t}))}},url:`www.jrj.com.cn`,name:`资讯`,description:`
| column | Description |
| ---   | ---   |
| 103   | 财经资讯 |
| 508   | 科技资讯 |
| 106   | 商业资讯 |
| 632   | 消费资讯 |
| 630   | 医疗资讯 |
| 119   | 康养资讯 |
| 004   | 汽车资讯 |
| 009   | 房产资讯 |
| 629   | ESG 资讯 |
| 001   | 港股资讯 |
| 102   | 美股资讯 |
| 113   | 银行资讯 |
| 115   | 保险资讯 |
| 104   | 基金资讯 |
| 503   | 私募资讯 |
| 112   | 信托资讯 |
| 007   | 外汇资讯 |
| 107   | 期货资讯 |
| 118   | 债券资讯 |
| 603   | 券商资讯 |
| 105   | 观点 |
    `,maintainers:[`p3psi-boo`],handler:o};async function o(a){let o=a.req.param(`channelNum`),s=await n(`https://gateway.jrj.com/jrj-news/news/queryNewsList`,{method:`post`,body:{sortBy:1,pageSize:20,makeDate:``,channelNum:o,infoCls:``}}),c=s.data.data,l=c.map(e=>{let n=e.pcInfoUrl,r=e.title,i=e.paperMediaSource,a=t(e.makeDate);return{title:r,link:n,author:i,pubDate:a}}),u=await Promise.all(l.map(t=>e.tryGet(t.link,async()=>{let e=t.link,i=await n(e),a=r(i),o=a(`.article_content`).html();return t.description=o,t})));return{title:`${i[o]} - 金融界`,link:`https://jrj.com`,item:u}}export{a as route};
//# sourceMappingURL=jrj-DdOuEk5A.js.map