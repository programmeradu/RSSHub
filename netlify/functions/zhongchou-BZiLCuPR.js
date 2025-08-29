import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{load as n}from"cheerio";const r={path:`/zhongchou/:category?/:sort?/:status?`,categories:[`shopping`],example:`/modian/zhongchou`,parameters:{category:`分类，见下表，默认为全部`,sort:`排序，见下表，默认为最新上线`,status:`状态，见下表，默认为全部`},name:`众筹`,maintainers:[`nczitzk`],description:`分类

| 全部 | 游戏  | 动漫   | 出版       | 桌游       |
| ---- | ----- | ------ | ---------- | ---------- |
| all  | games | comics | publishing | tablegames |

| 卡牌  | 潮玩模型 | 影视       | 音乐  | 活动       |
| ----- | -------- | ---------- | ----- | ---------- |
| cards | toys     | film-video | music | activities |

| 设计   | 科技       | 食品 | 爱心通道 | 动物救助 |
| ------ | ---------- | ---- | -------- | -------- |
| design | technology | food | charity  | animals  |

| 个人愿望 | 其他   |
| -------- | ------ |
| wishes   | others |

  排序

| 最新上线  | 金额最高   | 评论最多     |
| --------- | ---------- | ------------ |
| top_time | top_money | top_comment |

  状态

| 全部 | 创意 | 预热    | 众筹中 | 众筹成功 |
| ---- | ---- | ------- | ------ | -------- |
| all  | idea | preheat | going  | success  |`,handler:i,radar:[{source:[`zhongchou.modian.com/:category/:sort/:status`]}]};async function i(r){let{category:i=`all`,sort:a=`top_time`,status:o=`all`}=r.req.param(),s=`https://zhongchou.modian.com/${i}/${a}/${o}`,c=await t({method:`get`,url:s}),l=n(c.data),u=l(`.pro_title`).slice(0,12).toArray().map(e=>(e=l(e).parent(),{title:e.text(),link:e.attr(`href`)})),d=await Promise.all(u.map(r=>e.tryGet(r.link,async()=>{let e=await t({method:`get`,url:r.link}),i=n(e.data),a=e.data.match(/realtime_sync\.pro_time\('(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})', '\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'\);/);return r.pubDate=a===null?Date.parse(i(`.start-time h3`).text()||i(`h3[start_time]`).attr(`start_time`)):Date.parse(a[1]),r.author=i(`span[data-nickname]`).text(),r.description=`<img src="${i(`#big_logo`).attr(`src`)}"><br>`+i(`.center-top`).html()+i(`#my_back_info`).html()+i(`#cont_match_htmlstr`).html(),r})));return{title:`${l(`.category div span`).text()} - ${l(`.status div span`).text()} - ${l(`.sort div span`).text()} - 摩点众筹`,link:s,item:d}}export{r as route};
//# sourceMappingURL=zhongchou-BZiLCuPR.js.map