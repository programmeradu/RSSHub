import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";const n=`https://www.jornada.com.mx`,r={capital:`Capital`,cartones:`Cartones`,ciencia:`Ciencia-Y-Tecnologia`,cultura:`Cultura`,deportes:`Deportes`,economia:`Economia`,estados:`Estados`,mundo:`Mundo`,opinion:`Opinion`,politica:`Politica`,sociedad:`Sociedad`},i=()=>{let e=new Date(Date.now()),t=e.getFullYear()+`-`+(`0`+(e.getMonth()+1)).slice(-2)+`-`+(`0`+e.getDate()).slice(-2);return t},a={path:`/:date?/:category?`,categories:[`traditional-media`],example:`/jornada/2022-10-12/capital`,parameters:{date:"Date string, must be in format of `YYYY-MM-DD`. You can get today's news using `today`",category:`Category, refer to the table below`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`News`,maintainers:[`Thealf154`],handler:o,description:`Provides a way to get an specific rss feed by date and category over the official one.

| Category             | \`:category\` |
| -------------------- | ----------- |
| Capital              | capital     |
| Cartones             | cartones    |
| Ciencia y Tecnología | ciencia     |
| Cultura              | cultura     |
| Deportes             | deportes    |
| Economía             | economia    |
| Estados              | estados     |
| Mundo                | mundo       |
| Opinión              | opinion     |
| Política             | politica    |
| Sociedad             | sociedad    |`};async function o(a){let o=a.req.param(`date`)===`today`||a.req.param(`date`)===void 0?i():a.req.param(`date`),s=a.req.param(`category`),c=`${n}/jsonstorage/articles_${o}_.json`,l=await t(c),u=l.data,d={};if(s){let t=u.filter(e=>e.category===r[s]);d=t.map(t=>({title:t.title,description:t.content,pubDate:e(t.date),link:`${n}/${t.url}`}))}else d=u.map(t=>({title:t.title,description:t.content,pubDate:e(t.date),link:`${n}/${t.url}`}));return{title:`La Jornada`,link:n,item:d}}export{a as route};
//# sourceMappingURL=jornada-BETkcvVP.js.map