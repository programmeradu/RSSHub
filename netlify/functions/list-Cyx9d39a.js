import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import{fallback as i,queryToFloat as a,queryToInteger as o}from"./readable-social-D7TWDGpz.js";import s from"node:path";t();const c={path:`/list/:type?/:routeParams?`,categories:[`social-media`],example:`/douban/list/subject_real_time_hotest`,parameters:{type:`榜单类型，见下表。默认为实时热门书影音`,routeParams:`额外参数；请参阅以下说明和表格`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.douban.com/subject_collection/:type`],target:`/list/:type`}],name:`豆瓣榜单与集合`,maintainers:[`5upernova-heng`,`honue`],handler:l,description:`| 榜单 / 集合        | 路由                          |
| ------------------ | ----------------------------- |
| 实时热门书影音     | subject_real_time_hotest   |
| 影院热映           | movie_showing                |
| 实时热门电影       | movie_real_time_hotest     |
| 实时热门电视       | tv_real_time_hotest        |
| 一周口碑电影榜     | movie_weekly_best           |
| 华语口碑剧集榜     | tv_chinese_best_weekly     |
| 全球口碑剧集榜     | tv_global_best_weekly      |
| 国内口碑综艺榜     | show_chinese_best_weekly   |
| 国外口碑综艺榜     | show_global_best_weekly    |
| 热播新剧国产剧     | tv_domestic                  |
| 热播新剧欧美剧     | tv_american                  |
| 热播新剧日剧       | tv_japanese                  |
| 热播新剧韩剧       | tv_korean                    |
| 热播新剧动画       | tv_animation                 |
| 虚构类小说热门榜   | book_fiction_hot_weekly    |
| 非虚构类小说热门榜 | book_nonfiction_hot_weekly |
| 热门单曲榜         | music_single                 |
| 华语新碟榜         | music_chinese                |
| ...                | ...                           |

| 额外参数 | 含义                   | 接受的值 | 默认值 |
| -------- | ---------------------- | -------- | ------ |
| playable | 仅看有可播放片源的影片 | 0/1      | 0      |
| score    | 筛选评分               | 0.0-10.0 | 0      |

  用例：\`/douban/list/tv_korean/playable=1&score=8\`

  > 上面的榜单 / 集合并没有列举完整。
  >
  > 如何找到榜单对应的路由参数：
  > 在豆瓣手机 APP 中，对应地榜单页面右上角，点击分享链接。链接路径 \`subject_collection\` 后的路径就是路由参数 \`type\`。
  > 如：小说热门榜的分享链接为：\`https://m.douban.com/subject_collection/ECDIHUN4A\`，其对应本 RSS 路由的 \`type\` 为 \`ECDIHUN4A\`，对应的订阅链接路由：[\`/douban/list/ECDIHUN4A\`](https://rsshub.app/douban/list/ECDIHUN4A)`};async function l(t){let c=t.req.param(`type`)||`subject_real_time_hotest`,l=Object.fromEntries(new URLSearchParams(t.req.param(`routeParams`))),u=i(void 0,o(l.playable),0),d=i(void 0,a(l.score),0),f=0,p=[],m=``,h=``,g=null;for(;g===null||f<g;){let t=`https://m.douban.com/rexxar/api/v2/subject_collection/${c}/items?playable=${u}&start=${f}&count=50`,i=await r({method:`get`,url:t,headers:{Referer:`https://m.douban.com/subject_collection/${c}`}});m=i.data.subject_collection.name,h=i.data.subject_collection.description,g=i.data.total;let a=i.data.subject_collection_items.filter(e=>{let t=e.rating?e.rating.value:0;return t>=d}).map(t=>{let r=t.title,i=t.url,a=n(s.join(e,`templates/list_description-48b9ab53.art`),{ranking_value:t.ranking_value,title:r,original_title:t.original_title,rate:t.rating?t.rating.value:null,card_subtitle:t.card_subtitle,description:t.cards?t.cards[0].content:t.abstract,cover:t.cover_url||t.cover?.url});return{title:r,link:i,description:a}});p=[...p,...a],f+=50}return{title:`豆瓣 - ${m}`,link:`https://m.douban.com/subject_collection/${c}`,item:p,description:h}}export{c as route};
//# sourceMappingURL=list-Cyx9d39a.js.map