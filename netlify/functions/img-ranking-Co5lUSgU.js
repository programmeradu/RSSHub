import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import"./render-CxhTJIsl.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as e}from"./got-CdvI2yKX.js";import{post2item as t}from"./utils-Bi6s7Nih.js";const n={bh2:{title:`崩坏学园2`,gids:3,default_forum:`tongren`,default_ranking_type:`weekly`,forums:{tongren:{title:`同人`,forum_id:40}}},bh3:{title:`崩坏3`,gids:1,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:4,default_cate:`illustration`,cates:{comic:{title:`漫画`,cate_id:3},illustration:{title:`插画`,cate_id:4},cos:{title:`COS`,cate_id:17}}}}},ys:{title:`原神`,gids:2,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:29,default_cate:`illustration`,cates:{manual:{title:`手工`,cate_id:1},qute:{title:`Q版`,cate_id:2},comic:{title:`漫画`,cate_id:3},illustration:{title:`插画`,cate_id:4}}},cos:{title:`COS`,forum_id:49}}},wd:{title:`未定事件簿`,gids:4,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:38}}},sr:{title:`崩坏：星穹铁道`,gids:6,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:56}}},zzz:{title:`绝区零`,gids:8,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:59}}},dby:{title:`大别野`,gids:5,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:39},cos:{title:`COS`,forum_id:47}}}},r={daily:{id:1,title:`日榜`},weekly:{id:2,title:`周榜`},monthly:{id:3,title:`月榜`}},i=e=>({gids:n[e]?.gids,title:n[e]?.title}),a=(e,t)=>{t=t||n[e]?.default_forum||`tongren`;let r=n[e]?.forums?.[t];return{forum_id:r?.forum_id,title:`${r?.title}榜`}},o=(e,t,r)=>{t=t||n[e]?.default_forum||`tongren`;let i=n[e]?.forums?.[t],a=i?.default_cate;return a?(r=r||a,{title:`${i?.cates?.[r]?.title}榜`,cate_id:i?.cates?.[r]?.cate_id}):{title:``,cate_id:`0`}},s=(e,t)=>(t=t||n[e]?.default_ranking_type||`daily`,{id:r[t]?.id,title:r[t]?.title}),c={path:`/bbs/img-ranking/:game/:routeParams?`,categories:[`game`],example:`/mihoyo/bbs/img-ranking/ys/forumType=tongren&cateType=illustration&rankingType=daily`,parameters:{game:`游戏缩写`,routeParams:`额外参数；请参阅以下说明和表格`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`miyoushe.com/:game/imgRanking/:forum_id/:ranking_id/:cate_id`],target:`/bbs/img-ranking/:game`}],name:`米游社 - 同人榜`,maintainers:[`CaoMeiYouRen`],handler:l,description:`| 键          | 含义                                  | 接受的值                                                             | 默认值       |
| ----------- | ------------------------------------- | -------------------------------------------------------------------- | ------------ |
| forumType   | 主榜类型（仅原神、大别野有 cos 主榜） | tongren/cos                                                          | tongren      |
| cateType    | 子榜类型（仅崩坏三、原神有子榜）      | 崩坏三：illustration/comic/cos；原神：illustration/comic/qute/manual | illustration |
| rankingType | 排行榜类型（崩坏二没有日榜）          | daily/weekly/monthly                                                 | daily        |
| lastId      | 当前页 id（用于分页）                 | 数字                                                                 | 1            |

  游戏缩写

| 崩坏三 | 原神 | 崩坏二 | 未定事件簿 | 星穹铁道 | 大别野 | 绝区零 |
| ------ | ---- | ------ | ---------- | -------- | ------ | ------ |
| bh3    | ys   | bh2    | wd         | sr       | dby    | zzz    |

  主榜类型

| 同人榜  | COS 榜 |
| ------- | ------ |
| tongren | cos    |

  子榜类型

  崩坏三 子榜

| 插画         | 漫画  | COS |
| ------------ | ----- | --- |
| illustration | comic | cos |

  原神 子榜

| 插画         | 漫画  | Q 版 | 手工   |
| ------------ | ----- | ---- | ------ |
| illustration | comic | qute | manual |

  排行榜类型

| 日榜  | 周榜   | 月榜    |
| ----- | ------ | ------- |
| daily | weekly | monthly |`};async function l(n){let r=n.req.param(`game`),c=Object.fromEntries(new URLSearchParams(n.req.param(`routeParams`))),{forumType:l=`tongren`,cateType:u,rankingType:d,lastId:f=``}=c,p=n.req.query(`limit`)||`20`,{gids:m,title:h}=i(r);if(!m)throw Error(`未知的游戏！`);let{forum_id:g,title:_}=a(r,l);if(!g)throw Error(`${h} 的排行榜不存在！`);let{cate_id:v,title:y}=o(r,l,u),{id:b,title:x}=s(r,d),S=new URLSearchParams({gids:m,forum_id:g,cate_id:v,type:b,page_size:p,last_id:f}).toString(),C=`https://bbs-api.miyoushe.com/post/wapi/getImagePostList?${S}`,w=await e({method:`get`,url:C}),T=w?.data?.data?.list;if(!T)throw Error(`未获取到数据！`);let E=`米游社-${h}-${_}${y?`-${y}`:``}-${x}`,D=T.map(e=>t(e)),O={title:E,link:C,item:D};return O}export{c as route};
//# sourceMappingURL=img-ranking-Co5lUSgU.js.map