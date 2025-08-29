import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import{art as n}from"./render-CxhTJIsl.js";import{invalid_parameter_default as r}from"./invalid-parameter-CUJdROXf.js";import i from"node:path";import{BigGenre as a,Genre as o,GenreNotation as s,NarouNovelFetch as c,SearchBuilder as l}from"narou";t();let u=function(e){return e.DAILY=`daily`,e.WEEKLY=`weekly`,e.MONTHLY=`monthly`,e.QUARTER=`quarter`,e.YEARLY=`yearly`,e.TOTAL=`total`,e}({}),d=function(e){return e.TOTAL=`total`,e.SHORT=`t`,e.ONGOING=`r`,e.COMPLETE=`er`,e}({}),f=function(e){return e.LIST=`list`,e.GENRE=`genre`,e.ISEKAI=`isekai`,e}({});const p={[u.DAILY]:`dailypoint`,[u.WEEKLY]:`weeklypoint`,[u.MONTHLY]:`monthlypoint`,[u.QUARTER]:`quarterpoint`,[u.YEARLY]:`yearlypoint`,[u.TOTAL]:`hyoka`},m={[u.DAILY]:`pt`,[u.WEEKLY]:`weekly_point`,[u.MONTHLY]:`monthly_point`,[u.QUARTER]:`quarter_point`,[u.YEARLY]:`yearly_point`,[u.TOTAL]:`global_point`},h={[u.DAILY]:`日間`,[u.WEEKLY]:`週間`,[u.MONTHLY]:`月間`,[u.QUARTER]:`四半期`,[u.YEARLY]:`年間`,[u.TOTAL]:`累計`},g={[d.TOTAL]:`すべて`,[d.SHORT]:`短編`,[d.ONGOING]:`連載中`,[d.COMPLETE]:`完結済`};let _=function(e){return e.RENAI=`1`,e.FANTASY=`2`,e.OTHER=`o`,e}({});const v={[_.RENAI]:`〔恋愛〕`,[_.FANTASY]:`〔ファンタジー〕`,[_.OTHER]:`〔文芸・SF・その他〕`};function y(e){let[t,n,i=d.TOTAL]=e.split(`_`),a=t,o=n,s=i,c=[Object.values(u).includes(a),Object.values(_).includes(o),Object.values(d).includes(s)].every(Boolean);if(!c)throw new r(`Invalid isekai ranking type: ${e}`);return{period:a,category:o,novelType:s}}function b(e,t,n,i){let o={order:p[e],gzip:5,lim:Math.ceil(i/2*1.2)};switch(n!==d.TOTAL&&(o.type=n),t){case _.RENAI:o.biggenre=a.Renai;break;case _.FANTASY:o.biggenre=a.Fantasy;break;case _.OTHER:o.biggenre=`${a.Bungei}-${a.Sf}-${a.Sonota}`;break;default:throw new r(`Invalid Isekai category: ${t}`)}return o}async function x(t,a){let{period:o,category:s,novelType:u}=y(t),d=`https://yomou.syosetu.com/rank/isekailist/type/${t}`,f=`[${h[o]}] 異世界転生/転移${v[s]}ランキング - ${g[u]} BEST${a}`,p=b(o,s,u,a),_=new c,[x,S]=await Promise.all([new l({...p,istensei:1},_).execute(),new l({...p,istenni:1},_).execute()]),C=[...x.values,...S.values],w=[...new Map(C.map(e=>[e.ncode,e])).values()],T=m[o];if(!T)throw new r(`Invalid period: ${o}`);let E=w.sort((e,t)=>(t[T]||0)-(e[T]||0)).map((t,r)=>({title:`#${r+1} ${t.title}`,link:`https://ncode.syosetu.com/${String(t.ncode).toLowerCase()}`,description:n(i.join(e,`templates/description-d8029fe4.art`),{novel:t}),author:t.writer,category:t.keyword.split(/[\s/\uFF0F]/).filter(Boolean)}));return{title:`小説家になろう - ${f}`,link:d,item:E.slice(0,a),language:`ja`}}t();const S=()=>{let e=[{value:f.LIST,label:`総合ランキング (General Ranking)`},{value:f.GENRE,label:`ジャンル別ランキング (Genre Ranking)`},{value:f.ISEKAI,label:`異世界転生/転移ランキング (Isekai Ranking)`}],t=Object.entries(u).map(([e,t])=>({value:t,label:`${h[t]} (${e})`})),n=Object.entries(d).map(([e,t])=>({value:t,label:`${g[t]} (${e})`})),r=Object.entries(o).filter(([,e])=>typeof e==`number`).map(([e,t])=>({value:t.toString(),label:e})),i=Object.entries(_).map(([e,t])=>({value:t,label:`${v[t]} (${e})`}));return{listType:{description:`Ranking type`,options:e},type:{description:`Detailed ranking type, can be found in Syosetu ranking URLs`,options:[...t.flatMap(e=>n.map(t=>({value:`${e.value}_${t.value}`,label:`${f.LIST} - [${h[e.value]}] 総合ランキング - ${g[t.value]}`}))),...t.flatMap(e=>r.flatMap(t=>n.map(n=>({value:`${e.value}_${t.value}_${n.value}`,label:`${f.GENRE} - [${h[e.value]}] ${s[t.value]}ランキング - ${g[n.value]}`})))),...t.flatMap(e=>i.flatMap(t=>n.map(n=>({value:`${e.value}_${t.value}_${n.value}`,label:`${f.ISEKAI} - [${h[e.value]}] 異世界転生/転移${v[t.value]}ランキング - ${g[n.value]}`}))))]}}},C=()=>{let e=Object.values(u).map(e=>({title:`${h[e]}ランキング BEST5`,source:[`yomou.syosetu.com/rank/top/`],target:`/ranking/list/${e}_total?limit=5`})),t=Object.entries(o).filter(([,e])=>typeof e==`number`&&e!==o.SonotaReplay&&e!==o.NonGenre).map(([,e])=>({title:`[${h.daily}] ${s[e]}ランキング BEST5`,source:[`yomou.syosetu.com/rank/top/`],target:`/ranking/genre/daily_${e}_total?limit=5`})),n=Object.values(_).map(e=>({title:`[${h.daily}] 異世界転生/転移${v[e]}ランキング BEST5`,source:[`yomou.syosetu.com/rank/top/`],target:`/ranking/isekai/daily_${e}_total?limit=5`}));return[...e,...t,...n]},w={path:`/ranking/:listType/:type`,categories:[`reading`],example:`/syosetu/ranking/list/daily_total?limit=50`,parameters:S(),features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Rankings`,url:`yomou.syosetu.com/rank/top`,maintainers:[`SnowAgar25`],handler:D,description:`
| Keyword | Description | 説明 |
| --- | --- | --- |
| list | Overall Ranking | 総合ランキング |
| genre | Genre Ranking | ジャンル別ランキング |
| isekai | Isekai/Reincarnation/Transfer Ranking | 異世界転生/転移ランキング |

| Period | Description |
| --- | --- |
| daily | Daily Ranking |
| weekly | Weekly Ranking |
| monthly | Monthly Ranking |
| quarter | Quarterly Ranking |
| yearly | Yearly Ranking |


| Type | Description |
| --- | --- |
| total | All Works |
| t | Short Stories |
| r | Ongoing Series |
| er | Completed Series |

::: warning
Please note that novel type options may vary depending on the ranking category.

ランキングの種類によって、小説タイプが異なる場合がございますのでご注意ください。
:::

::: danger 注意事項
The "注目度ランキング" (Attention Ranking) is not supported as syosetu does not provide a public API for this feature and the results cannot be replicated through the search API.

「注目度ランキング」については、API が非公開で検索 API でも同様の結果を得ることができないため、本 Route ではサポートしておりません。
:::

::: tip 異世界転生/転移ランキングについて (Isekai)
When multiple works have the same points, their order may differ from syosetu's ranking as syosetu randomizes the order for works with identical points.

集計の結果、同じポイントの作品が複数存在する場合、Syosetu ではランダムで順位が決定されるため、本 Route の順位と異なる場合があります。
:::
`,radar:[{source:[`yomou.syosetu.com/rank/list/type/:type`],target:`/ranking/list/:type`},{source:[`yomou.syosetu.com/rank/genrelist/type/:type`],target:`/ranking/genre/:type`},{source:[`yomou.syosetu.com/rank/isekailist/type/:type`],target:`/ranking/isekai/:type`},...C()]};function T(e){let[t,n]=e.split(`_`),i=t,a=n,o=[Object.values(u).includes(i),Object.values(d).includes(a)].every(Boolean);if(!o)throw new r(`Invalid general ranking type: ${e}`);return{period:i,novelType:a}}function E(e){let[t,n,i=d.TOTAL]=e.split(`_`),a=t,s=Number(n),c=i,l=[Object.values(u).includes(a),Object.values(o).includes(s),Object.values(d).includes(c),s!==o.SonotaReplay,s!==o.NonGenre].every(Boolean);if(!l)throw new r(`Invalid genre ranking type: ${e}`);return{period:a,genre:s,novelType:c}}async function D(t){let{listType:a,type:o}=t.req.param(),u=a,m=Math.min(Number(t.req.query(`limit`)??300),300),_=new c,v={gzip:5,lim:m},y,b;switch(u){case f.LIST:{let{period:e,novelType:t}=T(o);y=`https://yomou.syosetu.com/rank/list/type/${o}`,b=`[${h[e]}] 総合ランキング - ${g[t]} BEST${m}`,v.order=p[e],t!==d.TOTAL&&(v.type=t);break}case f.GENRE:{let{period:e,genre:t,novelType:n}=E(o);y=`https://yomou.syosetu.com/rank/genrelist/type/${o}`,b=`[${h[e]}] ${s[t]}ランキング - ${g[n]} BEST${m}`,v.order=p[e],v.genre=t,n!==d.TOTAL&&(v.type=n);break}case f.ISEKAI:return x(o,m);default:throw new r(`Invalid ranking type: ${o}`)}let S=new l(v,_),C=await S.execute(),w=C.values.map((t,r)=>({title:`#${r+1} ${t.title}`,link:`https://ncode.syosetu.com/${String(t.ncode).toLowerCase()}`,description:n(i.join(e,`templates/description-d8029fe4.art`),{novel:t}),author:t.writer,category:t.keyword.split(/[\s/\uFF0F]/).filter(Boolean)}));return{title:`小説家になろう - ${b}`,link:y,item:w,language:`ja`}}export{w as route};
//# sourceMappingURL=ranking-BXBmysvV.js.map