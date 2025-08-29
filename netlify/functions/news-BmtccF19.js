import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import{logger_default as n}from"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as r}from"./cache-kimkMTWJ.js";import{art as i}from"./render-CxhTJIsl.js";import{parseDate as a}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as o}from"./got-CdvI2yKX.js";import s from"node:path";t();const c=`https://bbs-api-os.hoyolab.com`,l=`https://www.hoyolab.com`,u={2:27,6:39,8:47,1:31,4:35,5:43},d=e=>e(`hoyolab:gameNameList`,async()=>{let{data:e}=await o(`https://bbs-api-os-static.hoyolab.com/community/apihub/static/api/getAppConfig`);return JSON.parse(e.data.config.hoyolab_game_info_list)}),f=async(e,t,n)=>{let r=await d(n),i=r.find(t=>t.game_id===Number.parseInt(e,10));return{name:i?.game_name_list.find(e=>e.locale===t)?.raw_name??i?.game_name_list.find(e=>e.locale===`en-us`)?.raw_name,icon:i?.game_icon}},p=(e,t)=>t(`hoyolab:type:${e}`,async()=>{let{data:t}=await o(`https://webstatic.hoyoverse.com/admin/mi18n/bbs_oversea/m07281525151831/m07281525151831-${e}.json`);return{1:{title:t.official_notify,sort:`notices`},2:{title:t.official_activity,sort:`events`},3:{title:t.official_info,sort:`news`}}}),m=async({type:e,gids:t,size:n,language:r})=>{let i=new URLSearchParams({type:e,gids:t,page_size:n}).toString(),a=`${c}/community/post/wapi/getNewsList?${i}`,s=await o({method:`get`,url:a,headers:{"X-Rpc-Language":r}}),l=s?.data?.data?.list||[];return l},h=e=>e.replaceAll(`<img src="https://hoyolab-upload-private.hoyolab.com/upload`,`<img src="https://upload-os-bbs.hoyolab.com/upload`),g=(t,{language:n})=>Promise.all(t.map(async t=>{let u=t.post,d=u.post_id,f=new URLSearchParams({post_id:d,language:n}).toString(),p=`${c}/community/post/wapi/getPostFull?${f}`;return await r.tryGet(p,async()=>{let r=await o({method:`get`,url:p,headers:{"X-Rpc-Language":n}}),c=r?.data?.data?.post?.user?.nickname||``,f=r?.data?.data?.post?.post?.content||``;(f===n||!f)&&(f=u.content);let m=i(s.join(e,`templates/post-05e914ac.art`),{hasCover:u.has_cover,coverList:t.cover_list,content:h(f)});return{title:u.subject,link:`${l}/article/${d}`,description:m,pubDate:a(u.created_at*1e3),author:c}})})),_={path:`/news/:language/:gids/:type`,categories:[`game`],example:`/hoyolab/news/zh-cn/2/2`,parameters:{language:`Language`,gids:`Game ID`,type:`Announcement type`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Official Announcement`,maintainers:[`ZenoTian`],handler:v,description:`| Language         | Code  |
| ---------------- | ----- |
| 简体中文         | zh-cn |
| 繁體中文         | zh-tw |
| 日本語           | ja-jp |
| 한국어           | ko-kr |
| English (US)     | en-us |
| Español (EU)     | es-es |
| Français         | fr-fr |
| Deutsch          | de-de |
| Русский          | ru-ru |
| Português        | pt-pt |
| Español (Latino) | es-mx |
| Indonesia        | id-id |
| Tiếng Việt       | vi-vn |
| ภาษาไทย          | th-th |

| Honkai Impact 3rd | Genshin Impact | Tears of Themis | HoYoLAB | Honkai: Star Rail | Zenless Zone Zero |
| ----------------- | -------------- | --------------- | ------- | ----------------- | ----------------- |
| 1                 | 2              | 4               | 5       | 6                 | 8                 |

| Notices | Events | Info |
| ------- | ------ | ---- |
| 1       | 2      | 3    |`};async function v(e){try{let{type:t,gids:n,language:i}=e.req.param(),a={type:t,gids:n,language:i,size:Number.parseInt(e.req.query(`limit`))||15},o=await f(n,i,r.tryGet),s=await p(i,r.tryGet),c=await m(a),d=await g(c,a);return{title:`HoYoLAB-${o.name}-${s[t].title}`,link:`${l}/circles/${n}/${u[n]}/official?page_type=${u[n]}&page_sort=${s[t].sort}`,item:d,image:o.icon,icon:o.icon,logo:o.icon}}catch(e){n.error(e)}}export{_ as route};
//# sourceMappingURL=news-BmtccF19.js.map