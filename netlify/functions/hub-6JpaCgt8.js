import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";import"./timezone-BrNu6iXe.js";import{invalid_parameter_default as n}from"./invalid-parameter-CUJdROXf.js";import{apiHost as r,baseUrl as i,getTagsData as a,parseEventDetail as o,parseItem as s}from"./utils-BLKTjCrD.js";import{load as c}from"cheerio";const l={path:[`/hub/:tagId?/:sort?/:range?`],categories:[`programming`],example:`/baai/hub`,parameters:{tagId:`社群 ID，可在 [社群页](https://hub.baai.ac.cn/taglist) 或 URL 中找到`,sort:"排序，见下表，默认为 `new`",range:"时间跨度，仅在排序 `readCnt` 时有效"},description:`排序

| 最新 | 最热    |
| ---- | ------- |
| new  | readCnt |

时间跨度

| 3 天 | 本周 | 本月 |
| ---- | ---- | ---- |
| 3    | 7    | 30   |`,radar:[{source:[`baai.ac.cn/`],target:(e,t)=>{let n=new URL(t).searchParams,r=n.get(`tag_id`),i=n.get(`sort`),a=n.get(`time_range`);return`/baai/hub${r?`/${r}`:``}${i?`/${i}`:``}${a?`/${a}`:``}`}}],name:`智源社区`,maintainers:[`TonyRL`],handler:u};async function u(l){let{tagId:u=``,sort:d=`new`,range:f}=l.req.param(),p,m,h,g;if(u){let e=await a(),t=e.find(e=>e.id===u);if(t)p=t.title,m=t.description,h=t.brief,g=t.iconUrl;else throw new n(`Tag not found`)}let _=await t(`${r}/api/v1/story/list`,{method:`POST`,query:{page:1,sort:d,tag_id:u,time_range:f}}),v=_.data.map(e=>s(e)),y=await Promise.all(v.map(n=>e.tryGet(n.link,async()=>{if(n.eventId)n.description=await o(n);else{let e=await t(n.link),r=c(e);n.description=n.is_event?r(`div.box2`).html():r(`.post-content`).html()}return n})));return{title:`${p?`${p} - `:``}${m?`${m} - `:``}智源社区`,description:h,link:`${i}/?${u?`tag_id=${u}&`:``}sort=${d}${f?`&time_range=${f}`:``}`,image:g,item:y}}export{l as route};
//# sourceMappingURL=hub-6JpaCgt8.js.map